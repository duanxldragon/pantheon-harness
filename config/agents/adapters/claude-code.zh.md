# Claude Code 适配说明

English version: [claude-code.md](./claude-code.md)

`Claude Code` 在这里被视为 Pantheon Harness Engineering 协议的执行与评审适配器。

## 开始前必读

1. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
2. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
3. `docs/harness/TASK_PACKET_SPEC.md`
4. `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
5. `docs/harness/REVIEW_LOOP_SPEC.md`
6. 当前仓库的 `CLAUDE.md` 和 `AGENTS.md`

## Claude 专属映射

- 多步骤任务使用 `TodoWrite` 或等价 checklist。
- `Skill` 工作流只作为适配层，不替代仓库协议本身。
- 非琐碎任务优先使用 task packet。
- 做 review 时遵循 `REVIEW_LOOP_SPEC.md` 的 findings-first 格式。
- 验证证据按 `VERIFICATION_EVIDENCE_SPEC.md` 保存或汇总。

## Guardrail

Claude 专属 prompt 文件不能变成架构、权限、i18n、审计或继承规则的唯一来源。
