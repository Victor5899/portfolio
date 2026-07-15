export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME = {
  /** Dark-first per SRS §8.1 — dark is the primary designed experience. */
  default: "dark",
  /** localStorage key for the persisted preference. */
  storageKey: "portfolio-theme",
  /** Class applied to <html> when dark mode is active (see globals.css). */
  darkClass: "dark",
} as const satisfies {
  default: ThemeMode;
  storageKey: string;
  darkClass: string;
};
