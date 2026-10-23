import { skills } from "@/content/skills";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading } from "@/components/common/Typography";
import { SkillBar } from "./skills/SkillBar";

/**
 * Skills (SRS §7.6). Same `content/skills` source as the Tech Stack, but here
 * proficiency is emphasized via thin animated bars (FR-SKILL-2), set in ruled
 * editorial columns. The shell stays server-rendered while each `SkillBar` is
 * the client leaf that owns its animation (PERF-1/RC-2).
 */
export function Skills() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.skills);

  return (
    <Section id={SECTION_IDS.skills}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-14 grid gap-x-10 gap-y-14 sm:mt-20 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group) => (
          <StaggerItem
            key={group.category}
            className="border-border-strong border-t pt-5"
          >
            <Heading as="h3" size="h4">
              {group.category}
            </Heading>
            <ul className="mt-6 space-y-5">
              {group.items.map((item) => (
                <SkillBar key={item.name} {...item} />
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
