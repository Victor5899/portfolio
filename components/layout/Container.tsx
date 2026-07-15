import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type ContainerSize = NonNullable<
  VariantProps<typeof containerVariants>["size"]
>;

interface ContainerProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: ElementType;
}

/** Centers content, caps width, and applies responsive gutters (SRS LAY-2). */
export function Container({
  as: Tag = "div",
  size,
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { containerVariants };
