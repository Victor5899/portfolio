import Image from "next/image";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Title set on the typographic placeholder shown until real art exists. */
  label: string;
  /** Small mono line above the placeholder title (e.g. domains). */
  kicker?: string;
  className?: string;
  /** Tailwind aspect utility for the frame (defaults to 16:9). */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle zoom when an ancestor `group` is hovered. */
  zoomOnHover?: boolean;
}

/**
 * Framed project image (PERF-2/PERF-5). Owner-supplied art may not exist yet,
 * so the existence check runs on the server and a typographic editorial poster
 * renders in its place — no failed request, broken icon, or layout shift
 * (DATA-6). Server Component; the poster is decorative (`aria-hidden`) while a
 * real image keeps its meaningful `alt` (A11Y-3).
 */
export function ProjectImage({
  src,
  alt,
  label,
  kicker,
  className,
  aspect = "aspect-video",
  sizes = "(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw",
  priority = false,
  zoomOnHover = false,
}: ProjectImageProps) {
  const hasImage = publicAssetExists(src);
  const zoom =
    zoomOnHover &&
    "transition-transform duration-700 ease-out-expo group-hover:scale-103";

  return (
    <div
      className={cn(
        "border-border bg-surface @container relative overflow-hidden rounded-xl border",
        aspect,
        className,
      )}
    >
      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom)}
        />
      ) : (
        <div aria-hidden className={cn("absolute inset-0", zoom)}>
          <div className="bg-grid mask-fade-down absolute inset-0 opacity-70" />
          <span className="bg-brand absolute top-5 right-5 size-1.5 rounded-full @md:top-7 @md:right-7" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 @md:gap-3 @md:p-8">
            {kicker ? (
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-eyebrow">
                {kicker}
              </span>
            ) : null}
            <span className="font-display text-foreground max-w-[20ch] text-2xl leading-none text-balance @md:text-4xl @3xl:text-6xl">
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
