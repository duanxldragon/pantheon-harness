# OpenHands 适配说明

English version: [openhands.md](./openhands.md)

`OpenHands` 在这里被视为 Pantheon Harness Engineering 协议的执行适配器。

## 开始前必读

1. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
2. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
3. `docs/harness/TASK_PACKET_SPEC.md`
4. `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
5. 当前仓库的 `AGENTS.md`

## OpenHands 专属映射

- 非琐碎任务使用 task packet 作为 issue 级指令。
- 尽量在工作区内执行验证命令。
- 命令摘要和工件按 evidence spec 持久化。
- 删除、schema、base contract、permission、i18n、audit、inheritance 相关变更，不能绕过人工关口。
