import { renderMonogram } from "@/lib/og";

/** Generated app icon (SRS SEO-5): brand-accent monogram from the profile. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderMonogram(size.width);
}
