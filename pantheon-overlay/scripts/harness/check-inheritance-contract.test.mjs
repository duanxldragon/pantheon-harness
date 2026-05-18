import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';

const SCRIPT = fs.existsSync(path.resolve('scripts/harness/check-inheritance-contract.mjs'))
  ? path.resolve('scripts/harness/check-inheritance-contract.mjs')
  : path.resolve('pantheon-overlay/scripts/harness/check-inheritance-contract.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'inheritance-contract-'));
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.mkdirSync(path.join(root, 'pantheon-ops', 'docs'), { recursive: true });
  fs.mkdirSync(path.join(root, 'pantheon-ops'), { recursive: true });
  fs.mkdirSync(path.join(root, '.github'), { recursive: true });
  return root;
}

function writeValidFixture(root) {
  fs.writeFileSync(
    path.join(root, 'docs', 'WORKSPACE_INHERITANCE.md'),
    [
      '`pantheon-base`: the only authority',
      '`pantheon-ops`: a derived business repository',
      'Change base rules in `pantheon-base`, then let business repositories upgrade',
    ].join('\n'),
  );
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'CLAUDE.md'),
    [
      'pantheon-ops inherits pantheon-base as its foundation',
      'Business work reading order',
      '../docs/WORKSPACE_INHERITANCE.md',
      'docs/PROJECT_INHERITANCE.md',
      '../pantheon-base/DESIGN.md',
      '../pantheon-base/AGENTS.md',
      'Do not fix platform or system-domain drift locally in pantheon-ops',
    ].join('\n'),
  );
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'AGENTS.md'),
    'pantheon-base\nbusiness/*\n',
  );
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'docs', 'PROJECT_INHERITANCE.md'),
    [
      'Base repository: `../pantheon-base`',
      'Base version: `d119872` (`d1198723d85c1cfc7e71a4144518560e81afdb06`)',
      'business/cmdb',
      'business/deploy',
      'If a foundation rule must change, update `pantheon-base` first',
    ].join('\n'),
  );
  fs.writeFileSync(
    path.join(root, '.github', 'pull_request_template.md'),
    [
      'Base/ops inheritance',
      'Base version checked',
      'generic drift',
      'pseudo-drift',
      'business-only',
    ].join('\n'),
  );
}

test('inheritance contract accepts a valid derived repository fixture', () => {
  const root = makeFixture();
  writeValidFixture(root);

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.findingCount, 0);
});

test('inheritance contract fails when ops can override base without guidance', () => {
  const root = makeFixture();
  writeValidFixture(root);
  fs.writeFileSync(path.join(root, 'pantheon-ops', 'CLAUDE.md'), 'generic claude entrypoint\n');

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing required inheritance marker/);
});
