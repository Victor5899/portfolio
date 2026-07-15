import type { SocialLink } from "@/types";

/**
 * Social + contact links. `href` values for external profiles are the owner's
 * handles — confirm/replace usernames if any differ. Email is required for the
 * contact CTA (FR-CONT-1).
 */
export const socials: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/victorsoren",
    username: "victorsoren",
    icon: "github",
    external: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victor-ipil-soren",
    username: "victor-ipil-soren",
    icon: "linkedin",
    external: true,
  },
  {
    platform: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/victorsoren",
    username: "victorsoren",
    icon: "leetcode",
    external: true,
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:victor.ipil.soren@gmail.com",
    username: "victor.ipil.soren@gmail.com",
    icon: "mail",
    external: false,
  },
];

/** Convenience lookup by platform for direct references in the UI. */
export const socialByPlatform = Object.fromEntries(
  socials.map((link) => [link.platform, link]),
) as Record<SocialLink["platform"], SocialLink | undefined>;
