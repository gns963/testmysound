import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

const MAX_TITLE_LENGTH = 80;
const MAX_SCORE_LENGTH = 24;
const MAX_SUB_LENGTH = 60;

// Shared OG image generator — one route, reused via `?title=&icon=` for a
// standard tool card, or `?title=&score=&sub=` for a result-share card (CPS
// Test, Typing Speed Test) — rather than a per-page opengraph-image.tsx file
// for every tool and every possible result (this site has 20+ tools and
// growing, plus unlimited possible scores).
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? siteConfig.shortName).slice(0, MAX_TITLE_LENGTH);
  const icon = searchParams.get("icon") ?? "🎚️";
  const score = searchParams.get("score")?.slice(0, MAX_SCORE_LENGTH);
  const sub = searchParams.get("sub")?.slice(0, MAX_SUB_LENGTH);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: score ? "center" : undefined,
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B1220",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(14,165,233,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(20,184,166,0.25), transparent 55%)",
        }}
      >
        {score ? (
          <>
            <div style={{ fontSize: "32px", color: "#93A4BD", marginBottom: "16px" }}>{title}</div>
            <div style={{ fontSize: "140px", fontWeight: 700, color: "#38BDF8", lineHeight: 1 }}>{score}</div>
            {sub && <div style={{ fontSize: "34px", color: "#F8FAFC", marginTop: "20px" }}>{sub}</div>}
            <div style={{ fontSize: "26px", color: "#93A4BD", marginTop: "32px" }}>{siteConfig.shortName}</div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
                height: "120px",
                borderRadius: "32px",
                backgroundColor: "rgba(255,255,255,0.08)",
                fontSize: "64px",
                marginBottom: "40px",
              }}
            >
              {icon}
            </div>
            <div style={{ fontSize: "64px", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.1 }}>{title}</div>
            <div style={{ fontSize: "28px", color: "#93A4BD", marginTop: "24px" }}>{siteConfig.shortName}</div>
          </>
        )}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
