import { deviceHubs } from "@/data/deviceHubs";
import { DEVICE_ICON_BY_SLUG } from "@/lib/deviceIcons";
import { DeviceCard } from "@/components/ui/DeviceCard";

// Homepage "Choose your device" grid (blueprint §7.6), driven by the same
// device hub registry the footer and hub pages use. Heading rendered by the
// page via <SectionHeader> — this is just the card grid.
export function DeviceGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {deviceHubs.map((hub) => (
        <DeviceCard key={hub.slug} name={hub.name} icon={DEVICE_ICON_BY_SLUG[hub.slug] ?? "📶"} href={hub.path} />
      ))}
    </div>
  );
}
