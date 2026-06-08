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

  writeFile(path.join(root, 'agentic-repo-shell', 'scripts', 'harness', 'check-shell.mjs'), '#!/usr/bin/env node\n');
  writeFile(
    path.join(root, 'agentic-repo-shell', 'scripts', 'harness', 'README.md'),
    ['# Harness Scripts', '### `check-shell.mjs`'].join('\n'),
  );

  for (const doc of [
    'agentic-method-kit/README.md',
    'agentic-method-kit/HARNESS_CORE_MODEL.md',
    'agentic-method-kit/HARNESS_COVERAGE_MODEL.md',
    'agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md',
    'agentic-method-kit/TOOL_ADAPTER_MATRIX.md',
    'agentic-method-kit/METHOD_PLAYBOOK.md',
    'docs/harness/HARNESS_ENGINEERING_CONTRACT.md',
    'docs/harness/HARNESS_METHOD_PLAYBOOK.md',
  ]) {
    writeFile(path.join(root, doc), '# Doc\n');
  }

  writeFile(
    path.join(root, 'docs', 'README.md'),
    [
      '# Docs',
      '- [../agentic-method-kit/README.md](../agentic-method-kit/README.md)',
      '- [../agentic-method-kit/HARNESS_CORE_MODEL.md](../agentic-method-kit/HARNESS_CORE_MODEL.md)',
      '- [../agentic-method-kit/HARNESS_COVERAGE_MODEL.md](../agentic-method-kit/HARNESS_COVERAGE_MODEL.md)',
      '- [../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md](../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md)',
      '- [../agentic-method-kit/TOOL_ADAPTER_MATRIX.md](../agentic-method-kit/TOOL_ADAPTER_MATRIX.md)',
      '- [../agentic-method-kit/METHOD_PLAYBOOK.md](../agentic-method-kit/METHOD_PLAYBOOK.md)',
      '- [harness/HARNESS_ENGINEERING_CONTRACT.md](harness/HARNESS_ENGINEERING_CONTRACT.md)',
      '- [harness/HARNESS_METHOD_PLAYBOOK.md](harness/HARNESS_METHOD_PLAYBOOK.md)',
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
    readme.replace('- [../agentic-method-kit/METHOD_PLAYBOOK.md](../agentic-method-kit/METHOD_PLAYBOOK.md)', ''),
  );

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /required document is missing from docs README/);
  assert.match(result.stdout, /agentic-method-kit\/METHOD_PLAYBOOK.md/);
});
