const { spawn } = require("child_process");

function execCmd(cmd, args, input = "", timeoutMs = 5000) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "",
      stderr = "";

    if (input) {
      p.stdin.write(input);
      p.stdin.end();
    }

    p.stdout.on("data", (d) => (stdout += d.toString()));
    p.stderr.on("data", (d) => (stderr += d.toString()));

    const to = setTimeout(() => {
      p.kill("SIGKILL");
      resolve({
        timedOut: true,
        code: null,
        stdout,
        stderr: stderr + "\n--- killed by timeout ---",
      });
    }, timeoutMs);

    p.on("close", (code) => {
      clearTimeout(to);
      resolve({ timedOut: false, code, stdout, stderr });
    });
  });
}

exports.handler = async (event) => {
  const { language, code, stdin } = event;

  if (language === "python") {
    // Run code by passing it to Python via -c
    return await execCmd("python3", ["-c", code], stdin, 3000);
  }

  if (language === "javascript" || language === "node") {
    return await execCmd("node", ["-e", code], stdin, 3000);
  }

  if (language === "bash") {
    return await execCmd("bash", ["-c", code], stdin, 3000);
  }

  return { error: "Unsupported language" };
};
