"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { detectDeviceType } from "@/lib/platform";
import { trackToolStart, trackToolStopEarly } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type Side = "left" | "center" | "right" | "alternate";

const SESSION_CAP_MS = 120_000;
const ALTERNATE_INTERVAL_MS = 1000;
const TONE_FREQ = 440;

const SIDE_OPTIONS: { id: Side; label: string }[] = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
  { id: "alternate", label: "Alternate" },
];

function panFor(side: Exclude<Side, "alternate">): number {
  return side === "left" ? -1 : side === "right" ? 1 : 0;
}

type ContinuousToneHandle = ReturnType<
  ReturnType<typeof getEngine>["startContinuousTone"]
>;

/** Tool 5 (blueprint §4.3): Left / Center / Right / Alternate speaker test. */
export function StereoTest() {
  const [selected, setSelected] = useState<Side | null>(null);
  const [highlightSide, setHighlightSide] = useState<
    "left" | "center" | "right"
  >("center");

  const toneRef = useRef<ContinuousToneHandle | null>(null);
  const alternateTimerRef = useRef<number | null>(null);
  const sessionCapTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (alternateTimerRef.current !== null) {
      window.clearInterval(alternateTimerRef.current);
      alternateTimerRef.current = null;
    }
    if (sessionCapTimerRef.current !== null) {
      window.clearTimeout(sessionCapTimerRef.current);
      sessionCapTimerRef.current = null;
    }
  }, []);

  const stopAll = useCallback(
    (reportStopEarly: boolean) => {
      toneRef.current?.stop();
      toneRef.current = null;
      clearTimers();
      if (reportStopEarly && selected) {
        trackToolStopEarly({
          tool: "left-right-speaker-test",
          secondsPlayed: Math.round((Date.now() - startedAtRef.current) / 1000),
        });
      }
      setSelected(null);
      setHighlightSide("center");
    },
    [clearTimers, selected],
  );

  useEffect(() => {
    return () => {
      toneRef.current?.stop();
      clearTimers();
    };
  }, [clearTimers]);

  const handleSelect = useCallback(
    (side: Side) => {
      if (selected === side) {
        stopAll(true);
        return;
      }

      trackToolStart({
        tool: "left-right-speaker-test",
        mode: side,
        deviceType: detectDeviceType(),
      });

      clearTimers();

      if (!toneRef.current) {
        toneRef.current = getEngine().startContinuousTone({
          freq: TONE_FREQ,
          gain: 0.5,
          pan: side === "alternate" ? -1 : panFor(side),
        });
        startedAtRef.current = Date.now();
        sessionCapTimerRef.current = window.setTimeout(
          () => stopAll(false),
          SESSION_CAP_MS,
        );
      } else if (side !== "alternate") {
        toneRef.current.setPan(panFor(side));
      }

      if (side === "alternate") {
        let toRight = true;
        toneRef.current.setPan(-1);
        setHighlightSide("left");
        alternateTimerRef.current = window.setInterval(() => {
          toRight = !toRight;
          toneRef.current?.setPan(toRight ? 1 : -1);
          setHighlightSide(toRight ? "right" : "left");
        }, ALTERNATE_INTERVAL_MS);
      } else {
        setHighlightSide(side);
      }

      setSelected(side);
    },
    [selected, stopAll, clearTimers],
  );

  const running = selected !== null;

  return (
    <ToolShell>
      <DeviceIllustration highlightSide={highlightSide} active={running} />

      <div className="flex flex-wrap justify-center gap-2">
        {SIDE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            aria-pressed={selected === opt.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected === opt.id
                ? "border-primary bg-primary text-white"
                : "border-border text-text hover:border-primary hover:text-primary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="text-muted text-center text-sm">
        Only one side playing?{" "}
        <Link
          href="/blog/one-speaker-louder-than-the-other"
          className="text-primary hover:underline"
        >
          See troubleshooting steps →
        </Link>
      </p>
    </ToolShell>
  );
}

function DeviceIllustration({
  highlightSide,
  active,
}: {
  highlightSide: "left" | "center" | "right";
  active: boolean;
}) {
  const leftOn =
    active && (highlightSide === "left" || highlightSide === "center");
  const rightOn =
    active && (highlightSide === "right" || highlightSide === "center");

  return (
    <svg
      width="220"
      height="140"
      viewBox="0 0 220 140"
      aria-hidden="true"
      className="text-border"
    >
      <rect
        x="30"
        y="10"
        width="160"
        height="120"
        rx="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="66"
        cy="110"
        r="10"
        fill={leftOn ? "var(--primary)" : "var(--border)"}
      />
      <circle
        cx="154"
        cy="110"
        r="10"
        fill={rightOn ? "var(--primary)" : "var(--border)"}
      />
      <rect x="90" y="24" width="40" height="6" rx="3" fill="currentColor" />
    </svg>
  );
}
