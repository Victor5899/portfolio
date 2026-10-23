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
  /**
   * Path to the résumé served from /public (e.g. "/resume.pdf"). Leave unset
   * until the file exists — résumé CTAs render only when this is present.
   */
  resumeUrl?: string;
  /** Path to the avatar image served from /public. */
  avatar: string;
  available: boolean;
  availabilityMessage?: string;
  /** Role families the portfolio targets. */
  targetRoles: string[];
  /** Curated technology icon keys for the hero's floating badges (decorative). */
  technologies: string[];
}
