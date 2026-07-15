---
title: 2026-07-15 Model-Era Retirement Review
doc_type: Assessment
layer: method
status: Approved
updated_at: 2026-07-15
linked_contracts:
  - architecture/harness/harness-retirement-review.md
  - architecture/harness/harness-engineering-contract.md
---

# 2026-07-15 Model-Era Retirement Review

## 触发条件

按 [Harness Retirement Review](../harness-retirement-review.md) 第 2 节执行：

- 模型重大升级（2026 年中主流 agent runtime 原生具备 plan mode、subagent 编排、workflow 扇出能力）
- OMX / codex-flow / superpowers 已连续多个任务不再使用
- 相关路由规则已成为 friction（新会话仍被引导到不存在或不使用的工具）

## 逐条结论

| # | 规则 / artifact | 当初防的 failure | 现状 | 结论 | 回滚条件 |
|---|---|---|---|---|---|
| 1 | `workflow-routing.md` 中 OMX 作为外层编排 owner（$deep-interview/$ralplan/$ultragoal/$team/$ralph） | 旧模型缺乏可靠的规划与持久目标能力 | runtime 原生 plan mode + Task Packet 已覆盖；OMX 不再日常使用 | **replace**：路由改为 capability 表述（plan-first path） | 若 runtime 原生规划能力不足以承载 L2 任务，恢复专用编排工具路由 |
| 2 | `codex-flow` / `dynamic-workflow` 作为内层并行引擎 + "codex-flow Contract" 章节 | 旧模型单上下文无法处理批量/并行扫描 | subagent / workflow 编排 / CI matrix 原生可用 | **replace**：改为 "Parallel Fan-Out Contract"（工具无关） | 若无 resumable 扇出等价物且任务需要，恢复 codex-flow |
| 3 | `codex-workflow-quick-reference.md`（codex-flow 专属操作手册） | 同上 | 引用的 workflow 文件与 launcher 已不使用 | **remove** | git 历史可恢复（commit 本次之前） |
| 4 | skills/ 下 37 个 gstack-* vendored 目录 | 无（vendored 插件副本，从未被任何合同或消费仓引用） | gstack 插件在用户环境独立安装，vendored 副本零引用 | **remove** | git 历史可恢复；如需 gstack 能力，用独立安装的插件 |
| 5 | skills/ui-ux-pro-max | 无引用 | 零引用；impeccable 已覆盖 UI 门禁 | **remove** | git 历史可恢复 |
| 6 | skills/openspec-*（4 个） | OpenSpec 流程封装 | 零路由引用；OpenSpec 作为 change identity adapter 的地位不变 | **remove**（概念保留在 tool-adapter-matrix） | git 历史可恢复 |
| 7 | skills/{backport-to-base,docs-cutover,workspace-cutover,triage-base-drift} | 一次性 shell 迁移任务 | 迁移已完成，互相引用但无外部入口 | **remove** | git 历史可恢复 |
| 8 | skills/{pantheon-base-foundation,pantheon-workspace-routing} | 工作区路由封装 | 内容路由到已退役的 superpowers/codex-flow | **remove**（路由职责归 `workflow-routing.md`） | git 历史可恢复 |
| 9 | `harness-methodology.zh.md` §8.3 subagent 强制路由表 | 旧模型判断力不足，需要逐场景规定 | 模型可自行判断委派边界 | **downgrade**：从强制表格降为原则表述 | 若出现连续多任务的 context 管理失误，恢复显式表格 |
| 10 | task-packet / verification-evidence spec 中 Superpowers/OMX/codex-flow plan refs | 保证历史工件可追溯 | 历史工件仍需有效 | **keep**（措辞降级为 legacy，校验行为不变） | — |
| 11 | `impeccable` UI 门禁 | UI 视觉质量靠 runtime 默认行为不可靠 | 该 failure 仍真实存在（概率性 runtime） | **keep** | — |
| 12 | `grill-me` 方案挑战 | 方案盲区靠自查不可靠 | 同上，且 base 已继承引用 | **keep** | — |
| 13 | 质量门禁矩阵、Human Gate、角色分离、Task Packet、Evidence First | runtime 概率性与责任边界 | 与模型聪明程度无关，防的是流程与责任缺口 | **keep** | — |

## 原则

本次退役的判断标准：**约束防的是"旧模型能力不足"还是"runtime 概率性/责任边界"**。

- 前者（强制 subagent 路由表、专用编排工具、vendored 技能副本）随模型升级退役。
- 后者（证据门禁、Human Gate、角色分离、UI 视觉门禁）与模型智力无关，全部保留。

## 影响与不变量

- 消费仓（pantheon-base / pantheon-ops）对 `grill-me`、`impeccable` 的引用不受影响。
- `docs/superpowers/` 历史工件与旧 task packets 的 legacy plan references 继续有效；校验脚本与测试 fixtures 不变。
- `AGENTS.md` 的 OMX 管理标记本次不动（该文件由外部工具管理，如清理另开任务）。

## 关联

- Task Packet: `docs/harness/tasks/2026-07-15-model-era-retirement-review.task.md`
- Evidence: `.harness/evidence/2026-07-15-model-era-retirement-review/`
- 迁移史: [superpowers-migration.md](../../methodology/superpowers-migration.md)
