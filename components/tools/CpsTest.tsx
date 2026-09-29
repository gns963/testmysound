"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ModeTabs } from "@/components/tools/shell/ModeTabs";
import { readLocalStorageNumber, writeLocalStorage } from "@/lib/safeStorage";

const MODES = [1, 5, 10, 30, 60];

type Status = "idle" | "running" | "finished";
type Result = { cps: number; clicks: number; mode: number; isNewBest: boolean };

function bestKey(mode: number) {
  return `cps-best-${mode}`;
}

/** CPS (Click Speed) Test: click as fast as possible for a chosen duration. Local best only, no leaderboard. */
export function CpsTest({ sharedResult }: { sharedResult?: { score: number; mode: number } }) {
  const [mode, setMode] = useState(5);
  const [status, setStatus] = useState<Status>("idle");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode);
  const [result, setResult] = useState<Result | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  const clicksRef = useRef(0);
  const startTimeRef = useRef(0);
  const endTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // One-time read of localStorage for the newly selected mode — not a
    // cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(readLocalStorageNumber(bestKey(mode)));
  }, [mode]);

  const clearTimers = useCallback(() => {
    if (endTimeoutRef.current !== null) {
      window.clearTimeout(endTimeoutRef.current);
      endTimeoutRef.current = null;
    }
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const finish = useCallback(() => {
    clearTimers();
    const finalClicks = clicksRef.current;
    const cps = Math.round((finalClicks / mode) * 100) / 100;
    const previousBest = readLocalStorageNumber(bestKey(mode));
    const isNewBest = previousBest === null || cps > previousBest;
    if (isNewBest) {
      writeLocalStorage(bestKey(mode), String(cps));
      setBest(cps);
    }
    setResult({ cps, clicks: finalClicks, mode, isNewBest });
    setStatus("finished");
  }, [mode, clearTimers]);

  const handleClick = useCallback(() => {
    if (status === "finished") return;
    if (status === "idle") {
      setStatus("running");
      clicksRef.current = 1;
      setClicks(1);
      startTimeRef.current = performance.now();
      setTimeLeft(mode);
      endTimeoutRef.current = window.setTimeout(finish, mode * 1000);
      tickIntervalRef.current = window.setInterval(() => {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        setTimeLeft(Math.max(0, mode - elapsed));
      }, 100);
    } else {
      clicksRef.current += 1;
      setClicks(clicksRef.current);
    }
  }, [status, mode, finish]);

  const reset = useCallback(() => {
    clearTimers();
    clicksRef.current = 0;
    setClicks(0);
    setTimeLeft(mode);
    setStatus("idle");
    setResult(null);
    setShareState("idle");
  }, [mode, clearTimers]);

  function changeMode(nextMode: number) {
    if (status === "running") return;
    setMode(nextMode);
    setTimeLeft(nextMode);
    setStatus("idle");
    setResult(null);
  }

  async function share() {
    if (!result) return;
    const url = new URL(window.location.href);
    url.search = `?score=${result.cps}&mode=${result.mode}`;
    const shareUrl = url.toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My CPS Test result",
          text: `I scored ${result.cps} clicks per second in the ${result.mode}s test!`,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled, or share unsupported for this data — fall through to clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // Clipboard unavailable — nothing more we can do silently.
    }
  }

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={MODES.map((m) => ({ id: String(m), label: `${m}s` }))}
          active={String(mode)}
          onChange={(id) => changeMode(Number(id))}
          disabled={status === "running"}
        />
      }
    >
      {sharedResult && status === "idle" && (
        <div className="border-primary/20 bg-primary/5 text-text w-full max-w-sm rounded-xl border p-3 text-center text-xs">
          A shared result: <strong>{sharedResult.score} CPS</strong> in the {sharedResult.mode}s test — see if you can
          beat it!
        </div>
      )}

      {status !== "finished" && (
        <>
          <p className="text-muted text-sm" aria-live="polite">
            {status === "idle" ? `Click to start the ${mode}s test` : `Time left: ${timeLeft.toFixed(1)}s`}
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="bg-primary hover:bg-primary-strong flex h-48 w-48 flex-col items-center justify-center rounded-full text-white shadow-lg transition-transform select-none active:scale-95"
          >
            <span className="text-4xl font-extrabold tabular-nums">{clicks}</span>
            <span className="text-sm">clicks</span>
          </button>
          {best !== null && (
            <p className="text-muted text-xs">
              Your best for {mode}s: {best} CPS
            </p>
          )}
        </>
      )}

      {status === "finished" && result && (
        <div className="flex flex-col items-center gap-3 text-center" aria-live="polite">
          <p className="text-text text-5xl font-extrabold tabular-nums">{result.cps}</p>
          <p className="text-muted text-sm">
            CPS · {result.clicks} clicks in {result.mode}s
          </p>
          {result.isNewBest && <p className="text-accent text-sm font-semibold">New best for this mode!</p>}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="bg-primary hover:bg-primary-strong rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => void share()}
              className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-2 text-sm font-medium"
            >
              {shareState === "copied" ? "Link copied!" : "Share result"}
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
