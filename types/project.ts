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

export interface Project {
  slug: string;
  title: string;
  /** One-line summary shown on the card. */
  tagline: string;
  /** Short overview used in listings. */
  description: string;
  /** Case-study narrative: what problem this solves. */
  problem: string;
  /** Case-study narrative: what was built and how. */
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
}
