import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectImage } from "@/components/common/ProjectImage";

/**
 * Screenshot gallery. Reuses `ProjectImage` so each capture gets the same frame
 * and typographic placeholder used elsewhere; with an odd count the first
 * capture spans the full width. Captions are optional and data-driven (DATA-6),
 * set as semantic `figure`/`figcaption`.
 */
export function ProjectScreenshots({ project }: { project: Project }) {
  const screenshots = project.screenshots ?? [];
  const leadSpans = screenshots.length % 2 === 1;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {screenshots.map((shot, index) => (
        <figure
          key={shot.src}
          className={cn(
            "flex flex-col gap-3",
            leadSpans && index === 0 && "sm:col-span-2",
          )}
        >
          <ProjectImage
            src={shot.src}
            alt={shot.alt}
            label={shot.caption ?? project.title}
            aspect="aspect-video"
            sizes={
              leadSpans && index === 0
                ? "(min-width: 1024px) 760px, 100vw"
                : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            }
          />
          {shot.caption ? (
            <figcaption className="text-muted-foreground font-mono text-xs">
              {shot.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
