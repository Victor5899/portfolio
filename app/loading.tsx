import { Loader2 } from "lucide-react";

/**
 * Route-level loading fallback (SRS routing shell). Lightweight, centered brand
 * spinner shown while a segment streams in. Server Component — ships no JS.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
    >
      <Loader2 className="text-brand-blue size-8 animate-spin" />
      <span className="text-muted-foreground font-mono text-sm">Loading…</span>
    </div>
  );
}
