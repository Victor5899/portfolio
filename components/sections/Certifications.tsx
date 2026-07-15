import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/content/certifications";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section, SectionHeading } from "@/components/layout/Section";
import { GlassCard } from "@/components/common/GlassCard";
import { Icon } from "@/components/common/Icon";
import { TechBadges } from "@/components/common/TechBadges";
import { StaggerGroup, StaggerItem } from "@/components/common/Reveal";
import { Heading, Text } from "@/components/common/Typography";
import { Badge } from "@/components/ui/badge";

/**
 * Certifications (SRS §7.8). Renders from `content/certifications` (FR-CERT-1);
 * credential links open in a new tab with rel="noopener noreferrer" (FR-CERT-2).
 * Self-hides when there are no certifications yet, so the section appears the
 * moment one is added to content — no component change needed (DATA-5/6).
 */
export function Certifications() {
  const { eyebrow, label } = getSectionMeta(SECTION_IDS.certifications);
  if (certifications.length === 0) return null;

  return (
    <Section id={SECTION_IDS.certifications}>
      <SectionHeading eyebrow={eyebrow} title={label} />

      <StaggerGroup className="mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <StaggerItem key={`${cert.title}-${cert.issuer}`}>
            <GlassCard padding="lg" className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className="text-brand-blue grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/40"
                >
                  <span className="size-5">
                    <Icon name="certification" />
                  </span>
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {cert.date}
                </span>
              </div>

              <div>
                <Heading as="h3" size="h4">
                  {cert.title}
                </Heading>
                <Text variant="muted" className="mt-1">
                  {cert.issuer}
                </Text>
              </div>

              {cert.skills && cert.skills.length > 0 ? (
                <TechBadges stack={cert.skills} className="mt-auto" />
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                {cert.credentialId ? (
                  <Badge variant="outline" className="font-mono">
                    ID: {cert.credentialId}
                  </Badge>
                ) : null}
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 rounded-sm font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    Verify credential
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
