/**
 * Canonical breakpoints (px), mirroring Tailwind's defaults so JS-side checks
 * (useBreakpoint) stay in sync with CSS utilities (SRS §10).
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
