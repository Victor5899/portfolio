import type { ComponentType } from "react";
import { Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";

/** Resolves a content `platform` key to a concrete brand glyph (UI layer). */
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

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

/** Brand icon for a social platform, shared by SocialLinks and Contact (DRY-1). */
export function SocialIcon({ platform, className }: SocialIconProps) {
  const Glyph = ICON_BY_PLATFORM[platform];
  return <Glyph className={cn("size-full", className)} />;
}
