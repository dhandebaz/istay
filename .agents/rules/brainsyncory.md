

# Project Memory — istay
> 198 notes | Score threshold: >40

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

- **⚠️ GOTCHA: Added API key auth authentication** — - > 155 notes | Score threshold: >40
+ > 156 notes | Score threshold: 
- **⚠️ GOTCHA: Added API key auth authentication — evolves the database schema to support ne...** — - > 149 notes | Score threshold: >40
+ > 152 notes | Score threshold: 
- **⚠️ GOTCHA: Added API key auth authentication — evolves the database schema to support ne...** — - > 146 notes | Score threshold: >40
+ > 149 notes | Score threshold: 
- **⚠️ GOTCHA: Updated schema Score — evolves the database schema to support new requirements** — - > 138 notes | Score threshold: >40
+ > 146 notes | Score threshold: 
- **⚠️ GOTCHA: Updated schema Score — evolves the database schema to support new requirements** — - > 132 notes | Score threshold: >40
+ > 138 notes | Score threshold: 
- **⚠️ GOTCHA: Updated schema Optimized** — - - Optimized Score
+ - Optimized Score — evolves the database schema 

## Project Standards

- Added API key auth authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- Added API key auth authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x
- Added API key auth authentication — confirmed 3x
- what-changed in brainsync_auto.md — confirmed 3x

## Recent Decisions

- decision in settings.tsx
- decision in index.tsx
- decision in contact.tsx
- decision in IdVerification.tsx

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
