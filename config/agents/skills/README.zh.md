# Repo-Local Skill 模板

English version: [README.md](./README.md)

这里存放仓库本地 Codex workflow skills 的共享模板层。

这些模板不绑定某一个具体仓库，适用于为 `pantheon-base`、`pantheon-ops` 之类的仓库创建或刷新 repo-local skills。

当前模板：

- `repo-verify-template`
- `repo-pr-gate-template`
- `repo-ci-triage-template`
- `gh-fix-ci-template`

推荐用法：

1. 选择对应模板
2. 复制结构到目标仓库 `.agents/skills/<skill-name>/SKILL.md`
3. 用真实命令、workflow 名称和风险边界替换占位项
4. 再把 skill 入口接到该仓库的 `AGENTS`、`README` 和继承文档
