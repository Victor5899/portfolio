import { achievements } from "@/content/achievements";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { getPortfolioMetrics } from "@/lib/metrics";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { StatCard } from "@/components/common/StatCard";
import { Icon } from "@/components/common/Icon";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading, Text } from "@/components/common/Typography";

/**
 * Achievements (SRS §7.7). Leads with animated "by the numbers" counters derived
 * from the content layer (`lib/metrics`, so figures stay accurate — DRY-2) and
 * renders any named achievements from `content/achievements` below (FR-ACH-1/2).
 * Server-rendered shell; the count-ups are the only client leaves (PERF-1). The
 * counters animate on scroll and honor reduced motion via the shared wrappers.
 */
export function Achievements() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.achievements);
  const metrics = getPortfolioMetrics();

  return (
    <Section id={SECTION_IDS.achievements}>
      <SectionHeading
        eyebrow={eyebrow}
        title={label}
        description="Measurable progress across academics, projects, and the tools I build with."
      />

      <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StaggerItem key={metric.label}>
            <StatCard {...metric} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {achievements.length > 0 ? (
        <StaggerGroup className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const content = (
              <GlassCard
                padding="lg"
                interactive={Boolean(achievement.href)}
                className="flex h-full flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden
                    className="text-brand-purple grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/40"
                  >
                    <span className="size-5">
                      <Icon name={achievement.icon ?? "trophy"} />
                    </span>
                  </span>
                  {achievement.date ? (
                    <span className="text-muted-foreground font-mono text-xs">
                      {achievement.date}
                    </span>
                  ) : null}
                </div>
                <Heading as="h3" size="h4">
                  {achievement.title}
                </Heading>
                <Text variant="muted">{achievement.description}</Text>
              </GlassCard>
            );

            return (
              <StaggerItem key={achievement.title}>
                {achievement.href ? (
                  <a
                    href={achievement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:ring-ring block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      ) : null}
    </Section>
  );
}
