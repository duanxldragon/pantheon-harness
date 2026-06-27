import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-evidence.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-evidence-kit-'));
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'sample'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), '# Task');
  fs.writeFileSync(path.join(root, '.harness', 'evidence', 'sample', 'review.md'), '# Review');
  return root;
}

function writeEvidence(root, payload) {
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'sample', 'commands.json'),
    JSON.stringify(payload, null, 2),
  );
}

function validEvidence() {
  return {
    taskId: 'sample',
    repo: 'method-kit-fixture',
    agent: {
      tool: 'codex',
    },
    commands: [
      {
        command: 'node verify/scripts/check-evidence.mjs --root .',
        cwd: '.',
        status: 'passed',
        durationMs: 12,
        notes: 'fixture',
      },
    ],
    methodReadiness: {
      ownerLayer: 'portable-method',
      ratchetDecision: 'template-updated',
      deferredCodeIssues: [],
    },
    sessionEconomics: {
      responseMode: 'terse',
      costSensitivity: 'medium',
      inputTokens: 1200,
      outputTokens: 340,
      retryCount: 1,
      delegationCount: 0,
      notes: 'derived from fixture log',
    },
    linkage: {
      taskPacket: 'docs/harness/tasks/sample.task.md',
      evidenceDir: '.harness/evidence/sample/',
      reviewFile: '.harness/evidence/sample/review.md',
      changeRef: 'none',
      planRefs: [],
    },
    knownGaps: [],
    completedAt: '2026-06-24T00:00:00Z',
  };
}

test('check-evidence accepts valid session economics metadata', () => {
  const root = makeFixture();
  writeEvidence(root, validEvidence());

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
  assert.equal(result.fileCount, 1);
});

test('check-evidence rejects invalid session economics enums', () => {
  const root = makeFixture();
  const payload = validEvidence();
  payload.sessionEconomics.responseMode = 'verbose';
  payload.sessionEconomics.costSensitivity = 'critical';
  writeEvidence(root, payload);

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /root\.sessionEconomics\.responseMode/);
  assert.match(result.stdout, /root\.sessionEconomics\.costSensitivity/);
});

test('check-evidence rejects non-numeric session economics counters', () => {
  const root = makeFixture();
  const payload = validEvidence();
  payload.sessionEconomics.retryCount = '1';
  writeEvidence(root, payload);

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /root\.sessionEconomics\.retryCount must be a number/);
});
