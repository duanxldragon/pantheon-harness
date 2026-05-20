# Agentic Method Kit

English version: [README.md](./README.md)

这是一个可移植的方法包，包含：

- `OpenSpec`
- `superpowers`
- `impeccable`
- `gstack`
- 仓库本地 Harness Engineering 校验

这个目录设计成可以原样复制到其他仓库中。

如果仓库要使用这套方法，建议同时配合：

- `agentic-repo-shell/`

可选 overlay：

- `pantheon-overlay/`

## 这个方法包提供什么

- 工具无关的 harness 核心模型，用于区分 guides、sensors、state、gates、templates 和 adapters
- Harness 覆盖模型，用于评估控制项是否能抓住真正重要的失败
- 面向常见仓库拓扑的 harness template 分类
- 工具适配矩阵，用于保留具体 skills 和 CLI 的可用性，同时不把它们变成方法前提
- 定义默认工作流的方法级 playbook
- 一份从 agent 工具最佳实践映射到可移植 harness 模式的概念图
- 标准化的 task packet、evidence、review 和 PR 模板
- 可移植的 task packet 与 verification evidence schema
- review artifact 的可移植 schema 与 machine-readable 约定
- failure registry entry 的可移植 schema
- 文档 frontmatter schema 以及 README / contract 链接约定
- 明确的方法版本管理与升级说明
- 可移植检查脚本，用于校验：
  - task packet 结构
  - evidence 结构
  - review linkage 结构
  - adoption 与 OpenSpec linkage
  - 文档治理 frontmatter 与 linkage 漂移
  - 方法健康度与升级漂移

## 版本管理

当前版本：

- `1.0.0`

版本元数据：

- [VERSION](./VERSION)
- [METHOD_VERSION.json](./METHOD_VERSION.json)
- [CHANGELOG.md](./CHANGELOG.md)
- [UPGRADE.md](./UPGRADE.md)

## 环境要求

最低建议环境：

- `git`
- `node` 20+
- 能运行检查脚本的 shell

可选但推荐：

- 具备 OpenSpec 工作流或 CLI，用于显式管理 change 生命周期
- 一条浏览器 QA 路径，例如 `gstack browse`、Playwright 或人工截图
- 一个能够遵守仓库契约并运行 shell 命令的 agent 环境

这个方法包不依赖某一个特定编辑器、MCP server 或托管 agent runtime。

## 在未来仓库中的建议落点

把整个目录复制到目标仓库根目录：

```text
agentic-method-kit/
```

然后在目标仓库中接好这些路径：

- `docs/harness/tasks/`
- `.harness/evidence/`
- `.github/pull_request_template.md`
- `openspec/changes/`

## 快速开始

1. 阅读 [README.zh.md](./README.zh.md)
2. 阅读 [HARNESS_CORE_MODEL.zh.md](./HARNESS_CORE_MODEL.zh.md)
3. 阅读 [HARNESS_COVERAGE_MODEL.zh.md](./HARNESS_COVERAGE_MODEL.zh.md)
4. 阅读 [HARNESS_TEMPLATE_TAXONOMY.zh.md](./HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. 阅读 [TOOL_ADAPTER_MATRIX.zh.md](./TOOL_ADAPTER_MATRIX.zh.md)
6. 阅读 [METHOD_PLAYBOOK.zh.md](./METHOD_PLAYBOOK.zh.md)
7. 阅读 [INSTALL.zh.md](./INSTALL.zh.md)
8. 阅读 [CONCEPT_MAP.md](./CONCEPT_MAP.md)
9. 如需了解版本升级，阅读 [UPGRADE.zh.md](./UPGRADE.zh.md)
10. 复制你需要的模板
11. 如果你的仓库路径约定不同，调整 [config/method.config.json](./config/method.config.json)
12. 运行 [scripts/](./scripts/) 下的可移植检查脚本

## 日常使用

对于非 trivial 工作：

1. 创建或选择一个 OpenSpec change
2. 编写或更新 task packet
3. 实现变更
4. 保存 verification evidence
5. 保存 review 输出
6. 运行可移植检查

对于 trivial 工作：

- 如果仓库契约明确允许，可以跳过 OpenSpec 和 task packet
- 但仍然应该记录 verification 结果和已知缺口

## Skills 与工具

使用这个方法包不要求预装任何仓库本地 skill。

这套方法的设计原则是，即使没有任何 skill runtime，以下内容仍然是事实源：

- `docs/harness/*`
- templates
- schemas
- check scripts

可选的 skill 生态：

- `superpowers`：推荐用于设计、规划、执行纪律和验证流程
- `impeccable`：推荐作为 UI 质量门禁
- `gstack`：推荐用于浏览器 QA 和视觉 evidence
- 本地 Codex skills：可选的仓库专属加速层，不是方法前提

## Machine-Readable 闭环

对于非 trivial 工作，可移植闭环包括：

- OpenSpec change
- task packet
- evidence `commands.json`
- 带嵌入式 machine-readable JSON block 的 `review.md`
- 如果仓库采用文档治理，则还包括带 YAML frontmatter 和显式 contract linkage 的 governed docs

`review.md` 中的 JSON block 用于闭合交付链路。
文档 frontmatter 约定用于闭合 contracts、designs、assessments、remediations、acceptances、retained specs 和 retained archive docs 的治理链路。

## 核心原则

这个方法包在方法层面故意保持工具无关：

- 变更管理工具负责 change identity 和 lifecycle
- 计划与执行工具负责设计、实现纪律和验证工作流
- UI 质量门评估视觉、交互、可访问性和状态质量
- 浏览器或运行态检查工具提供行为 evidence
- 本地脚本负责 mechanical closure

具体工具可以被某个仓库推荐，但不能成为方法本身。
