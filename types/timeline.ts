export type TimelineKind =
  | "education"
  | "experience"
  | "project"
  | "milestone"
  | "certification";

export interface TimelineItem {
  kind: TimelineKind;
  title: string;
  organization: string;
  start: string;
  end: string | "Present";
  description?: string;
  bullets?: string[];
}
