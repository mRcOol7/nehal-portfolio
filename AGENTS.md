# Portfolio Project Rules

- Build a premium, responsive personal developer portfolio, not a generic template.
- Use the existing project stack and conventions; do not replace working architecture without justification.
- Use TypeScript and reusable, focused React components.
- Keep portfolio content in typed data modules, separate from presentation.
- Prioritize accessibility, performance, semantic HTML, and responsive behavior.
- Use GSAP for complex scroll timelines and Framer Motion for simple UI transitions; do not animate the same element with both.
- Use Three.js / React Three Fiber sparingly and provide a non-WebGL fallback.
- Respect prefers-reduced-motion and disable pointer-only interactions on touch devices.
- Lazy-load heavy media and 3D assets; cap WebGL pixel ratio and pause off-screen rendering.
- Never invent personal details, employers, client names, achievements, metrics, testimonials, or URLs.
- Never leave fake links, dead buttons, placeholder navigation, or broken images.
- After changes, run available lint, typecheck, build, and browser checks. Report only checks that were actually run.
- Keep the application runnable at each implementation milestone.
