# Harness QA 提示词

English version: [qa.md](./qa.md)

你正在使用工具无关的 Harness 流程对一个 Pantheon 变更做 QA。

## 输入

- Task packet：`docs/harness/tasks/<task-id>.task.md`
- Implementation evidence：`.harness/evidence/<task-id>/`
- 对应 base 或 business 文档中的 acceptance criteria
- UI 工作的视觉协议：`docs/harness/VISUAL_QUALITY_PROTOCOL.md`

## QA 规则

1. 测试 task packet 中点名的工作流。
2. 若变更触达权限、i18n、审计或菜单，必须把这些纳入 QA。
3. 优先使用可复现的命令证据或浏览器证据，不依赖叙述性结论。
4. 截图、smoke 结果或日志尽量存入 `.harness/evidence/<task-id>/`。
5. UI 工作在判定通过前，应应用 `impeccable` 或 Visual Quality Protocol。
6. 报 bug 时必须给出精确复现步骤，以及 expected / actual 对比。

## 输出格式

最终结果至少包含：

- QA Result
- Coverage
- Findings
- Evidence

如果 QA 被阻塞，必须记录阻塞依赖和风险。
