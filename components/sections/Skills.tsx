import { skills } from "@/content/skills";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading } from "@/components/common/Typography";
import { SkillBar } from "./skills/SkillBar";

/**
 * Skills (SRS §7.6). Same `content/skills` source as the Tech Stack, but here
 * proficiency is emphasized via animated bars (FR-SKILL-2). Fully data-driven
 * and grouped by category; the card shell stays server-rendered while each
 * `SkillBar` is the client leaf that owns its animation (PERF-1/RC-2).
 */
export function Skills() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.skills);

  return (
    <Section id={SECTION_IDS.skills}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-2">
        {skills.map((group) => (
          <StaggerItem key={group.category}>
            <GlassCard padding="lg" className="h-full">
              <Heading as="h3" size="h4">
                {group.category}
              </Heading>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <SkillBar key={item.name} {...item} />
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
