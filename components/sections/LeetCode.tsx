import { SiLeetcode } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { stats } from "@/content/stats";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { getLeetCodeStats } from "@/lib/stats";
import { formatCompactNumber } from "@/lib/format";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Surface } from "@/components/common/Surface";
import { CountUp } from "@/components/common/CountUp";
import { Reveal } from "@/components/common/Reveal";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { buttonVariants } from "@/components/ui/button";
import { DifficultyBar } from "./leetcode/DifficultyBar";

/**
 * LeetCode (SRS §7.10). Identity + profile CTA are always present (FR-LC-1);
 * solved counts and difficulty breakdown are fetched server-side and cached
 * (FR-LC-2, RC-4). When unavailable the fetch returns null and the panel renders
 * muted placeholders with no error surfaced and no layout shift (FR-LC-3).
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

      <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Surface padding="lg" className="flex h-full flex-col justify-between gap-10">
            <div>
              <div className="text-muted-foreground flex items-center gap-3">
                <SiLeetcode aria-hidden className="size-5" />
                <Eyebrow>Profile</Eyebrow>
              </div>
              <Heading as="h3" size="h2" className="mt-6 break-all">
                @{username}
              </Heading>
              {data?.ranking ? (
                <Text variant="small" className="mt-2 font-mono">
                  Global rank #{formatCompactNumber(data.ranking)}
                </Text>
              ) : null}
            </div>

            <div>
              <Eyebrow>Problems solved</Eyebrow>
              <p className="font-display text-foreground mt-2 text-7xl leading-none">
                {data ? <CountUp value={data.totalSolved} /> : "—"}
              </p>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", className: "self-start" })}
            >
              View LeetCode profile
              <ArrowUpRight />
            </a>
          </Surface>
        </Reveal>

        <Reveal className="border-border-strong flex flex-col gap-8 border-t pt-6 lg:col-span-7">
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

          <ul className="flex flex-col gap-7">
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
        </Reveal>
      </div>
    </Section>
  );
}
