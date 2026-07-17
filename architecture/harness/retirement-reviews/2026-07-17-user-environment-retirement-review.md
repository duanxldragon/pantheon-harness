---
title: 2026-07-17 User-Environment Retirement Review
doc_type: Assessment
layer: method
status: Approved
updated_at: 2026-07-17
linked_contracts:
  - architecture/harness/harness-retirement-review.md
  - architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md
---

# 2026-07-17 User-Environment Retirement Review

## 触发条件

[2026-07-15 Model-Era Retirement Review](./2026-07-15-model-era-retirement-review.md) 处理了仓库侧资产（删除 37 个 gstack vendored 副本等），并记录"gstack 插件在用户环境独立安装"。本次审查收尾用户环境侧：

- 维护者反馈：全局 skills 每会话注入约 40 个 skill 描述，占用上下文并干扰模型路由判断（模型能力增强后，过时 skills 产生反效果）
- superpowers / gstack 已连续多个任务不再使用；交付闭环由 harness 方法（Task Packet / tiers / gates）+ 仓库原生工具承接

## 逐条结论

| # | 资产 | 位置 | 当初防的 failure | 现状 | 结论 | 回滚条件 |
|---|---|---|---|---|---|---|
| 1 | gstack skills 全家桶（39 个目录：qa/ship/design-*/plan-*-review/browse/investigate/codex wrapper 等） | `~/.claude/skills/` | 旧模型缺乏浏览器 QA、规划评审、发布流程的内建能力 | 每会话全量注入描述（上下文成本 + 路由干扰）；方法文档 v1.4.0 已解绑；浏览器证据由 base 原生 Playwright smoke + capture 脚本覆盖 | **retire**：整体移入 `~/.claude/skills-retired-2026-07-17/` | 目录原样搬回即恢复；若某单项能力确有缺口，单独搬回该项而非全家桶 |
| 2 | superpowers 插件 v6.0.3 | `~/.claude/plugins/`（未启用） | 旧模型缺乏 plan/execute 工作流纪律 | settings.json 未启用，零会话影响；方法引用已降级 legacy | **retire**：建议 `/plugin` 卸载（不影响会话，仅占磁盘） | 重新安装插件 |
| 3 | openspec 工具 | `pantheon-harness/tools/openspec/` | 变更规格管理 | `changes/` 仅剩空 archive（2026-06-26 后零活动）；但 AGENTS.md 布局与 `config/method.config.json` `openSpecChangesDir` 仍引用 | **keep-dormant**：不进会话上下文、零运行成本；删除需联动 config/checker，收益不成比例 | 若 change-identity 流程重启则激活；若下次审查仍零活动可升级为 remove |
| 4 | impeccable（`~/.claude/skills/` 与 `~/.codex/skills/` 消费副本） | 用户环境 | UI 视觉质量靠 runtime 默认行为不可靠（概率性 failure，与模型强弱无关） | 活跃引用：workflow-routing UI Gate、base/ops AGENTS.md | **keep**：两处消费副本均已从 `pantheon-harness/skills/impeccable/`（canonical，见 skills-lock.json）同步 | — |
| 5 | grill-me | `pantheon-harness/skills/` | 方案盲区靠自查不可靠 | workflow-routing 方案挑战环节活跃引用 | **keep** | — |

## 原则（延续 2026-07-15 审查）

防**旧模型弱点**的资产退役；防**runtime 概率性 failure 与责任边界**的资产保留。skills 的存在本身有上下文成本——注入但不使用的 skill 是负资产。

## 交付闭环影响

gstack/superpowers 退役后，需求→设计→开发→测试→验收闭环的能力槽位由以下承接（详见 workflow-routing.md）：

| 阶段 | 原承接（已退役） | 现承接 |
|---|---|---|
| 需求澄清 | office-hours / superpowers brainstorm | plan-first path + grill-me 挑战 |
| 设计评审 | plan-ceo-review / plan-eng-review / plan-design-review | grill-me + human gate（L2 走 Task Packet 评审视角声明） |
| 开发执行 | superpowers plan/execute | 三权分立：Claude plan/review + Codex 执行（CLAUDE.md model tiers） |
| UI 质量 | design-review / qa | impeccable 门禁 + DESIGN.md §7 契约 + 机械门禁（check-ui-contract，见 base） |
| 测试验收 | qa / qa-only / ship | Playwright smoke（tests/smoke）+ capture 脚本证据 + ACCEPTANCE_CHECKLIST 人工验收 + quality.yml 门禁 |
| 发布 | ship / land-and-deploy | repo-pr-gate skill + branch-pr-workflow.md + foundation release 流程 |
