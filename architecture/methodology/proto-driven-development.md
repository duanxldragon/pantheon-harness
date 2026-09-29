---
title: Proto First Development
doc_type: Method
layer: method
status: Active
updated_at: 2026-06-26
version: v1.0.0
---

# Proto First Development

本文档定义 Proto First（原型驱动开发）模式，适用于探索性开发、方案验证和快速原型迭代。

## 1. 什么是 Proto First

Proto First 是一种轻量级开发模式，核心思想是：

1. **先跑通，再优化**：先用最快方式实现核心逻辑
2. **保留选项**：不立即投入架构设计
3. **快速迭代**：基于反馈快速调整
4. **证据驱动**：每次迭代需要可验证的输出

## 2. 适用场景

### 2.1 适合 Proto First

- 探索性开发：不确定技术方案
- 方案验证：需要验证可行性假设
- 快速原型：需要快速展示效果
- 技术调研：评估新技术栈
- 设计讨论：需要可视化的设计原型

### 2.2 不适合 Proto First

- 明确的业务需求：已有完整规格说明
- 关键路径：性能、安全、稳定性要求高
- 生产级代码：需要完整测试和文档
- 合同约束：需要遵循已有架构规范

## 3. Proto First 流程

### 3.1 完整流程图

```
1. Define Proto Goal
   ├─ 明确要验证的核心假设
   ├─ 定义成功标准
   └─ 设置时间盒

2. Quick Prototype
   ├─ 用最小代码实现核心功能
   ├─ 不追求完美
   └─ 记录未解决的问题

3. Validate
   ├─ 运行 proto
   ├─ 收集反馈
   └─ 验证核心假设

4. Decision Point
   ├─ 原型验证成功 → 继续 L2 流程
   ├─ 需要调整 → 快速迭代
   └─ 原型失败 → 重新定义问题

5. Handoff to Full Development
   └─ 如果进入 L2，使用 proto 验证结果
```

### 3.2 Proto vs Production

| 维度 | Proto | Production |
|------|-------|------------|
| 代码质量 | 够用即可 | 完整标准 |
| 测试覆盖 | 最小验证 | 完整覆盖 |
| 文档 | 简要说明 | 完整文档 |
| 错误处理 | 基础 | 健壮 |
| 性能优化 | 不考虑 | 关键 |
| 安全考虑 | 基础 | 全面 |
| 交付时间 | 快速 | 完整周期 |

## 4. Proto First Task Packet

### 4.1 模板

```markdown
# Proto First Task: <task-name>

## Proto Goal
< 要验证的核心假设是什么 >

## Timebox
< X hours | X days >

## Success Criteria
- [ ] <可验证的输出1>
- [ ] <可验证的输出2>

## Out of Scope
< 明确不做 >

## Approach
< 快速实现方式 >
< 使用什么技术/框架 >

## Decision Criteria
- Continue if: <继续条件>
- Pivot if: <调整条件>
- Stop if: <终止条件>

## Proto Output
- Proto code: <path>
- Validation result: <date>
- Decision: <continue|pivot|stop>

## Lessons Learned
< 从原型中学到的经验 >
```

### 4.2 示例

```markdown
# Proto First Task: user-dashboard-cache

## Proto Goal
验证 Redis 缓存能否显著提升用户仪表板加载速度

## Timebox
2 hours

## Success Criteria
- [ ] 原型实现缓存逻辑
- [ ] 对比有/无缓存的响应时间
- [ ] 确认性能提升 > 50%

## Approach
- 使用 Redis Go client
- 最小化实现：仅缓存 API 响应
- 使用 wrk 进行基准测试

## Decision Criteria
- Continue if: 性能提升 > 50%，方案可行
- Pivot if: 性能提升 < 30%，需要其他方案
- Stop if: 缓存不可行，探索其他方向

## Proto Output
- Proto code: `proto/user-dashboard-cache/`
- Validation result: 2026-06-26
- Decision: continue

## Lessons Learned
- Redis 连接池需要优化
- 缓存 key 命名需要规范化
```

## 5. Proto 目录结构

### 5.1 建议目录

```
proto/
├── <feature-name>/
│   ├── README.md          # 原型说明
│   ├── main.go            # 或 main.ts
│   ├── go.mod             # 如需要独立依赖
│   ├── test_results.md    # 测试结果
│   └── decision.md        # 决策记录
└── ...
```

### 5.2 Proto README 模板

```markdown
# Proto: <feature-name>

## 目标
< 验证的核心假设 >

## 方法
< 如何实现 >

## 结果
< 测试/验证结果 >

## 结论
< Continue | Pivot | Stop >

## 遗留问题
< 未解决的问题 >

## 复用建议
< 如果要复用原型代码，需要做什么 >
```

## 6. Proto First 与 L0/L1/L2 的关系

Proto First 不是独立的档位，而是可以嵌入任何档位的开发模式：

| 档位 | Proto First 角色 |
|------|-----------------|
| L0 | 不适用：L0 本身就是极简变更 |
| L1 | 可选：用于探索性需求快速验证 |
| L2 | 常用：方案评审前先做原型验证 |

### 6.1 Proto First -> L2 流程

```
用户需求
  │
  ├─ Proto First (验证方案)
  │   └─ Decision: Continue
  │
  └─ L2 Full Governance (生产实现)
      ├─ 基于原型验证结果
      ├─ 完整 Task Packet
      └─ 完整验证流程
```

## 7. Proto First 最佳实践

### 7.1 做

- 保持简单：不追求完美代码
- 记录假设：明确验证什么假设
- 设置时间盒：避免过度投入
- 快速验证：尽快获得反馈
- 保留证据：保存测试结果和决策

### 7.2 不做

- 不过度设计：不要提前优化
- 不写完整测试：只写最小验证
- 不投入生产：不期望原型代码直接上线
- 不忽视教训：记录从原型中学到的经验

### 7.3 时间控制

| 原型复杂度 | 推荐时间盒 |
|-----------|-----------|
| 概念验证 | 1-2 小时 |
| 功能原型 | 2-4 小时 |
| UI 原型 | 1-2 小时 |
| 性能原型 | 2-4 小时 |

## 8. 相关文档

- [Workflow Templates](./workflow-templates.md)
- [Solo Delivery Tiers](./solo-delivery-tiers.md)
- [Verification Evidence Spec](../harness/verification-evidence-spec.md)
