"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { createNoiseBuffer, type NoiseType } from "@/lib/audio/noise";
import { detectDeviceType } from "@/lib/platform";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ModeTabs, type ModeOption } from "@/components/tools/shell/ModeTabs";

const NOISE_MODES: ModeOption[] = [
  { id: "white", label: "White" },
  { id: "pink", label: "Pink" },
  { id: "brown", label: "Brown" },
];

const TIMER_OPTIONS = [
  { id: "off", label: "No timer", ms: 0 },
  { id: "15", label: "15 min", ms: 15 * 60_000 },
  { id: "30", label: "30 min", ms: 30 * 60_000 },
  { id: "60", label: "60 min", ms: 60 * 60_000 },
];

type NoiseHandle = ReturnType<ReturnType<typeof getEngine>["startNoise"]>;

/** Tool 13 (blueprint §4.2/§4.4): white/pink/brown noise with volume and an optional timer. */
export function NoiseGenerator() {
  const [type, setType] = useState<NoiseType>("white");
  const [volume, setVolume] = useState(0.5);
  const [timerId, setTimerId] = useState("off");
  const [running, setRunning] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  const noiseRef = useRef<NoiseHandle | null>(null);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownRef.current !== null) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const stop = useCallback(
    (reportStopEarly: boolean) => {
      noiseRef.current?.stop();
      noiseRef.current = null;
      clearTimers();
      if (reportStopEarly) {
        trackToolStopEarly({
          tool: "noise-generator",
          secondsPlayed: Math.round((Date.now() - startedAtRef.current) / 1000),
        });
      }
      setRunning(false);
      setMinutesLeft(null);
    },
    [clearTimers],
  );

  useEffect(() => {
    return () => {
      noiseRef.current?.stop();
      clearTimers();
    };
  }, [clearTimers]);

  const toggle = useCallback(() => {
    if (running) {
      stop(true);
      return;
    }

    trackToolStart({
      tool: "noise-generator",
      mode: type,
      deviceType: detectDeviceType(),
    });

    const ctx = getEngine().ensureContext();
    const buffer = createNoiseBuffer(ctx, type);
    noiseRef.current = getEngine().startNoise({ buffer, gain: volume });
    startedAtRef.current = Date.now();

    const option = TIMER_OPTIONS.find((t) => t.id === timerId);
    clearTimers();
    if (option && option.ms > 0) {
      setMinutesLeft(Math.round(option.ms / 60_000));
      timerRef.current = window.setTimeout(() => stop(false), option.ms);
      const endsAt = Date.now() + option.ms;
      countdownRef.current = window.setInterval(() => {
        setMinutesLeft(Math.max(0, Math.ceil((endsAt - Date.now()) / 60_000)));
      }, 5000);
    }

    setRunning(true);
  }, [running, stop, type, volume, timerId, clearTimers]);

  function handleType(next: NoiseType) {
    setType(next);
    if (running && noiseRef.current) {
      // Switching color mid-play restarts on the new buffer (color isn't a live AudioParam).
      const ctx = getEngine().ensureContext();
      noiseRef.current.stop();
      noiseRef.current = getEngine().startNoise({
        buffer: createNoiseBuffer(ctx, next),
        gain: volume,
      });
    }
  }

  function handleVolume(v: number) {
    setVolume(v);
    noiseRef.current?.setGain(v);
  }

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={NOISE_MODES}
          active={type}
          onChange={(id) => handleType(id as NoiseType)}
        />
      }
    >
      <label className="text-muted flex w-full max-w-sm flex-col gap-1 text-sm">
        Volume
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolume(Number(e.target.value))}
          className="accent-[var(--primary)]"
        />
      </label>

      <div className="flex flex-wrap justify-center gap-2">
        {TIMER_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setTimerId(option.id)}
            disabled={running}
            aria-pressed={timerId === option.id}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              timerId === option.id
                ? "border-primary bg-primary text-white"
                : "border-border text-text hover:border-primary hover:text-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggle}
        className="rounded-full px-6 py-3 text-base font-semibold text-white"
        style={{
          backgroundColor: running ? "var(--danger)" : "var(--primary)",
        }}
      >
        {running ? "Stop" : "Play"}
      </button>

      {running && minutesLeft !== null && (
        <p className="text-muted text-sm" aria-live="polite">
          Stops in about {minutesLeft} min
        </p>
      )}
    </ToolShell>
  );
}
