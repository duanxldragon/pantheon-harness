import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'scaffold-graph-review.mjs');

const TASK_PACKET = `# Task Packet: sample

## Goal

scaffold graph review

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

- add graph review scaffold

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

- none

## Structural Scope

- Affected Subgraph: \`route -> handler -> service -> repo\`
- Boundary Crossings: \`system/iam -> pkg/*\`
- Risk Nodes: \`permission service\`
- Graph Focus: \`hub-check | cycle-check | call-depth\`

## Verification Plan

- \`node scripts/harness/scaffold-graph-review.mjs --write docs/harness/tasks/sample.task.md\`

## Linkage

- Task ID: \`sample\`
- OpenSpec Change: \`none\`
- Plan References: \`docs/superpowers/plans/sample-plan.md\`, \`.omx/plans/sample-plan.md\`
- Evidence Directory: \`.harness/evidence/sample/\`
- Review File: \`.harness/evidence/sample/review.md\`

## Evidence Required

- review summary

## Human Gates

- none

## Completion Checklist

- [ ] Layer and boundary declared
- [ ] Contract anchors read
- [ ] Verification run or exception recorded
- [ ] Evidence saved or summarized
- [ ] Review completed
`;

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'scaffold-graph-review-'));
  fs.mkdirSync(path.join(root, 'docs', 'harness', 'tasks'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'contracts'), { recursive: true });
  fs.mkdirSync(path.join(root, 'docs', 'superpowers', 'plans'), { recursive: true });
  fs.mkdirSync(path.join(root, '.omx', 'plans'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'contracts', 'example.md'), '# Contract\n');
  fs.writeFileSync(path.join(root, 'docs', 'superpowers', 'plans', 'sample-plan.md'), '# Plan\n');
  fs.writeFileSync(path.join(root, '.omx', 'plans', 'sample-plan.md'), '# OMX Plan\n');
  fs.writeFileSync(path.join(root, 'docs', 'harness', 'tasks', 'sample.task.md'), TASK_PACKET);
  return root;
}

function makeFakeCodegraph(root, handlers, platform = process.platform) {
  const helperPath = path.join(root, 'codegraph-helper.js');
  const commandPath = path.join(root, 'codegraph.cmd');
  const powershellPath = path.join(root, 'codegraph.ps1');
  const posixPath = path.join(root, 'codegraph');
  fs.writeFileSync(
    helperPath,
    `const handlers = ${JSON.stringify(handlers, null, 2)};
const args = process.argv.slice(2);
const command = args[0];
if (command === 'sync') {
  console.log('synced');
  process.exit(0);
}
const payload = handlers[command];
if (!payload) {
  console.error('unknown command');
  process.exit(1);
  }
  console.log(JSON.stringify(payload, null, 2));
`,
  );
  fs.writeFileSync(commandPath, `@echo off\r\nnode "%~dp0\\codegraph-helper.js" %*\r\n`);
  fs.writeFileSync(powershellPath, `node "$PSScriptRoot/codegraph-helper.js" @args\n`);
  fs.writeFileSync(
    posixPath,
    `#!/usr/bin/env sh
node "$(dirname "$0")/codegraph-helper.js" "$@"
`,
  );
  if (platform !== 'win32' && process.platform !== 'win32') {
    fs.chmodSync(posixPath, 0o755);
  }
  return {
    helperPath,
    commandPath,
    powershellPath,
    posixPath,
    codegraphBin: platform === 'win32' ? commandPath : posixPath,
  };
}

test('scaffold-graph-review fake codegraph fixture exposes a POSIX executable wrapper', () => {
  const root = makeFixture();

  const { codegraphBin } = makeFakeCodegraph(root, {}, 'linux');

  assert.equal(codegraphBin, path.join(root, 'codegraph'));
  assert.equal(fs.existsSync(codegraphBin), true);
  assert.equal(
    fs.readFileSync(codegraphBin, 'utf8'),
    `#!/usr/bin/env sh
node "$(dirname "$0")/codegraph-helper.js" "$@"
`,
  );
  if (process.platform !== 'win32') {
    assert.notEqual(fs.statSync(codegraphBin).mode & 0o111, 0);
  }
});

function readReviewJson(root) {
  const reviewPath = path.join(root, '.harness', 'evidence', 'sample', 'review.md');
  const content = fs.readFileSync(reviewPath, 'utf8');
  const match = content.match(/## Machine Readable\s+```json\s*([\s\S]*?)\s*```/m);
  assert.ok(match, 'expected review.md machine-readable block');
  return { content, machine: JSON.parse(match[1]) };
}

test('scaffold-graph-review creates graph review skeleton from task packet', () => {
  const root = makeFixture();

  const output = execFileSync(
    process.execPath,
    [SCRIPT, '--json', '--write', '--root', root, 'docs/harness/tasks/sample.task.md'],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output);

  assert.equal(result.taskId, 'sample');
  assert.equal(result.written, true);

  const evidence = JSON.parse(
    fs.readFileSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json'), 'utf8'),
  );
  assert.equal(evidence.taskId, 'sample');
  assert.equal(evidence.repo, path.basename(root));
  assert.deepEqual(evidence.graphChecks, {
    usedCodeGraph: false,
    affectedSubgraph: ['route -> handler -> service -> repo'],
    checks: ['call-depth', 'cycle', 'hub'],
    findings: [],
    notes: 'scaffolded from task packet Structural Scope; replace after graph review',
  });
  assert.equal(evidence.linkage.taskPacket, 'docs/harness/tasks/sample.task.md');
  assert.equal(evidence.linkage.evidenceDir, '.harness/evidence/sample/');
  assert.equal(evidence.linkage.reviewFile, '.harness/evidence/sample/review.md');
  assert.equal(evidence.linkage.changeRef, 'none');
  assert.deepEqual(evidence.linkage.planRefs, [
    'docs/superpowers/plans/sample-plan.md',
    '.omx/plans/sample-plan.md',
  ]);

  const review = readReviewJson(root).machine;
  assert.equal(review.taskId, 'sample');
  assert.equal(review.verdict, 'changes requested');
  assert.deepEqual(review.structuralReview, {
    affectedSubgraph: ['route -> handler -> service -> repo'],
    checks: ['call-depth', 'cycle', 'hub'],
    findings: [],
    notes: 'scaffolded from task packet Structural Scope; replace after graph review',
  });
  assert.equal(review.linkage.taskPacket, 'docs/harness/tasks/sample.task.md');
  assert.equal(review.linkage.evidence, '.harness/evidence/sample/commands.json');
  assert.equal(review.linkage.reviewFile, '.harness/evidence/sample/review.md');
  assert.equal(review.linkage.changeRef, 'none');
  assert.deepEqual(review.linkage.planRefs, [
    'docs/superpowers/plans/sample-plan.md',
    '.omx/plans/sample-plan.md',
  ]);
});

test('scaffold-graph-review preserves existing evidence and review fields while refreshing graph sections', () => {
  const root = makeFixture();
  fs.mkdirSync(path.join(root, '.harness', 'evidence', 'sample'), { recursive: true });
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'sample', 'commands.json'),
    JSON.stringify(
      {
        taskId: 'sample',
        repo: 'existing-repo',
        agent: { tool: 'codex' },
        commands: [{ command: 'node --test', cwd: '.', status: 'passed' }],
        knownGaps: ['none'],
        graphChecks: {
          usedCodeGraph: true,
          affectedSubgraph: ['stale path'],
          checks: ['hub'],
          findings: ['stale'],
          notes: 'stale',
        },
        linkage: {
          taskPacket: 'docs/harness/tasks/sample.task.md',
          evidenceDir: '.harness/evidence/sample/',
          reviewFile: '.harness/evidence/sample/review.md',
          changeRef: 'none',
          planRefs: ['docs/superpowers/plans/sample-plan.md'],
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(root, '.harness', 'evidence', 'sample', 'review.md'),
    [
      '# Review Summary: sample',
      '',
      '## Machine Readable',
      '```json',
      JSON.stringify(
        {
          taskId: 'sample',
          verdict: 'approved',
          structuralReview: {
            affectedSubgraph: ['stale path'],
            checks: ['hub'],
            findings: ['stale'],
            notes: 'stale',
          },
          linkage: {
            taskPacket: 'docs/harness/tasks/sample.task.md',
            evidence: '.harness/evidence/sample/commands.json',
            reviewFile: '.harness/evidence/sample/review.md',
            changeRef: 'none',
            planRefs: ['docs/superpowers/plans/sample-plan.md'],
          },
        },
        null,
        2,
      ),
      '```',
      '',
      '## Verdict',
      '',
      'approved',
      '',
      '## Findings',
      '',
      '- preserved human note',
      '',
      '## Residual Risk',
      '',
      '- none',
    ].join('\n'),
  );

  execFileSync(process.execPath, [SCRIPT, '--write', '--root', root, 'sample'], {
    encoding: 'utf8',
  });

  const evidence = JSON.parse(
    fs.readFileSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json'), 'utf8'),
  );
  assert.equal(evidence.repo, 'existing-repo');
  assert.equal(evidence.agent.tool, 'codex');
  assert.deepEqual(evidence.commands, [{ command: 'node --test', cwd: '.', status: 'passed' }]);
  assert.deepEqual(evidence.knownGaps, ['none']);
  assert.deepEqual(evidence.graphChecks.affectedSubgraph, ['route -> handler -> service -> repo']);
  assert.deepEqual(evidence.graphChecks.checks, ['call-depth', 'cycle', 'hub']);
  assert.equal(evidence.graphChecks.usedCodeGraph, false);

  const review = readReviewJson(root);
  assert.equal(review.machine.verdict, 'approved');
  assert.deepEqual(review.machine.structuralReview.affectedSubgraph, ['route -> handler -> service -> repo']);
  assert.deepEqual(review.machine.structuralReview.checks, ['call-depth', 'cycle', 'hub']);
  assert.match(review.content, /preserved human note/);
});

test('scaffold-graph-review does not write files in report-only mode', () => {
  const root = makeFixture();

  const output = execFileSync(
    process.execPath,
    [SCRIPT, '--json', '--root', root, 'sample'],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output);

  assert.equal(result.written, false);
  assert.equal(fs.existsSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json')), false);
  assert.equal(fs.existsSync(path.join(root, '.harness', 'evidence', 'sample', 'review.md')), false);
});

test('scaffold-graph-review imports graph review payload and applies it to evidence and review', () => {
  const root = makeFixture();
  const importPath = path.join(root, 'graph-review.json');
  fs.writeFileSync(
    importPath,
    JSON.stringify(
      {
        usedCodeGraph: true,
        affectedSubgraph: ['router -> authz -> policy store'],
        checks: ['sensitive-flow', 'hub'],
        findings: ['validated input reaches permission gate', 'no accidental hub node found'],
        notes: 'derived from codegraph trace and callers walk',
      },
      null,
      2,
    ),
  );

  const output = execFileSync(
    process.execPath,
    [SCRIPT, '--json', '--write', '--import', importPath, '--root', root, 'sample'],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output);

  assert.equal(result.written, true);
  assert.equal(result.graphChecks.usedCodeGraph, true);
  assert.deepEqual(result.graphChecks.affectedSubgraph, ['router -> authz -> policy store']);
  assert.deepEqual(result.graphChecks.checks, ['hub', 'sensitive-flow']);
  assert.deepEqual(result.graphChecks.findings, [
    'validated input reaches permission gate',
    'no accidental hub node found',
  ]);
  assert.equal(result.graphChecks.notes, 'derived from codegraph trace and callers walk');

  const evidence = JSON.parse(
    fs.readFileSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json'), 'utf8'),
  );
  assert.deepEqual(evidence.graphChecks, result.graphChecks);

  const review = readReviewJson(root);
  assert.deepEqual(review.machine.structuralReview, {
    affectedSubgraph: ['router -> authz -> policy store'],
    checks: ['hub', 'sensitive-flow'],
    findings: ['validated input reaches permission gate', 'no accidental hub node found'],
    notes: 'derived from codegraph trace and callers walk',
  });
  assert.match(review.content, /validated input reaches permission gate/);
});

test('scaffold-graph-review falls back to task structural scope when imported payload is partial', () => {
  const root = makeFixture();
  const importPath = path.join(root, 'graph-review-partial.json');
  fs.writeFileSync(
    importPath,
    JSON.stringify(
      {
        usedCodeGraph: true,
        findings: ['manual review confirmed no new cycle'],
        notes: 'partial import',
      },
      null,
      2,
    ),
  );

  execFileSync(
    process.execPath,
    [SCRIPT, '--write', '--import', importPath, '--root', root, 'sample'],
    { encoding: 'utf8' },
  );

  const evidence = JSON.parse(
    fs.readFileSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json'), 'utf8'),
  );
  assert.equal(evidence.graphChecks.usedCodeGraph, true);
  assert.deepEqual(evidence.graphChecks.affectedSubgraph, ['route -> handler -> service -> repo']);
  assert.deepEqual(evidence.graphChecks.checks, ['call-depth', 'cycle', 'hub']);
  assert.deepEqual(evidence.graphChecks.findings, ['manual review confirmed no new cycle']);
  assert.equal(evidence.graphChecks.notes, 'partial import');
});

test('scaffold-graph-review can query live codegraph data and write evidence directly', () => {
  const root = makeFixture();
  const { codegraphBin } = makeFakeCodegraph(root, {
    callers: {
      symbol: 'Authenticate',
      callers: [{ name: 'LoginHandler' }],
    },
    callees: {
      symbol: 'Authenticate',
      callees: [{ name: 'Login' }],
    },
    context: {
      query: 'permission service',
      summary: 'Found relevant symbols.',
      entryPoints: [{ name: 'PermissionService' }],
    },
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT,
      '--json',
      '--write',
      '--root',
      root,
      '--codegraph-path',
      'D:\\repo\\example-app',
      '--codegraph-bin',
      codegraphBin,
      '--live-callers',
      'Authenticate',
      '--live-callees',
      'Authenticate',
      '--live-context',
      'permission service',
      'sample',
    ],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output);

  assert.equal(result.importedFrom, null);
  assert.equal(result.graphChecks.usedCodeGraph, true);
  assert.deepEqual(result.graphChecks.affectedSubgraph, [
    'Authenticate -> Login',
    'LoginHandler -> Authenticate',
    'context:permission service -> PermissionService',
  ]);
  assert.deepEqual(result.graphChecks.checks, ['call-depth']);
  assert.deepEqual(result.graphChecks.findings, ['Found relevant symbols.']);

  const evidence = JSON.parse(
    fs.readFileSync(path.join(root, '.harness', 'evidence', 'sample', 'commands.json'), 'utf8'),
  );
  assert.deepEqual(evidence.graphChecks, result.graphChecks);
});
