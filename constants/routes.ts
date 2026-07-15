/** Application route paths. Centralized so links never hardcode strings. */
export const ROUTES = {
  home: "/",
  projects: "/#projects",
  project: (slug: string): string => `/projects/${slug}`,
  resume: "/resume.pdf",
} as const;

export type Routes = typeof ROUTES;
