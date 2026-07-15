export type SocialPlatform =
  | "github"
  | "linkedin"
  | "leetcode"
  | "twitter"
  | "email"
  | "website";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  username?: string;
  /** Icon key resolved by the UI layer (e.g. a lucide/react-icons name). */
  icon: string;
  /** Whether the link points off-site and needs rel="noopener noreferrer". */
  external: boolean;
}
