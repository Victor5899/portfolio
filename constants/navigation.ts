/**
 * Stable section identifiers used as in-page anchors and by scroll-spy.
 * `content/navigation.ts` builds the labeled, ordered nav list from these,
 * keeping ids in one place (DRY-2).
 */
export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  techStack: "tech-stack",
  projects: "projects",
  skills: "skills",
  achievements: "achievements",
  certifications: "certifications",
  github: "github",
  leetcode: "leetcode",
  timeline: "timeline",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Behavioral constants for the sticky header and anchor scrolling. */
export const NAV_CONFIG = {
  /** Extra scroll offset applied above section anchors in px (clears the 4rem `h-header`). */
  scrollOffset: 80,
  /** Scroll distance in px after which the nav gains its solid background. */
  scrolledThreshold: 24,
} as const;
