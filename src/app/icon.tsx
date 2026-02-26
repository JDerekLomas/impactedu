import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "white",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            marginTop: "-1px",
          }}
        >
          I
        </span>
        <div
          style={{
            width: "10px",
            height: "2px",
            background: "#c45a2c",
            borderRadius: "1px",
            marginTop: "1px",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
