"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 600;

/**
 * Floating back-to-top control (FR-FOOT-1 polish). Appears after the page scrolls
 * past a threshold and returns to the top, jumping instantly under
 * `prefers-reduced-motion` (MOT-2). Removed from the tab order and hidden from
 * assistive tech while off-screen so it is only reachable when actionable
 * (A11Y-2). Fixed leaf Client Component; animates transform/opacity only (MOT-6).
 */
export function BackToTopFloating() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "glass focus-visible:ring-ring fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full text-foreground shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-2 focus-visible:outline-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
