"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { detectDeviceType } from "@/lib/platform";
import { formatHz } from "@/lib/format";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const MIN_FREQ = 1;
const MAX_FREQ = 22_000;
const DEFAULT_FREQ = 440;
const SESSION_CAP_MS = 120_000;

const WAVEFORMS: { id: OscillatorType; label: string }[] = [
  { id: "sine", label: "Sine" },
  { id: "square", label: "Square" },
  { id: "sawtooth", label: "Sawtooth" },
  { id: "triangle", label: "Triangle" },
];

// Log-scale slider: position 0-1000 maps exponentially across MIN_FREQ..MAX_FREQ,
// since pitch perception (and this tool's whole 1Hz-22kHz range) is logarithmic.
const SLIDER_STEPS = 1000;
function sliderToFreq(pos: number): number {
  const t = pos / SLIDER_STEPS;
  return Math.round(MIN_FREQ * Math.pow(MAX_FREQ / MIN_FREQ, t));
}
function freqToSlider(freq: number): number {
  const t = Math.log(freq / MIN_FREQ) / Math.log(MAX_FREQ / MIN_FREQ);
  return Math.round(t * SLIDER_STEPS);
}

function readInitialParams(): { freq: number; type: OscillatorType } {
  if (typeof window === "undefined")
    return { freq: DEFAULT_FREQ, type: "sine" };
  const params = new URLSearchParams(window.location.search);
  const f = Number(params.get("f"));
  const w = params.get("w") as OscillatorType | null;
  const freq =
    Number.isFinite(f) && f >= MIN_FREQ && f <= MAX_FREQ ? f : DEFAULT_FREQ;
  const type = w && WAVEFORMS.some((wf) => wf.id === w) ? w : "sine";
  return { freq, type };
}

type ContinuousToneHandle = ReturnType<
  ReturnType<typeof getEngine>["startContinuousTone"]
>;

/** Tool 8 (blueprint §4.4): 1Hz-22kHz tone generator with shareable URL params. */
export function ToneGenerator() {
  // Static-generated pages have no query string at build time, so the initial
  // state must match that (DEFAULT_FREQ/"sine") on both server and the
  // client's first render — a shared link's ?f=/&w= params are applied in an
  // effect right after mount instead, to avoid a hydration mismatch.
  const [freq, setFreq] = useState(DEFAULT_FREQ);
  const [type, setType] = useState<OscillatorType>("sine");
  const [volume, setVolume] = useState(0.5);
  const [balance, setBalance] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // One-time read of the URL's shared params after mount — not a cascading
    // update; needed to avoid a server/client hydration mismatch (the static
    // page has no query string at build time).
    const initial = readInitialParams();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFreq(initial.freq);
    setType(initial.type);
  }, []);

  const toneRef = useRef<ContinuousToneHandle | null>(null);
  const sessionCapTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const stop = useCallback((reportStopEarly: boolean) => {
    toneRef.current?.stop();
    toneRef.current = null;
    if (sessionCapTimerRef.current !== null) {
      window.clearTimeout(sessionCapTimerRef.current);
      sessionCapTimerRef.current = null;
    }
    if (reportStopEarly) {
      trackToolStopEarly({
        tool: "tone-generator",
        secondsPlayed: Math.round((Date.now() - startedAtRef.current) / 1000),
      });
    }
    setRunning(false);
  }, []);

  useEffect(() => {
    return () => {
      toneRef.current?.stop();
      if (sessionCapTimerRef.current !== null)
        window.clearTimeout(sessionCapTimerRef.current);
    };
  }, []);

  // Keep the URL shareable (?f=440&w=sine) without triggering navigation.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("f", String(freq));
    params.set("w", type);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [freq, type]);

  const toggle = useCallback(() => {
    if (running) {
      stop(true);
      return;
    }
    trackToolStart({
      tool: "tone-generator",
      mode: type,
      deviceType: detectDeviceType(),
    });
    toneRef.current = getEngine().startContinuousTone({
      freq,
      type,
      gain: volume,
      pan: balance,
    });
    startedAtRef.current = Date.now();
    sessionCapTimerRef.current = window.setTimeout(
      () => stop(false),
      SESSION_CAP_MS,
    );
    setRunning(true);
  }, [running, stop, freq, type, volume, balance]);

  function handleFreqSlider(pos: number) {
    const f = sliderToFreq(pos);
    setFreq(f);
    toneRef.current?.setFreq(f);
  }

  function nudgeFreq(delta: number) {
    const f = Math.min(MAX_FREQ, Math.max(MIN_FREQ, freq + delta));
    setFreq(f);
    toneRef.current?.setFreq(f);
  }

  function handleType(next: OscillatorType) {
    setType(next);
    toneRef.current?.setType(next);
  }

  function handleVolume(v: number) {
    setVolume(v);
    toneRef.current?.setGain(v);
  }

  function handleBalance(v: number) {
    setBalance(v);
    toneRef.current?.setPan(v, 0.05);
  }

  return (
    <ToolShell>
      <div className="flex flex-col items-center gap-1">
        <p className="text-text text-4xl font-semibold tabular-nums">
          {formatHz(freq)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudgeFreq(-1)}
            className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-2.5 py-1 text-xs"
          >
            -1 Hz
          </button>
          <button
            type="button"
            onClick={() => nudgeFreq(1)}
            className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-2.5 py-1 text-xs"
          >
            +1 Hz
          </button>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={SLIDER_STEPS}
        value={freqToSlider(freq)}
        onChange={(e) => handleFreqSlider(Number(e.target.value))}
        className="w-full max-w-sm accent-[var(--primary)]"
        aria-label="Frequency"
      />

      <div className="flex flex-wrap justify-center gap-2">
        {WAVEFORMS.map((wf) => (
          <button
            key={wf.id}
            type="button"
            onClick={() => handleType(wf.id)}
            aria-pressed={type === wf.id}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              type === wf.id
                ? "border-primary bg-primary text-white"
                : "border-border text-text hover:border-primary hover:text-primary"
            }`}
          >
            {wf.label}
          </button>
        ))}
      </div>

      <div className="grid w-full max-w-sm grid-cols-2 gap-4">
        <label className="text-muted flex flex-col gap-1 text-sm">
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
        <label className="text-muted flex flex-col gap-1 text-sm">
          Balance (L/R)
          <input
            type="range"
            min={-1}
            max={1}
            step={0.01}
            value={balance}
            onChange={(e) => handleBalance(Number(e.target.value))}
            className="accent-[var(--primary)]"
          />
        </label>
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
    </ToolShell>
  );
}
