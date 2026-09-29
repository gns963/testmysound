import { deviceHubs } from "@/data/deviceHubs";
import { DEVICE_ICON_BY_SLUG } from "@/lib/deviceIcons";
import { DeviceCard } from "@/components/ui/DeviceCard";

export function RelatedDevices({ excludeSlug }: { excludeSlug: string }) {
  const others = deviceHubs.filter((hub) => hub.slug !== excludeSlug);
  if (others.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Other devices</h2>
      <div className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-3">
        {others.map((hub) => (
          <DeviceCard
            key={hub.slug}
            variant="compact"
            name={hub.name}
            icon={DEVICE_ICON_BY_SLUG[hub.slug] ?? "📶"}
            href={hub.path}
          />
        ))}
      </div>
    </section>
  );
}
