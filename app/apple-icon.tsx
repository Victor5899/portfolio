import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/** Generated Apple touch icon (SRS SEO-5): brand gradient monogram, 180×180. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: 84,
          fontWeight: 700,
          fontFamily: "sans-serif",
          background: "linear-gradient(135deg, #4f7cff, #9b5cff)",
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  );
}
