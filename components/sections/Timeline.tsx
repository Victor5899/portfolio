import { timeline } from "@/content/timeline";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { TimelineEntry } from "./timeline/TimelineEntry";

/**
 * Timeline (SRS §7.11). An elegant single-rail vertical timeline composed from
 * the content layer (education, experience, projects, certifications, and a
 * forward-looking milestone) via `content/timeline` — fully data-driven and
 * ordered chronologically (FR-TL-1/2/3). Self-hides if there is nothing to show.
 */
export function Timeline() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.timeline);
  if (timeline.length === 0) return null;

  return (
    <Section id={SECTION_IDS.timeline} container="md">
      <SectionHeading
        eyebrow={eyebrow}
        title={label}
        description="Education, projects, and milestones on the way to data & software roles."
      />

      <ol className="mt-12">
        {timeline.map((item, index) => (
          <TimelineEntry key={`${item.kind}-${item.title}-${index}`} item={item} />
        ))}
      </ol>
    </Section>
  );
}
