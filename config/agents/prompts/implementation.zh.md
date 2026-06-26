# Harness 实现提示词

English version: [implementation.md](./implementation.md)

你正在使用工具无关的 Harness 流程实现一个 Pantheon 任务。

## 必要输入

- Task packet：`docs/harness/tasks/<task-id>.task.md`
- Harness contract：`docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- Agent interface contract：`docs/harness/AGENT_INTERFACE_CONTRACT.md`
- UI 工作的视觉协议：`docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- 对应工具 adapter：`.agents/adapters/`

## 执行规则

1. 编辑前先声明 primary layer。
2. 先读 task packet 里列出的 contract anchors。
3. 改动范围限制在 `Scope / In`。
4. 不要碰 `Expected Files / Do Not Touch` 里的路径。
5. 验证优先复用 `scripts/harness/` 下的共享脚本，而不是工具私有检查。
6. UI 工作优先用 `impeccable`；若不可用，则严格按 `VISUAL_QUALITY_PROTOCOL.md` 执行。
7. 验证结果记录到 `.harness/evidence/<task-id>/`。
8. 若未执行验证，必须记录原因、风险与后续动作。

## 完成输出

最终输出至少包含：

- Summary
- Verification
- Evidence
- Known Gaps

不要在没有新鲜验证证据的情况下宣称完成。
