# Agentic Method Workspace

这是一个独立的、可发布的 agentic 开发方法仓库。

英文入口见 [README.md](./README.md)。
文档总览与双语维护策略见 [docs/README.zh.md](./docs/README.zh.md) 和 [docs/DOCUMENTATION_I18N_POLICY.zh.md](./docs/DOCUMENTATION_I18N_POLICY.zh.md)。

它的职责不是承载某个具体业务项目，而是维护、版本化、验证并发布一套可复用的方法层资产。Pantheon 只是其中一个可选 overlay 场景，不是这个仓库的唯一目标。

## 仓库发布什么

当前仓库按层发布方法能力：

- `agentic-method-kit/`：方法事实源，包含 schema、模板、playbook、版本元数据
- `agentic-repo-shell/`：可复制到业务仓库根目录的壳层，包含适配器、CI 入口、运行时骨架
- `pantheon-overlay/`：可选的 Pantheon 继承治理 overlay
- `docs/harness/`：方法根契约文档
- `scripts/`：bootstrap 与校验脚本
- `.codex/skills/`：项目本地 Codex 技能包，可随仓库一起迁移

补充约定：

- 仓库自带、已提交的 `.codex/skills/*` 属于方法资产，可以随仓库发布或迁移
- 从用户目录同步进来的本地 skills 只属于可选加速层，不默认纳入发布版本
- 当前默认忽略的同步技能包括 `.codex/skills/.system/`、`.codex/skills/gstack-*/`、`.codex/skills/impeccable/`、`.codex/skills/ui-ux-pro-max/`

下游仓库通常不应该整仓复制当前 repo，而是复制它真正需要的发布面。

## 推荐阅读顺序

如果你要先理解方法本身，建议按下面顺序阅读：

1. [agentic-method-kit/README.zh.md](./agentic-method-kit/README.zh.md)
2. [agentic-method-kit/HARNESS_CORE_MODEL.zh.md](./agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](./agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](./agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](./agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [agentic-method-kit/METHOD_PLAYBOOK.zh.md](./agentic-method-kit/METHOD_PLAYBOOK.zh.md)
7. [docs/harness/HARNESS_ENGINEERING_CONTRACT.md](./docs/harness/HARNESS_ENGINEERING_CONTRACT.md)
8. [docs/harness/AGENT_INTERFACE_CONTRACT.md](./docs/harness/AGENT_INTERFACE_CONTRACT.md)
9. [docs/harness/TASK_PACKET_SPEC.md](./docs/harness/TASK_PACKET_SPEC.md)
10. [docs/harness/VERIFICATION_EVIDENCE_SPEC.md](./docs/harness/VERIFICATION_EVIDENCE_SPEC.md)
11. [docs/harness/REVIEW_LOOP_SPEC.md](./docs/harness/REVIEW_LOOP_SPEC.md)
12. [docs/harness/DOCUMENT_FRONTMATTER_SPEC.md](./docs/harness/DOCUMENT_FRONTMATTER_SPEC.md)
13. [.agents/README.md](./.agents/README.md)

如果你要做仓库发布或方法迁移，再继续看：

1. [DISTRIBUTION.zh.md](./DISTRIBUTION.zh.md)
2. [RELEASE.zh.md](./RELEASE.zh.md)
3. [MIGRATION_TO_STANDALONE_REPO.zh.md](./MIGRATION_TO_STANDALONE_REPO.zh.md)
4. [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.zh.md)
5. [PANTHEON_CONSUMER_SYNC_POLICY.zh.md](./PANTHEON_CONSUMER_SYNC_POLICY.zh.md)
6. [docs/SKILLS.zh.md](./docs/SKILLS.zh.md)

## 新项目怎么用

一个普通新仓库，推荐复制：

1. `agentic-method-kit/`
2. `agentic-repo-shell/`
3. 如需要 Pantheon 继承治理，再加 `pantheon-overlay/`

只有在你要维护方法本身时，才需要直接操作当前根仓库。

## 环境要求

最低要求：

- `git`
- `node` 20+
- PowerShell

建议具备：

- Codex、Claude Code、Cursor 或其他 agent 运行环境

方法本身不强制依赖某个特定 skill 包。skills 是执行层加速器，真正的事实源仍然是仓库中的契约、模板和校验脚本。
如果你希望项目迁移时不再重复安装 skills，建议把项目需要的 skills 保存在 `.codex/skills/`，并通过 `scripts/sync-codex-skills.ps1` 从用户目录刷新。
但同步出来的用户本地 skills 默认按“工作站增强资产”处理，不应直接当作正式发布面。

## 校验与发布

核心发布检查：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

当前首版元数据为 `1.0.0`，对应：

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## 边界

应该放在这里的：

- 方法契约
- schema 与模板
- tool adapter
- bootstrap 脚本
- release / migration 指南

不应该继续放在这里的：

- 业务应用代码
- 基础产品代码
- 大量项目过程归档
- 下游消费仓库的运行时 evidence
