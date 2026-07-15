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
}
