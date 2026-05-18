# Visual Quality Protocol

类型：Contract
归属层：platform
状态：Active

本文定义 Pantheon UI 任务的视觉质量门。它是工具无关 Harness 协议的一部分。

## 1. 适用范围

任何任务只要影响以下内容，就必须执行视觉质量门：

- 页面布局
- 前端组件
- dashboard/admin/workbench
- 表格、表单、图表
- 导航、弹窗、抽屉、工具栏
- 交互状态、loading、empty、error、permission denied
- responsive/mobile viewport
- 视觉设计系统、颜色、字体、间距、图标、动效

## 2. 默认 Skill

首选视觉质量 skill：

```text
impeccable
```

Codex 全局位置：

```text
C:\Users\xiaolong\.codex\skills\impeccable\SKILL.md
```

如果当前工具没有 Codex skill 能力，也必须按同一协议执行：

1. 先读取本文。
2. 使用 `.agents/prompts/implementation.md`、`.agents/prompts/review.md`、`.agents/prompts/qa.md`。
3. 将视觉证据写入 `.harness/evidence/<task-id>/`。

## 3. 与其他设计工具关系

- `impeccable` 是视觉质量门。
- `ui-ux-pro-max` 可用于颜色、字体、布局、可访问性、设计系统细化。
- gstack/browser/Playwright/人工截图可用于视觉证据。
- Figma 或其他设计工具只能作为输入或证据，不是唯一事实源。

## 4. UI Task Packet 要求

UI 任务必须在 task packet 中补充：

- UI surface 类型。
- 目标视觉感受。
- desktop/mobile viewport 验证计划。
- empty/loading/error/permission state 验证计划。
- 是否需要截图或浏览器证据。

## 5. Review Gate

UI review 必须检查：

- 是否使用 `impeccable` 或同等视觉质量门。
- 是否保留 rendered evidence 或记录未运行原因。
- 是否存在文本溢出、重叠、错位、弱对比、状态缺失。
- 是否符合 Pantheon admin/workbench 的克制、清晰、高密度但可扫描风格。
- 是否有平台级 keyboard focus：可交互元素必须有 `:focus-visible` 或等效可见焦点，不允许只依赖 hover。
- 是否尊重 `prefers-reduced-motion: reduce`，并避免对后台工作台使用装饰性大面积动效。
- 是否使用稳定控制尺寸：按钮、图标按钮、输入、选择器、日期选择器等必须通过 Pantheon shell token 固定 `min-height`/`line-height`，hover/loading/focus 不能造成布局跳动。
- 是否避免后台装饰污染：不得在 platform/system shell 中引入 radial-gradient、宽幅 decorative linear-gradient、非标准 font-weight（如 620/650），Arco 原始颜色 token 必须收敛到 Pantheon 语义 token。
- 是否只存在一种页面模式：platform/system 页面必须复用 base 的 `PageHeader`、`GovernanceSummaryBar`、`FilterPanel`、`ListHeaderActions`、`TableBatchActionBar`、`AppTable`、`FormSection`、`SubmitBar`、`AppModal` 等标准组件；不得在页面内新增第二套 hero、overview、metric、toolbar、dialog、table card 样式。
- 治理摘要位置必须统一：治理信息放在主工作区顶部、表格或表单卡片之前；不得沉到 tab 底部，也不得嵌入 table card 形成卡片套卡片。
- 如果页面已由 shell 面包屑、页签或治理摘要承担定位信息，页面内不得再重复渲染 `PageHeader` 标题；治理摘要应成为首个视觉模块，避免额外上下留白。
- 对话框和抽屉必须走标准入口：新增 modal/drawer 必须使用 `AppModal` / `AppDrawer` 或 base 明确批准的封装，不能直接混用多套尺寸、footer、padding、关闭行为。

P0/P1 视觉问题不能 approved。

## 5.1 Mechanical Contract

`pantheon-base/frontend/scripts/check-shell-visual-contract.mjs` 是 platform/system 后台视觉合同的机械检查入口。派生业务仓库必须继承并运行同等检查；业务仓库只能在 `business/*` 范围内扩展视觉规则，不能弱化 base 的 focus、motion、control stability、semantic token 约束。

该检查至少覆盖：

- shell/header/tab/breadcrumb 不裁剪文本。
- FilterPanel、ListHeaderActions、TableBatchActionBar、AppTable 的 spacing、radius、控制高度保持一致。
- platform/system 不允许装饰性 gradient、非标准 font-weight、Arco 原始颜色 token 外泄。
- 系统设置必须使用 `GovernanceSummaryBar`，不能保留 `setting-page__overview*` 旧样式。
- 字典管理必须把治理摘要放在 table card 之前，不能在 tab 底部渲染重复治理卡。
- 字典管理和系统设置不渲染页面级 `PageHeader` 标题，避免和 shell 标题/治理摘要重复。
- system setting/dict 等系统页不得同时存在多套 hero/overview/table-card 视觉模式。

推荐命令：

```text
cd pantheon-base/frontend && npm run check:shell-visual-contract
cd pantheon-ops/frontend && npm run check:shell-visual-contract
```

## 6. Evidence

推荐证据：

```text
.harness/evidence/<task-id>/
  summary.md
  commands.json
  screenshots/
  visual-review.md
```

如果无法截图，必须记录：

- 未截图原因
- 风险
- 后续验证方式

不能用“看起来应该没问题”作为视觉验证结论。

## 6.1 Blocking Rule

If a UI task packet declares UI scope and strict mode is enabled in CI, missing screenshot evidence or missing an explicit visual gap record is a blocking harness failure.
