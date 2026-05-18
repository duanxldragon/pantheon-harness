# Review Loop Spec

类型：Contract
归属层：method
状态：Active

本文定义工具无关 review loop。实现者和 reviewer 可以是不同工具或人工，但输出格式必须一致。

## 1. Review 目标

Review 不是总结变更，而是发现：

- 行为回归
- 安全风险
- 架构边界漂移
- 权限、菜单、i18n、审计缺口
- 测试和证据不足
- foundation/overlay 继承风险

## 2. Review 角色

至少支持以下角色：

- Architect Reviewer：层级、边界、合同、继承、drift。
- Security Reviewer：认证、权限、审计、敏感数据、依赖安全。
- UX / QA Reviewer：页面状态、i18n、菜单、浏览器证据、响应式。
- Mechanical Gate：CI、lint、test、smoke、静态检查。

同一工具可以扮演多个角色，但高风险任务建议实现者和 reviewer 分离。

## 3. Review 输入

Reviewer 必须读取：

- task packet 或用户请求
- diff
- 相关合同和验收文档
- verification evidence
- CI 或本地验证结果

## 4. Findings 格式

Findings 必须优先输出，按严重程度排序：

```text
[P0|P1|P2] (confidence: N/10) file:line - 问题描述
Impact:
Fix:
Verification:
```

严重程度：

- P0：安全、数据损坏、构建失败、核心链路不可用。
- P1：模块不可达、权限/i18n/菜单契约失效、明显行为回归。
- P2：治理、文档、测试覆盖、可维护性缺口。

## 5. 无发现格式

如果没有发现问题，必须写：

```text
No P0/P1/P2 findings found.
Residual risk:
Verification checked:
```

## 6. Approval 状态

Review 结论只能是：

- `approved`
- `changes requested`
- `blocked`
- `approved with documented P2 follow-up`

P0/P1 未解决时不能 approved。

## 7. 多工具协作

允许组合：

- Codex 实现，Claude Code review。
- Cursor 实现，Codex review。
- 人工实现，agent review。
- Agent 实现，人工 final approval。

但所有 review 都必须引用同一 task packet 和 verification evidence。

## 8. Review Artifact Linkage

如果 review 结果需要作为仓库内 artifact 留存，默认放在：

```text
.harness/evidence/<task-id>/review.md
```

推荐最小模板：

```md
# Review Summary: <task-id>

## Linkage

- Task Packet: `docs/harness/tasks/<task-id>.task.md`
- Evidence: `.harness/evidence/<task-id>/commands.json`
- OpenSpec Change: `openspec/changes/<name>/` | none

## Verdict

approved | changes requested | blocked | approved with documented P2 follow-up

## Findings

No P0/P1/P2 findings found.

## Residual Risk

- none

## Verification Checked

- `command`
```

即使 review 不单独落盘，也必须在 PR / review comment 中引用同一 task packet 和 evidence 路径。
