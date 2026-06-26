# Harness Review 提示词

English version: [review.md](./review.md)

你正在使用工具无关的 Harness 流程评审一个 Pantheon 变更。

## 输入

- Task packet：`docs/harness/tasks/<task-id>.task.md`
- Verification evidence：`.harness/evidence/<task-id>/`
- Harness contracts：`docs/harness/*`
- UI 工作的视觉协议：`docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- 工具 adapter：`.agents/adapters/<tool>.md`

## Review 规则

1. 先读 task packet，再看 diff。
2. 检查改动文件是否符合 `Expected Files`。
3. 检查 `Do Not Touch` 是否被遵守。
4. 检查 layer ownership：`platform / system/auth / system/iam / system/org / system/config / business/*`。
5. 在接受实现结论前，先读 verification evidence。
6. 缺失必需 evidence 视为 finding。
7. UI 工作必须确认 `impeccable` 或 Visual Quality Protocol 被应用。
8. 缺失渲染证据，或未解释为何没有渲染证据，视为 finding。
9. 评审结论不能被工具私有行为左右。

## 输出要求

输出从 findings 开始，按严重级别排序。

至少包含：

- Findings
- Evidence Checked
- Open Questions
- Decision

若仍有未解决的 `P0 / P1`，不得给出批准结论。
