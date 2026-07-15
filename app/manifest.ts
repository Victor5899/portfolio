import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { seo } from "@/content/seo";

/** Web app manifest (SRS SEO-5): installable metadata, dark-first theming. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.siteName,
    short_name: SITE.shortName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
