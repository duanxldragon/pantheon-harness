import test from 'node:test';
import assert from 'node:assert';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve('.');
const SCRIPT = path.join(ROOT, 'scripts', 'harness', 'check-backend-response-contract.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-backend-response-contract-'));
  ['pantheon-base', 'pantheon-ops'].forEach(repo => {
    fs.mkdirSync(path.join(root, repo, 'backend'), { recursive: true });
  });
  return root;
}

test('check-backend-response-contract.mjs: pass with no findings', () => {
  const root = makeFixture();
  
  // Add a clean file
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'clean.go'),
    'package main\nfunc main() { common.Success(c, data) }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 0);
  assert.strictEqual(result.warningCount, 0);
});

test('check-backend-response-contract.mjs: detect direct c.JSON', () => {
  const root = makeFixture();
  
  // Add a bad file
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'bad.go'),
    'package main\nfunc main() {\n  c.JSON(200, data)\n}\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 1);
  assert.strictEqual(result.results[1].findings[0].line, 3);
});

test('check-backend-response-contract.mjs: allow wrapper itself', () => {
  const root = makeFixture();
  const wrapperPath = path.join(root, 'pantheon-base', 'backend', 'pkg', 'common');
  fs.mkdirSync(wrapperPath, { recursive: true });
  
  fs.writeFileSync(
    path.join(wrapperPath, 'response.go'),
    'package common\nfunc Success(c *gin.Context, data interface{}) {\n  c.JSON(200, data)\n}\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 0);
});
