/** A single headline metric rendered as an animated count-up in the hero. */
export interface HeroStat {
  label: string;
  value: number;
  /** Appended after the value, e.g. "+" or "/10". */
  suffix?: string;
  /** Fixed decimal places for the count-up (e.g. 2 for a CGPA like 8.17). */
  decimals?: number;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  /** Primary positioning line, e.g. "Data & ML Engineer". */
  role: string;
  /** Rotating phrases for the hero typing animation. */
  taglines: string[];
  /** One-line value proposition. */
  summary: string;
  /** Longer narrative bio. */
  about: string;
  location: string;
  email: string;
  phone?: string;
  /** Path to the résumé served from /public. */
  resumeUrl: string;
  /** Path to the avatar image served from /public. */
  avatar: string;
  available: boolean;
  availabilityMessage?: string;
  /** Role families the portfolio targets. */
  targetRoles: string[];
  /** Headline metrics for the hero's animated statistics. */
  heroStats: HeroStat[];
  /** Curated technology icon keys for the hero's floating badges (decorative). */
  technologies: string[];
}
