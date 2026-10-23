import { profile } from "@/content/profile";
import { getCurrentYear } from "@/lib/format";
import { getVisibleNavigation } from "@/lib/navigation";
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
  const navigation = getVisibleNavigation();

  return (
    <footer className="border-border border-t">
      <Container className="flex flex-col gap-12 py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              {profile.summary}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:max-w-xl lg:justify-end">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="link-underline text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <SocialLinks className="-ml-3" />
          <BackToTop />
        </div>

        <div className="border-border flex flex-col-reverse items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm">
            © {getCurrentYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-eyebrow">
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}
