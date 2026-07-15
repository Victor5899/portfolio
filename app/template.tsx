"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DISTANCE, DURATION, EASE_OUT } from "@/constants/animation";

/**
 * Page transition wrapper (SRS §9). A `template` remounts on navigation, so this
 * plays a restrained fade/rise on each route change. Honors
 * `prefers-reduced-motion` by falling back to an opacity-only reveal (MOT-2).
 */
export default function Template({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : DISTANCE.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? DURATION.fast : DURATION.slow,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}
