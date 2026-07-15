import type { Variants } from "framer-motion";

/**
 * Motion tokens (SRS §9). All animation timing/easing/distance lives here so
 * components never hardcode ad-hoc values (MOT-2). Durations are in seconds
 * to match Framer Motion's API.
 */
export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.4,
} as const;

/** Cubic-bezier ease-out used for entrances. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DISTANCE = {
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.06,
  loose: 0.08,
} as const;

export const HOVER_SCALE = 1.03;

/** Duration (seconds) for numeric count-up animations (hero stats, skill %). */
export const COUNT_UP_DURATION = 1.4;

/** Reusable transition presets. */
export const TRANSITION = {
  base: { duration: DURATION.base, ease: EASE_OUT },
  slow: { duration: DURATION.slow, ease: EASE_OUT },
  spring: { type: "spring", stiffness: 260, damping: 24 },
} as const;

/** Standard "rise + fade" entrance for a single element. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/**
 * Translate-only rise (no opacity gate) so text stays legible during entrance.
 * Used for LCP-critical hero copy where content must never be motion-gated
 * (SRS FR-HERO-5 / MOT-7).
 */
export const riseIn: Variants = {
  hidden: { y: DISTANCE.md },
  visible: {
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -DISTANCE.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -DISTANCE.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: DISTANCE.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** Hover interaction preset for interactive cards/buttons (MOT-4). */
export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: DURATION.fast, ease: EASE_OUT } },
} as const;

/** Parent container that staggers its children's entrances. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.base, delayChildren: 0.05 },
  },
};

/**
 * Reduced-motion-safe variants: opacity only, no transform (MOT-2/MOT-4).
 * Components select these when `prefers-reduced-motion` is set.
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
};

/** Default viewport config for scroll-triggered reveals (fires once — MOT-3). */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
