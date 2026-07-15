/**
 * "Skip to content" link (FR-NAV-5 / A11Y-5). Visually hidden until focused, it
 * must be the first focusable element in the document so keyboard and screen
 * reader users can bypass the navigation.
 */
export function SkipLink({ targetId = "main" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus-visible:ring-2 focus-visible:outline-none"
    >
      Skip to content
    </a>
  );
}
