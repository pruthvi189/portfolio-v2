import { ImageResponse } from "next/og";

export const alt = "Pruthvi Shah — ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          backgroundColor: "#111111",
          color: "#F2F2F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 999,
              border: "2px solid rgba(108,155,207,0.4)",
              color: "#6C9BCF",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            PS
          </div>
          <div style={{ fontSize: 20, color: "#a3a3a3" }}>
            pruthvi189.github.io
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Pruthvi Shah.
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#6C9BCF",
              fontWeight: 400,
              marginTop: 12,
            }}
          >
            ML Engineer &amp; AI Application Builder
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#a3a3a3",
          }}
        >
          <div>Deep learning · NLP · Full-stack AI</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span>Next.js</span>
            <span>Python</span>
            <span>TensorFlow</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
