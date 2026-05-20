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

### `check-backend-response-contract.mjs`

检查是否绕过共享响应封装，直接输出 Gin JSON 响应。

### `check-failure-registry.mjs`

校验 Harness failure registry Markdown 表格，覆盖必需列、枚举值、必填字段、`FR-001` 编号格式，以及未替换的模板占位行。

如需完整命令、参数与退出码语义，请看英文原文 [README.md](./README.md)。
