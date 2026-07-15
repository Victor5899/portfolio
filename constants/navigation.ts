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
  /** Sticky header height in px (offset for scroll-spy + anchor targets). */
  headerHeight: 64,
  /** Extra scroll offset applied above section anchors in px. */
  scrollOffset: 80,
  /** Scroll distance in px after which the nav gains its glass background. */
  glassThreshold: 24,
} as const;
