

# Project Memory — istay
> 79 notes | Score threshold: >40

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

- **⚠️ GOTCHA: Strengthened types Fixed** — - - Fixed null crash in Guest — prevents null/undefined runtime crashe
- **gotcha in brainsync_auto.md** — - > 35 notes | Score threshold: >40
+ > 36 notes | Score threshold: >4
- **gotcha in brainsync_auto.md** — - > 27 notes | Score threshold: >40
+ > 30 notes | Score threshold: >4
- **gotcha in agent-rules.md** — File updated (external): .brainsync/agent-rules.md

Content summary (3

## Project Standards

- Strengthened types Optimized
- Added API key auth authentication — prevents XSS injection attacks — confirmed 3x
- what-changed in shared-context.json — confirmed 7x
- Strengthened types Optimized
- Strengthened types Optimized
- Strengthened types Fixed
- Strengthened types Optimized
- what-changed in shared-context.json — confirmed 3x

## Recent Decisions

- Optimized Property — parallelizes async operations for speed
- Optimized Score — evolves the database schema to support new requirements
- Optimized Project — evolves the database schema to support new requirements
- Optimized Score — evolves the database schema to support new requirements

## Verified Best Practices

- Agent generates new migration for every change (squash related changes)
- Agent installs packages without checking if already installed

## Available Tools (ON-DEMAND only)
- `query(q)` — Deep search when stuck
- `find(query)` — Full-text lookup
> Context above IS your context. Do NOT call load() at startup.
