import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Blob {
  className: string;
  color: string;
  delay: string;
}

/**
 * Soft blurred gradient blobs (SRS FX-1). Purely decorative and GPU-friendly —
 * animation runs on `transform` only via the `.animate-blob` keyframes and is
 * neutralized under `prefers-reduced-motion` by the global rule in globals.css.
 * Kept a Server Component (no JS shipped) since motion is CSS-driven.
 */
const BLOBS: readonly Blob[] = [
  {
    className: "left-[-10%] top-[-10%] size-[45vw] max-w-2xl",
    color: "var(--brand-blue)",
    delay: "0s",
  },
  {
    className: "right-[-12%] top-[20%] size-[40vw] max-w-xl",
    color: "var(--brand-purple)",
    delay: "-7s",
  },
  {
    className: "bottom-[-15%] left-[25%] size-[38vw] max-w-xl",
    color: "var(--brand-blue)",
    delay: "-14s",
  },
] as const;

export function FloatingBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className={cn(
            "animate-blob absolute rounded-full opacity-20 blur-3xl dark:opacity-25",
            blob.className,
          )}
          style={
            {
              backgroundColor: blob.color,
              animationDelay: blob.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
