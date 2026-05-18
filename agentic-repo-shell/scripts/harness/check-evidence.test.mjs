import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';

const SCRIPT = fs.existsSync(path.resolve('agentic-repo-shell/scripts/harness/check-evidence.mjs'))
  ? path.resolve('agentic-repo-shell/scripts/harness/check-evidence.mjs')
  : path.resolve('scripts/harness/check-evidence.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-evidence-'));
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'sample'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'superpowers', 'plans'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), '# Task');
  fs.writeFileSync(path.join(root, 'docs', 'superpowers', 'plans', 'sample-plan.md'), '# Plan');
  fs.writeFileSync(path.join(root, '.harness', 'evidence', 'sample', 'review.md'), '# Review');
  return root;
}

function writeCommands(root, taskId, payload) {
  const dir = path.join(root, '.harness', 'evidence', taskId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'commands.json'), JSON.stringify(payload, null, 2));
}

const VALID_PAYLOAD = {
  taskId: 'sample',
  repo: 'pantheon-platform',
  agent: { tool: 'claude-code' },
  commands: [
    {
      command: 'node scripts/harness/check-evidence.mjs',
      cwd: '.',
      status: 'passed',
      durationMs: 100,
    },
  ],
  linkage: {
    taskPacket: 'docs/harness/tasks/sample.task.md',
    evidenceDir: '.harness/evidence/sample/',
    reviewFile: '.harness/evidence/sample/review.md',
    changeRef: 'none',
    planRefs: ['docs/superpowers/plans/sample-plan.md'],
  },
  knownGaps: [],
};

const VALID_UI_PAYLOAD = {
  ...VALID_PAYLOAD,
  browserEvidence: [
    {
      viewport: 'desktop',
      url: '/system/user',
      screenshot: 'screenshots/user-desktop.png',
      consoleErrors: [],
      checkedStates: ['loading', 'empty', 'error', 'permission'],
    },
  ],
};

test('check-evidence accepts a valid evidence fixture', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', VALID_PAYLOAD);

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
  assert.equal(result.fileCount, 1);
});

test('check-evidence accepts valid browser evidence for a UI task', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', VALID_UI_PAYLOAD);

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.errorCount, 0);
  assert.equal(result.warningCount, 0);
});

test('check-evidence flags an unknown agent tool in strict mode', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', { ...VALID_PAYLOAD, agent: { tool: 'unknown-tool' } });

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /root\.agent\.tool must be one of/);
});

test('check-evidence flags malformed JSON in strict mode', () => {
  const root = makeFixture();
  const dir = path.join(root, '.harness', 'evidence', 'broken');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'commands.json'), '{ not valid json');

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /Invalid JSON/);
});

test('check-evidence rejects an unsupported command status', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', {
    ...VALID_PAYLOAD,
    commands: [
      { command: 'echo hi', cwd: '.', status: 'unknown-status' },
    ],
  });

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /commands\[0\]\.status must be one of/);
});

test('check-evidence rejects browser evidence missing viewport metadata', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', {
    ...VALID_PAYLOAD,
    browserEvidence: [
      {
        url: '/system/user',
        screenshot: 'screenshots/user-desktop.png',
        consoleErrors: [],
      },
    ],
  });

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /browserEvidence\[0\]\.viewport must be a non-empty string/);
});

test('check-evidence rejects browser evidence missing screenshot and visual gap', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', {
    ...VALID_PAYLOAD,
    browserEvidence: [
      {
        viewport: 'mobile',
        url: '/system/user',
        consoleErrors: [],
      },
    ],
  });

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /browserEvidence\[0\] must include a screenshot or explicit visualGap/,
  );
});

test('check-evidence rejects linkage when task packet path does not match taskId', () => {
  const root = makeFixture();
  writeCommands(root, 'sample', {
    ...VALID_PAYLOAD,
    linkage: {
      ...VALID_PAYLOAD.linkage,
      taskPacket: 'docs/harness/tasks/other.task.md',
    },
  });

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /root\.linkage\.taskPacket does not exist|must match root\.taskId/);
});
