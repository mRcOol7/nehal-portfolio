# Antigravity Master Prompt — Animated 3D Developer Portfolio

Use this document as the master implementation brief in Google Antigravity. Create a new project folder, open it in Antigravity, then paste the **Master Prompt** section into Agent chat. Keep this file in the repository as the project specification.

---

## Master Prompt

Act as a senior creative frontend engineer, interaction designer, 3D web developer, accessibility specialist, and performance engineer.

Build a complete, polished, production-ready personal developer portfolio for **Nehal Chauhan**. The website must feel like an award-winning creative developer portfolio, combining cinematic visual storytelling, refined editorial typography, carefully art-directed 3D, and excellent usability.

Do not create a generic template, admin dashboard, or collection of unrelated animations. Design one coherent visual experience with a strong identity. Use real content placeholders only where information is genuinely missing; do not invent employers, client names, project metrics, awards, testimonials, or contact details.

### 1. First inspect and plan

Before coding:

1. Inspect the existing repository, package manager, framework, dependencies, and current implementation.
2. Preserve working code and conventions if a project already exists.
3. If the folder is empty, use Next.js App Router, TypeScript, and Tailwind CSS.
4. Create a concise implementation plan and proposed component architecture.
5. Identify the lightest reliable approach for each animation.
6. Do not install unnecessary packages or rewrite the project without a reason.
7. After planning, implement the site rather than stopping at a plan.

### 2. Art direction

Create a premium dark visual identity:

- Background: near-black graphite `#09090D`.
- Elevated surfaces: `#12121A`.
- Main text: soft white `#F5F5F7`.
- Muted text: `#A1A1B2`.
- Accent: electric indigo `#6965F5`.
- Secondary accent: cyan `#36C9E8`.
- Optional signature accent: deep plum `#3E0132`, used sparingly.
- Borders: subtle white at approximately 8% opacity.
- Typography: use a modern geometric display face such as Space Grotesk or Outfit, paired with Inter or Plus Jakarta Sans for body text.
- Use a consistent spacing scale, restrained radii, clean grid alignment, and strong negative space.

The site should feel like a mix of a premium digital product, a creative developer portfolio, and a cinematic interactive experience. Avoid excessive glassmorphism, neon overload, random gradients, and decorative elements that compete with the content.

### 3. Hero — memorable but usable

Build a full-viewport hero with:

- Small availability/status label, only if confirmed by the owner.
- Large expressive heading: “NEHAL CHAUHAN”.
- Short positioning statement: “Building thoughtful digital experiences across web and mobile.”
- Supporting role line: “Frontend Developer · React Native Developer · Creative Technologist”.
- Primary CTA: “Explore selected work”.
- Secondary CTA: “Contact me” or “Download résumé” only when a real résumé file exists.
- A carefully art-directed interactive 3D object: abstract chrome/glass sculpture, orbital object, or particle field.
- Subtle pointer response on desktop, with a static or lightweight alternative on touch devices.
- Clear scroll cue and strong text contrast.

Do not use a heavy 3D scene as a background that makes text hard to read. The hero must render meaningful HTML content immediately, even while the 3D asset loads.

### 4. 3D and motion direction

Use Three.js with React Three Fiber only where it adds real value. Prefer a single optimized hero scene over multiple heavy scenes.

Possible visual elements:
- Abstract glass/chrome sculpture.
- Floating geometric forms.
- Soft particle field.
- Slow orbital motion.
- Subtle pointer parallax.
- Controlled camera movement.

Animation requirements:
- GSAP + ScrollTrigger for complex scroll-linked sequences.
- Framer Motion for component-level transitions and simple UI interactions.
- Avoid running two animation systems on the same element.
- Use transform and opacity where possible.
- Avoid scroll hijacking and excessive smooth-scroll effects.
- Avoid perpetual animation when the section is off-screen.
- Clean up animation contexts, event listeners, observers, and WebGL resources on unmount.
- Respect `prefers-reduced-motion`.
- Provide a graceful static fallback if WebGL is unavailable.

### 5. Site structure

Build the following sections in this order:

1. **Navigation** — compact, sticky or intelligently fixed; logo/monogram, Work, About, Experience, Contact.
2. **Hero** — identity, positioning, CTAs, 3D visual.
3. **Selected Work** — 3–5 project cards with large imagery, role, stack, concise outcome, and links when supplied.
4. **About** — concise developer story, approach, and interests.
5. **Skills / Toolkit** — grouped by Frontend, Mobile, Backend/API, Tools, and Creative Technology. Only include skills confirmed by the owner.
6. **Experience** — chronological timeline with employer, role, dates, and responsibilities supplied by the owner.
7. **Creative Lab** — optional small experiments, prototypes, or interactive demos.
8. **Contact** — clear email/social links supplied by the owner and a friendly CTA.
9. **Footer** — restrained, with copyright year generated dynamically.

Use project content that can be edited from one data file. Do not hardcode repeated project cards into separate components.

### 6. Project presentation

Project cards should feel editorial and premium:
- Large visual preview.
- Project title and short explanation.
- Technology tags.
- Role and contribution.
- Live demo and source links only when real URLs are supplied.
- Subtle hover image movement or reveal.
- Keyboard-accessible links and visible focus states.

Do not fabricate project screenshots. If no assets exist, create tasteful abstract placeholders clearly intended to be replaced.

### 7. Responsive behavior

Design mobile intentionally, not as a compressed desktop page.

Desktop:
- Rich hero composition and subtle pointer interaction.
- Larger project previews and spacious grid.
- Optional advanced scroll choreography.

Tablet:
- Reduce 3D complexity and simplify multi-column layouts.

Mobile:
- Disable cursor-following effects.
- Use touch-friendly controls.
- Reduce particle count and rendering resolution.
- Avoid horizontal overflow and tiny text.
- Keep project cards readable and vertically stacked.
- Use a static 3D poster or lightweight CSS visual if WebGL performance is poor.
- Keep navigation simple and accessible.

### 8. Accessibility and quality

- Semantic HTML landmarks and heading hierarchy.
- Keyboard navigation throughout.
- Visible focus indicators.
- Sufficient contrast.
- Descriptive alt text for meaningful images.
- Accessible names for icon-only controls.
- Reduced-motion support.
- No essential information conveyed only through animation.
- Avoid autoplay audio and intrusive custom cursors.
- Ensure all buttons and links work.

### 9. Performance

- Lazy-load non-critical sections and 3D assets.
- Dynamically import the 3D canvas where appropriate.
- Compress images and use responsive image sizes.
- Prefer optimized GLB/GLTF assets with compressed textures.
- Limit draw calls, geometry complexity, particles, and post-processing.
- Cap device pixel ratio for WebGL.
- Pause or reduce rendering when the scene is not visible.
- Prevent layout shift by reserving media dimensions.
- Avoid unnecessary dependencies.
- Target strong Core Web Vitals and a fast first meaningful render.

### 10. Implementation quality

- Use reusable, typed React components.
- Keep content separate from presentation.
- Use clear component and file names.
- Avoid giant monolithic page components.
- Avoid `any` unless unavoidable and documented.
- Keep browser-only APIs inside client components or effects.
- Prevent hydration mismatches.
- Add useful loading and error fallbacks.
- Do not leave dead buttons, fake links, or unfinished sections.

### 11. Verification — do not skip

After implementation:

1. Install dependencies using the repository's existing package manager.
2. Run lint and type checks if configured.
3. Run a production build.
4. Start the development server.
5. Use the Antigravity browser to inspect desktop and mobile layouts.
6. Test navigation, links, animations, responsive breakpoints, and reduced-motion behavior.
7. Fix console errors, broken assets, overflow, hydration warnings, and visual defects.
8. Re-test after fixes.
9. Summarize files created, key design decisions, commands run, and any owner-provided content still required.

Do not claim a test passed unless you actually ran it.

### 12. Working method

Work in milestones:

- Milestone 1: inspect repository, plan, design tokens, typography, navigation.
- Milestone 2: implement hero and optimized 3D scene.
- Milestone 3: build project, about, skills, and experience sections.
- Milestone 4: add scroll choreography, transitions, and micro-interactions.
- Milestone 5: responsive polish, accessibility, and performance.
- Milestone 6: browser verification, bug fixing, and production build.

At each milestone, keep the app runnable. Make sensible decisions without repeatedly asking for approval. Ask only when essential personal content, credentials, or external assets are missing.

---

## Suggested `AGENTS.md`

Copy this into the project root as `AGENTS.md` for persistent project guidance:

```md
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
```

## Suggested project-specific rule files

Create these files directly inside `.agents/rules/`. Each rule file needs valid YAML frontmatter.

### `.agents/rules/design.md`

```md
---
trigger: always_on
---

- Maintain a coherent dark graphite, indigo, cyan, and restrained plum visual system.
- Use clear hierarchy, generous whitespace, consistent spacing, and restrained borders.
- Avoid generic SaaS dashboard layouts, excessive glassmorphism, random gradients, and decorative clutter.
- Design mobile layouts intentionally, not as desktop layouts squeezed smaller.
- Every section must support the portfolio's content and professional goals.
```

### `.agents/rules/motion.md`

```md
---
trigger: always_on
---

- Motion must clarify hierarchy, provide feedback, or support storytelling.
- Prefer transform and opacity animations.
- Respect prefers-reduced-motion.
- Avoid scroll hijacking, excessive parallax, and continuous off-screen animation.
- Clean up GSAP contexts, observers, listeners, and WebGL resources.
- Keep content readable and usable before animations finish.
```

### `.agents/rules/performance.md`

```md
---
trigger: always_on
---

- Lazy-load non-critical images, sections, and 3D assets.
- Dynamically import heavy browser-only 3D code.
- Provide a static fallback for WebGL failure and reduced-motion preferences.
- Limit particles, draw calls, post-processing, texture sizes, and device pixel ratio.
- Prevent layout shifts and test mobile viewport performance.
- Avoid adding dependencies unless they materially improve the implementation.
```

## Useful Antigravity commands

- `/goal` — ask the agent to carry the implementation task through to completion.
- `/grill-me` — align on requirements before implementation.
- `/learn` — turn useful project lessons into reusable rules or skills.
- Use the Browser Agent to inspect the actual rendered website and verify fixes.

## Official references

- Antigravity rules: https://antigravity.google/docs/rules/
- Antigravity workflows and migration information: https://antigravity.google/docs/ide/workflows/
- Antigravity agent overview: https://antigravity.google/docs/agent/
- Google Codelab: https://codelabs.developers.google.com/getting-started-agy-ide

---

## Before launching

Replace or confirm:
- Name and professional title.
- About text and work history.
- Actual project descriptions, screenshots, technology stacks, and URLs.
- GitHub, LinkedIn, email, and résumé links.
- Availability status.

A beautiful portfolio must also be truthful. Do not publish placeholder facts as real credentials.
