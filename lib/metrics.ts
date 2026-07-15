import type { Metric } from "@/types";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { primaryEducation } from "@/content/education";
import { profile } from "@/content/profile";

/**
 * Derives the Achievements "by the numbers" metrics from the content layer so
 * every figure stays accurate and single-sourced (DRY-2) — editing a project,
 * skill, or the CGPA updates the counters automatically, never a component.
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
      label: "CGPA",
      value: Number.parseFloat(primaryEducation.cgpa),
      decimals: 2,
      icon: "award",
      description: `${primaryEducation.degree} · ${primaryEducation.university}.`,
    },
    {
      label: "Focus Domains",
      value: profile.targetRoles.length,
      icon: "target",
      description: profile.targetRoles.join(" · "),
    },
  ];
}
