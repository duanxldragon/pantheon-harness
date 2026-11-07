---
title: Workflow Templates
doc_type: Method
layer: method
status: Active
updated_at: 2026-06-26
version: v1.0.0
---

# Workflow Templates

本文档定义 Pantheon 工作流的具体执行模板。完整方法论见 [Harness Methodology](./harness-methodology.zh.md)。

## 目录

- [L0 Direct Change Workflow](#1-l0-direct-change-workflow)
- [L1 Lean Delivery Workflow](#2-l1-lean-delivery-workflow)
- [L2 Full Governance Workflow](#3-l2-full-governance-workflow)
- [UI Task Workflow](#4-ui-task-workflow)
- [Bug Fix Workflow](#5-bug-fix-workflow)
- [Proto First Workflow](#6-proto-first-workflow)

---

## 1. L0 Direct Change Workflow

### 适用场景

- 单字 typo 修复
- 只读查询、状态确认、日志查看
- 不改变规范语义的文档澄清
- 已有 formatter 覆盖的纯格式化

### 执行流程

```
1. 确认属于 L0 范围
   └─ 不触碰权限/菜单/审计/i18n/schema/路由/UI 状态
   └─ 不涉及新依赖/CI gate/release

2. 执行最小变更
   └─ 只改最小文件集

3. 运行最小验证
   └─ 或明确说明无需验证的原因

4. Closeout
   └─ 记录：改了什么、跑了什么、还有什么没验证
```

### 模板

```markdown
## L0 Closeout

**变更说明**: <简要描述>

**文件变更**:
- <file> - <变更内容>

**验证结果**:
- <命令/检查> - <通过/无需验证>

**剩余风险**: none | <描述>
```

---

## 2. L1 Lean Delivery Workflow

### 适用场景

- pantheon-ops 普通业务功能、缺陷修复、页面迭代
- pantheon-base 非共享合同级的小中型实现
- 需要计划和验证，但不值得走完整重流程

### 执行流程

```
1. 写最小计划（可内嵌聊天或轻量文档）

2. 声明任务信息
   ├─ 目标仓库
   ├─ 任务层级
   ├─ In / Out 边界
   ├─ 最小验证集合
   └─ 是否有 runtime / visual gap

3. 执行实现

4. 运行最小相关验证

5. 自检或轻量 review
   └─ findings-first 格式

6. 如果范围扩大，立即升级 L2
```

### L1 Task Packet 模板

```markdown
# L1 Task: <task-name>

## 目标仓库
< pantheon-base | pantheon-ops | pantheon-harness >

## 任务层级
< platform | system/* | business/* | method | docs >

## 范围

### In
- <具体工作>

### Out
- <明确不做>

## 验证集合
- <命令1>
- <命令2>

## Gap 声明
- Runtime gap: yes | no
- Visual gap: yes | no

## 自检说明
< findings-first 格式 >
```

---

## 3. L2 Full Governance Workflow

### 适用场景

- pantheon-base 合同、平台层、系统域边界变更
- 共享 generator / dynamic module 相关改动
- 权限、菜单、审计、i18n、schema、seed、导入导出
- base -> ops 回流、继承同步、drift 治理
- 任何需要 human gate 的高影响动作

### 执行流程

```
1. 创建 Task Packet (docs/harness/tasks/YYYY-MM-DD-<task>.task.md)

2. Intake
   ├─ 读取 Contract Anchors
   ├─ 确认范围边界
   └─ 识别风险节点

3. Plan
   ├─ 结构化方案输出
   ├─ Human 确认高影响 tradeoff
   └─ 确定 stop points

4. Red (实现)
   ├─ 按 Task Packet 执行
   ├─ 不自行扩大范围
   └─ 失败时报告具体错误

5. Green (验证)
   ├─ 运行 risk-matched 验证
   ├─ 保存 evidence
   └─ 记录 residual risk

6. Review
   ├─ Reviewer 审查 diff
   ├─ findings-first 格式
   └─ Review artifact 输出

7. Handoff
   ├─ Human 验收
   └─ 满足验收清单
```

### L2 Task Packet

使用完整 [Task Packet Spec](../harness/task-packet-spec.md) 模板。

### Verification Matrix

| 门禁 | 触发条件 | 通过标准 |
|------|---------|---------|
| Go 测试 | 任何 Go 改动 | 全部通过 |
| TypeScript 检查 | 任何前端改动 | 0 error |
| Lint | 任何前端改动 | 0 error |
| Frontend Build | 任何前端改动 | 成功 |
| SonarQube | PR 级别 | 0 新增问题 |
| Smoke 测试 | 系统模块改动 | >= 95% |
| UI 视觉 | 任何 UI 改动 | 截图通过 |
| 安全审计 | 认证/权限/中间件 | 无高危 |

---

## 4. UI Task Workflow

### 适用场景

- 页面、视图、组件开发
- 表单、表格、仪表板、图表
- Modal、Drawer、Popover
- 布局、CSS、样式、响应式
- 视觉打磨、间距、字体、交互状态

### 执行流程

```
1. 调用 impeccable gate (设计前)
   └─ 参考设计约束
   └─ 获取 UI 质量标准

2. 实现

3. 调用 impeccable gate (完成后)
   └─ 截图验证
   └─ 响应式检查
   └─ 交互状态检查

4. 保存 visual evidence
```

### UI Task Packet 模板

```markdown
# UI Task: <task-name>

## Visual Scope
< 影响哪些页面/组件 >

## Design Reference
< 设计稿/参考链接 >

## UI Quality Gates
- [ ] impeccable before implementation
- [ ] impeccable after implementation

## Visual Evidence Required
- [ ] Desktop screenshot
- [ ] Mobile screenshot (if responsive)
- [ ] Interaction states (hover/active/disabled)

## Acceptance Criteria
< 可观察的 UI 结果 >
```

### Visual Evidence 规范

参考 [Visual Quality Protocol](../harness/visual-quality-protocol.md)。

---

## 5. Bug Fix Workflow

### 适用场景

- 功能异常、行为不符合预期
- 运行时错误、崩溃
- UI 显示异常

### 执行流程

```
1. Reproduce (5-10 min)
   ├─ 记录复现步骤
   ├─ 确认 bug 存在
   └─ 保存 repro evidence

2. Locate (10-20 min)
   ├─ 使用 CodeGraph 定位根因
   ├─ 找到相关代码路径
   └─ 确定修复范围

3. Fix (15-30 min)
   ├─ 实施修复
   └─ 不引入新问题

4. Verify (10 min)
   ├─ 重新运行 repro
   ├─ 确认 bug 已修复
   └─ 保存验证 evidence

5. Regression (10 min)
   ├─ 运行相关测试
   └─ 保存 test evidence

6. Review (可选)
   └─ L1: self-review
   └─ L2: independent review
```

### Bug Fix Task Packet 模板

```markdown
# Bug Fix Task: <bug-name>

## 类型
bug-fix

## 优先级
< P0 (blocking) | P1 (high) | P2 (medium) | P3 (low) >

## 严重程度
< blocking | warning | minor >

## Repro Steps
1. <步骤1>
2. <步骤2>

## Expected Behavior
< 描述期望行为 >

## Actual Behavior
< 描述实际 bug >

## Root Cause (推测)
< 定位到的根因 >

## Fix Scope
< 修复范围 >

## Verification
- [ ] Repro confirmed fixed
- [ ] Related tests pass
- [ ] No regression
```

### Bug Severity 定义

| 级别 | 定义 | 响应时间 |
|------|------|---------|
| P0 blocking | 系统不可用、数据丢失、安全风险 | 立即 |
| P1 high | 核心功能受损、无替代方案 | 24h |
| P2 medium | 功能受限、有替代方案 | 1 week |
| P3 low | 体验问题、不影响功能 | backlog |

---

## 6. Proto First Workflow

### 适用场景

- 探索性开发
- 方案验证
- 快速原型迭代
- 不确定最佳技术方案时的多方案对比

### 核心原则

1. **先跑通，再优化**：先用最快方式实现核心逻辑
2. **保留选项**：不立即投入架构设计
3. **快速迭代**：基于反馈调整
4. **证据驱动**：每次迭代需要可验证的输出

### 执行流程

```
1. Define Proto Goal
   ├─ 明确要验证的核心假设
   ├─ 定义成功标准
   └─ 设置时间盒

2. Quick Prototype
   ├─ 用最小代码实现核心功能
   ├─ 不追求完美
   └─ 记录未解决的问题

3. Validate
   ├─ 运行 proto
   ├─ 收集反馈
   └─ 验证核心假设

4. Decision Point
   ├─ 原型验证成功 → 继续 L2 流程
   ├─ 需要调整 → 快速迭代
   └─ 原型失败 → 重新定义问题

5. Handoff to Full Development
   └─ 如果进入 L2，使用 proto 验证结果
```

### Proto First Task Packet 模板

```markdown
# Proto First Task: <task-name>

## Proto Goal
< 要验证的核心假设是什么 >

## Timebox
< X hours | X days >

## Success Criteria
- [ ] <可验证的输出1>
- [ ] <可验证的输出2>

## Out of Scope
< 明确不做 >

## Approach
< 快速实现方式 >

## Decision Criteria
- Continue if: <继续条件>
- Pivot if: <调整条件>
- Stop if: <终止条件>

## Proto Output
- Proto code: <path>
- Validation result: <date>
- Decision: <continue|pivot|stop>
```

---

## 模板使用决策表

| 任务类型 | 推荐模板 |
|---------|---------|
| 单字 typo、只读、纯格式化 | L0 |
| 普通业务功能、页面迭代 | L1 |
| 共享底座、系统域、权限/菜单/审计 | L2 |
| 页面/组件/布局/视觉 | UI Task |
| 功能异常、运行时错误 | Bug Fix |
| 探索性开发、方案验证 | Proto First |
