import { ExternalLink, PlayCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { VariantProps } from "class-variance-authority";
import type { ProjectLinks as ProjectLinksData } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectLinksProps {
  links: ProjectLinksData;
  className?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
}

/**
 * Renders the external action links (Live Demo / GitHub / Demo) for a
 * project, showing only the links that exist so empty/optional link fields
 * degrade gracefully (FR-PROJ-6 / DATA-6). External links open in a new tab with
 * `rel="noopener noreferrer"` (FR-CERT-2 pattern). Returns null when there are
 * no links to render.
 */
export function ProjectLinks({ links, className, size = "lg" }: ProjectLinksProps) {
  const { repo, live, demo } = links;
  if (!repo && !live && !demo) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size })}
        >
          <ExternalLink />
          Live Demo
        </a>
      ) : null}
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size })}
        >
          <FaGithub />
          GitHub
        </a>
      ) : null}
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size })}
        >
          <PlayCircle />
          Demo
        </a>
      ) : null}
    </div>
  );
}
