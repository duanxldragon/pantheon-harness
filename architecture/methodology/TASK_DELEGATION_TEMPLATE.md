# Planner/Dispatcher → Generator 任务委派模板

> Planner/Dispatcher 每次把任务交给任意 Generator adapter 执行时，必须按此模板填写。
> 信息不完整 = Generator 容易猜错 = 返工。
> 具体工具可以是 Codex、Claude Code、Cursor、OpenHands、Aider、OMX execution lane 或人工工程师；工具不能改变 Task Packet 字段语义。

## 最小模板（日常快速任务）

```text
## Task Packet

**目标仓库：**    pantheon-base | pantheon-ops | pantheon-harness
**层级：**        platform | system/auth | system/iam | system/org | business/*
**模式：**        implement | review | ui | sonar-fix | smoke | docs | inheritance-sync
**必读：**        [具体文档路径]
**范围：**        [具体改什么，文件级别]
**禁止：**        [明确不能碰的区域]
**验证：**        [具体命令]
**停点：**        [必须停止或怎样算完成]
**adapter：**     [可选：本次使用的执行工具；没有则写 none]
```

## 完整模板（高风险/跨仓任务）

```text
## Task Packet — [简短任务名]

### 元信息
- 目标仓库：
- 层级：
- 模式：
- 关联 PR/Issue：
- 执行 adapter：none | Codex | Claude Code | Cursor | OpenHands | Aider | OMX lane | human engineer | other
- Reviewer/Evaluator：

### 前置阅读（按顺序）
1.
2.
3.

### 任务范围
#### 要改的文件
-

#### 禁止触碰
-

### 实现指令

[具体做什么，分步骤]

### 验证矩阵
| 验证项 | 命令 | 预期结果 |
|---|---|---|
| Go test | `go test ./...` | 全部通过 |
| Type check | `cd frontend && npx tsc -b` | 干净 |
| Lint | `cd frontend && npx eslint ...` | 0 error |
| Build | `cd frontend && npm run build` | 成功 |
| Smoke | `...` | 通过率 ≥ 95% |

### 收口要求
- [ ] 测试已更新
- [ ] i18n 已同步
- [ ] 权限/菜单已同步
- [ ] 继承漂移已检查
- [ ] 文档已更新
- [ ] evidence 已保存并链接
- [ ] review artifact 已保存并链接

### 停点
- [ ] 所有验证通过
- [ ] Reviewer/Evaluator 已审查 diff 和 evidence
- [ ] 代码已 commit 并 push
```

## SonarQube 修复专用模板

```text
## Task Packet — SonarQube Fix

- 规则 ID：[如 go:S3330]
- 严重等级：BLOCKER | CRITICAL | MAJOR | MINOR
- 影响文件：[文件路径:行号]
- 问题描述：[SonarQube 报告中的原文或摘要]
- 修复方向：[具体修法；如不需要给出则由 Generator 在既有合同内判断]
- 排除条件：[如果此问题是假阳性，说明为什么]
- 验证：修复后本地跑 `sonar-scanner` 确认问题消除
```

## 示例：一次标准的 UI 任务委派

```text
## Task Packet — 用户管理页列表排序

- 目标仓库：pantheon-base
- 层级：system/iam
- 模式：ui
- 必读：DESIGN.md §表格规范、pantheon-base/docs/designs/BUSINESS_RESOURCE_LIST_PATTERN.md
- 范围：UserList.tsx 的排序逻辑和 UI
- 禁止：不改后端 API、不改权限模型、不改数据库
- 验证：
  1. cd frontend && npx tsc -b
  2. cd frontend && npx eslint src/modules/system/user/UserList.tsx
  3. cd frontend && npm run build
  4. npx playwright test tests/smoke/system/system-pages.spec.ts -g "user"
- 停点：排序功能可用、lint 0 error、smoke 通过、截图证据已产出
```

## Handoff 规则

- Task Packet 必须能被不同 adapter 读取；不要把关键规则只写进某个工具私有 prompt。
- 如果 adapter 不支持某项能力，必须显式记录缺口和 fallback evidence。
- Generator 遇到 scope 扩大、缺少权限、生产/外部系统操作、破坏性动作或 reviewer 结论冲突时必须停止并回到 Dispatcher。
- Human gate 的输入应是 evidence 摘要和明确选项，而不是要求人重新阅读全部聊天上下文。
