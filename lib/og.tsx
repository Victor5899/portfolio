import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { SITE } from "@/constants/site";
import { formatDisplayUrl } from "@/lib/format";

/**
 * Shared Open Graph / Twitter image generator (SRS SEO-3). Rendered via
 * `next/og`, so styles are inline by necessity (Satori has no Tailwind/token
 * layer) — this is a build-time image artifact, not app UI. Content is sourced
 * from the profile/site layers so the card stays in sync with the data (DATA-2).
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${profile.name} — ${profile.role}`;

const BRAND_BLUE = "#4f7cff";
const BRAND_PURPLE = "#9b5cff";
const BRAND_GRADIENT = `linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_PURPLE})`;

export function renderOgImage(): ImageResponse {
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 80,
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -120,
            width: 760,
            height: 560,
            display: "flex",
            background: `radial-gradient(circle, ${BRAND_PURPLE}40, transparent 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              borderRadius: 18,
              background: BRAND_GRADIENT,
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", color: "#a1a1aa", fontSize: 26 }}>
            {formatDisplayUrl(SITE.url)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              color: "#fafafa",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", color: "#c4c4cf", fontSize: 40 }}>
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              width: 220,
              height: 10,
              borderRadius: 9999,
              background: BRAND_GRADIENT,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {profile.targetRoles.map((role) => (
            <div
              key={role}
              style={{
                display: "flex",
                color: "#e4e4e7",
                fontSize: 24,
                padding: "10px 22px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
