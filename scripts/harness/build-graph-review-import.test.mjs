import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(TEST_DIR, 'build-graph-review-import.mjs');

function makeFixture() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'build-graph-review-import-'));
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

test('build-graph-review-import fake codegraph fixture exposes a POSIX executable wrapper', () => {
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

test('build-graph-review-import converts trace-like JSON into scaffold import shape', () => {
  const root = makeFixture();
  const source = path.join(root, 'trace.json');
  fs.writeFileSync(
    source,
    JSON.stringify(
      {
        usedCodeGraph: true,
        trace: [{ symbol: 'router' }, { symbol: 'authz' }, { symbol: 'policy store' }],
        checks: ['sensitive-flow', 'hub'],
        findings: [
          { message: 'validated input reaches permission gate' },
          { reason: 'no accidental hub node found' },
        ],
        notes: 'derived from saved codegraph trace',
      },
      null,
      2,
    ),
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--source', source], { encoding: 'utf8' });
  const result = JSON.parse(output);

  assert.deepEqual(result, {
    usedCodeGraph: true,
    affectedSubgraph: ['router -> authz -> policy store'],
    checks: ['hub', 'sensitive-flow'],
    findings: ['validated input reaches permission gate', 'no accidental hub node found'],
    notes: 'derived from saved codegraph trace',
  });
});

test('build-graph-review-import passes through direct import shape and writes output file', () => {
  const root = makeFixture();
  const source = path.join(root, 'direct.json');
  const outputFile = path.join(root, 'graph-review.json');
  fs.writeFileSync(
    source,
    JSON.stringify(
      {
        usedCodeGraph: true,
        affectedSubgraph: ['service -> repo', 'api -> service'],
        checks: ['hub', 'cycle'],
        findings: ['no new cycle'],
        notes: 'ready for scaffold import',
      },
      null,
      2,
    ),
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--source', source, '--write', outputFile], {
    encoding: 'utf8',
  });
  const result = JSON.parse(output);

  assert.deepEqual(result.affectedSubgraph, ['api -> service', 'service -> repo']);
  assert.equal(fs.existsSync(outputFile), true);
  const written = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  assert.deepEqual(written, result);
});

test('build-graph-review-import falls back across paths and finding summaries', () => {
  const root = makeFixture();
  const source = path.join(root, 'paths.json');
  fs.writeFileSync(
    source,
    JSON.stringify(
      {
        paths: [
          [{ label: 'entry' }, { label: 'handler' }, { label: 'repo' }],
          ['job', 'worker', 'sink'],
        ],
        findings: [{ summary: 'reviewed sink path' }],
      },
      null,
      2,
    ),
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--source', source], { encoding: 'utf8' });
  const result = JSON.parse(output);

  assert.equal(result.usedCodeGraph, true);
  assert.deepEqual(result.affectedSubgraph, ['entry -> handler -> repo', 'job -> worker -> sink']);
  assert.deepEqual(result.checks, []);
  assert.deepEqual(result.findings, ['reviewed sink path']);
});

test('build-graph-review-import supports live codegraph callers and callees', () => {
  const root = makeFixture();
  const { codegraphBin } = makeFakeCodegraph(root, {
    callers: {
      symbol: 'Authenticate',
      callers: [{ name: 'LoginHandler' }],
    },
    callees: {
      symbol: 'Authenticate',
      callees: [{ name: 'Login' }, { name: 'SystemUser' }],
    },
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT,
      '--codegraph-path',
      'D:\\repo\\example-app',
      '--codegraph-bin',
      codegraphBin,
      '--live-callers',
      'Authenticate',
      '--live-callees',
      'Authenticate',
    ],
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${root};${process.env.PATH ?? ''}` },
    },
  );
  const result = JSON.parse(output);

  assert.equal(result.usedCodeGraph, true);
  assert.deepEqual(result.affectedSubgraph, [
    'Authenticate -> Login',
    'Authenticate -> SystemUser',
    'LoginHandler -> Authenticate',
  ]);
  assert.deepEqual(result.checks, ['call-depth']);
});

test('build-graph-review-import supports sync and live impact/context sources', () => {
  const root = makeFixture();
  const { codegraphBin } = makeFakeCodegraph(root, {
    impact: {
      symbol: 'AuthService',
      affected: [{ name: 'LoginHandler' }, { name: 'CreateSession' }],
    },
    context: {
      query: 'permission service',
      summary: 'Found relevant symbols.',
      entryPoints: [{ name: 'PermissionService' }, { name: 'PermissionHandler' }],
    },
  });

  const output = execFileSync(
    process.execPath,
    [
      SCRIPT,
      '--sync',
      '--codegraph-path',
      'D:\\repo\\example-app',
      '--codegraph-bin',
      codegraphBin,
      '--live-impact',
      'AuthService',
      '--live-context',
      'permission service',
    ],
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${root};${process.env.PATH ?? ''}` },
    },
  );
  const result = JSON.parse(output);

  assert.deepEqual(result.affectedSubgraph, [
    'AuthService -> CreateSession',
    'AuthService -> LoginHandler',
    'context:permission service -> PermissionHandler',
    'context:permission service -> PermissionService',
  ]);
  assert.deepEqual(result.checks, ['hub']);
  assert.match(result.notes, /permission service/);
});

test('build-graph-review-import resolves PowerShell codegraph wrappers from PATH on Windows', () => {
  if (process.platform !== 'win32') {
    return;
  }

  const root = makeFixture();
  makeFakeCodegraph(root, {
    callers: {
      symbol: 'Authenticate',
      callers: [{ name: 'LoginHandler' }],
    },
  });

  const output = execFileSync(
    process.execPath,
    [SCRIPT, '--codegraph-path', 'D:\\repo\\example-app', '--live-callers', 'Authenticate'],
    {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${root};${process.env.PATH ?? ''}` },
    },
  );
  const result = JSON.parse(output);

  assert.deepEqual(result.affectedSubgraph, ['LoginHandler -> Authenticate']);
  assert.deepEqual(result.checks, ['call-depth']);
});
