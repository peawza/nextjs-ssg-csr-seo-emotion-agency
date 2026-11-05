# Typography

- Base stack: Arial/Helvetica/system UI for fast rendering and a neutral grotesk character; no unlicensed web font is loaded.
- Display headings are fluid with `clamp()`, tight line-height (`.84–.95`) and negative tracking. Meaningful copy is never rendered inside WebGL or as an image.
- Body copy remains at least `1rem`, with line-height around `1.55` and constrained line length.
- H1 is the primary editorial heading; H2/H3 follow content hierarchy rather than visual size.
- Labels use small uppercase type with increased letter spacing; they do not replace descriptive headings.
- At 320–390px, headings use viewport-relative clamps and sections collapse to one column without horizontal overflow.
