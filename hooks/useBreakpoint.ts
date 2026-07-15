"use client";

import { BREAKPOINTS, type Breakpoint } from "@/constants/breakpoints";
import { useMediaQuery } from "./useMediaQuery";

/** True when the viewport is at or above the given breakpoint (min-width). */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
}
