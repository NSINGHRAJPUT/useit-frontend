import { ImageResponse } from "next/og";

export const alt = "ApkaOS — free online image, PDF and document tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #120f22 0%, #1c1733 50%, #2a1f18 100%)",
          color: "#f6f1e4",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#e4c36a", textTransform: "uppercase" }}>apkaos.in</div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>ApkaOS</div>
        <div style={{ marginTop: 16, fontSize: 32, color: "#d9d0b8", maxWidth: 900 }}>
          Free online image, PDF and document tools
        </div>
      </div>
    ),
    { ...size },
  );
}
