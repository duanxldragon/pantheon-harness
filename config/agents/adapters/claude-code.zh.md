# Claude Code 适配说明

English version: [claude-code.md](./claude-code.md)

`Claude Code` 在这里被视为 Pantheon Harness Engineering 协议的执行与评审适配器。

## 开始前必读

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. `docs/harness/review-loop-spec.md`
6. 当前仓库的 `CLAUDE.md` 和 `AGENTS.md`

## Claude 专属映射

- 多步骤任务使用 `TodoWrite` 或等价 checklist。
- `Skill` 工作流只作为适配层，不替代仓库协议本身。
- 非琐碎任务优先使用 task packet。
- 做 review 时遵循 `review-loop-spec.md` 的 findings-first 格式。
- 验证证据按 `verification-evidence-spec.md` 保存或汇总。

## Guardrail

Claude 专属 prompt 文件不能变成架构、权限、i18n、审计或继承规则的唯一来源。

## 人类触点契约

维护者在交付回路中只出现在三个触点，其余全程自治。canonical 定义见 [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints)。

1. 需求澄清 — 所有澄清问题在任务入口一次性批量提出；In / Out / 验收标准确认后，不再就范围或方案提问。
2. 门禁决策 — 只在门禁红灯处置、豁免审批、门禁规则变更时找维护者；门禁本身机械运行。
3. 最终验收 — 预先准备渲染证据，对照触点 1 的验收标准做视觉/功能签收。

触点之间：可逆且在范围内的动作不做中途确认；偏移由 Reviewer 对照 task packet 的 In / Out 纠正。只有破坏性/不可逆操作、凭据需求、真正的范围变更才升级到维护者。
