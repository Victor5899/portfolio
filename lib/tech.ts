import { skills } from "@/content/skills";

/**
 * Maps a technology display name (as used in `project.stack`) to the icon key
 * already defined in `content/skills`, so the icon association stays single-
 * sourced (DRY-2) instead of being re-declared per component.
 */
const ICON_KEY_BY_NAME: Record<string, string> = Object.fromEntries(
  skills
    .flatMap((group) => group.items)
    .filter((item): item is typeof item & { icon: string } =>
      Boolean(item.icon),
    )
    .map((item) => [item.name.toLowerCase(), item.icon]),
);

/** Returns the TechIcon key for a stack entry, or undefined when unknown. */
export function getTechIconKey(name: string): string | undefined {
  return ICON_KEY_BY_NAME[name.toLowerCase()];
}
