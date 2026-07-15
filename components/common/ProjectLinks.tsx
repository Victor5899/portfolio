import { ExternalLink, PlayCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectLinks as ProjectLinksData } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectLinksProps {
  links: ProjectLinksData;
  className?: string;
  size?: React.ComponentProps<typeof Button>["size"];
}

/**
 * Renders the external action buttons (GitHub / Live Demo / Demo) for a project,
 * showing only the links that exist so empty/optional link fields degrade
 * gracefully (FR-PROJ-6 / DATA-6). External links open in a new tab with
 * `rel="noopener noreferrer"` (FR-CERT-2 pattern). Returns null when there are
 * no links to render.
 */
export function ProjectLinks({ links, className, size = "lg" }: ProjectLinksProps) {
  const { repo, live, demo } = links;
  if (!repo && !live && !demo) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {live ? (
        <Button
          size={size}
          variant="gradient"
          render={<a href={live} target="_blank" rel="noopener noreferrer" />}
        >
          <ExternalLink />
          Live Demo
        </Button>
      ) : null}
      {repo ? (
        <Button
          size={size}
          variant="glass"
          render={<a href={repo} target="_blank" rel="noopener noreferrer" />}
        >
          <FaGithub />
          GitHub
        </Button>
      ) : null}
      {demo ? (
        <Button
          size={size}
          variant="glass"
          render={<a href={demo} target="_blank" rel="noopener noreferrer" />}
        >
          <PlayCircle />
          Demo
        </Button>
      ) : null}
    </div>
  );
}
