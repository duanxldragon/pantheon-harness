# Changelog

Pantheon Harness 方法论变更记录。按 semver 管理。

格式灵感：[Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

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
