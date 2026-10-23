import { cn } from "@/lib/utils";
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
  className?: string;
}

/**
 * Editorial metric (SRS FR-ACH-1 / FR-GH-2 / FR-LC-2): a hairline rule, a large
 * serif numeral, and a mono label. The count-up is the only client leaf; the
 * shell stays server-rendered (PERF-1). Shared by Achievements and GitHub so the
 * figure treatment lives in one place (DRY-1).
 */
export function StatCard({
  value,
  label,
  suffix,
  prefix,
  decimals,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "border-border-strong flex h-full flex-col gap-3 border-t pt-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-eyebrow">
          {label}
        </p>
        {icon ? (
          <span aria-hidden className="text-brand size-4">
            <Icon name={icon} />
          </span>
        ) : null}
      </div>

      <p className="font-display text-stat text-foreground">
        <CountUp
          value={value}
          decimals={decimals}
          suffix={suffix}
          prefix={prefix}
        />
      </p>

      {description ? (
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
