

# Project Memory — istay
> 1069 notes | Score threshold: >40

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

- **⚠️ GOTCHA: Optimized Score — evolves the database schema to support new requirements** — - > 1048 notes | Score threshold: >40
+ > 1051 notes | Score threshold
- **⚠️ GOTCHA: Added JWT tokens authentication** — - > 1045 notes | Score threshold: >40
+ > 1048 notes | Score threshold
- **⚠️ GOTCHA: Optimized Score** — - > 1042 notes | Score threshold: >40
+ > 1045 notes | Score threshold
- **⚠️ GOTCHA: Added JWT tokens authentication** — - > 1039 notes | Score threshold: >40
+ > 1042 notes | Score threshold
- **⚠️ GOTCHA: Optimized Score — evolves the database schema to support new requirements** — - > 1033 notes | Score threshold: >40
+ > 1039 notes | Score threshold
- **⚠️ GOTCHA: problem-fix in agent-rules.md** — - - problem-fix in _app.tsx
+ - problem-fix in agent-rules.md
- - prob

## Project Standards

- what-changed in brainsync_auto.md — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- Added JWT tokens authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- what-changed in shared-context.json — confirmed 3x
- Added JWT tokens authentication — confirmed 3x
- discovery in shared-context.json — confirmed 3x
- Added JWT tokens authentication — confirmed 3x

## Known Fixes

- ❌ - - ⚠️ GOTCHA: Fixed null crash in ProofOfCleanUploader — avoids unnecessary re-renders in R... → ✅ problem-fix in agent-rules.md
- ❌ -   const [error, setError] = useState<string | null>(null); → ✅ problem-fix in PricingCheckout.tsx
- ❌ - - Fixed null crash in CryptoKey — uses a proper password hashing algorithm → ✅ problem-fix in agent-rules.md
- ❌ - - Fixed null crash in LedgerEntry — avoids unnecessary re-renders in React → ✅ problem-fix in agent-rules.md
- ❌ - - Fixed null crash in Math → ✅ problem-fix in agent-rules.md

## Recent Decisions

- Optimized Legal — offloads heavy computation off the main thread
- Optimized Implementation — offloads heavy computation off the main thread
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
