import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const surfaceVariants = cva(
  "rounded-xl border text-card-foreground transition-colors duration-300 ease-out-expo",
  {
    variants: {
      tone: {
        default: "border-border bg-surface",
        raised: "border-border-strong bg-surface-raised",
        outline: "border-border bg-transparent",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-6 sm:p-8",
      },
      interactive: {
        true: "hover:border-border-strong hover:bg-surface-raised",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      padding: "md",
      interactive: false,
    },
  },
);

interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}

/**
 * The single panel primitive (SRS §8.5, v1.2): a solid charcoal surface with a
 * hairline border. Hover refines the border/fill rather than lifting or
 * glowing, and stays pure CSS so it remains a Server Component.
 */
export function Surface({
  tone,
  padding,
  interactive,
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      data-slot="surface"
      className={cn(surfaceVariants({ tone, padding, interactive }), className)}
      {...props}
    />
  );
}

export { surfaceVariants };
