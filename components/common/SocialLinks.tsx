import type { ComponentType } from "react";
import { Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { SocialLink, SocialPlatform } from "@/types";
import { socials as defaultSocials } from "@/content/socials";
import { cn } from "@/lib/utils";

/** Resolves a content `platform` key to a concrete icon component (UI layer). */
const ICON_BY_PLATFORM: Record<
  SocialPlatform,
  ComponentType<{ className?: string }>
> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  leetcode: SiLeetcode,
  twitter: FaXTwitter,
  email: Mail,
  website: Globe,
};

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
  iconClassName?: string;
}

/**
 * Renders the data-driven social links as accessible icon buttons (FR-FOOT-2 /
 * FR-HERO-3). Each control has an accessible name (A11Y-3) and external links
 * carry `rel="noopener noreferrer"` (FR-CERT-2 pattern).
 */
export function SocialLinks({
  links = defaultSocials,
  className,
  iconClassName,
}: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const Icon = ICON_BY_PLATFORM[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon className={cn("size-[1.05rem]", iconClassName)} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
