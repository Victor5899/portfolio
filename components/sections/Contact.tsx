import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { socials, socialByPlatform } from "@/content/socials";
import { SECTION_IDS } from "@/constants/navigation";
import { getSectionMeta } from "@/lib/sections";
import { Section } from "@/components/layout/Section";
import { AccentText } from "@/components/common/AccentText";
import { SocialIcon } from "@/components/common/SocialIcon";
import { Reveal } from "@/components/common/Reveal";
import { Heading, Text, Eyebrow } from "@/components/common/Typography";
import { buttonVariants } from "@/components/ui/button";

/**
 * Contact (SRS §7.12). An editorial closing spread: a display headline, the
 * email as a large serif link, the résumé download (also in the nav —
 * FR-CONT-3), and the data-driven contact methods from `content/socials` as
 * ruled rows (FR-CONT-1 / DATA-2). No form, so no server dependency. Every
 * control is keyboard-accessible with a visible focus ring (A11Y-2/3).
 */
export function Contact() {
  const { eyebrow } = getSectionMeta(SECTION_IDS.contact);
  const email = socialByPlatform.email;

  return (
    <Section id={SECTION_IDS.contact}>
      <div className="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <Eyebrow className="text-brand">{eyebrow}</Eyebrow>
        {profile.available && profile.availabilityMessage ? (
          <Eyebrow className="inline-flex items-center gap-2.5">
            <span aria-hidden className="bg-brand size-1.5 rounded-full" />
            {profile.availabilityMessage}
          </Eyebrow>
        ) : null}
      </div>

      <Reveal className="mt-14 sm:mt-20">
        <Heading as="h2" size="display" className="max-w-5xl">
          Let&apos;s build something <AccentText>together</AccentText>
        </Heading>
      </Reveal>

      <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex flex-col gap-8 lg:col-span-7">
          <Text variant="lead" className="max-w-xl">
            Have a role, project, or idea in mind? I&apos;m always open to
            conversations about data, machine learning, and software.
          </Text>

          {email ? (
            <a
              href={email.href}
              className="group font-display text-headline text-foreground hover:text-brand focus-visible:ring-ring self-start rounded-sm break-all transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="link-underline">{profile.email}</span>
            </a>
          ) : null}

          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "xl",
                className: "self-start",
              })}
            >
              Download résumé
              <ArrowUpRight />
            </a>
          ) : null}
        </Reveal>

        <Reveal className="lg:col-span-5">
          <ul className="border-border border-t">
            {socials.map((link) => (
              <li key={link.platform} className="border-border border-b">
                  <a
                    href={link.href}
                    aria-label={`${link.label}${link.username ? ` — ${link.username}` : ""}`}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group focus-visible:ring-ring flex items-center gap-4 rounded-sm py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <span
                      aria-hidden
                      className="text-muted-foreground group-hover:text-brand size-4 shrink-0 transition-colors"
                    >
                      <SocialIcon platform={link.platform} />
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      {link.label}
                    </span>
                    {link.username ? (
                      <span className="text-muted-foreground min-w-0 flex-1 truncate text-right font-mono text-xs">
                        {link.username}
                      </span>
                    ) : (
                      <span className="flex-1" />
                    )}
                    <ArrowUpRight
                      aria-hidden
                      className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
