import { profile } from "@/content/profile";
import { getCurrentYear } from "@/lib/format";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { SocialLinks } from "@/components/common/SocialLinks";

/**
 * Site footer (FR-FOOT-1/2): wordmark, data-driven social links, dynamic
 * copyright, a "built with" note, and a back-to-top control. Server Component —
 * only the interactive back-to-top button is a client leaf.
 */
export function Footer() {
  return (
    <footer className="border-border/60 relative mt-24 border-t">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              {profile.summary}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <SocialLinks />
            <BackToTop />
          </div>
        </div>

        <div className="border-border/60 flex flex-col-reverse items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm">
            © {getCurrentYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground font-mono text-xs">
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}
