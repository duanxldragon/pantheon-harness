# Changelog

Pantheon Harness 方法论变更记录。按 semver 管理。

格式灵感：[Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

## [Unreleased]

### Added
- **check-encoding.mjs 门禁**: 扫描所有 git 跟踪的文本文件（`.md/.go/.ts` 等）是否含非法 UTF-8 字节序列，定位到行号。背景：2026-06-27 的 harness-engineering→pantheon-harness 迁移提交用非 UTF-8 代码页写回文件，损坏了 pantheon-base 5 个中文治理文档（每个多字节字符边界丢字节并吞掉换行），在 7 条 CI workflow 下潜伏近 3 周无门禁可见——按 ratchet loop 补此字节层 sensor。含 7 个 tmpdir fixture 测试，已接入 `harness-health.yml` docs-check job。

## [1.4.0] — 2026-07-15

### Added
- **Model-Era Retirement Review**: 新增 `architecture/harness/retirement-reviews/2026-07-15-model-era-retirement-review.md`，按 `harness-retirement-review.md` 政策对全部 Superpowers/OMX/codex-flow 时代资产给出逐条 keep/downgrade/replace/remove 结论和回滚条件
- **Governance Evidence**: 新增任务包和 `.harness/evidence/` 证据/review，覆盖本次退役审查

### Changed
- **workflow-routing.md**: 重写——去除重复粘贴的 Core Model/Decision Tree 段落；OMX（$deep-interview/$ralplan/$ultragoal/$team/$ralph）和 codex-flow 从活跃路由移除，路由改为 capability 表述（plan-first、subagent/workflow 扇出）；"codex-flow Contract" 替换为工具无关的 "Parallel Fan-Out Contract"
- **harness-methodology.zh.md**: 修复重复的 §8 编号（Context Engineering→§9、最佳实践→§10）；§5 文档地图更新为当前真实文件名；§9.3 subagent 强制路由表降级为原则表述
- **tool-adapter-matrix.md/.zh.md**: Planning/parallel/execution/browser-evidence 各行去除 OMX、superpowers、codex-flow、gstack 绑定；修复 en 版缺失 grill-me 行的中英漂移
- **task-packet-spec / verification-evidence-spec**: Superpowers/OMX/codex-flow plan references 措辞降级为 legacy（历史工件仍有效，校验行为不变）
- **task-delegation-template.md**: adapter 枚举去除 OMX lane
- **superpowers-migration.md**: 追加 2026-07-15 再审计附录，推翻 2026-06-15 "全部保留" 结论
- **skills/impeccable/SKILL.md**: 去除对已删除 `ui-ux-pro-max` 的引用
- **AGENTS.md**: 去除 OMX 管理标记（`OMX:AGENTS-INIT:MANAGED`/`MANUAL` 注释），转为普通治理文档；layout 描述更新为当前真实目录（含 retirement-reviews/、.harness/，去除不存在的 rules/）

### Removed
- **46 个零引用 skill 目录**: 37 个 gstack-* vendored 副本、4 个 openspec-*、ui-ux-pro-max、4 个一次性 cutover/drift skills（backport-to-base、docs-cutover、workspace-cutover、triage-base-drift）、pantheon-base-foundation、pantheon-workspace-routing；`skills/` 仅保留 `grill-me` 和 `impeccable`
- **codex-workflow-quick-reference.md**: codex-flow 专属操作手册，随 codex-flow 路由退役

---

## [1.3.0] — 2026-06-27

### Added
- **Workflow Templates**: 新增 `workflow-templates.md`，包含 L0/L1/L2/UI/Bug Fix/Proto First 6 个工作流模板
- **CI/CD Integration Guide**: 新增 `ci-cd-integration.md`，包含 CI/CD 门禁矩阵、Pipeline 流程、本地预检命令
- **Proto First Development**: 新增 `proto-driven-development.md`，定义原型驱动开发模式
- **Branch and PR Workflow**: 新增 `branch-pr-workflow.md`，包含分支命名规范、PR 创建流程、PR 模板
- **Governance Evidence**: 新增 3 份任务包和对应 `.harness/evidence/` 证据/review，覆盖 migration hardening、frontmatter migration、known issue closure
- **Document Frontmatter Gate**: 新增并验证 YAML frontmatter gate，要求治理文档声明 `title`、`doc_type`、`layer`、`status`、`updated_at`
- **Graph and Visual Evidence Gates**: 新增 graph-review artifact consistency 和 visual-evidence not-applicable 回归覆盖
- **Release Notes Template**: 新增固定 GitHub Release 命名与正文模板，Release 标题统一为 `vX.Y.Z`

### Changed
- **WORKFLOW_ROUTING.md**: 新增 Proto First 路由入口、Proto First 到 Routing Matrix
- **CODEX_WORKFLOW_QUICK_REFERENCE.md**: 新增 Proto First 相关命令说明
- **Project Identity**: 将独立方法论壳重命名并加固为 `pantheon-harness`
- **Architecture Docs**: 将 30 个 `architecture/harness` legacy metadata 文档迁移到 YAML frontmatter
- **Validation Scripts**: 加强 adoption、method-health、doc inventory、sync drift、task packet、evidence、review 等 gate 的当前 layout 支持

### Fixed
- 修复 hardening artifact 中过期的 frontmatter follow-up / known gap
- 修复 graph-review task/evidence/review 元数据漂移
- 修复 `check-visual-evidence` 对显式 non-UI 方法文档任务的误判

### Synchronized to pantheon-base
- 同步工作流模板到相关文档

## [1.2.0] — 2026-06-26

### Added
- **Context Engineering Guide**: 新增 `context-engineering-guide.md`，包含 CLAUDE.md 大小控制、懒加载规则、上下文预算、Subagent 使用场景
- **Agentic Best Practices Reference**: 新增 `agentic-best-practices-reference.md`，对比 Claude Code、OpenAI Codex 和 Pantheon Harness 最佳实践

### Changed
- **HARNESS_METHODOLOGY.zh.md**: 新增第 8 节 Context Engineering 规范（Plan First、Subagent 使用、Evidence First）、第 9 节最佳实践参考对比表
- **WORKFLOW_ROUTING.md**: 新增 Context Budget 考虑、Subagent 路由规则、Evidence Gate、Plan Mode 触发条件
- **TASK_PACKET_SPEC.md**: Context Strategy 新增 Subagent Usage 字段说明

### Synchronized to pantheon-base
- 同步 Context Engineering 规范到相关文档

## [1.1.0] — 2026-06-26

### Added
- **Task Packet 增强字段**: 新增 priority、estimatedComplexity、technicalDebtFlag、dependencies（blockedBy/blocks）、rollBackPlan
- **Task Packet 边界量化**: 新增 Scope Quantification（模块数、文件数、API 端点数、数据库迁移）
- **Verification Evidence 增强结构**: 新增 commands.log、artifacts/、_meta.yaml 目录结构
- **Evidence 质量标准**: 截图标准（日志标准、命令输出标准）
- **Negative Evidence 处理**: verificationSkipped 字段定义和规则
- **HANDOFF_PROTOCOL.md**: Agent 间交接协议（交接触发条件、状态机、检查清单）
- **ERROR_RECOVERY_STRATEGY.md**: 错误恢复策略（L1-L4 分类、恢复流程、回滚机制）
- **bootstrap-harness.mjs**: 方法自举脚本，帮助新项目快速初始化 harness

### Changed
- **HARNESS_METHODOLOGY.zh.md**: 增强质量门禁矩阵（按 L0/L1/L2 档位差异化配置）、新增 Human Gate 标准
- **CONTEXT_ENGINEERING_PROTOCOL.zh.md**: 新增版本信息
- **TASK_PACKET_SPEC.md**: 新增 v1.1 版本字段
- **VERIFICATION_EVIDENCE_SPEC.md**: 新增 v1.1 增强结构

### Synchronized to pantheon-base
- AI_QUALITY_GOVERNANCE.md: 新增方法论同步说明、质量门禁矩阵
- TASK_PACKET_SPEC.md: 同步 v1.1 增强字段
- VERIFICATION_EVIDENCE_SPEC.md: 同步 v1.1 增强结构
- HANDOFF_PROTOCOL.md: 新增交接协议
- ERROR_RECOVERY_STRATEGY.md: 新增错误恢复策略

## [1.0.0] — 2026-06-15

### Added
- **三权分立模型**：人（需求+验收）+ Claude（规划+审查）+ Codex（执行）的硬边界
- **Claude/Codex 写边界表**：明确 Claude 能改和不能改的文件类别
- **Task Packet 模板**：标准化 Claude→Codex 任务委派格式（最小/完整/SonarQube 修复）
- **非程序员验收清单**：6 维 20 项检查，不读代码也能验收
- **SonarQube 排除规则文档化**：6 条规则全量注释原因+日期+可删除条件
- **质量门禁矩阵**：Go test / TS / Lint / Build / SonarQube / Smoke / UI / Security 8 项门禁
- **OMX 配置标准化**：29 skills + 37 prompts + Explore Harness 警告消除
- **文档分层体系**：方法论→harness-engineering、平台→pantheon-base、业务→pantheon-ops
- **演化机制**：VERSION + CHANGELOG + 月度复盘模板 + 三次重复即固化规则

### Changed
- `CLAUDE.md` 新增 §三权分立 和 §Methodology 索引段
- `sonar-project.properties` 全面注释 + `sonar.qualitygate.wait=true`
- Workspace `docs/` 从 20 个文件精简为 3 个协调文档

### Removed
- 清理 workspace `docs/` 下已过时的分析方法报告
- 归档 Claude Code 最佳实践材料到 `archive/references/`

### Fixed
- OMX explore harness Windows 警告（设置 `OMX_EXPLORE_BIN`）
- OMX prompts/skills 数量从 4/6 补齐到 37/29

### Known Issues
- PR #73 smoke test selector 待修复（等待委派 Codex 执行）
- Claude 直接修改 `prefetch.ts` + `smoke spec` 的违规已记录
