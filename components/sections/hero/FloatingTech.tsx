"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { TechIcon } from "@/components/common/TechIcon";
import { cn } from "@/lib/utils";

interface FloatPosition {
  className: string;
  size: string;
  delay: number;
  duration: number;
  amplitude: number;
}

/** Peripheral placements chosen to frame — never overlap — the hero copy. */
const POSITIONS: readonly FloatPosition[] = [
  { className: "left-[4%] top-[16%]", size: "size-14", delay: 0, duration: 5, amplitude: 12 },
  { className: "left-[12%] bottom-[14%]", size: "size-12", delay: 0.8, duration: 6, amplitude: 10 },
  { className: "left-[2%] top-[48%]", size: "size-10", delay: 1.4, duration: 5.5, amplitude: 9 },
  { className: "right-[6%] top-[12%]", size: "size-16", delay: 0.3, duration: 5.5, amplitude: 14 },
  { className: "right-[15%] top-[40%]", size: "size-11", delay: 1.1, duration: 6.5, amplitude: 11 },
  { className: "right-[5%] bottom-[16%]", size: "size-14", delay: 0.5, duration: 5, amplitude: 12 },
  { className: "right-[26%] bottom-[9%]", size: "size-10", delay: 1.7, duration: 6, amplitude: 9 },
  { className: "right-[34%] top-[8%]", size: "size-9", delay: 2, duration: 5.5, amplitude: 8 },
] as const;

/**
 * Floating technology badges that frame the hero (SRS FX signature / §8.6).
 * Purely decorative (`aria-hidden`), shown only on large screens to avoid
 * crowding the copy, and driven by `profile.technologies`. Motion is
 * `transform`-only and disabled under `prefers-reduced-motion` (MOT-6).
 */
export function FloatingTech({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const items = profile.technologies.slice(0, POSITIONS.length);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 hidden lg:block",
        className,
      )}
    >
      {items.map((tech, index) => {
        const pos = POSITIONS[index];
        const chip = (
          <span
            className={cn(
              "glass text-muted-foreground grid place-items-center rounded-2xl p-3 shadow-elevated",
              pos.size,
            )}
          >
            <TechIcon name={tech} className="size-2/3" />
          </span>
        );

        return (
          <div key={tech} className={cn("absolute", pos.className)}>
            {prefersReduced ? (
              chip
            ) : (
              <motion.div
                animate={{ y: [0, -pos.amplitude, 0] }}
                transition={{
                  duration: pos.duration,
                  delay: pos.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {chip}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
