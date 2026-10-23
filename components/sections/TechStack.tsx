import { skills } from "@/content/skills";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { TechIcon } from "@/components/common/TechIcon";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Eyebrow, Heading } from "@/components/common/Typography";

/**
 * Tech Stack (SRS §7.4). An index-style table: one ruled row per category from
 * `content/skills`, with the tools as hairline chips — adding a group or item
 * is a content-only change (DATA-5). Hover is pure CSS so the section stays a
 * Server Component (PERF-1); entrance uses the shared stagger wrappers (MOT-3).
 */
export function TechStack() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.techStack);

  return (
    <Section id={SECTION_IDS.techStack}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="border-border mt-14 border-b sm:mt-20">
        {skills.map((group, index) => (
          <StaggerItem
            key={group.category}
            className="border-border grid gap-5 border-t py-6 sm:py-8 lg:grid-cols-12 lg:gap-8"
          >
            <div className="flex items-baseline gap-4 lg:col-span-3">
              <Eyebrow>{String(index + 1).padStart(2, "0")}</Eyebrow>
              <Heading as="h3" size="h4">
                {group.category}
              </Heading>
            </div>

            <ul className="flex flex-wrap gap-2 lg:col-span-9">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className="border-border text-foreground hover:border-border-strong hover:bg-surface group/tech inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors duration-200">
                    <span
                      aria-hidden
                      className="text-muted-foreground group-hover/tech:text-brand size-4 shrink-0 transition-colors"
                    >
                      <TechIcon name={item.icon ?? item.name} />
                    </span>
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
