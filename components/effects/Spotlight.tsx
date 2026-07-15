"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Radial glow that tracks the cursor (SRS FX-2). Fixed behind content and
 * `aria-hidden`. Writes position straight to the element's CSS variables inside
 * a `requestAnimationFrame` (no React state) so it never regresses INP. Disabled
 * on touch/coarse pointers and under `prefers-reduced-motion` — where the effect
 * would be pointless or unwelcome, it simply renders nothing.
 */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--spotlight-x", `${event.clientX}px`);
        el.style.setProperty("--spotlight-y", `${event.clientY}px`);
        el.style.setProperty("--spotlight-opacity", "1");
      });
    };
    const handleLeave = () => {
      el.style.setProperty("--spotlight-opacity", "0");
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500",
        className,
      )}
      style={{
        opacity: "var(--spotlight-opacity, 0)",
        background:
          "radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklch, var(--brand-blue) 14%, transparent), transparent 70%)",
      }}
    />
  );
}
