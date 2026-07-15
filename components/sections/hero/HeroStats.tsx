"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { HeroStat } from "@/types";
import { profile } from "@/content/profile";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";

const COUNT_DURATION = 1.4;

/** Animated count-up that runs once when scrolled into view (FR-HERO stats). */
function CountUp({ value, decimals = 0, suffix }: HeroStat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const controls = animate(0, value, {
      duration: COUNT_DURATION,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, prefersReduced]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Grid of headline metrics from `profile.heroStats`, fully data-driven. */
export function HeroStats({ className }: { className?: string }) {
  return (
    <dl className={className}>
      {profile.heroStats.map((stat) => (
        <GlassCard key={stat.label} padding="sm" className="text-center">
          <dd className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            <GradientText>
              <CountUp {...stat} />
            </GradientText>
          </dd>
          <dt className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-wide">
            {stat.label}
          </dt>
        </GlassCard>
      ))}
    </dl>
  );
}
