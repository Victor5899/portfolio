import { renderMonogram } from "@/lib/og";

/** Generated Apple touch icon (SRS SEO-5): brand-accent monogram, 180×180. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderMonogram(size.width);
}
