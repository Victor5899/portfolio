import { navigation } from "@/content/navigation";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { Reveal } from "@/components/common/Reveal";
import { Text } from "@/components/common/Typography";

/**
 * Home shell (SRS §7). The Hero and real sections are not built yet; each nav
 * target is rendered as a data-driven placeholder so the application shell —
 * sticky nav, scroll-spy, smooth scrolling, and scroll reveals — is fully
 * exercisable end to end. Replace each stub with its section component.
 */
export default function Home() {
  return (
    <>
      {navigation.map((item, index) => (
        <Section key={item.id} id={item.id}>
          <Reveal>
            <SectionHeading
              as={index === 0 ? "h1" : "h2"}
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
