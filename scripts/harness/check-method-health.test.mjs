import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = path.resolve(TEST_DIR, 'check-method-health.mjs');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'method-health-'));
  fs.mkdirSync(path.join(root, 'patterns'), { recursive: true });
  fs.mkdirSync(path.join(root, '.agents'), { recursive: true });
  fs.mkdirSync(path.join(root, '.github'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, 'scripts', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness'), { recursive: true });
  fs.mkdirSync(path.join(root, 'tools', 'openspec'), { recursive: true });

  fs.writeFileSync(path.join(root, 'VERSION'), '1.0.0\n');
  fs.writeFileSync(
    path.join(root, 'patterns', 'METHOD_VERSION.json'),
    JSON.stringify({ version: '1.0.0', compatibleRepoShell: '1.0.0' }),
  );
  fs.writeFileSync(path.join(root, 'patterns', 'harness-core-model.md'), '# Core Model\n');
  fs.writeFileSync(path.join(root, 'patterns', 'harness-coverage-model.md'), '# Coverage Model\n');
  fs.writeFileSync(path.join(root, 'patterns', 'harness-template-taxonomy.md'), '# Template Taxonomy\n');
  fs.writeFileSync(path.join(root, 'patterns', 'tool-adapter-matrix.md'), '# Tool Adapter Matrix\n');
  fs.writeFileSync(path.join(root, 'patterns', 'method-playbook.md'), '# Method Playbook\n');
  fs.writeFileSync(path.join(root, 'patterns', 'README.md'), '# Method Patterns\n');
  fs.writeFileSync(path.join(root, 'patterns', 'changelog.md'), '# Changelog\n');
  fs.writeFileSync(path.join(root, 'patterns', 'upgrade.md'), '# Upgrade\n');
  fs.writeFileSync(
    path.join(root, 'SHELL_VERSION.json'),
    JSON.stringify({ version: '1.0.0', compatibleMethodKit: '1.0.0' }),
  );
  fs.writeFileSync(path.join(root, '.agents', 'README.md'), '# Adapters\n');
  fs.writeFileSync(path.join(root, '.github', 'pull_request_template.md'), 'Task packet\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-core-model.md'), '# Core Model\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-coverage-model.md'), '# Coverage Model\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-template-taxonomy.md'), '# Template Taxonomy\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tool-adapter-matrix.md'), '# Tool Adapter Matrix\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'harness-engineering-contract.md'), '# Contract\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'triviality-classification-policy.md'), '# Triviality\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'visual-evidence-promotion-policy.md'), '# Visual Policy\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'failure-registry-promotion-policy.md'), '# Failure Policy\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-task-packet.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-evidence.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-adoption.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-review.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-graph-review.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'scaffold-graph-review.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'build-graph-review-import.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-failure-registry.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-template-health.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-runtime-evidence.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-doc-links.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-doc-inventory.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-doc-frontmatter.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-sync-drift.mjs'), '#!/usr/bin/env node\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-visual-evidence.mjs'), '#!/usr/bin/env node\n');
  return root;
}

test('check-method-health passes with compatible versions', () => {
  const root = createFixture();
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
  assert.equal(result.warningCount, 0);
  assert.equal(result.methodVersion, '1.0.0');
  assert.equal(result.repoShellVersion, '1.0.0');
});

test('check-method-health fails strict mode on incompatible versions', () => {
  const root = createFixture();
  fs.writeFileSync(
    path.join(root, 'SHELL_VERSION.json'),
    JSON.stringify({ version: '2.0.0', compatibleMethodKit: '1.0.0' }),
  );

  let failed = false;
  try {
    execFileSync('node', [SCRIPT_PATH, '--strict', '--root', root], {
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch (error) {
    failed = true;
    assert.match(error.stdout, /does not match method kit compatibleRepoShell/);
  }
  assert.equal(failed, true);
});

test('check-method-health reports missing method kit files', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'patterns', 'changelog.md'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'patterns/changelog.md');
});

test('check-method-health reports missing failure registry checker', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'scripts', 'harness', 'check-failure-registry.mjs'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'scripts/harness/check-failure-registry.mjs');
});

test('check-method-health reports missing generic review checker', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'scripts', 'harness', 'check-review.mjs'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'scripts/harness/check-review.mjs');
});

test('check-method-health reports missing graph review checker', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'scripts', 'harness', 'check-graph-review.mjs'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'scripts/harness/check-graph-review.mjs');
});

test('check-method-health reports missing graph review scaffold tool', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'scripts', 'harness', 'scaffold-graph-review.mjs'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'scripts/harness/scaffold-graph-review.mjs');
});

test('check-method-health reports missing graph review import builder', () => {
  const root = createFixture();
  fs.rmSync(path.join(root, 'scripts', 'harness', 'build-graph-review-import.mjs'));
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 1);
  assert.equal(result.findings[0].file, 'scripts/harness/build-graph-review-import.mjs');
});
