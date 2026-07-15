import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { Container } from "@/components/layout/Container";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { GradientText } from "@/components/common/GradientText";
import { ProjectImage } from "@/components/common/ProjectImage";
import { ProjectLinks } from "@/components/common/ProjectLinks";
import { Badge } from "@/components/ui/badge";

/**
 * Detail-page hero banner (task: Hero Banner). Renders the project's identity —
 * year, domains, title, tagline, action links, and cover — entirely from content
 * (DATA-1). Carries the page's single `h1` (A11Y-1) and a "Back to Projects"
 * escape hatch at the top.
 */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-4">
      <Container>
        <Link
          href={ROUTES.projects}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 rounded-md text-sm outline-none transition-colors focus-visible:ring-2"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow>{project.year}</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {project.domain.map((domain) => (
                <li key={domain}>
                  <Badge variant="secondary">{domain}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <Heading as="h1" size="display" className="max-w-4xl">
            <GradientText>{project.title}</GradientText>
          </Heading>

          <Text variant="lead" className="max-w-2xl text-pretty">
            {project.tagline}
          </Text>

          <ProjectLinks links={project.links} className="mt-2" />
        </div>

        <div className="mt-10">
          <ProjectImage
            src={project.image}
            alt={`${project.title} cover`}
            label={project.title}
            aspect="aspect-[16/9]"
            className="border-border/60 rounded-2xl border"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
