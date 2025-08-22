import { spawn } from "child_process";

interface CodeRunOptions {
  code: string;
  language: "python" | "java" ;
  input?: string;
  timeout?: number;
}

export async function runCode({
  code,
  language,
  input = "",
  timeout = 30000
}: CodeRunOptions): Promise<{ output: string; error: string }> {
  return new Promise((resolve, reject) => {
    let cmd: string;
    let args: string[];

    switch (language) {
      case "python":
        cmd = "python3";
        args = ["-c", code];
        break;
      case "java":
        cmd = "bash";
        args = ["-c", `echo "${code}" > Main.java && javac Main.java && java Main`];
        break;
      default:
        return reject(new Error("Unsupported language"));
    }

    const proc = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });

    let output = "";
    let error = "";

    proc.stdout.on("data", (data) => (output += data.toString()));
    proc.stderr.on("data", (data) => (error += data.toString()));

    if (input) proc.stdin.write(input);
    proc.stdin.end();

    const killTimeout = setTimeout(() => {
      proc.kill("SIGKILL");
      reject(new Error("Execution timed out"));
    }, timeout);

    proc.on("close", () => {
      clearTimeout(killTimeout);
      resolve({ output: output.trim(), error: error.trim() });
    });
  });
}
