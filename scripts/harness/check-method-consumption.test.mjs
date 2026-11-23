import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { checkConsumption, POLICY_FILES } from './check-method-consumption.mjs';

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'method-consumption-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const source = path.join(dir, 'harness');
  const root = path.join(dir, 'consumer');
  fs.mkdirSync(root, { recursive: true });
  fs.mkdirSync(source, { recursive: true });
  fs.writeFileSync(path.join(source, 'VERSION'), '1.4.0\n');
  for (const file of POLICY_FILES) {
    fs.mkdirSync(path.dirname(path.join(source, file)), { recursive: true });
    fs.writeFileSync(path.join(source, file), `# ${file}\n`);
  }
  for (const file of ['AGENTS.md', 'CLAUDE.md']) {
    fs.writeFileSync(path.join(root, file), 'Read ../harness/patterns/capability-adaptive-delivery.md\n');
  }
  checkConsumption({ root, source, update: true });
  return { root, source, receipt: path.join(root, '.harness/method-consumption.json') };
}

test('records and verifies adoption without changing product version or refreshing evidence', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'VERSION'), '0.18.9\n');
  const bytes = fs.readFileSync(f.receipt);
  assert.equal(checkConsumption(f).methodVersion, '1.4.0');
  assert.deepEqual(fs.readFileSync(f.receipt), bytes);
  assert.equal(fs.readFileSync(path.join(f.root, 'VERSION'), 'utf8'), '0.18.9\n');
});

test('source edits fail validation until explicitly reviewed and updated', (t) => {
  const f = fixture(t);
  const bytes = fs.readFileSync(f.receipt);
  fs.appendFileSync(path.join(f.source, POLICY_FILES[0]), 'Changed policy\n');
  assert.throws(() => checkConsumption(f), /Consumed method changed/);
  assert.deepEqual(fs.readFileSync(f.receipt), bytes);
  checkConsumption({ ...f, update: true });
  assert.doesNotThrow(() => checkConsumption(f));
});

test('Git CRLF/LF checkout differences preserve the same method snapshot', (t) => {
  const f = fixture(t);
  for (const file of POLICY_FILES) {
    const target = path.join(f.source, file);
    fs.writeFileSync(target, fs.readFileSync(target, 'utf8').replaceAll('\n', '\r\n'));
  }
  assert.doesNotThrow(() => checkConsumption(f));
});

test('method version, wrong source, incomplete receipt and invalid JSON fail visibly', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.source, 'VERSION'), '1.5.0\n');
  assert.throws(() => checkConsumption(f), /Method version changed/);
  checkConsumption({ ...f, update: true });
  const receipt = JSON.parse(fs.readFileSync(f.receipt, 'utf8'));
  receipt.source = '../other';
  fs.writeFileSync(f.receipt, JSON.stringify(receipt));
  assert.throws(() => checkConsumption(f), /source does not match/);
  receipt.source = '../harness';
  delete receipt.files[POLICY_FILES[0]];
  fs.writeFileSync(f.receipt, JSON.stringify(receipt));
  assert.throws(() => checkConsumption(f), /Incomplete policy/);
  fs.writeFileSync(f.receipt, '{');
  assert.throws(() => checkConsumption(f), SyntaxError);
});

test('removing a tool entry link or adding an unlinked entry blocks update too', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'CLAUDE.md'), '# stale entry\n');
  assert.throws(() => checkConsumption({ ...f, update: true }), /CLAUDE.md must reference/);
  fs.writeFileSync(path.join(f.root, 'CLAUDE.md'), 'Read ../harness/patterns/capability-adaptive-delivery.md\n');
  fs.writeFileSync(path.join(f.root, 'AGENTS.en.md'), '# stale translation\n');
  fs.appendFileSync(path.join(f.root, 'AGENTS.md'), 'English guide: AGENTS.en.md\n');
  assert.throws(() => checkConsumption(f), /AGENTS.en.md must reference/);
});

test('an inactive inherited English guide does not require a shared-source override', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'AGENTS.en.md'), '# historical foundation guide\n');
  assert.doesNotThrow(() => checkConsumption(f));
  assert.deepEqual(checkConsumption(f).entrypoints, ['AGENTS.md', 'CLAUDE.md']);
});

test('a stale English guide activated only by Claude blocks adoption', (t) => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'AGENTS.en.md'), '# stale guide\n');
  fs.appendFileSync(path.join(f.root, 'CLAUDE.md'), 'English guide: AGENTS.en.md\n');
  assert.throws(() => checkConsumption(f), /AGENTS.en.md must reference/);
  assert.throws(() => checkConsumption({ ...f, update: true }), /AGENTS.en.md must reference/);
  fs.appendFileSync(path.join(f.root, 'AGENTS.en.md'), 'Read ../harness/patterns/capability-adaptive-delivery.md\n');
  assert.throws(() => checkConsumption(f), /Consumer entrypoints changed/);
  checkConsumption({ ...f, update: true });
  assert.doesNotThrow(() => checkConsumption(f));
});

test('missing source files or receipts are failures, not automatic adoption', (t) => {
  const f = fixture(t);
  fs.unlinkSync(f.receipt);
  assert.throws(() => checkConsumption(f), /ENOENT/);
  fs.unlinkSync(path.join(f.source, POLICY_FILES[0]));
  assert.throws(() => checkConsumption({ ...f, update: true }), /ENOENT/);
  assert.equal(fs.existsSync(f.receipt), false);
});

test('CLI requires an explicit source and rejects unsupported flags', (t) => {
  const f = fixture(t);
  const script = fileURLToPath(new URL('./check-method-consumption.mjs', import.meta.url));
  for (const args of [[], ['--source'], ['--source', '--update'], ['--strict']]) {
    const result = spawnSync(process.execPath, [script, ...args], { cwd: f.root, encoding: 'utf8', windowsHide: true });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Method consumption failed/);
  }
  const pass = spawnSync(process.execPath, [script, '--root', f.root, '--source', f.source], { encoding: 'utf8', windowsHide: true });
  assert.equal(pass.status, 0, pass.stderr);
  assert.match(pass.stdout, /Method consumption verified/);
});
