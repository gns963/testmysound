import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { deviceHubs, getDeviceHub } from "@/data/deviceHubs";
import { SpeakerCleaner } from "@/components/tools/SpeakerCleaner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { DeviceHubBody } from "@/components/content/DeviceHubBody";

export function generateStaticParams() {
  return deviceHubs.map((hub) => ({ device: hub.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ device: string }>;
}): Promise<Metadata> {
  const { device } = await params;
  const hub = getDeviceHub(device);
  if (!hub) return {};
  return buildMetadata({
    title: hub.metaTitle,
    description: hub.metaDescription,
    path: hub.path,
  });
}

// Device/brand hub pages (blueprint §5/§9) — only the hubs linked from the
// footer are built for now (iPhone, Samsung, Android, Laptop, MacBook,
// AirPods/Earbuds). Verified per-model pages (e.g. iPhone 15) are a separate,
// later effort gated on having real sourced specs.
export default async function DeviceHubPage({
  params,
}: {
  params: Promise<{ device: string }>;
}) {
  const { device } = await params;
  const hub = getDeviceHub(device);
  if (!hub) notFound();

  return (
    <ToolPageShell
      title={`${hub.name} Speaker Cleaner`}
      subtitle={hub.intro}
      breadcrumbLabel={hub.name}
      path={hub.path}
    >
      <SpeakerCleaner allowedModes={hub.toolAllowedModes} />
      <DeviceHubBody content={hub} updatedDate={CONTENT_LAST_UPDATED} />
    </ToolPageShell>
  );
}
