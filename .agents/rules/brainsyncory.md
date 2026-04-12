

# Project Memory — istay
> 398 notes | Score threshold: >40

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

- **⚠️ GOTCHA: Replaced auth Crucial — prevents null/undefined runtime crashes** — -   try {
+   let hostEmail = "";
-     const kv = await getKv();
+   
- **⚠️ GOTCHA: Fixed null crash in LedgerEntry — parallelizes async operations for speed** — -   saveBooking,
+   getPropertyById,
-   saveLedgerEntry,
+   saveBoo
- **⚠️ GOTCHA: Added JWT tokens authentication** — - > 348 notes | Score threshold: >40
+ > 351 notes | Score threshold: 
- **⚠️ GOTCHA: Added JWT tokens authentication** — - > 345 notes | Score threshold: >40
+ > 348 notes | Score threshold: 
- **⚠️ GOTCHA: Added JWT tokens authentication — evolves the database schema to support new ...** — - > 341 notes | Score threshold: >40
+ > 345 notes | Score threshold: 
- **gotcha in shared-context.json** — -     }
+     },
-   ]
+     {
- }
+       "id": "c2a830ae6f917113",
+

## Project Standards

- what-changed in brainsync_auto.md — confirmed 3x
- Added JWT tokens authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- Added JWT tokens authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- Added JWT tokens authentication — evolves the database schema to support new ... — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x

## Known Fixes

- ❌ -         return Response.json({ error: "All fields are required" }, { status: 400 }); → ✅ Fixed null crash in Handlers

## Recent Decisions

- decision in brainsync_auto.md
- decision in CheckoutForm.tsx
- decision in PricingCheckout.tsx
- decision in index.tsx

## Learned Patterns

- Always: Updated schema Score — evolves the database schema to support new requirements — confirmed 3x (seen 2x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 2x)
- Always: what-changed in brainsync_auto.md — confirmed 3x (seen 3x)
- Agent generates new migration for every change (squash related changes)
- Agent installs packages without checking if already installed

## Available Tools (ON-DEMAND only)
- `query(q)` — Deep search when stuck
- `find(query)` — Full-text lookup
> Context above IS your context. Do NOT call load() at startup.
