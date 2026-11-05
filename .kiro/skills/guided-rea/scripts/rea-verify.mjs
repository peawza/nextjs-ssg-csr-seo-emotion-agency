#!/usr/bin/env node
// Guided REA — Assure step.
// Runs the repository's own validation scripts in order and prints a
// pass/fail summary. Intended to be run from the workspace root:
//
//   node .kiro/skills/guided-rea/scripts/rea-verify.mjs
//
// Flags:
//   --skip-build   skip `npm run build` and the HTML verification that needs out/
//   --only=a,b     run only the named steps (typecheck,lint,build,verify:html)
//
// Exit code is non-zero if any executed step fails, so it is CI-friendly.

import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const skipBuild = args.includes("--skip-build");
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length).split(",").map((s) => s.trim()) : null;

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

// step key -> npm script name
const allSteps = [
  { key: "typecheck", script: "typecheck", label: "Type check (tsc --noEmit)" },
  { key: "lint", script: "lint", label: "Lint (eslint .)" },
  { key: "build", script: "build", label: "Build (next build)" },
  { key: "verify:html", script: "verify:html", label: "Static HTML SEO assertions" },
];

function selected(step) {
  if (only) return only.includes(step.key);
  if (skipBuild && (step.key === "build" || step.key === "verify:html")) return false;
  return true;
}

const steps = allSteps.filter(selected);

console.log("Guided REA — Assure");
console.log("Steps:", steps.map((s) => s.key).join(" -> ") || "(none)");
console.log("");

const results = [];

for (const step of steps) {
  console.log(`\n=== ${step.label} ===`);
  const res = spawnSync(npmCmd, ["run", step.script], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  const ok = res.status === 0;
  results.push({ step: step.key, ok, status: res.status });
  if (!ok) {
    console.log(`\n[FAIL] ${step.key} exited with code ${res.status}`);
  }
}

console.log("\n----------------------------------------");
console.log("Guided REA summary");
for (const r of results) {
  console.log(`  ${r.ok ? "PASS" : "FAIL"}  ${r.step}`);
}
for (const s of allSteps) {
  if (!results.find((r) => r.step === s.key)) {
    console.log(`  SKIP  ${s.key}`);
  }
}
console.log("----------------------------------------");

const anyFail = results.some((r) => !r.ok);
process.exit(anyFail ? 1 : 0);
