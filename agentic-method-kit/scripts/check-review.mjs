#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function parseArgs(argv) {
  const options = { root: process.cwd(), config: 'agentic-method-kit/config/method.config.json', strict: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--root') options.root = path.resolve(argv[++i]);
    else if (arg === '--config') options.config = argv[++i];
    else if (arg === '--strict') options.strict = true;
  }
  return options;
}

function loadConfig(root, configPath) {
  return JSON.parse(fs.readFileSync(path.join(root, configPath), 'utf8'));
}

function discoverReviewFiles(root, config) {
  const result = [];
  const base = path.join(root, config.evidenceDir);
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile() && entry.name === 'review.md') result.push(full);
    }
  }
  walk(base);
  return result.sort();
}

function extractMachineReadableBlock(content) {
  const match = content.match(/## Machine Readable\s+```json\s*([\s\S]*?)\s*```/m);
  if (!match) {
    return { error: 'missing ## Machine Readable JSON block' };
  }
  try {
    return { value: JSON.parse(match[1]) };
  } catch (error) {
    return { error: `invalid machine-readable JSON: ${error.message}` };
  }
}

function validateReview(filePath, root) {
  const errors = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const extracted = extractMachineReadableBlock(content);
  if (extracted.error) {
    return { file: path.relative(root, filePath).replaceAll(path.sep, '/'), errors: [extracted.error] };
  }

  const review = extracted.value;
  const relativeFile = path.relative(root, filePath).replaceAll(path.sep, '/');
  const expectedTaskId = path.basename(path.dirname(filePath));
  const validVerdicts = new Set([
    'approved',
    'changes requested',
    'blocked',
    'approved with documented P2 follow-up',
  ]);

  if (review.taskId !== expectedTaskId) {
    errors.push(`taskId must match evidence directory name "${expectedTaskId}"`);
  }
  if (!validVerdicts.has(review.verdict)) {
    errors.push('verdict is invalid');
  }
  if (!review.linkage || typeof review.linkage !== 'object') {
    errors.push('linkage is required');
  } else {
    const expectedTaskPacket = `docs/harness/tasks/${expectedTaskId}.task.md`;
    const expectedEvidence = `.harness/evidence/${expectedTaskId}/commands.json`;
    const expectedReview = `.harness/evidence/${expectedTaskId}/review.md`;

    if (review.linkage.taskPacket !== expectedTaskPacket) {
      errors.push(`linkage.taskPacket must be "${expectedTaskPacket}"`);
    } else if (!fs.existsSync(path.join(root, review.linkage.taskPacket))) {
      errors.push(`linked task packet missing: ${review.linkage.taskPacket}`);
    }

    if (review.linkage.evidence !== expectedEvidence) {
      errors.push(`linkage.evidence must be "${expectedEvidence}"`);
    } else if (!fs.existsSync(path.join(root, review.linkage.evidence))) {
      errors.push(`linked evidence missing: ${review.linkage.evidence}`);
    }

    if (review.linkage.reviewFile !== expectedReview) {
      errors.push(`linkage.reviewFile must be "${expectedReview}"`);
    }

    if (typeof review.linkage.changeRef !== 'string' || review.linkage.changeRef.length === 0) {
      errors.push('linkage.changeRef must be a non-empty string');
    } else if (review.linkage.changeRef !== 'none' && !fs.existsSync(path.join(root, review.linkage.changeRef))) {
      errors.push(`linked OpenSpec change missing: ${review.linkage.changeRef}`);
    }

    if (!Array.isArray(review.linkage.planRefs)) {
      errors.push('linkage.planRefs must be an array');
    } else {
      review.linkage.planRefs.forEach((ref, index) => {
        if (typeof ref !== 'string' || ref.length === 0) {
          errors.push(`linkage.planRefs[${index}] must be a non-empty string`);
        } else if (!fs.existsSync(path.join(root, ref))) {
          errors.push(`linked plan missing: ${ref}`);
        }
      });
    }
  }

  return { file: relativeFile, errors };
}

const options = parseArgs(process.argv.slice(2));
const config = loadConfig(options.root, options.config);
const results = discoverReviewFiles(options.root, config).map((file) => validateReview(file, options.root));
const errorCount = results.reduce((n, r) => n + r.errors.length, 0);
console.log(JSON.stringify({ errorCount, results }, null, 2));
process.exitCode = options.strict && errorCount > 0 ? 1 : 0;
