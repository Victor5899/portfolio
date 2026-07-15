import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { stats } from "@/content/stats";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { getGitHubStats } from "@/lib/stats";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { StatCard } from "@/components/common/StatCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading, Text } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

/**
 * GitHub (SRS §7.9). Identity + profile CTA are always present (FR-GH-1); live
 * stats are fetched server-side and cached (FR-GH-2, RC-4). When the API/network
 * is unavailable the fetch returns null and the section degrades to the static
 * call-to-visit card with no error surfaced and no layout shift (FR-GH-3). The
 * data contract (`getGitHubStats`) is already in place, so wiring a richer live
 * visualization later is additive — no structural change here.
 */
export async function GitHub() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.github);
  const { username, profileUrl } = stats.github;
  const data = await getGitHubStats();

  const metrics = data
    ? [
        { label: "Repositories", value: data.publicRepos, icon: "code" },
        { label: "Followers", value: data.followers, icon: "users" },
        { label: "Following", value: data.following, icon: "star" },
      ]
    : [];

  return (
    <Section id={SECTION_IDS.github}>
      <SectionHeading
        eyebrow={eyebrow}
        title={label}
        description="Open-source work, experiments, and the code behind the projects."
      />

      <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <GlassCard
            padding="lg"
            glow
            className="flex h-full flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <span
                aria-hidden
                className="grid size-12 place-items-center rounded-xl border border-border/70 bg-card/40"
              >
                <FaGithub className="size-6" />
              </span>
              <div>
                <Heading as="h3" size="h4">
                  @{username}
                </Heading>
                <Text variant="muted" className="mt-1">
                  Building in the open across data, ML, and software.
                </Text>
              </div>
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="w-full sm:w-auto"
              render={
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              <FaGithub />
              View GitHub profile
              <ArrowUpRight />
            </Button>
          </GlassCard>
        </Reveal>

        {metrics.length > 0 ? (
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:col-span-2">
            {metrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <StatCard {...metric} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <Reveal className="lg:col-span-2">
            <GlassCard
              padding="lg"
              className="flex h-full flex-col items-start justify-center gap-3"
            >
              <Heading as="h3" size="h4">
                Explore the repositories
              </Heading>
              <Text variant="muted" className="max-w-md">
                Live GitHub statistics load here when available. In the meantime,
                head to the profile to browse the source, commits, and projects.
              </Text>
              <Button
                variant="glass"
                size="lg"
                className="mt-2"
                render={
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <FaGithub />
                Open on GitHub
                <ArrowUpRight />
              </Button>
            </GlassCard>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
