# Pantheon 设计文档优化方案

**编制日期**: 2026-05-11
**作用域**: `pantheon-base/docs/` + `pantheon-ops/docs/`
**状态**: 方案固化，等待逐 Phase 执行

---

## 0. 起因与认知校准

| 误以为 | 真相 |
|---|---|
| UI 设计文档很缺，需要大批量补充 | base 已有 **2400+ 行**的 UI 文档，覆盖了 19 个主题，质量很高 |
| 主要工作是写新文档 | 主要工作是**治理 drift**——ops 复制了 base 的 33 个设计文档，至少 14 份已独立漂移 |
| 业务模块文档可能没写 | CMDB 文档 620 行已写细，Deploy 230 行偏简 |

所以「补全设计文档」的真正含义是 4 件事：
- **A (重要且急)** · 解决文档自身的 drift（和代码 drift 同病同治）
- **B (重要但小)** · 在 base 补真正缺失的 UI 文档，并深化偏短的（不要重复造轮子）
- **C (有价值非急)** · 从 CMDB / deploy 抽象出**业务 UI 模板**放回 base
- **D (有价值非急)** · 补齐 Deploy 模块的 UI 设计章节

---

## 1. Phase A · 文档 Drift 治理

### 1.1 当前 drift 全貌（18 个差异）

| 类别 | 文件 | 应归属 | 操作 |
|---|---|---|---|
| README | `docs/README.md` | base | ops 删，加 inheritance 指针 |
| acceptances | `ACCEPTANCE_CHECKLIST.md` | base | ops 删 |
| acceptances | `BUSINESS_MODULE_ACCEPTANCE_MATRIX.md` | base | ops 删 |
| contracts | `DOCUMENT_METADATA_AND_STATUS.md` | base | ops 删 |
| contracts | `PLATFORM_CONTRACT.md` | base | ops 删 |
| contracts | `SYSTEM_AUTH_CONTRACT.md` | base | ops 删 |
| contracts | `SYSTEM_CONFIG_CONTRACT.md` | base | ops 删 |
| contracts | `SYSTEM_IAM_CONTRACT.md` | base | ops 删 |
| contracts | `SYSTEM_ORG_CONTRACT.md` | base | ops 删 |
| designs | `BACKEND.md` | base | diff 审查后回流 / 删 ops 副本 |
| designs | `BUSINESS_DICT_INTEGRATION_GUIDE.md` | base | 同上 |
| designs | `DATA_PERMISSION_HOOK.md` | base | 同上 |
| designs | `FRONTEND.md` | base | 同上 |
| designs | `NAVIGATION_IA_STRATEGY.md` | base | 同上 |
| designs | `PERMISSION_MODEL.md` | base | 同上 |
| ops-only ✅ | `docs/PROJECT_INHERITANCE.md` | ops | 保留（合法） |
| ops-only ✅ | `BUSINESS_CMDB_MODULE_DESIGN.md` | ops | 保留（合法） |
| ops-only ✅ | `BUSINESS_DEPLOY_MODULE_DESIGN.md` | ops | 保留（合法） |

### 1.2 ops 还有 ~17 个「完全相同」但不该有的文档

按 `WORKSPACE_INHERITANCE.md` 规则，ops 只该有 3 类文档：
1. `AGENTS.md`
2. `docs/PROJECT_INHERITANCE.md`
3. `docs/designs/BUSINESS_<MODULE>_DESIGN.md` 和对应的 acceptance

其他都该由 base 提供。所以除了上面 14 个漂移文件，ops 还有约 17 个**与 base 完全相同**的副本（未漂移但不该有）。这些直接删，让 ops 通过文档 inheritance 引用 base。

### 1.3 治理顺序

```
Step 1: 比对每个漂移文件，看 ops 的修改是不是「业务需要」
        - 是 → 在 base 加扩展点 / 业务专属附录（同代码 drift 套路）
        - 否 → 用 base 的版本覆盖 ops，删 ops 副本
        - 测试/fixture 噪声 → 直接对齐 base

Step 2: 删除 ops 中所有「非业务相关」的设计文档副本（含漂移和未漂移）
        ops 的 docs/ 最终结构：
        pantheon-ops/docs/
        ├── README.md                              # 简短，指向 base/docs/
        ├── PROJECT_INHERITANCE.md                 # ✅ 保留
        ├── designs/
        │   ├── BUSINESS_CMDB_MODULE_DESIGN.md     # ✅ 保留
        │   └── BUSINESS_DEPLOY_MODULE_DESIGN.md   # ✅ 保留
        ├── acceptances/                           # （删空后整个删掉，业务验收单独放）
        └── (其他全删)

Step 3: 改 ops/docs/README.md 为「文档继承说明」：
        - 列出 ops 业务文档清单
        - 显式指明：架构/契约/设计/验收文档统一去 base/docs/ 查
        - 列出 ops 当前继承的 base 版本（同 PROJECT_INHERITANCE.md 中的字段）

Step 4: 在 ops/AGENTS.md 中加约束：禁止 ops 内新增非业务文档；如需修改 base 的设计文档，
        必须提 PR 到 base 仓库
```

### 1.4 执行 Skill

新增 `.codex/skills/docs-cutover/`（本方案产出之一），定义自动化扫描 + 分类 + 删除流程。

---

## 2. Phase B · UI 文档深化与补全

### 2.1 已存在且充实，**不要重复写**

| 文档 | 行数 | 覆盖范围 |
|---|---|---|
| `FRONTEND_UI_SPEC.md` | 871 | 设计 Token、视觉基因、布局、导航、页面骨架、表单、表格、状态、权限交互、多语言、响应式、动效、AI 约束 |
| `FRONTEND_PAGE_TEMPLATES.md` | 529 | 8 种页面模板的标准结构 + 完成定义 |
| `FRONTEND_COMPONENT_PLAN.md` | 541 | 8 类组件的分层、命名、props 约束 |
| `BACKOFFICE_STYLE_CONSTRAINTS.md` | 218 | 边框、圆角、辅助栏、浮层视觉约束 |
| `FRONTEND.md` | 187 | 前端实现总则 |

### 2.2 真正缺失或偏短的（**这是 B 的具体清单**）

| # | 现状 | 操作 |
|---|---|---|
| B1 | `NAVIGATION_IA_STRATEGY.md` 仅 **56 行**，主要列约束没展开（菜单状态机、tab 缓存策略、面包屑算法、iframe 安全名单格式都缺细节） | **深化扩到 200+ 行** |
| B2 | **缺 `ACCESSIBILITY.md`** — 全部 33 个文档中没有 a11y 专项（FRONTEND_UI_SPEC §10 提到权限交互，但不是无障碍） | **新建** |
| B3 | **缺 `THEME_TOKENS_REFERENCE.md`** — FRONTEND_UI_SPEC §2.1.1 列了 4 个主题名（indigo / emerald / violet / slate），§3 有 Token 总论，但**没有逐主题的具体色值/字号/间距值表** | **新建**（schema-driven token table） |
| B4 | **缺 `DARK_MODE_DESIGN.md`** — FRONTEND_UI_SPEC 没有暗色模式章节；多主题策略只覆盖品牌色差异，没覆盖亮 / 暗反转 | **新建**（与 B3 关联） |
| B5 | **缺 `EMPTY_LOADING_ERROR_STATES.md`** — FRONTEND_UI_SPEC §9 状态设计偏视觉原则，**没有具体每类页面的空/加载/错/无权限的标准文案 + 视觉规格** | **新建**（含 PageState 组件的所有变体） |
| B6 | **缺 `MOBILE_RESPONSIVE_BREAKPOINTS.md`** — FRONTEND_UI_SPEC §12 有响应式原则，但**断点数值、各组件在窄屏的退化规则没写细** | **新建** |

⚠️ **不建议新建** `DESIGN_TOKENS.md`：FRONTEND_UI_SPEC §3 已经有 Design Token 章节。B3 是 §3 的**逐主题展开**，不是替代。

### 2.3 B 阶段最终交付物

base/docs/designs/ 净增 **5 个文档** + **修改 1 个**：

```
pantheon-base/docs/designs/
├── ACCESSIBILITY.md                          # B2 新建
├── THEME_TOKENS_REFERENCE.md                 # B3 新建
├── DARK_MODE_DESIGN.md                       # B4 新建
├── EMPTY_LOADING_ERROR_STATES.md             # B5 新建
├── MOBILE_RESPONSIVE_BREAKPOINTS.md          # B6 新建
└── NAVIGATION_IA_STRATEGY.md                 # B1 扩展 56 → 200+ 行
```

每个新文档**结构对齐已有 UI 文档**（不超过 300 行，含「目标 / 原则 / 规格表 / 验收清单」四段）。

---

## 3. Phase C · 业务 UI 模板抽象

### 3.1 抽象什么

CMDB 和 Deploy 是 ops 现有的两个业务模块。把它们的**共同 UI 模式**抽出来放回 base，作为未来 CRM/WMS 等业务模块的参考。

### 3.2 候选模板（待从代码 + 设计文档中提炼）

| 模板 | 来源 | 价值 |
|---|---|---|
| `BUSINESS_RESOURCE_LIST_PATTERN.md` | CMDB 主机 / Deploy 任务的列表页 | 资源类业务的标准列表模式（筛选 + 表格 + 批量动作） |
| `BUSINESS_LIFECYCLE_DETAIL_PATTERN.md` | CMDB 主机详情 / Deploy 任务详情 | 有状态流转的业务对象详情页 |
| `BUSINESS_TAG_RELATION_PATTERN.md` | CMDB 标签关联 | 多对多关联的设计模式（标签 / 组 / 分类） |
| `BUSINESS_TIMELINE_PATTERN.md` | Deploy 任务事件流 | 业务事件时间线展示 |

### 3.3 这阶段需要**先读代码再写文档**

- 不要凭空写「应该长什么样」
- 必须先看 `pantheon-ops/frontend/src/modules/business/cmdb/` 和 `business/deploy/` 实际写了什么
- 从代码反推共性，写成模板

⚠️ **这阶段建议放到 Phase A 完成后再做**，避免在 drift 没治理时引入新的「base 与 ops 共有但描述对象在 ops」的尴尬。

---

## 4. Phase D · 业务模块 UI 设计文档补齐

### 4.1 CMDB 现状

`BUSINESS_CMDB_MODULE_DESIGN.md` 620 行，**§9 前端页面设计** 章节已存在。需验证：
- 页面层次是否完整？（list / detail / 关联视图 / 批量操作？）
- 关键交互（如批量打标签、跨组移动）是否描述？
- 组件清单是否覆盖？

操作：审查 §9，补缺。

### 4.2 Deploy 现状

`BUSINESS_DEPLOY_MODULE_DESIGN.md` 230 行（vs CMDB 620 行），**§8 前端与 UI** 章节存在但很可能偏简。

操作：参考 CMDB §9 的深度，补充 Deploy 的：
- 任务列表页（含状态筛选）
- 任务详情页（含事件流、回滚操作、日志查看）
- 包管理页（含上传、版本对比）
- 错误处理 UX（失败任务的重试、回滚路径）

---

## 5. 执行计划（分 4 个 Phase）

### Phase A · 文档 Drift 治理（**最高优先级**）

| Step | 内容 | 产出 |
|---|---|---|
| A.1 | 写 `.codex/skills/docs-cutover/`（本方案附带） | ✅ 已产出（见下） |
| A.2 | 对 14 个漂移文件做逐文件 triage（同代码 drift 套路） | `DOCS_DRIFT_TRIAGE.md`（执行时产出） |
| A.3 | 在 base 上接受漂移内容（如有通用价值），或拒绝（如纯噪声） | base 上的若干 commits |
| A.4 | 在 ops 上删除 ~31 个「不该有的」文档副本 + 改 README | ops 上的 1 个 commit |
| A.5 | 在 ops/AGENTS.md 加约束 | ops 上的 1 个 commit |

### Phase B · UI 文档补全（**用户最关心**）

| Step | 内容 |
|---|---|
| B.1 | 写 `THEME_TOKENS_REFERENCE.md`（逐主题 token 表） |
| B.2 | 写 `DARK_MODE_DESIGN.md`（暗色模式 token 与组件适配） |
| B.3 | 写 `ACCESSIBILITY.md`（a11y 标准与验收） |
| B.4 | 写 `EMPTY_LOADING_ERROR_STATES.md`（状态变体规格） |
| B.5 | 写 `MOBILE_RESPONSIVE_BREAKPOINTS.md`（断点与退化规则） |
| B.6 | 扩 `NAVIGATION_IA_STRATEGY.md` 到 200+ 行 |

每个文档严格控制在 ~300 行内，避免凑字数。

### Phase C · 业务 UI 模板抽象（**等 A 完成后**）

| Step | 内容 |
|---|---|
| C.1 | 读 `pantheon-ops/frontend/src/modules/business/cmdb/` 完整代码 |
| C.2 | 读 `pantheon-ops/frontend/src/modules/business/deploy/` 完整代码 |
| C.3 | 提炼共性，写 `BUSINESS_RESOURCE_LIST_PATTERN.md` 等 4 份模板 |

### Phase D · 业务模块 UI 文档补齐（**穿插进行**）

| Step | 内容 |
|---|---|
| D.1 | 审查 CMDB §9，标记缺失子节 |
| D.2 | 补 CMDB §9 缺失 |
| D.3 | 大幅补 Deploy §8（参考 CMDB §9 结构） |

---

## 6. 风险与边界

### 6.1 不要重复造轮子

每写一个新 UI 文档前，**先确认它和 FRONTEND_UI_SPEC.md 没有 60% 以上的重叠**。如果有，要么改成扩展现有章节，要么放弃。

### 6.2 不要污染 base 的 designs/ 命名空间

base 的 designs/ 已有 33 个文档，再加 5-9 个就接近 40 个。命名要严格：
- UI 视觉/交互类前缀统一为 `UI_` 或继续按当前的 `FRONTEND_` / `BACKOFFICE_` 体系
- 业务模板用 `BUSINESS_*_PATTERN.md` 命名（区别于 `BUSINESS_*_MODULE_DESIGN.md`）

### 6.3 Drift 治理必须先做

如果 B/C/D 在 A 完成前执行：
- 每个新写的文档可能马上又被 ops 复制一份 → 立刻 drift
- 现有的 drift 治理决策（哪些应该回流 / 删除）会被新文档干扰

**强制约束**：B/C/D 严禁在 A 完成前启动。

---

## 7. Skill 与本方案关系

新增 1 个 Skill 配套此方案：

```
.codex/skills/
├── triage-base-drift/      ✅ 已存在（代码漂移）
├── backport-to-base/       ✅ 已存在（代码 PR-1）
├── workspace-cutover/      ✅ 已存在（代码 PR-2）
└── docs-cutover/           🆕 本次新增（文档漂移治理）
```

未来如果 Phase B/C/D 也需要可重跑的自动化（例如「补全所有业务模块的 UI 章节」），可以再增 Skill。当前阶段不预先抽象。

---

## 8. 时间线

- **2026-05-11 (a)**: 方案固化（本文 + `docs-cutover` Skill）。
- **2026-05-11 (b)**: Phase A 完成。base 接受 5 个通用增强 (commit 7d3840c)。ops 删除 66 个继承副本 + 重写 README + 加 AGENTS §9 文档所有权约束 (commit b4f625c)。drift 状态从 18 个差异降到合法的 3 个例外。
- **2026-05-11 (c)**: Phase B 完成。base 新增 5 份 UI 规范 + 扩展 1 份导航 IA (commit 13709a4)。共 1215 行新内容。
- **2026-05-11 (d)**: Phase D 完成。CMDB §9 扩展 §9.7-9.9 + 引用路径修正；Deploy §8 从 24 行扩展到 ~150 行，含 5 个页面详细规格、状态色映射、轮询、响应式 (ops commit a951aef)。
- **2026-05-11 (e)**: Phase C 完成。base 新增 BUSINESS_RESOURCE_LIST_PATTERN + BUSINESS_LIFECYCLE_DETAIL_PATTERN，从 CMDB/Deploy 抽象（base commit）。共 738 行新内容。TAG_RELATION 和 TIMELINE 模板因样本不足暂缓。
- **状态**: A/B/C/D 全部完成。整体共 4 个 commits（base 3 + ops 1）+ 2 个 commits（Phase A/D ops 端）= 5 个 docs commits 跨双仓库。
