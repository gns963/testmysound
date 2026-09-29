import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import sleepFocusSounds from "@/content/tools/sleep-focus-sounds";
import { SleepFocusSounds } from "@/components/tools/SleepFocusSounds";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { SleepSoundsDiagram } from "@/components/content/diagrams/SleepSoundsDiagram";

export const metadata: Metadata = buildMetadata({
  title: sleepFocusSounds.metaTitle,
  description: sleepFocusSounds.metaDescription,
  path: sleepFocusSounds.path,
  ogImage: `/api/og?title=${encodeURIComponent(sleepFocusSounds.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[sleepFocusSounds.slug] ?? "🌙")}`,
});

export default function SleepFocusSoundsPage() {
  return (
    <ToolPageShell
      title="Sleep & Focus Sounds"
      subtitle="Rain, ocean, white/pink/brown noise and fan hum — with a fading sleep timer."
      breadcrumbLabel="Sleep & Focus Sounds"
      path={sleepFocusSounds.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Sleep & Focus Sounds",
            description: "Free ambient sound player with rain, ocean, white/pink/brown noise and fan hum, plus a fading sleep timer.",
            path: sleepFocusSounds.path,
          }),
        )}
      />
      <SleepFocusSounds />
      <ToolContentBody
        content={sleepFocusSounds}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<SleepSoundsDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
