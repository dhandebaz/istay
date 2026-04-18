

# Project Memory — istay
> 774 notes | Score threshold: >40

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
+       "id": "a4e75c09947ed7de",
-
- **⚠️ GOTCHA: Fixed null crash in Record — prevents null/undefined runtime crashes** — - export function parseCookies(cookieHeader: string | null): Record<st
- **⚠️ GOTCHA: Fixed null crash in ProofOfCleanUploader — avoids unnecessary re-renders in R...** — - import { useState, useRef, useMemo } from "preact/hooks";
+ import {
- **gotcha in privacy.tsx** — File updated (external): routes/legal/privacy.tsx

Content summary (27
- **gotcha in launching-istay.md** — File updated (external): content/blog/launching-istay.md

Content summ
- **gotcha in ip_rules.md** — File updated (external): .brainsync/ip_rules.md

Content summary (11 l

## Project Standards

- Strengthened types OtaSavingsChart
- Strengthened types Team — prevents null/undefined runtime crashes
- Strengthened types Booking — parallelizes async operations for speed
- Strengthened types Math — prevents null/undefined runtime crashes
- convention in deno.json
- convention in fresh.gen.ts
- Added JWT tokens authentication — confirmed 4x
- what-changed in shared-context.json — confirmed 6x

## Known Fixes

- ❌ -   const [error, setError] = useState<string | null>(null); → ✅ problem-fix in PricingCheckout.tsx
- ❌ - - Fixed null crash in CryptoKey — uses a proper password hashing algorithm → ✅ problem-fix in agent-rules.md
- ❌ -         return Response.json({ error: "All fields are required" }, { status: 400 }); → ✅ problem-fix in register.ts
- ❌ - - Fixed null crash in CaretakerChecklist — avoids unnecessary re-renders in React → ✅ problem-fix in agent-rules.md
- ❌ const step = useSignal<"details" | "submitting" | "success" | "error">( → ✅ problem-fix in RegisterForm.tsx

## Recent Decisions

- decision in index.tsx
- decision in index.tsx
- Optimized DashboardState — parallelizes async operations for speed
- Optimized Record — avoids unnecessary re-renders in React

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
