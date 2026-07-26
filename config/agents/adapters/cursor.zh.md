# Cursor 适配说明

English version: [cursor.md](./cursor.md)

`Cursor` 在这里被视为 Pantheon Harness Engineering 协议的实现适配器。

## 开始前必读

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. 当前仓库的 `AGENTS.md`

## Cursor 专属映射

- Cursor 规则应回链到 `docs/harness/*`，不要复制整套协议正文。
- 非琐碎实现任务应从 task packet 起步。
- 大范围编辑前先看当前 diff，避免覆盖用户已有改动。
- 验证命令必须在终端执行，或明确标记为未执行。

## Review

Cursor 可以用于实现或 review，但 review 输出仍必须遵循 `docs/harness/review-loop-spec.md`。

## 能力映射

| Harness 概念 | Cursor 能力 |
|---|---|
| Task Packet | 带边界指令的 Agent 模式 |
| Handoff Protocol | 结构化输出格式 |
| Verification Evidence | 内联 diff、测试面板、终端输出 |
| Review Loop | 内置评审面板 |

## 人类触点契约

维护者在交付回路中只出现在三个触点，其余全程自治。canonical 定义见 [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints)。

1. 需求澄清 — 所有澄清问题在任务入口一次性批量提出；In / Out / 验收标准确认后，不再就范围或方案提问。
2. 门禁决策 — 只在门禁红灯处置、豁免审批、门禁规则变更时找维护者；门禁本身机械运行。
3. 最终验收 — 预先准备渲染证据，对照触点 1 的验收标准做视觉/功能签收。

触点之间：可逆且在范围内的动作不做中途确认；偏移由 Reviewer 对照 task packet 的 In / Out 纠正。只有破坏性/不可逆操作、凭据需求、真正的范围变更才升级到维护者。
