"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import type { NavItem } from "@/types";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
  activeId: string | null;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible mobile navigation drawer (FR-NAV-3 / A11Y-5): focus-trapped,
 * dismissible via ESC or overlay, locks body scroll while open, and restores
 * focus to the trigger on close. Rendered only below `md` by the parent.
 */
export function MobileNav({ items, activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="glass absolute inset-y-0 right-0 flex w-4/5 max-w-xs flex-col gap-6 p-6 shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">
                Menu
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={close}
              >
                <X />
              </Button>
            </div>

            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "hover:bg-muted focus-visible:ring-ring block rounded-lg px-3 py-2.5 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                          isActive
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
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
                className="w-full"
              >
                <FileText />
                Resume
              </Button>
              <SocialLinks className="justify-center" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
