import { Compass, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import { profile } from "@/content/profile";
import { education, primaryEducation } from "@/content/education";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { formatDateRange } from "@/lib/format";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { Badge } from "@/components/ui/badge";

const CGPA_SCALE = 10;

/**
 * About (SRS §7.3). A glassmorphism bento composed entirely from the content
 * layer: `profile` supplies the narrative, role and focus areas; `education`
 * supplies the timeline snapshot and CGPA (DATA-1/2). Server-first — only the
 * reveal wrappers and count-up are client leaves (PERF-1/RC-1).
 */
export function About() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.about);
  const cgpaValue = Number.parseFloat(primaryEducation.cgpa);

  return (
    <Section id={SECTION_IDS.about}>
      <SectionHeading
        eyebrow={eyebrow}
        title={label}
        description={profile.summary}
      />

      <StaggerGroup className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
        <StaggerItem className="lg:col-span-2">
          <GlassCard padding="lg" className="h-full">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="size-4 text-brand-blue" aria-hidden />
              <Eyebrow>{profile.role}</Eyebrow>
            </div>
            <Text variant="body" className="mt-4 max-w-2xl text-pretty">
              {profile.about}
            </Text>
          </GlassCard>
        </StaggerItem>

        <StaggerItem>
          <GlassCard
            padding="lg"
            glow
            className="flex h-full flex-col justify-between gap-6"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <Eyebrow>CGPA</Eyebrow>
              <TrendingUp className="size-4 text-brand-purple" aria-hidden />
            </div>
            <p className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
              <GradientText>
                <CountUp value={cgpaValue} decimals={2} />
              </GradientText>
              <span className="text-muted-foreground text-2xl font-medium">
                {" / "}
                {CGPA_SCALE}
              </span>
            </p>
          </GlassCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <GlassCard padding="lg" className="h-full">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="size-4 text-brand-blue" aria-hidden />
              <Eyebrow>Education</Eyebrow>
            </div>

            <ol className="mt-6 space-y-6">
              {education.map((entry) => (
                <li
                  key={`${entry.degree}-${entry.university}`}
                  className="border-border relative border-l pl-6"
                >
                  <span
                    className="bg-gradient-brand shadow-glow absolute left-[-5.5px] top-1.5 size-3 rounded-full"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <Heading as="h4" size="h4">
                      {entry.degree} — {entry.field}
                    </Heading>
                    <span className="text-muted-foreground font-mono text-xs">
                      {formatDateRange(entry.start, entry.end)}
                    </span>
                  </div>
                  <Text variant="muted" className="mt-1">
                    {entry.university}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </Text>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="glass">{entry.expectedGraduation}</Badge>
                    <Badge variant="outline" className="font-mono">
                      CGPA {entry.cgpa}
                    </Badge>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>
        </StaggerItem>

        <StaggerItem>
          <GlassCard padding="lg" className="h-full">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Compass className="size-4 text-brand-purple" aria-hidden />
              <Eyebrow>Focus Areas</Eyebrow>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.targetRoles.map((role) => (
                <li key={role}>
                  <Badge variant="secondary" className="text-sm">
                    {role}
                  </Badge>
                </li>
              ))}
            </ul>
          </GlassCard>
        </StaggerItem>
      </StaggerGroup>
    </Section>
  );
}
