import { spawn } from "child_process";

interface CompileInput {
  code: string;
  language: "python" | "java";
  testCases: string[];
}

export async function compileCode({ code, language, testCases }: CompileInput) {
  if (language.toLowerCase() === "python") {
    const results: string[] = [];
    for (const input of testCases) {
      try {
        const result = await runPythonInDocker(code, input);
        results.push(result);
      } catch (err: any) {
        results.push(`Error: ${err.message}`);
      }
    }
    return results;
  }

  if (language.toLowerCase() === "java") {
    const containerName = `java-run-${Date.now()}`;
    try {
      await compileJavaInDocker(containerName, code);

      const results: string[] = [];
      for (const input of testCases) {
        try {
          const result = await runJavaInDocker(containerName, input);
          results.push(result);
        } catch (err: any) {
          results.push(`Error: ${err.message}`);
        }
      }

      await removeDockerContainer(containerName);
      return results;
    } catch (err: any) {
      await removeDockerContainer(containerName);
    }
  }

  throw new Error("Unsupported language");
}

async function runPythonInDocker(code: string, input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "--network=none", 
      "--memory=128m",  
      "--cpus=0.5",     
      "--pids-limit=64",
      "--cap-drop=all",
      "--security-opt=no-new-privileges",
      "python:3.10-slim",
      "python",
      "-c",
      code,
    ]);

    const timeout = setTimeout(() => {
      docker.kill("SIGKILL");
      reject(new Error("Execution timed out"));
    }, 5000);

    let output = "";
    let errorOutput = "";

    docker.stdout.on("data", (data) => output += data.toString());
    docker.stderr.on("data", (data) => errorOutput += data.toString());

    docker.on("close", (codeNum) => {
      clearTimeout(timeout);
      if (codeNum !== 0) {
        reject(new Error(errorOutput || `Docker exited with code ${codeNum}`));
      } else {
        resolve(output.slice(0, 5000).trim());
      }
    });

    docker.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    if (input) {
      docker.stdin.write(input);
    }
    docker.stdin.end();
  });
}

async function compileJavaInDocker(containerName: string, code: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const startContainer = spawn("docker", [
      "run", "-d", "--name", containerName,
      "--network=none",
      "--memory=256m",
      "--cpus=1",
      "--pids-limit=128",
      "--cap-drop=all",
      "--security-opt=no-new-privileges",
      "-w", "/app",
      "openjdk:17-slim",
      "tail", "-f", "/dev/null"
    ]);

    startContainer.on("close", (startCode) => {
      if (startCode !== 0) {
        return reject(new Error("Failed to start Java container"));
      }

      const dockerCp = spawn("docker", ["exec", "-i", containerName, "tee", "/app/Main.java"]);
      dockerCp.stdin.write(code.trim());
      dockerCp.stdin.end();

      dockerCp.on("close", (cpCode) => {
        if (cpCode !== 0) {
          return reject(new Error("Failed to copy Main.java into container"));
        }

        const compile = spawn("docker", ["exec", containerName, "javac", "Main.java"]);

        let compileLogs = "";
        compile.stderr.on("data", (data) => compileLogs += data.toString());

        compile.on("close", (compileCode) => {
          if (compileCode !== 0) {
            reject(new Error(`Java compilation failed:\n${compileLogs}`));
          } else {
            resolve();
          }
        });
      });
    });
  });
}

async function runJavaInDocker(containerName: string, input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", [
      "exec", "-i",
      "-w", "/app",
      containerName,
      "java", "Main"
    ]);

    let output = "";
    let errorOutput = "";

    const timeout = setTimeout(() => {
      docker.kill("SIGKILL");
      reject(new Error("Execution timed out"));
    }, 5000);

    docker.stdout.on("data", (data) => output += data.toString());
    docker.stderr.on("data", (data) => errorOutput += data.toString());

    docker.on("close", (codeNum) => {
      clearTimeout(timeout);
      if (codeNum !== 0) {
        reject(new Error(errorOutput || `Docker exited with code ${codeNum}`));
      } else {
        resolve(output.trim());
      }
    });

    if (input) docker.stdin.write(input);
    docker.stdin.end();
  });
}


async function removeDockerContainer(containerName: string): Promise<void> {
  return new Promise((resolve) => {
    const docker = spawn("docker", ["rm", "-f", containerName]);
    docker.on("close", () => resolve());
  });
}