"use client";

import { TypeAnimation } from "react-type-animation";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const PAUSE_MS = 1800;

/**
 * Cycles the owner's taglines with a typing effect (FR-HERO-1). All phrases come
 * from `profile.taglines`. Under `prefers-reduced-motion` it renders the static
 * role with no autoplay (MOT-4). The animation is `aria-hidden` and paired with
 * an sr-only label so assistive tech reads a single, stable role.
 */
export function TypingRole({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{profile.role}</span>;
  }

  const sequence = profile.taglines.flatMap((tagline) => [tagline, PAUSE_MS]);

  return (
    <span className={cn("inline-flex", className)}>
      <span className="sr-only">{profile.role}</span>
      <TypeAnimation
        aria-hidden
        sequence={sequence}
        wrapper="span"
        speed={45}
        deletionSpeed={65}
        repeat={Infinity}
        cursor
      />
    </span>
  );
}
