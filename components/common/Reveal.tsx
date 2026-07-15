"use client";

import type { ComponentProps } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  fadeInUp,
  reducedMotionVariants,
  staggerContainer,
  VIEWPORT_ONCE,
} from "@/constants/animation";

type MotionDivProps = ComponentProps<typeof motion.div>;

interface RevealProps extends MotionDivProps {
  /** Override the entrance variants (defaults to fadeInUp). */
  variants?: Variants;
}

/**
 * Scroll-reveal wrapper (SRS MOT-3/MOT-5): fires once when in view. Falls back
 * to an opacity-only reveal under `prefers-reduced-motion` (MOT-2/MOT-4).
 */
export function Reveal({ variants = fadeInUp, ...props }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={prefersReduced ? reducedMotionVariants : variants}
      {...props}
    />
  );
}

/**
 * Staggers the entrance of its `StaggerItem` children. Children inherit the
 * hidden/visible states by name (Framer Motion variant propagation).
 */
export function StaggerGroup(props: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer}
      {...props}
    />
  );
}

interface StaggerItemProps extends MotionDivProps {
  variants?: Variants;
}

export function StaggerItem({ variants = fadeInUp, ...props }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={prefersReduced ? reducedMotionVariants : variants}
      {...props}
    />
  );
}
