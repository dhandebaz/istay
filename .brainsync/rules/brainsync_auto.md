

# Project Memory — istay
> 569 notes | Score threshold: >40

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

- **⚠️ GOTCHA: problem-fix in agent-rules.md** — - - Fixed null crash in CaretakerChecklist — avoids unnecessary re-ren
- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "688569d3ede65bdd",
+
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

## Project Standards

- Strengthened types IdVerification
- problem-fix in agent-rules.md — confirmed 5x
- what-changed in shared-context.json — confirmed 11x
- problem-fix in shared-context.json — confirmed 3x
- Fixed null crash in Compression — prevents null/undefined runtime crashes — confirmed 6x
- convention in shared-context.json
- Replaced auth AddProperty — improves module reusability — confirmed 3x
- Added JWT tokens authentication — confirmed 3x

## Known Fixes

- ❌ - - Fixed null crash in CaretakerChecklist — avoids unnecessary re-renders in React → ✅ problem-fix in agent-rules.md
- ❌ -         return Response.json({ error: "All fields are required" }, { status: 400 }); → ✅ Fixed null crash in Handlers
- ❌ -   const [error, setError] = useState<string | null>(null); → ✅ Fixed null crash in ProofOfCleanUploaderProps — avoids unnecessary re-renders...

## Recent Decisions

- decision in IdVerification.tsx
- Optimized Score — evolves the database schema to support new requirements
- Optimized Score — evolves the database schema to support new requirements
- Optimized Score — evolves the database schema to support new requirements

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
