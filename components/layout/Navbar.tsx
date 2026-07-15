"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { navigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { NAV_CONFIG } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

/**
 * Sticky top navigation (FR-NAV-1..6). Gains a glass background once the page
 * scrolls past the threshold (FR-NAV-4), highlights the active section via
 * intersection observation (FR-NAV-2), and collapses to an accessible drawer on
 * mobile (FR-NAV-3). All items are data-driven from `content/navigation`.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(navigation.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_CONFIG.glassThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-elevated"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ height: NAV_CONFIG.headerHeight }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-visible:ring-ring relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden
                      className="bg-gradient-brand absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            render={
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="gradient"
            size="lg"
            className="hidden sm:inline-flex"
          >
            <FileText />
            Resume
          </Button>
          <MobileNav items={navigation} activeId={activeId} />
        </div>
      </nav>
    </header>
  );
}
