import type { ToolTip } from "@/content/tools/types";
import { FeatureCard } from "@/components/ui/FeatureCard";

// Platform-specific accent colors when a tip's title names a known platform;
// otherwise falls back to the site's primary blue. Purple is a one-off accent
// used only here (not a design-system token) for the "Laptop" case.
function accentFor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("iphone")) return "#0EA5E9";
  if (t.includes("android") || t.includes("samsung")) return "#10B981";
  if (t.includes("laptop") || t.includes("macbook") || t.includes("mac")) return "#8B5CF6";
  if (t.includes("windows")) return "#14B8A6";
  return "var(--primary)";
}

export function TipsGrid({ title, tips }: { title: string; tips: ToolTip[] }) {
  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tips.map((tip) => (
          <FeatureCard
            key={tip.title}
            title={tip.title}
            body={tip.body}
            icon={tip.title.charAt(0)}
            href={tip.href}
            linkLabel={tip.linkLabel}
            accent={accentFor(tip.title)}
          />
        ))}
      </div>
    </section>
  );
}
