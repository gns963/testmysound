"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { createNoiseBuffer } from "@/lib/audio/noise";
import { getAmbientPreset, type AmbientPresetId } from "@/lib/audio/ambientSounds";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";

const SLEEP_FADE_S = 8;

type AmbientController = ReturnType<ReturnType<typeof getEngine>["startAmbientNoise"]>;

// Deliberately does NOT request a screen wake lock — unlike Metronome, a
// sleep/focus sound is meant to keep playing while the screen turns off or
// locks, which is standard background-audio behavior in most browsers, not
// something that needs (or wants) the display held on.
export function useAmbientSound() {
  const [presetId, setPresetId] = useState<AmbientPresetId | null>(null);
  const [volume, setVolumeState] = useState(0.6);
  const [sleepTimerMin, setSleepTimerMin] = useState<number | null>(null);
  const [timeRemainingS, setTimeRemainingS] = useState<number | null>(null);

  const controllerRef = useRef<AmbientController | null>(null);
  const sleepTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (sleepTimeoutRef.current !== null) {
      window.clearTimeout(sleepTimeoutRef.current);
      sleepTimeoutRef.current = null;
    }
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const stop = useCallback(
    (fadeS = 0.05) => {
      if (controllerRef.current) {
        trackToolStopEarly({ tool: "sleep-focus-sounds", secondsPlayed: (performance.now() - startedAtRef.current) / 1000 });
      }
      controllerRef.current?.stop(fadeS);
      controllerRef.current = null;
      clearTimers();
      setPresetId(null);
      setTimeRemainingS(null);
    },
    [clearTimers],
  );

  const play = useCallback(
    (id: AmbientPresetId) => {
      stop();
      const preset = getAmbientPreset(id);
      const engine = getEngine();
      const ctx = engine.ensureContext();
      const buffer = createNoiseBuffer(ctx, preset.noiseType);
      controllerRef.current = engine.startAmbientNoise({
        buffer,
        filter: preset.filter,
        lfo: preset.lfo,
        gain: volume,
      });
      startedAtRef.current = performance.now();
      setPresetId(id);
      trackToolStart({ tool: "sleep-focus-sounds", mode: id });

      if (sleepTimerMin) {
        const totalS = sleepTimerMin * 60;
        setTimeRemainingS(totalS);
        const timerStartedAt = performance.now();
        tickIntervalRef.current = window.setInterval(() => {
          const elapsed = (performance.now() - timerStartedAt) / 1000;
          setTimeRemainingS(Math.max(0, totalS - elapsed));
        }, 1000);
        sleepTimeoutRef.current = window.setTimeout(() => stop(SLEEP_FADE_S), totalS * 1000);
      }
    },
    [volume, sleepTimerMin, stop],
  );

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    controllerRef.current?.setGain(value);
  }, []);

  useEffect(() => {
    return () => {
      controllerRef.current?.stop();
      clearTimers();
    };
  }, [clearTimers]);

  return {
    presetId,
    volume,
    setVolume,
    sleepTimerMin,
    setSleepTimerMin,
    timeRemainingS,
    play,
    stop,
  };
}
