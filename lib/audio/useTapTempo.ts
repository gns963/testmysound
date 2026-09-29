"use client";

import { useCallback, useRef, useState } from "react";

// Shared by the Metronome (tap to set its BPM) and the BPM Counter (tap to
// measure a song's BPM) — same underlying math, different use of the result.
const MAX_TAPS = 8;
const RESET_GAP_MS = 2000;

export function useTapTempo() {
  const tapTimesRef = useRef<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);

  const tap = useCallback(() => {
    const now = performance.now();
    const taps = tapTimesRef.current;
    if (taps.length > 0 && now - taps[taps.length - 1] > RESET_GAP_MS) {
      taps.length = 0;
    }
    taps.push(now);
    if (taps.length > MAX_TAPS) taps.shift();
    setTapCount(taps.length);

    if (taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      setBpm(Math.round(60000 / avgMs));
    }
  }, []);

  const reset = useCallback(() => {
    tapTimesRef.current = [];
    setBpm(null);
    setTapCount(0);
  }, []);

  return { bpm, tapCount, tap, reset };
}
