# Harness 模板分类

English version: [HARNESS_TEMPLATE_TAXONOMY.md](./HARNESS_TEMPLATE_TAXONOMY.md)

本文定义可移植 harness template 分类。

Harness template 是面向常见仓库拓扑的 guides、sensors、gates、state conventions 和 bootstrap files 的版本化组合。Template 不应把仓库绑定到某个 agent 工具。

## 1. Template 原则

- Template 编码系统拓扑，不编码厂商偏好。
- Template 同时包含 feedforward guides 和 feedback sensors。
- Template 必须说明它调节什么、不调节什么。
- Template 应足够小，便于采用，再通过 overlay 扩展。
- Template 必须版本化且可升级。

## 2. Template 层

每个 template 有五层。

| Layer | Purpose |
|---|---|
| Entry | 简短仓库入口 guide 和阅读地图 |
| Contracts | 架构、领域、API、安全和验收规则 |
| Sensors | 测试、静态检查、smoke 和 review 规则 |
| State | Task packet、evidence、review 和 decision artifact |
| Adapter | 可选 runtime-specific 映射 |

只有 adapter 层是工具特定的。

## 3. 基础模板

### 3.1 Admin Platform Template

适用：

- 内部后台平台
- 模块化单体后台系统
- 有权限、菜单、审计、i18n 和配置治理的系统

默认 guides：

- platform/domain boundary map
- permission/menu/audit/i18n contracts
- UI state 和 design constraints
- page template rules

默认 sensors：

- auth、IAM、config、audit 后端测试
- 前端 typecheck/build
- menu 和 i18n contract checks
- 核心路由 browser smoke
- shell 和重复页面模式的 visual quality gate

高风险缺口：

- smoke 只查 render path 时，行为正确性可能不足
- 缺少用户旅程检查时，UI 治理可能过度规则化

### 3.2 API Service Template

适用：

- HTTP 或 RPC 服务
- 有稳定合同的服务边界
- 没有大 UI 表面的业务 API

默认 guides：

- API contract
- error semantics
- schema 和 migration rules
- observability requirements
- security 和 auth policy

默认 sensors：

- unit 和 integration tests
- contract tests
- schema migration checks
- static dependency rules
- key path 的 log/metric/trace checks

高风险缺口：

- 生成测试可能错过真实 consumer 行为
- backward compatibility 需要明确 contract fixtures

### 3.3 Event Processor Template

适用：

- worker
- queue consumer
- stream processor
- scheduled job

默认 guides：

- event schema contract
- idempotency policy
- retry 和 dead-letter policy
- observability rules
- operational runbook

默认 sensors：

- fixture-based event replay
- idempotency tests
- failure 和 retry tests
- latency 和 throughput checks
- log 和 trace checks

高风险缺口：

- happy path 测试可能漏掉 poison message
- backlog 和 retry storm 需要接近生产的运行态信号

### 3.4 Dashboard Template

适用：

- reporting dashboard
- analytics surface
- data-heavy operational view

默认 guides：

- data source contract
- metric definition dictionary
- freshness 和 latency rules
- chart 和 table design rules
- permission 和 data visibility policy

默认 sensors：

- query tests
- data fixture comparisons
- chart render smoke
- accessibility 和 responsive checks
- stale-data checks

高风险缺口：

- 图表渲染通过，不代表指标语义正确
- 数据新鲜度需要运行态可观测性

### 3.5 UI-Heavy Product Template

适用：

- 功能丰富的前端应用
- editor-like experience
- 主观质量和交互深度重要的工作流

默认 guides：

- product principles
- design quality criteria
- interaction contracts
- accessibility rules
- browser-supported workflow list

默认 sensors：

- Playwright 或等价 journey tests
- screenshot evidence
- 视觉和交互质量 evaluator review
- accessibility checks
- performance checks

高风险缺口：

- evaluator 判断需要校准
- 只看截图会漏掉交互质量

### 3.6 CLI Tool Template

适用：

- 命令行工具
- 开发者工具
- 带稳定参数和输出的自动化脚本

默认 guides：

- 命令合同
- flag 和 exit-code 语义
- 输入/输出 fixture 策略
- 兼容性和退役规则

默认 sensors：

- golden output tests
- exit-code tests
- shell transcript fixtures
- help text checks

高风险缺口：

- 精确文本测试可能过拟合，忽略语义行为。
- 不同操作系统差异需要显式 fixture。

### 3.7 Library / SDK Template

适用：

- 共享库
- SDK
- 被其他仓库消费的 package

默认 guides：

- public API contract
- 版本和兼容性策略
- 示例使用要求
- 必要时的 benchmark 或性能预期

默认 sensors：

- unit tests
- type tests
- compatibility fixtures
- 示例编译或执行
- 必要时的 benchmark smoke checks

高风险缺口：

- 内部测试可能漏掉真实消费者用法。
- public API drift 需要显式 fixture。

### 3.8 Data Pipeline Template

适用：

- ETL / ELT pipeline
- batch job
- 数据质量流程
- analytics transformation

默认 guides：

- 输入/输出 schema 合同
- 数据 freshness 和 retention 规则
- 幂等和重跑策略
- 质量阈值

默认 sensors：

- schema checks
- sample run fixtures
- row-count 和 anomaly checks
- lineage 或依赖检查

高风险缺口：

- sample data 不一定代表生产偏斜。
- 正确性经常需要领域 owner 提供验收样例。

### 3.9 Infrastructure Change Template

适用：

- infrastructure-as-code 仓库
- 部署和环境变更
- policy-as-code 流程

默认 guides：

- 环境 ownership map
- plan / apply 策略
- rollback 预期
- secret-handling 规则

默认 sensors：

- plan 或 diff checks
- policy-as-code checks
- dry-run validation
- drift detection

高风险缺口：

- dry-run 可能漏掉 provider 侧运行时行为。
- 破坏性变更必须有 human gate。

### 3.10 Mobile App Template

适用：

- iOS、Android、React Native、Flutter 或类似应用
- 依赖设备状态的用户流程

默认 guides：

- 支持的设备和 OS 矩阵
- navigation 和 permission-state 合同
- offline 和 error-state 预期
- accessibility baseline

默认 sensors：

- unit tests
- simulator 或 device smoke tests
- screenshots
- crash log checks
- accessibility checks

高风险缺口：

- simulator 覆盖可能漏掉设备特定失败。
- 截图不能替代交互测试。

### 3.11 Documentation Governance Template

适用：

- documentation-first repository
- API docs
- developer guides
- 方法或 policy 仓库

默认 guides：

- 文档 ownership
- frontmatter 和生命周期规则
- link 和 example 验证规则
- archive 和 retirement policy

默认 sensors：

- link checks
- frontmatter checks
- snippet / example execution
- docs build checks

高风险缺口：

- 文档内部一致不代表用户任务成功。
- 如果示例描述可执行流程，需要 runtime verification。

## 4. Overlays

Overlay 为基础 template 增加领域约束。

例子：

- 示例 overlay：上游/下游继承、项目专属边界、drift checks
- 监管领域 overlay：审计保留、approval gates、evidence retention
- 高安全 overlay：更严格的 secrets、dependency、permission gates

Overlay 规则：

- overlay 不能静默重定义 base template
- overlay 必须声明新增 guides、sensors 和 gates
- base template 变更时，overlay 必须有升级路径

## 5. Template 选择

选择覆盖真实拓扑的最小 template。

决策参考：

| Repository shape | Starting template |
|---|---|
| 带 auth/IAM/menu/audit 的后台 | Admin Platform |
| 稳定 API 的 headless service | API Service |
| Worker 或 stream processor | Event Processor |
| 数据产品或报表 UI | Dashboard |
| 富交互前端 | UI-Heavy Product |
| CLI 或开发者工具 | CLI Tool |
| 共享 package 或 SDK | Library / SDK |
| ETL、ELT 或数据质量流程 | Data Pipeline |
| Infrastructure-as-code 或部署仓库 | Infrastructure Change |
| 移动端应用 | Mobile App |
| 文档或方法仓库 | Documentation Governance |
| 混合系统 | 选择 primary template 并叠加 overlay |

风险不需要时，不要从最严格 template 开始。

## 6. Template 健康度

定期 review 每个 template。

检查项：

- 入口 guide 是否仍然短？
- sensor 是否映射到已知失败模式？
- gate 是否防住真实缺陷，还是只拖慢变更？
- template 假设对当前模型和 runtime 是否仍然成立？
- 下游仓库是否偏离 template？
- template upgrade 是否容易应用？

输出应是版本化 template update，或明确保留当前版本的决策。
