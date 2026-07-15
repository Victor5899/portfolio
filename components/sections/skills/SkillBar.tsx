"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Skill } from "@/types";
import { DURATION, EASE_OUT } from "@/constants/animation";
import { TechIcon } from "@/components/common/TechIcon";
import { CountUp } from "@/components/common/CountUp";

/** Highest proficiency level; a level maps to `level / MAX_LEVEL` of the bar. */
const MAX_LEVEL = 5;

/**
 * A single animated proficiency row (SRS §7.6 / FR-SKILL-1). The fill animates
 * via `scaleX` (GPU-friendly, never layout — MOT-6) once in view (MOT-3), the
 * percentage counts up, and the whole thing renders instantly filled under
 * `prefers-reduced-motion` (MOT-2/4). Exposed as an accessible `progressbar`
 * so proficiency is not conveyed by the visual bar alone (A11Y-4).
 */
export function SkillBar({ name, icon, level }: Skill) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (level == null) {
    return (
      <li className="flex items-center gap-2 text-sm font-medium">
        {icon ? (
          <span className="text-muted-foreground size-4 shrink-0">
            <TechIcon name={icon} />
          </span>
        ) : null}
        {name}
      </li>
    );
  }

  const target = level / MAX_LEVEL;
  const pct = Math.round(target * 100);

  return (
    <li className="group/skill">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon ? (
            <span className="text-muted-foreground group-hover/skill:text-foreground size-4 shrink-0 transition-colors">
              <TechIcon name={icon} />
            </span>
          ) : null}
          {name}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          <CountUp value={pct} suffix="%" />
        </span>
      </div>

      <div
        ref={ref}
        role="progressbar"
        aria-label={name}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full"
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
