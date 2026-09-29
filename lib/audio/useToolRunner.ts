"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getEngine,
  runProgram,
  type ProgramRunHandle,
} from "@/lib/audio/engine";
import { programDuration, type Program, type Stage } from "@/lib/audio/types";
import {
  releaseScreenWakeLock,
  requestScreenWakeLock,
} from "@/lib/audio/wakeLock";
import { detectDeviceType } from "@/lib/platform";
import {
  trackToolComplete,
  trackToolFeedback,
  trackToolStart,
  trackToolStopEarly,
} from "@/lib/analytics";

export type ToolRunnerStatus = "idle" | "running" | "complete" | "cooldown";

type UseToolRunnerParams = {
  /** Analytics tool identifier, e.g. "speaker-cleaner". */
  tool: string;
  /** Current mode label for analytics, e.g. "water". */
  mode: string;
  buildProgram: () => Program;
  /** After this many completed cycles, force a cooldown. Omit for no cap. */
  maxCycles?: number;
  cooldownMs?: number;
};

export function useToolRunner({
  tool,
  mode,
  buildProgram,
  maxCycles,
  cooldownMs = 60_000,
}: UseToolRunnerParams) {
  const [status, setStatus] = useState<ToolRunnerStatus>("idle");
  const [progressPct, setProgressPct] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageLabel, setStageLabel] = useState<string | undefined>(undefined);
  const [cycleCount, setCycleCount] = useState(0);
  const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleRef = useRef<ProgramRunHandle | null>(null);
  const elapsedMsRef = useRef(0);
  const totalMsRef = useRef(0);
  const cooldownTimerRef = useRef<number | null>(null);

  const clearCooldownTimer = useCallback(() => {
    if (cooldownTimerRef.current !== null) {
      window.clearInterval(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      handleRef.current?.cancel();
      clearCooldownTimer();
      void releaseScreenWakeLock();
    };
  }, [clearCooldownTimer]);

  const start = useCallback(() => {
    if (status === "running" || status === "cooldown") return;

    const program = buildProgram();
    const total = programDuration(program);
    totalMsRef.current = total;
    elapsedMsRef.current = 0;

    setFeedbackGiven(false);
    setStatus("running");
    setProgressPct(0);
    setSecondsLeft(Math.ceil(total / 1000));
    setStageIndex(0);
    setStageLabel(program[0]?.label);

    trackToolStart({ tool, mode, deviceType: detectDeviceType() });
    void requestScreenWakeLock();

    const engine = getEngine();
    handleRef.current = runProgram(engine, program, {
      onStageStart: (index: number, stage: Stage) => {
        setStageIndex(index);
        setStageLabel(stage.label);
      },
      onProgress: (elapsedMs: number, totalMs: number) => {
        elapsedMsRef.current = elapsedMs;
        setProgressPct(
          totalMs === 0 ? 100 : Math.min(100, (elapsedMs / totalMs) * 100),
        );
        setSecondsLeft(Math.max(0, Math.ceil((totalMs - elapsedMs) / 1000)));
      },
      onComplete: (completedNaturally: boolean) => {
        void releaseScreenWakeLock();
        handleRef.current = null;

        if (completedNaturally) {
          trackToolComplete({
            tool,
            duration: Math.round(totalMsRef.current / 1000),
          });
        } else {
          trackToolStopEarly({
            tool,
            secondsPlayed: Math.round(elapsedMsRef.current / 1000),
          });
        }

        const nextCycleCount = cycleCount + 1;
        setCycleCount(nextCycleCount);

        if (maxCycles && nextCycleCount >= maxCycles) {
          setStatus("cooldown");
          setCooldownSecondsLeft(Math.ceil(cooldownMs / 1000));
          clearCooldownTimer();
          cooldownTimerRef.current = window.setInterval(() => {
            setCooldownSecondsLeft((s) => {
              if (s <= 1) {
                clearCooldownTimer();
                setStatus("idle");
                setCycleCount(0);
                return 0;
              }
              return s - 1;
            });
          }, 1000);
        } else {
          setStatus("complete");
        }
      },
    });
  }, [
    status,
    buildProgram,
    tool,
    mode,
    cycleCount,
    maxCycles,
    cooldownMs,
    clearCooldownTimer,
  ]);

  const stop = useCallback(() => {
    handleRef.current?.cancel();
  }, []);

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
    stageIndex,
    stageLabel,
    cycleCount,
    cooldownSecondsLeft,
    feedbackGiven,
    start,
    stop,
    submitFeedback,
  };
}
