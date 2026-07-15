import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { socials } from "@/content/socials";

/**
 * Builds the root Next.js Metadata object from SEO content (SRS §13, SEO-1..7).
 * Consumed by `app/layout.tsx`. Per-route pages can spread the return value and
 * override `title`/`description`.
 */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(seo.url),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: seo.authorName, url: seo.url }],
    creator: seo.authorName,
    applicationName: seo.siteName,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      url: seo.url,
      locale: seo.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: seo.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * JSON-LD `Person` structured data (SEO-6). Serialize into a
 * <script type="application/ld+json"> in the layout.
 */
export function buildPersonJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seo.authorName,
    url: seo.url,
    jobTitle: "Data Analytics & Machine Learning Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "SRM Institute of Science and Technology",
    },
    sameAs: socials
      .filter((link) => link.external)
      .map((link) => link.href),
  };
}
