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

## 目录结构

```
pantheon-harness/
├── architecture/          # 架构与方法论文档
│   ├── harness/          # Harness 协议
│   └── methodology/      # 方法论文档
├── config/agents/        # Agent 配置
├── patterns/             # 核心方法模式与模板
├── skills/               # Codex/Cursor skills
├── workflows/            # 动态工作流模式
├── verify/               # 验证模式与脚本
├── tools/                # 工具 (openspec 等)
└── examples/             # 参考实现
```

## 核心概念

| 概念 | 描述 |
|------|------|
| **Task Packet** | 具有清晰边界的作用域工作单元 |
| **Handoff Protocol** | Agent 之间的显式交接 |
| **Verification Evidence** | 完成的证明 |
| **Dynamic Workflows** | 自适应执行模式 |

## 快速开始

1. **入口文档**: [architecture/methodology/HARNESS_METHODOLOGY.zh.md](./architecture/methodology/HARNESS_METHODOLOGY.zh.md)
2. **工作流路由**: [architecture/methodology/WORKFLOW_ROUTING.md](./architecture/methodology/WORKFLOW_ROUTING.md)
3. **Harness 协议**: [architecture/harness/](./architecture/harness/)

## 方法核心文档

| 文档 | 用途 |
|------|------|
| `HARNESS_CORE_MODEL` | Agentic 交付核心模型 |
| `METHOD_PLAYBOOK` | 实践执行指南 |
| `CONTEXT_ENGINEERING_PROTOCOL` | 上下文管理 |
| `EXECUTION_GUARDRAILS` | 安全约束 |
| `MINIMAL_COMPLEXITY_LADDER` | 采用路径 |

## 状态

当前版本: `1.0.0`

## 验证

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

## 规范来源

- `patterns/` — 方法真理来源
- `architecture/` — 架构和方法论文档
- `skills/` — 工具特定技能和适配器
