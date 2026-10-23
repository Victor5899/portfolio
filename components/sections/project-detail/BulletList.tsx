import { cn } from "@/lib/utils";

interface BulletListProps {
  items: string[];
  className?: string;
}

/**
 * Ruled editorial list for every bullet-style case-study section (Objectives,
 * Features, Challenges, …) so their markup is defined once (DRY-1).
 */
export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn("border-border divide-border max-w-3xl divide-y border-y", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 py-4">
          <span aria-hidden className="text-brand font-mono text-sm leading-relaxed">
            —
          </span>
          <span className="text-foreground leading-relaxed text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
