"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { SECTION_IDS, NAV_CONFIG } from "@/constants/navigation";
import { fadeInUp, riseIn, staggerContainer } from "@/constants/animation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/common/GradientText";
import { SocialLinks } from "@/components/common/SocialLinks";
import { TypingRole } from "./hero/TypingRole";
import { HeroStats } from "./hero/HeroStats";
import { FloatingTech } from "./hero/FloatingTech";

/**
 * Hero (SRS §7.2). Every string is sourced from `content/profile` and
 * `content/socials` — no copy is hardcoded (DATA-1). Entrance motion staggers in
 * on load; the LCP headline uses a translate-only reveal so it is legible
 * instantly (FR-HERO-5), and everything collapses to a static layout under
 * `prefers-reduced-motion` (MOT-4). Client leaf for the typing, count-up, and
 * floating effects.
 */
export function Hero() {
  const prefersReduced = useReducedMotion();
  const nameWords = profile.name.split(" ");
  const lastName = nameWords.pop();

  return (
    <section
      id={SECTION_IDS.hero}
      style={{ scrollMarginTop: NAV_CONFIG.scrollOffset }}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-0 size-[42rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--brand-purple) 30%, transparent), transparent 65%)",
        }}
      />

      <FloatingTech />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial={prefersReduced ? false : "hidden"}
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          {profile.available && profile.availabilityMessage ? (
            <motion.div variants={fadeInUp}>
              <span className="glass text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
                <span className="relative flex size-2">
                  <span className="bg-brand-blue absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                  <span className="bg-brand-blue relative inline-flex size-2 rounded-full" />
                </span>
                {profile.availabilityMessage}
              </span>
            </motion.div>
          ) : null}

          <motion.h1
            variants={riseIn}
            className="font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {nameWords.join(" ")} <GradientText>{lastName}</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground font-mono text-lg font-medium sm:text-2xl"
          >
            <TypingRole />
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl text-base leading-relaxed text-pretty sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              render={
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="gradient"
              className="h-11 w-full rounded-xl px-6 text-[0.95rem] sm:w-auto"
            >
              <FileText />
              Resume
            </Button>
            <Button
              render={<a href={`#${SECTION_IDS.projects}`} />}
              variant="glass"
              className="h-11 w-full rounded-xl px-6 text-[0.95rem] sm:w-auto"
            >
              View Projects
              <ArrowRight />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <SocialLinks className="justify-center" />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-4 w-full">
            <HeroStats className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
