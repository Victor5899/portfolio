import type { TimelineItem } from "@/types";
import { education } from "./education";
import { experience } from "./experience";

/**
 * The timeline is composed from `education` and `experience` so those sources
 * stay authoritative (DRY). Add standalone milestones to `extraMilestones`.
 */
const educationItems: TimelineItem[] = education.map((entry) => ({
  kind: "education",
  title: `${entry.degree} — ${entry.field}`,
  organization: entry.university,
  start: entry.start,
  end: entry.expectedGraduation,
  description: `CGPA: ${entry.cgpa}`,
}));

const experienceItems: TimelineItem[] = experience.map((entry) => ({
  kind: "experience",
  title: entry.role,
  organization: entry.company,
  start: entry.start,
  end: entry.end,
  description: entry.summary,
  bullets: entry.highlights,
}));

const extraMilestones: TimelineItem[] = [];

export const timeline: TimelineItem[] = [
  ...experienceItems,
  ...educationItems,
  ...extraMilestones,
];
