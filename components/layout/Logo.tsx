import Link from "next/link";
import { profile } from "@/content/profile";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

/**
 * Wordmark/brandmark for the header and footer (FR-NAV-1). Data-driven from
 * `content/profile` — a gradient monogram plus the owner's name. Links home.
 */
export function Logo({ className }: { className?: string }) {
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "focus-visible:ring-ring group inline-flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-gradient-brand text-brand-foreground grid size-8 place-items-center rounded-lg font-mono text-sm font-semibold shadow-glow"
      >
        {initials}
      </span>
      <span className="text-foreground font-semibold tracking-tight">
        {profile.name}
      </span>
    </Link>
  );
}
