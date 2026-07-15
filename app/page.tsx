import { navigation } from "@/content/navigation";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { Reveal } from "@/components/common/Reveal";
import { Text } from "@/components/common/Typography";
import { Hero } from "@/components/sections";

/**
 * Home page (SRS §7). The Hero is built; the remaining sections are rendered as
 * data-driven placeholders so the shell — sticky nav, scroll-spy, smooth
 * scrolling, and reveals — stays exercisable end to end. Replace each stub with
 * its section component as they are built.
 */
export default function Home() {
  return (
    <>
      <Hero />

      {navigation.map((item, index) => (
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
      ))}
    </>
  );
}
