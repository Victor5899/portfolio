"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Used for the fallback monogram when the image is missing/not yet added. */
  label: string;
  className?: string;
  /** Tailwind aspect utility for the frame (defaults to 16:9). */
  aspect?: string;
  sizes?: string;
}

/**
 * Lazy-loaded project image (PERF-2/PERF-5) with a branded gradient fallback.
 * Cover art is owner-supplied and may not exist yet, so a decorative gradient +
 * monogram always renders behind `next/image`; if the file is missing the image
 * errors out and the placeholder remains (DATA-6 graceful degradation) — never a
 * broken-image icon or layout shift. Decorative layers are `aria-hidden`; the
 * image keeps meaningful `alt` text (A11Y-3).
 */
export function ProjectImage({
  src,
  alt,
  label,
  className,
  aspect = "aspect-video",
  sizes = "(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw",
}: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const monogram = label.trim().charAt(0).toUpperCase();
  const showImage = loaded && !failed;

  return (
    <div
      className={cn(
        "bg-muted/40 relative overflow-hidden",
        aspect,
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-500",
          showImage ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="bg-gradient-brand animate-gradient absolute inset-0 opacity-20" />
        <span className="text-gradient-brand font-heading relative text-6xl font-bold opacity-80 select-none">
          {monogram}
        </span>
      </div>

      {failed ? null : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-opacity duration-500",
            showImage ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
