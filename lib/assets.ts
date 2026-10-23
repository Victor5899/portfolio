import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Whether a site-relative asset (e.g. "/projects/cover.jpg") exists in
 * `public/`. Server-only — lets image components render their placeholder
 * instead of requesting a file that would 404 (DATA-6). Remote URLs are
 * assumed to exist.
 */
export function publicAssetExists(src: string): boolean {
  if (!src.startsWith("/")) return true;
  return existsSync(path.join(process.cwd(), "public", src));
}
