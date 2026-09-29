"use client";

import { useMetronome, MIN_BPM, MAX_BPM } from "@/lib/audio/useMetronome";
import { useTapTempo } from "@/lib/audio/useTapTempo";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const TIME_SIGNATURES = [
  { label: "2/4", beats: 2 },
  { label: "3/4", beats: 3 },
  { label: "4/4", beats: 4 },
  { label: "5/4", beats: 5 },
  { label: "6/8", beats: 6 },
];

/** Metronome: 30-300 BPM, time signatures, accent beat, tap tempo, lookahead-scheduled clicks. */
export function Metronome({ initialBpm }: { initialBpm?: number }) {
  const metronome = useMetronome(initialBpm);
  const tapTempo = useTapTempo();

  function handleTap() {
    tapTempo.tap();
    if (tapTempo.bpm) metronome.setBpm(tapTempo.bpm);
  }

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Uses precise Web Audio scheduling, not a plain JS timer, so the click stays steady even under heavy page load.
      </p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-text text-6xl font-extrabold tabular-nums" aria-live="polite">
          {metronome.bpm}
        </p>
        <p className="text-muted text-xs">BPM</p>
      </div>

      <div className="flex w-full max-w-xs items-center gap-3">
        <button
          type="button"
          onClick={() => metronome.setBpm(metronome.bpm - 1)}
          aria-label="Decrease tempo by 1 BPM"
          className="border-border text-text flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
        >
          −
        </button>
        <input
          type="range"
          min={MIN_BPM}
          max={MAX_BPM}
          value={metronome.bpm}
          onChange={(e) => metronome.setBpm(Number(e.target.value))}
          className="accent-primary w-full"
          aria-label="Tempo in beats per minute"
        />
        <button
          type="button"
          onClick={() => metronome.setBpm(metronome.bpm + 1)}
          aria-label="Increase tempo by 1 BPM"
          className="border-border text-text flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Time signature">
        {TIME_SIGNATURES.map((sig) => (
          <button
            key={sig.label}
            type="button"
            onClick={() => metronome.setBeatsPerBar(sig.beats)}
            aria-pressed={metronome.beatsPerBar === sig.beats}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              metronome.beatsPerBar === sig.beats
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted"
            }`}
          >
            {sig.label}
          </button>
        ))}
      </div>

      <label className="text-muted flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={metronome.accentEnabled}
          onChange={(e) => metronome.setAccentEnabled(e.target.checked)}
          className="border-border h-4 w-4 rounded accent-[var(--primary)]"
        />
        Accent first beat
      </label>

      <div className="flex items-center justify-center gap-2" aria-hidden="true">
        {Array.from({ length: metronome.beatsPerBar }).map((_, i) => {
          const isCurrent = metronome.currentBeat === i;
          const isAccent = metronome.accentEnabled && i === 0;
          return (
            <span
              key={`${i}-${isCurrent}`}
              className={`${isAccent ? "h-4.5 w-4.5" : "h-3.5 w-3.5"} rounded-full border-2 ${
                isCurrent
                  ? "border-primary bg-primary motion-safe:animate-[metronomeBeat_150ms_ease-out]"
                  : "border-border bg-transparent"
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={metronome.isPlaying ? metronome.stop : metronome.start}
          className={`rounded-full px-6 py-3 text-base font-semibold text-white ${
            metronome.isPlaying ? "bg-danger hover:brightness-110" : "bg-primary hover:bg-primary-strong"
          }`}
        >
          {metronome.isPlaying ? "Stop" : "Start"}
        </button>
        <button
          type="button"
          onClick={handleTap}
          className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
        >
          Tap tempo
        </button>
      </div>
      {tapTempo.tapCount > 0 && tapTempo.tapCount < 2 && (
        <p className="text-muted text-xs" aria-live="polite">
          Keep tapping…
        </p>
      )}
    </ToolShell>
  );
}
