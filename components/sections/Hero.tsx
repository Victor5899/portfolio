"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metric } from "@/types";
import { profile } from "@/content/profile";
import { SECTION_IDS, NAV_CONFIG } from "@/constants/navigation";
import { fadeInUp, riseIn, staggerContainer } from "@/constants/animation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AccentText } from "@/components/common/AccentText";
import { SocialLinks } from "@/components/common/SocialLinks";
import { TypingRole } from "./hero/TypingRole";
import { HeroStats } from "./hero/HeroStats";

/**
 * Hero (SRS §7.2). An editorial cover: oversized serif name, a mono role line,
 * the value proposition beside the headline figures, and the primary CTAs.
 * Every string is sourced from `content/profile` and `content/socials` (DATA-1);
 * `stats` is derived server-side by `lib/metrics`. Entrance motion staggers in
 * on load with a translate-only headline reveal so the LCP text is legible
 * instantly (FR-HERO-5), collapsing to a static layout under reduced motion
 * (MOT-4). The only background is a static, faded hairline grid.
 */
export function Hero({ stats }: { stats: Metric[] }) {
  const prefersReduced = useReducedMotion();
  const nameWords = profile.name.split(" ");
  const lastName = nameWords.pop();

  return (
    <section
      id={SECTION_IDS.hero}
      style={{ scrollMarginTop: NAV_CONFIG.scrollOffset }}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden
        className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60"
      />

      <Container className="relative flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-center gap-14 py-16 sm:gap-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial={prefersReduced ? false : "hidden"}
          animate="visible"
          className="flex flex-col gap-10 sm:gap-12"
        >
          {profile.available && profile.availabilityMessage ? (
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground inline-flex items-center gap-3 font-mono text-xs uppercase tracking-eyebrow"
            >
              <span aria-hidden className="bg-brand size-1.5 rounded-full" />
              {profile.availabilityMessage}
            </motion.p>
          ) : null}

          <motion.h1
            variants={riseIn}
            className="font-display text-display text-foreground max-w-5xl"
          >
            <span className="block">{nameWords.join(" ")} </span>
            <AccentText className="block">{lastName}</AccentText>
          </motion.h1>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-6 lg:col-span-7"
            >
              <p className="text-foreground font-mono text-sm sm:text-base">
                <span aria-hidden className="text-brand mr-2">
                  →
                </span>
                <TypingRole />
              </p>
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">
                {profile.summary}
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {profile.resumeUrl ? (
                  <Button
                    render={
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    size="xl"
                  >
                    Résumé
                    <ArrowUpRight />
                  </Button>
                ) : null}
                <Button
                  render={<a href={`#${SECTION_IDS.projects}`} />}
                  variant="outline"
                  size="xl"
                >
                  View projects
                  <ArrowDown />
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-5">
              <HeroStats stats={stats} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial={prefersReduced ? false : "hidden"}
          animate="visible"
          className="border-border mt-2 flex items-center justify-between gap-4 border-t pt-4"
        >
          <SocialLinks className="-ml-3" />
          <span className="text-muted-foreground hidden font-mono text-xs uppercase tracking-eyebrow sm:inline">
            {profile.location}
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
