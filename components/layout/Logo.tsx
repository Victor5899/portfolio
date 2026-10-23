import Link from "next/link";
import { profile } from "@/content/profile";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

/**
 * Wordmark for the header and footer (FR-NAV-1). Data-driven from
 * `content/profile` — a hairline-framed serif monogram plus the owner's name.
 * Links home.
 */
export function Logo({ className }: { className?: string }) {
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "group focus-visible:ring-ring inline-flex shrink-0 items-center gap-3 rounded-md whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
    >
      <span
        aria-hidden
        className="border-border-strong text-foreground group-hover:border-brand font-display grid size-8 place-items-center rounded-md border text-base italic transition-colors"
      >
        {initials}
      </span>
      <span className="text-foreground text-sm font-medium tracking-tight">
        {profile.name}
      </span>
    </Link>
  );
}
