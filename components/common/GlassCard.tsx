import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "glass rounded-2xl text-card-foreground transition-all duration-300",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:shadow-elevated",
        false: "",
      },
      glow: {
        true: "shadow-glow",
        false: "",
      },
    },
    defaultVariants: {
      padding: "md",
      interactive: false,
      glow: false,
    },
  },
);

interface GlassCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

/**
 * Frosted-glass surface (SRS §8.5 / GLASS-1). Pure CSS hover lift so it stays a
 * Server Component. Contrast + non-blur fallback handled by the `.glass` utility.
 */
export function GlassCard({
  padding,
  interactive,
  glow,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        glassCardVariants({ padding, interactive, glow }),
        className,
      )}
      {...props}
    />
  );
}

export { glassCardVariants };
