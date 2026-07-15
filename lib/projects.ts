import type { Project } from "@/types";
import { projects } from "@/content/projects";

/** Reusable selectors over project content so components never filter inline. */

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getOtherProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/**
 * The next project in listing order, wrapping around to the first — powers the
 * "Next project" navigation on detail pages. Returns undefined only when the
 * slug is unknown or there is a single project.
 */
export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}
