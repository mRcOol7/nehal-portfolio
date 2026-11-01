# Project Living State

## Current Position
- **Milestone**: Phase 2.5 — 3D Animated Graphic Motion Scrolling (Spatial Canvas) [COMPLETED]
- **Completed**:
  - [x] US-001: Three.js SpatialScrollCanvas setup with camera, lighting, and resize handling
  - [x] US-002: Procedural floating chrome meshes, icosahedrons, and glowing particle constellation
  - [x] US-003: Fixed background integration in page.tsx with scroll milestone interpolation
  - [x] US-004: Desktop mouse parallax, reduced-motion fallback, and resource disposal
- **Active Focus**: Ready for next feature or Phase 3
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
