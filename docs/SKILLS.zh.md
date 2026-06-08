# Skills Policy

English version: [SKILLS.md](./SKILLS.md)

这个仓库保留了一份项目本地 `.codex/skills` 目录树，用来保证这套方法在仓库迁移时可以一起迁走。

## 默认来源

对于本地开发者，canonical skill source 是用户级 Codex skills 目录：

- `C:\Users\xiaolong\.codex\skills`

## 推荐同步流程

当你启动一个新项目，或者把这个工作区迁移到一台新机器时：

1. 先把用户级 skills 同步到仓库本地 `.codex/skills`
2. 提交那些应该随项目一起迁移的仓库本地 skills
3. 让项目优先加载自己的本地 skills

## 优先级规则

如果某个 skill 同时存在于用户目录和项目目录中，在这个仓库会话里以项目本地副本为准。

这样可以避免项目迁移依赖手动重新安装 skills。

## 维护规则

如果你希望某个变更对所有项目生效，更新用户级 skills。
如果项目需要固定版本或定制副本，更新仓库本地 skills。

## Codex 流程触发

当任务是 non-trivial，并且需要使用 Pantheon 默认流程时，使用 [CODEX_DEVELOPMENT_PROCESS.zh.md](./CODEX_DEVELOPMENT_PROCESS.zh.md)：

- 选择目标仓库
- 判定任务层级
- UI 任务走视觉门禁
- 选择 smoke / evidence 验证
- 做 base -> ops 继承同步
- 收口低代码生成闭环

当你要创建或刷新仓库本地 workflow skills，例如 `repo-verify`、`repo-pr-gate`、`repo-ci-triage`、`gh-fix-ci` 时，使用 `../.agents/skills/README.zh.md` 里的共享模板层。

如果任务很小，只用仓库合同和最小相关 skill 即可。
