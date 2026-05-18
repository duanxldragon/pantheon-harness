import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SCRIPT_PATH = fs.existsSync(path.resolve('agentic-repo-shell/scripts/harness/check-method-health.mjs'))
  ? path.resolve('agentic-repo-shell/scripts/harness/check-method-health.mjs')
  : path.resolve('scripts/harness/check-method-health.mjs');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'method-health-shell-'));
  fs.mkdirSync(path.join(root, 'agentic-method-kit'), { recursive: true });
  fs.mkdirSync(path.join(root, '.agents'), { recursive: true });
  fs.mkdirSync(path.join(root, '.github'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, 'scripts', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness'), { recursive: true });
  fs.mkdirSync(path.join(root, 'openspec'), { recursive: true });

  fs.writeFileSync(path.join(root, 'agentic-method-kit', 'VERSION'), '1.0.0\n');
  fs.writeFileSync(
    path.join(root, 'agentic-method-kit', 'METHOD_VERSION.json'),
    JSON.stringify({ version: '1.0.0', compatibleRepoShell: '1.0.0' }),
  );
  fs.writeFileSync(path.join(root, 'agentic-method-kit', 'CHANGELOG.md'), '# Changelog\n');
  fs.writeFileSync(path.join(root, 'agentic-method-kit', 'UPGRADE.md'), '# Upgrade\n');
  fs.writeFileSync(
    path.join(root, 'SHELL_VERSION.json'),
    JSON.stringify({ version: '1.0.0', compatibleMethodKit: '1.0.0' }),
  );
  fs.writeFileSync(path.join(root, '.agents', 'README.md'), '# Adapters\n');
  fs.writeFileSync(path.join(root, '.github', 'pull_request_template.md'), 'Task packet\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'HARNESS_ENGINEERING_CONTRACT.md'), '# Contract\n');
  fs.writeFileSync(path.join(root, 'scripts', 'harness', 'check-adoption.mjs'), '#!/usr/bin/env node\n');
  return root;
}

test('repo-shell check-method-health passes with compatible versions', () => {
  const root = createFixture();
  const output = execFileSync('node', [SCRIPT_PATH, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);
  assert.equal(result.findingCount, 0);
  assert.equal(result.warningCount, 0);
});
