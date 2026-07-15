/** Pure formatting/helpers shared across the app. No UI, no side effects. */

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** Convert a string into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Render a start–end range, tolerating the "Present" literal. */
export function formatDateRange(start: string, end: string): string {
  return start === end ? start : `${start} — ${end}`;
}

/** Format an absolute-ish URL for display (strip protocol + trailing slash). */
export function formatDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Compact number formatting, e.g. 1200 -> "1.2k". */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}
