# 升级指南

English version: [upgrade.md](./upgrade.md)

当您要更新一个已经包含以下内容的现有仓库时，使用这份指南：

- `pantheon-harness/`（独立模式）
- `../pantheon-harness/`（工作区模式）

## 升级策略

1. 更新 `pantheon-harness/` 或从 harness 仓库拉取最新更改
2. 如有需要，对齐本地 harness 文件
3. 然后重新运行 harness checks

## 版本兼容性

产品 `VERSION` 不与 harness 方法 `VERSION` 相等。保持各自版本；方法/Repo Shell 的兼容性由既有 `METHOD_VERSION.json` / `SHELL_VERSION.json` 约束，不为文档消费重写产品发行锁。

## 工作区方法消费

1. 在现有 `AGENTS.md` 与工具入口中引用 [能力适配交付规则](./capability-adaptive-delivery.md)，保留消费者本地合同和所有权。
2. 审查 intentional 方法改动后，在消费者根目录运行：

```powershell
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness --update
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness
```

receipt 记录已审查的版本与规范化文本 SHA256；验证不自动更新，来源缺失/哈希变化直接报错。Unreleased 更新以哈希区分，不代表已正式发布。CI/离线环境要提供同一 harness 快照。Base 共享产品文件仍通过正式 foundation release 同步到 Ops；方法引用不替代它。

## 独立模式方法消费

保留本地 method 副本和现有产品版本；按副本位置显式提供 `--source`，更新入口相对链接，审查后记录 receipt。升级已有目录前保留可回退的版本，不用未经检查的递归删除命令。

## 升级后验证

### 独立模式

```text
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root . --strict
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

### 工作区模式

```text
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --root .
```

如果升级后的仓库还没有保存 evidence 或 review 工件，初始化阶段先不要给 evidence/review 检查加 `--strict`。等仓库至少有一个互相关联的 task packet、`commands.json` 和 `review.md` 后再启用 strict。

## 方法优先 Ratchet 元数据

从旧 task packet 格式升级时，为每个非平凡 task packet 补齐：

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
