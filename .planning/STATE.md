# Project Living State

- **Milestone**: Phase 2.5 — Tangible Real-World 3D Objects Spatial Scroll [COMPLETED]
- **Completed**:
  - [x] Removed abstract primitives/AI slop (spheres, icosahedron, toruses)
  - [x] Procedural 3D Audio Cassette with spinning hubs & labeled canvas
  - [x] Procedural 3.5" Floppy Disk with sliding metal shutter & dev label
  - [x] Artisan Mechanical Keycap with frosted switch & `{ ; }` glyph
  - [x] Physical Polaroid card with handwritten caption & drop shadow
  - [x] Matte ceramic coffee mug with liquid coffee surface
  - [x] Synchronized scroll choreography and desktop mouse parallax
- **Status**: Dev server running smoothly on `http://localhost:3000`



## Key Decisions & Conventions
- **Data Source**: Always read from `src/data/portfolioData.ts`. Do not hardcode biographical data in components.
- **Design Tokens**: Dark graphite, indigo, cyan accents, subtle rose borders for freelancing card (`#E11D48`).
- **Filter Bar**: Extracted dynamically from project dataset with live count badges.
- **Copy Email**: Uses `navigator.clipboard` with 2s "Copied!" green feedback.


## Session Log
- Git repository initialized with baseline commit.
- GSD spec-driven framework initialized (`.planning/`).
- Ralph Loop installed (`scripts/ralph/`, `.agents/skills/`).
