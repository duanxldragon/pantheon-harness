#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function parseArgs(argv) {
  const options = { root: process.cwd(), config: 'agentic-method-kit/config/method.config.json' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--root') options.root = path.resolve(argv[++i]);
    if (arg === '--config') options.config = argv[++i];
  }
  return options;
}

function loadConfig(root, configPath) {
  return JSON.parse(fs.readFileSync(path.join(root, configPath), 'utf8'));
}

function readTaskFiles(root, config) {
  const dir = path.join(root, config.taskPacketDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.task.md')).map((f) => path.join(dir, f));
}

function requireMatch(content, regex, message, errors) {
  if (!regex.test(content)) errors.push(message);
}

function validateTask(filePath, root) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const taskId = path.basename(filePath).replace(/\.task\.md$/, '');
  requireMatch(content, /^# Task Packet:/m, 'missing task packet heading', errors);
  requireMatch(content, /^## Harness Profile$/m, 'missing harness profile section', errors);
  requireMatch(content, /^- Template:\s*(admin-platform|api-service|event-processor|dashboard|ui-heavy-product|custom)$/m, 'missing or invalid harness template', errors);
  requireMatch(content, /^- Overlay:\s*.+$/m, 'missing harness overlay', errors);
  requireMatch(content, /^- Quality Profile:\s*.+$/m, 'missing quality profile', errors);
  requireMatch(
    content,
    /^- Portable Failure Class:\s*(instruction-gap|task-boundary-gap|architecture-drift|test-gap|static-sensor-gap|runtime-evidence-gap|security-boundary-gap|ci-signal-noise|method-health-gap|none)$/m,
    'missing or invalid portable failure class',
    errors,
  );
  requireMatch(
    content,
    /^- Owner Layer:\s*(portable-method|consumer-template|consumer-repository|agent-adapter|no-action)$/m,
    'missing or invalid owner layer',
    errors,
  );
  requireMatch(content, /^- Coverage Dimensions:\s*$/m, 'missing coverage dimensions', errors);
  requireMatch(content, /^## Method Readiness$/m, 'missing method readiness section', errors);
  requireMatch(content, /^- Consumer-Specific Controls:\s*.+$/m, 'missing consumer-specific controls', errors);
  requireMatch(content, /^- Required Sensors:\s*.+$/m, 'missing required sensors', errors);
  requireMatch(content, /^- Required Evidence:\s*.+$/m, 'missing required evidence', errors);
  requireMatch(
    content,
    /^- Ratchet Decision:\s*(no-repeat-observed|guide-updated|sensor-added|gate-updated|template-updated|adapter-updated|registry-only)$/m,
    'missing or invalid ratchet decision',
    errors,
  );
  requireMatch(content, /^- Deferred Code Issues:\s*.+$/m, 'missing deferred code issues', errors);
  if (/^## Structural Scope$/m.test(content)) {
    requireMatch(content, /^- Affected Subgraph:\s*.+$/m, 'missing structural affected subgraph', errors);
    requireMatch(content, /^- Boundary Crossings:\s*.+$/m, 'missing structural boundary crossings', errors);
    requireMatch(content, /^- Risk Nodes:\s*.+$/m, 'missing structural risk nodes', errors);
    requireMatch(content, /^- Graph Focus:\s*.+$/m, 'missing structural graph focus', errors);
  }
  requireMatch(content, /^## Linkage$/m, 'missing linkage section', errors);
  requireMatch(content, new RegExp(`^- Task ID:\\s*${taskId}$`, 'm'), 'linkage task id mismatch', errors);
  requireMatch(content, new RegExp(`^- Evidence Directory:\\s*\\.harness/evidence/${taskId}/$`, 'm'), 'linkage evidence dir mismatch', errors);
  requireMatch(content, new RegExp(`^- Review File:\\s*\\.harness/evidence/${taskId}/review\\.md|none$`, 'm'), 'linkage review file mismatch', errors);
  return { file: path.relative(root, filePath).replaceAll(path.sep, '/'), errors };
}

const options = parseArgs(process.argv.slice(2));
const config = loadConfig(options.root, options.config);
const results = readTaskFiles(options.root, config).map((file) => validateTask(file, options.root));
const errorCount = results.reduce((n, r) => n + r.errors.length, 0);
console.log(JSON.stringify({ errorCount, results }, null, 2));
process.exitCode = errorCount > 0 ? 1 : 0;
