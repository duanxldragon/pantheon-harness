# Harness 脚本目录

English version: [README.md](./README.md)

这个目录存放仓库本地的 Harness Engineering 检查脚本。

`agentic-method-kit/` 是可迁移的方法事实来源；这里是当前工作区对这些规则的执行层。

这些脚本可被 Codex、Claude Code、Cursor、GitHub Copilot、OpenHands、Aider 或人工流程共同调用，不绑定某一个代理工具。

## 当前脚本

### `check-task-packet.mjs`

按 `docs/harness/TASK_PACKET_SPEC.md` 校验任务包 Markdown 结构。

### `check-boundaries.mjs`

报告 Pantheon base / business 继承模型中的跨层导入风险。

### `check-evidence.mjs`

校验 `.harness/evidence/**/commands.json` 下的验证证据结构。

### `check-review.mjs`

校验 `.harness/evidence/**/review.md` 下的 machine-readable review artifacts。

### `check-graph-review.mjs`

检查 task packet `Structural Scope`、evidence `graphChecks` 与 review `structuralReview` 是否保持一致。

### `scaffold-graph-review.mjs`

根据 task packet 的 `## Structural Scope`，为 `.harness/evidence/<task-id>/commands.json` 生成或刷新 `graphChecks`，并为 `.harness/evidence/<task-id>/review.md` 生成或刷新 `structuralReview`。

可选地通过 `--import <file>` 导入一次图审查结果，只覆盖 `usedCodeGraph`、`affectedSubgraph`、`checks`、`findings` 和 `notes` 这些结构化字段。

### `build-graph-review-import.mjs`

把保存下来的 CodeGraph 风格 JSON 整理成 `scaffold-graph-review --import` 可直接消费的 `graph-review.json` 结构。

也支持直接拉取实时 `codegraph` CLI 结果，再整理成同一份导入结构。

```powershell
node scripts/harness/build-graph-review-import.mjs --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-callers Authenticate --live-callees Authenticate --write graph-review.json
node scripts/harness/scaffold-graph-review.mjs --write --import graph-review.json sample
```

如果需要先同步索引，或在 Windows 上显式指定 `codegraph.cmd` 路径：

```powershell
node scripts/harness/build-graph-review-import.mjs --sync --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --codegraph-bin C:\tools\codegraph.cmd --live-impact AuthService --live-context "permission service" --write graph-review.json
```

当前行为：

- 支持直接导入 JSON、trace/path/paths 风格 JSON，以及 `--live-callers` / `--live-callees` / `--live-impact` / `--live-context`
- 会把实时 callers/callees/impact/context 结果折叠成 `affectedSubgraph` 与推断后的 `checks`
- 当 `PATH` 找不到 `codegraph` 时，可用 `--codegraph-bin` 或 `CODEGRAPH_BIN` 指定可执行文件

### `scaffold-graph-review.mjs` 实时直写示例

不经过中间 `graph-review.json`，直接把实时 CodeGraph 结果写进任务 evidence / review：

```powershell
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-context "permission service" sample
```

常用 `pantheon-base` 查询模板：

```powershell
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-callers Authenticate --live-callees Authenticate iam-auth
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-impact AuthService iam-auth
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-context "permission service" iam-permission
```

### `check-template-health.mjs`

检查仓库是否具备最小通用 template-governance 面。

### `check-runtime-evidence.mjs`

报告 runtime-sensitive 任务在 evidence 中缺少 runtime logs / metrics / traces / performance 信号或显式 runtime gap 的情况。

### `check-doc-links.mjs`

检查方法与 harness 文档中的内部 Markdown 链接完整性。

### `check-doc-inventory.mjs`

检查关键文档与脚本清单 README 是否列出了它们声明治理的文件。

### `check-sync-drift.mjs`

检查根脚本与 repo-shell 镜像脚本是否仍保持同步。

### `check-backend-response-contract.mjs`

检查是否绕过共享响应封装，直接输出 Gin JSON 响应。

### `check-failure-registry.mjs`

校验 Harness failure registry Markdown 表格，覆盖必需列、枚举值、必填字段、`FR-001` 编号格式，以及未替换的模板占位行。

### Policy 关联

- trivial / non-trivial 判定：`docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md`
- visual evidence 晋升规则：`docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md`
- failure registry 晋升规则：`docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md`

如需完整命令、参数与退出码语义，请看英文原文 [README.md](./README.md)。
