# Better Harness 对 Pantheon Harness 的证据化评估

> 评估日期：2026-08-04
> Pantheon 基线：v1.4.0
> Better Harness 基线：[`4cd2fdb`](https://github.com/QoderAI/better-harness/tree/4cd2fdb340631ebc726d1f7b617f997511aca9e8)，npm `0.4.0`，MIT
> 评估范围：只评估 `pantheon-harness`；不改 `pantheon-base`、`pantheon-ops`，不执行吸收项实现

## 1. 结论

Better Harness 不是 Pantheon Harness 的替代品，也不只是一个“诊断层”。更准确的区别是：

- **Pantheon 是合同和治理优先**：六个 control plane、Task Packet、L0/L1/L2、角色分离、Human Gate、跨仓继承和 evidence linkage 已经形成明确的交付约束。
- **Better Harness 是观测和产品化优先**：它把 Task Episode、证据强度、学习闭环、宿主采集、静态分析、报告和 finding-bound repair 做成了可运行产品。

因此最值得吸收的不是上游的完整 CLI、固定三 agent 流程或可视化报告，而是以下四类能力：

1. **方法机制有效性状态**：区分“存在、接线、用过、效果被后续结果支持”。
2. **Ratchet 的 owner 路由与纵向验证**：扩展现有 Failure Registry，不另建平行体系。
3. **Task Episode**：用小型、隐私受控的 episode artifact 证明方法改动是否真的改善交付。
4. **CodeGraph-backed 高影响验证**：吸收 core/test-mapping 的判定规则，不引入第二套 tree-sitter 图引擎。

本评估不建议现在引入 0-100 成熟度评分、固定三 agent 采证、全宿主插件矩阵、HTML/Canvas 产品面或默认读取私人会话。

## 2. 证据与判断边界

### 2.1 已直接验证的事实

- Pantheon 将 Harness 定义为 repo-owned guides、sensors、state、gates、templates 和 review loops，并已有六个 control plane。[P1]
- Pantheon 的 Task Packet 已包含 rollback、state、verification、linkage、evidence、session economics 和 Human Gate。[P2]
- Pantheon 已有 Failure Registry、专用 checker、schema 和 `ratchetDecision`；“Ratchet 只有一句原则、没有工具”不成立。[P3][P4]
- Pantheon 的 `check-method-health.mjs` 当前主要检查必需文件、版本兼容和少量边界，尚不判断机制是否真实接线、运行或产生效果。[P5]
- Pantheon 已有 graph review 的 task/evidence/review 三方一致性检查，支持 `cycle`、`hub`、`call-depth`、`sensitive-flow`。[P6]
- Better Harness 将 Task Episode 定义为一个用户目标和一个验收边界，并要求行为结论来自 reviewed Task Episodes。[B1]
- Better Harness 的证据状态是评估 check/dimension 的证据合同，不是每条原始命令的 pass/fail 字段。[B2]
- Better Harness 的 Loop Discovery 会先检查现有覆盖，再选择最小持久 owner；证据不足时返回 `Needs more evidence`。[B3]
- Better Harness 明确区分宿主壳、configured-asset provider、session adapter、输出模式和 support level；WorkBuddy 没有安装壳或 verified Quickstart。[B4]
- Better Harness 的 core-change-watch 明确要求静态证据与执行证据分开，不能从静态图推导测试、CI 或运行态健康。[B5]
- Better Harness 不是纯只读诊断器：它同时提供 finding-bound fix、manual direct fix、secret guard 和 test-mapping Hook。[B6]

### 2.2 推断

- Pantheon 当前的主要缺口不是“缺方法”，而是**缺少证明方法机制有效的纵向证据**。置信度：高。
- Better Harness 的五维 Agent Work Loop 适合作为 Pantheon 六 control plane 的评估 lens，不适合作为替代 taxonomy。置信度：高。
- Pantheon 可优先复用 CodeGraph、现有 graph review 和 evidence linkage，而无需复制 Better Harness 的 tree-sitter 分析栈。置信度：高。
- 会话采集的潜在价值存在，但在 Pantheon 中必须以 opt-in、最小保留和宿主级 adapter 为前提。置信度：中。

### 2.3 未知

- Better Harness 的 source/tests 能证明机制已实现，不能证明它已在多个真实项目中带来稳定的交付改善。
- 本次没有评估 Pantheon 方法在 `pantheon-base`、`pantheon-ops` 的实际 adoption effectiveness。
- 当前 Windows 环境不能创建测试符号链接；上游 5 个 symlink 场景未执行到断言，不能据此判定通过或缺陷。

## 3. 六控制面能力映射

| Pantheon control plane | Pantheon 已有能力 | Better Harness 补充视角 | 实际缺口 | 结论 |
|---|---|---|---|---|
| Instruction | AGENTS、tool adapter docs、doc inventory/frontmatter/link gates | agent-lint、AGENTS/Skill/Hook/MCP inventory、宿主 provider | Pantheon 能检查资产是否存在和链接是否健康，但缺少配置资产的语义质量与激活证据 | `experiment`：先做最小 agent-asset lint，不复制全 provider 体系 |
| Task | Task Packet、In/Out、结构范围、停止点、状态和 linkage | Task Episode、request/acceptance/session/project 证据重建 | 缺少跨 session/result 的统一 episode identity | `experiment`：在方法改进任务中试点 episode manifest |
| Execution | Planner/Generator/Reviewer 边界、Human Gate、adapter 文档 | supported operation、permission boundary、sensitive-write、secret guard | 高风险写入主要靠约定，缺少宿主可执行 pre-write sensor | `adapt`：先定义宿主无关合同，再按需做 adapter |
| Verification | commands.json、runtime/UI/graph evidence、strict gates | evidence state、core-change-watch、test mapping、post-repair revalidation | 方法健康仍偏存在性；graph evidence 尚未自动连接 affected tests | `adapt`：方法状态分层 + CodeGraph evidence pack |
| Review | machine-readable review、结构审查、evidence linkage、Human acceptance | evidence-bound findings、独立 repair verification、renderer quality gates | 缺少跨方法评估可复用的 finding schema；不缺 HTML 报告 | `experiment`：只做轻量 findings artifact，暂不做 renderer |
| Governance | Failure Registry、coverage review、Ratchet、evolution cadence | Loop Discovery、intervention ledger、Learning Capture、later validation | 已有 registry，但 owner readiness、后续效果和 cadence sensor 不完整 | `adapt`：扩展现有 registry/coverage review，优先级最高 |

## 4. 候选项决策

| # | 候选能力 | 决策 | 优先级 | 置信度 | 核心理由 |
|---|---|---|---|---|---|
| 1 | `Present/Wired/Exercised/Outcome-supported` 方法状态 | `adapt` | P0 | 高 | 直接补足 method-health 的存在性局限，但应属于方法评估，不属于每条命令 |
| 2 | Loop Discovery owner 路由 | `adapt` | P0 | 高 | 现有 Failure Registry 可承载；无需创建新 taxonomy |
| 3 | Task Episode + intervention ledger | `experiment` | P1 | 高 | 能支持纵向效果判断，但隐私、identity 和采集成本需先试点 |
| 4 | CodeGraph-backed core/test evidence pack | `adapt` | P1 | 高 | 现有 graph review 和 CodeGraph 已具备落点；不需要复制图引擎 |
| 5 | Sensitive-write + secret guard | `adapt` | P1 | 中高 | Pantheon 有 Human Gate/rollback，但 pre-write mechanical control 仍弱 |
| 6 | 宿主 capability/support level 矩阵 | `adapt` | P1 | 高 | 能阻止“有文档 adapter = 已验证宿主支持”的过度声明 |
| 7 | 隐私受控 session evidence | `experiment` | P2 | 中 | 有价值，但必须 opt-in，且不能把 user-home transcript 变成默认依赖 |
| 8 | Agent asset lint | `experiment` | P2 | 中 | 可补语义质量检查；先由真实 drift/failure 驱动规则 |
| 9 | 轻量 evidence-bound findings schema | `experiment` | P2 | 中 | 便于方法审查复用；先验证是否比现有 review artifact 增值 |
| 10 | 固定三 agent 独立采证 | `reject`（默认） | - | 高 | Evidence domain separation 值得保留，固定 agent 数量破坏工具无关和成本适配 |
| 11 | 立即采用 0-100 Loop Effectiveness | `reject`（当前） | - | 高 | 没有可比 Task Episodes 时产生错误精度和激励扭曲 |
| 12 | 全量 npm/插件/HTML/Canvas 产品面 | `reject`（当前） | - | 高 | 没有 Pantheon 消费者、发布 owner 和 DX 需求证据 |
| 13 | 复制 tree-sitter 图分析栈 | `reject` | - | 高 | 与 CodeGraph 和现有 graph review 重复，新增依赖与维护面 |

### 4.1 Owner、验证和非目标

下表中的 owner 是未来任务的建议落点，不表示本评估已经批准实现。

| # | 建议 owner | 验证路径 | 明确非目标 |
|---|---|---|---|
| 1 | `portable-method` coverage review + `check-method-health` | schema/fixture/checker tests；至少两个可比 episode 的 later outcome | 不修改每条 command 状态；不计算总分 |
| 2 | 现有 Failure Registry + registry checker | owner/readiness/state/evaluation/stop 字段 fixture；coverage review closeout | 不新建 Loop Discovery taxonomy；不自动创建 Skill/Agent |
| 3 | Task Packet/evidence/review linkage owner | stable identity、linkage、redaction、retention tests；两个可比任务 fixture | 不保留 raw prompt、session id 或 user-home transcript |
| 4 | graph review + CodeGraph adapter | affected-test fixture；advisory/blocking case；执行命令与静态选择一致性 | 不复制 parser；不以静态图代替测试执行 |
| 5 | protected-write method contract + 单一宿主 adapter | allowed/blocked/redacted/scoped-write/rollback tests | 不一次覆盖所有宿主；不把低置信正则命中全部 fail-closed |
| 6 | `config/agents` adapter governance | support declaration schema；每个 claimed level 的 install/discovery/session/Quickstart smoke | 不把 adapter 文档等同于已安装或已验证支持 |
| 7 | 单一 opt-in host adapter + privacy owner | workspace match、bounded sample、redaction、retention、debug exclusion tests | 不默认读取私人会话；不提交 raw transcript |
| 8 | agent asset inventory/adoption checker | 从真实 drift 提取的低误报 fixture；positive/negative activation cases | 不复制完整 provider inventory；不按资产数量评分 |
| 9 | verification/review artifact owner | schema/checker fixture；finding 到 evidence/verifier/repair boundary 的闭环 | 不先建 HTML/Canvas renderer；不允许 finding 由分数生成 |
| 10 | `no-action`；任务编排器按风险决定 | 用不同规模任务比较证据覆盖、成本和遗漏率 | 不固定 agent 数量；不把并行当质量证据 |
| 11 | `no-action`，由 method-effectiveness owner 延后评估 | 两个以上可比 episode、校准规则、反 gaming review | 不在缺少纵向样本时发布 0-100 headline score |
| 12 | `no-action`，未来需独立产品 owner | named consumer、release/upgrade/Quickstart smoke、retirement plan | 不因上游已有 CLI/docs/renderers 就复制产品面 |
| 13 | 现有 CodeGraph + graph review owner | 针对真实遗漏建立 fixture；证明现有图能力不足后再做依赖评估 | 不并行维护第二套 tree-sitter/WASM 图栈 |

## 5. 高优先级吸收方案

### 5.1 方法有效性状态：改造后吸收

**证据**

- Better Harness 将 `Present/Wired/Exercised/Outcome-supported` 用于评估 check 和 dimension，并明确“文件数量、资产存在、finding 数量不能产生 finding 或分数”。[B2]
- Pantheon verification schema 已有命令状态、method readiness、graph/session/linkage，它记录的是任务证据；`check-method-health` 仍主要验证文件和版本。[P4][P5]

**判断**

已有草稿提出把 `evidenceState` 加入每条 evidence schema，这混淆了两类对象：

- `commands[].status` 回答“这条验证是否通过”；
- method effectiveness state 回答“这个机制是否存在、被任务接入、真实运行、产生后续效果”。

正确落点应是独立的 method-effectiveness/coverage-review artifact，或 coverage review 中每个 mechanism 的状态，而不是修改每条命令。

**最小未来任务**

- 扩展 `patterns/templates/harness-coverage-review.template.md`，给每个 mechanism 增加 ordinal state、evidence refs、last exercised、later outcome。
- `check-method-health` 第一阶段只检查字段完整性和 evidence linkage，不计算总分。
- 至少积累两个可比 Task Episodes 后，才能讨论是否需要数值模型。

**非目标**：不改变任务命令的 pass/fail；不引入 headline average；不把 `Unobserved` 当 `Missing`。

### 5.2 Ratchet owner 路由：扩展现有 Failure Registry

**证据**

- Pantheon 已有 Failure Registry、checker 和 promotion decision，FR-005 还明确记录 cadence freshness 尚未机械检查。[P3][P5]
- Better Loop Discovery 的增量价值是 coverage inspection、readiness、最小 owner、state、observability、evaluation、side effect 和 stop condition。[B3]

**判断**

最合理的吸收不是新建 `loop-discovery` 子系统，而是扩展现有 failure registry/promotion policy：

- `existingCoverage`
- `ownerRoute`
- `readinessStatus`
- `stateContract`
- `observabilityContract`
- `evaluationContract`
- `stopCondition`
- `laterValidationDue`

这会把 Pantheon 的 Ratchet 从“发生什么变化”升级到“为什么这个 owner 足够、如何知道它有效”。

**非目标**：不默认创建 Skill、Automation 或 Custom Agent；一次性问题仍可 `no-action`。

### 5.3 Task Episode：先试点，不全量采集

**证据**

- Better Harness 要求 repeated opportunity 来自至少两个不同、可比的 Task Episodes，并把 later outcome 作为效果证据。[B1][B2]
- Pantheon 已有 Task Packet -> evidence -> review -> change/plan refs 的 machine-readable linkage，可作为 episode backbone。[P2][P4]

**建议的最小 episode manifest**

```json
{
  "episodeId": "hashed-stable-id",
  "taskId": "2026-...",
  "taskFamily": "method-health",
  "acceptanceRef": "docs/harness/tasks/...",
  "changeRef": "commit-or-worktree",
  "evidenceRef": ".harness/evidence/.../commands.json",
  "reviewRef": ".harness/evidence/.../review.md",
  "interventionRef": "FR-...",
  "outcomeWindow": "unobserved"
}
```

只在“方法改进需要验证效果”的任务生成；不保存原始 prompt、命令正文、session id 或 user-home 路径。

### 5.4 CodeGraph-backed 高影响验证：吸收判定规则，不复制引擎

**证据**

- Pantheon graph review 已要求 task/evidence/review 对 affected subgraph 和检查项保持一致。[P6]
- Better core-change-watch 将静态边界、Git 历史、测试映射和执行证据明确分层；test-mapping 可对 critical path 缺少测试证据进行阻断。[B5]
- Better Harness 为此引入 `@vscode/tree-sitter-wasm`；Pantheon 当前已采用 CodeGraph。[B7]

**未来最小任务**

- 在 Task Packet 里声明 `affectedSubgraph` 后，用 `codegraph affected` 或明确的 repo test map 生成候选测试。
- evidence 记录 `selectionSource`、候选测试、实际执行命令和未覆盖原因。
- 只有 critical/high-impact 路径缺少测试证据时阻断；普通路径先 advisory。

**非目标**：静态图不证明测试已运行；不复制 Better 的 tree-sitter/parser 代码。

### 5.5 Sensitive-write 与 secret guard：合同先行

**证据**

- Pantheon 已有 Human Gate 和 rollback plan，但没有等价的宿主 pre-write secret sensor。
- Better Harness 在 `UserPromptSubmit`、`PreToolUse` 和写内容上进行 redacted secret scan，并把敏感写入定义为“匹配保护面 -> 明确确认 -> scoped write -> evidence”。[B8]

**未来最小任务**

1. 先定义宿主无关 protected surfaces 与授权语义。
2. 以 Codex/Claude 中一个真实可用 Hook 作为 adapter pilot。
3. 保持 fail-closed 仅用于高置信 credential/path；一般 protected write 使用 approval gate。

**非目标**：不把正则 secret scanner 当完整安全审计；不自动安装到所有宿主。

## 6. 中低优先级候选

### 6.1 宿主支持分级

Pantheon 当前 adapter 文档回答“如何映射协议”，并不证明存在可安装壳、配置采集、session 采集或端到端 smoke。[P7] 建议借鉴 Better 的分层表达：

- `documented mapping`
- `installable shell`
- `configured-asset discovery`
- `session evidence`
- `verified quickstart`

首个改进应是 support declaration matrix，而不是立即制作 WorkBuddy 插件。上游自己也只把 WorkBuddy 标为 adapter support。[B4]

### 6.2 Session evidence

Better Harness 已实现 workspace matching、bounded sample、redaction、debug-only raw route，并有大量隐私测试。[B9] Pantheon 可先定义采集合同，再试点单一宿主：

- 默认只读 project-local linkage/evidence；
- user-home/session transcript 必须显式 opt-in；
- durable artifact 只保留 hash/summary/reason code；
- raw debug 不进入仓库 evidence。

没有这些边界前，不建议把 session analyzer 纳入 method gate。

### 6.3 Agent asset lint

Better Harness 对 AGENTS、Skill、Hook、MCP 和 provider asset 做语义检查，测试证明其不是简单资产计数。[B10] Pantheon 当前 doc/frontmatter/link/inventory gates 已覆盖一部分机械健康度。应先从已发生的 adapter drift 或 Skill 合同失败抽取 1-2 条低误报规则，不复制完整 provider inventory。

### 6.4 Findings artifact

Better 的 findings/report 体系强在 owner、evidence、expected output、verifier 和 repair boundary，而不是 HTML 本身。[B6] Pantheon 可以试验将 coverage review finding 做成小型 JSON；只有当维护者确实需要跨周期比较、筛选或交互修复时，才建设 renderer。

## 7. 明确不吸收

### 7.1 固定三 agent 采证

Better Skill 要求“exactly three”只读 agent，然后由 lead 合并。[B6] 这是一种产品运行时实现，不是普适方法合同。Pantheon 应保留三类 evidence domain 的隔离，但 agent 数量由任务风险、runtime 和成本决定。

### 7.2 立即引入数值评分

Better 自己也规定分数不能产生 finding，且只在 later comparable episode 后改变 Loop Effectiveness。[B2] Pantheon 当前没有这样的纵向样本。先使用 ordinal state 与 confidence，避免 74/84/94 这类阈值制造错误精度。

### 7.3 全量产品化表面

Better npm 包包含多宿主 manifest、CLI、Docusaurus、Canvas/HTML renderer，并依赖 tree-sitter/esbuild WASM。[B7] Pantheon 是方法源仓库；没有真实消费者和发布 owner 时复制这些表面只会扩大维护面。

### 7.4 第二套结构图引擎

CodeGraph 已在 `pantheon-harness` 项目级初始化并能提供 symbol/edge/context。结构能力缺口应先通过现有 CodeGraph 和 graph review 证明，再决定是否需要额外 parser。

## 8. 对已有草稿的纠正

| 原草稿判断 | 评估结论 |
|---|---|
| “Better 是诊断层，Pantheon 是执行层” | 方向有启发但过度二分；Better 也有 Hook、secret guard、finding-bound fix 和 direct fix |
| “Ratchet 只有原则、无工具” | 不成立；Pantheon 已有 Failure Registry、schema、checker 和历史记录，缺的是 readiness/owner/effectiveness/later validation |
| “Pantheon 未发布任何主机壳” | 需拆分；Pantheon 有六类 adapter 文档，但没有 Better 那样的 install shell/provider/session/Quickstart 产品链 |
| “Better 已有 WorkBuddy 适配壳” | 不成立；它有 configured-asset/session adapter，但明确没有 WorkBuddy install shell 或 verified Quickstart |
| “给 verification evidence 每条记录加 evidenceState” | 不建议；机制成熟度与命令结果属于不同证据层 |
| “马上引入 0-100 Loop Effectiveness” | 暂不采纳；至少先有两个可比 Task Episodes 和校准规则 |
| “三路并行 agent 应成为 Pantheon 默认” | 不采纳固定编排；只吸收证据域隔离原则 |

## 9. 建议路线图

### P0：先完善治理证据

1. **L2：Method Effectiveness Review**
   In：ordinal mechanism states、evidence refs、last exercised、later outcome。
   Out：总分、修改 commands schema、session transcript。
   验证：schema/fixture/checker tests + 两个历史 artifact migration fixture。

2. **L2：Failure Registry Owner Routing**
   In：coverage/readiness/owner/state/observability/evaluation/stop/later-validation fields。
   Out：新 Loop Discovery taxonomy、自动创建 Skill/Agent。
   验证：registry checker tests + coverage review closeout。

### P1：小范围可执行实验

3. **L2：Task Episode Pilot**
   In：仅对方法改进任务生成 privacy-safe episode manifest 与 intervention linkage。
   Out：全量会话采集、原始 prompt/session id。
   验证：identity/linkage/privacy tests + 两个可比 task fixture。

4. **L2：CodeGraph Evidence Pack**
   In：affected tests、selection source、executed checks、critical-path blocking policy。
   Out：复制 tree-sitter、静态图替代运行测试。
   验证：Go/JS fixture、advisory/blocking cases、graph-review consistency。

5. **L2：Protected Write Contract + One Adapter Pilot**
   In：protected surfaces、explicit scope、approval identity、post-write evidence、rollback。
   Out：全宿主安装器、低置信 secret 自动阻断。
   验证：allowed/blocked/redacted/idempotent adapter tests。

### P2：由使用证据触发

6. **L1：Host Support Declaration Matrix**：先声明支持层级，再决定是否做某个 install shell。
7. **L2：Single-host Session Evidence Pilot**：只有明确消费者和隐私策略后启动。
8. **L1/L2：Agent Asset Lint / Findings Artifact**：必须由重复 failure 或报告消费需求触发。

## 10. 最终判定

Pantheon 不应“采用 Better Harness”，而应**选择性吸收它对证据成熟度、学习闭环和宿主支持诚实性的工程方法**。最优路径是：

```text
现有 Failure Registry / coverage review / graph review
  -> 增加 ordinal effectiveness state 与 owner readiness
  -> 用少量 Task Episode 验证方法改动
  -> 只有 outcome-supported 后才升级 gate、score 或产品面
```

这条路径保留 Pantheon 的合同治理优势，同时补上当前最真实的缺口：知道机制“存在”，但还不能稳定证明机制“被用过且有效”。

## 11. 来源

### Pantheon（本地基线）

- [P1] `patterns/harness-core-model.md:7-21,130-205,298-318`
- [P2] `architecture/harness/task-packet-spec.md:175-225,305-315`
- [P3] `architecture/harness/failure-registry.md:9-26`; `scripts/harness/check-failure-registry.mjs:57-99`
- [P4] `verify/schemas/verification-evidence.schema.json:5-167`
- [P5] `scripts/harness/check-method-health.mjs:9-48,114-178`
- [P6] `scripts/harness/check-graph-review.mjs:8-294`; `scripts/harness/check-review.mjs:150-204`
- [P7] `config/agents/README.md:5-24`; `patterns/tool-adapter-matrix.md:5-31`

### Better Harness（固定提交）

- [B1] [Agent Work Loop：Task Episode](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/models/agent-work-loop.md#L11-L75)
- [B2] [Evidence states、score boundaries、longitudinal validation](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/models/agent-work-loop.md#L91-L187)
- [B3] [Loop Discovery decision gate 与 owner route](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/references/loop-engineering/loop-discovery.md#L94-L204)
- [B4] [Host support matrix](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/docs/docs/hosts/adapter-matrix.md#L14-L92)
- [B5] [Core Change Watch](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/references/project-harness/core-change-watch.md#L3-L100)
- [B6] [Better Harness skill workflow and repair](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/skills/better-harness/SKILL.md#L6-L213)
- [B7] [Package/runtime/dependencies](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/package.json#L1-L94)
- [B8] [Sensitive write boundary](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/references/project-harness/sensitive-write-boundary.md#L9-L86)；[secret guard](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/scripts/agent-guardrails/secret-scan.mjs#L438-L579)
- [B9] [Session evidence boundaries](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/references/session-evidence/sessions-diagnostics.md#L33-L152)
- [B10] [Agent asset review](https://github.com/QoderAI/better-harness/blob/4cd2fdb340631ebc726d1f7b617f997511aca9e8/references/agent-customize/README.md)
