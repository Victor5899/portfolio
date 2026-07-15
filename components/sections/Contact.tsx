import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { socials, socialByPlatform } from "@/content/socials";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import { SocialIcon } from "@/components/common/SocialIcon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

/**
 * Contact (SRS §7.12). A glass panel with a prominent email CTA, résumé download
 * (also in the nav — FR-CONT-3), and data-driven contact methods sourced from
 * `content/socials` (FR-CONT-1 / DATA-2). No form is included, so no server
 * dependency (FR-CONT-2 is conditional). Fully keyboard-accessible with visible
 * focus rings and accessible names on every control (A11Y-2/3).
 */
export function Contact() {
  const { eyebrow } = getSectionMeta(SECTION_IDS.contact);
  const email = socialByPlatform.email;

  return (
    <Section id={SECTION_IDS.contact} container="md">
      <Reveal>
        <GlassCard
          padding="lg"
          glow
          className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12"
        >
          {profile.available && profile.availabilityMessage ? (
            <span className="glass text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
              <span className="relative flex size-2">
                <span className="bg-brand-blue absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                <span className="bg-brand-blue relative inline-flex size-2 rounded-full" />
              </span>
              {profile.availabilityMessage}
            </span>
          ) : (
            <Eyebrow>{eyebrow} — Contact</Eyebrow>
          )}

          <Heading as="h2" size="h1" className="max-w-2xl">
            Let&apos;s build something <GradientText>together</GradientText>
          </Heading>

          <Text variant="lead" className="max-w-xl">
            Have a role, project, or idea in mind? I&apos;m always open to
            conversations about data, machine learning, and software.
          </Text>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            {email ? (
              <Button
                variant="gradient"
                className="h-11 w-full rounded-xl px-6 text-[0.95rem] sm:w-auto"
                render={<a href={email.href} />}
              >
                <Mail />
                {profile.email}
              </Button>
            ) : null}
            <Button
              variant="glass"
              className="h-11 w-full rounded-xl px-6 text-[0.95rem] sm:w-auto"
              render={
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <FileText />
              Download résumé
            </Button>
          </div>
        </GlassCard>
      </Reveal>

      <StaggerGroup className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((link) => (
          <StaggerItem key={link.platform}>
            <a
              href={link.href}
              aria-label={`${link.label}${link.username ? ` — ${link.username}` : ""}`}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="focus-visible:ring-ring group block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
            >
              <GlassCard
                padding="lg"
                interactive
                className="flex h-full items-center gap-4"
              >
                <span
                  aria-hidden
                  className="text-brand-blue grid size-11 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/40"
                >
                  <span className="size-5">
                    <SocialIcon platform={link.platform} />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {link.label}
                  </span>
                  {link.username ? (
                    <span className="text-muted-foreground block truncate font-mono text-xs">
                      {link.username}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight
                  className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors"
                  aria-hidden
                />
              </GlassCard>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
