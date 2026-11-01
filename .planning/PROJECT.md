# Nehal Chauhan — Developer Portfolio

## Project Vision
A premium, highly interactive personal developer portfolio for Nehal Chauhan (Frontend Developer & Creative Technologist, Native Android & Full-Stack Web). Designed with dark graphite, indigo, cyan aesthetics, 3D WebGL experiences with graceful non-WebGL fallbacks, and micro-interactions.

## Architecture & Technology Stack
- **Framework**: Next.js (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS design system tokens
- **3D & Canvas**: Three.js (dynamic canvas textures, procedural laptop/monitor rendering, wireframes, plug connector)
- **Motion & Audio**: CSS transforms, GSAP scroll timelines, audio feedback
- **Data Architecture**: Typed data modules in `src/data/portfolioData.ts` separated from UI presentation
- **Accessibility & Performance**: `prefers-reduced-motion` compliance, WebGL resource disposal, non-WebGL fallbacks, responsive viewport optimization

## Key Architectural Rules
1. Never invent personal details, employers, client names, achievements, or URLs (anchored in `src/data/portfolioData.ts`).
2. Cap WebGL pixel ratio, pause off-screen rendering, and properly dispose textures/geometries.
3. Keep the application runnable at all times without broken links or dead buttons.
