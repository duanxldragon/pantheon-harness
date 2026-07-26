# Codex 适配说明

English version: [codex.md](./codex.md)

`Codex` 在这里被视为 Pantheon Harness Engineering 协议的执行适配器。

## 开始前必读

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. `docs/harness/review-loop-spec.md`
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

## 能力映射

| Harness 概念 | Codex 能力 |
|---|---|
| Task Packet | 带边界指令的 CLI prompt |
| Handoff Protocol | 结构化输出格式 |
| Verification Evidence | shell 命令输出与文件生成 |
| Review Loop | 多轮会话 |

## 人类触点契约

维护者在交付回路中只出现在三个触点，其余全程自治。canonical 定义见 [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints)。

1. 需求澄清 — 所有澄清问题在任务入口一次性批量提出；In / Out / 验收标准确认后，不再就范围或方案提问。
2. 门禁决策 — 只在门禁红灯处置、豁免审批、门禁规则变更时找维护者；门禁本身机械运行。
3. 最终验收 — 预先准备渲染证据，对照触点 1 的验收标准做视觉/功能签收。

触点之间：可逆且在范围内的动作不做中途确认；偏移由 Reviewer 对照 task packet 的 In / Out 纠正。只有破坏性/不可逆操作、凭据需求、真正的范围变更才升级到维护者。
