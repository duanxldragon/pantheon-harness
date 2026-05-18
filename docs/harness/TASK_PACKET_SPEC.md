# Task Packet Spec

类型：Contract
归属层：platform
状态：Active

Task packet 是非 trivial 任务的工具无关输入格式。它让 Codex、Claude Code、Cursor、Copilot、OpenHands、Aider 和人工工程师共享同一份任务边界。

## 1. 存放位置

任务包默认存放在：

```text
docs/harness/tasks/YYYY-MM-DD-<task-name>.task.md
```

如果任务来自已有 superpowers plan，可以在 task packet 中引用该 plan，而不是重复全文。

## 2. 必填模板

```md
# Task Packet: <task-name>

## Goal

<one sentence>

## Primary Layer

platform | system/auth | system/iam | system/org | system/config | business/*

## Dependency Layers

- none

## Contract Anchors

- `path/to/contract.md`
- `path/to/design.md`
- `path/to/acceptance.md`

## Scope

### In

- <explicit work>

### Out

- <explicit non-goals>

## Expected Files

### Create

- `path`

### Modify

- `path`

### Do Not Touch

- `path`

## Implementation Notes

- <boundary or sequencing notes>

## Verification Plan

### Backend

- `command`

### Frontend

- `command`

### Browser / Smoke

- `command or none`

## Linkage

- Task ID: `YYYY-MM-DD-task-name`
- OpenSpec Change: `openspec/changes/<name>/` | none
- Superpowers Plan: `docs/superpowers/plans/<file>.md` | none
- Evidence Directory: `.harness/evidence/<task-id>/`
- Review File: `.harness/evidence/<task-id>/review.md` | none

## Evidence Required

- command result summary
- screenshots if UI changed
- smoke JSON if browser flow changed
- review summary

## Human Gates

- <gate or none>

## Completion Checklist

- [ ] Layer and boundary declared
- [ ] Contract anchors read
- [ ] Tests or checks updated
- [ ] Verification run or exception recorded
- [ ] Evidence saved or summarized
- [ ] Docs updated if contracts changed
- [ ] Review completed
```

## 3. Trivial 任务

以下任务可以不创建 task packet：

- typo 修复
- 不影响行为的文档补充
- 只读诊断
- 单文件小范围格式修复

但如果 trivial 任务触碰权限、菜单、schema、i18n、审计、base/ops 继承关系，必须升级为 task packet。

## 4. Human Gate 规则

任务包必须显式列出 human gates。没有 gate 时写 `none`。

必须列为 gate 的事项：

- schema 或迁移变更
- 删除文件或目录
- base 合同变更
- 业务仓库 override base 行为
- 新依赖或新外部服务
- 影响权限、菜单、审计、i18n 的模型变更

## 5. 工具使用

工具 adapter 可以把 task packet 转换成自己的执行格式，但不得丢失：

- layer
- scope
- contract anchors
- verification plan
- evidence required
- human gates

## 6. Machine-Readable Linkage

以下字段是 task packet 与后续 artifact 的最小闭环键：

- `Task ID`：主键，必须与文件名 `<task-id>.task.md` 一致
- `Evidence Directory`：必须指向 `.harness/evidence/<task-id>/`
- `Review File`：如保留 review artifact，必须指向 evidence 目录下文件
- `OpenSpec Change`：如任务来自 OpenSpec，必须显式记录 change 路径；否则写 `none`
- `Superpowers Plan`：如任务来自 `docs/superpowers/plans/*`，必须显式记录；否则写 `none`

这组 linkage 字段用于把 `OpenSpec change / superpowers plan / task packet / evidence / review` 串成可追踪链路。
