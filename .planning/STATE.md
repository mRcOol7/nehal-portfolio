# Project Living State

## Current Position
- **Milestone**: Phase 2 — Collaboration & Project Showcase
- **Active Focus**: Polish on FreelancingCard & interactive enhancements
- **Status**: Dev server running cleanly on `http://localhost:3000`

## Key Decisions & Conventions
- **Data Source**: Always read from `src/data/portfolioData.ts`. Do not hardcode biographical data in components.
- **Design Tokens**: Dark graphite, indigo, cyan accents, subtle rose borders for freelancing card (`#E11D48`).
- **Motion Integrity**: Ensure all animations check `prefers-reduced-motion` and clean up event listeners on unmount.

## Session Log
- Git repository initialized with baseline commit.
- GSD spec-driven framework initialized (`.planning/`).
- Ralph Loop installed (`scripts/ralph/`, `.agents/skills/`).
