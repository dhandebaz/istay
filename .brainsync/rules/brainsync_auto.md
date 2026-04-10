

# Project Memory — istay
> 132 notes | Score threshold: >40

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
+       "id": "a58d2809e01b853e",
+
- **⚠️ GOTCHA: Strengthened types Optimized** — - 
+ - Optimized Score
- ## Recent fixes
+ 
- 
+ ## Recent fixes
- - F
- **⚠️ GOTCHA: Strengthened types Fixed** — - - Fixed null crash in Guest — prevents null/undefined runtime crashe
- **gotcha in brainsync_auto.md** — - > 35 notes | Score threshold: >40
+ > 36 notes | Score threshold: >4
- **gotcha in brainsync_auto.md** — - > 27 notes | Score threshold: >40
+ > 30 notes | Score threshold: >4
- **gotcha in agent-rules.md** — File updated (external): .brainsync/agent-rules.md

Content summary (3

## Project Standards

- what-changed in shared-context.json — confirmed 4x
- what-changed in shared-context.json — confirmed 6x
- Strengthened types Fixed
- Strengthened types PricingCheckout — prevents null/undefined runtime crashes
- Strengthened types Fixed
- Strengthened types Person — optimizes data fetching with relational query ins...
- discovery in shared-context.json — confirmed 3x
- Strengthened types Person — ensures atomic multi-step database operations

## Recent Decisions

- decision in contact.tsx
- decision in IdVerification.tsx
- decision in Footer.tsx
- decision in Header.tsx

## Verified Best Practices

- Agent generates new migration for every change (squash related changes)
- Agent installs packages without checking if already installed

## Available Tools (ON-DEMAND only)
- `query(q)` — Deep search when stuck
- `find(query)` — Full-text lookup
> Context above IS your context. Do NOT call load() at startup.
