---
title: Harness Method Playbook
doc_type: Playbook
layer: method
status: Active
updated_at: 2026-07-26
---

# Harness Method Playbook

English version: [harness-method-playbook.en.md](./harness-method-playbook.en.md)

本文件是方法的一页入口，不承载完整方法定义。原则：入口要短，深度靠链接。

## 文档源与语言

- `patterns/`：唯一方法源，负责方法编排、模板、schema、portable checks
- `docs/harness/*`：当前仓库的 repo-local 合同与落地层
- `scripts/harness/*`：当前仓库的 mechanical gates
- 语言政策（2026-07-26 起）：中文文档为 canonical，英文文档为 best-effort 投影；中英不一致时以中文为准，并回填英文

如果方法层与仓库落地层出现冲突，以 `patterns/` 的方法定义为先，再同步仓库落地层。

## 按档位进入

任务到达后，先按 [solo-delivery-tiers](../methodology/solo-delivery-tiers.md) 定档，再只读当前档位需要的文档：

| 档位 | 必读 | 触发时加读 |
|---|---|---|
| `L0` direct change | 无需额外阅读，按 L0 closeout 要求执行 | 触碰任何边界即升级 `L1`/`L2` |
| `L1` lean delivery | [execution-guardrails](../../patterns/execution-guardrails.zh.md) | UI 工作加 `impeccable`；结构性问题用 CodeGraph |
| `L2` full governance | [task-packet-spec](./task-packet-spec.md)、[verification-evidence-spec](./verification-evidence-spec.md)、[review-loop-spec](./review-loop-spec.md) | 按 [workflow-routing](../methodology/workflow-routing.md) 选 lane 和 gate |
| `Proto First` 探索原型 | [proto-driven-development](../methodology/proto-driven-development.md) | 收敛后按落地档位补 artifact |

人类维护者只出现在三个触点（需求澄清、门禁决策、最终验收），中间全程自治：见 [workflow-routing — Human Touchpoints](../methodology/workflow-routing.md#human-touchpoints)。

## 默认执行护栏

进入实现前，默认过一遍 [execution-guardrails](../../patterns/execution-guardrails.zh.md)：

- 先区分 confirmed facts、working assumptions 和 open questions，不要静默猜测。
- 先走 [minimal-complexity-ladder](../../patterns/minimal-complexity-ladder.zh.md)，把方案压到最小可承重复杂度。
- 先按 [context-engineering-protocol](../../patterns/context-engineering-protocol.zh.md) 明确 entry sources、检索顺序和敏感上下文边界。
- 先声明 `Do Not Touch` 边界，再做手术式改动。
- 先写 `Success Criteria` 和 `Verification Plan`，再把完成定义落到证据上。

## 深入阅读（按需，不是顺序要求）

按主题查阅方法源：

- 核心模型：[harness-core-model](../../patterns/harness-core-model.zh.md)
- 交付顺序与棘轮：[method-first-delivery-policy](../../patterns/method-first-delivery-policy.zh.md)、[cross-agent-ratchet-model](../../patterns/cross-agent-ratchet-model.zh.md)、[harness-coverage-model](../../patterns/harness-coverage-model.zh.md)
- 治理与协作：[design-dev-qa-github-governance](../../patterns/design-dev-qa-github-governance.zh.md)、[human-agent-collaboration-platform-assessment](../../patterns/human-agent-collaboration-platform-assessment.zh.md)
- 模板与适配：[harness-template-taxonomy](../../patterns/harness-template-taxonomy.zh.md)、[tool-adapter-matrix](../../patterns/tool-adapter-matrix.zh.md)、[method-playbook](../../patterns/method-playbook.zh.md)

当前仓库落地执行的合同（`docs/harness/` 为阅读入口，canonical 在本目录）：

- [harness-engineering-contract](./harness-engineering-contract.md)
- [triviality-classification-policy](./triviality-classification-policy.md)
- [task-packet-spec](./task-packet-spec.md)
- [verification-evidence-spec](./verification-evidence-spec.md)
- [review-loop-spec](./review-loop-spec.md)
- [visual-quality-protocol](./visual-quality-protocol.md)
- [visual-evidence-promotion-policy](./visual-evidence-promotion-policy.md)
- [failure-ratchet-policy](./failure-ratchet-policy.md)
- [failure-registry-promotion-policy](./failure-registry-promotion-policy.md)
- [harness-retirement-review](./harness-retirement-review.md)

如果当前仓库采用项目专属 overlay，再读取 overlay-owned protocols、checker 和升级规则。

## 当前仓库职责

当前仓库保留这些内容，是因为它们直接服务本仓库运行：

- `docs/harness/*`：合同、格式、治理规则
- `scripts/harness/*`：校验器和 CI 门禁
- 新增 generic gates：review、template health、runtime evidence、docs links、sync drift
- `.agents/*` / `.codex/skills/*`：工具适配层
