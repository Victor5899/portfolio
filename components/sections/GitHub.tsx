import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { stats } from "@/content/stats";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { getGitHubStats } from "@/lib/stats";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Surface } from "@/components/common/Surface";
import { StatCard } from "@/components/common/StatCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Eyebrow, Heading, Text } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

/**
 * GitHub (SRS §7.9). Identity + profile CTA are always present (FR-GH-1); live
 * stats are fetched server-side and cached (FR-GH-2, RC-4). When the API/network
 * is unavailable the fetch returns null and the figures column degrades to a
 * short note with no error surfaced and no layout shift (FR-GH-3).
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

      <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Surface padding="lg" className="flex h-full flex-col justify-between gap-10">
            <div>
              <div className="text-muted-foreground flex items-center gap-3">
                <FaGithub aria-hidden className="size-5" />
                <Eyebrow>Profile</Eyebrow>
              </div>
              <Heading as="h3" size="h2" className="mt-6 break-all">
                @{username}
              </Heading>
              <Text variant="muted" className="mt-3">
                Building in the open across data, ML, and software.
              </Text>
            </div>

            <Button
              size="lg"
              className="self-start"
              render={
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              View GitHub profile
              <ArrowUpRight />
            </Button>
          </Surface>
        </Reveal>

        <div className="lg:col-span-7">
          {metrics.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
              {metrics.map((metric) => (
                <StaggerItem key={metric.label}>
                  <StatCard {...metric} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <Reveal className="border-border-strong border-t pt-6">
              <Heading as="h3" size="h4">
                Explore the repositories
              </Heading>
              <Text variant="muted" className="mt-2 max-w-md">
                Live GitHub statistics load here when available. In the meantime,
                head to the profile to browse the source, commits, and projects.
              </Text>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
