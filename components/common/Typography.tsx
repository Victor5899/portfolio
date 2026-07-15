import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-heading font-semibold tracking-tight text-balance text-foreground",
  {
    variants: {
      size: {
        display: "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
        h1: "text-3xl sm:text-4xl lg:text-5xl",
        h2: "text-2xl sm:text-3xl",
        h3: "text-xl sm:text-2xl",
        h4: "text-lg sm:text-xl",
      },
    },
    defaultVariants: {
      size: "h2",
    },
  },
);

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
      muted: "text-sm text-muted-foreground sm:text-base",
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

/** Uppercase mono label used as a section eyebrow (SRS TYP-1). */
export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { headingVariants, textVariants };
