"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type PolarityController = ReturnType<ReturnType<typeof getEngine>["startPolarityTest"]>;

/** Speaker Phase/Polarity Test: identical tone on both channels, toggle-invert one to A/B by ear. */
export function SpeakerPolarityTest() {
  const [playing, setPlaying] = useState(false);
  const [inverted, setInverted] = useState(false);
  const controllerRef = useRef<PolarityController | null>(null);

  const start = useCallback(() => {
    const engine = getEngine();
    controllerRef.current = engine.startPolarityTest({ freq: 80, gain: 0.6 });
    setInverted(false);
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    controllerRef.current?.stop();
    controllerRef.current = null;
    setPlaying(false);
  }, []);

  const toggleInvert = useCallback(() => {
    setInverted((current) => {
      const next = !current;
      controllerRef.current?.setInverted(next);
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      controllerRef.current?.stop();
    };
  }, []);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Plays a low tone through both speakers, then lets you invert one to hear what reversed wiring sounds like.
      </p>

      {!playing ? (
        <button
          type="button"
          onClick={start}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Play test tone
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-text text-lg font-semibold" aria-live="polite">
            {inverted ? "Right channel inverted (out of phase)" : "Normal (in phase)"}
          </p>
          <button
            type="button"
            onClick={toggleInvert}
            aria-pressed={inverted}
            className={`rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors ${
              inverted ? "border-danger bg-danger/10 text-danger" : "border-primary bg-primary/10 text-primary"
            }`}
          >
            {inverted ? "Switch back to normal" : "Invert right channel"}
          </button>
          <button type="button" onClick={stop} className="text-muted hover:text-text text-sm">
            Stop
          </button>
        </div>
      )}
    </ToolShell>
  );
}
