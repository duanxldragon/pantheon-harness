---
title: CI/CD Integration Guide
doc_type: Method
layer: method
status: Active
updated_at: 2026-06-26
version: v1.0.0
---

# CI/CD Integration Guide

本文档定义 Pantheon 项目的 CI/CD 集成标准和本地预检流程。

## 1. CI/CD 门禁矩阵

### 1.1 按任务档位配置

| 门禁 | L0 | L1 | L2 | 超时 | 失败处理 |
|------|----|----|----|-----|---------|
| Go 测试 | - | 修改的包 | 全部包 | 5min | 阻塞 PR |
| TypeScript 检查 | - | 涉及文件 | 全局 | 3min | 阻塞 PR |
| Lint | - | 涉及文件 | 全局 | 2min | 警告可过 |
| Frontend Build | - | 涉及模块 | 全栈 | 10min | 阻塞 PR |
| SonarQube | - | 新增问题 | 全部 | 15min | 按规则处理 |
| Smoke 测试 | - | 关键路径 | 完整套件 | 20min | 阻塞合并 |
| UI 检查 | - | - | 必须 | 10min/screen | 阻塞 |
| 安全审计 | - | - | 必须 | 30min | 阻塞 |

### 1.2 门禁触发条件

| 门禁 | 触发条件 | 执行者 | 通过标准 |
|------|---------|--------|---------|
| Go 测试 | 任何 Go 改动 | CI 自动 | 全部通过 |
| TypeScript 类型检查 | 任何前端改动 | CI 自动 | `tsc -b` 干净 |
| Lint | 任何前端改动 | CI 自动 | 0 error |
| Frontend Build | 任何前端改动 | CI 自动 | 构建成功 |
| SonarQube | PR 级别 | SonarCloud | 0 新增问题 |
| Smoke 测试 | 系统模块改动 | CI 自动 | >= 95% 通过率 |
| UI 视觉 | 任何 UI 改动 | CI + impeccable | 渲染证据通过 |
| 安全审计 | 认证/权限/中间件改动 | Security sensor | 无高危/严重 |

## 2. CI/CD Pipeline 流程

### 2.1 标准 Pipeline 流程

```
Push/PR
  │
  ├─ Lint & Format Check
  │   └─ Fail → Block → Fix lint errors
  │
  ├─ Type Check (前端)
  │   └─ Fail → Block → Fix type errors
  │
  ├─ Unit Tests
  │   ├─ Backend: go test
  │   └─ Frontend: vitest
  │   └─ Fail → Block → Fix tests
  │
  ├─ SonarQube Scan
  │   ├─ 新增问题 → 按规则处理
  │   └─ 无新增 → Pass
  │
  ├─ Build
  │   ├─ Backend: go build
  │   └─ Frontend: vite build
  │   └─ Fail → Block → Fix build errors
  │
  └─ Smoke Tests (可选)
      └─ >= 95% → Pass
```

### 2.2 门禁执行规则

```
通过 = 所有必需门禁已执行且结果满足标准
阻塞 = 任一必需门禁未通过或未执行
警告 = 非必需门禁未通过，记录但不阻塞
```

## 3. 本地预检命令

### 3.1 Go Backend

```bash
# 进入 backend 目录
cd pantheon-base/backend

# 运行所有测试
go test ./...

# 运行指定包测试
go test ./modules/...

# 带覆盖率
go test -cover ./...

# 带 race 检测
go test -race ./...
```

### 3.2 Frontend

```bash
# 进入 frontend 目录
cd pantheon-base/frontend

# 类型检查
npm run type-check

# Lint
npm run lint

# Format check
npm run format:check

# Build
npm run build

# 全套检查
npm run ci-check
```

### 3.3 SonarQube

```bash
# 本地 SonarQube 扫描
sonar-scanner

# 或使用 Docker
docker run --rm -v "$(pwd):/usr/src" sonarsource/sonar-scanner-cli
```

### 3.4 Smoke Tests

```bash
# 运行 smoke 测试套件
npm run smoke

# 或指定模块
npm run smoke:api
npm run smoke:auth
```

### 3.5 快速本地 CI

```bash
# 在项目根目录运行
cd pantheon-base

# Backend 检查
cd backend && go test ./... && cd ..

# Frontend 检查
cd frontend && npm run type-check && npm run lint && cd ..

# 全部通过后提交
```

## 4. GitHub Actions 集成

### 4.1 建议的 Workflow 文件

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.21'
      - name: Run tests
        run: go test -race ./...
      - name: SonarQube
        uses: sonarsource/sonarqube-scan-action@master

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install
        run: npm ci
      - name: Type check
        run: npm run type-check
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
```

## 5. SonarQube 规则

### 5.1 问题分类与处理

| 分类 | 判定标准 | 处理方式 |
|------|---------|---------|
| 假阳性 | 有防护代码、业务合理 | 记录原因 → 加排除规则 |
| 低风险 | Code Smell 不影响功能 | 记录 → 低优先级队列 |
| 必须修 | Bug/Vulnerability | Generator 立即修复 |

### 5.2 SonarQube 修复流程

```
CI SonarQube 扫描
  │
  ├─ 0 新增问题 → 通过
  │
  └─ 有新增问题
      │
      ├─ 审查报告
      │   ├─ 假阳性 → 更新排除规则
      │   ├─ 低风险 → 记录到队列
      │   └─ 必须修 → Generator 修复
      │
      └─ 修复后重新扫描 → 循环直到 0 新增
```

## 6. 失败处理

### 6.1 CI 失败响应

| 阶段 | 失败处理 |
|------|---------|
| Lint 失败 | 阻塞 PR，修复后重试 |
| Type Check 失败 | 阻塞 PR，修复后重试 |
| 测试失败 | 阻塞 PR，修复后重试 |
| Build 失败 | 阻塞 PR，修复后重试 |
| SonarQube 失败 | 按规则处理（见 5.1） |
| Smoke 失败 | 阻塞合并，分析原因 |

### 6.2 本地快速验证

在提交前运行：

```bash
# 快速验证清单
1. go test ./...          # Go 测试
2. npm run type-check     # TS 类型
3. npm run lint           # Lint
4. npm run build          # 构建
5. sonar-scanner          # SonarQube (可选)
```

## 7. 相关文档

- [Harness Methodology](./harness-methodology.zh.md)
- [Verification Evidence Spec](../harness/verification-evidence-spec.md)
- [Workflow Templates](./workflow-templates.md)
