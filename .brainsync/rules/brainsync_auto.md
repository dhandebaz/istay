

# Project Memory — istay
> 531 notes | Score threshold: >40

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

**Stack:** Unknown stack

## 📝 NOTE: 1 uncommitted file(s) in working tree.\n\n## Important Warnings

- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "5c7fd3e34ec51388",
+
- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "cbc2226d3ffd6326",
+
- **⚠️ GOTCHA: Added JWT tokens authentication** — - - ⚠️ GOTCHA: Optimized GOTCHA
+ - gotcha in agent-rules.md
- - ⚠️ GO
- **gotcha in agent-rules.md** — File updated (external): .brainsync/agent-rules.md

Content summary (8
- **⚠️ GOTCHA: Optimized GOTCHA** — - - ⚠️ GOTCHA: Optimized GOTCHA
+ - ⚠️ GOTCHA: Added JWT tokens authen
- **⚠️ GOTCHA: Added JWT tokens authentication — evolves the database schema to support new ...** — - > 442 notes | Score threshold: >40
+ > 446 notes | Score threshold: 

## Project Standards

- Strengthened types EarningsComparison — parallelizes async operations for speed
- Replaced auth AddProperty — improves module reusability — confirmed 6x
- Optimized Score — confirmed 3x
- what-changed in shared-context.json — confirmed 3x
- Strengthened types ComponentChildren — parallelizes async operations for speed
- what-changed in brainsync_auto.md — confirmed 3x
- decision in index.tsx — confirmed 3x
- Added JWT tokens authentication — confirmed 3x

## Known Fixes

- ❌ -         return Response.json({ error: "All fields are required" }, { status: 400 }); → ✅ Fixed null crash in Handlers

## Recent Decisions

- decision in index.tsx
- Optimized Score — evolves the database schema to support new requirements
- decision in brainsync_auto.md
- decision in CheckoutForm.tsx

## Learned Patterns

- Always: Updated schema Score — evolves the database schema to support new requirements — confirmed 3x (seen 2x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 2x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 3x)
- Agent generates new migration for every change (squash related changes)
- Agent installs packages without checking if already installed

## Available Tools (ON-DEMAND only)
- `sys_core_01(q)` — Deep search when stuck
- `sys_core_05(query)` — Full-text lookup
> Context above IS your context. Do NOT call sys_core_14() at startup.
