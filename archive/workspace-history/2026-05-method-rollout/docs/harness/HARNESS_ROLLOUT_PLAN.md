# Harness Rollout Plan

类型：Remediation
归属层：platform
状态：Active

本文把 Pantheon 从“已有 agent 规则和 Codex skills”推进到“工具无关 Harness Engineering 最佳实践”的路线拆成可执行阶段。

当前未收口任务见：

```text
docs/harness/HARNESS_OPEN_TASKS.md
```

## 1. 当前状态

已具备：

- workspace/base/ops 继承模型。
- `AGENTS.md` 层级和架构红线。
- `.codex/skills` 专项流程。
- 合同先行文档体系。
- 前端菜单、i18n、页面准入等检查。
- 后端 Go tests 和 GitHub Actions quality gates。
- drift audit 和 base 回流计划。

主要缺口：

- 部分关键流程仍带 Codex 色彩。
- 任务输入、验证证据、review 输出还没有统一工具无关格式。
- 部分架构红线仍是文档约束，尚未完全机械化。
- drift 治理逻辑还没有全部下沉为通用脚本。

## 2. 目标状态

目标成熟度：9/10。

达到后应满足：

1. 任何工具都从 `docs/harness/*` 和 `.agents/adapters/*` 进入。
2. 非 trivial 任务有 task packet。
3. 验证证据按统一格式保存或摘要。
4. Review 输出 findings-first 且可跨工具复用。
5. CI 能检查核心 harness 约束。
6. Codex skills 只作为 Codex adapter，不是唯一事实源。
7. base/ops drift 治理由通用脚本和协议保障。

### 2.1 本轮收口目标（2026-05）

本轮 Harness 收口不再继续新增“只有文档没有默认执行”的规则，而是把现有协议推进到默认落地：

1. 非 trivial 任务默认必须有 task packet。
2. verification evidence 默认是交付物，而不是可选附件。
3. UI 任务的视觉证据进入固定门禁，而不是只做报告。
4. review 输出、PR 描述与 CI artifact 使用同一组输入输出结构。
5. `pantheon-base` 与派生业务仓库都按同一套 harness 协议工作。

### 2.2 本轮不做

- 不为了追求形式统一而回补所有历史任务的 task packet。
- 不把所有 report-first 检查在同一轮全部升成 blocking。
- 不引入新的外部重型平台作为前置依赖，优先把仓库内协议与本地/CI 门禁跑通。

## 3. Phase 1: Protocol Bootstrap

状态：Done

输出物：

- `docs/harness/HARNESS_METHOD_PLAYBOOK.md`
- `docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- `docs/harness/AGENT_INTERFACE_CONTRACT.md`
- `docs/harness/TASK_PACKET_SPEC.md`
- `docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- `docs/harness/REVIEW_LOOP_SPEC.md`
- `docs/harness/TOOL_ADAPTERS.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `.agents/README.md`
- `.agents/adapters/*`
- `.agents/schemas/*`
- root `README.md` 入口更新
- `pantheon-base/AGENTS.md` 与 `pantheon-ops/AGENTS.md` 引用更新

验收：

- `openspec + superpowers + impeccable + gstack` 的默认协同方式有唯一入口文档。
- 新工具进入仓库时无需读取 `.codex/skills` 也能理解流程。
- Codex skills 被明确定位为 adapter。
- base/ops 继承规则被纳入 harness 协议。

## 4. Phase 2: Task Packet And Evidence Trial

状态：Done

输出物：

- `docs/harness/tasks/` 下至少一个真实 task packet。
- `.harness/evidence/<task-id>/summary.md` 示例。
- `.harness/evidence/<task-id>/commands.json` 示例。

建议试点任务：

- 纯文档任务：当前 Harness bootstrap。
- 小型脚本任务：新增 `scripts/harness/check-task-packet.mjs`。

验收：

- Codex、Claude Code、Cursor、人工都能按同一 task packet 执行。
- 未运行验证时能用统一 evidence 格式记录原因。

## 5. Phase 3: Mechanical Harness Checks

状态：Done (report-first)

输出物：

```text
scripts/harness/check-task-packet.mjs
scripts/harness/check-boundaries.mjs
scripts/harness/check-backend-response-contract.mjs
scripts/harness/check-backend-dto-contract.mjs
scripts/harness/check-permission-contract.mjs
scripts/harness/check-audit-coverage.mjs
```

优先级：

1. `check-task-packet.mjs` — Done
2. `check-boundaries.mjs` — Done (report-first; existing ops findings recorded)
3. `check-backend-response-contract.mjs` — Done
4. `check-backend-dto-contract.mjs` — Done (conservative warnings; no strict findings)
5. `check-permission-contract.mjs` — Done (conservative warnings; no strict findings)
6. `check-audit-coverage.mjs` — Done (global audit middleware required; semantic audit metadata tracked as warnings)

验收：

- 检查脚本能本地运行。
- 初期只 report，不直接 fail CI。
- 每个脚本有 README 或 usage。

## 6. Phase 4: CI Harness Gate

状态：Done

输出物：

```text
.github/workflows/harness.yml
scripts/harness/check-evidence.mjs
```

职责：

- task packet schema check
- evidence schema check
- boundary report
- backend response contract report
- permission contract report
- audit coverage report

验收：

- CI 上传 harness report。
- Structural task packet and evidence checks can block CI.
- P0/P1 级检查再逐步从 report 升级为 blocking。

## 7. Phase 5: Cross-Tool Review Loop

状态：Done

输出物：

- `.agents/prompts/review.md`
- `.agents/prompts/implementation.md`
- `.agents/prompts/qa.md`
- PR template 增补 harness checklist
- `docs/harness/VISUAL_QUALITY_PROTOCOL.md`
- Global `impeccable` visual quality skill for UI work

验收：

- 实现者和 reviewer 可以是不同工具。
- Review 必须引用 task packet 和 evidence。
- UI 任务必须执行 `impeccable` 或同等视觉质量门。
- P0/P1 未解决不能 approved。

## 8. Phase 6: Drift Governance Script Extraction

状态：Done (script extracted; adoption remains report-first)

输出物：

```text
scripts/harness/triage-base-drift.mjs
```

迁移目标：

- 把 `.codex/skills/triage-base-drift` 的核心扫描逻辑下沉为通用脚本。
- Codex skill 只调用脚本并解释结果。
- 其他工具和人工也能运行同一 drift 检查。

验收：

- 输出分类包含 pseudo-drift、business mount、generic drift、business-specific drift、noise。
- 输出能更新或生成 `docs/DRIFT_AUDIT.md`。
- 任何业务仓库 upgrade 前都能先跑 drift triage。

## 9. Phase 7: Full Adoption

状态：Done locally; remote CI artifact verification remains external

验收：

- 非 trivial PR 都有 task packet 或明确 trivial 标记。
- PR 都有 verification evidence 或未运行原因。
- Agent final answer 与 PR 描述不再是唯一证据。
- Harness gate 进入默认开发流程。
- Codex、Claude、Cursor、人工执行同一任务时，输入输出结构一致。

输出物：

- `.github/pull_request_template.md` task packet / trivial marker / evidence checklist
- `scripts/harness/check-adoption.mjs`
- `.github/workflows/harness.yml` adoption report artifact
- `docs/harness/tasks/2026-05-13-phase-7-full-adoption.task.md`
- `.harness/evidence/2026-05-13-phase-7-full-adoption/`

## 9.1 Phase 7.5: Default Enforcement

状态：Planned

本阶段是“已具备 adoption 能力”到“日常开发默认执行”的过渡层，目标是把 Harness 从成熟流程推进到强制落地。

输出物：

- `scripts/harness/check-visual-evidence.mjs` strict blocking 行为升级
- `scripts/harness/check-adoption.mjs` 增补“普通 feature/bugfix 任务必须附 task packet/evidence”的识别逻辑
- `.github/workflows/harness.yml` 与 `pantheon-base/.github/workflows/quality.yml` 的职责重整
- PR 模板中的 task packet / evidence / visual evidence checklist 收紧
- 至少一条普通功能任务、一条 UI 任务、一条跨层任务的完整 task packet + evidence 样板

验收：

- visual evidence strict 对缺失截图或缺失已记录 gap 的 UI 任务直接阻断 CI。
- adoption check 能识别“改了实现代码但没有 task packet/evidence”的变更。
- 日常 feature/bugfix 不再主要依赖实现者最终口头总结作为唯一证据。

### 9.2 Phase 7.5 子目标

#### A. 视觉门禁强制化

- 将 `check-visual-evidence --strict` 从 report-only 升级为真实 blocking。
- 对 UI task packet 固定要求 desktop/mobile viewport 与 empty/loading/error/permission state 验证计划。
- 对 UI evidence 固定要求 screenshot、browser evidence 或明确 gap 记录三选一闭环。

#### B. CI 责任拆分

- `harness.yml` 负责 task packet、evidence、adoption、visual evidence、inheritance、drift 与 contract 类检查。
- `quality.yml` 负责 compile/test/lint/type-check/build/security scan 等运行时质量门。
- 两者产出的 artifact 与 PR checklist 必须能互相引用，避免“流程门禁”和“代码门禁”各写各的。

#### C. 日常任务 adoption

- 不再只用 Harness 自身建设任务证明流程可用。
- 需要补至少三类真实业务样本：
  - 普通 backend 或 contract 变更
  - UI 变更
  - 跨层变更

#### D. 阻断策略

- 继续保持“结构性错误先 blocking，语义性治理项分级 blocking”的节奏。
- 本阶段优先升 blocking 的是：task packet、evidence、visual evidence、adoption。
- boundary / permission / audit / DTO 等语义检查，保持分层升级，不在同一轮全部切硬门。

## 10. 执行纪律

- 每个 phase 单独提交。
- 每个 phase 有最小可验证产物。
- 不把检查脚本一次性接成 blocking。
- 不复制 base 合同到 business 仓库。
- 不把工具 adapter 写成新的事实源。
