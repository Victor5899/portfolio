"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
 * Accessible navigation drawer (FR-NAV-3 / A11Y-5): focus-trapped, dismissible
 * via ESC or overlay, locks body scroll while open, and restores focus to the
 * trigger on close. Rendered only below `xl` by the parent.
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
    <div className="lg:hidden">
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
            className="bg-background/70 absolute inset-0 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="border-border bg-background shadow-elevated absolute inset-y-0 right-0 flex w-full max-w-sm flex-col gap-8 overflow-y-auto border-l px-6 pt-4 pb-8"
          >
            <div className="flex h-12 items-center justify-between">
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-eyebrow">
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
              <ol className="border-border border-t">
                {items.map((item, index) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="border-border border-b">
                      <a
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "focus-visible:ring-ring flex items-baseline gap-4 rounded-sm py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-xs",
                            isActive ? "text-brand" : "text-muted-foreground",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-3xl">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              {profile.resumeUrl ? (
                <Button
                  render={
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  size="lg"
                  className="w-full"
                >
                  Résumé
                  <ArrowUpRight />
                </Button>
              ) : null}
              <SocialLinks className="justify-center" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
