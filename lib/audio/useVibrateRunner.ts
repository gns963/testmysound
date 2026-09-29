"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { detectDeviceType } from "@/lib/platform";
import {
  trackToolComplete,
  trackToolFeedback,
  trackToolStart,
  trackToolStopEarly,
} from "@/lib/analytics";

// Vibration-based run loop (blueprint §4.1: "Vibrate" mode, Android only —
// feature-detected and hidden elsewhere). Mirrors useToolRunner's shape so
// callers can drive the same ToolShell/BigStartButton/ProgressRing UI with
// either hook.
export type VibrateRunnerStatus = "idle" | "running" | "complete" | "cooldown";

function buildPattern(totalMs: number, onMs: number, offMs: number): number[] {
  const pattern: number[] = [];
  let t = 0;
  while (t < totalMs) {
    pattern.push(onMs);
    t += onMs;
    if (t >= totalMs) break;
    pattern.push(offMs);
    t += offMs;
  }
  return pattern;
}

type UseVibrateRunnerParams = {
  tool: string;
  mode: string;
  totalMs?: number;
  onMs?: number;
  offMs?: number;
  maxCycles?: number;
  cooldownMs?: number;
};

export function useVibrateRunner({
  tool,
  mode,
  totalMs = 60_000,
  onMs = 400,
  offMs = 200,
  maxCycles,
  cooldownMs = 60_000,
}: UseVibrateRunnerParams) {
  const [status, setStatus] = useState<VibrateRunnerStatus>("idle");
  const [progressPct, setProgressPct] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const tickTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  // navigator.vibrate(0) itself needs a prior user gesture in some browsers —
  // calling it unconditionally on unmount (e.g. React's dev-mode mount ->
  // unmount -> remount cycle) logs a spurious "blocked" warning even when
  // vibration was never started. Only cancel it if we actually started it.
  const activeRef = useRef(false);

  const clearTick = useCallback(() => {
    if (tickTimerRef.current !== null) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
  }, []);

  const clearCooldown = useCallback(() => {
    if (cooldownTimerRef.current !== null) {
      window.clearInterval(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  }, []);

  const finish = useCallback(
    (completedNaturally: boolean) => {
      clearTick();
      if (activeRef.current) {
        navigator.vibrate?.(0);
        activeRef.current = false;
      }
      const elapsedMs = Math.min(totalMs, Date.now() - startedAtRef.current);

      if (completedNaturally) {
        trackToolComplete({ tool, duration: Math.round(totalMs / 1000) });
      } else {
        trackToolStopEarly({
          tool,
          secondsPlayed: Math.round(elapsedMs / 1000),
        });
      }

      setCycleCount((c) => {
        const next = c + 1;
        if (maxCycles && next >= maxCycles) {
          setStatus("cooldown");
          setCooldownSecondsLeft(Math.ceil(cooldownMs / 1000));
          clearCooldown();
          cooldownTimerRef.current = window.setInterval(() => {
            setCooldownSecondsLeft((s) => {
              if (s <= 1) {
                clearCooldown();
                setStatus("idle");
                return 0;
              }
              return s - 1;
            });
          }, 1000);
          return 0;
        }
        setStatus("complete");
        return next;
      });
    },
    [clearTick, clearCooldown, cooldownMs, maxCycles, tool, totalMs],
  );

  useEffect(() => {
    return () => {
      clearTick();
      clearCooldown();
      if (activeRef.current) {
        navigator.vibrate?.(0);
        activeRef.current = false;
      }
    };
  }, [clearTick, clearCooldown]);

  const start = useCallback(() => {
    if (status === "running" || status === "cooldown") return;
    if (typeof navigator.vibrate !== "function") return;

    setFeedbackGiven(false);
    setStatus("running");
    setProgressPct(0);
    setSecondsLeft(Math.ceil(totalMs / 1000));
    startedAtRef.current = Date.now();

    trackToolStart({ tool, mode, deviceType: detectDeviceType() });
    navigator.vibrate(buildPattern(totalMs, onMs, offMs));
    activeRef.current = true;

    clearTick();
    tickTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      if (elapsed >= totalMs) {
        setProgressPct(100);
        setSecondsLeft(0);
        finish(true);
        return;
      }
      setProgressPct((elapsed / totalMs) * 100);
      setSecondsLeft(Math.max(0, Math.ceil((totalMs - elapsed) / 1000)));
    }, 100);
  }, [status, tool, mode, totalMs, onMs, offMs, clearTick, finish]);

  const stop = useCallback(() => {
    if (status !== "running") return;
    finish(false);
  }, [status, finish]);

  const submitFeedback = useCallback(
    (helped: boolean) => {
      trackToolFeedback({ tool, helped });
      setFeedbackGiven(true);
    },
    [tool],
  );

  return {
    status,
    progressPct,
    secondsLeft,
    cycleCount,
    cooldownSecondsLeft,
    feedbackGiven,
    start,
    stop,
    submitFeedback,
  };
}
