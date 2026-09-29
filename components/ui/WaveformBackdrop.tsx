import { generateBarHeights } from "@/components/ui/waveform";

const BAR_COUNT = 72;

/**
 * Very faint full-width equalizer pattern sitting behind the hero tool card.
 * Purely decorative (aria-hidden, pointer-events-none) and low-opacity enough
 * to stay calm rather than gimmicky — masked to fade out at both edges.
 */
export function WaveformBackdrop() {
  const heights = generateBarHeights(BAR_COUNT);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex h-40 items-end justify-center gap-1 opacity-[0.07]"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="bg-primary w-1.5 shrink-0 rounded-full"
          style={{ height: `${Math.round(h * 100)}%` }}
        />
      ))}
    </div>
  );
}
