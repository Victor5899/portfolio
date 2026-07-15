export interface Certification {
  title: string;
  issuer: string;
  /** Human-readable issue date, e.g. "Jan 2025". */
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}
