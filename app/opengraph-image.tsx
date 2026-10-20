import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "UnitNov - Free Online Calculators & Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090B11",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            ⚡
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            UnitNov
          </span>
        </div>
        <div
          style={{
            fontSize: "44px",
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Free Online Calculators & Fast Utilities
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "750px",
            marginBottom: "32px",
          }}
        >
          100% Client-Side Privacy · Zero Latency · No Sign-Up Required
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#A5B4FC",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            💳 Finance
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#C4B5FD",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            📊 Math & Dates
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#67E8F9",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            📱 QR & Generators
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
