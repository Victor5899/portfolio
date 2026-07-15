import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/** robots.txt (SRS SEO-4): allow indexing and point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
