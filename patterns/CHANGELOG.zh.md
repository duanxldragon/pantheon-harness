# Agentic Method Kit 变更记录

English version: [CHANGELOG.md](./CHANGELOG.md)

## Unreleased

- Task packet 强制声明方法优先 ratchet 元数据：quality profile、portable failure class、owner layer、method readiness、ratchet decision、deferred code issues。
- Evidence 和 review artifact 强制记录 owner layer、ratchet decision、deferred code issues。
- 增加 task-packet 回归测试，确保缺少 method readiness 的旧格式任务包不能误通过。
- 覆盖评审模板增加 cross-agent ratchet、consumer-specific leakage、deferred code backlog、noisy sensor review。
- 补充旧 task packet、evidence、review artifact 的升级步骤。
- 增加可移植的设计/开发/QA/GitHub 治理闭环，并同步 task、review、PR、failure-registry 元数据。

## 1.0.0 - 2026-05-18

首个可迁移版本发布。

本次发布包含：

- 方法定义与运行时证据的分离
- 可迁移的 task packet、evidence、review 模板
- OpenSpec、task packet、evidence、review 之间的机器可读关联
- 可迁移检查脚本
- 最小示例 fixture
- 环境与技能使用说明
- 与 `agentic-repo-shell` `1.0.0` 的兼容配套
