import type { Metric } from "@/types";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { profile } from "@/content/profile";

/**
 * Derives the headline "by the numbers" metrics (Hero statistics and
 * Achievements counters) from the content layer so every figure stays accurate
 * and single-sourced (DRY-2) — editing a project, skill, or target role updates
 * the counters automatically, never a component.
 */
export function getPortfolioMetrics(): Metric[] {
  const technologyCount = new Set(
    skills.flatMap((group) => group.items.map((item) => item.name)),
  ).size;

  return [
    {
      label: "Projects Shipped",
      value: projects.length,
      icon: "rocket",
      description: "End-to-end data & software case studies.",
    },
    {
      label: "Technologies",
      value: technologyCount,
      suffix: "+",
      icon: "code",
      description: "Languages, frameworks, and data tools in the stack.",
    },
    {
      label: "Focus Domains",
      value: profile.targetRoles.length,
      icon: "target",
      description: profile.targetRoles.join(" · "),
    },
  ];
}
