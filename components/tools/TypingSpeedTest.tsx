"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { generateWordStream, type TypingDifficulty } from "@/lib/typingWordLists";
import { readLocalStorageNumber, writeLocalStorage } from "@/lib/safeStorage";

const DURATIONS = [15, 30, 60];
const RENDER_AHEAD_CHARS = 200;

const IMPROVEMENT_TIPS = [
  "Slow down slightly if your accuracy is under 90% — net WPM rewards correct keystrokes, not raw speed.",
  "Keep your eyes on the text, not the keyboard, once you know the general key layout.",
  "Rest your fingers on the home row (ASDF/JKL;) between words instead of hunting for each key.",
  "Practice in short, frequent sessions rather than one long one — typing speed builds up gradually.",
  "If one specific letter keeps tripping you up, deliberately practice words containing it.",
];

function bestKey(duration: number, difficulty: TypingDifficulty) {
  return `typing-best-${duration}-${difficulty}`;
}

type Status = "idle" | "running" | "finished";
type Result = { wpm: number; accuracy: number; errors: number; isNewBest: boolean };

/** Typing Speed Test: 15/30/60s, easy/medium word sets, net WPM + accuracy + errors, no paste allowed. */
export function TypingSpeedTest() {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<TypingDifficulty>("easy");
  const [status, setStatus] = useState<Status>("idle");
  const [targetText, setTargetText] = useState(() => generateWordStream("easy"));
  const [typedValue, setTypedValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [result, setResult] = useState<Result | null>(null);
  const [best, setBest] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const startTimeRef = useRef(0);
  const totalKeystrokesRef = useRef(0);
  const correctKeystrokesRef = useRef(0);
  const endTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // One-time read of localStorage for the newly selected duration/difficulty
    // — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBest(readLocalStorageNumber(bestKey(duration, difficulty)));
  }, [duration, difficulty]);

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
    const minutes = duration / 60;
    const correctChars = correctKeystrokesRef.current;
    const totalChars = totalKeystrokesRef.current;
    const wpm = Math.round(correctChars / 5 / minutes);
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const errors = totalChars - correctChars;
    const previousBest = readLocalStorageNumber(bestKey(duration, difficulty));
    const isNewBest = previousBest === null || wpm > previousBest;
    if (isNewBest) {
      writeLocalStorage(bestKey(duration, difficulty), String(wpm));
      setBest(wpm);
    }
    setResult({ wpm, accuracy, errors, isNewBest });
    setStatus("finished");
  }, [duration, difficulty, clearTimers]);

  const beginTiming = useCallback(() => {
    setStatus("running");
    startTimeRef.current = performance.now();
    totalKeystrokesRef.current = 0;
    correctKeystrokesRef.current = 0;
    setTimeLeft(duration);
    endTimeoutRef.current = window.setTimeout(finish, duration * 1000);
    tickIntervalRef.current = window.setInterval(() => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      setTimeLeft(Math.max(0, duration - elapsed));
    }, 100);
  }, [duration, finish]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === "finished") return;
    const nextValue = e.target.value;
    const prevValue = typedValue;

    if (status === "idle" && nextValue.length > 0) beginTiming();

    if (nextValue.length > prevValue.length) {
      for (let i = prevValue.length; i < nextValue.length; i++) {
        totalKeystrokesRef.current += 1;
        if (nextValue[i] === targetText[i]) correctKeystrokesRef.current += 1;
      }
    }
    // Backspaces (nextValue shorter than prevValue) intentionally leave the
    // running totals untouched — a corrected mistake still counts once
    // toward accuracy/errors, matching how the page's content describes it.

    setTypedValue(nextValue);
  }

  const newRound = useCallback(
    (nextDuration: number, nextDifficulty: TypingDifficulty) => {
      clearTimers();
      setStatus("idle");
      setResult(null);
      setTypedValue("");
      setTimeLeft(nextDuration);
      setTargetText(generateWordStream(nextDifficulty));
      window.setTimeout(() => inputRef.current?.focus(), 0);
    },
    [clearTimers],
  );

  function changeDuration(value: number) {
    if (status === "running") return;
    setDuration(value);
    newRound(value, difficulty);
  }

  function changeDifficulty(value: TypingDifficulty) {
    if (status === "running") return;
    setDifficulty(value);
    newRound(duration, value);
  }

  const visibleEnd = Math.min(targetText.length, typedValue.length + RENDER_AHEAD_CHARS);
  const characters = useMemo(() => targetText.slice(0, visibleEnd).split(""), [targetText, visibleEnd]);

  return (
    <ToolShell>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DURATIONS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => changeDuration(d)}
            aria-pressed={duration === d}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              duration === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
            }`}
          >
            {d}s
          </button>
        ))}
        <span className="text-border" aria-hidden="true">
          |
        </span>
        {(["easy", "medium"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => changeDifficulty(d)}
            aria-pressed={difficulty === d}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium capitalize ${
              difficulty === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {status !== "finished" && (
        <>
          <p className="text-muted text-sm" aria-live="polite">
            {status === "idle" ? "Click the box below and start typing" : `Time left: ${Math.ceil(timeLeft)}s`}
          </p>

          <div
            onClick={() => inputRef.current?.focus()}
            className="border-border bg-bg w-full max-w-xl cursor-text rounded-xl border p-4 text-left font-mono text-base leading-relaxed"
          >
            {characters.map((char, i) => {
              let cls = "text-muted";
              if (i < typedValue.length) {
                cls = typedValue[i] === char ? "text-accent" : "text-danger bg-danger/10";
              } else if (i === typedValue.length) {
                cls = "text-text underline";
              }
              return (
                <span key={i} className={cls}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={typedValue}
            onChange={handleChange}
            onPaste={(e) => e.preventDefault()}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Type the text shown above"
            className="border-border bg-surface text-text focus:border-primary w-full max-w-xl rounded-full border px-4 py-2.5 text-sm outline-none"
            placeholder="Start typing here…"
          />

          {best !== null && (
            <p className="text-muted text-xs">
              Your best for {duration}s / {difficulty}: {best} WPM
            </p>
          )}
        </>
      )}

      {status === "finished" && result && (
        <div className="flex w-full max-w-sm flex-col items-center gap-3 text-center" aria-live="polite">
          <p className="text-text text-5xl font-extrabold tabular-nums">{result.wpm}</p>
          <p className="text-muted text-sm">
            WPM · {result.accuracy}% accuracy · {result.errors} errors
          </p>
          {result.isNewBest && <p className="text-accent text-sm font-semibold">New best for this mode!</p>}

          <div className="border-border bg-surface w-full rounded-xl border p-4 text-left">
            <p className="text-text mb-2 text-xs font-bold tracking-wide uppercase">Tips to improve</p>
            <ul className="text-muted list-inside list-disc space-y-1 text-xs">
              {IMPROVEMENT_TIPS.slice(0, 3).map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => newRound(duration, difficulty)}
            className="bg-primary hover:bg-primary-strong rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      )}
    </ToolShell>
  );
}
