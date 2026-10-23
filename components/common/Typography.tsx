import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Editorial type scale (SRS TYP-1, v1.2): display/h1/h2 use the serif display
 * face on the fluid `text-display` / `text-title` / `text-headline` tokens;
 * h3/h4 stay in the sans UI face for dense content.
 */
const headingVariants = cva("text-balance text-foreground", {
  variants: {
    size: {
      display: "font-display text-display font-normal",
      h1: "font-display text-title font-normal",
      h2: "font-display text-headline font-normal",
      h3: "font-sans text-xl font-medium tracking-tight sm:text-2xl",
      h4: "font-sans text-lg font-medium tracking-tight",
    },
  },
  defaultVariants: {
    size: "h2",
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

/** Heading primitive. `size` controls the visual scale; `as` the semantic tag. */
export function Heading({
  as: Tag = "h2",
  size,
  className,
  ...props
}: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}

const textVariants = cva("", {
  variants: {
    variant: {
      lead: "text-lg leading-relaxed text-muted-foreground sm:text-xl",
      body: "text-base leading-relaxed text-foreground sm:text-lg",
      muted: "text-sm leading-relaxed text-muted-foreground sm:text-base",
      small: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

/** Body copy primitive with semantic variants. */
export function Text({
  as: Tag = "p",
  variant,
  className,
  ...props
}: TextProps) {
  return <Tag className={cn(textVariants({ variant }), className)} {...props} />;
}

/** Wide-tracked mono label used for eyebrows and metadata (SRS TYP-1). */
export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-eyebrow text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { headingVariants, textVariants };
