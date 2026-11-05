# Design System — Emotion Cinematic Direction

Update this file **and** `src/styles/tokens.css` whenever design tokens change.

## Brand style
- Visual direction: cinematic, dark, typography-led, high contrast and intentionally oversized.
- Primary surfaces use near-black with warm cream text. Acid green signals action; violet supports atmospheric depth.
- Layout alternates immersive dark scenes with high-contrast cream and acid sections.
- Procedural visuals replace unlicensed photography. Meaningful text remains HTML, never canvas or an image.
- English is the published interface language (`lang="en"`).

## Design tokens
| Token | Intent | Value |
|---|---|---|
| `--color-bg` | Near-black primary background | `#0a0a0c` |
| `--color-surface` | Dark raised surface | `#151519` |
| `--color-elevated` | Interactive dark surface | `#202027` |
| `--color-text` | Warm primary text | `#f2efe6` |
| `--color-muted` | Supporting text | `#aaa79f` |
| `--color-accent` | Acid action color | `#c7ff29` |
| `--color-accent-secondary` | Atmospheric violet | `#6b42ff` |
| `--color-border` | Dark separators | `#34343b` |
| `--color-cream` | Light editorial surface | `#f2efe6` |
| `--color-ink` | Text on light/accent surfaces | `#111115` |
| `--content-max` | Large cinematic content width | `90rem` |
| `--radius-card` | Restrained visual corner | `.35rem` |
| `--space-section` | Fluid section spacing | `clamp(6rem, 11vw, 11rem)` |
| `--gutter` | Fluid viewport gutter | `clamp(1rem, 3vw, 3rem)` |

## Component design principles
- Large typography sets hierarchy; avoid decorative card chrome where editorial rules suffice.
- Alternate asymmetric layouts, edge-to-edge visual fields and precise separators.
- Keep interactive affordances visible through underline, contrast and focus rings, not motion alone.
- Use CSS Modules and tokens; no inline hard-coded brand colors where a token exists.
- WebGL and pointer treatments are decorative progressive enhancement. CSS provides the complete fallback.
- The 3D scene uses original procedural Three.js geometry only; no reference-site models, textures or shaders are copied.
- Preserve comfortable paragraph measure even when headings are oversized.
