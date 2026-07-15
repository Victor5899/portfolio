import type { SkillGroup } from "@/types";

/**
 * Grouped skills / tech stack (SRS §4, §7.4, §7.6). This is the single source
 * for both the Tech Stack inventory and the Skills section; the UI can render
 * it with or without proficiency emphasis. `icon` keys are resolved by the UI.
 */
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "python", level: 5 },
      { name: "SQL", icon: "sql", level: 5 },
      { name: "C++", icon: "cpp", level: 3 },
      { name: "JavaScript", icon: "javascript", level: 4 },
      { name: "TypeScript", icon: "typescript", level: 4 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react", level: 4 },
      { name: "Next.js", icon: "nextjs", level: 4 },
      { name: "Tailwind CSS", icon: "tailwindcss", level: 4 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", icon: "python", level: 5 },
      { name: "FastAPI", icon: "fastapi", level: 4 },
      { name: "Node.js", icon: "nodejs", level: 3 },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "postgresql", level: 4 },
      { name: "MySQL", icon: "mysql", level: 4 },
      { name: "Snowflake", icon: "snowflake", level: 3 },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "Scikit-learn", icon: "scikitlearn", level: 4 },
      { name: "XGBoost", icon: "xgboost", level: 4 },
      { name: "Pandas", icon: "pandas", level: 5 },
      { name: "NumPy", icon: "numpy", level: 5 },
    ],
  },
  {
    category: "Visualization",
    items: [
      { name: "Tableau", icon: "tableau", level: 4 },
      { name: "Matplotlib", icon: "matplotlib", level: 4 },
      { name: "Streamlit", icon: "streamlit", level: 4 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "git", level: 4 },
      { name: "GitHub", icon: "github", level: 4 },
      { name: "Docker", icon: "docker", level: 3 },
      { name: "VS Code", icon: "vscode", level: 5 },
      { name: "Jupyter Notebook", icon: "jupyter", level: 5 },
    ],
  },
];
