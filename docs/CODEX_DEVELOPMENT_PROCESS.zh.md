# Codex 开发流程增强卡

English version: [CODEX_DEVELOPMENT_PROCESS.md](./CODEX_DEVELOPMENT_PROCESS.md)

类型：Guide
归属层：platform
状态：Active

这份文档是 Pantheon 工作区里给 Codex 使用的默认开发流程入口。它不是新的工具，也不是新的 gate，而是把已有的仓库规则、harness 协议、视觉门禁和验证习惯压成一张可携带的流程卡。

## 1. 先读什么

非 trivial 任务开始前，优先按目标仓库读对应入口：

1. `pantheon-base/AGENTS.md`
2. `pantheon-ops/CLAUDE.md`
3. `pantheon-ops/AGENTS.md`
4. `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
5. `harness-engineering/docs/harness/AGENT_INTERFACE_CONTRACT.md`
6. `harness-engineering/docs/harness/TASK_PACKET_SPEC.md`
7. `harness-engineering/docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
8. `harness-engineering/docs/harness/REVIEW_LOOP_SPEC.md`
9. `harness-engineering/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`

## 2. 默认判断顺序

先判这四件事，再动代码：

1. 目标仓库是 `pantheon-base`、`pantheon-ops`，还是 `harness-engineering`。
2. 任务层级是 `platform`、`system/*`，还是 `business/*`。
3. 这次改动属于 `小改`、`标准功能`、`UI 任务`、`继承同步`、`低代码生成`，还是 `高风险操作`。
4. 这次任务已经覆盖到哪些验证和证据。

如果信息不全，先从仓库里推断；推断会带来风险时，再问用户。

## 2.2 最小任务包

如果任务不是 trivial，优先使用一个最小 task packet，而不是自由描述。

推荐字段：

- 目标仓库
- 层级
- 任务模式：`review`、`implement`、`ui`、`inheritance-sync`、`smoke`、`docs`
- 必读文档
- 实现范围
- 同步要求：仅本仓还是 `base -> ops`
- 验证方式
- 是否存在阶段停点

推荐模板：

```text
目标仓库：
层级：
任务模式：
先读：
实现范围：
同步要求：
验证方式：
停点：
```

## 2.1 CodeGraph 检索优先级

如果目标仓库已初始化 CodeGraph，结构性代码探索先走图谱，再读取文件：

- 用 `codegraph status <repo>` 确认索引是否可用。
- 用 `codegraph context -p <repo> "<task>"` 获取任务相关上下文。
- 用 `codegraph query/callers/callees/impact -p <repo> ...` 定位符号、调用和影响面。
- 只有在找字面量、日志、文案、注释，或图谱结果已经给出具体文件后，才转用 `rg` / `Get-Content`。

不要先做大范围 grep + 全文件阅读；目标是用图谱把上下文压到最小可验证范围。

### 2.1.1 CodeGraph 结构性审查最小动作

CodeGraph 在 Pantheon 工作区里的默认作用，不是要求实现者维护一份“全仓代码图谱”，而是把 `non-trivial` 改动压缩成一个可审查的受影响子图。

默认做法：

- 先用图谱明确本次改动的入口节点、出口节点、关键依赖边和跨层跳转。
- 只对受影响子图做结构性判断，不要求为每个新增函数或每次小改维护全量图。
- 对 `platform`、`system/*`、权限、菜单、i18n、审计、生成器、动态模块和 runtime-sensitive 任务，优先补一条“入口 -> 核心链路 -> side effect”的摘要。
- task packet 补好 `## Structural Scope` 后，可运行 `node scripts/harness/scaffold-graph-review.mjs --write <task-id>` 先生成 `graphChecks` 和 `structuralReview` 骨架，再在真实审查后替换 scaffold 注释。

最小检查项：

- 是否引入新的循环依赖或让已有循环簇继续膨胀。
- 是否让单个节点演化成无人拥有的 hub。
- 是否让关键调用链明显变深，导致定位、验证或回滚成本上升。
- 是否出现未验证输入直达敏感操作、权限判断或外部 side effect。

这些检查项默认作为 review 输入和告警阈值，而不是脱离上下文的硬 KPI。目标是降低结构劣化概率，不是为了追逐图指标而重写稳定代码。

## 3. 已确认的高频重复流程

### 3.0 当前推荐的默认技能栈

这套工作流的目标不是“装尽可能多的 skill”，而是把高价值能力放在稳定触发的位置。

默认常驻能力：

- `CodeGraph`：结构理解、影响面、调用链、受影响子图收缩。
- `OpenSpec`：记录需求、约束、验收、变更决策，不和实现计划重复造两份真相源。
- `Superpowers`：只按阶段用具体 skill，不把它当成一整个模糊模式。
- `impeccable`：只在 UI 任务上做视觉质量门禁。
- `gstack`：主要使用 `review`、`health`、`qa`/`qa-only`、`ship`。
- `Codex Security`：高风险变更走 `security-diff-scan`，周期性或发版前走 `security-scan`。

建议补充但不必默认每轮触发：

- `codebase-recon`：新仓库、老模块接手、复杂问题切入前，看 hotspot、历史波动、ownership。
- `gh-fix-ci`：本地验证通过但 GitHub Actions 失败时，用来缩短 CI 红灯修复回路。

不建议的做法：

- 不要同时安装一批语义重叠的 workflow skill。
- 不要让 `OpenSpec`、`writing-plans`、临时 markdown 计划各自维护一套计划。
- 不要把 UI gate、PR gate、安全 gate 混成一条永远全开的笼统流程。

### 3.0.1 Superpowers 的阶段化用法

`Superpowers` 在 Pantheon 里建议按下面方式触发：

- 新功能或跨模块设计：`brainstorming` -> `writing-plans`
- 实现标准功能：`test-driven-development`
- 修 bug 或异常行为：`systematic-debugging`
- 声称完成前：`verification-before-completion`
- 重大改动或准备合并前：`requesting-code-review`

如果任务很小，不需要把所有 skill 都跑一遍，但不能跳过和当前阶段直接相关的 gate。

### 3.1 UI 视觉门禁

适用：

- dashboard、工作台、列表页、表单页、表格、弹窗、抽屉、响应式布局。

默认要求：

- 先读 `DESIGN.md`、`FRONTEND_UI_SPEC`、页面模板或局部视觉规范。
- 实现后必须给出 rendered evidence，或者明确说明为什么无法渲染。
- 页面必须同时考虑 loading、empty、error、forbidden、submitting 状态。
- UI 代码完成后，优先用 `gstack-qa` 或浏览器证据做最终确认；不要只靠静态阅读声称“已经抛光完成”。

### 3.2 smoke / 验收矩阵

适用：

- 页面改动、路由改动、权限改动、i18n 改动、seed 改动、生成器改动、业务模块闭环。

默认要求：

- 先选最小验证集，再决定是否扩大到 smoke。
- 变更面和测试面要同轮更新，不能把“测试后补”留到回归阶段。
- 在准备结束、提交、创建 PR 前，强制走 `verification-before-completion` 的思路：先跑命令，再报告结果。

### 3.3 i18n 生命周期治理

适用：

- 新增/删除模块、删除生成物、修改错误 key、菜单标题、导入导出文案、长期占位值清理。

默认要求：

- 新模块要同步 seed、前端资源、后端错误 key、菜单 titleKey。
- 删除模块时要同步清理 generated 资源，并明确 observe / archive / delete。

### 3.4 base -> ops 继承同步

适用：

- `pantheon-base` 更新后同步到 `pantheon-ops`。
- ops 页面布局、系统域、生成器、i18n 与 base 漂移。

默认要求：

- 通用后台能力优先回 base 修。
- ops 只保留 `business/*` 业务差异和继承说明。
- 同步后要分别验证 base 和 ops 的最小启动、build、smoke。

### 3.4.1 默认不用再重复解释的协同规则

以下规则在 Pantheon 工作区内已经足够稳定，后续应视为默认上下文：

- `pantheon-base` 拥有 `platform` 和 `system/*` 的权威实现。
- `pantheon-ops` 只保留 `business/*` 差异，不应静默 override 共享能力。
- 共享分页、共享上传、共享表格、共享后台壳层、共享 i18n、共享 smoke helper 先改 base。
- 代码、测试、i18n、菜单、权限、文档、evidence 只要在本次任务范围内，就按一个收口单元处理。
- 跨仓、高风险或高不确定性任务优先走 stage 边界，不用一口气做完。

### 3.5 低代码生成闭环

适用：

- `system/generator`、`system/dynamicmodule`、模块生成、注册、卸载、回收、菜单/权限/i18n 同步。

默认要求：

- 生成前确认 schema、表名、模块名、父菜单、权限前缀、i18n 前缀。
- 生成后验证 source、registry、menu、permission、i18n、activation。
- 临时模块必须验证 autoRecycle 或 cleanup。

## 4. 按场景执行的默认顺序

### 4.1 新功能或非 trivial 改动

默认顺序：

1. `CodeGraph` 缩小代码范围和受影响调用链。
2. `OpenSpec` 或现有 contract/design/acceptance 明确目标和验收。
3. `brainstorming` / `writing-plans` 固化实现路径。
4. `test-driven-development` 驱动实现。
5. 跑最小验证集，再决定是否扩大到 smoke。
6. 完成前执行 `verification-before-completion`。
7. 准备合并前执行 `requesting-code-review` 或 `gstack-review`。

### 4.2 修 bug

默认顺序：

1. 先用 `systematic-debugging` 找根因，不直接凭直觉修。
2. 用 `CodeGraph` 验证问题入口、共享依赖、外溢影响。
3. 先补回归测试，再修实现。
4. 跑复现链路和最小相关测试。
5. 完成前执行 `verification-before-completion`。

### 4.3 UI / 体验任务

默认顺序：

1. 读取 `DESIGN.md` 和相关页面规范。
2. 启用 `impeccable` 做视觉质量门。
3. 需要交互或真实页面状态时，优先配合 `gstack-qa`、`qa-only` 或浏览器验证。
4. 最终必须有 rendered evidence，或明确写出无法渲染的原因。

### 4.4 提交 PR 或准备合并

默认顺序：

1. 跑仓库本地的 lint / test / build / smoke 最小闭环。
2. 执行 `verification-before-completion`。
3. 跑 `gstack-review` 或 `requesting-code-review`。
4. 高风险改动补 `security-diff-scan`。
5. 再进入 `gstack-ship` 或人工 PR 流程。

### 4.5 GitHub Actions 红灯

默认顺序：

1. 先看失败类型：环境问题、测试脆弱性、真实回归、权限/依赖/缓存问题。
2. 本地复现能复现的先本地修。
3. 本地绿、CI 红时，再用 `gh-fix-ci` 缩短定位和修复时间。
4. 修完重新走 `verification-before-completion`，不要只看单条 job 绿灯。

### 4.6 高风险安全改动

适用：

- auth、权限、租户边界、文件上传/下载、路径处理、模板执行、SQL 拼接、外部请求、LLM trust boundary。

默认顺序：

1. 先用 `CodeGraph` 看 source -> sink -> side effect。
2. 实现前后都保持最小可验证范围。
3. 提交前至少跑一次 `security-diff-scan`。
4. 仓库级或发版前，再补 `security-scan` 或 `gstack-cso`。

## 5. PR、CI 和安全门禁

这三个门禁建议常态化，而不是想到才补：

- 完成 gate：`verification-before-completion`
- 代码审查 gate：`requesting-code-review` 或 `gstack-review`
- 安全 gate：高风险变更时 `security-diff-scan`

CI 修复不应当取代本地验证。`gh-fix-ci` 只处理“已经进入 CI 环节后暴露的问题”，不是开发阶段的默认主流程。

## 6. 仓库级补充建议

优先补仓库自定义 skill，而不是继续扩充个人全局 skill：

- `repo-verify`：固化本仓 lint / test / build / smoke 命令。
- `repo-pr-gate`：定义什么情况下必须跑 review、security、rendered evidence。
- `repo-ci-triage`：把常见 GitHub Actions 红灯分类和修复路径固化。

这类 skill 放在仓库内比放在个人目录更稳定，也更利于团队复用。

## 7. 什么时候不新建工具

优先级从高到低：

1. 复用现有 skill、harness check、脚本或测试。
2. 直接扩展现有流程卡。
3. 只有在稳定输入、稳定 procedure、清晰 stopping condition 都满足时，才考虑新 skill / subagent / automation。
4. 一次性、敏感、证据不足、或者和现有能力重叠的，直接 skip。

## 8. 输出要求

最后交付时，必须明确写出：

- 做了什么。
- 没做什么。
- 用什么验证。
- 还剩哪些风险或未验证项。
