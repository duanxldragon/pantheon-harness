# GitHub Copilot 适配说明

English version: [github-copilot.md](./github-copilot.md)

`GitHub Copilot` 在这里被视为 Pantheon Harness Engineering 协议的本地辅助与 PR 辅助适配器。

## 开始前必读

1. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
2. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
3. `docs/harness/TASK_PACKET_SPEC.md`
4. 当前仓库的 `AGENTS.md`

## Copilot 专属映射

- Copilot 生成的建议必须回到 contracts 和 task scope 上校验。
- PR 摘要必须包含 layer、verification、evidence、known gaps。
- 仓库检查未通过前，Copilot 生成代码不能视为可接受结果。
- Copilot review comment 在适用时使用 `P0 / P1 / P2` 严重级别。
