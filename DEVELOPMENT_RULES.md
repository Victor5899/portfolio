# Development Rules & Engineering Standards

## Personal Portfolio — Victor Ipil Soren

> **Purpose:** This document defines the **engineering standards** every contributor (human or AI agent) must follow when building or modifying this portfolio.
> **Authority:** [`PROJECT_SPEC.md`](./PROJECT_SPEC.md) is the *source of truth* for **what** to build. This document governs **how** to build it. When in doubt, the SRS wins; if the SRS is silent, these rules apply.
> **Golden rule:** **Read `PROJECT_SPEC.md` before implementing any feature.** Cite the requirement ID(s) you satisfy in commits/PRs.

---

## Table of Contents

1. [The Ten Core Rules](#1-the-ten-core-rules)
2. [Data & Content Rules](#2-data--content-rules)
3. [TypeScript Rules](#3-typescript-rules)
4. [Component & Architecture Rules](#4-component--architecture-rules)
5. [Styling & Design-Token Rules](#5-styling--design-token-rules)
6. [Animation & Motion Rules](#6-animation--motion-rules)
7. [Accessibility Rules](#7-accessibility-rules)
8. [Performance Rules](#8-performance-rules)
9. [Next.js 16 Rules](#9-nextjs-16-rules)
10. [Code Quality & DRY Rules](#10-code-quality--dry-rules)
11. [File & Naming Conventions](#11-file--naming-conventions)
12. [Git & Workflow Rules](#12-git--workflow-rules)
13. [Pre-Commit Checklist](#13-pre-commit-checklist)

---

## 1. The Ten Core Rules

These are non-negotiable. Every other section elaborates on them.

1. **Never hardcode portfolio data.** No names, bios, project details, links, metrics, or copy literals inside components.
2. **Always source data from `content/*.ts`.** UI is a pure function of typed content.
3. **Prefer reusable components.** Build once, compose everywhere. No copy-pasted variants.
4. **Follow strict TypeScript.** No `any`, no implicit `any`, no unsafe casts. Types live in `types/`.
5. **Keep components modular.** Small, single-responsibility, composable units.
6. **Use Framer Motion consistently.** Shared motion tokens/variants — never ad-hoc, one-off animations.
7. **Maintain accessibility.** WCAG 2.1 AA is a completion criterion, not an enhancement.
8. **Optimize for performance.** Server-first, minimal client JS, 95+ Lighthouse.
9. **Avoid code duplication (DRY).** Extract shared logic/UI; a rule of three at most before refactoring.
10. **Follow `PROJECT_SPEC.md` before implementing new features.** The SRS is authoritative.

---

## 2. Data & Content Rules

> Ref: SRS [§5.3 Data-Driven Content Layer](./PROJECT_SPEC.md#53-data-driven-content-layer), [§6 Content Data Model](./PROJECT_SPEC.md#6-content-data-model-typed-schemas).

- **DATA-1** **Never** hardcode personal information, project data, links, dates, metrics, or user-facing copy inside React components. This includes JSX text, `href`s, `alt` text content, and config strings.
- **DATA-2** All content lives in `content/*.ts` (`profile.ts`, `projects.ts`, `skills.ts`, `techStack.ts`, `achievements.ts`, `certifications.ts`, `timeline.ts`, `stats.ts`, `navigation.ts`).
- **DATA-3** Every content module imports its shape from `types/` and is typed explicitly. Use `as const` where literal inference is beneficial.
- **DATA-4** Components **consume** content via props or direct import; they must render generically over arrays/records.
- **DATA-5** Adding a project/skill/achievement/etc. must require editing **only** a `content/` file — never a component.
- **DATA-6** Handle optional/missing fields gracefully (e.g., a project without a live link must not break the card).
- **DATA-7** No secrets in `content/` or the repo. Use environment variables for API keys (e.g., contact/email service). Never commit `.env*`.

```ts
// ❌ WRONG — data hardcoded in a component
export function Hero() {
  return <h1>Victor Ipil Soren</h1>;
}

// ✅ RIGHT — data comes from the content layer
import { profile } from "@/content/profile";
export function Hero() {
  return <h1>{profile.name}</h1>;
}
```

---

## 3. TypeScript Rules

> Ref: SRS [ENG-2](./PROJECT_SPEC.md#14-engineering-principles--quality-standards), [DC-6](./PROJECT_SPEC.md#25-design--implementation-constraints).

- **TS-1** `strict` mode stays on. Do not weaken `tsconfig` compiler options.
- **TS-2** **No `any`** (explicit or implicit) in committed code. Prefer precise types, generics, or `unknown` with narrowing.
- **TS-3** All shared/domain types live in `types/`. Do not redefine the same shape in multiple files.
- **TS-4** Type all component props with an explicit `interface`/`type`. No untyped props.
- **TS-5** Avoid non-null assertions (`!`) and unsafe casts (`as X`) unless justified with a short comment.
- **TS-6** Prefer discriminated unions over boolean flags for variant modeling.
- **TS-7** Exported functions/components have explicit, inferable return types where clarity benefits.
- **TS-8** The project must **typecheck with zero errors** before commit.

---

## 4. Component & Architecture Rules

> Ref: SRS [§5 System Architecture](./PROJECT_SPEC.md#5-system-architecture), [ENG-1/3/6](./PROJECT_SPEC.md#14-engineering-principles--quality-standards).

- **CMP-1** One component per concern. If a component does two unrelated things, split it.
- **CMP-2** Respect the layer boundaries: `content / components / hooks / lib / constants / styles / types`. No cross-contamination (e.g., no data literals in `lib`, no UI in `content`).
- **CMP-3** Component taxonomy:
  - `components/ui/` — shadcn (`base-nova`) primitives (Button, Card, Badge, …). Add via the shadcn CLI.
  - `components/layout/` — Navbar, Footer, Container, ThemeProvider.
  - `components/sections/` — one component per SRS section.
  - `components/shared/` — reusable presentational pieces (SectionHeading, ProjectCard, Tag, motion wrappers).
  - `components/effects/` — signature effects (Spotlight, FloatingBlobs, GlassCard, GradientText).
- **CMP-4** **Prefer reusable components.** Before creating a new component, check `components/shared` and `components/ui` for an existing one to reuse or extend.
- **CMP-5** Composition over configuration: prefer children/slots and small composables over giant prop-flag components.
- **CMP-6** Variants via `class-variance-authority`; class merging via `cn()` (`clsx` + `tailwind-merge`). Never string-concatenate classNames manually.
- **CMP-7** Presentational components stay stateless where possible; lift side effects/state into hooks (`hooks/`).
- **CMP-8** Reusable, non-visual logic goes into `hooks/` (`useMousePosition`, `useReducedMotion`, `useSectionInView`, `useTheme`), not inline in components.
- **CMP-9** Shared pure helpers go into `lib/`; app-wide constants (site URL, nav, motion tokens, breakpoints) go into `constants/`.

---

## 5. Styling & Design-Token Rules

> Ref: SRS [§8 Design System](./PROJECT_SPEC.md#8-design-system--ux-requirements).

- **STY-1** Use **semantic design tokens** only (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, brand gradient tokens). **No raw hex/rgb** in JSX or component CSS.
- **STY-2** New colors are added as OKLCH tokens in `app/globals.css` (both `:root` and `.dark`) and exposed via `@theme inline` — then referenced semantically.
- **STY-3** Dark theme is the primary designed experience; verify every UI in dark. If light theme is supported, verify both.
- **STY-4** No magic spacing/radius numbers — use the Tailwind scale and `--radius` tokens.
- **STY-5** Glassmorphism uses the shared glass surface (`GlassCard`/utility) — do not reinvent blur/border stacks per component. Provide a non-blur fallback (STY-8).
- **STY-6** The blue→purple gradient is a **signature accent** used sparingly (headline emphasis, primary CTA, active states, blobs) — never as large flat fills of body content.
- **STY-7** Tailwind v4 conventions only (CSS-first `@theme`); do not introduce a legacy `tailwind.config.js` color system.
- **STY-8** Ensure content over glass/gradient meets contrast; provide graceful fallback where `backdrop-filter` is unsupported.

---

## 6. Animation & Motion Rules

> Ref: SRS [§9 Animation & Motion](./PROJECT_SPEC.md#9-animation--motion-specification).

- **MOT-1** **Framer Motion is the standard.** Use it consistently across the app; supporting libs (`react-type-animation`, `react-intersection-observer`, `react-parallax-tilt`, `tw-animate-css`) only for their specific roles.
- **MOT-2** Motion tokens (durations, easings, distances, stagger) live in `constants/motion.ts`. **Do not hardcode ad-hoc durations/variants** in components.
- **MOT-3** Reuse shared motion wrappers (`AnimatedSection`, standard variants) from `components/shared/`. No copy-pasted variant objects.
- **MOT-4** **Honor `prefers-reduced-motion`** via `useReducedMotion` everywhere: reveals become instant (opacity-only), typing does not autoplay, blobs/spotlight/tilt disable. This is mandatory.
- **MOT-5** Scroll reveals fire **once** (`triggerOnce`). No re-animation on scroll-back.
- **MOT-6** Animate only `transform`/`opacity` (GPU-friendly). Never animate layout-affecting properties. Motion must not regress INP.
- **MOT-7** Motion is never load-bearing: content must be fully comprehensible with motion disabled.

---

## 7. Accessibility Rules

> Ref: SRS [§11 Accessibility](./PROJECT_SPEC.md#11-accessibility-requirements).

- **A11Y-1** Use semantic HTML and landmarks (`header`, `nav`, `main`, `footer`, `section`); exactly one `h1`; logical heading order.
- **A11Y-2** Everything interactive is keyboard-operable with a visible focus ring (use the `ring` token). Never remove focus outlines without an equivalent replacement.
- **A11Y-3** Provide meaningful `alt` text; mark decorative visuals (blobs, spotlight) `aria-hidden`; give icon-only controls accessible names (`aria-label`).
- **A11Y-4** Maintain contrast ≥ 4.5:1 (≥ 3:1 for large text), including text over glass/gradient surfaces.
- **A11Y-5** Provide a "Skip to content" link; ensure the mobile menu is focus-trapped and dismissible (ESC/overlay).
- **A11Y-6** Forms use associated `<label>`s, `aria-describedby` for errors, and never signal state by color alone.
- **A11Y-7** Validate with axe (zero violations), Lighthouse a11y (~100), and manual keyboard + screen-reader passes.

---

## 8. Performance Rules

> Ref: SRS [§12 Performance](./PROJECT_SPEC.md#12-performance-requirements).

- **PERF-1** Server Components by default. Add `"use client"` **only** at the smallest interactive leaf that needs it.
- **PERF-2** Images via `next/image` with explicit dimensions and correct `sizes`; modern formats; `priority` only on the hero LCP asset.
- **PERF-3** Fonts via `next/font` (self-hosted, `display: swap`, `latin` subset). No render-blocking third-party font CSS.
- **PERF-4** Prefer static/prerendered output. Fetch external stats (GitHub/LeetCode) server-side with caching and graceful fallback — no client content fetching.
- **PERF-5** Lazy-load non-critical client widgets (parallax tilt, heavy effects) behind viewport/interaction.
- **PERF-6** Reserve space for media/effects to protect CLS. Effects must not degrade INP.
- **PERF-7** Justify any heavy dependency; check bundle impact before adding. Prefer lighter alternatives.
- **PERF-8** Meet targets: **95+ Lighthouse performance**, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms.

---

## 9. Next.js 16 Rules

> Ref: SRS [ENG-9](./PROJECT_SPEC.md#14-engineering-principles--quality-standards); `AGENTS.md`.

- **NX-1** **This is Next.js 16 with breaking changes.** Consult the bundled docs at `node_modules/next/dist/docs/` before writing framework code. Heed deprecation notices.
- **NX-2** Use the App Router and file conventions correctly (`layout`, `page`, `loading`, `error`, `not-found`, `route`).
- **NX-3** `params` and `searchParams` are async — `await` them in pages/`generateMetadata`.
- **NX-4** SEO via the Metadata API and file conventions (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon`). Replace the placeholder `"Create Next App"` metadata.
- **NX-5** `metadata`/`generateMetadata` are Server Component features — do not use them in client components.
- **NX-6** Use `next/link` for internal navigation and `next/image` for images. Do not hand-roll equivalents.
- **NX-7** Keep the path alias `@/*` for imports; do not use long relative chains (`../../../`).

---

## 10. Code Quality & DRY Rules

> Ref: SRS [ENG-5/6/7/8](./PROJECT_SPEC.md#14-engineering-principles--quality-standards).

- **DRY-1** **Avoid duplication.** If the same UI/logic appears (rule of three or sooner when obvious), extract a shared component, hook, or util.
- **DRY-2** Single source of truth for constants (site URL, nav, motion tokens, breakpoints) in `constants/` — never re-declare inline.
- **DRY-3** No dead code, commented-out blocks, or unused exports/imports. Remove them.
- **DRY-4** Comments explain **why** (non-obvious intent/trade-offs), never narrate **what** the code does. Do not add redundant comments.
- **DRY-5** Self-documenting, descriptive names for files, components, props, and variables.
- **DRY-6** Production-ready: no `console.log` noise, no runtime console errors/warnings, no TODOs left unresolved in shipped code.
- **DRY-7** Code must pass ESLint (`eslint-config-next`) with zero errors before commit.
- **DRY-8** Prefer clarity over cleverness; keep functions small and focused.

---

## 11. File & Naming Conventions

- **NAME-1** Components: `PascalCase` files and exports (`ProjectCard.tsx` → `ProjectCard`).
- **NAME-2** Hooks: `useCamelCase` (`useMousePosition.ts`).
- **NAME-3** Content, lib, constants, types: `camelCase` file names (`projects.ts`, `utils.ts`, `motion.ts`).
- **NAME-4** One primary export per component file; colocate small helpers only if not reused.
- **NAME-5** Types are `PascalCase` interfaces/types in `types/`.
- **NAME-6** Section components mirror SRS section names (`Hero`, `About`, `TechStack`, `Projects`, …).
- **NAME-7** Client components declare `"use client"` on the first line; keep them at leaves.

---

## 12. Git & Workflow Rules

- **GIT-1** Read the relevant SRS section **before** starting a feature; cite requirement ID(s) in the commit/PR body.
- **GIT-2** Small, focused commits with clear messages describing the *why*.
- **GIT-3** Do not commit secrets, `.env*`, build artifacts, or `node_modules`.
- **GIT-4** Do not commit unless the project **lints, typechecks, and builds** cleanly.
- **GIT-5** If implementation must deviate from the SRS, update `PROJECT_SPEC.md` **first** (version bump + changelog), then implement.
- **GIT-6** Keep `package-lock.json` authoritative; use **npm**. Do not introduce other lockfiles.

---

## 13. Pre-Commit Checklist

Before every commit, confirm:

- [ ] No hardcoded portfolio data — all content comes from `content/*.ts`. *(DATA-1/2)*
- [ ] New/changed types are in `types/`; no `any`; typecheck passes. *(TS-2/3/8)*
- [ ] Reused existing components where possible; no duplicated UI/logic. *(CMP-4, DRY-1)*
- [ ] Only semantic design tokens used; no raw hex; dark theme verified. *(STY-1/3)*
- [ ] Motion uses shared tokens/wrappers and respects `prefers-reduced-motion`. *(MOT-2/4)*
- [ ] Keyboard-accessible, visible focus, axe clean, semantic HTML. *(A11Y-1/2/7)*
- [ ] Server-first; `"use client"` only at leaves; images/fonts optimized. *(PERF-1/2/3)*
- [ ] Next.js 16 conventions verified against bundled docs. *(NX-1/3)*
- [ ] ESLint passes; no console errors; no dead code. *(DRY-3/6/7)*
- [ ] Change conforms to `PROJECT_SPEC.md` (or the SRS was amended first). *(GIT-5)*

---

> **Remember:** `PROJECT_SPEC.md` defines *what* and *why*; this document defines *how*. Every future implementation must comply with both.
