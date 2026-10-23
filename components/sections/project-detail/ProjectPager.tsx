import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { Eyebrow } from "@/components/common/Typography";

/**
 * Detail-page footer navigation: back to the project list and a prominent,
 * data-driven "next project" link that wraps around the list (omitted only
 * when unavailable — DATA-6).
 */
export function ProjectPager({ next }: { next?: Project }) {
  return (
    <nav
      aria-label="Project navigation"
      className="border-border-strong flex flex-col gap-10 border-t pt-10 sm:flex-row sm:items-end sm:justify-between"
    >
      <Link
        href={ROUTES.projects}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 self-start rounded-sm font-mono text-xs uppercase tracking-eyebrow transition-colors focus-visible:ring-2 focus-visible:outline-none sm:self-auto"
      >
        <ArrowLeft aria-hidden className="size-3.5" />
        All projects
      </Link>

      {next ? (
        <Link
          href={ROUTES.project(next.slug)}
          className="group focus-visible:ring-ring flex flex-col gap-3 rounded-sm outline-none focus-visible:ring-2 sm:items-end sm:text-right"
        >
          <Eyebrow>Next project</Eyebrow>
          <span className="font-display text-headline text-foreground inline-flex items-center gap-3 text-balance">
            <span className="link-underline">{next.title}</span>
            <ArrowRight
              aria-hidden
              className="group-hover:text-brand size-6 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
