# OpenHands 适配说明

English version: [openhands.md](./openhands.md)

`OpenHands` 在这里被视为 Pantheon Harness Engineering 协议的执行适配器。

## 开始前必读

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. 当前仓库的 `AGENTS.md`

## OpenHands 专属映射

- 非琐碎任务使用 task packet 作为 issue 级指令。
- 尽量在工作区内执行验证命令。
- 命令摘要和工件按 evidence spec 持久化。
- 删除、schema、base contract、permission、i18n、audit、inheritance 相关变更，不能绕过人工关口。

## 能力映射

| Harness 概念 | OpenHands 能力 |
|---|---|
| Task Packet | 任务指令格式 |
| Handoff Protocol | 结构化输出 |
| Verification Evidence | 动作历史、文件 diff |
| Review Loop | 会话回放 |

## 人类触点契约

维护者在交付回路中只出现在三个触点，其余全程自治。canonical 定义见 [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints)。

1. 需求澄清 — 所有澄清问题在任务入口一次性批量提出；In / Out / 验收标准确认后，不再就范围或方案提问。
2. 门禁决策 — 只在门禁红灯处置、豁免审批、门禁规则变更时找维护者；门禁本身机械运行。
3. 最终验收 — 预先准备渲染证据，对照触点 1 的验收标准做视觉/功能签收。

触点之间：可逆且在范围内的动作不做中途确认；偏移由 Reviewer 对照 task packet 的 In / Out 纠正。只有破坏性/不可逆操作、凭据需求、真正的范围变更才升级到维护者。
