import test from 'node:test';
import assert from 'node:assert';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve('.');
const SCRIPT = path.join(ROOT, 'scripts', 'harness', 'check-boundaries.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-boundaries-'));
  // Create minimal repo structure
  ['pantheon-base', 'pantheon-ops'].forEach(repo => {
    const backend = path.join(root, repo, 'backend', 'modules', 'business');
    const frontend = path.join(root, repo, 'frontend', 'src', 'modules', 'business');
    fs.mkdirSync(backend, { recursive: true });
    fs.mkdirSync(frontend, { recursive: true });
  });
  return root;
}

test('check-boundaries.mjs: pass with no findings', () => {
  const root = makeFixture();
  
  // Add a clean file
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'business', 'clean.go'),
    'package business\nimport "fmt"\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 0);
  assert.strictEqual(result.warningCount, 0);
});

test('check-boundaries.mjs: detect forbidden Go imports', () => {
  const root = makeFixture();
  
  // Add a forbidden import
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'business', 'bad.go'),
    'package business\nimport "pantheon-ops/backend/internal/middleware"\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 1);
  assert.strictEqual(result.results[1].findings[0].importPath, 'pantheon-ops/backend/internal/middleware');
});

test('check-boundaries.mjs: detect forbidden TS imports', () => {
  const root = makeFixture();
  
  // Add a forbidden import
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'frontend', 'src', 'modules', 'business', 'bad.ts'),
    'import { something } from "../../../system/somewhere";\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 1);
  assert.ok(result.results[1].findings[0].reason.includes('reach into sibling system modules'));
});

test('check-boundaries.mjs: strict mode fails with findings', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'business', 'bad.go'),
    'package business\nimport "pantheon-ops/backend/internal/secret"\n'
  );

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  assert.strictEqual(result.status, 1);
  assert.ok(result.stdout.includes('1 finding(s)'));
});
