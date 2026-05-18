import test from 'node:test';
import assert from 'node:assert';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve('.');
const SCRIPT = path.join(ROOT, 'scripts', 'harness', 'check-permission-contract.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-permission-contract-'));
  ['pantheon-base', 'pantheon-ops'].forEach(repo => {
    fs.mkdirSync(path.join(root, repo, 'backend'), { recursive: true });
    fs.mkdirSync(path.join(root, repo, 'frontend', 'src'), { recursive: true });
  });
  return root;
}

test('check-permission-contract.mjs: pass with no findings', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'menu.go'),
    '{ Key: "list", Perms: "business:item:list", Type: "C" }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 0);
});

test('check-permission-contract.mjs: detect Type F with list permission', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'menu.go'),
    '{ Key: "delete", Perms: "business:item:list", Type: "F" }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 1);
  assert.strictEqual(result.results[1].findings[0].reason, 'action menu Type F must not use a list permission');
});

test('check-permission-contract.mjs: detect action wording near list permission', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'frontend', 'src', 'Component.tsx'),
    'if (can("business:item:list")) { handleDelete(); }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.warningCount, 1);
  assert.ok(result.results[1].warnings[0].reason.includes('confirm this is read/navigation gating'));
});
