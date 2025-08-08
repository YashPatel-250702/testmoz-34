import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface CompileInput {
  code: string;
  language: "python" | "java";
  testCases: string[];
}

export async function compileCode({ code, language, testCases }: CompileInput) {
  const id = uuidv4();

  // Use a platform-independent temp directory
  const tempDir = path.join(process.cwd(), "tmp", id);
  await fs.mkdir(tempDir, { recursive: true });

  let filename = "";
  let image = "";
  let compileCmd = "";

  if (language === "python") {
    filename = "main.py";
    image = "python:3.10-slim";
    compileCmd = `python /app/${filename}`;
  } else if (language === "java") {
    filename = "Main.java";
    image = "openjdk:17-slim";
    compileCmd = `bash -c "javac /app/${filename} && java -cp /app Main"`;
  } else {
    throw new Error("Unsupported language");
  }

  const filePath = path.join(tempDir, filename);
  await fs.writeFile(filePath, code);

  const results: string[] = [];

  for (const input of testCases) {
    const result = await runInDocker(tempDir, image, compileCmd, input);
    results.push(result);
  }

  return results;
}

async function runInDocker(dir: string, image: string, command: string, input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "-v",
      `${dir.replace(/\\/g, "/")}:/app`, // Fix for Windows paths
      image,
      "sh",
      "-c",
      command
    ]);

    let output = "";
    let errorOutput = "";

    docker.stdout.on("data", (data) => {
      output += data.toString();
    });

    docker.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    docker.on("close", (code) => {
      if (code !== 0) {
        return reject(errorOutput || `Docker exited with code ${code}`);
      }
      resolve(output.trim());
    });

    docker.stdin.write(input);
    docker.stdin.end();
  });
}
