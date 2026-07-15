import type { ComponentType } from "react";
import { Code2 } from "lucide-react";
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPostgresql,
  SiMysql,
  SiSnowflake,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiDocker,
  SiJupyter,
  SiFastapi,
  SiNodedotjs,
  SiStreamlit,
  SiGit,
  SiTailwindcss,
  SiCplusplus,
} from "react-icons/si";
import { cn } from "@/lib/utils";

/**
 * Resolves a content `icon` key (from `content/skills` / `profile.technologies`)
 * to a brand glyph. Icons are a UI concern, so the mapping lives here rather
 * than in the content layer. Unknown keys fall back to a generic code glyph so
 * missing icons never break the UI (DATA-6).
 */
const ICON_BY_KEY: Record<string, ComponentType<{ className?: string }>> = {
  python: SiPython,
  pandas: SiPandas,
  numpy: SiNumpy,
  scikitlearn: SiScikitlearn,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  snowflake: SiSnowflake,
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  docker: SiDocker,
  jupyter: SiJupyter,
  fastapi: SiFastapi,
  nodejs: SiNodedotjs,
  streamlit: SiStreamlit,
  git: SiGit,
  tailwindcss: SiTailwindcss,
  cpp: SiCplusplus,
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = ICON_BY_KEY[name] ?? Code2;
  return <Icon className={cn("size-full", className)} />;
}
