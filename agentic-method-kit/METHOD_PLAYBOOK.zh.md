# Method Playbook

English version: [METHOD_PLAYBOOK.md](./METHOD_PLAYBOOK.md)

这份 playbook 用来把一组工具收敛成一套统一的方法。

先阅读这些方法基础：

1. [HARNESS_CORE_MODEL.zh.md](./HARNESS_CORE_MODEL.zh.md)
2. [HARNESS_COVERAGE_MODEL.zh.md](./HARNESS_COVERAGE_MODEL.zh.md)
3. [HARNESS_TEMPLATE_TAXONOMY.zh.md](./HARNESS_TEMPLATE_TAXONOMY.zh.md)
4. [TOOL_ADAPTER_MATRIX.zh.md](./TOOL_ADAPTER_MATRIX.zh.md)

## 默认技术栈

- 变更管理层：change identity、proposal、design、tasks、archive
- 计划/执行层：brainstorming、planning、execution、debugging、verification
- UI 质量层：视觉、交互、可访问性和状态质量门
- 浏览器/运行态证据层：浏览器 evidence、QA、可观测性、review
- 本地 harness checks：task packet、evidence、adoption

## 默认工作流

### 1. Intake

- 判断当前工作是 `trivial` 还是 `non-trivial`
- 如果是 non-trivial，先创建或选择一个变更身份，例如 OpenSpec change
- 选择最小适用的 harness template 或 overlay

### 2. Design

- 使用结构化 brainstorming 或设计工作流
- 产出 design / spec 结果
- 明确 scope 边界

### 3. Planning

- 使用结构化 planning 工作流
- 产出可执行的具体实现计划

### 4. Task Packet

- 根据 plan 创建 task packet
- 填写 linkage 字段：
  - task id
  - openspec change
  - evidence directory
  - review file

### 5. Implementation

- 按 plan 进行纪律化执行
- 如果进入调试，转入 `systematic-debugging`

### 6. UI Quality

- 如果触碰 UI，运行仓库定义的 UI quality gate
- 如果浏览器路径重要，采集浏览器或运行态 evidence

### 7. Evidence

- 把命令结果保存到 `.harness/evidence/<task-id>/commands.json`
- 把人类可读摘要保存到 `summary.md`
- 把 review 输出保存到 `review.md`
- `review.md` 必须包含嵌入式 machine-readable JSON block

### 8. Mechanical Checks

- 运行：
  - `check-task-packet`
  - `check-evidence`
  - `check-adoption`
- 方法维护时，定期按 [HARNESS_COVERAGE_MODEL.zh.md](./HARNESS_COVERAGE_MODEL.zh.md) 做 harness coverage review

### 9. Review

- 采用 findings-first 风格
- review 必须指向同一份 task packet 和 evidence

### 10. Close

- 合并或发布
- 完成后归档 OpenSpec change

## 最小 Machine-Readable 闭环

每个 non-trivial 任务都应当具备：

- 一个变更身份，或显式写 `none`
- 一个 task packet
- 一个 evidence directory
- 一个 review artifact

这四者必须通过显式字段互相引用，而不是只靠文件名约定。

可移植的最小闭环包括：

- task packet 的 `## Linkage`
- evidence 的 `linkage`
- review 的 `## Machine Readable` JSON block
