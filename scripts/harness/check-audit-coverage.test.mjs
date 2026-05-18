import test from 'node:test';
import assert from 'node:assert';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve('.');
const SCRIPT = path.join(ROOT, 'scripts', 'harness', 'check-audit-coverage.mjs');

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-audit-coverage-'));
  ['pantheon-base', 'pantheon-ops'].forEach(repo => {
    const backend = path.join(root, repo, 'backend');
    fs.mkdirSync(path.join(backend, 'cmd', 'server'), { recursive: true });
    fs.mkdirSync(path.join(backend, 'modules'), { recursive: true });
    fs.writeFileSync(path.join(backend, 'cmd', 'server', 'main.go'), 'package main\nfunc main() { r.Use(OperationLogMiddleware()) }\n');
  });
  return root;
}

test('check-audit-coverage.mjs: pass with audit metadata', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'handler.go'),
    'func (h *Handler) Create(c *gin.Context) { common.SetAuditMetadata(c, "title") }\n'
  );
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'routes.go'),
    'func Routes(r *gin.RouterGroup) { r.POST("/item", h.Create) }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.findingCount, 0);
  assert.strictEqual(result.warningCount, 0);
  assert.strictEqual(result.writeRouteCount, 1);
});

test('check-audit-coverage.mjs: detect missing audit metadata warning', () => {
  const root = makeFixture();
  
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'handler.go'),
    'func (h *Handler) Update(c *gin.Context) { fmt.Println("no audit") }\n'
  );
  fs.writeFileSync(
    path.join(root, 'pantheon-ops', 'backend', 'modules', 'routes.go'),
    'func Routes(r *gin.RouterGroup) { r.PUT("/item", h.Update) }\n'
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.warningCount, 1);
  assert.ok(result.results[1].warnings[0].reason.includes('relies on global operation log defaults'));
});

test('check-audit-coverage.mjs: detect missing middleware finding', () => {
  const root = makeFixture();
  fs.writeFileSync(path.join(root, 'pantheon-ops', 'backend', 'cmd', 'server', 'main.go'), 'package main\nfunc main() { fmt.Println("no middleware") }\n');

  const output = execFileSync(process.execPath, [SCRIPT, '--json', '--root', root], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  const result = JSON.parse(output);
  assert.strictEqual(result.results[1].findings[0].reason, 'OperationLogMiddleware is not registered in server entrypoint');
});
