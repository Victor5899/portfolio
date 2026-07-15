"use client";

import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { GradientText } from "./GradientText";
import { ProjectImage } from "./ProjectImage";
import { ProjectLinks } from "./ProjectLinks";
import { TechBadges } from "./TechBadges";
import { Heading, Text, Eyebrow } from "./Typography";

interface ProjectCardProps {
  project: Project;
  /** Flagship layout: larger, two-column on desktop with an animated accent. */
  featured?: boolean;
}

/**
 * Project card (SRS §7.5 / FR-PROJ-2..3). Reused for both the flagship and the
 * secondary projects via the `featured` flag — one component, no duplicated
 * layouts. Restrained parallax tilt is disabled on touch and under reduced
 * motion (FR-PROJ-3). A stretched link makes the whole card navigate to the
 * case study while the external link buttons stay independently clickable and
 * keyboard-accessible (A11Y-2).
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const tiltEnabled = canHover && !prefersReduced;
  const href = ROUTES.project(project.slug);

  return (
    <Tilt
      tiltEnable={tiltEnabled}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      scale={tiltEnabled ? 1.01 : 1}
      transitionSpeed={600}
      glareEnable={tiltEnabled}
      glareMaxOpacity={0.12}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="1rem"
      className="h-full"
    >
      <GlassCard
        padding="none"
        className={cn(
          "group/card relative h-full overflow-hidden transition-shadow duration-300 hover:shadow-elevated",
          featured && "border-gradient-brand shadow-glow",
        )}
      >
        {featured ? (
          <div
            aria-hidden
            className="bg-gradient-brand animate-gradient pointer-events-none absolute -inset-24 -z-10 opacity-[0.08] blur-3xl"
          />
        ) : null}

        <div
          className={cn(
            "flex h-full flex-col",
            featured && "lg:grid lg:grid-cols-2 lg:items-stretch",
          )}
        >
          <ProjectImage
            src={project.image}
            alt={`${project.title} cover`}
            label={project.title}
            aspect={featured ? "aspect-video lg:aspect-auto" : "aspect-video"}
            className={cn(featured && "lg:order-last lg:h-full")}
            sizes={
              featured
                ? "(min-width: 1024px) 45vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            }
          />

          <div
            className={cn(
              "flex flex-1 flex-col p-5 sm:p-6",
              featured && "lg:p-8",
            )}
          >
            <div className="text-muted-foreground flex items-center gap-2">
              {featured ? <Eyebrow>Featured</Eyebrow> : null}
              <Eyebrow className={cn(featured && "before:mr-2 before:content-['·']")}>
                {project.year}
              </Eyebrow>
            </div>

            <Heading
              as="h3"
              size={featured ? "h2" : "h4"}
              className="mt-2 text-balance"
            >
              <Link
                href={href}
                aria-label={`View ${project.title} case study`}
                className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:z-0 focus-visible:ring-2"
              >
                {featured ? <GradientText>{project.title}</GradientText> : project.title}
              </Link>
            </Heading>

            <Text
              variant={featured ? "lead" : "muted"}
              className="mt-3 text-pretty"
            >
              {project.tagline}
            </Text>

            <TechBadges
              stack={project.stack}
              max={featured ? undefined : 5}
              className="mt-5"
            />

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-6">
              <ProjectLinks links={project.links} size="lg" />
              <span className="text-muted-foreground group-hover/card:text-foreground ml-auto inline-flex items-center gap-1 font-mono text-xs transition-colors">
                Case study
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Tilt>
  );
}
