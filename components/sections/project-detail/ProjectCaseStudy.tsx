import type { ReactNode } from "react";
import type { Project } from "@/types";
import { getNextProject } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { Eyebrow, Text } from "@/components/common/Typography";
import { TechBadges } from "@/components/common/TechBadges";
import { ProjectHero } from "./ProjectHero";
import { ProjectScreenshots } from "./ProjectScreenshots";
import { ProjectPager } from "./ProjectPager";
import { CaseStudySection } from "./CaseStudySection";
import { BulletList } from "./BulletList";

/** Overview block: summary and key outcomes, closing on an accent-ruled impact callout. */
function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10">
      <Text variant="body" className="max-w-2xl text-pretty">
        {project.description}
      </Text>
      {project.highlights?.length ? (
        <BulletList items={project.highlights} />
      ) : null}
      <aside className="border-brand max-w-2xl border-l-2 pl-6">
        <Eyebrow>Impact</Eyebrow>
        <p className="font-display text-foreground mt-3 text-2xl leading-snug text-pretty sm:text-3xl">
          {project.impact}
        </p>
      </aside>
    </div>
  );
}

/** Long-form paragraph used by the narrative blocks (Solution, Architecture). */
function Narrative({ children }: { children: ReactNode }) {
  return (
    <Text variant="body" className="text-muted-foreground max-w-2xl text-pretty">
      {children}
    </Text>
  );
}

interface CaseStudyBlock {
  title: string;
  content: ReactNode;
}

/**
 * Assembles a project's full case study as an ordered list of blocks built from
 * `content/projects`, rendering each with the shared `CaseStudySection`
 * primitive so numbering stays contiguous and no layout is duplicated (DRY-1).
 * Sections with no data are simply never pushed (DATA-6). Server Component —
 * client behavior lives in leaf components.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const next = getNextProject(project.slug);

  const blocks: CaseStudyBlock[] = [
    { title: "Overview", content: <ProjectOverview project={project} /> },
    {
      title: "Problem Statement",
      content: (
        <p className="font-display text-foreground max-w-2xl text-2xl leading-snug text-pretty sm:text-3xl">
          {project.problem}
        </p>
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
    content: <Narrative>{project.approach}</Narrative>,
  });

  if (project.architecture) {
    blocks.push({
      title: "Architecture",
      content: <Narrative>{project.architecture}</Narrative>,
    });
  }

  blocks.push({
    title: "Tech Stack",
    content: <TechBadges stack={project.stack} />,
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
    <article className="pb-section">
      <ProjectHero project={project} />
      <Container className="mt-20 space-y-16 sm:mt-28 sm:space-y-24">
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
