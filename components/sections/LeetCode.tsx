import { SiLeetcode } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { stats } from "@/content/stats";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { getLeetCodeStats } from "@/lib/stats";
import { formatCompactNumber } from "@/lib/format";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";
import { Reveal } from "@/components/common/Reveal";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";
import { DifficultyBar } from "./leetcode/DifficultyBar";

/**
 * LeetCode (SRS §7.10). Identity + profile CTA are always present (FR-LC-1);
 * solved counts and difficulty breakdown are fetched server-side and cached
 * (FR-LC-2, RC-4). When unavailable the fetch returns null and the card renders
 * muted placeholders with no error surfaced and no layout shift (FR-LC-3). The
 * data contract (`getLeetCodeStats`) is already wired, so richer live stats can
 * be layered in later without structural change.
 */
export async function LeetCode() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.leetcode);
  const { username, profileUrl } = stats.leetcode;
  const data = await getLeetCodeStats();

  return (
    <Section id={SECTION_IDS.leetcode}>
      <SectionHeading
        eyebrow={eyebrow}
        title={label}
        description="Sharpening problem-solving with data structures and algorithms."
      />

      <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <GlassCard
            padding="lg"
            glow
            className="flex h-full flex-col justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-12 place-items-center rounded-xl border border-border/70 bg-card/40"
              >
                <SiLeetcode className="text-brand-blue size-6" />
              </span>
              <div>
                <Heading as="h3" size="h4">
                  @{username}
                </Heading>
                {data?.ranking ? (
                  <Text variant="muted" className="mt-0.5 font-mono text-xs">
                    Global rank #{formatCompactNumber(data.ranking)}
                  </Text>
                ) : null}
              </div>
            </div>

            <div>
              <Eyebrow>Problems Solved</Eyebrow>
              <p className="font-heading mt-2 text-6xl font-semibold tracking-tight">
                <GradientText>
                  {data ? <CountUp value={data.totalSolved} /> : "—"}
                </GradientText>
              </p>
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="w-full sm:w-auto"
              render={
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              <SiLeetcode />
              View LeetCode profile
              <ArrowUpRight />
            </Button>
          </GlassCard>
        </Reveal>

        <Reveal className="lg:col-span-3">
          <GlassCard padding="lg" className="flex h-full flex-col gap-6">
            <div className="flex items-baseline justify-between gap-2">
              <Heading as="h3" size="h4">
                By difficulty
              </Heading>
              {!data ? (
                <span className="text-muted-foreground font-mono text-xs">
                  Live stats load when available
                </span>
              ) : null}
            </div>

            <ul className="flex flex-col gap-5">
              <DifficultyBar
                label="Easy"
                count={data?.easySolved}
                total={data?.totalSolved}
              />
              <DifficultyBar
                label="Medium"
                count={data?.mediumSolved}
                total={data?.totalSolved}
              />
              <DifficultyBar
                label="Hard"
                count={data?.hardSolved}
                total={data?.totalSolved}
              />
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
