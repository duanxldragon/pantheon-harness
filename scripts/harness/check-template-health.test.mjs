import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-template-health.mjs');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'template-health-'));
  fs.mkdirSync(path.join(root, 'patterns'), { recursive: true });
  fs.mkdirSync(path.join(root, 'config'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness'), { recursive: true });
  fs.writeFileSync(path.join(root, 'patterns', 'harness-core-model.md'), '# Core\n');
  fs.writeFileSync(path.join(root, 'patterns', 'harness-coverage-model.md'), '# Coverage\n');
  fs.writeFileSync(path.join(root, 'patterns', 'harness-template-taxonomy.md'), '# Taxonomy\n');
  fs.writeFileSync(path.join(root, 'patterns', 'tool-adapter-matrix.md'), '# Matrix\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-core-model.md'), '# Core\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-coverage-model.md'), '# Coverage\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-template-taxonomy.md'), '# Taxonomy\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tool-adapter-matrix.md'), '# Matrix\n');
  fs.writeFileSync(path.join(root, 'config', 'method.config.json'), JSON.stringify({ templateId: 'admin-platform' }));
  return root;
}

test('check-template-health passes with required docs and template selection', () => {
  const root = createFixture();
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
  assert.equal(result.warningCount, 0);
});

test('check-template-health warns when template selection is missing', () => {
  const root = createFixture();
  fs.writeFileSync(path.join(root, 'config', 'method.config.json'), JSON.stringify({}));
  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], { encoding: 'utf8' });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
  assert.equal(result.warningCount, 1);
});

test('check-template-health fails strict mode when required docs are missing', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'docs', 'harness', 'harness-template-taxonomy.md'));
  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /required repo template projection document is missing/);
});
