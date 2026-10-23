"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { NAV_CONFIG } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { getPrimaryNavigation, getVisibleNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

/**
 * Sticky top navigation (FR-NAV-1..6). Transparent at the top of the page, it
 * gains a solid, slightly translucent bar and hairline border past the scroll
 * threshold (FR-NAV-4), marks the active section via intersection observation
 * (FR-NAV-2), and collapses to an accessible drawer below `lg` (FR-NAV-3). The
 * header shows the curated primary set; the drawer and footer keep the full
 * list. Items are data-driven from `content/navigation`.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigation = useMemo(() => getVisibleNavigation(), []);
  const primaryNavigation = useMemo(() => getPrimaryNavigation(), []);
  const activeId = useScrollSpy(navigation.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_CONFIG.scrolledThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "h-header fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container
        as="nav"
        aria-label="Primary"
        className="flex h-full items-center justify-between gap-6"
      >
        <Logo />

        <ul className="hidden items-center lg:flex">
          {primaryNavigation.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-visible:ring-ring inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-sm whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "bg-brand size-1 rounded-full transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {profile.resumeUrl ? (
            <Button
              render={
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Résumé
              <ArrowUpRight />
            </Button>
          ) : null}
          <MobileNav items={navigation} activeId={activeId} />
        </div>
      </Container>
    </header>
  );
}
