import type { Metadata } from "next";
import type { Project } from "@/types";
import { seo } from "@/content/seo";
import { socials } from "@/content/socials";
import { profile } from "@/content/profile";
import { primaryEducation } from "@/content/education";
import { ROUTES } from "@/constants/routes";

/** Absolute URL for a site-relative path, using the canonical site URL. */
function absoluteUrl(path: string): string {
  return `${seo.url}${path.startsWith("/") ? path : `/${path}`}`;
}

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
 * Per-project metadata for `/projects/[slug]` (SRS §13 / SEO-1..7, FR-PROJ-5).
 * Generated dynamically from project content so the title, description, keywords,
 * canonical URL, and Open Graph/Twitter cards stay in sync with the data layer.
 * The title uses the plain project title; the root title template appends the
 * site name (SEO-1).
 */
export function buildProjectMetadata(project: Project): Metadata {
  const path = ROUTES.project(project.slug);
  const description = project.description || project.tagline;

  return {
    title: project.title,
    description,
    keywords: [project.title, ...project.stack, ...project.domain],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      siteName: seo.siteName,
      title: project.title,
      description,
      url: path,
      locale: seo.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      creator: seo.twitterHandle,
    },
  };
}

/**
 * JSON-LD `Person` structured data (SEO-6). Serialize into a
 * <script type="application/ld+json"> in the layout. Every field is sourced from
 * the content layer so the graph stays in sync with the site (DATA-2).
 */
export function buildPersonJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seo.authorName,
    url: seo.url,
    image: absoluteUrl("/opengraph-image"),
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.summary,
    knowsAbout: profile.targetRoles,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: primaryEducation.university,
    },
    sameAs: socials.filter((link) => link.external).map((link) => link.href),
  };
}

/** JSON-LD `WebSite` structured data (SEO-6) for the site as a whole. */
export function buildWebSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.siteName,
    url: seo.url,
    description: seo.description,
    inLanguage: "en",
    author: { "@type": "Person", name: seo.authorName, url: seo.url },
  };
}

/** JSON-LD `CreativeWork` for a project detail page (SEO-6, FR-PROJ-5). */
export function buildProjectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description || project.tagline,
    url: absoluteUrl(ROUTES.project(project.slug)),
    dateCreated: project.year,
    keywords: [...project.stack, ...project.domain].join(", "),
    author: { "@type": "Person", name: seo.authorName, url: seo.url },
  };
}
