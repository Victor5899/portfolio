import {
  Hero,
  About,
  TechStack,
  Projects,
  Skills,
  Achievements,
  Certifications,
  GitHub,
  LeetCode,
  Timeline,
  Contact,
} from "@/components/sections";

/**
 * Home page (SRS §7). Composes the section components in the canonical order:
 * Hero → About → Tech Stack → Projects → Skills → Achievements → Certifications
 * → GitHub → LeetCode → Timeline → Contact. Each section reads its own content,
 * so the page stays fully data-driven (AP-1); sections with no content
 * self-hide (Certifications), and GitHub/LeetCode are async server components
 * that stream in their cached stats.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Skills />
      <Achievements />
      <Certifications />
      <GitHub />
      <LeetCode />
      <Timeline />
      <Contact />
    </>
  );
}
