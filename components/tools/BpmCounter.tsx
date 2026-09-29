"use client";

import Link from "next/link";
import { useTapTempo } from "@/lib/audio/useTapTempo";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const MIN_TAPS_FOR_RESULT = 4;

/** BPM Counter: tap along to a song to measure its tempo — a detection tool, not a metronome. */
export function BpmCounter() {
  const { bpm, tapCount, tap, reset } = useTapTempo();
  const hasEnoughTaps = tapCount >= MIN_TAPS_FOR_RESULT;

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Tap along to a beat you&apos;re already hearing — this measures its tempo, it doesn&apos;t play a click itself.
      </p>

      <button
        type="button"
        onClick={tap}
        className="bg-primary hover:bg-primary-strong flex h-40 w-40 items-center justify-center rounded-full text-lg font-semibold text-white shadow-lg transition-transform active:scale-95"
      >
        Tap
      </button>

      <div className="flex flex-col items-center gap-1" aria-live="polite">
        <p className="text-text text-5xl font-extrabold tabular-nums">{hasEnoughTaps && bpm ? bpm : "—"}</p>
        <p className="text-muted text-xs">
          {tapCount === 0
            ? "BPM"
            : hasEnoughTaps
              ? `BPM · based on the last ${tapCount} taps`
              : `Keep tapping… (${tapCount}/${MIN_TAPS_FOR_RESULT})`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
        >
          Reset
        </button>
        {hasEnoughTaps && bpm && (
          <Link
            href={`/metronome?bpm=${bpm}`}
            className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-primary/20"
          >
            Practice at this tempo →
          </Link>
        )}
      </div>
    </ToolShell>
  );
}
