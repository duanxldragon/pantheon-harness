# 安装 Pantheon Harness

English version: [install.md](./install.md)

本工具包支持两种使用方式：
1. **独立模式**：复制到任意仓库根目录
2. **工作区模式**：作为兄弟目录放在工作区根目录

## 0. 前置要求

必需：

- `git`
- `node` 20+

推荐：

- 如果你希望显式管理 change 生命周期，准备一套 OpenSpec 工作流或 CLI
- 如果你要做 UI evidence，准备一条浏览器测试路径

不要求：

- 预装仓库本地 skills
- 只支持 Codex 或只支持 Claude 的插件
- 某个特定 MCP server

## 版本文件

本工具包会在以下文件中发布自己的版本信息：

- `VERSION` — 当前版本（如 `1.3.0`）
- `CHANGELOG.md` — 完整版本历史
- `patterns/upgrade.md` — 升级指南

## 两种使用方式

### 方式一：独立使用（复制到任意仓库）

```
复制：
  pantheon-harness/

到目标仓库根目录。
```

示例：
```
my-project/
├── pantheon-harness/     # 复制的方法论
├── docs/harness/tasks/   # Task Packets
├── .harness/evidence/     # 验证证据
├── .github/               # PR 模板
└── openspec/changes/     # OpenSpec changes
```

### 方式二：工作区模式（多仓库推荐）

将 `pantheon-harness/` 作为兄弟目录放在工作区根目录：

```
workspace-root/
├── pantheon-harness/     # 方法论本体（只读规范源）
└── my-consumer-repo/     # 消费者仓库
    ├── VERSION           # 必须与 pantheon-harness 匹配
    ├── docs/harness/    # 本地 harness 合同
    └── scripts/harness/ # 本地验证脚本
```

在工作区模式下，本地验证脚本应通过 `../pantheon-harness/` 引用方法论源。

## 标准路径

默认配置期望这些位置存在：

- `docs/harness/tasks/` — Task Packets
- `.harness/evidence/` — 验证证据
- `.github/pull_request_template.md` — PR 模板
- `openspec/changes/` — OpenSpec changes

## 接入模板

把这些模板作为仓库级源材料使用：

- `patterns/templates/task-packet.template.md`
- `patterns/templates/review.template.md`
- `patterns/templates/pr-template.md`

Task packet 必须声明方法优先的 ratchet 元数据：

- `Quality Profile`
- `Portable Failure Class`
- `Owner Layer`
- `Method Readiness`
- `Ratchet Decision`
- `Deferred Code Issues`

字段不适用时显式写 `none`，不要省略字段。

## 接入检查脚本

### 独立模式

```text
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root . --strict
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

### 工作区模式

```text
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --root . --strict
```

严格 evidence 和 review 检查要求至少存在一个真实的 `commands.json` 和 `review.md` 工件。新仓库初始化时可先使用 report-only 模式；记录第一个非平凡任务后再切到 `--strict`。

## 日常怎么运行

### 非平凡工作流：

1. 创建一个 OpenSpec change
2. 创建 `docs/harness/tasks/<task-id>.task.md`
3. 在开始实现前声明 method readiness block
4. 如果任务带有 `## Structural Scope`，先生成图审查闭环骨架：
   `node scripts/harness/scaffold-graph-review.mjs --write <task-id>`
5. 如果你保存了 CodeGraph 风格的审查输出，先整理再导入：
   `node scripts/harness/build-graph-review-import.mjs --source trace.json --write .harness/evidence/<task-id>/graph-review.json`
   `node scripts/harness/scaffold-graph-review.mjs --write --import .harness/evidence/<task-id>/graph-review.json <task-id>`
6. 实现
7. 保存 `.harness/evidence/<task-id>/commands.json`
8. 保存 `.harness/evidence/<task-id>/review.md`
9. 运行检查

### 平凡工作流：

1. 直接实现
2. 运行最低限度 verification
3. 按仓库策略记录 evidence 或 known gaps

## 推荐的仓库级 wrapper

如果目标仓库已经有本地 harness 脚本，建议让它们作为这个方法包的薄封装。

推荐 wrapper 名称：

- `check-task-packet`
- `check-evidence`
- `check-review`
- `check-adoption`
- `check-method-health`

## CI 建议

对于非平凡变更，建议在 pull request 上运行全部四项检查。

如果触碰 UI，还应通过你常规的 QA 流程要求浏览器或截图 evidence。

### 独立模式 PR 门禁：

```text
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root .
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

### 工作区模式 PR 门禁：

```text
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --root .
```

产品特定质量门禁保留在消费仓库。只有重复出现且可移植的失败模式，才上移回这个方法包。

## Skill 安装建议

方法要正常工作，不需要安装特殊 skill 包。

如果你的 agent 平台支持 skills，推荐分工是：

- skills 用于工作流辅助
- 仓库契约与脚本作为可强制执行的事实源

推荐但可选的能力：

- planning / brainstorming
- disciplined execution
- UI quality review
- browser QA
