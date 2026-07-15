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

/** Extract a sortable year from mixed date strings ("2024", "May 2027", "Present"). */
function yearOf(value: string): number {
  const match = value.match(/\d{4}/);
  if (match) return Number(match[0]);
  if (value.trim().toLowerCase() === "present") {
    return new Date().getFullYear() + 1;
  }
  return 0;
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
  start: project.year,
  end: project.year,
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
  (a, b) => yearOf(b.end) - yearOf(a.end) || yearOf(b.start) - yearOf(a.start),
);
