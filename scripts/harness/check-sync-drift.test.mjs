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
  fs.mkdirSync(path.join(root, 'agentic-repo-shell', 'scripts', 'harness'), { recursive: true });
  const pairs = [
    'check-review',
    'check-graph-review',
    'scaffold-graph-review',
    'build-graph-review-import',
    'check-template-health',
    'check-runtime-evidence',
    'check-doc-links',
    'check-doc-inventory',
  ];
  for (const name of pairs) {
    fs.writeFileSync(path.join(root, 'scripts', 'harness', `${name}.mjs`), `#!/usr/bin/env node\nconsole.log('${name}');\n`);
    fs.writeFileSync(path.join(root, 'agentic-repo-shell', 'scripts', 'harness', `${name}.mjs`), `export * from '../../../scripts/harness/${name}.mjs';\n`);
  }
  return root;
}

test('check-sync-drift passes when repo-shell mirrors root scripts by re-export', () => {
  const root = createFixture();
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
});

test('check-sync-drift fails when repo-shell mirror drifts', () => {
  const root = createFixture();
  fs.writeFileSync(path.join(root, 'agentic-repo-shell', 'scripts', 'harness', 'check-review.mjs'), 'console.log("drift");\n');
  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /mirror drift detected/);
});
