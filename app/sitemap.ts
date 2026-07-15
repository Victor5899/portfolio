import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { getAllProjectSlugs } from "@/lib/projects";

/**
 * Generated sitemap (SRS SEO-4). The home page plus every project detail route,
 * derived from the content layer so new projects are indexed automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectPages: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${SITE.url}${ROUTES.project(slug)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
