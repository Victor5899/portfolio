import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulletListProps {
  items: string[];
  className?: string;
}

/**
 * Reusable check-marked list for every bullet-style case-study section
 * (Objectives, Features, Challenges, …) so their markup is defined once (DRY-1).
 */
export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn("max-w-3xl space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="text-brand-blue mt-1 size-4 shrink-0" aria-hidden />
          <span className="text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
