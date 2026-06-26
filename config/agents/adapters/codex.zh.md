# Codex 适配说明

English version: [codex.md](./codex.md)

`Codex` 在这里被视为 Pantheon Harness Engineering 协议的执行适配器。

## 开始前必读

1. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
2. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
3. `docs/harness/TASK_PACKET_SPEC.md`
4. `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
5. `docs/harness/REVIEW_LOOP_SPEC.md`
6. 当前仓库的 `AGENTS.md`

## Codex 专属映射

- `.codex/skills/*` 只作为辅助工作流。
- 如果 skill 与 `docs/harness/*` 或仓库契约冲突，以仓库契约为准。
- 验证优先通过 shell 命令执行，并在结果中明确报告命令输出结论。
- 手工编辑文件使用 `apply_patch`。
- 遵守 sandbox 与审批规则。
- 不把聊天历史当作验证证据。

## 输出要求

最终结果至少要说明：

- 改动文件
- 执行命令
- 验证结果
- 证据路径或摘要
- 已知缺口
