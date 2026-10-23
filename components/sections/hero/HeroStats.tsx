import type { Metric } from "@/types";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/common/CountUp";

interface HeroStatsProps {
  stats: Metric[];
  className?: string;
}

/** Headline metrics derived from content by `lib/metrics`, set as an editorial figure row. */
export function HeroStats({ stats, className }: HeroStatsProps) {
  return (
    <dl className={cn("grid grid-cols-3 gap-4 sm:gap-6", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border-strong flex flex-col-reverse gap-2 border-t pt-4"
        >
          <dt className="text-muted-foreground font-mono text-xs uppercase leading-snug tracking-eyebrow">
            {stat.label}
          </dt>
          <dd className="font-display text-foreground text-4xl leading-none sm:text-5xl">
            <CountUp
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
