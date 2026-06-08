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
  fs.writeFileSync(
    path.join(root, 'agentic-method-kit', 'config', 'method.config.json'),
    JSON.stringify({ taskPacketDir: 'docs/harness/tasks' }),
  );
  return root;
}

function writeTask(root, content) {
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), content);
}

function validTask() {
  return [
    '# Task Packet: sample',
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
    '## Method Readiness',
    '',
    '- Consumer-Specific Controls: none',
    '- Required Sensors: command',
    '- Required Evidence: command summary',
    '- Ratchet Decision: template-updated',
    '- Deferred Code Issues: none',
    '',
    '## Linkage',
    '',
    '- Task ID: sample',
    '- Evidence Directory: .harness/evidence/sample/',
    '- Review File: .harness/evidence/sample/review.md',
  ].join('\n');
}

test('check-task-packet accepts method-first task metadata', () => {
  const root = makeFixture();
  writeTask(root, validTask());

  const output = execFileSync(process.execPath, [SCRIPT, '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
});

test('check-task-packet rejects stale packets without method readiness', () => {
  const root = makeFixture();
  const stale = validTask()
    .replace('- Quality Profile: none\n', '')
    .replace('- Portable Failure Class: method-health-gap\n', '')
    .replace('- Owner Layer: portable-method\n', '')
    .replace(/\n## Method Readiness[\s\S]*?\n## Linkage/, '\n## Linkage');
  writeTask(root, stale);

  const result = spawnSync(process.execPath, [SCRIPT, '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing quality profile/);
  assert.match(result.stdout, /missing method readiness section/);
});
