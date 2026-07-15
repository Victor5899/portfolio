"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin brand-gradient bar pinned to the top of the viewport that fills as the
 * page scrolls (SRS §8.6 signature polish). Uses Framer Motion's scroll progress
 * with a spring for a smooth fill; animates `transform` only. Decorative, so it
 * is `aria-hidden` — scroll position is conveyed natively to assistive tech.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-gradient-brand fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
    />
  );
}
