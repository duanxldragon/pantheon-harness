import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-sync-drift.mjs');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-drift-'));
  fs.mkdirSync(path.join(root, 'scripts', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, 'verify', 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(root, 'config'), { recursive: true });
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-review.mjs'), '#!/usr/bin/env node\nconsole.log("review");\n');
  fs.writeFileSync(path.join(root, 'verify', 'scripts', 'check-review.mjs'), '#!/usr/bin/env node\nconsole.log("review");\n');
  fs.writeFileSync(
    path.join(root, 'config', 'method.config.json'),
    JSON.stringify({ syncMirrors: [['scripts/harness/check-review.mjs', 'verify/scripts/check-review.mjs']] }),
  );
  return root;
}

test('check-sync-drift passes when configured mirrors match', () => {
  const root = createFixture();
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
});

test('check-sync-drift fails when configured mirror drifts', () => {
  const root = createFixture();
  fs.writeFileSync(path.join(root, 'verify', 'scripts', 'check-review.mjs'), 'console.log("drift");\n');
  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /mirror drift detected/);
});
