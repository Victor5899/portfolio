import type { SocialLink } from "@/types";
import { toMailtoHref } from "@/lib/format";
import { profile } from "./profile";

/**
 * Social + contact links (owner-confirmed). The email entry derives from
 * `profile.email` so the address is single-sourced (FR-CONT-1).
 */
export const socials: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/Victor5899",
    username: "Victor5899",
    icon: "github",
    external: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victor-ipil-soren-a258852b9/",
    username: "victor-ipil-soren-a258852b9",
    icon: "linkedin",
    external: true,
  },
  {
    platform: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/Victor5899/",
    username: "Victor5899",
    icon: "leetcode",
    external: true,
  },
  {
    platform: "email",
    label: "Email",
    href: toMailtoHref(profile.email),
    username: profile.email,
    icon: "mail",
    external: false,
  },
];

/** Convenience lookup by platform for direct references in the UI. */
export const socialByPlatform = Object.fromEntries(
  socials.map((link) => [link.platform, link]),
) as Record<SocialLink["platform"], SocialLink | undefined>;
