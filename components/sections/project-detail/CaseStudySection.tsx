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
 * One case-study block in an editorial two-column layout: a ruled, sticky
 * label column (number + title) beside the content, revealed on scroll
 * (MOT-3). The single layout primitive every detail section reuses (DRY-1).
 * Headings are `h2` under the page's single `h1` (A11Y-1).
 */
export function CaseStudySection({ index, title, children }: CaseStudySectionProps) {
  return (
    <Reveal>
      <section className="border-border grid gap-6 border-t pt-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-3 lg:sticky lg:top-24">
            <Eyebrow className="text-brand">{String(index).padStart(2, "0")}</Eyebrow>
            <Heading as="h2" size="h2">
              {title}
            </Heading>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </section>
    </Reveal>
  );
}
