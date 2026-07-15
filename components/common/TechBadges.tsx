import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "./TechIcon";
import { getTechIconKey } from "@/lib/tech";
import { cn } from "@/lib/utils";

interface TechBadgesProps {
  stack: string[];
  className?: string;
  variant?: ComponentProps<typeof Badge>["variant"];
  /** Optionally cap the number shown, appending a "+N" badge. */
  max?: number;
}

/**
 * Data-driven technology badges reused across project cards and detail pages
 * (DRY-1). Each badge shows the tech's brand glyph when one is known (resolved
 * from `content/skills` via `getTechIconKey`) and its label otherwise.
 */
export function TechBadges({
  stack,
  className,
  variant = "glass",
  max,
}: TechBadgesProps) {
  const shown = max ? stack.slice(0, max) : stack;
  const remaining = max ? stack.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {shown.map((tech) => {
        const iconKey = getTechIconKey(tech);
        return (
          <li key={tech}>
            <Badge variant={variant} className="gap-1.5 py-1">
              {iconKey ? (
                <span className="size-3.5" aria-hidden>
                  <TechIcon name={iconKey} />
                </span>
              ) : null}
              {tech}
            </Badge>
          </li>
        );
      })}
      {remaining > 0 ? (
        <li>
          <Badge variant="muted" className="py-1">
            +{remaining}
          </Badge>
        </li>
      ) : null}
    </ul>
  );
}
