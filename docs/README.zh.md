# 文档总览

English version: [README.md](./README.md)

这个目录用于整理 `harness-engineering` 的文档入口、阅读顺序和双语维护约定。

## 推荐语言策略

建议采用“中英分拆、互相链接”的方式，而不是在同一份文档里上半部分中文、下半部分英文。

原因：

- 中文开发者可以直接进入 `*.zh.md`，阅读负担最低
- 英文文档可以保持对外发布和国际协作的稳定链接
- diff、审阅、自动校验和后续翻译都更容易维护
- 单文档双语会让目录、锚点、搜索结果和版本比较都变得混乱

具体规则见：[DOCUMENTATION_I18N_POLICY.zh.md](./DOCUMENTATION_I18N_POLICY.zh.md)

补充约定：

- 对于已经以中文正文稳定存在、且不希望破坏既有路径的 legacy 文档，保留原始 `.md`
- 这类文档新增英文 companion，命名为 `*.en.md`
- `docs/harness/*.md` 当前按这个规则维护

## 文档分组

### 1. 根工作区说明

- [../README.zh.md](../README.zh.md)：中文仓库入口
- [../README.md](../README.md)：英文仓库入口
- [../DISTRIBUTION.md](../DISTRIBUTION.md)：发布面与分发边界
- [../RELEASE.md](../RELEASE.md)：发布流程
- [../MIGRATION_TO_STANDALONE_REPO.md](../MIGRATION_TO_STANDALONE_REPO.md)：迁移为独立仓库
- [../STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md](../STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md)：仓库引导检查清单
- [../PANTHEON_CONSUMER_SYNC_POLICY.md](../PANTHEON_CONSUMER_SYNC_POLICY.md)：Pantheon 消费侧同步策略

状态：
- 已有中英分离入口：`README.md` / `README.zh.md`
- 多数根级说明文档目前仍以英文文件名或单份正文存在，建议逐步补充 `*.zh.md`

### 2. Harness 根契约

目录：[`./harness/`](./harness/)

核心文档：

- `HARNESS_ENGINEERING_CONTRACT.md`
- `AGENT_INTERFACE_CONTRACT.md`
- `TASK_PACKET_SPEC.md`
- `VERIFICATION_EVIDENCE_SPEC.md`
- `REVIEW_LOOP_SPEC.md`
- `DOCUMENT_FRONTMATTER_SPEC.md`
- `TOOL_ADAPTERS.md`
- `VISUAL_QUALITY_PROTOCOL.md`
- `INHERITANCE_HARNESS_PROTOCOL.md`
- `HARNESS_METHOD_PLAYBOOK.md`
- `failure-registry.md`
- `HARNESS_OPEN_TASKS.md`

状态：
- 当前这组文档多数已经偏中文或中文友好
- 为保持既有路径稳定，这组文档保留中文主文档 `*.md`，英文 companion 使用 `*.en.md`
- 如果后续迁移到全英文主路径，应作为单独 cutover 处理，而不是在本轮直接改名

### 3. Method Kit 方法包

目录：[`../agentic-method-kit/`](../agentic-method-kit/)

建议阅读顺序：

1. [../agentic-method-kit/README.zh.md](../agentic-method-kit/README.zh.md)
2. [../agentic-method-kit/HARNESS_CORE_MODEL.zh.md](../agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [../agentic-method-kit/METHOD_PLAYBOOK.zh.md](../agentic-method-kit/METHOD_PLAYBOOK.zh.md)
7. [../agentic-method-kit/INSTALL.zh.md](../agentic-method-kit/INSTALL.zh.md)
8. [../agentic-method-kit/UPGRADE.zh.md](../agentic-method-kit/UPGRADE.zh.md)
9. [../agentic-method-kit/MIGRATION.md](../agentic-method-kit/MIGRATION.md)
10. [../agentic-method-kit/CONCEPT_MAP.md](../agentic-method-kit/CONCEPT_MAP.md)
11. [../agentic-method-kit/CHANGELOG.md](../agentic-method-kit/CHANGELOG.md)

状态：
- 目前基本是英文单份
- 这是最值得优先补中文副本的一组，因为它们是方法入口和操作手册

### 4. Repo Shell 可复制壳层

目录：[`../agentic-repo-shell/`](../agentic-repo-shell/)

重点文档：

- [../agentic-repo-shell/README.zh.md](../agentic-repo-shell/README.zh.md)
- [../agentic-repo-shell/README.md](../agentic-repo-shell/README.md)
- [../agentic-repo-shell/.agents/README.md](../agentic-repo-shell/.agents/README.md)
- [../agentic-repo-shell/docs/harness/tasks/README.md](../agentic-repo-shell/docs/harness/tasks/README.md)
- [../agentic-repo-shell/openspec/README.md](../agentic-repo-shell/openspec/README.md)
- [../agentic-repo-shell/scripts/harness/README.zh.md](../agentic-repo-shell/scripts/harness/README.zh.md)
- [../agentic-repo-shell/scripts/harness/README.md](../agentic-repo-shell/scripts/harness/README.md)

状态：
- 契约类文档与根 `docs/harness` 有镜像关系
- 适合在完成根契约双语化后，再同步壳层副本

### 5. Pantheon Overlay

目录：[`../pantheon-overlay/`](../pantheon-overlay/)

重点文档：

- [../pantheon-overlay/README.zh.md](../pantheon-overlay/README.zh.md)
- [../pantheon-overlay/README.md](../pantheon-overlay/README.md)
- [../pantheon-overlay/docs/WORKSPACE_INHERITANCE.zh.md](../pantheon-overlay/docs/WORKSPACE_INHERITANCE.zh.md)
- [../pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md](../pantheon-overlay/docs/PROJECT_INHERITANCE_TEMPLATE.zh.md)
- [../pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.zh.md](../pantheon-overlay/docs/BASE_UPGRADE_WORKFLOW.zh.md)
- [../pantheon-overlay/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md](../pantheon-overlay/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md)

状态：
- 当前以英文单份为主
- 当你的团队主要是中文开发者时，建议在 overlay 层补中文副本

### 6. Agent 与 Prompt 资产

目录：

- [../.agents/README.md](../.agents/README.md)
- [../.agents/adapters/](../.agents/adapters/)
- [../.agents/prompts/](../.agents/prompts/)

状态：
- 这些文档偏运行时适配说明，通常保留英文主版本即可
- 如果团队日常会直接阅读，可以补 `README.zh.md` 或中文导读，而不必优先全文翻译

### 7. Skills 与工具说明

- [./SKILLS.zh.md](./SKILLS.zh.md)
- [./SKILLS.md](./SKILLS.md)
- [../.codex/skills/](../.codex/skills/)

状态：
- `SKILLS.md` 适合补中文副本或在顶部增加中文摘要
- 各 skill 自身是否双语，取决于它是否属于对外发布面

## 建议的落地顺序

1. 保持所有英文原文路径不变，避免破坏已有链接
2. 为高频入口文档补 `*.zh.md`
3. 在中英文文档顶部互相链接
4. 在每个目录增加一个中文导读或双语索引
5. 只有当某份文档需要对外发布时，才补完整英文副本

## 第一批建议优先双语化

- `agentic-method-kit/README.md`
- `agentic-method-kit/HARNESS_CORE_MODEL.md`
- `agentic-method-kit/HARNESS_COVERAGE_MODEL.md`
- `agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md`
- `agentic-method-kit/TOOL_ADAPTER_MATRIX.md`
- `agentic-method-kit/METHOD_PLAYBOOK.md`
- `agentic-method-kit/INSTALL.md`
- `agentic-method-kit/UPGRADE.md`
- `agentic-repo-shell/README.md`
- `pantheon-overlay/README.md`
- `docs/SKILLS.md`
