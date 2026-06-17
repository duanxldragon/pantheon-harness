---
title: Solo Delivery Tiers
doc_type: Method
layer: method
status: Active
updated_at: 2026-06-17
---

# Solo Delivery Tiers

本文定义 Pantheon 当前阶段面向个人开发者的默认交付分级。

目标不是把方法做得更重，而是让 `pantheon-base` 保持稳定低维护，让 `pantheon-ops` 保持交付速度，同时继续让 Codex / Claude Code 更懂你的边界和完成定义。

本分级是对通用 Harness 方法的 repo-local 收敛，不替代：

- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`

当仓库合同要求更严格时，以仓库合同为准。

## 1. 适用背景

当前默认前提：

- 主要开发者是个人维护者，而不是多人长期并行团队。
- `pantheon-base` 的目标是长期演进的产品底座，但后续投入应克制。
- `pantheon-ops` 是首个业务交付目标，开发效率优先于方法扩张。
- 方法资产应尽量少、稳、低维护，不把流程本身做成需要持续经营的产品。

## 2. 分级原则

日常工作默认按 `L0 / L1 / L2` 三档选择最小足够流程。

原则：

1. 优先选能安全完成任务的最轻档位。
2. 只要碰到高风险边界，就自动升级，不靠临场乐观判断。
3. `pantheon-base` 的合同、生成器、权限、审计、继承边界默认更容易升级到高档。
4. `pantheon-ops` 的普通业务迭代默认走轻量档，除非共享底座边界被触发。

## 3. 三档定义

### 3.1 L0 - Direct Change

适用：

- 单字 typo
- 只读查询、状态确认、日志查看
- 不改变规范语义的文档澄清
- 已有 formatter 覆盖、且不改行为的纯格式化
- 单点、小范围、低风险修正，且不碰下列任何边界：
  - 权限
  - 菜单
  - 审计
  - i18n 生命周期
  - schema / migration / seed
  - route / UI state / user flow
  - generator / dynamic module
  - base -> ops 继承
  - 新依赖 / 外部服务 / CI gate / release

要求：

- 说明为什么属于 `L0`
- 只改最小文件集
- 跑最小相关验证，或明确说明无需验证的原因
- closeout 至少写明：改了什么、跑了什么、还有什么没验证

默认不要求：

- task packet
- 单独 evidence artifact
- 独立 review artifact

### 3.2 L1 - Lean Delivery

适用：

- `pantheon-ops` 普通业务功能、缺陷修复、页面迭代
- `pantheon-base` 非共享合同级的小中型实现
- 需要计划和验证，但不值得走完整重流程的任务

典型场景：

- 普通业务 CRUD、页面状态修复、接口联调
- 单仓内非跨层功能闭环
- 已知边界内的小型 UI 调整
- 不触发 human gate 的常规功能或 bugfix

要求：

- 必须先写最小计划，可以是聊天内结构化计划，也可以是轻量 plan 文档
- 必须声明：
  - 目标仓库
  - 任务层级
  - In / Out
  - 最小验证集合
  - 是否有 runtime / visual gap
- 必须运行最小相关验证
- 必须给出 findings-first 的自检或轻量 review 说明

推荐但不强制：

- task packet
- evidence 目录落盘
- 独立 reviewer

如果任务开始扩大范围、增加边界风险，立即升级到 `L2`。

### 3.3 L2 - Full Governance

适用：

- `pantheon-base` 合同、平台层、系统域边界变更
- 共享 generator / dynamic module / scaffold / feature-ledger 相关改动
- 权限、菜单、审计、i18n 生命周期、认证、schema、seed、导入导出
- base -> ops 回流、继承同步、drift 治理
- 任何需要 human gate 的高影响动作
- 任何跨层、runtime-sensitive、security-sensitive、release-sensitive 任务

要求：

- task packet，或显式关联已批准的父 task packet
- verification evidence
- review artifact，或明确记录为什么只能 self-review
- known gaps / residual risk
- 必要时补 runtime evidence / browser evidence / visual evidence

这类任务默认应使用完整 Harness 闭环：

`Intake -> Context -> Plan -> Red -> Green -> Verify -> Evidence -> Review -> Handoff`

## 4. 升级规则

满足任一条件，任务必须从 `L0` 或 `L1` 升级：

1. 改动开始触碰共享底座或跨层边界。
2. 需要证明的不只是“代码能运行”，还包括权限、菜单、审计、i18n、继承、运行态质量。
3. 需要浏览器证据、runtime evidence、review artifact 或 residual risk 才能说明完成。
4. 需要 human gate。
5. 任务已经超出最初声明的 `In / Out`。

升级后不要回退，除非本轮范围被明确缩小并重新说明原因。

## 5. 仓库默认档位建议

### 5.1 pantheon-base

默认偏保守：

- 文档小修、只读、纯格式化：`L0`
- 一般实现、普通修复：从 `L1` 起步
- 共享合同、系统域、生成器、权限、审计、i18n、继承相关：直接 `L2`

### 5.2 pantheon-ops

默认偏效率：

- 文案、只读、小修：`L0`
- 普通业务功能、业务页面迭代、业务缺陷修复：默认 `L1`
- 一旦发现问题应回流 `pantheon-base`，或触碰共享边界、权限、菜单、导入导出、继承同步：升级 `L2`

## 6. 最小执行矩阵

| Tier | Plan | Verification | Evidence | Review |
|---|---|---|---|---|
| `L0` | no formal artifact | minimum relevant check | inline summary ok | self-check ok |
| `L1` | lean plan required | targeted checks required | inline summary by default | self-review or lightweight external review |
| `L2` | task packet required | risk-matched checks required | artifact or equivalent structured summary | findings-first review required |

## 7. 对 Agent 的直接要求

后续 agent 默认按以下顺序判断：

1. 这是 `L0`、`L1` 还是 `L2`？
2. 目标仓库是 `pantheon-base` 还是 `pantheon-ops`？
3. 这是本仓闭环，还是应回流 `pantheon-base`？
4. 当前档位的最小必需 artifact 和验证是什么？
5. 是否已经触发升级条件？

如果不能稳定判定，默认升级一档，而不是继续猜。

## 8. 设计目标

这套分级要长期服务三个目标：

1. 提高个人开发效率
2. 提高代码质量
3. 让 Codex / Claude Code 更稳定地理解你的边界、完成定义和风险偏好

它不是为了增加 ceremony，而是为了让重流程只出现在真正值得重流程的地方。
