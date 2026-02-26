import { ImageResponse } from "next/og";

export const alt = "Impact-Edu.ai — Research & Tools for AI in Education";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#faf8f5",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #d6d0c8 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px",
            opacity: 0.5,
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#1a3a2a",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo mark + site name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "#1a3a2a",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1,
                  marginTop: "-2px",
                }}
              >
                I
              </span>
              <div
                style={{
                  width: "14px",
                  height: "3px",
                  background: "#c45a2c",
                  borderRadius: "2px",
                  marginTop: "1px",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "22px",
                fontFamily: "Courier, monospace",
                color: "#6b6560",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
              }}
            >
              impact-edu.ai
            </span>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Research & Tools for{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#c45a2c",
                textUnderlineOffset: "6px",
                textDecorationThickness: "4px",
              }}
            >
              AI in Education
            </span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "22px",
              color: "#6b6560",
              marginTop: "24px",
              fontFamily: "system-ui, sans-serif",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Open research, open tools, and practitioner training for equitable
            AI in education.
          </p>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "40px",
              fontFamily: "Courier, monospace",
              fontSize: "14px",
              color: "#9a948e",
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            <span>15M+ students</span>
            <span>75+ publications</span>
            <span>34K+ open items</span>
          </div>
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#c45a2c",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
