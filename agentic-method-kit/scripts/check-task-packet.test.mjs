import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-task-packet.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-task-packet-kit-'));
  fs.mkdirSync(path.join(root, 'agentic-method-kit', 'config'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'sample'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'agentic-method-kit', 'config', 'method.config.json'),
    JSON.stringify({ taskPacketDir: 'docs/harness/tasks' }),
  );
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'HARNESS_ENGINEERING_CONTRACT.md'), 'anchor stub');
  fs.writeFileSync(path.join(root, '.harness', 'evidence', 'sample', 'review.md'), '# Review');
  return root;
}

function writeTask(root, content) {
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), content);
}

function validTask() {
  return [
    '# Task Packet: sample',
    '',
    '## Goal',
    '',
    'Validate the method kit task packet checker fixture.',
    '',
    '## Primary Layer',
    '',
    'method',
    '',
    '## Dependency Layers',
    '',
    '- none',
    '',
    '## Harness Profile',
    '',
    '- Template: custom',
    '- Overlay: none',
    '- Quality Profile: none',
    '- Portable Failure Class: method-health-gap',
    '- Owner Layer: portable-method',
    '- Coverage Dimensions:',
    '  - method-health',
    '',
    '## Contract Anchors',
    '',
    '- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`',
    '',
    '## Scope',
    '',
    '### In',
    '',
    '- validate fixture metadata',
    '',
    '### Out',
    '',
    '- production code changes',
    '',
    '## Expected Files',
    '',
    '### Create',
    '',
    '- none',
    '',
    '### Modify',
    '',
    '- none',
    '',
    '### Do Not Touch',
    '',
    '- src/',
    '',
    '## Implementation Notes',
    '',
    '- fixture only',
    '',
    '## Verification Plan',
    '',
    '- node agentic-method-kit/scripts/check-task-packet.mjs --root .',
    '',
    '## Method Readiness',
    '',
    '- Consumer-Specific Controls: none',
    '- Required Sensors: command',
    '- Required Evidence: command summary',
    '- Ratchet Decision: template-updated',
    '- Deferred Code Issues: none',
    '',
    '## Delivery Governance',
    '',
    '- Design Gate: short boundary note',
    '- Development Gate: expected files declared',
    '- QA Acceptance Gate: command',
    '- GitHub Governance Gate: method-gate',
    '',
    '## Linkage',
    '',
    '- Task ID: sample',
    '- OpenSpec Change: none',
    '- Plan References: none',
    '- Evidence Directory: .harness/evidence/sample/',
    '- Review File: .harness/evidence/sample/review.md',
    '',
    '## Evidence Required',
    '',
    '- command summary',
    '',
    '## Human Gates',
    '',
    '- none',
    '',
    '## Completion Checklist',
    '',
    '- [x] Layer and boundary declared',
    '- [x] Contract anchors read',
    '- [x] Verification run or exception recorded',
    '- [x] Evidence saved or summarized',
    '- [x] Review completed',
  ].join('\n');
}

test('check-task-packet accepts method-first task metadata', () => {
  const root = makeFixture();
  writeTask(root, validTask());

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
});

test('check-task-packet rejects packets that only use legacy Superpowers Plan', () => {
  const root = makeFixture();
  writeTask(root, validTask().replace('- Plan References: none', '- Superpowers Plan: none'));

  const result = spawnSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.errorCount, 1);
  assert.equal(payload.warningCount, 0);
  assert.match(payload.results[0].errors.join('\n'), /missing required item: Plan References/);
});

test('check-task-packet rejects packets without plan references linkage', () => {
  const root = makeFixture();
  writeTask(root, validTask().replace('- Plan References: none\n', ''));

  const result = spawnSync(process.execPath, [SCRIPT, '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing required item: Plan References/);
});

test('check-task-packet accepts comma-delimited plan references', () => {
  const root = makeFixture();
  fs.mkdirSync(path.join(root, 'docs', 'superpowers', 'plans'), { recursive: true });
  fs.mkdirSync(path.join(root, '.omx', 'plans'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'superpowers', 'plans', 'sample-plan.md'), '# Plan');
  fs.writeFileSync(path.join(root, '.omx', 'plans', 'sample-plan.md'), '# OMX Plan');
  writeTask(
    root,
    validTask().replace(
      '- Plan References: none',
      '- Plan References: docs/superpowers/plans/sample-plan.md, .omx/plans/sample-plan.md',
    ),
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
  assert.equal(result.warningCount, 0);
});
