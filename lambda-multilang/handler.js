'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function runProcess(cmd, args, { input = '', timeoutMs = 5000 } = {}) {
  console.log(`🔹 Running process: ${cmd} ${args.join(' ')}, input="${input.trim()}"`);
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let killed = false;

    if (input) child.stdin.write(input);
    child.stdin.end();

    const timer = setTimeout(() => {
      killed = true;
      console.log(`⏰ Killing process ${cmd} after ${timeoutMs}ms`);
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (d) => {
      stdout += d.toString();
      console.log(`📤 stdout: ${d.toString().trim()}`);
    });
    child.stderr.on('data', (d) => {
      stderr += d.toString();
      console.error(`⚠️ stderr: ${d.toString().trim()}`);
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      console.log(`✅ Process ${cmd} exited with code ${code}`);
      resolve({
        exitCode: code,
        stdout: stdout.trim(),
        stderr: (killed ? stderr + '\n--- killed by timeout ---' : stderr).trim(),
        timedOut: killed,
      });
    });
  });
}

exports.handler = async (event) => {
  console.log("📥 Incoming event:", JSON.stringify(event, null, 2));

  const { language, code, testCases = [], timeout = 5000 } = event || {};
  if (!language || !code) return { error: 'language and code required' };

  let cmd, argsBuilder;

  if (language === 'python') {
    cmd = 'python3';
    argsBuilder = () => ['-c', code];
  } else if (language === 'node' || language === 'javascript') {
    cmd = 'node';
    argsBuilder = () => ['-e', code];
  } else if (language === 'bash') {
    cmd = 'bash';
    argsBuilder = () => ['-c', code];
  } else if (language === 'java') {
    // Using a constant for the temp directory is good practice
    const tmpDir = '/tmp'; 
    const fileName = 'Main.java';
    const className = 'Main';
    // Ensure the file path is always an absolute path inside /tmp
    const filePath = path.join(tmpDir, fileName);

    // Add this log to see the exact path being used
    console.log(`Attempting to write Java file to: ${filePath}`);
    fs.writeFileSync(filePath, code);

    // Compile
    const compileRes = await runProcess('javac', [filePath], { timeoutMs: timeout });
    if (compileRes.exitCode !== 0) {
      console.error("❌ Compilation error:", compileRes.stderr);
      return {
        language,
        error: 'Compilation failed',
        stderr: compileRes.stderr,
      };
    }

    // Run with explicit classpath pointing to /tmp
    cmd = 'java';
    argsBuilder = () => ['-cp', tmpDir, className];
  } else {
    return { error: `Unsupported language: ${language}` };
  }

  const results = [];

  if (testCases.length > 0) {
    for (const testcase of testCases) {
      console.log(`▶️ Running test case: "${testcase}"`);
      const res = await runProcess(cmd, argsBuilder(), {
        input: testcase + '\n',
        timeoutMs: timeout,
      });

      let parsedOutput = res.stdout;
      try {
        parsedOutput = JSON.parse(res.stdout.replace(/'/g, '"'));
      } catch {}

      results.push({
        input: testcase,
        exitCode: res.exitCode,
        stdout: res.stdout,
        stderr: res.stderr,
        output: parsedOutput,
        timedOut: res.timedOut,
      });
    }
  } else {
    console.log("▶️ Running code without test cases");
    const res = await runProcess(cmd, argsBuilder(), { timeoutMs: timeout });
    let parsedOutput = res.stdout;
    try {
      parsedOutput = JSON.parse(res.stdout.replace(/'/g, '"'));
    } catch {}
    results.push({
      exitCode: res.exitCode,
      stdout: res.stdout,
      stderr: res.stderr,
      output: parsedOutput,
      timedOut: res.timedOut,
    });
  }

  console.log("📤 Returning results:", JSON.stringify(results, null, 2));
  return {
    language,
    count: results.length,
    results,
  };
};
