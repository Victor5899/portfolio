import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { SITE } from "@/constants/site";
import { formatDisplayUrl } from "@/lib/format";

/**
 * Shared Open Graph / Twitter image generator (SRS SEO-3). Rendered via
 * `next/og`, so styles are inline by necessity (Satori has no Tailwind/token
 * layer) — this is a build-time image artifact, not app UI. The palette mirrors
 * the dark tokens in `app/globals.css`; content comes from the profile/site
 * layers so the card stays in sync with the data (DATA-2).
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${profile.name} — ${profile.role}`;

/** sRGB equivalents of the dark-theme tokens, for image generation only. */
export const OG_PALETTE = {
  background: "#101014",
  foreground: "#f3f2ee",
  muted: "#a6a7ad",
  border: "rgba(255,255,255,0.12)",
  brand: "#5b9cff",
} as const;

export function getInitials(): string {
  return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
}

export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_PALETTE.background,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: OG_PALETTE.muted,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: OG_PALETTE.brand,
              }}
            />
            {getInitials()} — Portfolio
          </div>
          <div style={{ display: "flex" }}>{formatDisplayUrl(SITE.url)}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              color: OG_PALETTE.foreground,
              fontSize: 104,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", color: OG_PALETTE.muted, fontSize: 38 }}>
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            paddingTop: 28,
            borderTop: `1px solid ${OG_PALETTE.border}`,
            color: OG_PALETTE.foreground,
            fontSize: 24,
          }}
        >
          {profile.targetRoles.map((role) => (
            <div key={role} style={{ display: "flex" }}>
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

/** Square monogram used by the favicon and Apple touch icon (SEO-5). */
export function renderMonogram(size: number): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: size * 0.22,
          background: OG_PALETTE.brand,
          color: OG_PALETTE.background,
          fontSize: size * 0.46,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -size * 0.02,
        }}
      >
        {getInitials()}
      </div>
    ),
    { width: size, height: size },
  );
}
