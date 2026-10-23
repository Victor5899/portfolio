import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/common/ProjectCard";

/**
 * Featured Projects (SRS §7.5). The flagship (`featured: true`) leads at full
 * width with a cinematic thumbnail, followed by the secondary projects in a
 * two-column editorial grid — all sourced from `content/projects` via reusable
 * selectors (DATA-2/5). Server-rendered; only the reveal wrappers are client
 * leaves (PERF-1).
 */
export function Projects() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.projects);
  const [flagship] = getFeaturedProjects();
  const others = getOtherProjects();
  const offset = flagship ? 2 : 1;

  return (
    <Section id={SECTION_IDS.projects}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-20 md:grid-cols-2">
        {flagship ? (
          <StaggerItem className="md:col-span-2">
            <ProjectCard project={flagship} index={1} featured />
          </StaggerItem>
        ) : null}

        {others.map((project, i) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} index={i + offset} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
