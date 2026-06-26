# Harness 脚本目录

English version: [README.md](./README.md)

这个目录只放可移植 Harness Engineering 方法检查脚本。

`agentic-method-kit/` 是方法事实源；这里是通用执行层 sensor，覆盖 task packet、evidence、review closure、文档完整性、方法健康度、runtime/visual evidence 等。项目专属检查应放在 `sample-overlays/pantheon/` 这类可选 overlay 中。

## 当前脚本

| Script | 用途 |
|---|---|
| `check-task-packet.mjs` | 校验 task packet 结构和 linkage。 |
| `check-evidence.mjs` | 校验 `.harness/evidence/**/commands.json`。 |
| `check-review.mjs` | 校验 machine-readable review artifact。 |
| `check-graph-review.mjs` | 校验 task/evidence/review 的结构范围闭环。 |
| `scaffold-graph-review.mjs` | 从 task packet 或导入结果生成 graph review 字段。 |
| `build-graph-review-import.mjs` | 规范化保存或实时获取的 graph review 输出。 |
| `check-template-health.mjs` | 校验通用 template governance 落地文件。 |
| `check-runtime-evidence.mjs` | 报告 runtime-sensitive 任务缺少 runtime evidence 或显式 gap。 |
| `check-doc-links.mjs` | 校验方法文档内部 Markdown 链接。 |
| `check-doc-inventory.mjs` | 校验脚本和文档清单覆盖度。 |
| `check-sync-drift.mjs` | 校验根脚本与 repo-shell 镜像脚本是否漂移。 |
| `check-visual-evidence.mjs` | 报告 UI/visual evidence 缺口。 |
| `check-adoption.mjs` | 校验通用方法 adoption 入口和 task/evidence linkage。 |
| `check-method-health.mjs` | 校验 method-kit 与 repo-shell 版本和落地文件健康度。 |
| `check-failure-registry.mjs` | 按可移植 taxonomy 校验 failure registry 表格。 |
| `check-doc-frontmatter.mjs` | 校验 governed Markdown frontmatter 约定。 |

## 常用命令

```powershell
node scripts/harness/check-task-packet.mjs --root .
node scripts/harness/check-evidence.mjs --strict --root .
node scripts/harness/check-review.mjs --strict --root .
node scripts/harness/check-failure-registry.mjs --strict --root .
node scripts/harness/check-method-health.mjs --strict --root .
node scripts/harness/check-adoption.mjs --strict --root .
node scripts/harness/check-doc-links.mjs --strict --root .
node scripts/harness/check-doc-inventory.mjs --strict --root .
node scripts/harness/check-sync-drift.mjs --strict --root .
node --test scripts/harness/*.test.mjs
```

所有检查脚本都支持 `--root <path>`，方便在 fixture 或下游仓库中运行。支持 JSON 的检查脚本可加 `--json`。

## Policy 关联

- trivial / non-trivial 判定：[`docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md`](../../docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md)
- visual evidence 晋升规则：[`docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md`](../../docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md)
- failure registry 晋升规则：[`docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md`](../../docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md)
- retirement review：[`docs/harness/HARNESS_RETIREMENT_REVIEW.md`](../../docs/harness/HARNESS_RETIREMENT_REVIEW.md)

## 边界

不要把应用专属扫描器放进这里。只要某个检查依赖特定技术栈、架构、路由布局、权限模型、CI 供应商或产品仓库，就应打包成 overlay，并保持可移植方法门禁独立。
