# Superpowers → OMX 迁移清单

> 盘点日期：2026-06-15
> 盘点范围：全部 Superpowers 时代遗留资产

## 一、Global Codex Skills（5 个）

所有 Codex skills 均保留，它们与 OMX 的 Skill 体系互补，不存在冲突。

| Skill | 位置 | 状态 | 说明 |
|---|---|---|---|
| `impeccable` | `~/.codex/skills/impeccable/` | ✅ 保留 | UI 质量门禁，Harness 方法论核心 |
| `business-defect-audit` | `~/.codex/skills/business-defect-audit/` | ✅ 保留 | 业务逻辑深度审计，Pantheon Ops 验收需要 |
| `open-code-review` | `~/.codex/skills/open-code-review/` | ✅ 保留 | 基于 alibaba/ocr 的 AI code review，补充 OMX 的 `$code-review` |
| `parallel-fix` | `~/.codex/skills/parallel-fix/` | ✅ 保留 | 并行修复清单，适合审计后批量修复 |
| `codex-primary-runtime` | `~/.codex/skills/codex-primary-runtime/` | ✅ 保留 | OMX 运行时依赖 |

**结论：0 个需要删除，5 个全部保留。**

## 二、pantheon-base 设计文档（12 个）

位于 `pantheon-base/docs/superpowers/specs/` 和 `plans/`。

| 文件 | 类型 | 状态 | 处理 |
|---|---|---|---|
| 2026-05-12-iam-remediation-and-config-governance-design | spec | 📦 历史参考 | PR #73 已实现，保留作为设计考古 |
| 2026-05-13-platform-config-governance-and-lowcode-design | spec | 📦 历史参考 | 已实现或后续迭代 |
| 2026-05-16-language-session-and-cross-page-selection-design | spec | 📦 历史参考 | i18n/语言偏好已部分实现 |
| 2026-05-20-base-governance-and-security-audit-remediation-design | spec | 📦 历史参考 | 安全审计修复已实现 (PR #73) |
| 2026-06-04-foundation-release-bundles-and-upgrade-design | spec | 📦 历史参考 | Foundation release 流程 |
| 2026-06-06-github-quality-and-sonar-refactor-design | spec | 📦 历史参考 | Sonar refactor 已执行 |
| 2026-06-03-main-sonar-priority-batches | plan | 📦 历史参考 | Sonar 优先级批次 |
| 2026-06-03-main-sonar-remediation-method | plan | 📦 历史参考 | → **该方案已被 `sonar-remediate` Skill 取代** |
| 2026-06-11-feature-ledger-and-ratchet-plan | plan | 📦 历史参考 | Feature ledger 已实现 (PR #73) |

**结论：全部标记为历史参考，不需要删除。`sonar-remediation-method` 的方法已固化到新 Skill。**

## 三、pantheon-harness 设计文档（5 个）

位于 `pantheon-harness/docs/superpowers/specs/` 和 `plans/`。

| 文件 | 类型 | 状态 | 处理 |
|---|---|---|---|
| 2026-05-21-harness-best-practice-hardening-design | spec | 📦 历史参考 | 方法论硬化的早期设计 |
| 2026-05-22-harness-best-practice-hardening | plan | 📦 历史参考 | → 已被 v1.0.0 方法论取代 |
| 2026-06-03-harness-ratchet-and-retirement-upgrade | plan | 📦 历史参考 | Ratchet 升级已完成 |
| 2026-06-08-delivery-governance-loop-design | spec | 📦 历史参考 | |
| 2026-06-08-delivery-governance-loop | plan | 📦 历史参考 | |

**结论：全部标记为历史参考。**

## 四、Superpowers Plugin 运行时（OMX 安装）

`superpowers@openai-curated` 插件已安装（OMX plugin list 中可见），作为 OMX 的底层插件。不影响正常工作，但会产生大量 Superpowers prompt 注入到 Codex 子任务中（如 `using-superpowers` Skill 强制检查）。

### 建议

现状可以保留。如果子任务启动太慢（每次都检查 Superpowers Skill），可以：
1. 在 `config.toml` 中 disable superpowers plugin
2. 或在 Task Packet 中加 `skip skill checks` 指令

## 总结

| 类别 | 数量 | 保留 | 删除 | 取代 |
|---|---|---|---|---|
| Global Skills | 5 | 5 | 0 | 0 |
| 设计文档 | 17 | 17 | 0 | 1 (方案→Skill) |
| **合计** | **22** | **22** | **0** | **1** |

结论：没有需要丢弃的资产。Superpowers 时代的所有沉淀都有历史价值或仍在活跃使用。唯一的"进化"是将 sonar-remediation 的手动流程升级为标准化 Skill。
