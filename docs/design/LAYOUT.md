# Responsive Layout

## Guiding principle
Mobile first, editorial and fluid. Use intrinsic sizing, `minmax()`, flex wrap and fluid spacing rather than fixed screenshot dimensions.

## Test widths
320 / 375 / 390 / 768 / 1024 / 1280 / 1440 / 1920 CSS px.

## Cinematic layout rules
- Container: `width: min(calc(100% - (var(--gutter) * 2)), var(--content-max))`.
- The fixed header occupies 4.75rem; hero and secondary pages include sufficient top padding.
- Home hero fills at least `100svh`; its WebGL canvas is absolute and never participates in layout.
- Large headings use `clamp()` and balanced wrapping. Paragraphs keep a readable measure.
- Project visuals reserve a 4:3 aspect ratio to prevent layout shift.
- Two-column projects and editorial splits collapse based on component needs at 680–900px.
- Alternating full-width surfaces must not create horizontal overflow; decorative rotated tickers clip within their section.

## Release acceptance
No accidental horizontal scroll, clipping, unreadable text, hidden controls, keyboard traps or layout shifts during enhancement initialization. Content remains usable when WebGL or JavaScript is unavailable.
