import { GlassCard } from "./GlassCard";
import { GradientText } from "./GradientText";
import { CountUp } from "./CountUp";
import { Icon } from "./Icon";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  /** Semantic icon key resolved by `Icon`. */
  icon?: string;
  glow?: boolean;
}

/**
 * Reusable animated metric card (SRS FR-ACH-1 / FR-GH-2 / FR-LC-2). The count-up
 * is the only client leaf; the card shell stays server-rendered (PERF-1). Shared
 * across Achievements, GitHub, and LeetCode so the counter treatment lives in
 * one place (DRY-1). Uses generic elements so it stays valid inside the motion
 * reveal wrappers; the value and label read as ordinary text to assistive tech.
 */
export function StatCard({
  value,
  label,
  suffix,
  prefix,
  decimals,
  description,
  icon,
  glow = false,
}: StatCardProps) {
  return (
    <GlassCard
      padding="lg"
      glow={glow}
      className="flex h-full flex-col gap-3 text-center"
    >
      {icon ? (
        <span
          aria-hidden
          className="text-brand-blue mx-auto grid size-11 place-items-center rounded-xl border border-border/70 bg-card/40"
        >
          <span className="size-5">
            <Icon name={icon} />
          </span>
        </span>
      ) : null}

      <p className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        <GradientText>
          <CountUp
            value={value}
            decimals={decimals}
            suffix={suffix}
            prefix={prefix}
          />
        </GradientText>
      </p>

      <p className="text-muted-foreground font-mono text-xs uppercase tracking-wide">
        {label}
      </p>

      {description ? (
        <p className="text-muted-foreground/80 text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </GlassCard>
  );
}
