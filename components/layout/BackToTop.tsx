"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Scrolls the page to the top (FR-FOOT-1). Honors `prefers-reduced-motion` by
 * jumping instantly instead of smooth-scrolling. Leaf Client Component.
 */
export function BackToTop() {
  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      aria-label="Back to top"
    >
      <ArrowUp />
      Back to top
    </Button>
  );
}
