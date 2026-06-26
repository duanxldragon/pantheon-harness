import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'check-graph-review.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'graph-review-'));
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'sample'), { recursive: true });
  return root;
}

function writeTaskPacket(root, content) {
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), content);
}

function writeEvidence(root, payload) {
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'sample', 'commands.json'),
    JSON.stringify(payload, null, 2),
  );
}

function writeReview(root, payload) {
  const content = [
    '# Review Summary: sample',
    '',
    '## Machine Readable',
    '```json',
    JSON.stringify(payload, null, 2),
    '```',
  ].join('\n');
  fs.writeFileSync(path.join(root, '.harness', 'evidence', 'sample', 'review.md'), content);
}

const VALID_TASK = `# Task Packet: sample

## Goal

graph review fixture

## Primary Layer

system/iam

## Dependency Layers

- none

## Harness Profile

- Template: custom
- Overlay: none
- Coverage Dimensions:
  - architecture-fitness

## Contract Anchors

- \`docs/contracts/example.md\`

## Scope

### In

- validate graph review consistency

### Out

- none

## Expected Files

### Create

- \`.harness/evidence/sample/commands.json\`
- \`.harness/evidence/sample/review.md\`

### Modify

- none

### Do Not Touch

- \`src/\`

## Implementation Notes

- permission boundary review

## Structural Scope

- Affected Subgraph: \`route -> handler -> service -> repo\`
- Boundary Crossings: \`system/iam -> pkg/*\`
- Risk Nodes: \`permission service\`
- Graph Focus: \`cycle-check | hub-check | call-depth\`

## Verification Plan

- \`node scripts/harness/check-graph-review.mjs --strict\`

## Linkage

- Task ID: \`sample\`
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: \`.harness/evidence/sample/\`
- Review File: \`.harness/evidence/sample/review.md\`

## Evidence Required

- review summary

## Human Gates

- none

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
`;

function validEvidence() {
  return {
    taskId: 'sample',
    linkage: {
      taskPacket: 'docs/harness/tasks/sample.task.md',
      evidenceDir: '.harness/evidence/sample/',
      reviewFile: '.harness/evidence/sample/review.md',
      changeRef: 'none',
      planRefs: [],
    },
    knownGaps: [],
    graphChecks: {
      usedCodeGraph: true,
      affectedSubgraph: ['route -> handler -> service -> repo'],
      checks: ['call-depth', 'cycle', 'hub'],
      findings: [],
      notes: 'none',
    },
  };
}

function validReview() {
  return {
    taskId: 'sample',
    verdict: 'approved',
    structuralReview: {
      affectedSubgraph: ['route -> handler -> service -> repo'],
      checks: ['call-depth', 'cycle', 'hub'],
      findings: [],
      notes: 'none',
    },
    linkage: {
      taskPacket: 'docs/harness/tasks/sample.task.md',
      evidence: '.harness/evidence/sample/commands.json',
      reviewFile: '.harness/evidence/sample/review.md',
      changeRef: 'none',
      planRefs: [],
    },
  };
}

test('check-graph-review passes when task packet, evidence, and review agree', () => {
  const root = makeFixture();
  writeTaskPacket(root, VALID_TASK);
  writeEvidence(root, validEvidence());
  writeReview(root, validReview());

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--strict', '--root', root], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.equal(result.warningCount, 0);
  assert.deepEqual(result.reviewedTasks, ['sample']);
});

test('check-graph-review warns when graph-reviewed task is missing graph checks', () => {
  const root = makeFixture();
  writeTaskPacket(root, VALID_TASK);
  writeEvidence(root, { ...validEvidence(), graphChecks: undefined });
  writeReview(root, validReview());

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing evidence\.graphChecks/);
});

test('check-graph-review warns when structural metadata disagrees', () => {
  const root = makeFixture();
  writeTaskPacket(root, VALID_TASK);
  writeEvidence(root, {
    ...validEvidence(),
    graphChecks: {
      ...validEvidence().graphChecks,
      affectedSubgraph: ['route -> handler -> orchestrator'],
    },
  });
  writeReview(root, validReview());

  const result = spawnSync(process.execPath, [SCRIPT, '--strict', '--root', root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /affected subgraph does not match/);
});
