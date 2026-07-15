import { cn } from "@/lib/utils";
import { FloatingBlobs } from "./FloatingBlobs";

/**
 * Fixed, full-viewport decorative backdrop (SRS §8.6): a faint dotted grid, a
 * top-anchored brand glow, and the floating gradient blobs. Sits behind all
 * content (`-z-10`), is `aria-hidden`, and ships zero client JS (motion is CSS).
 * The dotted grid is radially masked so it fades toward the edges.
 */
export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="bg-dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklch, var(--brand-purple) 18%, transparent), transparent 70%)",
        }}
      />
      <FloatingBlobs />
    </div>
  );
}
