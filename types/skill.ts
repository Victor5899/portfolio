export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Machine Learning"
  | "Visualization"
  | "Tools";

/** Self-assessed proficiency: 1 = familiar, 5 = expert. */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  /** Icon key resolved by the UI layer. */
  icon?: string;
  level?: SkillLevel;
}

export interface SkillGroup {
  category: SkillCategory;
  description?: string;
  items: Skill[];
}
