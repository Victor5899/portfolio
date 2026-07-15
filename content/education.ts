import type { Education } from "@/types";

export const education: Education[] = [
  {
    degree: "B.Tech",
    field: "Computer Science Engineering (Big Data Analytics)",
    university: "SRM Institute of Science and Technology",
    start: "2023",
    end: "2027",
    expectedGraduation: "May 2027",
    cgpa: "8.17",
  },
];

/** Primary (most recent) education entry, convenient for the About snapshot. */
export const primaryEducation: Education = education[0];
