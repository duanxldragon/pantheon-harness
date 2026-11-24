# Pantheon Workspace - Agent 行为准则

本文件是 workspace 级协调规则。各子仓库有自己的 AGENTS.md 负责各自领域规则；本文件不重复，只做跨仓库协调。

## Workspace 结构

本目录是多仓库 workspace 容器，包含独立 git 仓库：

| 仓库 | 角色 | 入口 |
|------|------|------|
| `pantheon-harness` | Harness Engineering 方法论与工具（工具无关） | `pantheon-harness/AGENTS.md` |
| `pantheon-base` | 标准后台底座：`platform` + `system/*` 域 | `pantheon-base/AGENTS.md` |
| `pantheon-ops` | 第一个业务仓库：`business/*` 扩展 | `pantheon-ops/AGENTS.md` |

继承方向：`pantheon-harness` 提供方法论 → `pantheon-base` 是底座 → `pantheon-ops` 消费 base 的 foundation release 做业务扩展。

## 阅读顺序

开工前按目标仓库补读：

- **Base 工作**：`pantheon-base/AGENTS.md` → 当前任务/状态 → `pantheon-base/docs/README.md` 按任务路由；架构/UI 决策补读 `DESIGN.md` 对应章节
- **Ops 工作**：`pantheon-ops/AGENTS.md` → `pantheon-ops/docs/PROJECT_INHERITANCE.md` → 当前业务任务/设计；兼容性以锁定快照的继承合同为准，Base HEAD 文档差异须注明
- **Harness 工作**：`pantheon-harness/AGENTS.md` → `pantheon-harness/README.md` → 相关 policy/script；方法概览按需读取
- **跨仓库协调**：`docs/WORKSPACE_INHERITANCE.md`

## 工作原则

- 直接执行安全可逆的步骤；只在破坏性、不可逆、需要凭证或外部生产操作时才询问。
- **维护者三触点契约**：维护者只在三个触点介入——①**需求澄清**（开工时把所有问题一次性打包问完，产出 In / Out / 验收标准后不再追问）②**质量门禁策略**（门禁红灯的处置决定、豁免审批、规则变更）③**最终视觉/功能验收**。从需求确认到提交验收之间，默认自主推进：不请求中途确认，用门禁和 evidence 代替口头确认；跑偏由 Reviewer 对照 In/Out 纠正，不上报维护者。
- 实现前应用最小复杂度阶梯：先判断是否不需要做、能否复用现有代码/组件/契约、能否用标准库或已安装依赖；只有这些都不满足时才写最小新增代码。
- 跨层先说边界再动手：`platform / system/auth / system/iam / system/org / system/config / business/*`。
- 验证后才能声称完成：改了什么就验证什么，给 evidence 或显式 gap。
- 同类错误重复出现时按 ratchet loop 升级：closeout → 补规则 → 补 checker/smoke/registry。
- 保持 diff 小、可审查、可回退；优先删除和复用，不引入未要求的新依赖。

## Windows 后台启动

- 后台辅助程序和外部模型 CLI 必须隐藏启动。PowerShell 使用 `Start-Process -WindowStyle Hidden`，或原生 `ProcessStartInfo` 的 `CreateNoWindow=true`、`UseShellExecute=false`；Node 子进程统一设置 `windowsHide: true`，包括测试和它们的后代进程。
- 优先直接运行原生 executable 或 Node 入口，避免通过 `.cmd` / `.bat` shim 额外打开控制台。仅需文件读写的 Claude 委派使用严格空 MCP 配置及明确的工具集合，并设置时限；保留模型默认配置和实际退出结果。
- CMD 弹窗复发时核对可见控制台与进程父子关系，只停止本任务拥有的辅助进程。隐藏启动参数或某次无可见窗口的抽样不能证明所有第三方瞬时弹窗已消除。
- Claude 文件任务应在单次调用中以 `--settings '{"disableAllHooks":true}'` 禁用用户/插件钩子，保留默认配置来源、模型和认证；不为隐藏窗口改写用户全局设置。复发时补充有时限的窗口采样及父子关系证据，区分任务辅助程序和 Codex/浏览器常驻通信进程。

- Node 隐藏启动覆盖 `fork()`、显式 `env` / `execArgv` 和合法参数重载，必须有后代传播回归；默认参数的单次成功不能替代这些检查。Claude 辅助进程用任务独占 Job Object 管理后代，输入和输出管道有界，保留真实退出与安全异常类型/错误码；不处理其他任务的进程。原生后代隐藏及 Start→Job 赋属竞争仍须明确证据边界。
- 瞬时弹窗使用有时限的 `EVENT_OBJECT_SHOW` 观察；hook 安装成功后才发布 ready，销毁窗口的不可识别事件不得静默丢弃。零事件只表示本次观察结果，不能据此归档复发问题。

## 任务分层（L0/L1/L2）

引用 `pantheon-harness` 方法论的交付层级：

- **L0** 直接改：文案、只读、纯格式化
- **L1** 轻量闭环：有计划 + 明确验证集合
- **L2** 完整治理：task packet + evidence + review + human gate

触碰共享合同、系统域、生成器、权限、审计、i18n、继承边界时升到 L2。具体判断见各子仓库 AGENTS.md。

## 跨仓库协作规则

1. **Base-first**：共享问题先在 `pantheon-base` 修复，再通过 foundation release 同步到 ops。不要手抄 `base/main` 文件到 ops。
2. **Ops 只做 `business/*`**：不在 ops 新增架构/平台/系统域/UI 规范副本。generic drift 回 base，business-specific 留 ops。
3. **同步关闭**：改动接口/路由/权限/i18n/菜单/数据库/seed/smoke 时，同步更新测试、脚本、fixture、门禁或文档。

详见 `docs/WORKSPACE_INHERITANCE.md`。

## 完成门禁

跨仓库任务未关闭直到：

- 改动落在正确的仓库
- 共享行为变更的后续同步已完成或显式延期
- 菜单/权限/i18n/文档/测试/smoke 在范围内已更新
- 有验证 evidence
- 剩余 gap 是显式的

## 子仓库技能

各子仓库的 repo-local workflow skills 位于 `.agents/skills/`，涉及 PR 收口、CI triage、GitHub comments 收敛时优先查看。
