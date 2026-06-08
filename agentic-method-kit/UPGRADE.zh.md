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

如果升级后的仓库还没有保存 evidence 或 review 工件，初始化阶段先不要给 evidence/review 检查加 `--strict`。等仓库至少有一个互相关联的 task packet、`commands.json` 和 `review.md` 后再启用 strict。

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

## 交付治理元数据

升级 task packet 时，补齐：

- `## Delivery Governance`
- `Design Gate`
- `Development Gate`
- `QA Acceptance Gate`
- `GitHub Governance Gate`

升级 review artifact 时，在 machine-readable JSON block 中加入 `deliveryGovernanceReview`。

升级 failure registry 时，补齐：

- `failureClass`
- `ownerLayer`
- `occurrenceCount`
- `promotionDecision`
- `promotionDeadline`
- `githubSignal`

使用这些字段先分类 CI 或 PR 红灯，再决定是否进入大范围代码清理。
