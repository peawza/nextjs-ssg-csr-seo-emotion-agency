# PROJECT STATE — Canonical AI Handoff

Last updated: 2026-10-31 (Asia/Bangkok)
Status: **CLEAN-ROOM 3D HERO BUILT + STATIC EXPORT VERIFIED (LIGHTHOUSE NOT RUN)**

## Project purpose
SEO-first Emotion agency marketing website with build-time static HTML and progressive cinematic 3D/WebGL, deployed as a static export to Cloudflare Pages.

## Current state (after SITE-001 + UI-002 + UI-003)
- Routes: `/`, `/about/`, `/services/`, `/work/`; all statically exported.
- Content is data-driven in `src/content/home.ts` and `src/content/about.ts`.
- Homepage uses a dark cinematic editorial system below a full-viewport clean-room 3D hero.
- The hero now builds a real Three.js perspective world: lavender sky/clouds, animated water, low-poly rock horizon, instanced grass, atmospheric debris, a luminous satellite and layered particle sculpture with a purple particle crown.
- Hero typography uses an italic serif “Where” plus uppercase serif statement over the 3D foreground, following reference composition without copying fonts/assets.
- `CinematicScene.tsx` dynamically imports Three.js in one client leaf. It has a CSS fallback, desktop/mobile density scaling, DPR caps, reduced-motion still frame, offscreen/hidden pause, context-loss fallback and complete resource cleanup.
- `MotionEnhancer.tsx` provides route-aware reveal choreography and a fine-pointer cursor while SEO content remains in static server components.
- AI interface/chat/assistant content is absent and verified absent in exported HTML.
- Organization JSON-LD remains on home; FAQPage JSON-LD remains on about.
- Temporary source/local screenshots and capture scripts were removed after visual comparison.

## Dependencies
- Runtime: Next, React, React DOM, `three@0.187.0`.
- Development: matching `@types/three@0.187.0` plus existing TypeScript/ESLint types.
- npm reported 16 moderate dependency-tree audit findings during install; no breaking `audit fix --force` was applied.

## Verification results (UI-003, 2026-10-31)
- Final guided REA run: **PASS**.
- `npm run typecheck`: **PASS**.
- `npm run lint`: **PASS** (0 errors; 1 existing warning in `eslint.config.mjs`).
- `npm run build`: **PASS**; Next.js 16.4.3 generated all content routes as static.
- `npm run verify:html`: **PASS** (home/about/services/work + robots + sitemap).
- Playwright local/reference comparison at 1440×1000: **PASS** after two scene iterations.
- Playwright local/reference comparison at 390×844: **PASS**.
- AI phrase search in exported HTML: **PASS**, no matches.
- `git diff --check`: **PASS**; existing tsconfig line-ending notice only.
- Lighthouse mobile/desktop: **NOT RUN**.
- Production deployment: **NOT RUN**.

## Known risks
- This is an original clean-room recreation of the visible composition, not the proprietary source model/shader.
- Three.js increases client JS/GPU cost; measure Lighthouse and frame timing on representative devices before launch.
- Procedural project panels still replace source project imagery to avoid using unlicensed assets.
- Marketing copy, award claims and `hello@emotion-agency.com` require business-owner confirmation.
- Mobile menu opening requires client hydration.

## Next suggested task
PERF-003: Run measured Lighthouse mobile/desktop and real-device GPU/frame profiling; tune particle/grass counts and DPR based on measured results.

## Handoff protocol
Read `AGENTS.md` → this file → relevant design specs → recent agent logs → git status. After task completion, update this file and record measured validation results.
