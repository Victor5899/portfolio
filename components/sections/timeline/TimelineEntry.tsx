import type { TimelineItem, TimelineKind } from "@/types";
import { formatDateRange } from "@/lib/format";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, Heading, Text } from "@/components/common/Typography";

/** Human labels per timeline kind (UI concern, not content). */
const KIND_LABEL: Record<TimelineKind, string> = {
  education: "Education",
  experience: "Experience",
  project: "Project",
  milestone: "Milestone",
  certification: "Certification",
};

interface TimelineEntryProps {
  item: TimelineItem;
}

/**
 * A single timeline row (SRS §7.11): date and kind in a left column, content on
 * a vertical rail with an accent node. Reveals on scroll once (MOT-3) and
 * collapses to opacity-only under reduced motion via `Reveal` (MOT-2).
 */
export function TimelineEntry({ item }: TimelineEntryProps) {
  return (
    <li className="border-border grid gap-4 border-t py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
      <div className="flex flex-row flex-wrap items-baseline gap-x-4 gap-y-2 sm:col-span-3 sm:flex-col">
        <span className="text-foreground font-mono text-sm">
          {formatDateRange(item.start, item.end)}
        </span>
        <Eyebrow>{KIND_LABEL[item.kind]}</Eyebrow>
      </div>

      <Reveal className="border-border relative flex flex-col gap-3 sm:col-span-9 sm:border-l sm:pl-8">
        <span
          aria-hidden
          className="border-brand bg-background absolute top-2 -left-1 hidden size-2 rounded-full border sm:block"
        />
        <Heading as="h3" size="h3">
          {item.title}
        </Heading>
        <Text variant="muted">{item.organization}</Text>

        {item.description ? (
          <Text variant="body" className="max-w-2xl text-pretty">
            {item.description}
          </Text>
        ) : null}

        {item.bullets && item.bullets.length > 0 ? (
          <ul className="text-muted-foreground mt-1 flex flex-col gap-1.5 text-sm">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden className="text-brand">
                  —
                </span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
    </li>
  );
}
