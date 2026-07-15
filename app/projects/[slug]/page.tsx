import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { buildProjectJsonLd, buildProjectMetadata } from "@/lib/seo";
import { ProjectCaseStudy } from "@/components/sections/project-detail/ProjectCaseStudy";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Only the slugs from content prerender; unknown slugs 404 (FR-PROJ-5 / SEO). */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProjectJsonLd(project)),
        }}
      />
      <ProjectCaseStudy project={project} />
    </>
  );
}
