# Codex 开发流程增强卡

本文基于 2026-04-29 到 2026-05-28 期间的仓库提交、Codex history、现有 AGENTS/CLAUDE 规则、harness 文档和可用 skills，整理出当前最值得固化的重复工作流。

目标不是再造一套新方法，而是让 Codex 在 Pantheon 多仓库工作区里更稳定地判断边界、选择流程、同步验证，并减少反复口头解释。

## 0.1 当前落地方案

基于现有工具栈，当前建议固化为一条分层主线，而不是继续横向增加大量 skill。日常执行入口以 [Pantheon Workflow Routing](./WORKFLOW_ROUTING.md) 为准，本文件只保留背景和任务类型细化，不再定义工具路由。

建议新增但不默认常驻的外部 skill：

- `codebase-recon`
- `gh-fix-ci`

对应的可执行流程已落到：

- `harness-engineering/docs/CODEX_DEVELOPMENT_PROCESS.zh.md`
- `harness-engineering/docs/CODEX_DEVELOPMENT_CHECKLIST.zh.md`

这个增强卡后续主要保留“为什么这样设计”的背景，不再承担日常执行入口。

## 0. 最近一次复盘确认的关键结论

这轮复盘最重要的发现不是“哪些工作重复”，而是“哪些信息一旦说清楚，Codex 的表现就明显变稳”。

已经被验证有效的信号包括：

- `2026-04-17` 开始，你把目标从“尽快做完”切到“先补设计，再按文档排计划”，Codex 开始优先做结构正确而不是局部修补。
- `2026-04-26` 到 `2026-05-05` 之间，你把低代码平台定位成“辅助业务开发的能力”，而不是主产品目标，减少了过度设计。
- `2026-05-11` 之后，你明确了 `pantheon-base` 是标准后台底座，`pantheon-ops` 是业务仓，未来还会有 `pantheon-xx`；这是协同效率提升最大的转折点。
- `2026-05-15`、`2026-05-23`、`2026-05-27` 之后，你反复确认“共享问题先改 base，再同步 ops”，Codex 对落点判断稳定了很多。
- 你开始使用分 stage 的 task packet，明确必读文件、停点、禁止事项、是否 push、base 改动是否单独 commit；这让高风险任务不再靠临场口头纠偏。

这意味着后续最值得沉淀的，不是更多“最佳实践”口号，而是更少但更硬的默认规则。

## 1. 对原始提示词的评估

这段提示词方向正确，适合定期发现可封装流程。它的优点是：

- 先看最近 30 天证据，不凭感觉创建工具。
- 明确区分 skill、subagent、automation、skip，避免所有问题都做成 skill。
- 要求候选项至少重复两次、输入稳定、输出清晰，能抑制过度包装。
- 要求先出 shortlist，再只创建高置信缺口，符合当前 Pantheon 的渐进治理方式。

需要补强的地方：

- 需要先识别当前目标仓库。`D:\workspace\go\pantheon-platform` 是多仓库父目录，不是 git 仓库。
- 需要把任务先归类到 `platform`、`system/auth`、`system/iam`、`system/org`、`system/config`、`system/lowcode`、`business/*`，否则 Codex 容易改错层。
- 对 UI 任务必须显式触发 `impeccable`，并要求 rendered evidence 或说明无法渲染的原因。
- 对 `pantheon-ops` 的通用后台问题，必须先判断是否应回流 `pantheon-base`，不能默认在 ops 里打 override。
- 对涉及真实主机、凭据、SSH、部署的任务，应先做安全边界和回滚定义，不应只按普通功能开发处理。

## 2. 高频流程候选清单

| 重复工作流 | 支撑证据和日期 | 频率/置信度 | 推荐形式 | 是否值得创建 |
|---|---|---|---|---|
| 任务入口分层：先判断 target repo、平台层/系统域/业务域、任务等级 | `CLAUDE.md` 已声明父目录不是仓库；`pantheon-base/AGENTS.md` 和 `pantheon-ops/AGENTS.md` 强制任务分类；2026-05-11 ops 初始化和继承文档；2026-05-26 多仓安全/治理提交 | 极高 | extend existing | 值得。本文件补成操作卡，不新建 skill |
| UI 视觉门禁和页面模板一致性 | 2026-05-01 多次 backoffice UI overhaul/revert/polish；2026-05-21 表格分页、表单控件统一；2026-05-22 system-ui/governance layout；Codex history 多次要求截图确认和页面一致性 | 极高 | extend existing | 值得。已由 `impeccable` 覆盖，缺少触发矩阵 |
| smoke/验收选择矩阵 | 2026-05-11 full-system smoke；2026-05-19 QA acceptance loop；2026-05-21/23 system smoke 和 fixture controls；2026-05-25/26 low-code/smoke cleanup | 极高 | extend existing | 值得。已有脚本，缺少“按改动选择命令”的流程卡 |
| i18n 生命周期治理 | 2026-05-22 auth security event locale；2026-05-26 i18n gates；Codex history 多次出现空值、占位 key、CMDB 删除后残留、observe/archive/delete 生命周期问题 | 高 | extend existing | 值得。已有实现和 smoke，缺少触发条件与收口标准 |
| base -> ops 继承同步 | 2026-05-11 ops 继承工作流；2026-05-23 align shared backoffice layers；Codex history 多次要求同步 base 到 ops 并验证 CMDB/Deploy | 高 | extend existing | 值得。已有 drift 脚本，缺少人工执行顺序 |
| 低代码生成模块闭环 | 2026-05-07 CMDB 后端/前端/seed/smoke；2026-05-20 low-code baseline；2026-05-23 platform coverage；Codex history 多次围绕 generator/dynamicmodule/autoRecycle/CMDB 真实生成验证 | 高 | extend existing | 值得。已有功能和 smoke，缺少“一次生成算完成”的定义 |
| 安全审计和 GitHub governance follow-up | 2026-05-13 gitleaks/security reports；2026-05-26 security review follow-ups、GitHub governance controls | 中高 | existing skill | 暂不新建。已有 `cso`、`review`、GitHub controls |
| 文档 frontmatter/索引治理 | 2026-05-18 frontmatter validation gate、repo-wide scan、bilingual docs；harness-engineering 已有 frontmatter checks | 中高 | existing automation | 暂不新建。已有 harness checks，按需执行即可 |

## 3. 推荐的 Codex 开发入口

以后给 Codex 派发非 trivial 任务时，优先补上下面 6 个字段。字段不全时，Codex 应先从仓库中推断，推断有风险再问。

```text
目标仓库：pantheon-base / pantheon-ops / harness-engineering / workspace docs
任务层级：platform / system/auth / system/iam / system/org / system/config / system/lowcode / business/*
任务类型：小改 / 标准功能 / UI任务 / 高风险任务 / 继承同步 / 真实环境操作
依据文档：contract / design / acceptance / AGENTS / OpenSpec change
验收方式：go test / npm build / smoke suite / gstack rendered evidence / harness evidence
收口要求：更新测试、i18n、权限、菜单、文档、evidence、review 中哪些项
```

最小可复制提示词：

```text
请先按 Pantheon 流程判断目标仓库、任务层级、任务类型、需要读取的依据文档和验证矩阵。
如果是 UI 任务，先使用 impeccable 作为视觉质量门禁，并在完成前提供 rendered evidence 或说明无法渲染的原因。
如果是 pantheon-ops 的通用后台问题，先判断是否应回流 pantheon-base，不要直接在 ops 里形成 override。
实现时保持小步修改，完成后说明实际验证命令、结果和未验证风险。
```

### 3.1 最小 task packet 模板

如果你不想每次临时组织语言，可以直接复用下面这个最小模板：

```text
目标仓库：
层级：
任务模式：review / implement / ui / inheritance-sync / smoke / docs
先读：
实现范围：
同步要求：仅本仓 / base -> ops / 暂不同步
验证方式：
停点：
```

这类任务包比“继续”“按最佳实践做”“全部处理完”更有效，因为它直接把 Codex 最容易猜错的部分写死了。

### 3.2 不需要再反复口头解释的默认规则

以下规则已经足够稳定，后续应视为默认上下文：

- `pantheon-base` 拥有 `platform` 和 `system/*` 的权威实现。
- `pantheon-ops` 只保留 `business/*` 业务差异，不应静默 override 底座行为。
- 共享分页、共享上传、共享表格、共享后台壳层、共享 i18n、共享 smoke helper 先改 base。
- 代码、测试、i18n、菜单、权限、文档、evidence 只要在任务范围内，就按一个收口单元处理。
- 非 trivial 的跨仓或高风险任务，优先走 stage 边界，而不是一口气自由发挥。

### 3.3 工具路由

工具选择不在本文件维护。使用 [Pantheon Workflow Routing](./WORKFLOW_ROUTING.md) 作为唯一决策树；本文件后续章节只说明 Pantheon 常见任务类型的收口要求。

## 4. 按任务类型执行

### 4.1 小改

适用：

- 文案、局部样式、单点 bug、非架构性测试修复。
- 不触碰权限、菜单、i18n、schema、路由、base/ops 边界。

流程：

1. 读目标仓库 `AGENTS.md` 或 `CLAUDE.md`。
2. 只改最小文件集。
3. 跑最小相关验证。
4. 最终说明验证结果和残余风险。

停止条件：

- 代码修改完成。
- 最小验证通过，或明确说明为什么未运行。

### 4.2 标准功能

适用：

- 新增页面、接口、模块行为。
- 触碰权限、菜单、i18n、审计、schema、seed、路由、生成器。

流程：

1. 判断目标仓库和任务层级。
2. 读取相关 contract/design/acceptance。
3. 明确 vertical slice：后端、前端、菜单、权限、i18n、测试是否同轮完成。
4. 实现最小闭环，不先堆横向基础设施。
5. 运行对应 go test、frontend build、smoke 或 harness check。

停止条件：

- 用户可见或 API 可验证的闭环完成。
- 权限、菜单、i18n、审计、测试没有明显漂移。

### 4.3 UI 任务

适用：

- 页面布局、表格、表单、弹窗、抽屉、dashboard、工作台、视觉一致性、响应式。

流程：

1. 使用 `impeccable` 做视觉质量门。
2. 读取 `DESIGN.md`、`FRONTEND_UI_SPEC`、页面模板相关文档。
3. 实现前先确认页面结构：治理栏、搜索区、功能栏、表格/表单、状态面板。
4. 完成后用 gstack/browser/smoke 获取 rendered evidence。
5. 如果无法渲染，记录具体原因，例如服务未启动、依赖缺失、登录态不可用。

停止条件：

- 功能验证通过。
- 有截图/浏览器证据，或有明确未渲染原因。
- loading、empty、error、forbidden、submitting 状态没有被省略。

### 4.4 i18n 生命周期任务

适用：

- 新增或删除模块。
- 删除低代码生成物。
- 修改错误 key、菜单标题、权限标题、导入导出文案。
- 发现空值、占位值、重复 key、长期未使用 key。

流程：

1. 先确认 key owner：base 通用 key、ops 业务 key、generated key。
2. 新增模块时同步 seed、前端资源、后端错误 key、菜单 titleKey。
3. 删除模块时同步清理 generated 资源，并进入 observe/archive/delete 生命周期。
4. 修改错误 key 时同步 backend service/handler、frontend resources、docs appendix、smoke 断言。
5. 运行相关 i18n smoke 或至少做 key 搜索验证。

停止条件：

- 不存在新增硬编码展示文本。
- 新增/删除/重命名 key 有 source owner 和 cleanup policy。
- 页面不会直接暴露 raw key。

### 4.5 base -> ops 继承同步

适用：

- `pantheon-base` 后台能力更新后同步到 `pantheon-ops`。
- `pantheon-ops` 页面布局、系统域、生成器、i18n 与 base 产生漂移。

流程：

1. 先跑 drift/继承检查，区分通用后台差异和业务差异。
2. 通用能力优先回 base 修；ops 只保留 `business/*` 和继承说明。
3. 同步 shared backend/frontend/i18n/permission/audit 相关文件时，保护 `business/cmdb`、`business/deploy` 本地业务代码。
4. 同步后分别验证 base 和 ops 的最小启动、build、smoke。
5. 最后更新 `PROJECT_INHERITANCE.md` 或继承证据。

停止条件：

- base 和 ops 通用后台差异可解释。
- ops 业务模块仍能通过业务 smoke。
- 没有把 ops 业务逻辑回灌到 base。

### 4.6 低代码生成模块闭环

适用：

- generator/dynamicmodule。
- 自动生成业务模块。
- autoRecycle、模块卸载、菜单注册、权限注册、i18n 资源注册。

流程：

1. 先明确生成目标是测试模块、临时模块、还是正式业务模块。
2. 生成前确认 schema、表名、模块名、父菜单、权限前缀、i18n 前缀。
3. 生成后验证 source files、backend registry、frontend registry、component registry、menu、permission、i18n、activation 状态。
4. 如果是临时模块，必须验证 autoRecycle 或 cleanup。
5. 用真实 smoke 钉住至少一条生成、访问、删除/回收链路。

停止条件：

- 生成物可访问。
- 生成物可治理。
- 删除/回收不残留菜单、权限、i18n 或数据表误删风险。

## 5. 本次创建或扩展

本次扩展的重点不是新工具，而是让现有文档更像“默认上下文入口”：

- `docs/WORKSPACE_INHERITANCE.md`
- `docs/WORKSPACE_INHERITANCE.zh.md`
- `docs/codex-development-process-improvement.md`
- `harness-engineering/docs/CODEX_DEVELOPMENT_PROCESS.zh.md`
- `pantheon-ops/docs/PROJECT_INHERITANCE.md`

没有创建新 skill、subagent 或 automation，原因是高频能力大多已存在：

- UI 质量门：`impeccable`
- QA/浏览器验证：`qa`、`qa-only`、`browse`
- PR/安全审查：`review`、`cso`
- harness 检查：`harness-engineering/scripts/harness/*`
- base/ops 继承检查：`triage-base-drift`、inheritance checks、ops sync scripts

## 6. 刻意跳过

- 不新建“Pantheon 全能开发 skill”。范围过大，会和 AGENTS、harness、现有 skills 重叠。
- 不新建安全审计 automation。已有 `cso` 和 GitHub governance，当前缺的是按任务触发，不是新扫描器。
- 不新建文档 frontmatter automation。已有 `frontmatter-check` 和 harness portable checks。
- 不把真实主机部署流程做成自动化。涉及凭据、网络和目标主机状态，应先沉淀为受控 runbook，再考虑自动化。

## 7. 还需要更多证据

以下候选后续再包装：

- Deploy 真实安装/卸载/回滚 runbook：已经反复出现，但涉及真实服务器、凭据和组件包源，需要先把安全边界、幂等策略、回滚策略写清。
- 业务域建模 checklist：CMDB、业务域、Deploy 已形成闭环，但还需要再观察 1-2 个新业务模块后再抽象。
- Chronicle 或外部工作流自动发现：当前未确认 Chronicle 是否启用，不能作为强证据来源。
