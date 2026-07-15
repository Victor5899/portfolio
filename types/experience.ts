export type EmploymentType =
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Freelance"
  | "Open Source";

export interface Experience {
  role: string;
  company: string;
  employmentType: EmploymentType;
  location?: string;
  start: string;
  end: string | "Present";
  summary?: string;
  highlights: string[];
  stack?: string[];
}
