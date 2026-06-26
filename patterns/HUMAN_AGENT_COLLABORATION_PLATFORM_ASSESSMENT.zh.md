# 人机协同开发平台评估

English version: [HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.md](./HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.md)

## 1. 结论

不要先做完整的人机协同开发平台。

先把方法沉淀为仓库内的文档、模板、schema、checker、示例和升级规则。等仓库闭环稳定后，再做轻量 companion 层。

推荐顺序：

1. 先在多个仓库里跑通可移植方法闭环。
2. 增加 CLI/reporting，读取现有 task packet、evidence、review 和 failure registry。
3. 增加轻量 dashboard，展示状态、缺口和 ratchet 决策。
4. 只有当多个仓库、多个 agent 都出现重复协同痛点，并且文档、脚本、CI artifact 已经不够用时，再考虑更完整的平台。

## 2. 为什么不先做完整平台

平台只有在流程稳定后才有价值。如果流程还在变化，平台会冻结弱假设，把方法演进变成产品 backlog。

第一阶段不应做这些能力：

- 替代已有 issue tracker 的项目管理。
- 替代 IDE。
- 替代 CI。
- 把聊天记录当事实源。
- 固化某个业务系统的架构规则。
- 治理单一产品仓库的扫描结果。

方法应保持事实源地位。平台如果存在，只应作为 reader、facilitator 和 evidence surface。

## 3. 可行产品形态

第一层平台化能力应该是 companion，而不是新的开发环境。

最小有用能力：

- Task packet wizard：根据目标、仓库 profile 和 human gates 生成有边界的任务包。
- Evidence dashboard：展示命令状态、runtime gap、截图、review 状态和 known gaps。
- Ratchet registry：聚合重复失败，并建议升级 guide、sensor、gate 或 template。
- Multi-agent adapter view：展示哪个 agent 负责实现、review 或验证。
- Method drift report：比较 method-kit 版本、repo-shell 版本、模板和 checker 结果。

第一版非目标：

- 替代 GitHub、GitLab、Jira、Linear 或 IDE。
- 远程执行任意代码。
- 保存 secrets。
- 拥有生产发布决策。
- 硬编码某个产品架构。

## 4. 平台化启动门槛

至少满足以下三项，再开始做平台：

- 两个以上仓库真实使用这套方法。
- 两个以上 agent 工具参与实现或 review。
- task packet 和 evidence schema 连续数周保持稳定。
- failure registry 中已经记录重复协同失败。
- CI artifacts 已经不足以让人快速理解状态。
- 手工创建 task packet / evidence / review 成为重复瓶颈。

如果不满足这些条件，优先改进方法和脚本。

## 5. 是否只适用于 Web

Harness Engineering 不是 Web 专属方法。

长期有效的抽象是：

```text
guide -> task boundary -> execution -> sensor -> evidence -> review -> gate -> ratchet -> retirement
```

它适用于：

- Web 前端和后台系统。
- 后端 API 和服务。
- CLI 工具。
- library 和 SDK。
- 数据管道。
- 移动端。
- 基础设施和 DevOps 仓库。
- 文档工程。
- 测试自动化和 QA harness。

不同领域变化的是 sensor 和 evidence。

### 5.1 适用边界

这套方法不是所有开发活动的替代品。它最适合有明确仓库、可版本化 artifact、可重复 sensor 和可审查 evidence 的软件交付过程。

适合完整使用：

- 非 trivial 功能开发、缺陷修复、重构、迁移、发布治理和质量治理。
- 多 agent 或人机协作任务。
- 需要跨会话恢复、review、handoff 或复盘的任务。
- 已经能定义 done criteria、验证命令、运行态证据或人工验收标准的工作。

应使用轻量版本：

- 早期产品探索。
- 研究性 spike。
- 一次性头脑风暴。
- 还没有稳定仓库边界或验证方式的原型。

轻量版本只要求保留目标、关键决策、已知风险和下一步，不强制 task packet、完整 evidence、review gate 或 CI gate。等方向稳定后，再升级到完整 harness 闭环。

| 领域 | 典型 Sensor | 典型 Evidence |
|---|---|---|
| Web UI | 浏览器 smoke、截图、可访问性检查、console errors | 截图、路由/状态矩阵、smoke JSON |
| 后端 API | 单测/集成测试、契约测试、日志、trace | 命令结果、API 示例、trace/log 片段 |
| CLI | golden tests、exit code tests、shell transcript checks | 命令 transcript、fixture output |
| Library / SDK | 类型测试、兼容性测试、示例、benchmark | 测试矩阵、生成文档、benchmark 摘要 |
| 数据管道 | schema checks、sample runs、数据质量检查 | sample output、row counts、异常报告 |
| 移动端 | simulator tests、截图、可访问性检查 | 设备矩阵、截图、crash logs |
| 基础设施 | plan/diff checks、policy-as-code、dry-run | plan output、policy result、rollback note |
| 文档 | link checks、frontmatter checks、示例执行 | doc build output、link report、已验证片段 |

## 6. 需要额外 Overlay 的领域

这套方法可以用于 Web 之外，但以下领域需要更强的项目专属 overlay：

- 安全关键系统。
- 强监管金融或医疗系统。
- 嵌入式或硬件流程。
- 高频或硬实时系统。
- 生产运维和事故响应。
- 对隐私或 secrets 处理要求很高的仓库。

这些领域不能直接套 Web UI gate。应增加领域专属 sensors、evidence、human gates 和升级规则。

## 7. 长期有效性

模型变强后，这套方法仍然有价值，因为它不依赖某个固定模型缺陷。

稳定部分：

- 仓库内事实源。
- 显式任务边界。
- 完成声明前必须有证据。
- 高影响决策需要 human gate。
- 实现者和 reviewer 视角分离。
- 重复失败升级为 guide、sensor、gate、template 或 no-action。
- 模型和工具升级后做 retirement review。

会变化的部分：

- 具体 prompt。
- 具体 checker 列表。
- 具体 CI 配置。
- 具体 agent adapter 行为。
- 哪些失败需要 deterministic gate。

方法应通过 promotion 和 retirement 演进，而不是永久堆规则。

## 8. 决策

以后可以用这套方法开发人机协同开发平台，但不要把平台作为第一个产物。

当前最合适的是做仓库 companion，读取现有方法 artifact，帮助人快速回答：

- 当前在做什么任务？
- agent 改了哪里？
- 什么证据证明结果？
- 哪些东西还没验证？
- 谁 review 过？
- 这个失败是否重复出现，是否应该改方法？

这已经足够降低协同成本，同时避免过早设计一套新的生命周期平台。
