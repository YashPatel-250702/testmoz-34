'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function runProcess(cmd, args, { input = '', timeoutMs = 5000 } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let killed = false;

    if (input) child.stdin.write(input);
    child.stdin.end();

    const timer = setTimeout(() => {
      killed = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));

    child.on('close', (code) => {
      clearTimeout(timer);
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
    const fileName = 'Main.java';
    const className = 'Main';
    fs.writeFileSync(fileName, code);
    const compileRes = await runProcess('javac', [fileName], { timeoutMs: timeout });
    if (compileRes.exitCode !== 0) {
      return {
        language,
        error: 'Compilation failed',
        stderr: compileRes.stderr,
      };
    }
    cmd = 'java';
    argsBuilder = () => [className];
  } else {
    return { error: `Unsupported language: ${language}` };
  }

  const results = [];

  if (testCases.length > 0) {
    for (const testcase of testCases) {
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

  return {
    language,
    count: results.length,
    results,
  };
};
