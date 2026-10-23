import type { TimelineItem } from "@/types";
import { education } from "./education";
import { experience } from "./experience";
import { certifications } from "./certifications";
import { projects } from "./projects";
import { profile } from "./profile";

/**
 * The timeline (SRS §7.11) is composed from the authoritative content sources —
 * education, experience, major projects, and certifications — so those stay the
 * single source of truth (DRY-2). A future-facing availability milestone is
 * added only while the owner is open and has no current role (data-driven, not
 * hardcoded), and items are ordered chronologically, most recent first (FR-TL-2).
 */

const MONTH_RANK: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

/**
 * Sort key for mixed date strings ("2024", "May 2027", "June 2026", "Present").
 * A bare year ranks before any month in that year. "Present" sorts last.
 */
function dateRank(value: string): number {
  const normalized = value.trim().toLowerCase();
  if (normalized === "present") return (new Date().getFullYear() + 1) * 12 + 12;
  const yearMatch = normalized.match(/\d{4}/);
  const year = yearMatch ? Number(yearMatch[0]) : 0;
  const monthName = Object.keys(MONTH_RANK).find((name) =>
    new RegExp(`\\b${name}\\b`).test(normalized),
  );
  return year * 12 + (monthName ? MONTH_RANK[monthName] : 0);
}

const educationItems: TimelineItem[] = education.map((entry) => ({
  kind: "education",
  title: `${entry.degree} — ${entry.field}`,
  organization: entry.university,
  start: entry.start,
  end: entry.expectedGraduation,
  description: `CGPA: ${entry.cgpa}`,
  bullets: entry.coursework,
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

const projectItems: TimelineItem[] = projects.map((project) => ({
  kind: "project",
  title: project.title,
  organization: project.domain.join(" · "),
  start: project.period?.start ?? project.year,
  end: project.period?.end ?? project.year,
  description: project.tagline,
}));

const certificationItems: TimelineItem[] = certifications.map((entry) => ({
  kind: "certification",
  title: entry.title,
  organization: entry.issuer,
  start: entry.date,
  end: entry.date,
  description: entry.credentialId
    ? `Credential ID: ${entry.credentialId}`
    : undefined,
}));

/** Forward-looking milestone shown only when open and not currently employed. */
const futureItems: TimelineItem[] =
  profile.available && experience.length === 0
    ? [
        {
          kind: "milestone",
          title: profile.availabilityMessage ?? "Open to opportunities",
          organization: profile.targetRoles.join(" · "),
          start: "Present",
          end: "Present",
          description:
            "Actively seeking internship and full-time roles across data and software.",
        },
      ]
    : [];

export const timeline: TimelineItem[] = [
  ...futureItems,
  ...experienceItems,
  ...projectItems,
  ...educationItems,
  ...certificationItems,
].sort(
  (a, b) => dateRank(b.end) - dateRank(a.end) || dateRank(b.start) - dateRank(a.start),
);
