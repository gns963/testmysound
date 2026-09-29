"use client";

import { useEffect, useRef, useState } from "react";
import { supportsVibration } from "@/lib/platform";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const PATTERNS = [
  { id: "short", label: "Short pulse", pattern: [200] },
  { id: "double", label: "Double pulse", pattern: [150, 100, 150] },
  { id: "long", label: "Long pulse", pattern: [1000] },
  { id: "heartbeat", label: "Heartbeat", pattern: [100, 100, 100, 300] },
  { id: "sos", label: "SOS pattern", pattern: [100, 100, 100, 100, 100, 300, 300, 100, 300, 100, 300, 300, 100, 100, 100, 100, 100] },
];

/** Vibration Test: triggers the Vibration API with several patterns. Android only — iOS has no web vibration API. */
export function VibrationTest() {
  const [supported, setSupported] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // One-time feature-detect after mount, matching SpeakerCleaner's
    // supportsVibration() pattern — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (supportsVibration()) setSupported(true);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      // Only cancel if we actually started vibrating — calling vibrate(0)
      // unconditionally can log a spurious "blocked" warning in some
      // browsers when nothing was ever triggered.
      if (activeRef.current) {
        navigator.vibrate?.(0);
        activeRef.current = false;
      }
    };
  }, []);

  function trigger(id: string, pattern: number[]) {
    if (typeof navigator === "undefined" || !navigator.vibrate) return;
    navigator.vibrate(pattern);
    activeRef.current = true;
    setActiveId(id);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    const totalMs = pattern.reduce((a, b) => a + b, 0);
    timeoutRef.current = window.setTimeout(() => {
      activeRef.current = false;
      setActiveId((current) => (current === id ? null : current));
    }, totalMs);
  }

  function stop() {
    navigator.vibrate?.(0);
    activeRef.current = false;
    setActiveId(null);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  if (!supported) {
    return (
      <ToolShell>
        <p className="text-text text-sm font-medium">Vibration isn&apos;t supported on this device or browser.</p>
        <p className="text-muted max-w-sm text-center text-sm">
          This is most commonly seen on iPhone and iPad — Safari on iOS doesn&apos;t expose a vibration API to
          websites at all. Try an Android phone with Chrome or Firefox instead.
        </p>
      </ToolShell>
    );
  }

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Tap a pattern to feel it — hold the phone in your hand rather than leaving it flat on a desk.
      </p>

      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3" aria-live="polite">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => trigger(p.id, p.pattern)}
            aria-pressed={activeId === p.id}
            className={`rounded-xl border p-3 text-sm font-medium transition-colors ${
              activeId === p.id ? "border-primary bg-primary/10 text-primary" : "border-border text-text hover:border-primary/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={stop} className="text-muted hover:text-text text-sm">
        Stop
      </button>
    </ToolShell>
  );
}
