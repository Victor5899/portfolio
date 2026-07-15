import type { TimelineItem, TimelineKind } from "@/types";
import { formatDateRange } from "@/lib/format";
import { GlassCard } from "@/components/common/GlassCard";
import { Icon } from "@/components/common/Icon";
import { Reveal } from "@/components/common/Reveal";
import { Heading, Text } from "@/components/common/Typography";
import { Badge } from "@/components/ui/badge";
import { slideInLeft } from "@/constants/animation";

/** Human labels and icon keys per timeline kind (UI concern, not content). */
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
 * A single timeline node + card (SRS §7.11). Rendered as an `<li>` on a shared
 * left rail; the connecting line is the list item's left border so it stays
 * continuous. Reveals on scroll once (MOT-3) and collapses to opacity-only under
 * reduced motion via the shared `Reveal` wrapper (MOT-2).
 */
export function TimelineEntry({ item }: TimelineEntryProps) {
  return (
    <li className="border-border relative border-l pb-8 pl-8 last:pb-0 sm:pl-10">
      <span
        aria-hidden
        className="bg-card/60 text-brand-blue absolute -left-4 top-0 grid size-8 place-items-center rounded-full border border-border/70 backdrop-blur-sm"
      >
        <span className="size-4">
          <Icon name={item.kind} />
        </span>
      </span>

      <Reveal variants={slideInLeft}>
        <GlassCard padding="lg" interactive className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <Badge variant="glass" className="font-mono">
              {KIND_LABEL[item.kind]}
            </Badge>
            <span className="text-muted-foreground font-mono text-xs">
              {formatDateRange(item.start, item.end)}
            </span>
          </div>

          <div>
            <Heading as="h3" size="h4">
              {item.title}
            </Heading>
            <Text variant="muted" className="mt-1">
              {item.organization}
            </Text>
          </div>

          {item.description ? (
            <Text variant="body" className="text-pretty">
              {item.description}
            </Text>
          ) : null}

          {item.bullets && item.bullets.length > 0 ? (
            <ul className="text-muted-foreground mt-1 flex flex-col gap-1.5 text-sm">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span
                    aria-hidden
                    className="bg-gradient-brand mt-2 size-1.5 shrink-0 rounded-full"
                  />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </GlassCard>
      </Reveal>
    </li>
  );
}
