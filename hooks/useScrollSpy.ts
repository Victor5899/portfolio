"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view, for active-nav highlighting
 * (SRS FR-NAV-2). Pass the ordered section ids to observe.
 */
export function useScrollSpy(
  sectionIds: string[],
  rootMargin = "-40% 0px -55% 0px",
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = sectionIds.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin },
    );

    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, rootMargin]);

  return activeId;
}
