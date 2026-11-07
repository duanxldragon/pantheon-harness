# Better Harness 对 Pantheon Harness 的借鉴分析

> 分析对象：https://github.com/QoderAI/better-harness （MIT，~1.5k stars）
> 对比基线：pantheon-harness v1.4.0
> 日期：2026-08-04

## 0. 一句话结论

Better Harness 是**诊断层**，Pantheon Harness 是**执行层**——两者互补而非竞争。
Pantheon 已经把"怎么做交付"讲得很清楚（角色分离、Task Packet、门禁矩阵、L0/L1/L2、Ratchet Rule），
但**缺一层"我的 harness 到底有没有效 / 哪里有缺口"的自审能力**。Better Harness 的
Agent Work Loop 评估模型、证据强度阶梯、Loop Discovery 决策门、诚实评分上限，正好是这层缺口的现成答案。
最值得立刻做的是：借它把"Ratchet Rule 原则"升级成可运行的工具，并补齐多主机适配包（它已内置 WorkBuddy adapter）。

---

## 1. Better Harness 是什么

一句话：**在你的 Coding Agent 内运行，把项目与会话证据转成"优先改进项 + 可验证下一步"，而非只审最终 diff。**

核心组成：

- **Agent Work Loop 五维评估模型**：Task Understanding / Controlled Execution / Change Validation / Reliable Delivery / Learning Capture。
- **前馈-反馈循环**（Feedforward & Feedback）：`AGENTS.md`/specs/skills 是前馈；linter/test/hook/评估代理是反馈。
- **三路独立证据采集**：Session Evidence、Project Harness、Agent Customize 三路并行只读 agent 采集，再由 lead agent 归一。
- **证据状态阶梯**：`Present → Wired → Exercised → Outcome-supported`（比"配置了 = 有"更诚实）。
- **诚实评分上限**：维度分由证据强度封顶（只有 config → 上限 74；有后续可比结果证明效果 → 才到 100），绝不靠资产计数打分。
- **Loop Discovery 决策门**：把一个"重复工作"路由到最小持久所有者（Skill/Hook/Script/Command/Automation/Custom Agent），带 10 项就绪检查。
- **多主机适配**：内置 Claude / Codex / Qoder / Cursor / Copilot 插件壳 + Qwen / Pi / Kimi / **WorkBuddy** / Grok 适配器。

它**不替代**你的 agent，只改善"围绕代码的循环"；明确声明：未观测行为显式保留为 `Unobserved`，不捏造分数。

---

## 2. 两者本质定位对比

| 维度 | Pantheon Harness | Better Harness |
|------|------------------|----------------|
| 角色 | **处方（Prescriptive）**：教你怎么交付 | **诊断（Diagnostic）**：评估你的 harness 好不好 |
| 主产物 | 方法、契约、门禁、模板、Task Packet | findings.json + 可视化报告（HTML/Canvas/MD） |
| 核心循环 | 探索→计划→执行→审查→验收 | 证据采集→归一→评分→优先 findings→修复→循环有效性 |
| 控制视角 | 6 个 control plane（Instruction/Task/Execution/Verification/Review/Governance） | 5 维扁平评估 + Feedforward/Feedback |
| 学习闭环 | Ratchet Rule（原则级） | Loop Discovery（决策门级，带 owner 路由） |
| 工具无关 | 声称 adapter，但**未发布任何主机壳** | 已发布 6+ 主机壳 + 5 适配器 |
| 评分/度量 | 无内置成熟度度量 | 显式维度分 + 证据封顶 |

**关键洞察**：Pantheon 的"做"很强，Better 的"量"很强。Pantheon 缺的不是方法，而是**对方法自身的可观测性与度量**。

---

## 3. 概念映射（Better 五维 ↔ Pantheon 现有概念）

| Better 维度 | 对应 Pantheon 概念 | Pantheon 现状 |
|-------------|--------------------|---------------|
| Task Understanding | `relevant-context` / Task Packet 的"目标·范围·停止条件" | 已有 Task Packet 模板，但无"理解度"评估 |
| Controlled Execution | Execution Plane / Adapter / 权限边界 | 有原则，无"是否真的走受支持路径"的校验 |
| Change Validation | Verification Plane / Evidence First 原则 | 有 evidence 要求，但证据是 pass/fail 二元 |
| Reliable Delivery | Review Plane / Human Gate / 回滚 | 有门禁矩阵，但无"交付边界已被真实接受"的证明链 |
| Learning Capture | **Ratchet Rule** | 只有原则，无工具、无 owner 路由、无纵向验证 |

注意：Pantheon 的 Ratchet Rule 是 Better "Learning Capture" 的**胚胎**——Better 把它工程化了。

---

## 4. 对 Pantheon Harness 的具体借鉴（按优先级）

### 借鉴 1【高】— 把 Ratchet Rule 升级为可运行的 Loop Discovery 工具
Pantheon 的 `patterns/harness-core-model.md` §6 只有一句话原则：
`failure → guide | sensor | gate | template | no action`。
Better 的 `references/loop-engineering/loop-discovery.md` 把它变成**决策门**：
- 10 项就绪检查（重复意图、现有覆盖、稳定输入、可重复步骤、验证、停止条件、安全边界、状态契约、可观测契约、评估契约）；
- 明确 owner 路由（Covered / Skill / Automation / Hook / Script / Command / Custom Agent / Skip / Needs more evidence）；
- 优先选**最小持久所有者**，不默认上 Skill 或自治 agent。

**落地动作**：在 `pantheon-harness/workflows/` 或 `scripts/harness/` 新增 `loop-discovery` 工作流/skill，把 Ratchet Rule 从"原则"变成"checklist + owner 路由"，与现有 `retirement-reviews/` 目录打通。

### 借鉴 2【高】— 证据强度阶梯 Present→Wired→Exercised→Outcome-supported
Pantheon 的 evidence（`verification-evidence-spec.md`）基本是 pass/fail 二元。
Better 的阶梯揭示了一个常被忽略的真相：**"你配了 lint 门禁" ≠ "它拦截过 bug" ≠ "它让结果更好"**。

**落地动作**：在 `verify/` 的 schema 里给每条 evidence 增加 `evidenceState` 字段
（`present` / `wired` / `exercised` / `outcome-supported` / `missing` / `unobserved`）。
CI 报告与 `.harness/evidence/` 据此分级，避免"有门禁 = 安全"的幻觉。

### 借鉴 3【高】— 诚实评分上限：绝不靠资产计数打分
Better 明确：维度分由**证据强度**封顶，资产计数（Skills/Hooks 数量）永不产生 finding 或分数。
这与 Pantheon "方法不绑定单一 runtime、规则追踪到真实失败才加"的 Ratchet 精神完全一致，
但 Pantheon 目前**没有任何成熟度度量**，外界（或维护者）容易用"文档多不多"误判方法健康度。

**落地动作**：在 `scripts/harness/check-method-health.mjs` 的输出里，引入基于证据状态的
"Loop Effectiveness" 概念分（0–100 由 evidenceState 封顶），并显式拒绝"资产数量→分数"的推导。

### 借鉴 4【中】— 三路独立证据采集 + lead 归一（并行只读 agent 模式）
Better 的架构：Session / Project / Agent-Customize 三路**隔离的只读 agent**并行采集，
各自只拿到自己那一份 bundle，互不串结论，最后 lead 归一、保留分歧。
Pantheon 在治理/复盘时目前是单 agent 通读，证据域边界靠约定而非隔离。

**落地动作**：把 `check-review.mjs` / 复盘模板改造为"三路并行只读采集 + lead 归一"模式，
对应 Pantheon 的 Reviewer 角色。注意隔离边界（session 结论不进 project 采集 brief）。

### 借鉴 5【中】— 多主机适配包（尤其 WorkBuddy adapter，Better 已内置）
Pantheon 声称 tool-agnostic，但 `AGENTS.md` 自己写"Non-trivial changes follow the repo's own governance"，
**未发布任何主机壳**。Better 已内置 6 个主机插件壳，且适配器列表里**明确包含 WorkBuddy**——
而你现在正好跑在 WorkBuddy 里。

**落地动作**：参考 Better 的 `.qoder-plugin` / `.claude-plugin` 薄壳模式，为 Pantheon 产出
WorkBuddy（及 Claude/Codex）适配壳，把 `skills/grill-me`、`impeccable` 与 `check-*.mjs` 暴露为
宿主原生能力。这是让方法"可移植到任意仓库"从口号变产品的关键一步。

### 借鉴 6【中】— 支持轨道 Bootstrap / Operationalize / Optimize 用于自判方法健康度
Better 用三条轨道区分：
- **Bootstrap (0→1)**：缺基础导航/验证/风险路径；
- **Operationalize (1→60)**：机制有，但没接进日常、没经结果验证；
- **Optimize (60→100)**：有 ≥2 个可比 Task Episode 证明循环改善。

**落地动作**：在方法健康度报告里用这三条轨道给自己打分——
Pantheon 多数机制已 `Present`（甚至 `Wired`），但缺 `Outcome-supported` 的纵向证据。
这能诚实地告诉维护者："方法装好了，但还没证明它让交付更好。"

### 借鉴 7【低】— fail-closed 的隐私/审查边界
Better 的 `hooks` 走 fail-closed（审查/隐私边界默认失败即阻断）。
Pantheon 的 `check-*.mjs` 已支持 `--strict`，可把"敏感边界（secrets/外部写）"类检查默认 fail-closed。

---

## 5. Pantheon 已经更强、不要盲从的地方

- **执行层远比 Better 具体**：Task Packet、L0/L1/L2 分档、质量门禁矩阵（Go/TS/Lint/Smoke/UI/Security）、
  SonarQube 闭环、Human Gate 标准——Better 完全没有这些"怎么做"的内容（它明说只改善循环，不替代 agent）。
  **不要**因为借鉴诊断层而稀释自己的执行层。
- **6 control plane 分类比 5 维更细**：Pantheon 的 Instruction/Task/Execution/Verification/Review/Governance
  比 Better 扁平的 5 维更丰富。借鉴时把 Better 的 5 维**映射进**现有 plane，而非另起一套 taxonomy。
- **角色分离模型更明确**：Human/Planner/Generator/Reviewer 的边界表是 Pantheon 独有资产，Better 没有对等物。

---

## 6. 落地建议（下一步动作清单）

1. **近 term（1–2 周）**：在 `workflows/` 新增 `loop-discovery` 工作流，落实借鉴 1；复用 Better 的 10 项就绪检查与 owner 路由。
2. **近 term**：给 `verify/` 的 evidence schema 加 `evidenceState` 字段（借鉴 2）。
3. **中 term**：在 `check-method-health.mjs` 引入"Loop Effectiveness"证据封顶分（借鉴 3）。
4. **中 term**：产出 WorkBuddy + Claude 适配壳，把 `grill-me`/`impeccable`/`check-*.mjs` 暴露为宿主能力（借鉴 5）。
5. **持续**：每次复盘用 Bootstrap/Operationalize/Optimize 三轨自评，并记录 ≥2 个可比 Task Episode 作为 `Outcome-supported` 证据（借鉴 6）。

> 备注：Better Harness 已把 WorkBuddy 列为维护中的适配器之一，说明两者的"工具无关 + 宿主薄壳"理念一致，
> 直接复用其 adapter 思路可大幅降低 Pantheon 多主机化的成本。

---

## 附：信息来源

- Better Harness README / SKILL.md / docs/ARCHITECTURE.md / models/agent-work-loop.md / references/loop-engineering/loop-discovery.md（GitHub 仓库原始文件）
- Pantheon Harness：`AGENTS.md`、`README.md`、`architecture/methodology/harness-methodology.zh.md`、`patterns/harness-core-model.md`（本地 v1.4.0）
