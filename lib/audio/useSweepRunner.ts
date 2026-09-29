"use client";

import { useCallback, useRef, useState } from "react";
import { useToolRunner } from "@/lib/audio/useToolRunner";

export type SweepRange = { from: number; to: number; durationMs: number };

const DEFAULT_RANGE: SweepRange = { from: 20, to: 20_000, durationMs: 20_000 };

/**
 * A single sweep stage plus a live-frequency readout derived from progress.
 * `getRange` is read once, at the moment start() is called, so callers can
 * back it with mutable UI state (e.g. Frequency Sweep Generator's inputs)
 * without the in-flight run reacting to edits made mid-sweep.
 */
export function useSweepRunner({
  tool,
  mode,
  getRange,
}: {
  tool: string;
  mode: string;
  getRange: () => SweepRange;
}) {
  const activeRangeRef = useRef<SweepRange>(DEFAULT_RANGE);
  // Mirrors activeRangeRef for render-time reads (liveFreq below) — refs can't be
  // read during render, so the display value is tracked separately in state.
  const [displayRange, setDisplayRange] = useState<SweepRange>(DEFAULT_RANGE);

  const runner = useToolRunner({
    tool,
    mode,
    buildProgram: () => {
      const { from, to, durationMs } = activeRangeRef.current;
      return [
        { kind: "sweep", label: "Sweep", from, to, duration: durationMs },
      ];
    },
  });

  const start = useCallback(() => {
    const range = getRange();
    activeRangeRef.current = range;
    setDisplayRange(range);
    runner.start();
  }, [getRange, runner]);

  const t = Math.min(100, Math.max(0, runner.progressPct)) / 100;
  const liveFreq =
    displayRange.from * Math.pow(displayRange.to / displayRange.from, t);

  return { ...runner, start, liveFreq };
}
