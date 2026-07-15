"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True after first client mount, false during SSR / first render — used to
 * avoid hydration mismatches. Uses `useSyncExternalStore` so no state is set
 * inside an effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
