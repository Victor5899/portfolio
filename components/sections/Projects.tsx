import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/common/ProjectCard";

/**
 * Featured Projects (SRS §7.5). Renders the flagship (`featured: true`) as a
 * large, emphasized card followed by the secondary projects in a responsive
 * grid — all sourced from `content/projects` via reusable selectors (DATA-2/5).
 * The section shell is server-rendered; each `ProjectCard` is the client leaf
 * that owns the tilt/hover motion (PERF-1/RC-2). Entrance uses the shared
 * stagger wrappers (MOT-3).
 */
export function Projects() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.projects);
  const [flagship] = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <Section id={SECTION_IDS.projects}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {flagship ? (
          <StaggerItem className="lg:col-span-2">
            <ProjectCard project={flagship} featured />
          </StaggerItem>
        ) : null}

        {others.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
