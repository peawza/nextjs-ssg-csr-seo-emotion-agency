---
name: guided-rea
description: Guided REA (Read → Edit → Assure) workflow for safe, SEO-first changes in this Next.js static-export repo, driven from the CLI. Use when implementing, fixing, refactoring, or verifying a change and you want a repeatable checklist plus one-command validation.
---

# Guided REA Skill

REA is the safe change loop for this repository:

- **R — Read**: gather context before touching code.
- **E — Edit**: make the smallest safe change that satisfies the task.
- **A — Assure**: validate with real commands and record results.

This skill packages that loop so it can be run from the CLI with a single
verification entry point. It is aligned with `AGENTS.md`, the steering files in
`.kiro/steering/`, and the npm scripts in `package.json`.

## When to use

- Implementing a feature, fixing a bug, refactoring, or doing SEO/perf work.
- Before declaring any task done — run the Assure step and paste real output.

## The loop

### 1. Read (gather context)

Always inspect, in this order, before editing:

1. `docs/PROJECT_STATE.md` — current truth and handoff.
2. `docs/architecture/ARCHITECTURE.md` and any relevant `docs/decisions/ADR-*`.
3. Applicable docs in `docs/design/` (design + CSS must stay in sync).
4. Recent files in `docs/agent-logs/`.
5. `git status --short` and the exact target files.

Give the task an ID (e.g. `SEO-003`, `DEPLOY-002`) and state scope + acceptance
tests before editing.

### 2. Edit (smallest safe change)

- TypeScript strict; server/static components by default.
- `use client` only at interactive leaves.
- No request-time SSR, ISR, Server Actions, middleware, request-dependent API
  routes, runtime image optimizer, or ungenerated dynamic paths.
- SEO-critical content must exist in exported HTML without JavaScript.
- CSS tokens + CSS Modules; keep design markdown and CSS synchronized.
- Preserve uncommitted user edits; avoid unrelated refactors.

### 3. Assure (validate with real commands)

Run the bundled verification script, which chains the repo's own npm scripts:

```bash
# from the workspace root
node .kiro/skills/guided-rea/scripts/rea-verify.mjs
```

Or run the underlying steps individually:

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # eslint .
npm run build         # next build (produces static export in out/)
npm run verify:html   # static HTML SEO assertions against out/
```

Report each as **pass / fail / NOT RUN** with the actual output. Never report an
estimated Lighthouse score as measured. If a step cannot run, say `NOT RUN` and
why.

### 4. Log the handoff

After Assure passes:

- Update / create `docs/agent-logs/YYYY-MM-DD-TASK-ID-KIRO.md` from
  `docs/agent-logs/TEMPLATE.md`.
- Update `docs/PROJECT_STATE.md` with the next actionable step.
- End the user-facing message with exact paths to the log and state file.

## Quick reference

| Step | Goal | CLI |
| --- | --- | --- |
| Read | Context + task ID + scope | `git status --short` |
| Edit | Smallest safe change | (editor) |
| Assure | Real validation | `node .kiro/skills/guided-rea/scripts/rea-verify.mjs` |
| Log | Handoff | update `docs/agent-logs/` + `docs/PROJECT_STATE.md` |
