import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import cpsTest from "@/content/tools/cps-test";
import { CpsTest } from "@/components/tools/CpsTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { CpsTestDiagram } from "@/components/content/diagrams/CpsTestDiagram";

const VALID_MODES = [1, 5, 10, 30, 60];

function parseSharedResult(score?: string, mode?: string) {
  const parsedScore = score ? Number.parseFloat(score) : NaN;
  const parsedMode = mode ? Number.parseInt(mode, 10) : NaN;
  if (!Number.isFinite(parsedScore) || parsedScore <= 0 || parsedScore > 50) return undefined;
  if (!VALID_MODES.includes(parsedMode)) return undefined;
  return { score: parsedScore, mode: parsedMode };
}

// Reads ?score=&mode= so a shared result link gets its own rich OG "share
// card" image (via the shared /api/og route) and shows a "beat this score"
// banner — both derived only from the URL, never from any stored/leaderboard
// data (there isn't any).
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ score?: string; mode?: string }>;
}): Promise<Metadata> {
  const { score, mode } = await searchParams;
  const shared = parseSharedResult(score, mode);

  const ogImage = shared
    ? `/api/og?title=${encodeURIComponent(cpsTest.metaTitle)}&score=${encodeURIComponent(`${shared.score} CPS`)}&sub=${encodeURIComponent(`${shared.mode}s Click Speed Test`)}`
    : `/api/og?title=${encodeURIComponent(cpsTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[cpsTest.slug] ?? "🖱️")}`;

  return buildMetadata({
    title: cpsTest.metaTitle,
    description: cpsTest.metaDescription,
    path: cpsTest.path,
    ogImage,
  });
}

export default async function CpsTestPage({
  searchParams,
}: {
  searchParams: Promise<{ score?: string; mode?: string }>;
}) {
  const { score, mode } = await searchParams;
  const sharedResult = parseSharedResult(score, mode);

  return (
    <ToolPageShell
      title="CPS Test (Click Speed Test)"
      subtitle="1, 5, 10, 30 and 60 second modes — local best only, no leaderboard."
      breadcrumbLabel="CPS Test"
      path={cpsTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "CPS Test",
            description: "Free browser tool to measure clicks per second across 1, 5, 10, 30 and 60 second modes.",
            path: cpsTest.path,
          }),
        )}
      />
      <CpsTest sharedResult={sharedResult} />
      <ToolContentBody content={cpsTest} updatedDate={CONTENT_LAST_UPDATED} diagram={<CpsTestDiagram />} tipsTitle="Device tips" />
    </ToolPageShell>
  );
}
