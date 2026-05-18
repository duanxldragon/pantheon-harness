import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve('.');
const SCRIPT = fs.existsSync(path.join(ROOT, 'scripts', 'harness', 'triage-base-drift.mjs'))
  ? path.join(ROOT, 'scripts', 'harness', 'triage-base-drift.mjs')
  : path.join(ROOT, 'pantheon-overlay', 'scripts', 'harness', 'triage-base-drift.mjs');

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

test('drift triage classifies module-name-only backend drift as pseudo-drift', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drift-triage-'));
  writeFile(
    path.join(dir, 'pantheon-base', 'backend', 'modules', 'auth', 'auth.go'),
    'package auth\n\nimport "pantheon-platform/backend/pkg/common"\n',
  );
  writeFile(
    path.join(dir, 'pantheon-ops', 'backend', 'modules', 'auth', 'auth.go'),
    'package auth\n\nimport "pantheon-ops/backend/pkg/common"\n',
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--root', dir, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const report = JSON.parse(output);

  assert.equal(report.categoryCounts['pseudo-drift'], 1);
});

test('drift triage classifies generated files as noise and business modules as business-specific drift', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drift-triage-'));
  writeFile(path.join(dir, 'pantheon-base', 'frontend', 'src', 'i18n', 'resources', 'generated', 'zh.ts'), 'base\n');
  writeFile(path.join(dir, 'pantheon-ops', 'frontend', 'src', 'i18n', 'resources', 'generated', 'zh.ts'), 'ops\n');
  writeFile(path.join(dir, 'pantheon-base', 'backend', 'modules', 'business', 'business.go'), 'package business\n');
  writeFile(path.join(dir, 'pantheon-ops', 'backend', 'modules', 'business', 'business.go'), 'package business\n\nfunc MountOps() {}\n');

  const output = execFileSync(process.execPath, [SCRIPT, '--root', dir, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const report = JSON.parse(output);

  assert.equal(report.categoryCounts.noise, 1);
  assert.equal(report.categoryCounts['business mount'], 1);
});

test('drift triage treats derived repository entrypoints as business-specific drift', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drift-triage-'));
  writeFile(path.join(dir, 'pantheon-base', 'CLAUDE.md'), 'base standard backoffice entry\n');
  writeFile(path.join(dir, 'pantheon-ops', 'CLAUDE.md'), 'ops derived business entry\n');

  const output = execFileSync(process.execPath, [SCRIPT, '--root', dir, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const report = JSON.parse(output);

  assert.equal(report.categoryCounts['business-specific drift'], 1);
});
