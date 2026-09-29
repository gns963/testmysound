import type { DeviceHubContent } from "@/content/device-hubs/types";
import iphone from "@/content/device-hubs/iphone";
import samsung from "@/content/device-hubs/samsung";
import android from "@/content/device-hubs/android";
import laptop from "@/content/device-hubs/laptop";
import macbook from "@/content/device-hubs/macbook";
import airpods from "@/content/device-hubs/airpods";

// Device/brand hub registry (blueprint §5, §9) — the footer's "Devices"
// links point here. Distinct from a future data/devices.ts model-level
// registry (individual verified phones like "iphone-15"), which this project
// hasn't built yet since no sourced per-model facts exist to populate it.
export const deviceHubs: DeviceHubContent[] = [
  iphone,
  samsung,
  android,
  laptop,
  macbook,
  airpods,
];

const deviceHubsBySlug = new Map(deviceHubs.map((hub) => [hub.slug, hub]));

export function getDeviceHub(slug: string): DeviceHubContent | undefined {
  return deviceHubsBySlug.get(slug);
}
