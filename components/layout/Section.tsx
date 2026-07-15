import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { NAV_CONFIG } from "@/constants/navigation";
import { Container, type ContainerSize } from "./Container";
import { Eyebrow, Heading, Text } from "@/components/common/Typography";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-12 sm:py-16",
      md: "py-16 sm:py-24",
      lg: "py-24 sm:py-32",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  id: string;
  /** Wrap children in a Container. Pass a size to control max width; false to opt out. */
  container?: boolean | ContainerSize;
}

/**
 * Semantic section wrapper (SRS §7 shared shell): stable anchor id, consistent
 * vertical rhythm, and scroll offset so sticky-nav anchoring lands correctly.
 */
export function Section({
  id,
  spacing,
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  const content =
    container === false ? (
      children
    ) : (
      <Container size={container === true ? undefined : container}>
        {children}
      </Container>
    );

  return (
    <section
      id={id}
      style={{ scrollMarginTop: NAV_CONFIG.scrollOffset }}
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    >
      {content}
    </section>
  );
}

interface SectionHeadingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Semantic heading level for correct document outline (defaults to h2). */
  as?: "h1" | "h2" | "h3";
}

/** Standard section header: eyebrow + title + optional description (SRS §7). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size="h2">
        {title}
      </Heading>
      {description ? (
        <Text variant="lead" className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          {description}
        </Text>
      ) : null}
    </div>
  );
}

export { sectionVariants };
