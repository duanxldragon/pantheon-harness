---
title: Branch and Pull Request Workflow
doc_type: Method
layer: method
status: Active
updated_at: 2026-06-26
version: v1.0.0
---

# Branch and Pull Request Workflow

本文档定义 Pantheon 方法论中的分支策略和 Pull Request 流程。与具体业务代码无关，适用于所有遵循 Pantheon Harness 的仓库。

## 1. 分支命名规范

### 1.1 分支层级

| 层级 | 用途 | 命名格式 | 示例 |
|------|------|---------|------|
| main | 稳定可发布分支 | `main` | `main` |
| develop | 开发集成分支 | `develop` | `develop` |
| feature | 功能开发分支 | `feat/<scope>/<short-desc>` | `feat/iam/user-permission` |
| fix | 缺陷修复分支 | `fix/<scope>/<short-desc>` | `fix/auth/session-timeout` |
| refactor | 重构分支 | `refactor/<scope>/<short-desc>` | `refactor/api/response-format` |
| docs | 文档更新分支 | `docs/<short-desc>` | `docs/update-api-contract` |
| chore | 维护任务分支 | `chore/<short-desc>` | `chore/update-deps` |

### 1.2 命名规则

```
<type>/<optional-scope>/<short-description>

规则：
- <type>：小写英文
- <scope>：可选，用于标识影响范围，使用英文简短名称
- <short-desc>：使用英文短横线分隔，20 字符以内
- 禁止使用中文、空格、特殊符号（除 `-` 和 `_`）
```

### 1.3 命名示例

```
# 功能开发
feat/auth/mfa-support
feat/api/user-management
feat/ui/dashboard-redesign

# 缺陷修复
fix/payment/decimal-round
fix/search/null-pointer

# 重构
refactor/orm/query-builder
refactor/auth/token-service

# 文档
docs/api-authentication
docs/workflow-guide
```

### 1.4 命名错误示例

```
# 错误 - 使用中文
feat/用户管理/新功能

# 错误 - 包含空格
feat auth mfa

# 错误 - 特殊符号
feat/auth@mfa

# 错误 - 描述过长
feat/auth/implement-multi-factor-authentication-with-totp-support
```

## 2. Pull Request 创建流程

### 2.1 PR 创建前置条件

```
□ 代码已完成本地开发
□ 本地测试通过
□ 分支已同步最新目标分支（rebase/merge）
□ 代码符合 lint/format 规范
□ 提交信息符合规范（见 2.2）
```

### 2.2 提交信息规范

采用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型列表**：

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(auth): add MFA support` |
| `fix` | 缺陷修复 | `fix(api): handle null response` |
| `docs` | 文档更新 | `docs: update API guide` |
| `style` | 格式调整（不影响功能） | `style: format code` |
| `refactor` | 重构（非功能变更） | `refactor: simplify logic` |
| `perf` | 性能优化 | `perf: cache query results` |
| `test` | 测试相关 | `test: add unit tests` |
| `chore` | 构建/工具变更 | `chore: update dependencies` |
| `ci` | CI 配置变更 | `ci: add sonar check` |

**示例**：

```
feat(auth): add multi-factor authentication support

Implemented TOTP-based MFA with backup codes.
- Added MFA setup endpoint
- Added MFA verification middleware
- Added backup code generation

Closes #123
```

### 2.3 PR 创建步骤

```
1. 切换到目标分支并更新
   git checkout <base-branch>
   git pull origin <base-branch>

2. 从最新目标分支创建功能分支
   git checkout -b <branch-name>

3. 进行开发并提交
   git add .
   git commit -m "<conventional-commit-message>"

4. 推送分支到远程
   git push -u origin <branch-name>

5. 在平台创建 PR
   - 选择正确的目标分支
   - 填写 PR 描述（见 3.1 模板）
   - 关联相关 Issue（如果有）

6. 等待 CI 检查和 Review
```

### 2.4 PR 审查流程

```
PR 创建
  │
  ├─ CI 检查（自动）
  │   ├─ 通过 → 进入 Review
  │   └─ 失败 → 修复后重跑
  │
  ├─ Code Review（人工）
  │   ├─ 通过 → 等待合并
  │   └─ 需要修改 → 提交修复
  │
  └─ 最终合并
      ├─ Squash and Merge（推荐）
      ├─ Merge Commit（需要保留历史）
      └─ Rebase and Merge（线性历史）
```

### 2.5 Review 响应规则

| Review 状态 | 响应要求 |
|-------------|---------|
| Approve | 可直接合并 |
| Request Changes | 必须处理所有问题后重新 Review |
| Comment | 建议性意见，可选择性处理 |

## 3. Pull Request 模板

### 3.1 PR 描述模板

```markdown
## Summary

<!-- 简要说明本次变更的内容和目的，2-3 句话 -->

## Changes

<!-- 列出具体变更内容 -->

- [ ] <!-- 变更点 1 -->
- [ ] <!-- 变更点 2 -->

## Type of Change

<!-- 选择变更类型 -->

- [ ] Feature (新功能)
- [ ] Bug Fix (缺陷修复)
- [ ] Refactor (重构)
- [ ] Documentation (文档)
- [ ] CI/CD
- [ ] Other

## Verification

<!-- 说明如何验证本次变更 -->

- [ ] 本地测试通过
- [ ] CI 检查通过
- [ ] 手动验证步骤（如有）

## Related Issues

<!-- 关联的 Issue 或任务 -->

- Closes #
- Related to #

## Checklist

- [ ] 代码符合项目的编码规范
- [ ] 有必要的单元测试
- [ ] 文档已更新（如需要）
- [ ] 变更不会引入新的安全风险
```

### 3.2 PR Size 指南

| Size | 文件数 | 说明 |
|------|--------|------|
| XS | 1-5 | 微小变更，单一目的 |
| S | 6-15 | 小变更，单一功能点 |
| M | 16-30 | 中等变更，完整功能 |
| L | 31-50 | 大变更，建议拆分 |
| XL | 50+ | 建议拆分成多个 PR |

**建议**：优先创建小而专注的 PR，便于 Review 和回滚。

## 4. 分支同步策略

### 4.1 单仓库分支同步

```
feature/xxx → develop → main

同步时机：
- 每日同步：develop 分支每日从 main rebase
- 发布前同步：发布前确保 feature 分支同步最新 develop
```

### 4.2 多仓库分支同步（如适用）

```
<platform-repo>/main ──────────────────► <service-repo>/main ──────────────────► <product-repo>/main
        │                                        │                                        │
        │◄─── backfill (方法论)                 │◄─── backfill (方法论)
        │                                        │
        └─── forwardport (差异同步) ──────────────►
```

**原则**：
- 上游仓库变更优先同步到下游依赖仓库
- 使用自动化脚本确保一致性
- 同步后需要重新验证

> **命名约定**：`<platform-repo>`、`<service-repo>`、`<product-repo>` 为占位符，实际仓库名称由项目定义。

## 5. 常见问题处理

### 5.1 冲突处理

```
1. 确保本地分支已提交
2. 切换到目标分支并更新
   git checkout develop
   git pull origin develop

3. 合并功能分支（不推荐）
   git merge feature/xxx
   # 解决冲突

4. 变基到目标分支（推荐）
   git checkout feature/xxx
   git rebase develop
   # 解决冲突

5. 强制推送（如使用 rebase）
   git push --force-with-lease
```

### 5.2 PR 取消

```
1. 确保没有需要保留的代码
2. 关闭 PR（不删除分支）
   # 在平台操作

3. 或删除分支
   git push origin --delete <branch-name>
   git branch -d <branch-name>
```

### 5.3 回滚

```
# 回滚最近一次提交
git revert HEAD

# 回滚特定提交
git revert <commit-hash>

# 创建回滚 PR
git checkout main
git revert <commit-hash>
git push origin main
```

## 6. 相关文档

- [CI/CD Integration Guide](./ci-cd-integration.md)
- [Workflow Templates](./workflow-templates.md)
- [Harness Methodology](./harness-methodology.zh.md)
- [Verification Evidence Spec](../harness/verification-evidence-spec.md)
