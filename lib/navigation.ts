import type { NavItem } from "@/types";
import { navigation } from "@/content/navigation";
import { certifications } from "@/content/certifications";
import { timeline } from "@/content/timeline";
import { SECTION_IDS } from "@/constants/navigation";

/**
 * Some sections self-hide when their content is empty (e.g. Certifications). This
 * keeps the nav honest by dropping links whose section would not render, so
 * anchors never point at nothing. Sections not listed here always render.
 */
const SECTION_RENDERS: Record<string, boolean> = {
  [SECTION_IDS.certifications]: certifications.length > 0,
  [SECTION_IDS.timeline]: timeline.length > 0,
};

/** Navigation items whose target section actually renders (FR-NAV-6). */
export function getVisibleNavigation(): NavItem[] {
  return navigation.filter((item) => SECTION_RENDERS[item.id] !== false);
}
