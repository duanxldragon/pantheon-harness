# Human 适配说明

English version: [human.md](./human.md)

人工工程师同样是 Pantheon Harness Engineering 协议的一等参与者。

## 开始前必读

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. 当前仓库的 `AGENTS.md`

## 人工工作流

对于非琐碎任务：

1. 创建或引用 task packet。
2. 声明主责层与依赖层。
3. 阅读 contract anchors。
4. 做聚焦改动。
5. 运行验证命令。
6. 保存或汇总 evidence。
7. 发起 review。

人工工作和 agent 工作使用同一套完成定义，不存在“人工就可以跳过协议”的例外。

## 人类触点契约

向 agent 委派工作时，维护者在交付回路中只出现在三个触点，其余全程自治。canonical 定义见 [workflow-routing — Human Touchpoints](../../../architecture/methodology/workflow-routing.md#human-touchpoints)。

1. 需求澄清 — 在任务入口一次性回答批量澄清问题，确认 In / Out / 验收标准。
2. 门禁决策 — 处置门禁红灯、审批豁免、变更门禁规则；门禁本身机械运行。
3. 最终验收 — 使用 agent 预先准备的渲染证据，对照触点 1 的验收标准做视觉/功能签收。

触点之间不应期待可逆范围内动作的中途确认；agent 只在破坏性/不可逆操作、凭据需求、真正的范围变更时升级。
