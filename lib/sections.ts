import { navigation } from "@/content/navigation";

export interface SectionMeta {
  /** Zero-padded position used as the section eyebrow, e.g. "01". */
  eyebrow: string;
  /** Human label sourced from the navigation content layer. */
  label: string;
}

/**
 * Derives a section's eyebrow (its position) and title from the navigation
 * content layer, so section headings are never hardcoded (DATA-1) and stay in
 * sync with the nav order.
 */
export function getSectionMeta(id: string): SectionMeta {
  const index = navigation.findIndex((item) => item.id === id);
  const position = (index < 0 ? navigation.length : index) + 1;
  return {
    eyebrow: String(position).padStart(2, "0"),
    label: index < 0 ? "" : navigation[index].label,
  };
}
