#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Match the consumer task-manifest vocabulary; do not invent completion states.
const statuses = ['planned', 'in-progress', 'completed', 'abandoned'];
const terminal = new Set(['completed', 'abandoned']);
const target = '.harness/TASK_INDEX.md';
const textCell = (value) => String(value ?? '').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');

export function renderTaskIndex(root) {
  const taskRoot = path.join(root, '.harness/tasks');
  if (!fs.existsSync(path.join(root, 'AGENTS.md'))) throw new Error('Consumer root must contain AGENTS.md');
  const tasks = [];
  if (fs.existsSync(taskRoot)) {
    for (const entry of fs.readdirSync(taskRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const manifest = path.join(taskRoot, entry.name, 'manifest.json');
      if (!fs.existsSync(manifest)) continue;
      const payload = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      if (payload.taskId !== entry.name || !statuses.includes(payload.status)) {
        throw new Error(`Invalid task identity/status: ${entry.name}`);
      }
      tasks.push({ ...payload, dir: entry.name });
    }
  }
  tasks.sort((a, b) => a.dir.localeCompare(b.dir, 'en'));
  const active = tasks.filter((task) => !terminal.has(task.status));
  const counts = statuses.map((status) => `${status}: ${tasks.filter((task) => task.status === status).length}`).join(' · ');
  const lines = [
    '# 当前任务索引', '',
    '由 `.harness/tasks/*/manifest.json` 生成；仅展示当前任务树。状态以 manifest 为准，completed 不代表产品或生产验收。', '',
    `${counts}（当前树共 ${tasks.length} 项；不统计月度归档）`, '',
    '| 当前任务 | 状态 | 优先级 | 最新证据 |',
    '| --- | --- | --- | --- |',
  ];
  for (const task of active) {
    const summary = `evidence/${task.dir}/summary.md`;
    const evidence = fs.existsSync(path.join(root, '.harness', summary)) ? `[summary](./${summary})` : '未提供 summary';
    lines.push(`| [${textCell(task.title ?? task.dir)}](./tasks/${task.dir}/manifest.json) | ${task.status} | ${textCell(task.priority)} | ${evidence} |`);
  }
  if (active.length === 0) lines.push('| 当前树无开放任务；历史与验收 gap 见 STATUS/ARCHIVE | — | — | — |');
  lines.push('', '按目标任务读取 manifest、task packet 和最新 summary；历史入口为 [ARCHIVE](./ARCHIVE.md)。', '');
  return lines.join('\n');
}

export function updateTaskIndex(root, mode = 'read') {
  const output = renderTaskIndex(root);
  const destination = path.join(root, target);
  if (mode === 'write') {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, output, 'utf8');
  } else if (mode === 'check') {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8').replaceAll('\r\n', '\n') !== output) {
      throw new Error('TASK_INDEX is stale or missing; regenerate it explicitly with --write');
    }
  }
  return output;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    let root = process.cwd();
    let mode = 'read';
    for (let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i];
      if (arg === '--root') {
        if (!process.argv[i + 1] || process.argv[i + 1].startsWith('--')) throw new Error('--root requires a path');
        root = path.resolve(process.argv[++i]);
      } else if (arg === '--write' || arg === '--check') {
        if (mode !== 'read') throw new Error('--write and --check are mutually exclusive');
        mode = arg.slice(2);
      } else throw new Error(`Unknown argument: ${arg}`);
    }
    const output = updateTaskIndex(root, mode);
    console.log(mode === 'read' ? output : `Task index ${mode === 'write' ? 'generated' : 'verified'}: ${target}`);
  } catch (error) {
    console.error(`Task index failed: ${error.message}`);
    process.exitCode = 1;
  }
}
