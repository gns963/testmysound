import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import dbMeter from "@/content/tools/db-meter";
import { DbMeter } from "@/components/tools/DbMeter";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: dbMeter.metaTitle,
  description: dbMeter.metaDescription,
  path: "/db-meter",
});

export default function DbMeterPage() {
  return (
    <ToolPageShell
      title="Sound Level Meter (dB)"
      subtitle="An approximate dB reading from your microphone, with min/avg/max and reference levels."
      breadcrumbLabel="dB Meter"
      path="/db-meter"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Sound Level Meter",
            description:
              "Free browser tool for an approximate dB sound level reading.",
            path: "/db-meter",
          }),
        )}
      />
      <DbMeter />
      <ToolContentBody content={dbMeter} updatedDate={CONTENT_LAST_UPDATED} />
    </ToolPageShell>
  );
}
