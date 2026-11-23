# Pantheon Harness 方法论

> 最后更新：2026-11-23
> 已发布版本：[VERSION](../../VERSION)；本次修订见 CHANGELOG 的 Unreleased
> 变更历史：[CHANGELOG.md](../../CHANGELOG.md)
> 演化机制：[evolution.md](./evolution.md)
> 作者：人机协作（Human 定目标和验收，agent roles 规划、执行、验证、审查）

先读 [能力适配交付规则](../../patterns/capability-adaptive-delivery.md)：默认主 agent 闭环，能力决定执行路径，风险决定门禁强度；最新模型事实和本地可用工具分开记录。

## 0. 核心原则

```
┌─────────────────────────────────────────────────────────┐
│                    角色分离模型                           │
│                                                         │
│   Human                 目标、边界、风险接受、结果验收       │
│   Planner/Dispatcher    规划、分派、上下文整理、停点控制     │
│   Generator             实现、修复、迁移、执行命令           │
│   Evaluator/Reviewer    验证、审查、证据质量判断             │
│                                                         │
│   铁律：工具只是 adapter，方法不绑定任何单一 agent runtime    │
│         Generator 不自行扩大架构、范围或风险接受边界          │
│         Human 不在中间环节反复搬运上下文                    │
└─────────────────────────────────────────────────────────┘
```

### 0.1 边界表

| 层级 | 谁决定 | 谁执行 | 谁验收 |
|---|---|---|---|
| 需求/范围/优先级 | **人** | — | **人** |
| 架构/方案/技术选型 | Planner/Architect 提案 | — | 人确认高影响 tradeoff |
| 代码实现 | — | Generator | Reviewer 审查 |
| 测试/构建/静态分析修复 | — | Generator | Evaluator/Reviewer 审查 |
| UI 视觉质量 | Designer/Reviewer 定标准 | Generator + UI quality gate | Reviewer + 人 |
| PR 合并 | — | — | Reviewer 审查 + 人确认 |
| 部署 | 人授权 | Operator/Generator | 人或运行态 gate 验证 |

### 0.2 角色职责与执行权限

Planner/Dispatcher、Generator、Reviewer/Evaluator 是职责，不要求不同工具或进程。主 agent 可在已授权任务中依次完成规划、实现、验证和修复。明确的只读规划、评审或研究任务保持只读，不自行转成实现。

实现权限取决于任务 In/Out、仓库所有权和当前 sandbox；规划身份不额外限制已授权代码实现，也不扩大权限。普通 L1 可在同一会话自检；安全、权限、审计、schema、信任边界、release 或 gate-policy 变更保留独立审查，无法获得时记录 review gap 和验收 gate。独立 reviewer 不把自己的修复当成独立批准。

优先复用主上下文；只有独立评审或自包含分支才委派，并声明所有权、预算、证据、停止条件和集成者。

---

## 1. 工作流全景

```
需求进来
  │
  ├─ 需求清晰吗？
  │   └─ 不清晰 → Planner 启动澄清路径
  │
  ├─ 方案确定吗？
  │   └─ 未确定 → Planner/Architect 出方案
  │
  ├─ 方案已批准
  │   │
  │   ├─ 是 UI 任务吗？
  │   │   └─ 是 → Generator + UI quality gate 执行
  │   │
  │   ├─ 需要并行执行吗？
  │   │   └─ 是 → Dispatcher 选择并行 adapter
  │   │
  │   ├─ 普通实现任务
  │   │   └─ Generator 执行
  │   │
  │   └─ 需要持久跟踪？
  │       └─ Dispatcher 选择 durable goal adapter
  │
  ├─ Generator 执行完毕
  │   └─ Reviewer 审查 diff 和 evidence
  │       │
  │       ├─ 通过 → 人验收
  │       └─ 不通过 → Reviewer 写修复指令 → Generator 再修
  │
  └─ 人验收
      ├─ 对照验收清单逐项检查
      ├─ UI 任务看截图证据
      └─ 通过 → 进入合并或发布 gate
```

---

## 2. 任务委派标准

按 L0/L1/L2 选择最小输入：L0 直接执行；L1 用简短目标、In/Out、计划和验证集合；L2 或跨仓委派提供 Task Packet。以下字段可写入当前 packet，不必每次新建：

```text
目标仓库：    pantheon-base / pantheon-ops / pantheon-harness
任务层级：    platform / system/auth / system/iam / system/org / system/config / business/*
任务模式：    review / implement / ui / inheritance-sync / smoke / docs / sonar-fix
必读文档：    合同/设计/验收文档路径
实现范围：    具体改哪些文件/模块
禁止触碰：    明确不能改的区域
验证方式：    具体命令（go test / npm build / smoke suite / screenshot）
停止条件：    怎样算完成
```

---

## 3. 质量门禁矩阵（v1.1+ 增强）

### 3.1 按档位差异化配置

| 门禁 | L0 | L1 | L2 | 超时 | 失败处理 |
|---|---|---|---|---|---|
| Go 测试 | - | 修改的包 | 全部包 | 5min | 阻塞 PR |
| TypeScript 检查 | - | 涉及文件 | 全局 | 3min | 阻塞 PR |
| Lint | - | 涉及文件 | 全局 | 2min | 警告可过 |
| Frontend Build | - | 涉及模块 | 全栈 | 10min | 阻塞 PR |
| SonarQube | - | 新增问题 | 全部 | 15min | 按规则处理 |
| Smoke 测试 | - | 关键路径 | 完整套件 | 20min | 阻塞合并 |
| UI 检查 | - | - | 必须 | 10min/screen | 阻塞 |
| 安全审计 | - | - | 必须 | 30min | 阻塞 |

### 3.2 门禁执行规则

| 门禁 | 触发条件 | 执行者 | 通过标准 |
|---|---|---|---|
| Go 测试 | 任何 Go 改动 | Generator -> Reviewer 审查 | 全部通过 |
| TypeScript 类型检查 | 任何前端改动 | Generator | `tsc -b` 干净 |
| Lint | 任何前端改动 | Generator | 0 error |
| Frontend Build | 任何前端改动 | Generator | `vite build` 成功 |
| SonarQube | PR 级别 | CI 自动 | 0 新增问题 |
| Smoke 测试 | 系统模块改动 | CI / Generator | 通过率 >= 95% |
| UI 视觉 | 任何 UI 改动 | Generator + UI quality gate | 渲染证据通过 |
| 安全审计 | 认证/权限/中间件改动 | Security reviewer / security sensor | 无高危/严重 |
| 继承漂移 | 跨仓改动 | Reviewer / drift sensor | 漂移可解释 |

### 3.3 门禁通过标准详解

```text
通过 = 所有必需门禁已执行且结果满足标准
阻塞 = 任一必需门禁未通过或未执行
警告 = 非必需门禁未通过，记录但不阻塞
```

---

## 4. SonarQube 质量闭环

### 4.1 扫描时机

| 时机 | 触发 |
|---|---|
| PR 推送 | CI 自动（SonarCloud） |
| 本地预检 | Dispatcher 派 Generator 或 CI adapter 跑 `sonar-scanner` |

### 4.2 问题分类与处理

| 分类 | 判定标准 | 处理方式 |
|---|---|---|
| 假阳性 | 有防护代码（如 `filepath.IsLocal()`）、业务合理 | 记录原因 → 加排除规则 → 不再反复处理 |
| 低风险 | Code Smell 不影响功能 | 记录 → 低优先级队列 → 批量修复 |
| 必须修 | Bug/Vulnerability，有安全或功能影响 | Generator 立即修复 → Reviewer 审查 |

### 4.3 修复流程

```
CI SonarQube 扫描
  │
  ├─ 0 新增问题 → 通过 ✅
  │
  └─ 有新增问题
      │
      ├─ Reviewer 审查报告
      │   ├─ 假阳性 → Dispatcher/Reviewer 更新排除规则 → 记录原因
      │   ├─ 低风险 → Dispatcher 记录到低优先级队列
      │   └─ 必须修 → Reviewer 写修复指令 → Generator 执行 → Reviewer 审查 diff
      │
      └─ 修复后重新扫描 → 循环直到 0 新增
```

---

## 5. 文档体系

```
architecture/methodology/
├── harness-methodology.zh.md      ← 本文件（方法总纲）
├── workflow-routing.md            ← 能力路由决策树
├── solo-delivery-tiers.md         ← L0/L1/L2 交付分级
├── acceptance-checklist.zh.md     ← 非程序员验收清单
├── task-delegation-template.md    ← Planner/Dispatcher→Generator 任务委派模板
├── workflow-templates.md          ← L0/L1/L2/UI/Bug Fix/Proto First 工作流模板
├── proto-driven-development.md    ← 原型驱动开发模式
├── branch-pr-workflow.md          ← 分支与 PR 规范
├── ci-cd-integration.md           ← CI/CD 门禁矩阵
├── context-engineering-guide.md   ← Context engineering 规范
├── agentic-best-practices-reference.md ← 跨工具最佳实践对照
├── evolution.md                   ← 方法论演化机制
├── retrospective-template.md      ← 复盘模板
├── codex-development-process-improvement.md ← 流程增强背景（历史）
└── superpowers-migration.md       ← Superpowers 时代资产迁移与退役记录
```

---

## 6. 人机协作章程

### 6.1 人的职责

- 说清楚"要做什么"和"为什么"
- 定义验收标准（对照验收清单）
- 最终确认 PR 合并
- 不介入中间实现细节

### 6.2 Planner/Dispatcher 的职责

- 理解需求，分解任务
- 选择满足同一 harness capability 的最小 adapter 和执行路径
- 按档位准备计划或 Task Packet；默认主 agent 转入 Generator 职责，仅对自包含分支委派
- 组织 Reviewer/Evaluator 审查 Generator 产出的 diff 和 evidence
- 维护治理文档和方法论

### 6.3 Generator 的职责

- 按 Task Packet 执行实现
- 跑完指定的验证命令
- 不自行扩大范围
- 不自行决定架构变更
- 失败时报告具体错误、已尝试动作和下一步建议

### 6.4 协同交接规则

默认目标是“人做判断，agent 做上下文搬运和证据整理”。每次非 trivial 协作都应满足：

- 人只需要补充目标、优先级、风险接受、验收口径和 high-impact gate 决策。
- Planner/Dispatcher 按档位写清 scope、禁止触碰区域、验证命令和 stop points；L2 写入 Task Packet，L1 可用轻量计划。
- Generator 负责执行、验证、保存 evidence，并把失败原因压缩成下一轮可执行输入。
- Review 必须回指同一份 Task Packet 和 evidence；如果结论冲突，先升级为 review gate，而不是让实现者自行扩大范围。
- 任何 human gate 决策都要写回可恢复 state：决定、证据、接受的风险和下一步 owner。
- 如果人连续两次解释同一类上下文，应把问题升级为 guide、template、adapter 或 sensor 缺口，而不是继续靠聊天记忆。

---

## 7. Human Gate 标准（v1.1+ 新增）

### 7.1 授权与风险分开判断

维护者在需求澄清、门禁策略和最终验收三个触点介入。已授权、范围内、安全可逆的实现默认自主推进；触及架构、schema、权限、审计或 CI 会提高证据要求，不自动要求重复批准。

以下尚未获授权的动作需 Human 决策：破坏性/不可逆操作、外部生产或凭证操作、正式发布、实质扩大 In/Out、required/advisory 或阈值/豁免策略变化。红灯先复现、诊断、修复和复测；agent 不能自行豁免。

### 7.2 最终验收

提交可审查的 diff、验证结果、独立评审或显式 gap；UI 提供渲染证据。批准与完成状态记录回同一任务，不能靠模型自信或聊天记忆代替。

### 7.3 Human 反馈格式

```markdown
## Human Decision

**Task ID**: <task-id>
**Decision Type**: approve | reject | clarify | escalate
**Decision Content**: <具体决策描述>
**Risk Accepted**: yes | no | with-mitigation
**Mitigation Applied**: <如适用>
**Next Action**: <具体行动或 owner>
**Deadline**: <如适用>
**Timestamp**: <ISO8601>
```

### 7.4 Human Gate 触发流程

```mermaid
flowchart TD
    A[Gate Triggered] --> B{Human介入类型}
    B -->|必须介入| C[暂停执行]
    B -->|建议介入| D[可继续但需记录]
    C --> E[Human 决策]
    D --> E
    E --> F{决策结果}
    F -->|approve| G[继续执行]
    F -->|reject| H[终止任务]
    F -->|clarify| I[补充信息后继续]
    F -->|escalate| J[升级处理]
    G --> K[记录决策]
    H --> K
    I --> K
    J --> K
```

---

## 8. 版本演进

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2026-06-15 | 初始版本：角色分离模型、Task Packet 模板、SonarQube 闭环、验收清单 |
| v1.0.1 | 2026-06-23 | 将总纲从 Claude/Codex 固定分工改为工具无关角色分离模型 |
| v1.1 | 2026-06-26 | 增强质量门禁矩阵（按档位差异化）、新增 Human Gate 标准 |
| v1.4 | 2026-07-15 | 模型时代退役审查：移除 OMX/codex-flow 活跃路由、删除孤儿 skills、精简针对旧模型弱点的强制路由细则 |

## 9. Context Engineering 规范（v1.2+ 新增）

### 9.1 CLAUDE.md 编写原则

参考 [Context Engineering Guide](./context-engineering-guide.md)：

| 原则 | 说明 |
|------|------|
| 大小控制 | 建议 <200 行，超出则拆分 |
| 持久规则 | 只放全局适用规则 |
| 工具无关 | 不绑定特定 agent runtime |
| 懒加载 | 用 skills 处理特定领域规则 |

### 9.2 Plan First 流程

非 trivial 任务必须遵循：

```
探索 → 计划 → 执行 → 审查 → 验收
```

- **探索**：理解需求和代码结构
- **计划**：输出结构化方案后再执行
- **执行**：按计划实施
- **审查**：验证 diff 和 evidence
- **验收**：Human 最终确认

### 9.3 Subagent 使用原则

默认保留耦合的规划、实现和测试在主上下文。只有独立审查或自包含调查分支有明确隔离/并行收益时才委派；文件数量和 L2 档位不是触发器。先直接查询可用结构索引，再判断是否需要分支；记录所有权、预算、证据、停止条件和集成者，并服从实际 runtime 的能力与授权。

### 9.4 Evidence First 原则

**先验证，后声称完成。**

验证要求：
- 命令输出必须有
- UI 任务必须有截图
- Runtime-sensitive 任务必须有日志/指标
- 验证跳过必须记录原因和风险

## 10. 最佳实践参考（v1.2+ 新增）

参考 [Agentic Best Practices Reference](./agentic-best-practices-reference.md)：

| 实践维度 | Claude Code | OpenAI Codex | Pantheon Harness |
|---------|------------|--------------|-----------------|
| Plan First | /plan mode | /plan | 推荐 Plan Mode |
| Context 管理 | CLAUDE.md < 200行 | AGENTS.md | CLAUDE.md 大小控制 |
| 隔离 | Subagents | Subagents | Task Packet + Subagents |
| Skills | SKILL.md | SKILL.md | SKILL.md |
| Multi-Agent | Agent Teams | Multi-agent modes | 按需使用 |
| 并行开发 | git worktrees | git worktrees | 推荐 worktree |
| Evidence | 强制要求 | 强制要求 | Verification Evidence |
