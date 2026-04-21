

# Project Memory — istay
> 1375 notes | Score threshold: >40

## Safety — Never Run Destructive Commands

> Dangerous commands are actively monitored.
> Critical/high risk commands trigger error notifications in real-time.

- **NEVER** run `rm -rf`, `del /s`, `rmdir`, `format`, or any command that deletes files/directories without EXPLICIT user approval.
- **NEVER** run `DROP TABLE`, `DELETE FROM`, `TRUNCATE`, or any destructive database operation.
- **NEVER** run `git push --force`, `git reset --hard`, or any command that rewrites history.
- **NEVER** run `npm publish`, `docker rm`, `terraform destroy`, or any irreversible deployment/infrastructure command.
- **NEVER** pipe remote scripts to shell (`curl | bash`, `wget | sh`).
- **ALWAYS** ask the user before running commands that modify system state, install packages, or make network requests.
- When in doubt, **show the command first** and wait for approval.

**Stack:** JavaScript

## 📝 NOTE: 1 uncommitted file(s) in working tree.\n\n## Important Warnings

- **⚠️ GOTCHA: Added JWT tokens authentication — ensures atomic multi-step database operations** — - > 1333 notes | Score threshold: >40
+ > 1370 notes | Score threshold
- **⚠️ GOTCHA: problem-fix in agent-rules.md** — - - problem-fix in PricingCheckout.tsx
+ - problem-fix in agent-rules.
- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "3ca9f0c7d6350ab6",
+
- **⚠️ GOTCHA: problem-fix in agent-rules.md** — - - Fixed null crash in WalletTransaction — reduces initial bundle siz
- **⚠️ GOTCHA: Added JWT tokens authentication — introduces API versioning for backward comp...** — - > 1318 notes | Score threshold: >40
+ > 1322 notes | Score threshold
- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "4bf23753650c6f9e",
+

## Project Standards

- Added JWT tokens authentication — introduces API versioning for backward comp... — confirmed 8x
- what-changed in shared-context.json — confirmed 8x
- problem-fix in agent-rules.md — confirmed 5x
- what-changed in pay.ts — confirmed 3x
- Patched security issue EaxTta — confirmed 3x
- Updated Header database schema — confirmed 3x
- what-changed in EarningsCalculator.tsx — confirmed 4x
- Added JWT tokens authentication — introduces API versioning for backward comp... — confirmed 9x

## Known Fixes

- ❌ - - ⚠️ GOTCHA: Fixed null crash in ProofOfCleanUploader — avoids unnecessary re-renders in R... → ✅ problem-fix in agent-rules.md
- ❌ -   const [error, setError] = useState<string | null>(null); → ✅ problem-fix in PricingCheckout.tsx
- ❌ - - Fixed null crash in CryptoKey — uses a proper password hashing algorithm → ✅ problem-fix in agent-rules.md
- ❌ - - Fixed null crash in LedgerEntry — avoids unnecessary re-renders in React → ✅ problem-fix in agent-rules.md
- ❌ - - Fixed null crash in Math → ✅ problem-fix in agent-rules.md

## Recent Decisions

- Optimized Score — evolves the database schema to support new requirements
- Optimized Score — evolves the database schema to support new requirements
- Optimized Legal — offloads heavy computation off the main thread
- Optimized Implementation — offloads heavy computation off the main thread

## Learned Patterns

- Always: Updated schema Score — evolves the database schema to support new requirements — confirmed 3x (seen 2x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 3x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 4x)
- Agent generates new migration for every change (squash related changes)
- Agent installs packages without checking if already installed

### 📚 Core Framework Rules: [czlonkowski/n8n-code-javascript]
# JavaScript Code Node

Expert guidance for writing JavaScript code in n8n Code nodes.

---

## Quick Start



### Essential Rules

1. **Choose "Run Once for All Items" mode** (recommended for most use cases)
2. **Access data**: `$input.all()`, `$input.first()`, or `$input.item`
3. **CRITICAL**: Must return `[{json: {...}}]` format
4. **CRITICAL**: Webhook data is under `$json.body` (not `$json` directly)
5. **Built-ins available**: $helpers.httpRequest(), DateTime (Luxon), $jmespath()

---

## Mode Selection Guide

The Code node offers two execution modes. Choose based on your use case:

### Run Once for All Items (Recommended - Default)

**Use this mode for:** 95% of use cases

- **How it works**: Code executes **once** regardless of input count
- **Data access**: `$input.all()` or `items` array
- **Best for**: Aggregation, filtering, batch processing, transformations, API calls with all data
- **Performance**: Faster for multiple items (single execution)



**When to use:**
- ✅ Comparing items across the dataset
- ✅ Calculating totals, averages, or statistics
- ✅ Sorting or ranking items
- ✅ Deduplication
- ✅ Building aggregated reports
- ✅ Combining data from multiple items

### Run Once for Each Item

**Use this mode for:** Specialized cases only

- **How it works**: Code executes **separately** for each input item
- **Data access**: `$input.item` or `$item`
- **Best for**: Item-specific logic, independent operations, per-item validation
- **Performance**: Slower for large datasets (multiple executions)



**When to use:**
- ✅ Each item needs independent API call
- ✅ Per-item validation with different error handling
- ✅ Item-specific transformations based on item properties
- ✅ When items must be processed separately for business logic

**Decision Shortcut:**
- **Need to look at multiple items?** → Use "All Items" mode
- **Each item completely independent?** → Use "Each Item" mode
- **Not sure?** → Use "All Items" mode (you can always loop inside)

---

## Data Access Patterns

### Pattern 1: $input.all() - Most Common

**Use when**: Processing arrays, batch operations, aggregations



### Pattern 2: $input.first() - Very Common

**Use when**: Working with single objects, API responses, first-in-first-out



### Pattern 3: $input.item - Each Item Mode Only

**Use when**: In "Run Once for Each Item" mode



### Pattern 4: $node - Reference Other Nodes

**Use when**: Need data from specific nodes in workflow



**See**: [DATA_ACCESS.md](DATA_ACCESS.md) ...
(truncated)

- [JavaScript/TypeScript] Use === not == (strict equality prevents type coercion bugs)
- [JavaScript/TypeScript] Use const by default, let when reassignment needed, never var

## Available Tools (ON-DEMAND only)
- `sys_core_01(q)` — Deep search when stuck
- `sys_core_05(query)` — Full-text lookup
> Context above IS your context. Do NOT call sys_core_14() at startup.
