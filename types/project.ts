export type ProjectDomain =
  | "Data Analytics"
  | "Machine Learning"
  | "Data Engineering"
  | "Software";

export interface ProjectLinks {
  live?: string;
  repo?: string;
  caseStudy?: string;
  demo?: string;
}

/** A single screenshot for the detail-page gallery. */
export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line summary shown on the card. */
  tagline: string;
  /** Short overview used in listings. */
  description: string;
  /** Case-study narrative: what problem this solves. */
  problem: string;
  /** Case-study narrative: what was built and how (the "Solution"). */
  approach: string;
  /** Case-study narrative: the measurable/qualitative outcome. */
  impact: string;
  /** The owner's specific contribution. */
  role: string;
  stack: string[];
  /** Flagship flag — controls emphasis in the Projects grid. */
  featured: boolean;
  /** Bullet metrics/outcomes. */
  highlights?: string[];
  /** Cover image path served from /public/projects. */
  image: string;
  links: ProjectLinks;
  year: string;
  domain: ProjectDomain[];

  // ── Optional case-study detail fields (SRS §7.5 / Appendix A) ──────────────
  // Every field is optional so the detail page renders a section only when its
  // content exists (DATA-6 graceful degradation); no layout breaks when absent.
  /** Goals the project set out to achieve. */
  objectives?: string[];
  /** Narrative of the system/data architecture. */
  architecture?: string;
  /** User-facing capabilities delivered. */
  features?: string[];
  /** Notable implementation details / engineering decisions. */
  implementation?: string[];
  /** Hard problems encountered and how they were handled. */
  challenges?: string[];
  /** Takeaways and skills gained. */
  lessonsLearned?: string[];
  /** Planned next steps / roadmap. */
  futureImprovements?: string[];
  /** Screenshot gallery for the detail page. */
  screenshots?: ProjectScreenshot[];
}
