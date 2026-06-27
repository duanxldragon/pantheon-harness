import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-doc-inventory.mjs');

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-inventory-'));

  for (const script of ['check-alpha.mjs', 'check-beta.mjs']) {
    writeFile(path.join(root, 'scripts', 'harness', script), '#!/usr/bin/env node\n');
  }
  writeFile(
    path.join(root, 'scripts', 'harness', 'README.md'),
    ['# Harness Scripts', '### `check-alpha.mjs`', '### `check-beta.mjs`'].join('\n'),
  );

  for (const doc of [
    'patterns/README.md',
    'patterns/harness-core-model.md',
    'patterns/harness-coverage-model.md',
    'patterns/harness-template-taxonomy.md',
    'patterns/tool-adapter-matrix.md',
    'patterns/method-playbook.md',
    'architecture/harness/harness-engineering-contract.md',
    'architecture/harness/harness-method-playbook.md',
  ]) {
    writeFile(path.join(root, doc), '# Doc\n');
  }

  writeFile(
    path.join(root, 'docs', 'README.md'),
    [
      '# Docs',
      '- [../patterns/README.md](../patterns/README.md)',
      '- [../patterns/harness-core-model.md](../patterns/harness-core-model.md)',
      '- [../patterns/harness-coverage-model.md](../patterns/harness-coverage-model.md)',
      '- [../patterns/harness-template-taxonomy.md](../patterns/harness-template-taxonomy.md)',
      '- [../patterns/tool-adapter-matrix.md](../patterns/tool-adapter-matrix.md)',
      '- [../patterns/method-playbook.md](../patterns/method-playbook.md)',
      '- [../architecture/harness/harness-engineering-contract.md](../architecture/harness/harness-engineering-contract.md)',
      '- [../architecture/harness/harness-method-playbook.md](../architecture/harness/harness-method-playbook.md)',
    ].join('\n'),
  );

  return root;
}

test('check-doc-inventory passes when script and key doc indexes are complete', () => {
  const root = createFixture();

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.findingCount, 0);
});

test('check-doc-inventory fails when a root harness script is missing from scripts README', () => {
  const root = createFixture();
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'README.md'), '### `check-alpha.mjs`\n');

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /script is missing from inventory README/);
  assert.match(result.stdout, /check-beta.mjs/);
});

test('check-doc-inventory fails when docs README misses a required method entry', () => {
  const root = createFixture();
  const readme = fs.readFileSync(path.join(root, 'docs', 'README.md'), 'utf8');
  fs.writeFileSync(
    path.join(root, 'docs', 'README.md'),
    readme.replace('- [../patterns/method-playbook.md](../patterns/method-playbook.md)', ''),
  );

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /required document is missing from docs README/);
  assert.match(result.stdout, /patterns\/method-playbook.md/);
});
