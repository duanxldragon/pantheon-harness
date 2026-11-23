#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const POLICY_FILES = [
  'patterns/capability-adaptive-delivery.md',
  'patterns/method-playbook.md',
  'patterns/context-engineering-protocol.md',
  'patterns/execution-guardrails.md',
  'architecture/methodology/workflow-routing.md',
  'architecture/methodology/solo-delivery-tiers.md',
  'architecture/harness/review-loop-spec.md',
];
const RECEIPT = '.harness/method-consumption.json';

function sourceSnapshot(source) {
  const methodVersion = fs.readFileSync(path.join(source, 'VERSION'), 'utf8').trim();
  if (!/^\d+\.\d+\.\d+$/.test(methodVersion)) throw new Error('Invalid method VERSION');
  const files = Object.fromEntries(POLICY_FILES.map((file) => [
    file, createHash('sha256').update(fs.readFileSync(path.join(source, file), 'utf8').replaceAll('\r\n', '\n')).digest('hex'),
  ]));
  return { methodVersion, files };
}

function validateEntries(root, source) {
  const entries = ['AGENTS.md'];
  if (fs.existsSync(path.join(root, 'CLAUDE.md'))) entries.push('CLAUDE.md');
  // A foundation snapshot can contain an inactive inherited English guide.
  // Either active tool entry can route to it; unrelated inherited files are ignored.
  if (entries.some((file) => fs.readFileSync(path.join(root, file), 'utf8').includes('AGENTS.en.md'))) {
    entries.splice(1, 0, 'AGENTS.en.md');
  }
  const expected = path.relative(root, path.join(source, POLICY_FILES[0])).replaceAll(path.sep, '/');
  for (const file of entries) {
    const content = fs.readFileSync(path.join(root, file), 'utf8');
    if (!content.includes(expected)) throw new Error(`${file} must reference ${expected}`);
  }
  return entries;
}

export function checkConsumption({ root, source, update = false }) {
  const snapshot = sourceSnapshot(source);
  const entrypoints = validateEntries(root, source);
  const sourcePath = path.relative(root, source).replaceAll(path.sep, '/') || '.';
  const expected = { schemaVersion: 1, hashFormat: 'sha256-utf8-lf', source: sourcePath, ...snapshot, entrypoints };
  const receiptPath = path.join(root, RECEIPT);
  if (update) {
    fs.mkdirSync(path.dirname(receiptPath), { recursive: true });
    fs.writeFileSync(receiptPath, `${JSON.stringify(expected, null, 2)}\n`, 'utf8');
  } else {
    const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
    if (receipt.schemaVersion !== 1) throw new Error('Unsupported method consumption schema');
    if (receipt.hashFormat !== expected.hashFormat) throw new Error('Unsupported method hash format');
    if (receipt.source !== sourcePath) throw new Error('Method source does not match receipt');
    if (receipt.methodVersion !== snapshot.methodVersion) throw new Error('Method version changed; review before updating receipt');
    if (!receipt.files || Object.keys(receipt.files).length !== POLICY_FILES.length) throw new Error('Incomplete policy snapshot');
    for (const file of POLICY_FILES) {
      if (receipt.files[file] !== snapshot.files[file]) throw new Error(`Consumed method changed: ${file}; review before updating receipt`);
    }
    if (!Array.isArray(receipt.entrypoints) || receipt.entrypoints.length !== entrypoints.length ||
      entrypoints.some((file) => !receipt.entrypoints.includes(file))) throw new Error('Consumer entrypoints changed');
  }
  return expected;
}

function main(argv) {
  const options = { root: process.cwd(), source: null, update: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--update') options.update = true;
    else if (arg === '--root' || arg === '--source') {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`${arg} requires a path`);
      options[arg.slice(2)] = path.resolve(argv[++i]);
    } else if (arg === '--help' || arg === '-h') {
      console.log('Usage: node check-method-consumption.mjs --root <consumer> --source <harness> [--update]');
      return;
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.source) throw new Error('--source is required');
  const result = checkConsumption(options);
  console.log(`Method consumption ${options.update ? 'recorded' : 'verified'}: ${result.methodVersion}, ${POLICY_FILES.length} policies, ${result.entrypoints.join(', ')}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`Method consumption failed: ${error.message}`); process.exitCode = 1; }
}
