import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { formatProjectDates } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { ProjectImage } from "@/components/common/ProjectImage";
import { ProjectLinks } from "@/components/common/ProjectLinks";

/**
 * Case-study cover. Renders the project's identity — year, domains, title,
 * tagline, action links, a full-width cover, and a role/year/domain spec strip
 * — entirely from content (DATA-1). Carries the page's single `h1` (A11Y-1) and
 * a "Back to projects" escape hatch at the top.
 */
export function ProjectHero({ project }: { project: Project }) {
  const domains = project.domain.join(" / ");
  const dates = formatProjectDates(project);
  const facts = [
    { label: "Role", value: project.role },
    { label: project.period ? "Dates" : "Year", value: dates },
    { label: "Domain", value: project.domain.join(", ") },
  ];

  return (
    <header className="pt-10 sm:pt-16">
      <Container>
        <Link
          href={ROUTES.projects}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-eyebrow transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          Back to projects
        </Link>

        <div className="mt-12 flex flex-col gap-6 sm:mt-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Eyebrow className="text-brand">Case study</Eyebrow>
            <Eyebrow>{dates}</Eyebrow>
            <Eyebrow>{domains}</Eyebrow>
          </div>
          <Heading as="h1" size="display" className="max-w-5xl">
            {project.title}
          </Heading>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Text variant="lead" className="max-w-2xl text-pretty lg:col-span-7">
            {project.tagline}
          </Text>
          <ProjectLinks links={project.links} className="lg:col-span-5 lg:justify-end" />
        </div>

        <ProjectImage
          src={project.image}
          alt={`${project.title} cover`}
          label={project.title}
          kicker={domains}
          aspect="aspect-[4/3] sm:aspect-[16/9]"
          className="mt-12 sm:mt-16"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          fit={project.imageFit}
        />

        <dl className="border-border mt-10 grid gap-8 border-t pt-8 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-2">
              <dt>
                <Eyebrow>{fact.label}</Eyebrow>
              </dt>
              <dd className="text-foreground text-pretty">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </header>
  );
}
