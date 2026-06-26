#!/usr/bin/env node

/**
 * Bootstrap Harness for new project
 *
 * Usage:
 *   node scripts/harness/bootstrap-harness.mjs --project-path /path/to/project
 *   node scripts/harness/bootstrap-harness.mjs --dry-run --project-path /path/to/project
 *
 * This script creates the standard harness directory structure and files
 * for a new project adopting the Pantheon Harness methodology.
 *
 * Creates:
 * - .harness/ directory structure
 * - docs/harness/ with core contracts
 * - AGENTS.md entry
 * - CI/CD quality gates template
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_ROOT = process.cwd();

const HARNESS_DIRS = [
  '.harness/evidence',
  '.harness/state',
  '.harness/errors',
  '.harness/checkpoints',
];

const EVIDENCE_SUB_DIRS = [
  '.harness/evidence/.gitkeep',
  '.harness/state/.gitkeep',
  '.harness/errors/.gitkeep',
  '.harness/checkpoints/.gitkeep',
];

const CORE_CONTRACTS = [
  'docs/harness/HARNESS_ENGINEERING_CONTRACT.md',
  'docs/harness/TASK_PACKET_SPEC.md',
  'docs/harness/VERIFICATION_EVIDENCE_SPEC.md',
  'docs/harness/REVIEW_LOOP_SPEC.md',
  'docs/harness/AGENT_INTERFACE_CONTRACT.md',
  'docs/harness/FAILURE_RATCHET_POLICY.md',
  'docs/harness/HANDOFF_PROTOCOL.md',
  'docs/harness/ERROR_RECOVERY_STRATEGY.md',
];

const CORE_CONTRACT_TEMPLATES = {
  'docs/harness/HARNESS_ENGINEERING_CONTRACT.md': `# Harness Engineering Contract

类型：Contract
归属层：method
状态：Active
版本：v1.0 (bootstrap)

本文档为新项目引导模板，实际使用时需参考 harness-engineering 中的 canonical 版本。

## 1. 核心原则

1. 仓库协议优先：用户指令 > 仓库入口文件 > docs/harness/* > 工具适配器
2. 工具只是执行器：不能成为唯一事实源
3. 人负责目标和判断：Human 负责定义目标、批准高影响操作、审查证据
4. 证据优先：必须给出执行命令、通过/失败结果、截图、已知未验证项
5. 外部评估者默认存在：non-trivial 任务默认需要独立 reviewer

## 2. 标准工作流

\`\`\`
Intake -> Context -> Plan -> Red -> Green -> Verify -> Evidence -> Review -> Handoff
\`\`\`

## 3. Human Gates

必须人确认的操作：
- 删除大量文件或目录
- 修改数据库 schema、迁移或 seed
- 修改权限/菜单/审计/i18n 模型
- 修改核心合同、架构边界、公共 API
- 引入新依赖、新外部服务、新安全边界
- 变更 CI gate、发布流程或 secrets 处理

## 4. 角色定义

| 角色 | 职责 |
|---|---|
| Human | 目标、边界、风险接受、结果验收 |
| Planner/Dispatcher | 规划、分派、上下文整理、停点控制 |
| Generator | 实现、修复、迁移、执行命令 |
| Evaluator/Reviewer | 验证、审查、证据质量判断 |

## 5. 文档体系

\`\`\`
docs/
├── harness/
│   ├── HARNESS_ENGINEERING_CONTRACT.md    ← 本文件
│   ├── TASK_PACKET_SPEC.md                 ← Task Packet 规范
│   ├── VERIFICATION_EVIDENCE_SPEC.md      ← 验证证据规范
│   ├── REVIEW_LOOP_SPEC.md                ← Review 循环规范
│   └── tasks/                            ← Task Packet 存放
\`\`\`
`,

  'docs/harness/TASK_PACKET_SPEC.md': `# Task Packet Spec

类型：Contract
归属层：method
状态：Active
版本：v1.1

Task packet 是非 trivial 任务的工具无关输入格式。

## 1. 存放位置

\`\`\`
docs/harness/tasks/YYYY-MM-DD-<task-name>.task.md
\`\`\`

## 2. 必填字段

- Goal
- Primary Layer
- Scope (In/Out)
- Verification Plan
- Evidence Required
- Human Gates
- Completion Checklist

## 3. 新增字段（v1.1+）

- Priority: critical | high | medium | low
- Estimated Complexity: trivial | simple | moderate | complex | epic
- Technical Debt Flag
- Dependencies (blockedBy/blocks)

详细规范请参考 harness-engineering/docs/harness/TASK_PACKET_SPEC.md
`,

  'docs/harness/VERIFICATION_EVIDENCE_SPEC.md': `# Verification Evidence Spec

类型：Contract
归属层：method
状态：Active
版本：v1.1

本文定义任务验证证据的格式。

## 1. 证据目录

\`\`\`
.harness/evidence/<task-id>/
├── summary.md
├── commands.json
├── screenshots/
├── smoke-results/
├── logs/
└── review.md
\`\`\`

## 2. 质量标准

- 截图格式：PNG，最大 2MB
- 截图分辨率：桌面 1920x1080，移动 375x812
- 日志格式：[LEVEL] [TIMESTAMP] [SOURCE] MESSAGE

详细规范请参考 harness-engineering/docs/harness/VERIFICATION_EVIDENCE_SPEC.md
`,

  'docs/harness/REVIEW_LOOP_SPEC.md': `# Review Loop Spec

类型：Contract
归属层：method
状态：Active

本文定义 Review 循环的规范。

## 1. Review 目标

- 验证实现符合 Task Packet
- 检查代码质量和安全性
- 验证 Evidence 完整性

## 2. Review 角色

- Structural Reviewer: 架构和设计
- Security Reviewer: 安全审计
- Quality Reviewer: 质量门禁

详细规范请参考 harness-engineering/docs/harness/REVIEW_LOOP_SPEC.md
`,

  'docs/harness/AGENT_INTERFACE_CONTRACT.md': `# Agent Interface Contract

类型：Contract
归属层：method
状态：Active

本文定义 Agent 必须提供的能力和禁止行为。

## 1. 必需能力

- 任务执行和验证
- Evidence 生成
- 错误报告和恢复

## 2. 禁止行为

- 绕过 Human Gate
- 未生成 Evidence 就声称完成
- 自行扩大任务范围

详细规范请参考 harness-engineering/docs/harness/AGENT_INTERFACE_CONTRACT.md
`,

  'docs/harness/FAILURE_RATCHET_POLICY.md': `# Failure Ratchet Policy

类型：Policy
归属层：method
状态：Active

本文定义失败升级机制。

## 1. 升级级别

| 级别 | 触发条件 | 升级动作 |
|---|---|---|
| L1 | 单次失败 | 写入 closeout note |
| L2 | 第二次出现 | 升级为 guide、task packet 模板 |
| L3 | 第三次出现 | 升级为 test、static check |

详细规范请参考 harness-engineering/docs/harness/FAILURE_RATCHET_POLICY.md
`,

  'docs/harness/HANDOFF_PROTOCOL.md': `# Agent 间交接协议

类型：Contract
归属层：method
状态：Active
版本：v1.0

本文定义 agent 间交接的标准化流程、状态机和检查清单。

## 1. 交接触发条件

| 场景 | 触发者 | 接收者 |
|---|---|---|
| Planner -> Generator | Task Packet 准备完成 | Generator 启动 |
| Generator -> Reviewer | 实现完成 + Evidence 生成 | Reviewer 审查 |

## 2. 交接检查清单

- 代码改动在 Task Packet 范围内
- 所有验证命令已执行
- Evidence 已生成并命名规范

详细规范请参考 harness-engineering/docs/harness/HANDOFF_PROTOCOL.md
`,

  'docs/harness/ERROR_RECOVERY_STRATEGY.md': `# 错误恢复策略

类型：Policy
归属层：method
状态：Active
版本：v1.0

本文定义 harness 中的错误分类和恢复策略。

## 1. 错误分类

| 级别 | 类型 | 示例 | 自动恢复 |
|---|---|---|---|
| L1 | 可重试 | 网络超时、依赖拉取失败 | 是 |
| L2 | 可修复 | Lint 错误、测试失败 | 否 |
| L3 | 需澄清 | 需求歧义、scope 漂移 | 否 |
| L4 | 需升级 | 架构冲突、安全问题 | 否 |

## 2. 升级路径

\`\`\`
L1 失败 3 次 -> L2
L2 失败 3 次 -> L3
L3 无法澄清 -> L4
L4 Human 拒绝 -> 任务终止
\`\`\`

详细规范请参考 harness-engineering/docs/harness/ERROR_RECOVERY_STRATEGY.md
`,
};

function printHelp() {
  console.log(`Usage:
  node scripts/harness/bootstrap-harness.mjs --project-path <path>
  node scripts/harness/bootstrap-harness.mjs --dry-run --project-path <path>
  node scripts/harness/bootstrap-harness.mjs --help

Options:
  --project-path <path>    Target project path (default: current directory)
  --dry-run                Show what would be created without creating files
  --help, -h               Show this help message

Examples:
  node scripts/harness/bootstrap-harness.mjs
  node scripts/harness/bootstrap-harness.mjs --project-path /tmp/my-project
  node scripts/harness/bootstrap-harness.mjs --dry-run --project-path /tmp/my-project`);
}

function parseArgs(argv) {
  const options = {
    projectPath: DEFAULT_ROOT,
    dryRun: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--project-path') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('--project-path requires a path');
      }
      options.projectPath = path.resolve(value);
      index += 1;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      console.warn(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function ensureDir(dirPath, dryRun = false) {
  if (dryRun) {
    console.log(`  [dry-run] Would create directory: ${dirPath}`);
    return;
  }

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  Created directory: ${dirPath}`);
  } else {
    console.log(`  Directory exists: ${dirPath}`);
  }
}

function writeFile(filePath, content, dryRun = false) {
  const dir = path.dirname(filePath);
  ensureDir(dir, dryRun);

  if (dryRun) {
    console.log(`  [dry-run] Would create file: ${filePath}`);
    return;
  }

  if (fs.existsSync(filePath)) {
    console.log(`  File exists, skipping: ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Created file: ${filePath}`);
}

function createHarnessStructure(projectPath, dryRun = false) {
  console.log(`\nCreating harness structure in: ${projectPath}`);

  // Create directories
  console.log('\nDirectories:');
  for (const dir of HARNESS_DIRS) {
    const fullPath = path.join(projectPath, dir);
    ensureDir(fullPath, dryRun);
  }

  // Create .gitkeep files
  console.log('\n.gitkeep files:');
  for (const file of EVIDENCE_SUB_DIRS) {
    const fullPath = path.join(projectPath, file);
    if (!file.endsWith('.gitkeep')) {
      ensureDir(path.dirname(fullPath), dryRun);
    }
    const gitkeepPath = path.join(path.dirname(fullPath), '.gitkeep');
    writeFile(gitkeepPath, '', dryRun);
  }

  // Create core contracts
  console.log('\nCore contracts:');
  for (const contract of CORE_CONTRACTS) {
    const fullPath = path.join(projectPath, contract);
    const template = CORE_CONTRACT_TEMPLATES[contract];
    if (template) {
      writeFile(fullPath, template, dryRun);
    } else {
      writeFile(fullPath, `# ${path.basename(contract, '.md')}\n\nSee harness-engineering for canonical version.\n`, dryRun);
    }
  }

  // Create tasks directory
  console.log('\nTasks directory:');
  const tasksDir = path.join(projectPath, 'docs/harness/tasks');
  ensureDir(tasksDir, dryRun);

  // Create README
  console.log('\nREADME:');
  const readmePath = path.join(projectPath, 'docs/harness/README.md');
  const readmeContent = `# Harness Contracts

本目录包含 Pantheon Harness 方法论的合同和规范。

## 目录结构

\`\`\`
docs/harness/
├── HARNESS_ENGINEERING_CONTRACT.md    # 核心合同
├── TASK_PACKET_SPEC.md                 # Task Packet 规范
├── VERIFICATION_EVIDENCE_SPEC.md      # 验证证据规范
├── REVIEW_LOOP_SPEC.md                # Review 循环规范
├── AGENT_INTERFACE_CONTRACT.md        # Agent 接口合同
├── FAILURE_RATCHET_POLICY.md          # 失败棘轮策略
├── HANDOFF_PROTOCOL.md                # 交接协议
├── ERROR_RECOVERY_STRATEGY.md        # 错误恢复策略
└── tasks/                            # Task Packet 存放
    └── YYYY-MM-DD-<task-name>.task.md
\`\`\`

## 版本

- 规范版本：v1.1
- 引导时间：${new Date().toISOString()}

## 更多信息

- Canonical 源：harness-engineering/docs/harness/
- 方法论总纲：harness-engineering/docs/methodology/HARNESS_METHODOLOGY.zh.md
`;
  writeFile(readmePath, readmeContent, dryRun);
}

function createCIWorkflow(projectPath, dryRun = false) {
  console.log('\nCI Workflow template:');

  const ciDir = path.join(projectPath, '.github/workflows');
  ensureDir(ciDir, dryRun);

  const workflowContent = `# name: Harness Quality Gates

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  harness-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Check Task Packet format
        run: node scripts/harness/check-task-packet.mjs

      - name: Check Evidence format
        run: node scripts/harness/check-evidence.mjs

      - name: Check Review format
        run: node scripts/harness/check-review.mjs

      - name: Check documentation links
        run: node scripts/harness/check-doc-links.mjs

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.21'

      - name: Run tests
        run: go test ./...

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
`;
  writeFile(path.join(ciDir, 'harness-quality.yml'), workflowContent, dryRun);
}

function printSummary(projectPath, dryRun = false) {
  console.log(`\n${'='.repeat(60)}`);
  if (dryRun) {
    console.log('DRY RUN COMPLETE - No files were created');
  } else {
    console.log('BOOTSTRAP COMPLETE');
  }
  console.log('='.repeat(60));
  console.log(`\nProject: ${projectPath}`);
  console.log('\nCreated structure:');
  console.log('  .harness/');
  console.log('    ├── evidence/');
  console.log('    ├── state/');
  console.log('    ├── errors/');
  console.log('    └── checkpoints/');
  console.log('  docs/harness/');
  console.log('    ├── HARNESS_ENGINEERING_CONTRACT.md');
  console.log('    ├── TASK_PACKET_SPEC.md');
  console.log('    ├── VERIFICATION_EVIDENCE_SPEC.md');
  console.log('    ├── REVIEW_LOOP_SPEC.md');
  console.log('    ├── AGENT_INTERFACE_CONTRACT.md');
  console.log('    ├── FAILURE_RATCHET_POLICY.md');
  console.log('    ├── HANDOFF_PROTOCOL.md');
  console.log('    ├── ERROR_RECOVERY_STRATEGY.md');
  console.log('    ├── README.md');
  console.log('    └── tasks/');
  console.log('  .github/workflows/');
  console.log('    └── harness-quality.yml');
  console.log('\nNext steps:');
  console.log('  1. Review and customize the contracts in docs/harness/');
  console.log('  2. Add scripts to package.json for harness checks');
  console.log('  3. Run: node scripts/harness/check-task-packet.mjs');
  console.log('\nFor more information, see:');
  console.log('  - harness-engineering/docs/methodology/HARNESS_METHODOLOGY.zh.md');
  console.log('  - harness-engineering/docs/harness/');
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Run with --help for usage information.');
    return 1;
  }

  if (options.help) {
    printHelp();
    return 0;
  }

  console.log('='.repeat(60));
  console.log('Pantheon Harness Bootstrap');
  console.log('='.repeat(60));

  if (options.dryRun) {
    console.log('\n[DRY RUN MODE - No files will be created]');
  }

  createHarnessStructure(options.projectPath, options.dryRun);
  createCIWorkflow(options.projectPath, options.dryRun);
  printSummary(options.projectPath, options.dryRun);

  return 0;
}

process.exitCode = main();
