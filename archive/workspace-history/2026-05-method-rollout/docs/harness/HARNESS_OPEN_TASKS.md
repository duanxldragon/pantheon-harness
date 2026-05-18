# Harness Open Tasks

类型：Task Queue
归属层：platform
状态：Active

本文记录当前 Harness Engineering 体系尚未收口的任务。重启 Codex 后从本文件继续。

最后核对：2026-05-13。

## 0. Resume Context

### Next Resume Checklist

下次重启后优先看这里：

1. **先不要改业务代码**：当前 platform / Harness 本身已基本收口，剩余业务或系统域 warning 需要单独开任务处理。
2. **远端 Harness CI 已验证**：`pantheon-platform` 的 `.github/workflows/harness.yml` 已在 GitHub Actions 跑通，`harness-reports` artifact 已下载核对。
3. **安全扫描远端验证已完成**：`pantheon-base` 与 `pantheon-ops` 已新增 GitHub 免费能力扫描配置，并已确认 `Security Reports` workflow artifact 可下载。
4. **之后再处理非 platform 债务**：当前子仓仍有其它 UI/文档/环境工作区改动，和 Harness contract 收口无关，需单独开任务处理。

当前已完成：

- Phase 1: Protocol Bootstrap
- Phase 2: Task Packet And Evidence Trial
- Phase 3: Mechanical Harness Checks
- Phase 4: CI Harness Gate
- Phase 5: Cross-Tool Review Loop
- Phase 6: Drift Governance Script Extraction
- Visual Quality Protocol and global `impeccable` skill wiring
- GitHub non-paid security report workflow for `pantheon-base` and `pantheon-ops`
- P0: Restart And Confirm `impeccable`
- P2: Install PyYAML Or Replace Skill Validator Dependency
- P2: Fix Existing `pantheon-ops` Boundary Debt
- P2: Triage DTO Contract Warnings
- P2: Triage Permission Warnings
- P2: Triage Audit Metadata Warnings
- P3: Add Visual Diff Or Screenshot Gate
- P3: Phase 7 Full Adoption

当前部分完成：

- Security report findings triage
  - `security-secret-reports/gitleaks.json` 已能稳定产出并下载。
  - 当前树已移除 `pantheon-base` 的 `.smoke.token`，并将 `pantheon-ops` 的 SSH private key 示例占位符替换为普通文案。
  - gitleaks 仍会报告旧提交中的 `.smoke.token` / `.trace-debug` / `.tmp-visual` / 历史占位符命中；彻底清除需要 history scrub + force push，需单独授权。

当前未完成：

- `check-visual-evidence --strict` 升级为阻塞门禁
  - 当前 `--strict` 仍 exit 0，仅产出 warning。
  - 升级阈值：当 7 个 UI task packet 全部 0 warning，且最近 4 周内每个新 UI task packet 都附带 desktop+mobile 截图或显式 visual gap 记录后，将 `check-visual-evidence.mjs` 的 strict 路径改为「warningCount > 0 时 exit 1」。
  - 推进顺序：(1) 在 `.github/workflows/harness.yml` 增加单独的 `visual-evidence-blocking` job，先以 `continue-on-error: true` 跑 strict 模式 2 周；(2) 移除 `continue-on-error`；(3) 在 README 与 PR 模板里更新提示。
  - 已完成的前置：`check-visual-evidence.mjs` 现支持 `--root` 与 4 个 tmpdir fixture 单元测试，可在 fixture 上验证策略变更。
- 剩余 harness 脚本测试覆盖
  - `check-boundaries` / `check-backend-response-contract` / `check-permission-contract` / `check-audit-coverage` 当前依赖 Go 源树，没有独立 fixture 测试。在它们升级为 strict CI gate 之前需补 tmpdir fixture 测试，模式参考 `check-backend-dto-contract.test.mjs`。

当前本地检查快照：

```text
node scripts/harness/check-task-packet.mjs
  PASS: 15 file(s), 0 error(s), 0 warning(s)

node scripts/harness/check-evidence.mjs --strict
  PASS: 15 file(s), 0 error(s), 0 warning(s)

node scripts/harness/check-backend-response-contract.mjs --strict
  PASS: 0 finding(s), 0 warning(s)

node scripts/harness/check-backend-dto-contract.mjs --strict
  PASS: 0 finding(s), 0 warning(s), 0 scan warning(s)

node scripts/harness/check-boundaries.mjs --strict
  PASS: 0 finding(s), 0 warning(s)

node scripts/harness/check-permission-contract.mjs --strict
  PASS: 0 finding(s), 0 warning(s), 0 scan warning(s)

node scripts/harness/check-audit-coverage.mjs --strict
  PASS: 0 finding(s), 0 warning(s), 0 scan warning(s), 240 write route(s)

node scripts/harness/check-visual-evidence.mjs --strict
  PASS(report-only): 6 UI task(s), 0 warning(s)

node scripts/harness/check-adoption.mjs --strict
  PASS: 0 finding(s), 0 warning(s)

node scripts/harness/triage-base-drift.mjs --json
  PASS: pseudo-drift 66, business mount 1, generic drift 74, business-specific drift 33, noise 33, base-only 91, business-only 63

node --test scripts/harness/*.test.mjs
  PASS: 23 tests (4 check-task-packet, 4 check-evidence, 4 check-visual-evidence, 4 check-adoption, 2 check-inheritance-contract, 2 check-backend-dto-contract, 3 triage-base-drift)

pantheon-base/.github/workflows/security.yml
pantheon-ops/.github/workflows/security.yml
  PASS: Security Reports workflow conclusion success
  PASS: security-dependency-reports artifact downloaded
  PASS: security-secret-reports artifact downloaded, including gitleaks.json
  PASS: security-workflow-posture-reports artifact downloaded

GitHub Actions Harness run 25800126410
  PASS: workflow conclusion success
  PASS: harness-reports artifact downloaded
  PASS: task-packets/evidence/boundary/backend DTO/permission/audit/visual/adoption reports have 0 findings and 0 warnings
```

建议收口顺序：

1. 决定是否对旧提交中的 secret scanner 命中做 history scrub + force push。
2. 对 `Security Reports` 的 dependency / OSV / zizmor / scorecard findings 做 baseline triage，再决定哪些扫描升级为 blocking gate。
3. 逐步把 report-first Harness 检查升级为 blocking gate。

## 1. P0: Restart And Confirm `impeccable`

状态：Done

目标：

- 重启 Codex 后确认全局 `impeccable` skill 已出现在可用 skills 列表。
- UI 任务默认优先使用 `impeccable`。

验证：

- 新会话中确认 available skills 包含 `impeccable`。
- 如未出现，读取 `C:\Users\xiaolong\.codex\skills\impeccable\SKILL.md` 并排查 Codex skill discovery。

已知信息：

- skill 已创建在 `C:\Users\xiaolong\.codex\skills\impeccable\`。
- Codex 全局入口已写入 `C:\Users\xiaolong\.codex\AGENTS.md`。
- Claude Code 全局入口已写入 `C:\Users\xiaolong\.claude\CLAUDE.md`。
- 2026-05-13 新会话 available skills 已包含 `impeccable`。

## 2. P1: Finish Phase 3 DTO Contract Check

状态：Done

目标：

- 实现 `scripts/harness/check-backend-dto-contract.mjs`。
- 检查 backend handler 不直接暴露不稳定内部模型或绕过 DTO/response contract。

建议范围：

- 先 report-only。
- 支持 `--json` 和 `--strict`。
- 输出 findings/warnings。
- 新增 task packet 和 evidence。
- 更新 `scripts/harness/README.md` 与 `HARNESS_ROLLOUT_PLAN.md`。

验证：

- `node --check scripts/harness/check-backend-dto-contract.mjs`
- `node scripts/harness/check-backend-dto-contract.mjs`
- `node scripts/harness/check-backend-dto-contract.mjs --json`
- `node scripts/harness/check-backend-dto-contract.mjs --strict`
- `node scripts/harness/check-task-packet.mjs`
- `node scripts/harness/check-evidence.mjs --strict`

2026-05-13 已完成：

- 新增 `scripts/harness/check-backend-dto-contract.mjs`。
- 新增 Node test 覆盖内部模型 warning 和 DTO-like response pass。
- 接入 `.github/workflows/harness.yml` report-first artifact。
- 当前真实仓库结果：0 findings，8 warnings。

## 3. P1: Extract Drift Governance Script

状态：Done

目标：

- 把 `.codex/skills/triage-base-drift` 的核心扫描逻辑下沉为通用脚本。

输出物：

```text
scripts/harness/triage-base-drift.mjs
```

要求：

- Codex skill 只能作为 adapter 调用该脚本。
- Claude Code、Cursor、OpenHands、人工也能直接运行同一脚本。
- 分类至少包含：
  - pseudo-drift
  - business mount
  - generic drift
  - business-specific drift
  - noise

验证：

- `node --check scripts/harness/triage-base-drift.mjs`
- `node scripts/harness/triage-base-drift.mjs`
- `node scripts/harness/triage-base-drift.mjs --json`
- 输出可用于更新或生成 `docs/DRIFT_AUDIT.md`。

2026-05-13 已完成：

- 新增 `scripts/harness/triage-base-drift.mjs`。
- 新增 Node test 覆盖 pseudo-drift、business mount、noise 分类。
- Codex `triage-base-drift` skill 已降级为 adapter，入口改为调用通用脚本。
- 接入 `.github/workflows/harness.yml` report-first artifact。

## 4. P1: Verify GitHub Actions Harness Workflow

状态：Done

目标：

- 在 GitHub Actions 上实际运行 `.github/workflows/harness.yml`。
- 确认 artifact 上传可用。

验证：

- GitHub Actions workflow run 成功。
- `harness-reports` artifact 包含：
  - `task-packets.json`
  - `evidence.json`
  - `boundaries.json`
  - `backend-response-contract.json`
  - `backend-dto-contract.json`
  - `permission-contract.json`
  - `audit-coverage.json`
  - `visual-evidence.json`
  - `adoption.json`
  - `base-drift.json`

已知限制：

- 2026-05-13 已通过 GitHub Actions run `25800126410` 验证 workflow success。
- 已下载 `harness-reports` artifact 到本地并确认报告文件齐全。
- 已给 `actions/checkout@v4` 增加 `submodules: true`，确保 contract anchor 和子仓扫描在远端可见。

## 5. P2: Fix Existing `pantheon-ops` Boundary Debt

状态：Done

当前 findings：

```text
pantheon-ops/backend/modules/business/cmdb/cmdb.go
  imports pantheon-ops/backend/internal/middleware

pantheon-ops/backend/modules/business/deploy/deploy.go
  imports pantheon-ops/backend/internal/middleware
```

目标：

- 业务域不直接 import `backend/internal`。
- 将需要复用的能力移动到稳定 contract/shared 层，或通过系统域公开接口承接。

验证：

- `node scripts/harness/check-boundaries.mjs --strict`
- 相关 Go package tests。

2026-05-13 已完成：

- 新增 `backend/pkg/contracts/route_groups.go` 作为稳定 route guard contract。
- `pantheon-ops` business modules 改为依赖 `contracts.ProtectedGroup` / `contracts.DataScopedGroup`，不再直接 import `backend/internal/middleware`。
- 同步在 `pantheon-base` 增加同名 contract，避免派生仓库本地重定义 base-facing contract。
- 验证：
  - `node scripts/harness/check-boundaries.mjs --strict`
  - `cd pantheon-ops; go test ./backend/pkg/contracts ./backend/modules/business/cmdb ./backend/modules/business/deploy`
  - `cd pantheon-base; go test ./backend/pkg/contracts`

## 6. P2: Triage Permission Warnings

状态：Done

当前状态：

- `check-permission-contract.mjs --strict` 为 0 findings。
- `check-permission-contract.mjs --strict` 为 0 warnings。

目标：

- 判断每个 `*:list` near action wording 是否只是 read/navigation gating。
- 需要 action permission 的场景补权限 contract、seed、前端 gating 和验收说明。

验证：

- `node scripts/harness/check-permission-contract.mjs --strict`
- 相关 permission smoke。

2026-05-13 已完成：

- 已确认前端 `system:module:list`、`system:post:list`、`system:user:list`、`system:operation-log:list` 均为 read/navigation gating，不是 action gating。
- 已确认业务 `*:list` permission policy case 均映射 GET-only API，deploy menu seed 中 `PagePerm` 用于 Type C 页面准入，不是 Type F action 权限。
- 收紧 `scripts/harness/check-permission-contract.mjs`：
  - Type C `PagePerm: "*:list"` 不再触发 action warning。
  - GET-only `case "*:list"` policy 不再触发 action warning。
  - `canView*` / `canOpen*` 等读导航变量不再被邻近 action 词误判。
- 验证：
  - `node --check scripts/harness/check-permission-contract.mjs`
  - `node scripts/harness/check-permission-contract.mjs --strict`

## 7. P2: Triage DTO Contract Warnings

状态：Done

当前状态：

- `check-backend-dto-contract.mjs --strict` 为 0 findings / 0 warnings。

目标：

- 判断这些 handler 返回是否是稳定 API DTO。
- 如不是，补 `*Resp`/`*Response` DTO 并让 service 或 handler 显式转换。
- 如是稳定 contract，调整命名或 checker allowlist，使脚本语义和代码契约一致。

验证：

- `node scripts/harness/check-backend-dto-contract.mjs --strict`
- 相关 backend tests。

2026-05-13 已完成：

- `system/dynamicmodule` 新增 `ModuleRegistrationResp`，`ListRegisteredModules` / `GetModuleStatus` 返回显式 DTO。
- `system/i18n` 新增 `I18nResp`，`List` / `Get` / `Create` 对外返回显式 DTO。
- 同步更新 `pantheon-base` 与 `pantheon-ops`。
- 验证：
  - `node scripts/harness/check-backend-dto-contract.mjs --strict`
  - `cd pantheon-base; go test ./backend/modules/system/dynamicmodule ./backend/modules/system/i18n`
  - `cd pantheon-ops; go test ./backend/modules/system/dynamicmodule ./backend/modules/system/i18n`

## 8. P2: Triage Audit Metadata Warnings

状态：Done

当前状态：

- `check-audit-coverage.mjs --strict` 为 0 findings / 0 warnings。
- 240 write routes 已扫描。

目标：

- 为高价值写操作补 `common.SetAuditMetadata` 或等价语义审计元数据。
- 先处理高风险域：
  - auth/session/password/MFA
  - system/iam role/menu/permission
  - business deploy task/package
  - business cmdb host status/collect

验证：

- `node scripts/harness/check-audit-coverage.mjs --strict`
- 相关 backend tests 或 smoke。

2026-05-13 warning 分布：

- `pantheon-base`: 110 write routes scanned
- `pantheon-ops`: 130 write routes scanned
- 主要 warning 类型：
  - write handler relies on global operation log defaults
  - write route handler function was not found for audit metadata inspection
  - write route handler could not be identified for audit metadata inspection

2026-05-13 已完成：

- 修正 `scripts/harness/check-audit-coverage.mjs` route parser，支持 chained middleware 后继续识别最终 handler。
- 为 base-owned 高价值写 handler 补 `common.SetAuditMetadata`：
  - auth login / MFA / refresh / password / operation verify / activity / logout / session revoke
  - system IAM menu create/update/delete
  - system IAM role create/update/delete
  - system setting update / cache refresh / audit export
  - system i18n rename preview / sync missing keys / cache refresh
- 为 `pantheon-ops` business CMDB host collect/status 补业务审计元数据。
- 同步更新 `pantheon-base` 与 `pantheon-ops` 的继承副本。
- 验证：
  - `node --check scripts/harness/check-audit-coverage.mjs`
  - `node scripts/harness/check-audit-coverage.mjs --strict`
  - `cd pantheon-base; go test ./backend/modules/auth ./backend/modules/system/iam/menu ./backend/modules/system/iam/role ./backend/modules/system/config/setting ./backend/modules/system/i18n`
  - `cd pantheon-ops; go test ./backend/modules/auth ./backend/modules/system/iam/menu ./backend/modules/system/iam/role ./backend/modules/system/config/setting ./backend/modules/system/i18n ./backend/modules/business/cmdb/host`

## 9. P2: Install PyYAML Or Replace Skill Validator Dependency

状态：Done

背景：

- `quick_validate.py` 未跑通，因为当前 Python 环境缺少 `yaml` 模块。
- `impeccable` skill 已按文件结构人工检查过，但官方 validator 还没通过。

可选方案：

1. 安装 `PyYAML` 后重跑 validator。
2. 修改或包装 validator，使用无依赖 YAML frontmatter 检查。

验证：

- `python C:\Users\xiaolong\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\xiaolong\.codex\skills\impeccable`

2026-05-13 已完成：

```text
python -m ensurepip --upgrade
python -m pip install PyYAML
python C:\Users\xiaolong\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\xiaolong\.codex\skills\impeccable
  Skill is valid!
```

## 10. P3: Add Visual Diff Or Screenshot Gate

状态：Done

目标：

- 将 `impeccable` 从协议/review gate 进一步落到自动化视觉证据。

可选方案：

- Playwright screenshots for key pages。
- gstack browse report-only screenshots。
- Percy/Chromatic 等外部视觉 diff 服务。

要求：

- 初期 report-only。
- 不因既有视觉债直接阻塞 CI。
- UI task packet 必须声明 viewport 和 states。

2026-05-13 已完成：

- 新增 `scripts/harness/check-visual-evidence.mjs`。
- 初期保持 report-only：`--strict` 仍只报告 warning，不阻塞 CI。
- 检查 UI task packet 是否声明 desktop/mobile viewport 和 empty/loading/error/permission state 计划。
- 检查 `.harness/evidence/<task-id>/` 是否包含截图、browser evidence，或明确记录 visual evidence gap。
- 接入 `.github/workflows/harness.yml`，生成 `visual-evidence.json` artifact。
- 当前 report-only 快照：5 个 UI task，7 个历史 warning，均不阻塞。
- 验证：
  - `node --check scripts/harness/check-visual-evidence.mjs`
  - `node scripts/harness/check-visual-evidence.mjs --strict`
  - `node scripts/harness/check-visual-evidence.mjs --json`
  - `node scripts/harness/check-task-packet.mjs`
  - `node scripts/harness/check-evidence.mjs --strict`

## 11. P3: Phase 7 Full Adoption

状态：Done locally; remote CI artifact verification remains external

目标：

- 非 trivial PR 都有 task packet 或明确 trivial 标记。
- PR 都有 verification evidence 或未运行原因。
- Agent final answer 与 PR 描述不再是唯一证据。
- Harness gate 进入默认开发流程。
- Codex、Claude Code、Cursor、OpenHands、人工执行同一任务时，输入输出结构一致。

建议先决条件：

- Phase 3 DTO check 完成。
- Phase 6 drift script 完成。
- GitHub Actions workflow 已实际跑通。

2026-05-13 已完成：

- 新增 `scripts/harness/check-adoption.mjs`，检查 shared contracts、tool adapters、PR template markers 和 implementation prompt evidence rules。
- PR template 增加 `Trivial change` 标记，补齐 backend DTO、visual evidence、base drift report checklist。
- CI Harness workflow 生成 `adoption.json` report artifact。
- Phase 7 已在本地流程层收口；远端 GitHub Actions artifact verification 保持为 P1 外部 gate。
- 验证：
  - `node --check scripts/harness/check-adoption.mjs`
  - `node scripts/harness/check-adoption.mjs --strict`
  - `node scripts/harness/check-adoption.mjs --json`
  - `node scripts/harness/check-task-packet.mjs`
  - `node scripts/harness/check-evidence.mjs --strict`

## 12. P3: Promote `check-visual-evidence --strict` To Blocking Gate

状态：Done

背景：

- `check-visual-evidence.mjs --strict` 曾经仅产出 warning，始终 exit 0。
- 当前 7 个 UI task packet 已经声明 desktop/mobile viewport 与状态计划，`--strict` 在真实仓库为 0 warning。
- `check-visual-evidence.mjs` 已支持 `--root`，并已覆盖 PASS / 缺失 viewport / 缺失 evidence / strict fail / 接受 gap 五条 tmpdir fixture 测试路径。

目标：

- 把 `--strict` 升级为「warningCount > 0 时 exit 1」，与其他 P0/P1 检查对齐。

2026-05-18 已完成：

- `scripts/harness/check-visual-evidence.mjs` 的 strict 路径已改为 `warningCount > 0 时 exit 1`。
- `.github/workflows/harness.yml` 已增加 `visual-evidence-blocking` job，并暂时保留 `continue-on-error: true` 作为观察期保护。
- `scripts/harness/README.md` 已同步 strict exit behavior 和 CI 观察期说明。
- 本地验证：
  - `node --test scripts/harness/check-visual-evidence.test.mjs`
  - `node scripts/harness/check-visual-evidence.mjs --strict`
  - 当前真实仓库结果：`7 UI task(s), 0 warning(s)`

可选：

- 视情况引入 Playwright/Percy/Chromatic 等真实截图基线，但不是阻塞前置。
- 报告模式继续保留 `--json` 用于 CI artifact。

验证：

- `node --test scripts/harness/check-visual-evidence.test.mjs`
- `node scripts/harness/check-visual-evidence.mjs --strict`

## 13. P3: Add Fixture Tests For Remaining Harness Scripts

状态：Done

当前已覆盖：

- `check-task-packet.mjs` → `check-task-packet.test.mjs`（4 个测试）
- `check-evidence.mjs` → `check-evidence.test.mjs`（4 个测试）
- `check-visual-evidence.mjs` → `check-visual-evidence.test.mjs`（4 个测试）
- `check-adoption.mjs` → `check-adoption.test.mjs`（4 个测试）
- `check-inheritance-contract.mjs` → `check-inheritance-contract.test.mjs`（2 个测试）
- `check-backend-dto-contract.mjs` → `check-backend-dto-contract.test.mjs`（2 个测试）
- `triage-base-drift.mjs` → `triage-base-drift.test.mjs`（3 个测试）

2026-05-18 已完成：

- `check-boundaries.mjs`
- `check-backend-response-contract.mjs`
- `check-permission-contract.mjs`
- `check-audit-coverage.mjs`

- 上述 4 个脚本现已全部支持 `--root <path>`。
- 已为上述 4 个脚本新增 `node:test` + tmpdir fixture 测试，覆盖 PASS 路径与典型 finding/warning 路径。
- `scripts/harness/README.md` 的 common conventions 与 test coverage 列表已同步更新。

验证：

- `node --test scripts/harness/*.test.mjs`
