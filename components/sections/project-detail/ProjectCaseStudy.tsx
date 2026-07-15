import type { ReactNode } from "react";
import type { Project } from "@/types";
import { getNextProject } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { GlassCard } from "@/components/common/GlassCard";
import { Text } from "@/components/common/Typography";
import { TechBadges } from "@/components/common/TechBadges";
import { ProjectHero } from "./ProjectHero";
import { ProjectScreenshots } from "./ProjectScreenshots";
import { ProjectPager } from "./ProjectPager";
import { CaseStudySection } from "./CaseStudySection";
import { BulletList } from "./BulletList";

/** Overview block: summary + key outcomes, with an impact/role sidebar. */
function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Text variant="body" className="text-muted-foreground max-w-2xl">
          {project.description}
        </Text>
        {project.highlights?.length ? (
          <BulletList items={project.highlights} />
        ) : null}
      </div>

      <GlassCard padding="lg" glow className="h-full">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
          Impact
        </p>
        <Text variant="body" className="mt-2">
          {project.impact}
        </Text>
        <hr className="border-border/60 my-4" />
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
          Role
        </p>
        <Text variant="muted" className="mt-2">
          {project.role}
        </Text>
      </GlassCard>
    </div>
  );
}

interface CaseStudyBlock {
  title: string;
  content: ReactNode;
}

/**
 * Assembles a project's full case study (task: Project Detail Pages) as an
 * ordered list of blocks built from `content/projects`, rendering each with the
 * shared `CaseStudySection` primitive so numbering stays contiguous and no
 * layout is duplicated (DRY-1). Sections with no data are simply never pushed
 * (DATA-6). Server Component — client behavior lives in leaf components.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const next = getNextProject(project.slug);

  const blocks: CaseStudyBlock[] = [
    { title: "Overview", content: <ProjectOverview project={project} /> },
    {
      title: "Problem Statement",
      content: (
        <Text variant="body" className="text-muted-foreground max-w-3xl">
          {project.problem}
        </Text>
      ),
    },
  ];

  if (project.objectives?.length) {
    blocks.push({
      title: "Objectives",
      content: <BulletList items={project.objectives} />,
    });
  }

  blocks.push({
    title: "Solution",
    content: (
      <Text variant="body" className="text-muted-foreground max-w-3xl">
        {project.approach}
      </Text>
    ),
  });

  if (project.architecture) {
    blocks.push({
      title: "Architecture",
      content: (
        <Text variant="body" className="text-muted-foreground max-w-3xl">
          {project.architecture}
        </Text>
      ),
    });
  }

  blocks.push({
    title: "Tech Stack",
    content: <TechBadges stack={project.stack} variant="outline" />,
  });

  if (project.features?.length) {
    blocks.push({
      title: "Features",
      content: <BulletList items={project.features} />,
    });
  }

  if (project.implementation?.length) {
    blocks.push({
      title: "Implementation Details",
      content: <BulletList items={project.implementation} />,
    });
  }

  if (project.challenges?.length) {
    blocks.push({
      title: "Challenges",
      content: <BulletList items={project.challenges} />,
    });
  }

  if (project.lessonsLearned?.length) {
    blocks.push({
      title: "Lessons Learned",
      content: <BulletList items={project.lessonsLearned} />,
    });
  }

  if (project.screenshots?.length) {
    blocks.push({
      title: "Screenshots",
      content: <ProjectScreenshots project={project} />,
    });
  }

  if (project.futureImprovements?.length) {
    blocks.push({
      title: "Future Improvements",
      content: <BulletList items={project.futureImprovements} />,
    });
  }

  return (
    <article className="pb-16">
      <ProjectHero project={project} />
      <Container size="md" className="mt-8 space-y-16">
        {blocks.map((block, index) => (
          <CaseStudySection key={block.title} index={index + 1} title={block.title}>
            {block.content}
          </CaseStudySection>
        ))}
        <ProjectPager next={next} />
      </Container>
    </article>
  );
}
