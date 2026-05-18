# Harness Method Playbook

类型：Playbook
归属层：platform
状态：Active

本文件不再承载完整方法定义。

## 当前关系

- `agentic-method-kit/`：唯一方法源，负责方法编排、模板、schema、portable checks
- `docs/harness/*`：当前仓库的 repo-local 合同与落地层
- `scripts/harness/*`：当前仓库的 mechanical gates

## 阅读顺序

1. 先读 `agentic-method-kit/README.md`
2. 再读 `agentic-method-kit/METHOD_PLAYBOOK.md`
3. 再读当前仓库需要落地执行的合同：
   - `HARNESS_ENGINEERING_CONTRACT.md`
   - `TASK_PACKET_SPEC.md`
   - `VERIFICATION_EVIDENCE_SPEC.md`
   - `REVIEW_LOOP_SPEC.md`
   - `VISUAL_QUALITY_PROTOCOL.md`

## 当前仓库职责

当前仓库保留这些内容，是因为它们直接服务本仓库运行：

- `docs/harness/*`：合同、格式、治理规则
- `scripts/harness/*`：校验器和 CI 门禁
- `.agents/*` / `.codex/skills/*`：工具适配层

如果方法层与仓库落地层出现冲突，以 `agentic-method-kit/` 的方法定义为先，再同步仓库落地层。
