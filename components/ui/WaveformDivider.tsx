import { generateBarHeights } from "@/components/ui/waveform";

const BAR_COUNT = 48;

// Thin equalizer-bar rule used between homepage sections instead of a plain
// line — a subtle nod to what the site actually does, not a loud illustration.
export function WaveformDivider({ className = "" }: { className?: string }) {
  const heights = generateBarHeights(BAR_COUNT);

  return (
    <div
      aria-hidden="true"
      className={`flex h-6 w-full max-w-xs items-center justify-center gap-[3px] ${className}`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="bg-primary/25 w-[3px] shrink-0 rounded-full"
          style={{ height: `${Math.round(h * 100)}%` }}
        />
      ))}
    </div>
  );
}
