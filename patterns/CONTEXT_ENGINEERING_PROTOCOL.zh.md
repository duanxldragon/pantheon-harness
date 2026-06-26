# Context Engineering Protocol

English version: [CONTEXT_ENGINEERING_PROTOCOL.md](./CONTEXT_ENGINEERING_PROTOCOL.md)

这份协议把 memory-first、skill-driven agent 系统里可迁移的方法，整理成仓库自有的 Harness Engineering 资产。

它不是 Claude 专属或 Codex 专属功能说明，而是定义 durable context 在 harness 中应如何存储、加载、检索、脱敏和提升。

## 0. 版本信息

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.1 | 2026-06-26 | 增强 Context Window 管理、跨 Session 状态、标准格式 |

## 1. 目标

这份协议用于：

- 减少 human 反复重述同一批项目上下文
- 让高价值上下文在 session reset 和 handoff 后仍可恢复
- 让历史状态按层检索，而不是一开始就塞进整份 transcript 或日志
- 优先使用 repo-owned memory surface，而不是依赖 chat-only recall 或工具私有 memory
- 除非仓库明确要求，否则不要把敏感或不可留存上下文写进共享 durable state

## 2. Context Surfaces

不同上下文不应落在同一层。

推荐优先级：

1. 仓库自有合同与入口文件
2. 当前 task packet、plan、structural-scope 说明
3. repo-owned memory surface，例如回链到源任务的 wiki 页面、hot cache、graph report 和 durable notes
4. evidence summary、review summary、decision log
5. 原始 evidence，如 commands、logs、traces、screenshots
6. 本地私有笔记、个人偏好或工具自动 memory

规则：

- 入口层要短，深层内容通过链接展开。
- 每个 durable memory 页面都应回链到支撑它的 task、evidence、review 或 contract。
- 如果多个 context surface 冲突，优先相信仓库合同和当前任务状态，而不是私有或工具托管 memory。
- 当仓库已有显式 state 时，不要把工具本地 memory 当事实源。

## 3. Progressive Retrieval

上下文要分层读取。

### Layer 1: Index

先看紧凑信号：

- task ID
- 文件路径
- 短摘要
- graph 或 wiki 索引项
- review finding 标题
- decision 标签

### Layer 2: Scoped Narrative

再只加载解释当前工作分支所需的有边界叙述：

- 相关 task packet section
- 带源引用的 scoped wiki 页面、hot cache 笔记或 graph report
- `summary.md`
- review findings
- timeline 或 decision summary

### Layer 3: Raw Detail

只有前两层已经收窄需求后，才去读原始 artifact：

- `commands.json`
- 完整 logs 或 traces
- screenshots
- transcript 片段

默认读取顺序：

```text
entry guides -> task packet -> repo memory index -> summary/review -> raw evidence
```

规则：

- 优先围绕当前 file、task 或 affected subgraph 读取。
- 如果有图谱或结构化查询 surface，先用它收窄读取范围，再打开原始文件。
- 需要原始细节时，批量读取相关内容，不要零碎地反复打开很多小 artifact。
- 如果 summary 已经概括了关键点，就不要再把同一段 transcript 或日志重复灌进 context。

## 3.1 提升规则

如果同一条项目事实、边界解释或调试定位在多个 session 里反复被讲述，就应把它提升进 repo-owned memory。

规则：

- 优先写成仓库可版本化、可 diff、可 review、可链接的 Markdown、JSON 或 HTML artifact。
- 提升 summary、index 和 citation，不要复制整段 transcript。
- Memory 条目要保持有边界：一个主题、一条来源链、一个 owner 或 source of truth。
- Promotion target 可以是 repo wiki、hot cache、guide update、decision log 或 graph report。

## 4. Resume 和 Checkpoints

长任务必须靠 repo state 恢复，而不是只靠聊天记忆。

用于 resume 的 durable artifact 应包括：

- task packet
- evidence summary
- review artifact
- decision log
- task packet 中显式列出的 resume artifacts

如果 runtime 支持 checkpoint 或 rewind，可用于可逆探索，但必须遵守：

- checkpoint 用于实验，不用于可审计收口
- checkpoint 不能替代 version control
- 一旦实验路径胜出，必须把最终选择写回 repo state

## 5. Sensitive Context

共享 durable state 不能演变成 secret dump。

规则：

- 只有当仓库明确要求且存储路径已批准时，才在共享 artifact 中存放 secret。
- 否则只保存脱敏占位符、稳定别名或仅供操作员查看的引用。
- 工具 adapter 可以支持 private tag、本地笔记或排除式 memory scope。可移植方法的要求更简单：不可留存输入不能进入共享 durable state。

## 6. Adapter Guidance

工具 adapter 应协助协议，而不是取代协议。

### Skills 和 Guides

使用渐进式披露：

```text
metadata -> focused instructions -> referenced resources/scripts
```

如果短入口 guide 加深层链接已经够用，就不要把大段手册一次性前置进 context。

### Hooks 和 Context Injection

Hooks 可以预加载、校验或总结上下文，但应该：

- 只注入相关且有边界的材料
- 优先注入 summary，而不是原始 transcript
- 去重重复历史
- 不要因为辅助 helper 暂时不可用就阻断主要编码工作

### Failure Semantics

Memory 或 context helper 的失败通常应优雅降级。

只有当失败意味着以下情况时，才应阻断流程：

- 合同或安全规则无法执行
- 已知会注入错误或误导性上下文
- 必需的审计链路会丢失

## 7. Task Packet 用法

对于长任务、高上下文任务、跨 session 任务或涉及敏感信息的任务，建议在 task packet 中增加一个简短的 `Context Strategy` section：

```md
## Context Strategy

- Entry Sources: `AGENTS.md`, `CLAUDE.md`, current task packet, latest review summary
- Retrieval Order: `entry -> summary -> raw`
- Retrieval Helpers: `none | codegraph | graph report | wiki hot cache`
- Promotion Target: `none | repo wiki | decision log | guide update`
- Sensitive Context: `none | redact tokens and keep secrets out of .harness artifacts`
```

这个 section 不替代 linkage 或 evidence。它只是让加载顺序和隐私边界在开工前就显式化。
