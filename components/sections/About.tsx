import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { formatDateRange } from "@/lib/format";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/Typography";
import { Badge } from "@/components/ui/badge";

/**
 * About (SRS §7.3). An editorial spread composed from the content layer: the
 * `profile` narrative set as a serif lede, followed by a definition grid with
 * the compact education snapshot and focus areas (DATA-1/2, FR-ABOUT-1/2).
 * Server-first — only the reveal wrappers are client leaves (PERF-1/RC-1).
 */
export function About() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.about);

  return (
    <Section id={SECTION_IDS.about}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-10 lg:col-start-3">
          <Eyebrow>{profile.role}</Eyebrow>
          <p className="font-display text-foreground mt-6 max-w-4xl text-3xl leading-snug text-pretty sm:text-4xl">
            {profile.about}
          </p>
        </Reveal>

        <StaggerGroup className="lg:col-span-10 lg:col-start-3">
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <StaggerItem className="border-border-strong border-t pt-5 sm:col-span-2 lg:col-span-1">
              <dt>
                <Eyebrow>Education</Eyebrow>
              </dt>
              {education.map((entry) => (
                <dd
                  key={`${entry.degree}-${entry.university}`}
                  className="mt-4 flex flex-col gap-1.5"
                >
                  <span className="text-foreground font-medium">
                    {entry.degree} — {entry.field}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {entry.university}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </span>
                  <span className="text-muted-foreground flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                    {formatDateRange(entry.start, entry.end)}
                    <Badge variant="muted" className="font-mono">
                      CGPA {entry.cgpa}
                    </Badge>
                  </span>
                </dd>
              ))}
            </StaggerItem>

            <StaggerItem className="border-border-strong border-t pt-5">
              <dt>
                <Eyebrow>Expected graduation</Eyebrow>
              </dt>
              {education.map((entry) => (
                <dd
                  key={`${entry.degree}-${entry.expectedGraduation}`}
                  className="font-display text-foreground mt-3 text-4xl"
                >
                  {entry.expectedGraduation}
                </dd>
              ))}
            </StaggerItem>

            <StaggerItem className="border-border-strong border-t pt-5">
              <dt>
                <Eyebrow>Focus areas</Eyebrow>
              </dt>
              <dd className="mt-4">
                <ul className="flex flex-col gap-2">
                  {profile.targetRoles.map((role) => (
                    <li key={role} className="text-foreground flex items-center gap-3">
                      <span aria-hidden className="bg-brand size-1 rounded-full" />
                      {role}
                    </li>
                  ))}
                </ul>
              </dd>
            </StaggerItem>
          </dl>
        </StaggerGroup>
      </div>
    </Section>
  );
}
