import type { ReactNode } from "react";
import { Reveal } from "@/components/common/Reveal";
import { Heading, Eyebrow } from "@/components/common/Typography";

interface CaseStudySectionProps {
  /** 1-based position, rendered as a zero-padded eyebrow (e.g. "03"). */
  index: number;
  title: string;
  children: ReactNode;
}

/**
 * One case-study block: numbered eyebrow + heading + content, revealed on scroll
 * (MOT-3). This is the single layout primitive every detail section reuses, so
 * there are no duplicated section layouts (DRY-1). Headings are `h2` for a
 * correct document outline under the page's single `h1` (A11Y-1).
 */
export function CaseStudySection({ index, title, children }: CaseStudySectionProps) {
  return (
    <Reveal>
      <section className="scroll-mt-24">
        <div className="flex items-center gap-4">
          <Eyebrow>{String(index).padStart(2, "0")}</Eyebrow>
          <span className="bg-border h-px flex-1" aria-hidden />
        </div>
        <Heading as="h2" size="h3" className="mt-3">
          {title}
        </Heading>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  );
}
