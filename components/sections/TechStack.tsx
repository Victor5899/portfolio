import { skills } from "@/content/skills";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { TechIcon } from "@/components/common/TechIcon";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading } from "@/components/common/Typography";

/**
 * Tech Stack (SRS §7.4). Renders the tool inventory grouped by the categories
 * defined in `content/skills` — adding a group or item is a content-only change
 * (DATA-5). Groups derive automatically from the data; each tile reuses the
 * shared `TechIcon`. Hover motion is pure CSS so the section stays a Server
 * Component (PERF-1); entrance uses the shared stagger wrappers (MOT-3).
 */
export function TechStack() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.techStack);

  return (
    <Section id={SECTION_IDS.techStack}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <StaggerItem key={group.category}>
            <GlassCard padding="lg" className="h-full">
              <div className="flex items-baseline justify-between gap-2">
                <Heading as="h3" size="h4">
                  {group.category}
                </Heading>
                <span className="text-muted-foreground font-mono text-xs">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span
                      className="group/tech border-border bg-card/40 hover:bg-gradient-brand hover:text-brand-foreground hover:shadow-glow flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent"
                    >
                      <span className="text-muted-foreground group-hover/tech:text-brand-foreground size-5 shrink-0 transition-colors">
                        <TechIcon name={item.icon ?? item.name} />
                      </span>
                      <span className="truncate">{item.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
