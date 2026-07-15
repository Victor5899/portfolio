import type { Project } from "@/types";
import { ProjectImage } from "@/components/common/ProjectImage";

/**
 * Screenshot gallery (task: Screenshots Section). Reuses `ProjectImage` so each
 * capture lazy-loads with the same branded fallback used elsewhere; captions are
 * optional and data-driven (DATA-6). Uses semantic `figure`/`figcaption`.
 */
export function ProjectScreenshots({ project }: { project: Project }) {
  const screenshots = project.screenshots ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {screenshots.map((shot) => (
        <figure key={shot.src} className="flex flex-col gap-2">
          <ProjectImage
            src={shot.src}
            alt={shot.alt}
            label={project.title}
            aspect="aspect-video"
            className="border-border/60 rounded-xl border"
            sizes="(min-width: 640px) 45vw, 100vw"
          />
          {shot.caption ? (
            <figcaption className="text-muted-foreground text-sm">
              {shot.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
