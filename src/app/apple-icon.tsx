import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a3a2a",
          borderRadius: "36px",
        }}
      >
        <span
          style={{
            fontSize: "110px",
            fontWeight: 700,
            color: "white",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            marginTop: "-4px",
          }}
        >
          I
        </span>
        <div
          style={{
            width: "50px",
            height: "6px",
            background: "#c45a2c",
            borderRadius: "3px",
            marginTop: "2px",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
