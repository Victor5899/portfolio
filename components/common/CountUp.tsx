"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { COUNT_UP_DURATION } from "@/constants/animation";
import { cn } from "@/lib/utils";

interface CountUpProps {
  /** Final value to count up to. */
  value: number;
  /** Fixed decimal places (e.g. 2 for a CGPA like 8.17). */
  decimals?: number;
  /** Appended after the value, e.g. "%" or "+". */
  suffix?: string;
  /** Prepended before the value. */
  prefix?: string;
  /** Count-up duration in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Reusable numeric count-up that runs once when scrolled into view (SRS MOT-3).
 * Shared by the hero stats and skills percentages so the animation lives in one
 * place (DRY-1). Under `prefers-reduced-motion` it renders the final value
 * immediately with no animation (MOT-2/MOT-4).
 */
export function CountUp({
  value,
  decimals = 0,
  suffix,
  prefix,
  duration = COUNT_UP_DURATION,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, prefersReduced, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
