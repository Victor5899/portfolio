import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AccentTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/**
 * Italic serif emphasis in the brand accent (SRS CLR-3 / TYP-3). Reserved for a
 * word or two of headline emphasis so the single accent stays restrained.
 */
export function AccentText({
  as: Tag = "span",
  className,
  ...props
}: AccentTextProps) {
  return (
    <Tag
      className={cn("font-display text-brand italic", className)}
      {...props}
    />
  );
}
