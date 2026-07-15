import type { ComponentType } from "react";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Calendar,
  Code2,
  Database,
  Flag,
  FolderGit2,
  GraduationCap,
  LineChart,
  Medal,
  Rocket,
  ScrollText,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Resolves a content `icon` key (achievements, metrics, timeline kinds) to a
 * semantic lucide glyph. Icons are a UI concern, so the mapping lives here
 * rather than in the content layer. Unknown keys fall back to a neutral sparkle
 * so missing icons never break the UI (DATA-6).
 */
const ICON_BY_KEY: Record<string, ComponentType<{ className?: string }>> = {
  award: Award,
  trophy: Trophy,
  medal: Medal,
  star: Star,
  target: Target,
  rocket: Rocket,
  zap: Zap,
  code: Code2,
  database: Database,
  brain: BrainCircuit,
  chart: LineChart,
  users: Users,
  education: GraduationCap,
  experience: Briefcase,
  certification: ScrollText,
  project: FolderGit2,
  milestone: Flag,
  book: BookOpen,
  calendar: Calendar,
};

interface IconProps {
  name?: string;
  className?: string;
}

/** Renders a semantic icon by content key; decorative by default (A11Y-3). */
export function Icon({ name, className }: IconProps) {
  const Glyph = (name && ICON_BY_KEY[name]) || Sparkles;
  return <Glyph className={cn("size-full", className)} />;
}
