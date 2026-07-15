import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/common/Typography";

/**
 * Detail-page footer navigation (task: Next Project navigation + Back to
 * Projects). The "next" project wraps around the list and is data-driven; it is
 * omitted only when unavailable (DATA-6).
 */
export function ProjectPager({ next }: { next?: Project }) {
  return (
    <nav
      aria-label="Project navigation"
      className="border-border/60 mt-16 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <Button variant="glass" size="lg" render={<Link href={ROUTES.projects} />}>
        <ArrowLeft />
        Back to Projects
      </Button>

      {next ? (
        <Link
          href={ROUTES.project(next.slug)}
          className="group/next focus-visible:ring-ring flex flex-col gap-1 rounded-lg text-left outline-none focus-visible:ring-2 sm:items-end sm:text-right"
        >
          <Eyebrow>Next project</Eyebrow>
          <span className="font-heading inline-flex items-center gap-2 text-lg font-semibold">
            <span className="group-hover/next:text-gradient-brand transition-colors">
              {next.title}
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
