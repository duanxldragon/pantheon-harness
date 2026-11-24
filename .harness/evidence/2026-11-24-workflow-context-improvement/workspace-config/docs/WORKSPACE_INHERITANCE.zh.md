# Pantheon 工作区继承规则

English version: [WORKSPACE_INHERITANCE.md](./WORKSPACE_INHERITANCE.md)

## 仓库所有权

- `pantheon-harness`：可携带的方法、工作流、协同工具。
- `pantheon-base`：`platform`、`system/*`、共享前后端与验收合同的唯一权威，发布不可变 foundation release。
- `pantheon-ops`：消费正式锁定的 Base 快照，通过声明式 business overlay 扩展业务。

## 当前事实与阅读路径

先读目标仓库 `AGENTS.md`、当前 `.harness/STATUS.md` 和任务索引，再从 docs 索引选择相关合同、设计和验收。L0 读局部规则；L1 用目标/In/Out/验证短记录；L2 使用已有 task packet、证据和审查。架构/UI 决策补读 DESIGN 对应章节。

- Base：仓库 AGENTS → 当前任务 → docs/README 按任务路由。
- Ops：仓库 AGENTS → PROJECT_INHERITANCE → 当前业务任务/设计。兼容性以锁定快照的继承合同为准；sibling Base HEAD 文档只说明演进方向，差异必须标明。
- Harness：仓库 AGENTS → README → 对应 policy/script；方法概览位于 `pantheon-harness/architecture/methodology/harness-methodology.zh.md`。

产品版本、正式发行、消费版本分别看 VERSION、官方发行证据、foundation-release.lock.json。历史检查点不能代表今天状态；manifest 是任务状态来源，先读最新 summary，再按需读原日志。

## 最小任务输入

```text
目标仓库与层级：
用户场景/目标：
In / Out：
验收标准：
已有 task-id / 当前候选：
同步要求：
```

维护者在需求/范围、门禁策略、最终功能/视觉验收三个触点介入。已有任务复用原 packet，范围内安全可逆工作自主推进。

## 正式继承流程

共享问题先改 Base，验证并正式发行后再消费。Ops 的 PROJECT_INHERITANCE 是唯一升级 runbook。在 Ops 根目录执行：

```powershell
npm run fetch:base-release -- --release <official-release-tag>
npm run rebuild:from-base -- --target .tmp/clean-base-overlay
npm run check:business-overlay -- --root .tmp/clean-base-overlay
npm run check:shared-drift -- --root .tmp/clean-base-overlay
```

完整 CGO/race、前端、业务运行态验收通过且替换获授权后，才能替换工作树。禁止从 Base HEAD 手抄、cherry-pick 或手合共享文件。业务所有权由 business-overlay.json 声明。

方法消费与产品发行独立：receipt 固定七份 policy 的哈希和 CI 使用的完整 Harness sourceCommit；在声明的 sibling 路径提供同一 Git 快照，正常验证不刷新 receipt。新 pin 先审查；未发布 helper/checker 另行发行，policy receipt 不能证明它们已发布。

## 同步完成标准

正确仓库与档位、范围内同步、同候选验证、明确运行态/视觉 gap、正式 release/rebuild 后续或有负责人延期，全部可追溯。手动工具、CI 配置、实际 job 结果、合并必过检查分别说明；归档不代签产品验收。
