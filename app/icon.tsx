import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/** Generated app icon (SRS SEO-5): brand gradient monogram from the profile. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          color: "#ffffff",
          fontSize: 16,
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
