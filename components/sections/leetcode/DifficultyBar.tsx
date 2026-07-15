"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/constants/animation";
import { CountUp } from "@/components/common/CountUp";
import { cn } from "@/lib/utils";

interface DifficultyBarProps {
  label: string;
  /** Solved count; omit to render a placeholder when live data is unavailable. */
  count?: number;
  /** Denominator for the bar fill (total solved). */
  total?: number;
}

/**
 * A single animated LeetCode difficulty row (SRS FR-LC-2). The fill animates via
 * `scaleX` (GPU-friendly — MOT-6) once in view (MOT-3) and the count counts up;
 * both render instantly under `prefers-reduced-motion` (MOT-2/4). When `count`
 * is undefined it degrades to a muted placeholder (FR-LC-3 / DATA-6). Exposed as
 * an accessible `progressbar` so the value is not conveyed by the bar alone.
 */
export function DifficultyBar({ label, count, total }: DifficultyBarProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const hasData = typeof count === "number";
  const target =
    hasData && total && total > 0 ? Math.min(count / total, 1) : 0;

  return (
    <li>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-muted-foreground font-mono text-xs">
          {hasData ? <CountUp value={count} /> : "—"}
        </span>
      </div>

      <div
        ref={ref}
        role="progressbar"
        aria-label={`${label} problems solved`}
        aria-valuenow={hasData ? count : undefined}
        aria-valuemin={0}
        aria-valuemax={total}
        className={cn(
          "bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full",
          !hasData && "opacity-60",
        )}
      >
        <motion.div
          className="bg-gradient-brand h-full w-full origin-left rounded-full"
          initial={{ scaleX: prefersReduced ? target : 0 }}
          animate={{ scaleX: inView || prefersReduced ? target : 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: DURATION.slow, ease: EASE_OUT }
          }
        />
      </div>
    </li>
  );
}
