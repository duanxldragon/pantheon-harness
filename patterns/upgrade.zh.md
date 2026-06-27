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

- `pantheon-harness` VERSION 应与消费者仓库 VERSION 匹配
- 升级后运行健康检查：
```bash
node scripts/harness/check-method-health.mjs --strict
```

## 独立模式升级

```text
# 拉取 pantheon-harness 最新更改
git pull origin main

# 或替换为新副本
rm -rf pantheon-harness
cp -r /path/to/new/pantheon-harness .
```

## 工作区模式升级

```text
# 拉取 pantheon-harness 最新版本
cd ../pantheon-harness
git pull origin main

# 更新本地 VERSION 以匹配
cd ../my-consumer-repo
echo "1.3.0" > VERSION

# 验证兼容性
node scripts/harness/check-method-health.mjs --strict
```

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
