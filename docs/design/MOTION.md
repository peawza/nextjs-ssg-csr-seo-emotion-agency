# Motion & Interaction Guidelines

## Motion language
- Motion should feel cinematic and continuous: slow atmospheric drift, decisive reveal easing and restrained magnetic-like hover responses.
- SEO content is visible in static HTML before hydration. WebGL never owns text, navigation or calls to action.
- Scroll reveals use opacity and transform only. Elements remain visible when JavaScript is unavailable or reduced motion is requested.
- Project visuals may scale/rotate on hover without changing layout.
- The awards ticker is decorative; the complete award list remains readable HTML.

## WebGL lifecycle
- The hero uses Three.js inside an isolated client leaf to render original procedural geometry: particle sculpture, instanced grass, low-poly rocks, animated water and atmospheric debris.
- Three.js is the only added visual runtime dependency; no React scene framework, timeline package, copied model, texture or source-site shader is used.
- Render resolution is capped at 1.5 device pixels per CSS pixel.
- The scene stops scheduling active draws for reduced motion, context loss and unmount; hidden/offscreen states avoid GPU draws.
- Pointer and scroll values alter only the decorative shader. The CSS gradient fallback displays while WebGL initializes or when unavailable.
- All animation frames, observers and listeners must be cancelled on unmount.

## Accessibility and fallbacks
- `prefers-reduced-motion: reduce` renders one still WebGL frame, disables ticker/reveal movement and removes animated hover transitions.
- Fine-pointer cursor enhancement is disabled for touch/coarse pointers and reduced motion.
- Focus, hover and active states remain visible without animation.
- Motion must not block the H1, CTA, navigation or any SEO-critical content.
