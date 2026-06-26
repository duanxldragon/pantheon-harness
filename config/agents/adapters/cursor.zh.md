# Cursor 适配说明

English version: [cursor.md](./cursor.md)

`Cursor` 在这里被视为 Pantheon Harness Engineering 协议的实现适配器。

## 开始前必读

1. `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
2. `docs/harness/AGENT_INTERFACE_CONTRACT.md`
3. `docs/harness/TASK_PACKET_SPEC.md`
4. 当前仓库的 `AGENTS.md`

## Cursor 专属映射

- Cursor 规则应回链到 `docs/harness/*`，不要复制整套协议正文。
- 非琐碎实现任务应从 task packet 起步。
- 大范围编辑前先看当前 diff，避免覆盖用户已有改动。
- 验证命令必须在终端执行，或明确标记为未执行。

## Review

Cursor 可以用于实现或 review，但 review 输出仍必须遵循 `docs/harness/REVIEW_LOOP_SPEC.md`。
