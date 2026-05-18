import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve('.');
const SCRIPT = path.join(ROOT, 'scripts', 'harness', 'check-backend-dto-contract.mjs');

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

test('backend dto contract warns when a handler returns an internal service model', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dto-contract-'));
  const repoRoot = path.join(dir, 'pantheon-base', 'backend', 'modules', 'system', 'sample');

  writeFile(
    path.join(repoRoot, 'sample_model.go'),
    `package sample

type Sample struct {
	ID uint64
}
`,
  );

  writeFile(
    path.join(repoRoot, 'sample_service.go'),
    `package sample

type SampleService struct {}

func (s *SampleService) Get() (*Sample, error) {
	return &Sample{}, nil
}
`,
  );

  writeFile(
    path.join(repoRoot, 'sample_handler.go'),
    `package sample

import "pantheon-platform/backend/pkg/common"

type SampleHandler struct {
	svc *SampleService
}

func (h *SampleHandler) Get(c *gin.Context) {
	item, err := h.svc.Get()
	if err != nil {
		return
	}
	common.Success(c, item)
}
`,
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--root', dir, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const report = JSON.parse(output);

  assert.equal(report.warningCount, 1);
  assert.match(report.results[0].warnings[0].reason, /service return type is not DTO-like/);
});

test('backend dto contract accepts DTO-like response types', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dto-contract-'));
  const repoRoot = path.join(dir, 'pantheon-base', 'backend', 'modules', 'system', 'sample');

  writeFile(
    path.join(repoRoot, 'sample_dto.go'),
    `package sample

type SampleResponse struct {
	ID uint64
}
`,
  );

  writeFile(
    path.join(repoRoot, 'sample_service.go'),
    `package sample

type SampleService struct {}

func (s *SampleService) Get() (*SampleResponse, error) {
	return &SampleResponse{}, nil
}
`,
  );

  writeFile(
    path.join(repoRoot, 'sample_handler.go'),
    `package sample

import "pantheon-platform/backend/pkg/common"

type SampleHandler struct {
	svc *SampleService
}

func (h *SampleHandler) Get(c *gin.Context) {
	resp, err := h.svc.Get()
	if err != nil {
		return
	}
	common.Success(c, resp)
}
`,
  );

  const output = execFileSync(process.execPath, [SCRIPT, '--root', dir, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const report = JSON.parse(output);

  assert.equal(report.findingCount, 0);
  assert.equal(report.warningCount, 0);
});
