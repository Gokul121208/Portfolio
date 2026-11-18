import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gokul M — Digital Marketer, Forex Trader & Content Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%",
          background: "#07070b",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#c6ff3d" }} />

        {/* grid dots */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.07,
          backgroundImage: "radial-gradient(circle, #f4f4ee 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* large G watermark */}
        <div style={{
          position: "absolute", top: "50%", right: 80,
          transform: "translateY(-50%)",
          fontSize: 400, fontWeight: 900, color: "#c6ff3d",
          opacity: 0.06, lineHeight: 1, letterSpacing: "-0.05em",
        }}>G</div>

        {/* tag */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 32,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#c6ff3d" }} />
          <span style={{ color: "#c6ff3d", fontSize: 16, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            The Moments Lab AI Marketing Agency
          </span>
        </div>

        {/* name */}
        <div style={{ fontSize: 96, fontWeight: 900, color: "#f4f4ee", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
          Gokul<span style={{ color: "#c6ff3d" }}> M</span>
        </div>

        {/* roles */}
        <div style={{
          display: "flex", gap: 32, marginTop: 32,
          color: "#9a9aab", fontSize: 22, fontWeight: 400,
        }}>
          <span>Digital Marketer</span>
          <span style={{ color: "#22222f" }}>·</span>
          <span>Forex &amp; Futures Trader</span>
          <span style={{ color: "#22222f" }}>·</span>
          <span>Content Creator</span>
        </div>

        {/* url */}
        <div style={{ position: "absolute", bottom: 40, right: 80, color: "#9a9aab", fontSize: 18 }}>
          gokulm.in
        </div>
      </div>
    ),
    { ...size }
  );
}
