"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { detectDeviceType } from "@/lib/platform";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const PHASE_FREQ = 300;
const SESSION_CAP_MS = 120_000;

type Phase = "in" | "out";

/**
 * Tool 10 (blueprint §4.4): headphone-specific phase/wiring check — the same
 * tone panned hard left and right, in phase or inverted, so a miswired or
 * out-of-phase pair is audible as a hollow/phasey sound instead of a solid
 * center image. L/R, sweep and bass checks are dedicated tools linked from
 * this page's Related Tools section (ToolContentBody), not duplicated here.
 */
export function HeadphoneTest() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("in");

  const rightGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const sessionCapTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const stop = useCallback((reportStopEarly: boolean) => {
    if (oscillatorsRef.current.length === 0) return;
    const ctx = getEngine().ensureContext();
    const now = ctx.currentTime;
    const rightGain = rightGainRef.current;
    if (rightGain) {
      rightGain.gain.cancelScheduledValues(now);
      rightGain.gain.setValueAtTime(rightGain.gain.value, now);
      rightGain.gain.linearRampToValueAtTime(0, now + 0.05);
    }
    for (const osc of oscillatorsRef.current) {
      try {
        osc.stop(now + 0.05);
      } catch {
        // Already stopped.
      }
    }
    oscillatorsRef.current = [];
    rightGainRef.current = null;

    if (sessionCapTimerRef.current !== null) {
      window.clearTimeout(sessionCapTimerRef.current);
      sessionCapTimerRef.current = null;
    }
    if (reportStopEarly) {
      trackToolStopEarly({
        tool: "headphone-test",
        secondsPlayed: Math.round((Date.now() - startedAtRef.current) / 1000),
      });
    }
    setRunning(false);
  }, []);

  useEffect(() => {
    return () => stop(false);
  }, [stop]);

  const start = useCallback(() => {
    trackToolStart({
      tool: "headphone-test",
      mode: "phase-check",
      deviceType: detectDeviceType(),
    });

    const engine = getEngine();
    const ctx = engine.ensureContext();
    const master = engine.getMasterGain();
    const now = ctx.currentTime;

    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();
    const gainLeft = ctx.createGain();
    const gainRight = ctx.createGain();
    const panLeft = ctx.createStereoPanner();
    const panRight = ctx.createStereoPanner();

    oscLeft.frequency.value = PHASE_FREQ;
    oscRight.frequency.value = PHASE_FREQ;
    panLeft.pan.value = -1;
    panRight.pan.value = 1;
    gainLeft.gain.setValueAtTime(0, now);
    gainRight.gain.setValueAtTime(0, now);
    gainLeft.gain.linearRampToValueAtTime(0.5, now + 0.05);
    gainRight.gain.linearRampToValueAtTime(
      phase === "in" ? 0.5 : -0.5,
      now + 0.05,
    );

    oscLeft.connect(gainLeft).connect(panLeft).connect(master);
    oscRight.connect(gainRight).connect(panRight).connect(master);
    oscLeft.start(now);
    oscRight.start(now);

    rightGainRef.current = gainRight;
    oscillatorsRef.current = [oscLeft, oscRight];
    startedAtRef.current = Date.now();
    sessionCapTimerRef.current = window.setTimeout(
      () => stop(false),
      SESSION_CAP_MS,
    );
    setRunning(true);
  }, [phase, stop]);

  function selectPhase(next: Phase) {
    setPhase(next);
    const gain = rightGainRef.current;
    if (running && gain) {
      const ctx = getEngine().ensureContext();
      const t = ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(next === "in" ? 0.5 : -0.5, t + 0.1);
    }
  }

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-sm">
        Wear your headphones and play the tone. In phase, it should sound
        centered and solid. Out of phase, it usually sounds hollow or hard to
        locate — a sign of miswired or faulty cabling.
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {(["in", "out"] as Phase[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => selectPhase(p)}
            aria-pressed={phase === p}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              phase === p
                ? "border-primary bg-primary text-white"
                : "border-border text-text hover:border-primary hover:text-primary"
            }`}
          >
            {p === "in" ? "In phase" : "Out of phase"}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => (running ? stop(true) : start())}
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
