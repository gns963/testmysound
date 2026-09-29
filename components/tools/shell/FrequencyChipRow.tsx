"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { detectDeviceType } from "@/lib/platform";
import { formatHz } from "@/lib/format";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";

const DEFAULT_AUTO_STOP_MS = 15_000;

type ContinuousToneHandle = ReturnType<
  ReturnType<typeof getEngine>["startContinuousTone"]
>;

// Toggle buttons that each play a single frequency until tapped again or an
// auto-stop timeout is hit. Shared by Speaker Sound Test and Bass Test.
export function FrequencyChipRow({
  tool,
  frequencies,
  gain = 0.6,
  autoStopMs = DEFAULT_AUTO_STOP_MS,
}: {
  tool: string;
  frequencies: number[];
  gain?: number;
  autoStopMs?: number;
}) {
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const toneRef = useRef<ContinuousToneHandle | null>(null);
  const autoStopTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const clearAutoStop = useCallback(() => {
    if (autoStopTimerRef.current !== null) {
      window.clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
  }, []);

  const stop = useCallback(
    (reportStopEarly: boolean) => {
      toneRef.current?.stop();
      toneRef.current = null;
      clearAutoStop();
      if (reportStopEarly) {
        trackToolStopEarly({
          tool,
          secondsPlayed: Math.round((Date.now() - startedAtRef.current) / 1000),
        });
      }
      setActiveFreq(null);
    },
    [clearAutoStop, tool],
  );

  useEffect(() => {
    return () => {
      toneRef.current?.stop();
      clearAutoStop();
    };
  }, [clearAutoStop]);

  const handleChip = useCallback(
    (freq: number) => {
      if (activeFreq === freq) {
        stop(true);
        return;
      }

      trackToolStart({
        tool,
        mode: `chip-${freq}hz`,
        deviceType: detectDeviceType(),
      });

      toneRef.current?.stop();
      toneRef.current = getEngine().startContinuousTone({ freq, gain });
      startedAtRef.current = Date.now();
      clearAutoStop();
      autoStopTimerRef.current = window.setTimeout(
        () => stop(false),
        autoStopMs,
      );
      setActiveFreq(freq);
    },
    [activeFreq, stop, clearAutoStop, tool, gain, autoStopMs],
  );

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {frequencies.map((freq) => (
        <button
          key={freq}
          type="button"
          onClick={() => handleChip(freq)}
          aria-pressed={activeFreq === freq}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            activeFreq === freq
              ? "border-primary bg-primary text-white"
              : "border-border text-text hover:border-primary hover:text-primary"
          }`}
        >
          {formatHz(freq)}
        </button>
      ))}
    </div>
  );
}
