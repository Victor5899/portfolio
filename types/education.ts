export interface Education {
  degree: string;
  field: string;
  university: string;
  location?: string;
  start: string;
  end: string;
  /** Human-readable expected graduation, e.g. "May 2027". */
  expectedGraduation: string;
  cgpa: string;
  coursework?: string[];
}
