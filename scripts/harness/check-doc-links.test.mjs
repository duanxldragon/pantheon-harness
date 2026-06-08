import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-doc-links.mjs');

test('check-doc-links passes with valid internal markdown links', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-links-'));
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'README.md'), '[Guide](./guide.md)');
  fs.writeFileSync(path.join(root, 'docs', 'guide.md'), '# Guide');
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
});

test('check-doc-links fails strict mode when internal targets are missing', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-links-broken-'));
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'README.md'), '[Guide](./missing.md)');
  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing internal link target/);
});
