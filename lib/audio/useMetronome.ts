"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { MetronomeScheduler } from "@/lib/audio/metronomeScheduler";
import { requestScreenWakeLock, releaseScreenWakeLock } from "@/lib/audio/wakeLock";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";

export const MIN_BPM = 30;
export const MAX_BPM = 300;

export function useMetronome(initialBpm = 120) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpmState] = useState(() => Math.min(MAX_BPM, Math.max(MIN_BPM, initialBpm)));
  const [beatsPerBar, setBeatsPerBarState] = useState(4);
  const [accentEnabled, setAccentEnabledState] = useState(true);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);

  const schedulerRef = useRef<MetronomeScheduler | null>(null);
  const startedAtRef = useRef(0);

  const ensureScheduler = useCallback(() => {
    if (!schedulerRef.current) {
      const engine = getEngine();
      const ctx = engine.ensureContext();
      schedulerRef.current = new MetronomeScheduler(ctx, engine.getMasterGain());
    }
    return schedulerRef.current;
  }, []);

  const start = useCallback(() => {
    const scheduler = ensureScheduler();
    scheduler.setBpm(bpm);
    scheduler.setBeatsPerBar(beatsPerBar);
    scheduler.setAccentEnabled(accentEnabled);
    scheduler.start((beatIndex) => setCurrentBeat(beatIndex));
    startedAtRef.current = performance.now();
    setIsPlaying(true);
    trackToolStart({ tool: "metronome", mode: `${bpm}bpm` });
    void requestScreenWakeLock();
  }, [ensureScheduler, bpm, beatsPerBar, accentEnabled]);

  const stop = useCallback(() => {
    if (isPlaying) {
      trackToolStopEarly({ tool: "metronome", secondsPlayed: (performance.now() - startedAtRef.current) / 1000 });
    }
    schedulerRef.current?.stop();
    setIsPlaying(false);
    setCurrentBeat(null);
    void releaseScreenWakeLock();
  }, [isPlaying]);

  const setBpm = useCallback((value: number) => {
    const clamped = Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)));
    setBpmState(clamped);
    schedulerRef.current?.setBpm(clamped);
  }, []);

  const setBeatsPerBar = useCallback((value: number) => {
    setBeatsPerBarState(value);
    schedulerRef.current?.setBeatsPerBar(value);
  }, []);

  const setAccentEnabled = useCallback((value: boolean) => {
    setAccentEnabledState(value);
    schedulerRef.current?.setAccentEnabled(value);
  }, []);

  useEffect(() => {
    return () => {
      schedulerRef.current?.stop();
      void releaseScreenWakeLock();
    };
  }, []);

  return {
    isPlaying,
    bpm,
    beatsPerBar,
    accentEnabled,
    currentBeat,
    start,
    stop,
    setBpm,
    setBeatsPerBar,
    setAccentEnabled,
  };
}
