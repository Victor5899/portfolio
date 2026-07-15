import type { SeoConfig } from "@/types";
import { SITE } from "@/constants/site";
import { profile } from "./profile";

/**
 * SEO content (SRS §13). Composes the canonical site identity (constants/site)
 * with owner data so URL/name stay single-sourced. `lib/seo` turns this into a
 * Next.js Metadata object.
 */
export const seo: SeoConfig = {
  siteName: `${SITE.name} — Portfolio`,
  title: `${SITE.name} — Data Analytics & Machine Learning`,
  titleTemplate: `%s | ${SITE.name}`,
  description:
    "Portfolio of Victor Ipil Soren — B.Tech CSE (Big Data Analytics) student building data products across Data Analytics, Machine Learning, Data Engineering, and Software Engineering.",
  url: SITE.url,
  locale: SITE.locale,
  keywords: [
    "Victor Ipil Soren",
    "Data Analytics",
    "Machine Learning",
    "Data Engineering",
    "Software Engineering",
    "Python",
    "SQL",
    "Data Science Portfolio",
    "SRM Institute of Science and Technology",
    ...profile.targetRoles,
  ],
  authorName: SITE.name,
  ogImage: "/opengraph-image",
  themeColor: SITE.themeColor,
};
