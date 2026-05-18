# Pantheon Drift Audit

## 2026-05-14 UI Harness Sync Snapshot

来源：

```text
node scripts/harness/triage-base-drift.mjs --business pantheon-ops --json
```

分类计数：

```text
pseudo-drift: 67
business mount: 1
generic drift: 75
business-specific drift: 34
noise: 37
base-only: 91
business-only: 64
```

本次执行结论：

- 已将 platform/system 后台 UI 基线同步到 `pantheon-base` 与 `pantheon-ops`：keyboard focus、reduced motion、stable control sizing、shell visual contract。
- 已将 shell 动态 route title 解析能力从 `pantheon-base` 同步到 `pantheon-ops`，用于避免系统设置子页面打开多个同名页签。
- 本次只同步 base-owned 的共享 UI 合同文件；未对 75 个 `generic drift` 和 34 个 `business-specific drift` 做全量覆盖。
- `frontend/src/index.css` 仍属于 `generic drift`，原因是两仓历史 UI 差异较大；本次同步只保证新增基线在两边一致。
- `business-only` 与 `business-specific drift` 保持业务仓库所有权，需要后续人工按 PR 分批判断是否回流 base 或保留为业务扩展。

---

## 2026-05-13 Harness Script Snapshot

来源：

```text
node scripts/harness/triage-base-drift.mjs --json
```

分类计数：

```text
pseudo-drift: 66
business mount: 1
generic drift: 74
business-specific drift: 33
noise: 33
base-only: 91
business-only: 63
```

说明：

- 这是 `scripts/harness/triage-base-drift.mjs` 的工具无关输出快照。
- runtime/build 目录已从扫描入口排除：`.git`、`.gocache`、`.tmp*`、`tmp`、`uploads`、`node_modules`、`dist`、`build`、`vendor`、`test-results`。
- 旧审计内容保留在下方，作为人工分类历史；后续 drift 决策应优先使用脚本 JSON artifact 和本节快照。

---

**Audit date**: 2026-05-11
**Scope**: `pantheon-base` ↔ `pantheon-ops` full file diff
**Decision status**: plan固化完毕，等待下次会话执行

---

## 1. TL;DR

ops 与 base 的 **98 个后端 differing 文件**中：

- **89 个（91%）是假漂移**——只是 Go module name 不同（`pantheon-platform` vs `pantheon-ops`），代码逻辑完全一致
- **6 个真实漂移**集中在 IAM/permission/menu 子系统，全部是**通用 IAM 能力增强**，应该回流到 base
- **2 个业务挂载点**（`business.go`、`retired_modules.go`）合法保留在 ops
- **2 个 4 行小漂移**（`platform/health.go`、`dynamic_module_service_test.go`）属于服务名与测试 fixture，暂不处理

前端 25 个 differing 文件中：
- 16 个是 4 行级小漂移，多为换行符
- 4 个是 base 与 ops 共有路由/i18n 挂载点
- 5 个是手写品牌或登录页（`Login.tsx`、手写 i18n）

**结论**：当前没有任何文件需要长期作为 override 存在。通过 (1) 通用增强回流 base + (2) 在 base 暴露 2 个扩展 API，可以彻底消除漂移。

---

## 2. Methodology

### 2.1 后端归一化算法

对每个 differing 文件，把 `pantheon-platform/backend` 与 `pantheon-ops/backend` 都替换为统一占位符再 diff，得到「真实差异行数」：

```bash
for f in $(diff -rq pantheon-base/backend pantheon-ops/backend \
           | grep "^Files" | awk '{print $2}' | sed 's|pantheon-base/||'); do
  base="pantheon-base/$f"
  ops="pantheon-ops/$f"
  if [ -f "$base" ] && [ -f "$ops" ]; then
    real_diff=$(diff \
      <(sed 's|pantheon-platform/backend|MODNAME|g' "$base") \
      <(sed 's|pantheon-ops/backend|MODNAME|g' "$ops") \
      | wc -l)
    echo "$real_diff	$f"
  fi
done | sort -n
```

真实差异 = 0 → 「假漂移」（Category A）
真实差异 > 0 → 「真实漂移」，需逐文件人工判断

### 2.2 前端归一化算法

前端无 Go module name 问题，直接 diff 即可。但 `i18n/resources/generated/*` 是 generator 自动产物，应**排除在 drift 分析外**。

---

## 3. 后端分类详表

### Category A · 假漂移（89 文件，零真实差异）

机械删除即可，由 `go.work + replace` 接管。完整文件清单：

```
backend/internal/middleware/casbin_middleware.go
backend/internal/middleware/csrf_middleware.go
backend/internal/middleware/data_scope_middleware.go
backend/internal/middleware/data_scope_middleware_test.go
backend/internal/middleware/jwt_middleware.go
backend/internal/middleware/operation_log_middleware.go
backend/internal/middleware/operation_log_middleware_test.go
backend/internal/middleware/request_context_middleware.go
backend/internal/middleware/secure_action_middleware.go
backend/internal/middleware/secure_action_middleware_test.go
backend/internal/scaffold/engine.go
backend/internal/scaffold/workspace.go
backend/modules/auth/auth_dto.go
backend/modules/auth/auth_handler.go
backend/modules/auth/auth_service.go
backend/modules/auth/auth_service_test.go
backend/modules/auth/mfa_crypto.go
backend/modules/auth/module.go
backend/modules/auth/module_test.go
backend/modules/auth/preferences_contract_test.go
backend/modules/auth/smoke_test.go
backend/modules/business/retired_modules_test.go
backend/modules/dashboard/dashboard_handler.go
backend/modules/dashboard/dashboard_service.go
backend/modules/dashboard/dashboard_service_test.go
backend/modules/dashboard/module.go
backend/modules/platform/health_test.go
backend/modules/system/audit/audit_benchmark_test.go
backend/modules/system/audit/audit_cleanup_test.go
backend/modules/system/audit/audit_export_test.go
backend/modules/system/audit/audit_filters.go
backend/modules/system/audit/audit_filters_test.go
backend/modules/system/audit/audit_handler.go
backend/modules/system/audit/audit_migrate_test.go
backend/modules/system/audit/audit_service.go
backend/modules/system/config/dict/dict_dto.go
backend/modules/system/config/dict/dict_handler.go
backend/modules/system/config/dict/dict_model.go
backend/modules/system/config/dict/dict_service.go
backend/modules/system/config/dict/dict_service_test.go
backend/modules/system/config/setting/setting_audit_model.go
backend/modules/system/config/setting/setting_crypto.go
backend/modules/system/config/setting/setting_dto.go
backend/modules/system/config/setting/setting_handler.go
backend/modules/system/config/setting/setting_model.go
backend/modules/system/config/setting/setting_service.go
backend/modules/system/config/setting/setting_service_test.go
backend/modules/system/dynamicmodule/dynamic_module_handler.go
backend/modules/system/dynamicmodule/dynamic_module_lifecycle.go
backend/modules/system/dynamicmodule/dynamic_module_registry.go
backend/modules/system/dynamicmodule/dynamic_module_service.go
backend/modules/system/dynamicmodule/dynamic_module_summary.go
backend/modules/system/dynamicmodule/dynamic_module_sync.go
backend/modules/system/dynamicmodule/module.go
backend/modules/system/generator/generator_crypto.go
backend/modules/system/generator/generator_handler.go
backend/modules/system/generator/module.go
backend/modules/system/i18n/i18n_handler.go
backend/modules/system/i18n/i18n_service.go
backend/modules/system/i18n/i18n_service_test.go
backend/modules/system/iam/menu/menu_dto.go
backend/modules/system/iam/menu/menu_handler.go
backend/modules/system/iam/menu/menu_model.go
backend/modules/system/iam/menu/menu_service.go
backend/modules/system/iam/menu/menu_service_test.go
backend/modules/system/iam/permission/permission_data_scope.go
backend/modules/system/iam/permission/permission_handler.go
backend/modules/system/iam/role/role_dto.go
backend/modules/system/iam/role/role_handler.go
backend/modules/system/iam/role/role_menu_model.go
backend/modules/system/iam/role/role_model.go
backend/modules/system/iam/role/role_permission_model.go
backend/modules/system/iam/user/user_handler.go
backend/modules/system/iam/user/user_preferences.go
backend/modules/system/iam/user/user_role_model.go
backend/modules/system/iam/user/user_service.go
backend/modules/system/iam/user/user_service_test.go
backend/modules/system/org/dept/dept_dto.go
backend/modules/system/org/dept/dept_handler.go
backend/modules/system/org/dept/dept_model.go
backend/modules/system/org/dept/dept_service.go
backend/modules/system/org/dept/dept_service_test.go
backend/modules/system/org/post/post_dto.go
backend/modules/system/org/post/post_handler.go
backend/modules/system/org/post/post_model.go
backend/modules/system/org/post/post_service.go
backend/modules/system/org/post/post_service_test.go
backend/modules/system/refresh_sync.go
backend/modules/system/seed_test.go
backend/modules/system/system.go
backend/pkg/common/location.go
backend/pkg/contracts/module_test.go
backend/pkg/database/redis.go
backend/pkg/database/scope.go
backend/pkg/database/scope_test.go
backend/cmd/server/main.go
```

注意 `cmd/server/main.go` 在「假漂移」清单里，但**不能直接删**——它需要重写：保留 ops 模块名的入口，加业务初始化调用（见 §5.3）。

### Category B · 业务挂载（保留在 ops）

| 文件 | 性质 | 操作 |
|---|---|---|
| `backend/modules/business/business.go` | 注册 ops 的 cmdb / deploy 模块，base 此文件保持空白 | **不动** |

### Category C · 历史 divergence（保留在 ops）

| 文件 | 性质 | 操作 |
|---|---|---|
| `backend/modules/business/retired_modules.go` | base 维护已下线 cmdb 子模块清单；ops 还在用 cmdb，清单为空 | **不动**；在 `overrides/README.md` 登记 |

### Category D · 真实漂移：IAM 子系统（**回流 base 后删除**）

| # | 文件 | 净差异 | 内容 | 归属裁决 |
|---|---|---|---|---|
| D1 | `iam/role/role_service.go` | +163 | `roleMenuAuthorizationRow` 结构 + `resolveRoleAuthorization()` 菜单权限展开 + `syncRoleManagedAPIPolicies` casbin 同步 + `reloadRolePolicies` | ✅ 回流 base |
| D2 | `iam/role/role_service_test.go` | +87 | D1 配套测试 | ✅ 回流 base |
| D3 | `iam/permission/permission_service.go` | +31 | `validatePolicyCreatePayload` 拆分 + `findExistingPolicy` 幂等创建 | ✅ 回流 base |
| D4 | `iam/permission/permission_service_test.go` | +61 | D3 配套测试 | ✅ 回流 base |
| D5 | `iam/permission/permission_workbench.go` | -38, +5 | 把硬编码 permission→API 映射抽到 `contracts.RequiredAPIPoliciesByPermissionKey()` | ✅ 回流 base |
| D6 | `iam/menu/component_registry.go` | +7 | 纯追加 cmdb/deploy 组件 key | ⚠️ base 暴露 `RegisterAdditionalComponents()` 扩展点 |

### Category E · 新增文件（ops only）

| # | 文件 | 性质 | 操作 |
|---|---|---|---|
| E1 | `pkg/contracts/permission_policies.go` | 含 base 级 + 业务级两类条目 | **拆分**：base 级回流；业务级保留 ops，通过 `RegisterAdditionalPolicies()` 注册 |
| E2 | `modules/business/cmdb/*` | ops 的 CMDB 业务模块 | **不动** |
| E3 | `modules/business/deploy/*` | ops 的 deploy 业务模块 | **不动** |

### Category F · 噪声（暂不处理）

| 文件 | 真实差异 | 原因 | 后续 |
|---|---|---|---|
| `modules/platform/health.go` | 4 行 | service 字段值 `"pantheon-platform"` vs `"pantheon-ops"` | 待 base 改为从 env 读 `SERVICE_NAME` |
| `dynamicmodule/dynamic_module_service_test.go` | 4 行 | 测试 fixture 含模块名字符串 | 待参数化 fixture |

### Category G · ops 落后于 base（需要回拉）

| 项 | 性质 | 操作 |
|---|---|---|
| `pkg/cache/` | base 已有，ops 未拉 | **回拉**到 ops（workspace 启用后自动可见） |
| `pkg/config/` | base 已有，ops 未拉 | **回拉**到 ops（workspace 启用后自动可见） |
| `modules/system/menu/` | base 已有，ops 未拉 | 与 `system/iam/menu` 不冲突，回拉 |
| `modules/business/cmdb/vendor/` | base 有 vendor 子模块 | 确认是否还需要；如需要则回拉 |

---

## 4. 前端分类详表

| 类别 | 文件 | 真实差异 | 操作 |
|---|---|---|---|
| 自动生成的 i18n | `i18n/resources/generated/{en-US,zh-CN}.ts` | 240×2 | **排除分析**（generator 自动产物） |
| 手写 i18n | `i18n/resources/{en-US,zh-CN}.ts` | 86-88 | **重构**：业务文案挪到 `modules/business/<m>/locales/` |
| 业务挂载 | `core/router/{componentRegistry,modules}.ts` | 22+7 | **重构**：base 暴露注册 API；ops 在 init 时注册业务组件 |
| 品牌/布局 | `core/layout/index.tsx`, `modules/auth/Login.tsx` | 8, 50 | **重构**：base 把 logo/品牌色做成配置变量 |
| 4 行级噪声 | 16 个 `*List.tsx`、`*Page.tsx` | 各 4 | **对齐 base**（多为换行符差异） |
| generator | `modules/generator/backend-generator.ts` | 16 | 待确认（不应该改） |

---

## 5. 执行计划（**串行 2-PR**）

> **修订记录 2026-05-11**: 原计划为 3-PR (PR-1 + PR-2a + PR-2b)，但 PR-2a 单独执行会导致 ops 编译失败——因为 `role_handler.go` 与 `role_service.go` 同包，单独删除 service 会让同包的 handler 找不到 `RoleService` 类型。所以 PR-2a 和 PR-2b 必须合并为原子的 PR-2。

### PR-1: pantheon-base 通用 IAM 增强（先合，base 仓库原子）

合并 D1-D5 的代码到 base，加 2 个扩展点 API：

**变更清单**
- `backend/modules/system/iam/role/role_service.go` — 接受 ops 的扩展
- `backend/modules/system/iam/role/role_service_test.go` — 接受 ops 的测试
- `backend/modules/system/iam/permission/permission_service.go` — 接受 ops 的扩展
- `backend/modules/system/iam/permission/permission_service_test.go` — 接受 ops 的测试
- `backend/modules/system/iam/permission/permission_workbench.go` — 接受 ops 的重构
- `backend/pkg/contracts/permission_policies.go` — **新文件**，含 base 级条目 + `RegisterAdditionalPolicies()` API
- `backend/modules/system/iam/menu/component_registry.go` — 重构为可扩展集合 + `RegisterAdditionalComponents()` API
- `backend/modules/system/iam/menu/component_registry_test.go` — 扩展点单元测试

**验证**
- `go build ./...` 在 pantheon-base 通过
- `go test ./backend/modules/system/iam/...` 全通
- base 单独启动，自检通过

**执行 Skill**: `.codex/skills/backport-to-base/`

### PR-2: pantheon-ops Workspace + Cutover + 业务挂载（ops 仓库原子）

> 必须在 PR-1 已合并到 base 后执行。所有步骤要在一个 PR 内完成，不可拆分——因为任何中间状态都会让 ops 编译失败。

**步骤 1: 启用 Workspace + Replace**

工作区根目录新增 `D:/workspace/go/pantheon-platform/go.work`：
```
go 1.25.9
use ./pantheon-base
use ./pantheon-ops
```

修改 `pantheon-ops/go.mod`：
```diff
+require pantheon-platform v0.0.0
+replace pantheon-platform => ../pantheon-base
```

**步骤 2: 删除 88 个 Category A 文件**

按 §3 Category A 清单删除（**不含** `cmd/server/main.go`，它要保留并修改）。

**步骤 3: 删除 6 个 IAM override 文件**

- `backend/modules/system/iam/role/role_service.go`
- `backend/modules/system/iam/role/role_service_test.go`
- `backend/modules/system/iam/permission/permission_service.go`
- `backend/modules/system/iam/permission/permission_service_test.go`
- `backend/modules/system/iam/permission/permission_workbench.go`
- `backend/modules/system/iam/menu/component_registry.go`

**步骤 4: 删除整个空目录**

上述删除会导致以下目录变空：
- `backend/internal/middleware/`
- `backend/internal/scaffold/`
- `backend/modules/auth/`
- `backend/modules/dashboard/`
- `backend/modules/system/audit/`
- `backend/modules/system/config/dict/`
- `backend/modules/system/config/setting/`
- `backend/modules/system/dynamicmodule/`（除 `dynamic_module_service_test.go`）
- `backend/modules/system/generator/`
- `backend/modules/system/i18n/`
- `backend/modules/system/iam/role/`
- `backend/modules/system/iam/permission/`
- `backend/modules/system/iam/user/`
- `backend/modules/system/org/dept/`
- `backend/modules/system/org/post/`
- `backend/modules/system/iam/menu/`
- 部分 `backend/pkg/`

`backend/modules/system/iam/menu/` 等不会完全空（还有 menu_dto.go 等被删），但 `iam/role/` 等会完全空——直接删除整个空目录。

**步骤 5: 重写 ops 剩余文件的 import 路径**

```bash
find pantheon-ops/backend -name "*.go" -exec sed -i \
  's|pantheon-ops/backend/\(modules/auth\|modules/dashboard\|modules/system\|modules/platform\|pkg/\(common\|database\|contracts\|cache\|config\|impexp\|testmysql\|authsession\|capability\|upload\)\|internal/\(middleware\|scaffold\)\)|pantheon-platform/backend/\1|g' {} \;
```

适用范围：ops 剩余的所有 `.go` 文件，包括：
- `modules/business/cmdb/*`、`modules/business/deploy/*`、`modules/business/business.go`、`modules/business/retired_modules.go`
- `pkg/contracts/permission_policies.go`（精简后）
- `cmd/server/main.go`
- 4 行漂移的 `modules/platform/health.go` 和 `dynamicmodule/dynamic_module_service_test.go`

**步骤 6: 精简 `pkg/contracts/permission_policies.go`**

移除 `system:*` 条目（base 已经接管），只保留 `business:cmdb:*`、`business:deploy:*` 等业务级条目。结构改为通过 PR-1 引入的 `contracts.RegisterAdditionalPolicies()` 注册。

**步骤 7: 修改 `cmd/server/main.go`**

- import 路径切换为 `pantheon-platform/backend/...`（除业务 import 外）
- 在 init / 启动初期调用：
  ```go
  menu.RegisterAdditionalComponents(business.AllComponentKeys)
  contracts.RegisterAdditionalPolicies(business.AllPermissionPolicies)
  ```
  其中 `business.AllComponentKeys` 和 `business.AllPermissionPolicies` 是 ops 在 `modules/business/` 下集中维护的数据

**验证**
- `go work sync` 不报错
- `cd pantheon-ops && go build ./...` 通过
- `cd pantheon-base && go build ./...` 仍然通过（PR-2 不该影响 base）
- 启动 ops，全功能冒烟通过：登录 / 用户增删改查 / 权限分配 / CMDB / deploy

**执行 Skill**: `.codex/skills/workspace-cutover/`

---

## 6. 风险与回滚

### 6.1 钻石依赖（Diamond Dependency）

如果 PR-2 在 PR-1 之前执行：
> base 的 `permission_workbench.go` → import `permission_service.go`
> ops 还保留自己的 `permission_service.go` 版本（多 31 行幂等创建逻辑）
> 但 workspace replace 是全模块替换，**ops 的版本会被 base 的版本覆盖**
> 结果：ops 多写的 31 行功能从此无人调用

**规避**：严格 PR-1 合入 → PR-2 启动 顺序，PR-2 全部步骤必须原子完成。

### 6.2 同包耦合（PR 不可再拆）

ops 的 `role_handler.go` 与 `role_service.go` 同包，handler 引用 `RoleService` 类型。同样 `permission_handler.go` 引用 `PermissionService`。所以：
- 不能在保留 handler 的情况下单独删除 service（编译失败）
- 不能先「删除 IAM override」再「workspace cutover」——两个动作必须同 PR 内完成
- handler 文件本身是 Category A（假漂移），只能随 workspace 一并删除

这是 PR-2a 和 PR-2b 在原计划中被合并为 PR-2 的根本原因。

### 6.3 回滚路径

每个 PR 单独可回滚：
- PR-1 回滚 → base 回到原状，ops 不受影响（ops 此时未变化）
- PR-2 回滚 → 删 `go.work`、还原 `go.mod` 的 require/replace、`git restore` 全部删除的 94 个文件（88 个 Category A + 6 个 IAM）、还原 sed 改写的 import、还原 `permission_policies.go` 和 `main.go`

### 6.3 已识别的边界情况

- `cmd/server/main.go` 不能简单 sed：它的 import 需要混合 `pantheon-platform/...` 和 `pantheon-ops/...` 两种路径
- `dynamic_module_service_test.go` 的 fixture 字符串包含模块名，重新建立 ops fixture 时要注意
- 前端 `core/router/{componentRegistry,modules}.ts` 也需要类似 base 暴露注册 API 的改造，本次 audit 暂不展开，留待前端 drift 治理 PR

---

## 7. 后续治理

完成上述 3 个 PR 后：

| 状态 | 描述 |
|---|---|
| ✅ 89 个假漂移文件消除 |
| ✅ 6 个 IAM 真实漂移文件消除 |
| ✅ ops 只保留 `modules/business/*`、`pkg/contracts/permission_policies.go`（业务级）、`cmd/server/main.go`（入口） |
| ⚠️ 前端 drift 单独治理 |
| ⚠️ `platform/health.go` 服务名硬编码待修 |
| ⚠️ Category G 的 base→ops 补丁（cache/config 包）随 workspace 自动可见 |

后续每次会话开始，执行 `triage-base-drift` Skill 重新扫描，确保新增 drift 被快速发现并归类。

---

## 8. 时间线

- **2026-05-11 (a)**: 完成 triage，固化此文档 + `triage-base-drift` Skill。原计划 3-PR (PR-1 / PR-2a / PR-2b)。
- **2026-05-11 (b)**: 写 `backport-to-base` Skill 时发现同包耦合问题（`role_handler.go` 依赖 `role_service.go`），将 PR-2a/PR-2b 合并为原子的 PR-2。同时写 `workspace-cutover` Skill。
- **待执行**: PR-1 (backport-to-base) → 等 PR-1 merge → PR-2 (workspace-cutover)。

---

## 9. Revalidation 2026-05-11 13:12 +08:00

按 `$triage-base-drift` 重新做了一次只读扫描，目标是确认当前代码 drift 现状是否发生新的结构性变化。

### 9.1 结论

- **没有出现新的 backend drift 家族**。
- 现存的核心 backend real drift 仍然集中在：
  - `backend/modules/business/business.go`
  - `backend/modules/business/retired_modules.go`
  - `backend/modules/platform/health.go`
  - `backend/modules/system/dynamicmodule/dynamic_module_service_test.go`
  - `backend/modules/system/iam/menu/component_registry.go`
  - `backend/modules/system/iam/permission/{permission_service.go, permission_service_test.go, permission_workbench.go}`
  - `backend/modules/system/iam/role/{role_service.go, role_service_test.go}`
- **没有新增需要改写 PR 结构的 backend 风险点**。也就是说，本文前面定义的 PR-1 / PR-2 切分仍然成立。
- frontend 侧也**没有出现新的 drift 类型**，仍然是：
  - router / component registry 挂载点
  - 手写 i18n 资源
  - 登录页与壳层品牌差异
  - 一批 2 行级噪声差异

### 9.2 说明

本次重扫的作用是确认“代码 drift 现状没变”，不是重写整份 audit。因此本节只记录：

1. 核心 drift 文件族是否变化
2. 既有 PR 分解是否仍然有效
3. 是否需要新增新的代码 cutover 路线

结果：**都不需要调整**。
