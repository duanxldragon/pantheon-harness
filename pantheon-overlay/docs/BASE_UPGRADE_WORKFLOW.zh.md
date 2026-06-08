# Base Upgrade Workflow

English version: [BASE_UPGRADE_WORKFLOW.md](./BASE_UPGRADE_WORKFLOW.md)

当派生仓库需要采用更新版本的 `pantheon-base` 时，使用这份工作流。

默认目标不是“同步 base/main”，而是“升级到某个经过门禁的 foundation release”。

## 1. 选择目标 Base Release

- 优先使用显式 tag，例如 `base-v0.8.0`。
- 次优先使用稳定 release line，例如 `release/0.8`。
- 只有紧急例外才允许固定未发布 commit hash，并且必须记录原因。

## 2. 审阅上游 Release 说明

至少审阅：

- release notes
- consumer impact summary
- upgrade notes

然后再阅读 `pantheon-base` 中变更过的关键文件，尤其是：

- `AGENTS.md`
- `DESIGN.md`
- `docs/contracts/*`
- `docs/designs/*`
- `docs/acceptances/*`

## 3. 更新业务仓库继承文件

在 `docs/PROJECT_INHERITANCE.md` 中更新：

- base release line
- base version
- 任何发生变化的 required reading docs
- 任何变化后的本地业务影响

推荐把继承模式明确写成 `foundation-release-consumer`，而不是继续使用“跟随 main”的语义。

## 3.1 强制 Base/Ops 代码同步

`pantheon-ops` 是 `pantheon-base` 中标准 backoffice 的业务扩展。
规则是：

- platform 和 `system/*` 修复属于 `pantheon-base`
- `pantheon-ops` 可以增加 `business/*` 模块和显式 integration points
- generic drift 在被接受为 ops 变更前，必须先评估是否需要 backport
- pseudo-drift 不应继续长出新的 ops-only 修改

在每次 base upgrade 前后都运行：

如果这些检查维护在独立方法仓库中，就从那个仓库对目标工作区执行。
如果目标业务仓库已经本地 vendoring 了相关检查脚本，也可以直接在本地运行副本。

```powershell
node harness-engineering/pantheon-overlay/scripts/harness/check-overlay-health.mjs --json --root <workspace>
node harness-engineering/pantheon-overlay/scripts/harness/check-inheritance-contract.mjs --strict --root <workspace>
node harness-engineering/pantheon-overlay/scripts/harness/triage-base-drift.mjs --business pantheon-ops --json --root <workspace>
```

按以下方式理解 drift categories：

| Category | Meaning | Required action |
|---|---|---|
| `generic drift` | ops 中出现了可复用的 platform/system 变更 | backport 到 `pantheon-base`，或记录为什么不回灌 |
| `pseudo-drift` | 模块名归一化后本质相同的代码 | 不要继续做本地编辑；等工作区共享成熟后折叠掉 |
| `business mount` | 显式业务集成接缝 | 只有在它确实是最窄挂载点时才保留 |
| `business-specific drift` | 本地产品行为 | 仅在有业务文档和 evidence 支撑时保留在 ops |
| `business-only` | ops 独有业务文件 | 如果属于业务范围则保留 |
| `base-only` | base 中有、ops 中没有的文件 | 判断是已经间接继承，还是确实需要升级引入 |

如果升级后仍然存在 `generic drift`，在接受任何本地 override 之前，必须遵循 [`docs/harness/BASE_DRIFT_BACKPORT_POLICY.md`](./harness/BASE_DRIFT_BACKPORT_POLICY.md)。

## 4. 应用本地 Overlay 调整

- 只更新受 base 变化影响的业务模块
- 只要可能，就把 platform 和 system-domain 修复留在 `pantheon-base`

## 5. 重新验证

运行与受影响范围匹配的验证集合：

- 受影响后端模块的 backend tests
- 受影响前端模块的 frontend build 和 checks
- 对浏览器路径变化运行 gstack browse 或 QA

## 6. 记录本次升级

记录：

- 旧的 base release/version
- 新的 base release/version
- 受影响的业务模块
- 已知后续缺口
