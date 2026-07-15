import type { NavItem } from "@/types";
import { SECTION_IDS } from "@/constants/navigation";

/**
 * Ordered, labeled navigation built from the canonical section ids
 * (constants/navigation.ts). Reorder or trim to control the nav and scroll-spy;
 * the UI renders this list generically (FR-NAV-6).
 */
export const navigation: NavItem[] = [
  { id: SECTION_IDS.about, label: "About", href: `#${SECTION_IDS.about}` },
  { id: SECTION_IDS.techStack, label: "Tech Stack", href: `#${SECTION_IDS.techStack}` },
  { id: SECTION_IDS.projects, label: "Projects", href: `#${SECTION_IDS.projects}` },
  { id: SECTION_IDS.skills, label: "Skills", href: `#${SECTION_IDS.skills}` },
  { id: SECTION_IDS.achievements, label: "Achievements", href: `#${SECTION_IDS.achievements}` },
  { id: SECTION_IDS.certifications, label: "Certifications", href: `#${SECTION_IDS.certifications}` },
  { id: SECTION_IDS.github, label: "GitHub", href: `#${SECTION_IDS.github}` },
  { id: SECTION_IDS.leetcode, label: "LeetCode", href: `#${SECTION_IDS.leetcode}` },
  { id: SECTION_IDS.timeline, label: "Timeline", href: `#${SECTION_IDS.timeline}` },
  { id: SECTION_IDS.contact, label: "Contact", href: `#${SECTION_IDS.contact}` },
];
