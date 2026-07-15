import { profile } from "@/content/profile";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";

/** Grid of headline metrics from `profile.heroStats`, fully data-driven. */
export function HeroStats({ className }: { className?: string }) {
  return (
    <dl className={className}>
      {profile.heroStats.map((stat) => (
        <GlassCard key={stat.label} padding="sm" className="text-center">
          <dd className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            <GradientText>
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
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
