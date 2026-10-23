import type { Metric } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";

interface HeroStatsProps {
  stats: Metric[];
  className?: string;
}

/** Grid of headline metrics derived from content by `lib/metrics`. */
export function HeroStats({ stats, className }: HeroStatsProps) {
  return (
    <dl className={className}>
      {stats.map((stat) => (
        <GlassCard key={stat.label} padding="sm" className="text-center">
          <dd className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            <GradientText>
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </GradientText>
          </dd>
          <dt className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-wide">
            {stat.label}
          </dt>
        </GlassCard>
      ))}
    </dl>
  );
}
