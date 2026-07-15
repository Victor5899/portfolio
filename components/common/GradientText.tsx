import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/**
 * Applies the brand blue→purple gradient as text fill (SRS CLR-3 / TYP-3).
 * Reserved for headline emphasis; keep contrast in mind on light surfaces.
 */
export function GradientText({
  as: Tag = "span",
  className,
  ...props
}: GradientTextProps) {
  return <Tag className={cn("text-gradient-brand", className)} {...props} />;
}
