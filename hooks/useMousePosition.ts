"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks the pointer position for the mouse-spotlight effect (SRS FX-2).
 * Callers should disable the effect on touch / reduced-motion before using this.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
