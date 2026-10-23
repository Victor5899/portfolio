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
      lg: "py-section",
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
 * Semantic section wrapper (SRS §7 shared shell): stable anchor id, the
 * tokenized vertical rhythm (`py-section`), and scroll offset so sticky-nav
 * anchoring lands correctly.
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
  /** Semantic heading level for correct document outline (defaults to h2). */
  as?: "h1" | "h2" | "h3";
}

/**
 * Editorial section header (SRS §7): a hairline rule carrying the section
 * number, a large serif title, and an optional standfirst that sits beside the
 * title on wide screens.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "border-border grid gap-6 border-t pt-6 lg:grid-cols-12 lg:gap-8",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <Eyebrow className="text-brand lg:col-span-2 lg:pt-3">{eyebrow}</Eyebrow>
      ) : null}
      <div
        className={cn(
          "grid gap-5 lg:grid-cols-10 lg:items-end lg:gap-8",
          eyebrow ? "lg:col-span-10" : "lg:col-span-12",
        )}
      >
        <Heading as={as} size="h1" className="lg:col-span-6">
          {title}
        </Heading>
        {description ? (
          <Text variant="lead" className="max-w-xl text-pretty lg:col-span-4">
            {description}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

export { sectionVariants };
