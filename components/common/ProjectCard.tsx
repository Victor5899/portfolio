import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { formatProjectDates } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectImage } from "./ProjectImage";
import { ProjectLinks } from "./ProjectLinks";
import { TechBadges } from "./TechBadges";
import { Heading, Text, Eyebrow } from "./Typography";

interface ProjectCardProps {
  project: Project;
  /** 1-based listing position, shown as an editorial index. */
  index?: number;
  /** Flagship layout: full-width thumbnail with a split text block. */
  featured?: boolean;
}

/**
 * Editorial project entry (SRS §7.5 / FR-PROJ-2..3). One component serves both
 * the flagship and secondary projects via `featured`. A large framed thumbnail
 * leads; hover gently zooms the image and draws the title underline (pure CSS,
 * so this stays a Server Component). A stretched link makes the whole entry
 * open the case study while the external link buttons stay independently
 * clickable and keyboard-accessible (A11Y-2).
 */
export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const href = ROUTES.project(project.slug);
  const domains = project.domain.join(" / ");

  return (
    <article className="group relative flex h-full flex-col gap-6 sm:gap-8">
      <ProjectImage
        src={project.image}
        alt={`${project.title} cover`}
        label={project.title}
        kicker={domains}
        aspect={featured ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"}
        zoomOnHover
        sizes={
          featured
            ? "(min-width: 1152px) 1152px, 100vw"
            : "(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
        }
      />

      <div
        className={cn(
          "flex flex-1 flex-col gap-5",
          featured && "lg:grid lg:grid-cols-12 lg:gap-8",
        )}
      >
        <div className={cn("flex flex-col gap-3", featured && "lg:col-span-7")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {index ? (
              <Eyebrow className="text-brand">
                {String(index).padStart(2, "0")}
              </Eyebrow>
            ) : null}
            {featured ? <Eyebrow className="text-foreground">Featured</Eyebrow> : null}
            <Eyebrow>{formatProjectDates(project)}</Eyebrow>
            <Eyebrow className="hidden sm:inline">{domains}</Eyebrow>
          </div>

          <Heading as="h3" size={featured ? "h1" : "h2"}>
            <Link
              href={href}
              className="after:absolute after:inset-0 after:z-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background"
            >
              <span className="link-underline box-decoration-clone">
                {project.title}
              </span>
            </Link>
          </Heading>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-5",
            featured && "lg:col-span-5 lg:pt-2",
          )}
        >
          <Text variant={featured ? "lead" : "muted"} className="text-pretty">
            {project.tagline}
          </Text>

          <TechBadges stack={project.stack} max={featured ? undefined : 5} />

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <div className="relative z-10">
              <ProjectLinks links={project.links} size="default" />
            </div>
            <span
              aria-hidden
              className="text-muted-foreground group-hover:text-foreground ml-auto inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-eyebrow transition-colors"
            >
              Case study
              <ArrowUpRight className="group-hover:text-brand size-3.5 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
