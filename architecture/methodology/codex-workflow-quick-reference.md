# Codex 工作流速查

> 目标：把复杂任务拆成可执行的最小流程。完整路由契约见 [Pantheon Workflow Routing](./workflow-routing.md)。本页只保留常用判断和命令。

## 路由入口

完整判断只维护在 [Pantheon Workflow Routing](./workflow-routing.md)。本页不再重复决策树，避免多个文件给出不同路由。

Windows 上优先用工作区 launcher：`node scripts/codex-workflow.mjs ...` 或 `scripts/codex-workflow.ps1 ...`。这个 launcher 会把 `codex-flow` 自带的 `codex.exe` 目录放到 PATH 前面，并默认把 `run` / `smoke` 路由到 `codex-exec`。

## 常用命令

```bash
node scripts/codex-workflow.mjs doctor
node scripts/codex-workflow.mjs run .codex-flow/generated/<slug>.workflow.ts
node scripts/codex-workflow.mjs smoke
```

### Pantheon 模板

```bash
$env:PANTHEON_WORKFLOW_TASK="route a cross-repo UI change"
$env:PANTHEON_TARGET_REPO="pantheon-base"
node scripts/codex-workflow.mjs run .codex-flow/generated/pantheon-workspace-routing.workflow.ts --backend fake
```

可选环境变量：

- `PANTHEON_WORKFLOW_TASK`：给 workflow 一个简短任务说明
- `PANTHEON_TARGET_REPO`：给 workflow 一个目标仓库提示

## Proto First 快速命令

```bash
# 启动 Proto First 工作流
node scripts/codex-workflow.mjs run .codex-flow/generated/proto-first.workflow.ts
```

Proto First 用于探索性开发、方案验证。参考 [Proto First Development](./proto-driven-development.md)。

## CI/CD 本地预检

```bash
# Go Backend
cd pantheon-base/backend && go test ./...

# Frontend
cd pantheon-base/frontend && npm run type-check && npm run lint && npm run build

# SonarQube
sonar-scanner
```

参考 [CI/CD Integration](./ci-cd-integration.md)。

## 最小任务包

```text
目标仓库：
层级：
任务模式：review / implement / ui / inheritance-sync / smoke / docs
先读：
实现范围：
同步要求：仅本仓 / base -> ops / 暂不同步
验证方式：
停点：
```

## 失败时回退

- `codex-flow doctor` 失败：按 [Pantheon Workflow Routing](./workflow-routing.md) 的 fallback 规则回到直接 Codex / task packet。
- 如果 raw `codex-flow` 在 Windows 上报 `spawn ENOENT` 或 `codex` 解析失败，先用 `node scripts/codex-workflow.mjs ...`。
- 没有明确目标仓库：先读 `CLAUDE.md` 和目标仓库的 `AGENTS.md`。
- 需要验证但没有现成流程：优先用最小相关测试、烟雾或截图，而不是先建新工具。

## 参考入口

- [Workspace routing rules](../../AGENTS.md)
- [Pantheon Workflow Routing](./workflow-routing.md)
- [Codex development process card](./codex-development-process-improvement.md)
- [Workspace routing rules](../../AGENTS.md)
