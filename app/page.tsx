import type { ComponentType } from "react";
import { navigation } from "@/content/navigation";
import { SECTION_IDS } from "@/constants/navigation";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { Reveal } from "@/components/common/Reveal";
import { Text } from "@/components/common/Typography";
import { Hero, About, TechStack, Skills } from "@/components/sections";

/**
 * Home page (SRS §7). Sections render in navigation order via a registry so the
 * page stays data-driven: built sections resolve to their component, and the
 * rest fall back to the application-shell stub until they are implemented.
 */
const SECTION_COMPONENTS: Partial<Record<string, ComponentType>> = {
  [SECTION_IDS.about]: About,
  [SECTION_IDS.techStack]: TechStack,
  [SECTION_IDS.skills]: Skills,
};

export default function Home() {
  return (
    <>
      <Hero />

      {navigation.map((item, index) => {
        const SectionComponent = SECTION_COMPONENTS[item.id];
        if (SectionComponent) return <SectionComponent key={item.id} />;

        return (
          <Section key={item.id} id={item.id}>
            <Reveal>
              <SectionHeading
                eyebrow={`${String(index + 1).padStart(2, "0")} — Section`}
                title={item.label}
                description="This section is part of the application shell. Its content component will be built next."
              />
              <GlassCard className="mt-8 grid min-h-40 place-items-center">
                <Text variant="muted" className="font-mono">
                  {item.label} — coming soon
                </Text>
              </GlassCard>
            </Reveal>
          </Section>
        );
      })}
    </>
  );
}
