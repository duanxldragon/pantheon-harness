import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { renderTaskIndex, updateTaskIndex } from './render-task-index.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'task-index-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'AGENTS.md'), '# Consumer\n');
  const write = (id, status, title = id) => {
    const dir = path.join(root, '.harness/tasks', id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ taskId: id, status, title, priority: 'P1' }));
  };
  return { root, write };
}

test('indexes active manifests, preserves their states, and excludes terminal/archive detail', (t) => {
  const { root, write } = fixture(t);
  write('planned-task', 'planned', 'Plan | detail\nnext');
  write('active-task', 'in-progress');
  write('completed-task', 'completed');
  const before = fs.readFileSync(path.join(root, '.harness/tasks/active-task/manifest.json'));
  const summary = path.join(root, '.harness/evidence/active-task/summary.md');
  fs.mkdirSync(path.dirname(summary), { recursive: true });
  fs.writeFileSync(summary, '# Latest evidence\n');
  const result = updateTaskIndex(root, 'write');
  assert.match(result, /planned: 1 · in-progress: 1 · completed: 1 · abandoned: 0/);
  assert.match(result, /Plan \\\| detail next/);
  assert.match(result, /evidence\/active-task\/summary.md/);
  assert.doesNotMatch(result, /tasks\/completed-task\/manifest/);
  assert.deepEqual(fs.readFileSync(path.join(root, '.harness/tasks/active-task/manifest.json')), before);
  assert.doesNotThrow(() => updateTaskIndex(root, 'check'));
});

test('read/check never refresh the index; stale states fail until explicitly regenerated', (t) => {
  const { root, write } = fixture(t);
  write('sample', 'planned');
  assert.throws(() => updateTaskIndex(root, 'check'), /stale or missing/);
  assert.equal(fs.existsSync(path.join(root, '.harness/TASK_INDEX.md')), false);
  updateTaskIndex(root, 'write');
  const before = fs.readFileSync(path.join(root, '.harness/TASK_INDEX.md'));
  write('sample', 'in-progress');
  assert.match(renderTaskIndex(root), /in-progress/);
  assert.throws(() => updateTaskIndex(root, 'check'), /stale/);
  assert.deepEqual(fs.readFileSync(path.join(root, '.harness/TASK_INDEX.md')), before);
  updateTaskIndex(root, 'write');
  assert.doesNotThrow(() => updateTaskIndex(root, 'check'));
});

test('bad roots, malformed JSON, unknown statuses and mismatched IDs fail visibly', (t) => {
  const { root, write } = fixture(t);
  assert.throws(() => renderTaskIndex(path.join(root, 'missing')), /AGENTS.md/);
  write('sample', 'done');
  assert.throws(() => renderTaskIndex(root), /Invalid task/);
  const manifest = path.join(root, '.harness/tasks/sample/manifest.json');
  fs.writeFileSync(manifest, JSON.stringify({ taskId: 'other', status: 'completed' }));
  assert.throws(() => renderTaskIndex(root), /Invalid task/);
  fs.writeFileSync(manifest, '{');
  assert.throws(() => renderTaskIndex(root), SyntaxError);
});

test('an archive-only consumer reports an empty current tree without inferring acceptance', (t) => {
  const { root } = fixture(t);
  const dir = path.join(root, '.harness/archive/2026-11/tasks/old-task');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'manifest.json'), '{invalid historical fixture');
  assert.match(renderTaskIndex(root), /当前树共 0 项/);
  assert.match(renderTaskIndex(root), /completed 不代表产品或生产验收/);
});
