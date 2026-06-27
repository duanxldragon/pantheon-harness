---
title: Harness Method Playbook
doc_type: Playbook
layer: method
status: Active
updated_at: 2026-06-27
---

# Harness Method Playbook

English version: [harness-method-playbook.en.md](./harness-method-playbook.en.md)

本文件不再承载完整方法定义。

## 当前关系

- `patterns/`：唯一方法源，负责方法编排、模板、schema、portable checks
- `docs/harness/*`：当前仓库的 repo-local 合同与落地层
- `scripts/harness/*`：当前仓库的 mechanical gates

## 阅读顺序

1. 先读 `patterns/README.zh.md`
2. 再读 `patterns/harness-core-model.zh.md`
3. 再读 `patterns/execution-guardrails.zh.md`
4. 再读 `patterns/context-engineering-protocol.zh.md`
5. 再读 `patterns/method-first-delivery-policy.zh.md`
6. 再读 `patterns/minimal-complexity-ladder.zh.md`
7. 再读 `patterns/harness-coverage-model.zh.md`
8. 再读 `patterns/cross-agent-ratchet-model.zh.md`
9. 再读 `patterns/design-dev-qa-github-governance.zh.md`
10. 再读 `patterns/human-agent-collaboration-platform-assessment.zh.md`
11. 再读 `patterns/harness-template-taxonomy.zh.md`
12. 再读 `patterns/tool-adapter-matrix.zh.md`
13. 再读 `patterns/method-playbook.zh.md`
14. 再读当前仓库需要落地执行的合同：
   - `HARNESS_ENGINEERING_CONTRACT.md`
   - `TRIVIALITY_CLASSIFICATION_POLICY.md`
   - `TASK_PACKET_SPEC.md`
   - `VERIFICATION_EVIDENCE_SPEC.md`
   - `REVIEW_LOOP_SPEC.md`
   - `VISUAL_QUALITY_PROTOCOL.md`
   - `VISUAL_EVIDENCE_PROMOTION_POLICY.md`
   - `FAILURE_RATCHET_POLICY.md`
   - `FAILURE_REGISTRY_PROMOTION_POLICY.md`
   - `HARNESS_RETIREMENT_REVIEW.md`
15. 如果当前仓库采用项目专属 overlay，再读取 overlay-owned protocols、checker 和升级规则。

## 默认执行护栏

在进入实现前，默认先过一遍 `patterns/execution-guardrails.zh.md`：

- 先区分 confirmed facts、working assumptions 和 open questions，不要静默猜测。
- 先走 `patterns/minimal-complexity-ladder.zh.md`，把方案压到最小可承重复杂度。
- 先按 `patterns/context-engineering-protocol.zh.md` 明确 entry sources、检索顺序和敏感上下文边界。
- 先声明 `Do Not Touch` 边界，再做手术式改动。
- 先写 `Success Criteria` 和 `Verification Plan`，再把完成定义落到证据上。

## 当前仓库职责

当前仓库保留这些内容，是因为它们直接服务本仓库运行：

- `docs/harness/*`：合同、格式、治理规则
- `scripts/harness/*`：校验器和 CI 门禁
- 新增 generic gates：review、template health、runtime evidence、docs links、sync drift
- `.agents/*` / `.codex/skills/*`：工具适配层

如果方法层与仓库落地层出现冲突，以 `patterns/` 的方法定义为先，再同步仓库落地层。

