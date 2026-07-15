# Software Requirements Specification (SRS)

## Personal Portfolio — Victor Ipil Soren

> **Document type:** Software Requirements Specification (SRS)
> **Status:** Authoritative source of truth
> **Version:** 1.1
> **Last updated:** 2026-07-15

---

> ⚠️ **Governance notice**
> This document is the **single source of truth** for the entire portfolio application.
> **Every** future component, animation, page, section, hook, type, and feature **must** conform to this specification.
> Before implementing any feature, **read the relevant section here first**.
> Do **not** overwrite or restructure this file unless explicitly instructed by the owner. Amendments should be additive and version-bumped (see [§16 Change Management](#16-change-management)).

---

## Table of Contents

1. [Introduction](#1-introduction)
   - [1.1 Purpose](#11-purpose)
   - [1.2 Project Vision](#12-project-vision)
   - [1.3 Scope](#13-scope)
   - [1.4 Intended Audience](#14-intended-audience)
   - [1.5 Definitions & Acronyms](#15-definitions--acronyms)
   - [1.6 References](#16-references)
2. [Overall Description](#2-overall-description)
   - [2.1 Product Perspective](#21-product-perspective)
   - [2.2 Product Goals](#22-product-goals)
   - [2.3 User Classes & Characteristics](#23-user-classes--characteristics)
   - [2.4 Operating Environment](#24-operating-environment)
   - [2.5 Design & Implementation Constraints](#25-design--implementation-constraints)
   - [2.6 Assumptions & Dependencies](#26-assumptions--dependencies)
3. [Owner Profile & Content Data](#3-owner-profile--content-data)
4. [Technology Stack](#4-technology-stack)
5. [System Architecture](#5-system-architecture)
   - [5.1 Architectural Principles](#51-architectural-principles)
   - [5.2 Folder Architecture](#52-folder-architecture)
   - [5.3 Data-Driven Content Layer](#53-data-driven-content-layer)
   - [5.4 Rendering & Component Strategy](#54-rendering--component-strategy)
6. [Content Data Model (Typed Schemas)](#6-content-data-model-typed-schemas)
7. [Functional Requirements — Sections](#7-functional-requirements--sections)
   - [7.1 Global Layout & Navigation](#71-global-layout--navigation)
   - [7.2 Hero](#72-hero)
   - [7.3 About](#73-about)
   - [7.4 Tech Stack](#74-tech-stack)
   - [7.5 Projects](#75-projects)
   - [7.6 Skills](#76-skills)
   - [7.7 Achievements](#77-achievements)
   - [7.8 Certifications](#78-certifications)
   - [7.9 GitHub](#79-github)
   - [7.10 LeetCode](#710-leetcode)
   - [7.11 Timeline](#711-timeline)
   - [7.12 Contact](#712-contact)
   - [7.13 Footer](#713-footer)
8. [Design System & UX Requirements](#8-design-system--ux-requirements)
   - [8.1 Design Philosophy](#81-design-philosophy)
   - [8.2 Color System](#82-color-system)
   - [8.3 Typography](#83-typography)
   - [8.4 Spacing, Layout & Grid](#84-spacing-layout--grid)
   - [8.5 Glassmorphism & Surfaces](#85-glassmorphism--surfaces)
   - [8.6 Signature Effects](#86-signature-effects)
9. [Animation & Motion Specification](#9-animation--motion-specification)
10. [Responsive Design Requirements](#10-responsive-design-requirements)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Performance Requirements](#12-performance-requirements)
13. [SEO Requirements](#13-seo-requirements)
14. [Engineering Principles & Quality Standards](#14-engineering-principles--quality-standards)
15. [Success Criteria & Acceptance](#15-success-criteria--acceptance)
16. [Change Management](#16-change-management)
17. [Appendix A — Featured Projects Backlog](#17-appendix-a--featured-projects-backlog)
18. [Appendix B — Definition of Done](#18-appendix-b--definition-of-done)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification defines the complete functional, non-functional, design, and architectural requirements for the **Personal Portfolio** of **Victor Ipil Soren**. It exists to ensure that all development — present and future — is consistent, intentional, high-quality, and traceable to a documented requirement.

This is not a generic template specification. It is a binding engineering contract for a specific product.

### 1.2 Project Vision

Build a **world-class personal portfolio** that showcases the owner's technical skills, projects, achievements, education, and experience, and that helps secure **internships and full-time roles** in:

- **Data Analytics**
- **Machine Learning**
- **Data Engineering**
- **Software Engineering**

The portfolio **must not resemble a template**. It must feel like a **premium software product**, benchmarked against the craft of **Apple, OpenAI, Linear, Stripe, and Vercel** — polished typography, precise spacing, restrained but delightful motion, and flawless performance.

### 1.3 Scope

**In scope**

- A single-page (with optional deep-linkable sub-routes) marketing/portfolio website.
- Sections: Hero, About, Tech Stack, Projects, Skills, Achievements, Certifications, GitHub, LeetCode, Timeline, Contact, Footer.
- A fully **data-driven** content architecture enabling content updates without UI changes.
- Dark-theme-first premium visual design with glassmorphism and blue/purple gradient accents.
- Production-grade performance, accessibility, and SEO.

**Out of scope (v1)**

- Authentication / user accounts.
- A CMS backend or database-backed dynamic content (content is code-defined and typed).
- E-commerce, payments, or multi-tenant features.
- Server-side form persistence beyond a single contact channel (email/service integration is acceptable).

**Future scope (must be enabled by architecture, not built in v1)**

- Blog, internships, extended experience, additional projects/achievements/certifications — all added purely by editing `content/` files.

### 1.4 Intended Audience

| Audience | Use of this document |
| --- | --- |
| The owner (developer) | Primary implementer; references this before building anything |
| Future contributors / AI agents | Must comply with every requirement herein |
| Recruiters / hiring managers | The *product's* end users (see [§2.3](#23-user-classes--characteristics)) — not readers of this doc |

### 1.5 Definitions & Acronyms

| Term | Meaning |
| --- | --- |
| **SRS** | Software Requirements Specification (this document) |
| **RSC** | React Server Component (default rendering model in Next.js App Router) |
| **CWV** | Core Web Vitals (LCP, CLS, INP) |
| **Content layer** | Typed data files in `content/` that feed the UI |
| **FR / NFR** | Functional / Non-Functional Requirement |
| **Glassmorphism** | Frosted-glass surface style (translucency + backdrop blur + subtle border) |
| **A11y** | Accessibility |

### 1.6 References

- Bundled Next.js 16 documentation: `node_modules/next/dist/docs/` (authoritative for framework APIs — this version has breaking changes; consult before writing framework code, per `AGENTS.md`).
- WCAG 2.1 AA guidelines.
- `package.json` (canonical dependency versions).
- `app/globals.css` (canonical design tokens).

---

## 2. Overall Description

### 2.1 Product Perspective

A greenfield, self-contained Next.js 16 application deployed as a static-leaning, statically-optimized site (target: Vercel). No external stateful backend is required for v1; all portfolio content is authored as typed TypeScript modules. Optional read-only third-party data (GitHub, LeetCode) may be integrated per [§7.9](#79-github)–[§7.10](#710-leetcode).

### 2.2 Product Goals

1. Convert a recruiter's first 5 seconds into a clear understanding of the owner's value in data/ML/software roles.
2. Present projects as **case studies** (problem → approach → impact), not screenshots.
3. Demonstrate engineering excellence **through the artifact itself** (performance, a11y, clean code).
4. Remain **effortless to maintain and scale** via the content layer.

### 2.3 User Classes & Characteristics

| Class | Description | Priority needs |
| --- | --- | --- |
| **Technical recruiters** | Skim quickly, often mobile, many tabs | Instant role fit, stack, contactability, resume |
| **Hiring managers / tech leads** | Assess depth & problem-solving | Detailed projects, measurable impact, code links |
| **Peers / collaborators** | Credibility & personality | GitHub, LeetCode, socials, timeline |
| **The owner** | Maintainer | Update content without touching UI |

**Design implication:** optimize the *scan path*; resume download and contact must always be reachable.

### 2.4 Operating Environment

- **Clients:** modern evergreen browsers (latest 2 versions of Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile; minimum tested viewport width **320px**.
- **Runtime:** Next.js 16 App Router with React 19; RSC by default, client components at interactive leaves.
- **Deployment:** Vercel (recommended) or any Node-compatible host supporting Next.js 16.

### 2.5 Design & Implementation Constraints

- **DC-1** Must use the existing stack (see [§4](#4-technology-stack)); no framework substitution.
- **DC-2** Tailwind CSS **v4** (CSS-first, `@theme` tokens in `app/globals.css`) — no separate `tailwind.config.js`-based color definitions; use semantic tokens.
- **DC-3** Components use shadcn (`base-nova`) primitives built on `@base-ui/react`; new primitives added via the shadcn CLI.
- **DC-4** **No personal data hardcoded in components** — all content flows from `content/` (see [§5.3](#53-data-driven-content-layer)).
- **DC-5** Framework code must follow Next.js 16 conventions verified against bundled docs.
- **DC-6** Strict TypeScript; `any` is disallowed in committed code.

### 2.6 Assumptions & Dependencies

- The owner supplies real content (bios, project details, metrics, links, assets) to replace placeholders.
- Package manager is **npm** (a `package-lock.json` is committed; do not mix lockfiles).
- Third-party stats (GitHub/LeetCode) may require network access and graceful degradation when unavailable.

---

## 3. Owner Profile & Content Data

This is authoritative content metadata. It must live in `content/profile.ts`, never inline in components.

| Field | Value |
| --- | --- |
| **Name** | Victor Ipil Soren |
| **Degree** | B.Tech, Computer Science Engineering (Big Data Analytics) |
| **University** | SRM Institute of Science and Technology |
| **Expected graduation** | May 2027 |
| **Current CGPA** | 8.17 |
| **Target roles** | Data Analytics, Machine Learning, Data Engineering, Software Engineering |

**About (canonical copy):**
> Passionate about Data Analytics, Machine Learning, Artificial Intelligence, Data Engineering, and building real-world software products. Enjoys solving practical problems using Python, SQL, Machine Learning, and modern data technologies.

**Placeholders to be supplied by owner** (kept in `content/`): email, phone (optional), location, resume file (`/public/resume.pdf`), avatar image, GitHub URL, LinkedIn URL, LeetCode URL, X/Twitter (optional), personal website (optional).

---

## 4. Technology Stack

Canonical versions per `package.json`.

| Layer | Technology | Version | Notes |
| --- | --- | --- | --- |
| Framework | **Next.js** (App Router, RSC) | `16.2.10` | Breaking changes vs. older versions — consult bundled docs |
| UI runtime | **React** / React DOM | `19.2.4` | Server Components by default |
| Language | **TypeScript** (strict) | `^5` | No `any` in committed code |
| Styling | **Tailwind CSS v4** + `@tailwindcss/postcss` | `^4` | CSS-first `@theme` tokens |
| Components | **shadcn** (`base-nova`) on **`@base-ui/react`** | shadcn `^4.13`, base-ui `^1.6` | Primitives in `components/ui/` |
| Animation | **Framer Motion** | `^12.42` | Primary motion library |
| Motion helpers | react-intersection-observer, react-type-animation, react-parallax-tilt, tw-animate-css | see `package.json` | Scroll triggers, typing, tilt, utility anims |
| Icons | lucide-react, react-icons | `^1.24`, `^5.7` | Prefer lucide; react-icons for brand logos |
| Class utilities | clsx, tailwind-merge, class-variance-authority | see `package.json` | `cn()` + variants |
| Fonts | Geist Sans + Geist Mono via `next/font/google` | — | Self-hosted, `display: swap` |
| Lint | ESLint + `eslint-config-next` | `^9` / `16.2.10` | Enforced in CI/local |
| Deploy | Vercel | — | Recommended target |

### Documented Skill Stack (content, surfaced in Tech Stack section)

- **Languages:** Python, SQL, C++, JavaScript, TypeScript
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Python, FastAPI, Node.js
- **Databases:** PostgreSQL, MySQL, Snowflake
- **Machine Learning:** Scikit-learn, XGBoost, Pandas, NumPy
- **Visualization:** Tableau, Matplotlib, Streamlit
- **Tools:** Git, GitHub, Docker, VS Code, Jupyter Notebook

> These lists are **content**, defined in `content/skills.ts` / `content/techStack.ts`, and rendered generically.

---

## 5. System Architecture

### 5.1 Architectural Principles

- **AP-1 Data-driven:** UI is a pure function of typed content. Content changes never require component changes.
- **AP-2 Separation of concerns:** content, components, hooks, lib, constants, styles, and types are distinct layers.
- **AP-3 Composition over configuration:** small, reusable, typed components composed into sections.
- **AP-4 Server-first:** RSC by default; `"use client"` only at interactive leaves.
- **AP-5 Extensibility:** adding blogs, internships, certifications, experience, projects, or achievements requires **only** editing `content/` files.

### 5.2 Folder Architecture

```
my-portfolio/
├── app/
│   ├── layout.tsx            # Root layout: fonts, <html>/<body>, theme, metadata, JSON-LD
│   ├── page.tsx              # Home — composes section components in order
│   ├── globals.css           # Tailwind v4 + design tokens (@theme inline)
│   ├── sitemap.ts            # Generated sitemap (SEO)
│   ├── robots.ts             # Generated robots (SEO)
│   ├── opengraph-image.tsx   # Generated OG image (next/og)
│   └── icon.tsx / favicon.ico
├── content/                  # ← SINGLE SOURCE OF TRUTH FOR ALL DATA (typed)
│   ├── profile.ts            # Name, education, about, socials, resume
│   ├── techStack.ts          # Grouped tech stack
│   ├── skills.ts             # Skills with proficiency/category
│   ├── projects.ts           # Project case studies (flagship + others)
│   ├── achievements.ts       # Achievements
│   ├── certifications.ts     # Certifications
│   ├── timeline.ts           # Education/experience timeline
│   ├── stats.ts              # GitHub/LeetCode config + fallbacks
│   └── navigation.ts         # Nav items / section registry
├── components/
│   ├── ui/                   # shadcn (base-nova) primitives
│   ├── layout/               # Navbar, Footer, Container, ThemeProvider
│   ├── sections/             # Hero, About, TechStack, Projects, Skills, Achievements,
│   │                         #   Certifications, GitHub, LeetCode, Timeline, Contact
│   ├── shared/               # SectionHeading, ProjectCard, Tag, StatCard, motion wrappers
│   └── effects/              # Spotlight, FloatingBlobs, GradientText, GlassCard
├── hooks/                    # useMousePosition, useReducedMotion, useSectionInView, useTheme
├── lib/                      # utils.ts (cn), seo.ts, format.ts, fetchers (github/leetcode)
├── constants/                # site.ts (URL, name), motion.ts (durations/variants), breakpoints.ts
├── types/                    # profile.ts, project.ts, skill.ts, achievement.ts, timeline.ts, ...
├── styles/                   # optional supplemental CSS (keyframes not expressible in globals)
├── public/                   # images, resume.pdf, og assets, icons
└── PROJECT_SPEC.md           # This document
```

> **Note:** `app/globals.css` remains the token home. A `styles/` folder may hold supplemental keyframes/utilities only.

### 5.3 Data-Driven Content Layer

- **CR-1** All owner data (personal info, projects, skills, achievements, certifications, timeline, stats) is defined in `content/` as typed exports.
- **CR-2** Components **must not** contain literal personal strings, URLs, metrics, or project data.
- **CR-3** Each content module imports its shape from `types/` and is exported `as const` where appropriate for literal inference.
- **CR-4** Sections iterate over content arrays; adding an item = editing one content file.
- **CR-5** Missing/optional data (e.g., no live link) must be handled gracefully by generic components.

### 5.4 Rendering & Component Strategy

- **RC-1** Default to Server Components. Mark client components with `"use client"` only when they use state, effects, browser APIs, or motion hooks.
- **RC-2** Interactive/motion pieces (spotlight, tilt, typing, theme toggle, mobile nav) are isolated leaf client components.
- **RC-3** Data flows top-down from content → section (server) → presentational component (server/client).
- **RC-4** No client-side data fetching for content; external stats fetched server-side (cached) with fallbacks.

---

## 6. Content Data Model (Typed Schemas)

These are **normative** shapes; final field names may be refined but must remain strongly typed in `types/`.

```ts
// types/profile.ts
export interface Profile {
  name: string;
  role: string;                 // e.g. "Data & ML Engineer"
  taglines: string[];           // for typing animation
  summary: string;              // one-line value prop
  about: string;                // longer bio
  education: {
    degree: string;             // B.Tech CSE (Big Data Analytics)
    university: string;         // SRM Institute of Science and Technology
    expectedGraduation: string; // "May 2027"
    cgpa: string;               // "8.17"
  };
  location?: string;
  email: string;
  resumeUrl: string;            // /resume.pdf
  avatar: string;               // /images/...
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    twitter?: string;
    website?: string;
  };
}

// types/skill.ts
export interface SkillGroup {
  category: "Languages" | "Frontend" | "Backend" | "Databases"
    | "Machine Learning" | "Visualization" | "Tools";
  items: { name: string; icon?: string; level?: 1 | 2 | 3 | 4 | 5 }[];
}

// types/project.ts
export interface Project {
  slug: string;
  title: string;
  tagline: string;              // one line for card
  problem: string;              // what problem
  approach: string;             // what you built / how
  impact: string;               // measurable outcome
  role: string;                 // your contribution
  stack: string[];
  featured: boolean;            // flagship flag
  highlights?: string[];        // bullet metrics
  image: string;
  links: { live?: string; repo?: string; caseStudy?: string; demo?: string };
  year: string;
  domain: ("Data Analytics" | "Machine Learning" | "Data Engineering" | "Software")[];
}

// types/achievement.ts
export interface Achievement { title: string; description: string; date?: string; icon?: string; }

// types/certification.ts
export interface Certification {
  title: string; issuer: string; date: string; credentialUrl?: string; credentialId?: string;
}

// types/timeline.ts
export interface TimelineItem {
  kind: "education" | "experience" | "milestone";
  title: string; organization: string; start: string; end: string | "Present";
  description?: string; bullets?: string[];
}

// types/stats.ts
export interface GitHubConfig { username: string; showContributions: boolean; }
export interface LeetCodeConfig { username: string; }
```

---

## 7. Functional Requirements — Sections

Section render order on the home page: **Hero → About → Tech Stack → Projects → Skills → Achievements → Certifications → GitHub → LeetCode → Timeline → Contact → Footer.**

Every section shares: a stable `id` anchor, a `SectionHeading` (eyebrow + title + optional description), consistent vertical rhythm, scroll-reveal (once), and full responsive + a11y compliance.

### 7.1 Global Layout & Navigation

- **FR-NAV-1** Sticky top navigation with owner name/logo, in-page section links, resume CTA, and theme control.
- **FR-NAV-2** Active-section highlighting driven by intersection observation (`useSectionInView`).
- **FR-NAV-3** On mobile, collapse to an accessible drawer/menu (focus-trapped, ESC/overlay to close).
- **FR-NAV-4** Condense/elevate nav on scroll (glass background appears after threshold).
- **FR-NAV-5** "Skip to content" link is the first focusable element.
- **FR-NAV-6** Nav items sourced from `content/navigation.ts`.

### 7.2 Hero

- **FR-HERO-1** Display name, animated role via **typing animation** (`react-type-animation`) cycling `profile.taglines`.
- **FR-HERO-2** One-line value proposition + primary CTA (Contact/Resume) and secondary CTA (View Projects).
- **FR-HERO-3** Social links (GitHub, LinkedIn, LeetCode).
- **FR-HERO-4** Signature background: **floating gradient blobs** + **mouse spotlight** effect (see [§8.6](#86-signature-effects)).
- **FR-HERO-5** Entrance animation: staggered fade/rise; LCP text must remain instantly legible (no motion-gated content).
- **FR-HERO-6** All copy from `content/profile.ts`.

### 7.3 About

- **FR-ABOUT-1** Render `profile.about` narrative with strong typographic hierarchy.
- **FR-ABOUT-2** Show education snapshot (degree, university, expected graduation, CGPA) as compact stat/fact chips.
- **FR-ABOUT-3** Optional portrait/avatar via `next/image`.

### 7.4 Tech Stack

- **FR-TECH-1** Render grouped stack from `content/techStack.ts` (Languages, Frontend, Backend, Databases, ML, Visualization, Tools).
- **FR-TECH-2** Each item shows label + icon (lucide / react-icons brand logos where available).
- **FR-TECH-3** Grouped, scannable layout; groups are data-driven (adding a group/item edits content only).
- **FR-TECH-4** Subtle hover/entrance motion; no essential info conveyed by motion alone.

### 7.5 Projects

- **FR-PROJ-1** Render the project grid from `content/projects.ts`. The portfolio showcases **exactly three** case studies: the **Primary Featured Project** (`featured: true`) — **Financial News Sentiment Analytics Platform** — is visually emphasized (larger card / featured band), followed by **Customer Churn Prediction Dashboard** and **Vendor Performance Analytics**.
- **FR-PROJ-2** Each `ProjectCard` shows title, tagline, tech tags, and links (live/repo/case study/demo) when present.
- **FR-PROJ-3** Cards are **animated**: hover elevation + optional restrained **parallax tilt** (`react-parallax-tilt`), disabled on touch and under reduced motion.
- **FR-PROJ-4** Project detail must convey **problem → approach → impact** and measurable highlights.
- **FR-PROJ-5** Optional deep-link route `app/projects/[slug]/page.tsx` for full case studies (uses `generateMetadata` + async `params`).
- **FR-PROJ-6** Empty/optional link fields degrade gracefully.

### 7.6 Skills

- **FR-SKILL-1** Render skills from `content/skills.ts`, grouped by category; optional proficiency indicator.
- **FR-SKILL-2** Distinct from Tech Stack: Skills may express proficiency/emphasis; Tech Stack is the tool inventory.
- **FR-SKILL-3** Fully data-driven and responsive.

### 7.7 Achievements

- **FR-ACH-1** Render achievements from `content/achievements.ts` as cards/list with icon, title, description, optional date.
- **FR-ACH-2** Adding an achievement edits content only.

### 7.8 Certifications

- **FR-CERT-1** Render certifications from `content/certifications.ts`: title, issuer, date, optional credential link/ID.
- **FR-CERT-2** Credential links open in a new tab with `rel="noopener noreferrer"`.

### 7.9 GitHub

- **FR-GH-1** Present GitHub identity/link from `profile.socials.github`.
- **FR-GH-2** Optionally display live stats/contribution visualization for `stats.github.username`, fetched **server-side** and cached.
- **FR-GH-3** Must degrade gracefully to a static call-to-visit card if the API/network is unavailable (no layout shift, no error surfaced to user).

### 7.10 LeetCode

- **FR-LC-1** Present LeetCode identity/link from `profile.socials.leetcode`.
- **FR-LC-2** Optionally display solved counts / rating for `stats.leetcode.username`, fetched server-side with caching and graceful fallback.
- **FR-LC-3** Same degradation guarantees as GitHub ([FR-GH-3](#79-github)).

### 7.11 Timeline

- **FR-TL-1** Render a vertical timeline from `content/timeline.ts` covering education, experience, and milestones.
- **FR-TL-2** Items animate in on scroll (once); chronological ordering enforced.
- **FR-TL-3** `end` supports the literal `"Present"`.

### 7.12 Contact

- **FR-CONT-1** Prominent contact CTA (email link) + social links; always reachable.
- **FR-CONT-2** If a form is included: accessible labels, `aria-describedby` errors, spam protection, success/error states, and no color-only signaling. Submission via an email service/route handler.
- **FR-CONT-3** Resume download available here and in the nav.

### 7.13 Footer

- **FR-FOOT-1** Owner name, social links, copyright with current year, "built with" note, and back-to-top control.
- **FR-FOOT-2** All links data-driven from `content/`.

---

## 8. Design System & UX Requirements

### 8.1 Design Philosophy

- **Premium, product-grade craft** benchmarked to Apple, OpenAI, Linear, Stripe, Vercel.
- **Dark theme first** — dark is the primary designed experience (light theme optional/secondary; if omitted, dark is default and complete).
- Content-first; motion with meaning; one cohesive accent story (blue→purple).
- Consistency via tokens — **no magic hex/spacing in JSX**.

### 8.2 Color System

Colors are OKLCH design tokens in `app/globals.css`, exposed via `@theme inline`. Components use semantic tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.).

- **CLR-1 Dark-first palette:** deep near-black background (`background`), high-contrast foreground, layered elevated surfaces (`card`, `secondary`, `muted`).
- **CLR-2 Signature accent:** a **blue→purple gradient** system. Define brand tokens in OKLCH in both `:root` and `.dark`:
  - `--brand-blue: oklch(<L> <C> ~260)` — `[TUNE]`
  - `--brand-purple: oklch(<L> <C> ~300)` — `[TUNE]`
  - `--gradient-brand: linear-gradient(135deg, var(--brand-blue), var(--brand-purple))`
- **CLR-3** Gradient usage: headline emphasis (gradient text), primary CTAs, active indicators, blob glows, focus accents — used **sparingly** for impact.
- **CLR-4** Any new color is added as a token and referenced semantically; raw hex/rgb in components is prohibited.
- **CLR-5** All text/background pairings must meet contrast targets (see [§11](#11-accessibility-requirements)) in the active theme, including over glass surfaces.

### 8.3 Typography

- Fonts via `next/font`: **Geist Sans** (`--font-sans`) for UI/body, **Geist Mono** (`--font-mono`) for code/tags/metadata.
- **TYP-1** Type scale (guideline): hero `text-5xl`→`text-7xl` `font-semibold tracking-tight`; section titles `text-3xl`→`text-4xl`; body `text-base`→`text-lg` `leading-relaxed`; labels/eyebrows `text-sm font-mono uppercase tracking-wide`.
- **TYP-2** Limit to 2–3 weights (400/500/600). Cap body line length at `~max-w-2xl`/`max-w-prose`.
- **TYP-3** Gradient text reserved for hero/headline emphasis; must remain readable and have an accessible solid-color fallback where contrast is at risk.

### 8.4 Spacing, Layout & Grid

- **LAY-1** Consistent vertical section rhythm (e.g., `py-24 sm:py-32`).
- **LAY-2** Central `Container` enforces max width (`~max-w-6xl`) and responsive gutters.
- **LAY-3** Grids: projects/skills use responsive 1→2→3 column layouts; no horizontal overflow at any width.
- **LAY-4** Radius/spacing come from tokens (`--radius`, Tailwind scale), not arbitrary values.

### 8.5 Glassmorphism & Surfaces

- **GLASS-1** Provide a reusable `GlassCard`/glass surface style: translucent background, `backdrop-blur`, subtle 1px border (low-alpha), soft shadow, optional gradient border on emphasis.
- **GLASS-2** Ensure content over glass meets contrast; provide a non-blur fallback where `backdrop-filter` is unsupported.
- **GLASS-3** Glass is used for nav (on scroll), cards, and elevated panels — consistently, not indiscriminately.

### 8.6 Signature Effects

- **FX-1 Floating background blobs:** soft, blurred gradient blobs (blue/purple) with slow, subtle drift; purely decorative (`aria-hidden`), GPU-friendly (transform/opacity), and paused/reduced under `prefers-reduced-motion`.
- **FX-2 Mouse spotlight:** a radial glow following the cursor (e.g., in hero/section backgrounds), implemented via a client hook (`useMousePosition`); disabled on touch devices and under reduced motion; must not harm INP.
- **FX-3 Animated project cards:** hover elevation + optional parallax tilt (see [FR-PROJ-3](#75-projects)).
- **FX-4** All effects are isolated client leaf components under `components/effects/` and must never block content readability or interaction.

---

## 9. Animation & Motion Specification

Primary: **Framer Motion**. Helpers: `react-intersection-observer`, `react-type-animation`, `react-parallax-tilt`, `tw-animate-css`.

- **MOT-1 Principle:** motion clarifies and delights; it is never load-bearing for comprehension.
- **MOT-2 Reduced motion (hard requirement):** honor `prefers-reduced-motion: reduce` globally via `useReducedMotion` — reveals become instant (opacity-only), typing does not autoplay, blobs/spotlight/tilt disable.
- **MOT-3 Enter once:** scroll reveals use `triggerOnce`; no re-animation on scroll-back.
- **MOT-4 Standard tokens** (in `constants/motion.ts`):

| Property | Value |
| --- | --- |
| Micro-interaction duration | ≤ 200ms |
| Section reveal duration | 250–400ms |
| Easing | `ease-out` for entrances; springs only for small, contained elements |
| Translate distance | 8–24px |
| Stagger | 40–80ms between siblings |
| Hover scale | ≤ 1.03 |

- **MOT-5** Reusable motion wrappers (`AnimatedSection`, variants) live in `components/shared/`; sections consume them rather than re-declaring variants.
- **MOT-6** Animate only `transform`/`opacity`; avoid animating layout-affecting properties. Effects must not regress INP.

---

## 10. Responsive Design Requirements

Mobile-first; verified across breakpoints (recruiters browse on phones).

| Breakpoint | Tailwind | Target |
| --- | --- | --- |
| Base | `<640px` | Phones — single column, stacked, tap-friendly |
| `sm` | `≥640px` | Large phones / small tablets |
| `md` | `≥768px` | Tablets — 2-col grids |
| `lg` | `≥1024px` | Laptops — full multi-column |
| `xl`/`2xl` | `≥1280px`/`≥1536px` | Desktops — capped width, comfortable gutters |

- **RSP-1** No horizontal scroll from 320px upward.
- **RSP-2** Touch targets ≥ 44×44px with adequate spacing.
- **RSP-3** Images responsive via `next/image` with correct `sizes`.
- **RSP-4** Mobile nav collapses to an accessible menu.
- **RSP-5** Manually verify at 320, 375, 768, 1024, 1440.

---

## 11. Accessibility Requirements

**Target: WCAG 2.1 AA.** Accessibility is a completion criterion (accessibility-first).

- **A11Y-1** Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`), exactly one `h1`, logical heading order.
- **A11Y-2** Full keyboard operability; logical focus order; visible focus rings (via `ring` token) — never removed without replacement.
- **A11Y-3** Meaningful `alt` text; decorative visuals (blobs/spotlight) `aria-hidden`; icon-only controls have accessible names.
- **A11Y-4** Contrast ≥ 4.5:1 (≥3:1 large text) in the active theme, including text over glass/gradient.
- **A11Y-5** Respect `prefers-reduced-motion` everywhere (see [§9](#9-animation--motion-specification)).
- **A11Y-6** Forms: associated labels, `aria-describedby` errors, no color-only signaling.
- **A11Y-7** "Skip to content" link; theme toggle exposes state accessibly with no flash of incorrect theme.
- **A11Y-8** Verification: Lighthouse a11y ≈100, axe DevTools clean, manual keyboard + screen-reader (VoiceOver) pass.

---

## 12. Performance Requirements

Speed is part of the pitch. Leverage RSC, `next/image`, `next/font`, static rendering.

| Metric | Target |
| --- | --- |
| Lighthouse Performance (mobile) | **≥ 95** |
| Lighthouse Best Practices / SEO / A11y | ≥ 95 (a11y ~100) |
| LCP | ≤ 2.0s |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| TTFB | ≤ 0.8s |

- **PERF-1** Minimize client JS: Server Components by default; `"use client"` only at interactive leaves.
- **PERF-2** Images: `next/image`, AVIF/WebP, explicit dimensions; `priority` only for hero LCP asset.
- **PERF-3** Fonts: `next/font` self-hosted, `display: swap`, `latin` subset; no render-blocking third-party font CSS.
- **PERF-4** Prefer static/prerendered output; cache external stats; no unnecessary client fetching.
- **PERF-5** Reserve space for media/effects to protect CLS; effects must not degrade INP.
- **PERF-6** Lazy-load non-critical client widgets (tilt, heavy effects) behind viewport/interaction.
- **PERF-7** Review bundle before adding heavy dependencies.

---

## 13. SEO Requirements

Use the Next.js 16 **Metadata API** and file conventions (ref: bundled `.../14-metadata-and-og-images.md`).

- **SEO-1** `metadata` export in `app/layout.tsx` (+ per-route): `metadataBase`, title template (`"%s | Victor Ipil Soren"`), rich description, keywords, authors/creator.
- **SEO-2** `openGraph` (title, description, url, siteName, images, type, locale) and `twitter` (`summary_large_image`).
- **SEO-3** `app/opengraph-image.tsx` generated OG image via `next/og` (1200×630); optional `twitter-image`.
- **SEO-4** `app/sitemap.ts` and `app/robots.ts` generated; robots allows indexing and references sitemap.
- **SEO-5** Favicons/app icons per metadata file conventions (`favicon.ico`, `app/icon`, `apple-icon`).
- **SEO-6** JSON-LD `Person` (name, url, `sameAs` socials, `jobTitle`, `alumniOf`) injected in layout.
- **SEO-7** `alternates.canonical`; site URL stored in `constants/site.ts` and reused.
- **SEO-8** Replace the current placeholder metadata (`title: "Create Next App"`) before any deploy.
- **SEO-9** Descriptive `<h1>`, meaningful headings, descriptive link text, and alt text throughout.

---

## 14. Engineering Principles & Quality Standards

- **ENG-1 Reusable components:** small, composable, typed; variants via `class-variance-authority`, merging via `cn()`.
- **ENG-2 Strong typing:** strict TypeScript; content shapes in `types/`; no `any`.
- **ENG-3 Clean architecture:** enforce layer separation (content / components / hooks / lib / constants / styles / types).
- **ENG-4 Accessibility & performance** are acceptance criteria, not enhancements.
- **ENG-5 Maintainability:** self-documenting names; comments only for non-obvious intent; no dead code.
- **ENG-6 Scalability:** new content types (blog, internships, experience) added via content + a generic renderer, not bespoke hardcoding.
- **ENG-7 Production-ready:** passes lint, typechecks, and build with zero errors; no console errors at runtime.
- **ENG-8 Consistency:** follow tokens, motion constants, and this SRS; deviations require a spec amendment.
- **ENG-9 Next.js 16 correctness:** async `params`/`searchParams`, RSC boundaries, metadata/file conventions verified against bundled docs.

---

## 15. Success Criteria & Acceptance

The portfolio is considered successful when it:

- **SC-1** Impresses recruiters and reads as a premium, modern software product (Apple/OpenAI/Linear/Stripe/Vercel caliber) — not a template.
- **SC-2** Clearly positions the owner for Data Analytics, ML, Data Engineering, and Software Engineering roles.
- **SC-3** Achieves **95+ Lighthouse** performance and ~100 accessibility, meeting all CWV targets ([§12](#12-performance-requirements)).
- **SC-4** Is fully responsive (320px+) with no layout breakage.
- **SC-5** Is accessibility-first (WCAG 2.1 AA verified).
- **SC-6** Is data-driven: every section's content updates by editing `content/` only.
- **SC-7** Is scalable: blogs/internships/experience/certifications/projects/achievements add via content files without UI changes.
- **SC-8** Follows modern Next.js 16 best practices and passes lint/typecheck/build cleanly.

---

## 16. Change Management

- **CM-1** This SRS is the authoritative source for all development. Implement to spec; if reality must differ, update this SRS **first**.
- **CM-2** Do **not** overwrite or wholesale-restructure this file unless the owner explicitly instructs it. Prefer additive amendments.
- **CM-3** Bump the version and update "Last updated" on any change; note material changes in a changelog entry below.
- **CM-4** New features must cite the requirement ID(s) they satisfy in PRs/commits.

**Changelog**

| Version | Date | Summary |
| --- | --- | --- |
| 1.0 | 2026-07-15 | Initial SRS: full requirements for the Personal Portfolio. |
| 1.1 | 2026-07-15 | Reduced the showcased projects from five to three (Primary Featured + two); removed **Smart Expense Splitter** and **Blockchain Legal Vault** from [§7.5](#75-projects) and [Appendix A](#17-appendix-a--featured-projects-backlog). |

---

## 17. Appendix A — Featured Projects Backlog

Authoritative project list (defined in `content/projects.ts`). The portfolio showcases **exactly three** case studies, led by the Primary Featured Project. Each requires problem → approach → impact and measurable highlights before launch.

| # | Project | Flagship | Primary domain(s) |
| --- | --- | --- | --- |
| 1 | **Financial News Sentiment Analytics Platform** | ✅ Yes (Primary Featured) | Machine Learning, Data Analytics, Data Engineering |
| 2 | Customer Churn Prediction Dashboard | No | Machine Learning, Data Analytics |
| 3 | Vendor Performance Analytics | No | Data Analytics, Data Engineering |

> Owner to supply per-project: tagline, problem/approach/impact, role, stack, highlights/metrics, image, and links (live/repo/case study/demo), and set `featured` accordingly.

---

## 18. Appendix B — Definition of Done

A feature/section is complete only when it:

1. Reads all content from `content/*` (no hardcoded personal data). — [DC-4](#25-design--implementation-constraints), [CR-2](#53-data-driven-content-layer)
2. Uses semantic design tokens (no raw hex; no magic spacing). — [§8.2](#82-color-system)
3. Looks correct in the dark theme across all breakpoints (320px+). — [§10](#10-responsive-design-requirements)
4. Is keyboard-accessible with visible focus and passes axe with no violations. — [§11](#11-accessibility-requirements)
5. Honors `prefers-reduced-motion`. — [MOT-2](#9-animation--motion-specification)
6. Keeps client JS minimal (`"use client"` only where required). — [RC-1](#54-rendering--component-strategy)
7. Meets performance targets (95+ Lighthouse, CWV). — [§12](#12-performance-requirements)
8. Is strongly typed with shapes in `types/` and no `any`. — [ENG-2](#14-engineering-principles--quality-standards)
9. Passes lint, typecheck, and build with zero errors. — [ENG-7](#14-engineering-principles--quality-standards)
10. Conforms to this SRS — or this SRS was amended first. — [§16](#16-change-management)
