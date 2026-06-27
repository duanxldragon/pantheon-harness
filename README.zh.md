# Pantheon Harness

> Agentic 开发方法论与工具集

[English](./README.md) | 中文

可移植、与工具无关的 Harness Engineering，适用于使用 coding agents 和人工审查的复杂软件交付。

## 概述

Pantheon Harness 为可重复的 agentic 交付提供方法论层：

- **显式契约** — 任务包、交接协议、验证证据
- **作用域边界** — 跨 Codex、Claude Code、Cursor 的工具无关模式
- **持久闭合** — 超出聊天会话生命周期的产物
- **可移植采用** — 将方法复制到任何仓库

## 使用方式

### 方式一：独立使用（复制到任意仓库）

将 `pantheon-harness/` 复制到目标仓库根目录。方法论独立于工作区运行。

```
my-project/
├── pantheon-harness/     # 复制的方法论目录
├── docs/
│   └── harness/
│       └── tasks/         # Task Packet 存放位置
├── .harness/
│   └── evidence/          # 验证证据存放位置
├── .github/
│   └── pull_request_template.md
└── openspec/
    └── changes/
```

快速验证：
```bash
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root . --strict
```

### 方式二：工作区模式（多仓库推荐）

将 `pantheon-harness/` 作为兄弟目录放在工作区根目录。消费者仓库通过 `../pantheon-harness/` 引用它。

```
workspace-root/
├── pantheon-harness/     # 方法论本体（只读规范源）
└── my-consumer-repo/     # 消费者仓库
    ├── VERSION           # 必须与 pantheon-harness VERSION 匹配
    ├── docs/harness/    # 本地 harness 合同
    └── scripts/harness/  # 本地验证脚本
```

验证命令：
```bash
cd my-consumer-repo
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --strict
```

## 目录结构

```
pantheon-harness/
├── architecture/              # 方法论源（消费者必需）
│   ├── harness/            # 核心合同与规范
│   └── methodology/       # 工作流指导
├── patterns/               # 模板与安装
├── verify/                 # Schema 验证（可选）
│
├── skills/                # 内部：工具特定技能
├── workflows/             # 内部：工作流模式
├── tools/                 # 内部：openspec 工具
├── .agents/              # 内部：Agent 适配器
├── config/               # 内部：Agent 配置
├── examples/             # 内部：参考实现
├── evaluations/          # 内部：评估材料
├── research/             # 内部：研究成果
└── memory/              # 内部：项目记忆

消费者必需：
- architecture/harness/*.md           # 协议、合同、规范
- architecture/methodology/*.md         # 工作流路由、交付层级
- patterns/*.md                       # 核心模式与模板
- patterns/install.md                   # 引导指南

内部目录（消费者不需要）：
- skills/, workflows/, tools/, .agents/, config/, examples/
```

## 快速开始

1. **方法入口**: [architecture/methodology/harness-methodology.zh.md](./architecture/methodology/harness-methodology.zh.md)
2. **工作流路由**: [architecture/methodology/workflow-routing.md](./architecture/methodology/workflow-routing.md)
3. **Harness 协议**: [architecture/harness/](./architecture/harness/)
4. **引导指南**: [patterns/install.md](./patterns/install.md)

## 核心文档

| 文档 | 用途 |
|------|------|
| `HARNESS_CORE_MODEL` | Agentic 交付核心模型 |
| `HARNESS_METHOD_PLAYBOOK` | 实践执行指南 |
| `TASK_PACKET_SPEC` | Task Packet 规范 |
| `VERIFICATION_EVIDENCE_SPEC` | 证据格式规范 |
| `WORKFLOW_ROUTING` | 工具路由决策树 |
| `SOLO_DELIVERY_TIERS` | L0/L1/L2 交付层级 |

## 前置依赖

| 必需 | 可选 |
|------|------|
| `git` | OpenSpec 工作流/CLI |
| `node` 20+ | 浏览器测试（UI evidence） |

**不需要：**
- 预装的 repo skills
- Codex-only 或 Claude-only 插件
- 特定的 MCP server

## 版本管理

| 文件 | 位置 | 用途 |
|------|------|------|
| `VERSION` | 根目录 | 当前版本（如 `1.3.0`） |
| `CHANGELOG.md` | 根目录 | 完整版本历史 |
| `patterns/upgrade.md` | patterns/ | 升级指南 |

## CI 集成

在 PR 中运行（非平凡变更）：

```bash
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root .
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

如果涉及 UI，还需要浏览器或截图证据。

## 当前状态

当前版本：`1.3.0`

## 验证

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

## 规范来源

- `architecture/` — 架构和方法论文档（消费者必需）
- `patterns/` — 方法真理来源（消费者必需）
- `skills/` — 工具特定技能和适配器（仅内部使用）
