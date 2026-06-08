# Upgrade Guide

English version: [UPGRADE.md](./UPGRADE.md)

当你要更新一个已经包含以下内容的现有仓库时，使用这份指南：

- `agentic-method-kit/`
- 基于 `agentic-repo-shell/` 派生出来的仓库本地文件

## 升级策略

- 先升级 `agentic-method-kit/`
- 再对齐仓库本地 shell 文件
- 然后重新运行 harness checks

## 1.0.0

基线版本。

升级后的推荐验证命令：

```text
node agentic-method-kit/scripts/check-task-packet.mjs --root .
node agentic-method-kit/scripts/check-evidence.mjs --root . --strict
node agentic-method-kit/scripts/check-review.mjs --root . --strict
node agentic-method-kit/scripts/check-adoption.mjs --root .
```

## 方法优先 Ratchet 元数据

从旧 task packet 格式升级时，为每个 non-trivial task packet 补齐：

- `Quality Profile`
- `Portable Failure Class`
- `Owner Layer`
- `## Method Readiness`
- `Consumer-Specific Controls`
- `Required Sensors`
- `Required Evidence`
- `Ratchet Decision`
- `Deferred Code Issues`

同时更新已保存的 evidence 和 review artifact：

- evidence `commands.json` 应包含 `methodReadiness.ownerLayer`、`methodReadiness.ratchetDecision`、`methodReadiness.deferredCodeIssues`
- review `review.md` 的 machine-readable JSON 应包含 `methodReview`

如果重复失败已经记录，但暂时不修改 guide、template、gate、sensor 或 adapter，使用 `registry-only`。
