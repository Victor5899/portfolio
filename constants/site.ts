/**
 * Foundational site identity. Single source of truth for the canonical URL,
 * owner name, and brand color — consumed by SEO content, metadata, and JSON-LD.
 */
export const SITE = {
  name: "Victor Ipil Soren",
  shortName: "Victor Soren",
  /** Canonical production URL (no trailing slash). Update on deploy. */
  url: "https://victorsoren.com",
  locale: "en_US",
  /** Brand base color used for theme-color / masks. */
  themeColor: "#0a0a0a",
} as const;

export type SiteConfig = typeof SITE;
