"use client";

import { useState } from "react";
import { useTuner, type TunerErrorKind } from "@/lib/audio/useTuner";
import { TUNER_PRESETS, type TunerPresetId } from "@/lib/audio/tunerPresets";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ModeTabs } from "@/components/tools/shell/ModeTabs";

const ERROR_COPY: Record<TunerErrorKind, { title: string; fix: string }> = {
  denied: {
    title: "Microphone permission was denied.",
    fix: "Chrome/Edge: click the camera/mic icon in the address bar and allow it. Firefox: click the mic icon in the address bar, allow, then reload. Safari (Mac): Safari menu → Settings for This Website → Microphone → Allow. iPhone/Android: check the browser's site permissions in your phone's Settings app too, then reload this page.",
  },
  "not-found": {
    title: "No microphone was found.",
    fix: "Check that a microphone is connected, or built in, and isn't disabled in your system's sound settings, then try again.",
  },
  "in-use": {
    title: "Your microphone is being used by another app.",
    fix: "Close other apps or browser tabs that might already be using the microphone — video calls, other tuner apps, recorders — then try again.",
  },
  unsupported: {
    title: "Your browser doesn't support microphone access.",
    fix: "This needs a modern browser (recent Chrome, Edge, Firefox or Safari) on a secure (https) page. Try updating your browser, or open this page in a different one.",
  },
  unknown: {
    title: "Couldn't access the microphone.",
    fix: "Try reloading the page. If it keeps failing, check your browser's site permissions for the microphone.",
  },
};

function needleColor(cents: number, inTune: boolean): string {
  if (inTune) return "var(--accent)";
  if (Math.abs(cents) <= 20) return "var(--warn)";
  return "var(--danger)";
}

/** Tuner: mic pitch detection, note name + cents needle, instrument presets. */
export function Tuner() {
  const [presetId, setPresetId] = useState<TunerPresetId>("chromatic");
  const { status, errorKind, reading, start, stop } = useTuner(presetId);
  const running = status === "active";

  const clampedCents = reading ? Math.max(-50, Math.min(50, reading.cents)) : 0;
  const needlePct = 50 + (clampedCents / 50) * 50;

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={TUNER_PRESETS.map((p) => ({ id: p.id, label: p.label }))}
          active={presetId}
          onChange={(id) => setPresetId(id as TunerPresetId)}
        />
      }
    >
      <p className="text-muted max-w-sm text-center text-xs">
        Your audio never leaves your device. Accuracy depends on your mic and background noise — play one note at a
        time in a quiet room for the best result.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Start tuner
        </button>
      )}

      {status === "requesting" && (
        <p className="text-muted text-sm" aria-live="polite">
          Requesting microphone access…
        </p>
      )}

      {status === "error" && (
        <div className="flex max-w-sm flex-col items-center gap-2 text-center" aria-live="polite">
          <p className="text-text text-sm font-medium">{ERROR_COPY[errorKind].title}</p>
          <p className="text-muted text-sm">{ERROR_COPY[errorKind].fix}</p>
          <button
            type="button"
            onClick={() => void start()}
            className="border-border text-text hover:border-primary hover:text-primary mt-2 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {running && (
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-1" aria-live="polite">
            <p className="text-text text-5xl font-extrabold tabular-nums">{reading ? reading.noteName : "—"}</p>
            <p className="text-muted text-sm">
              {reading ? `${reading.frequency.toFixed(1)} Hz · ${reading.cents > 0 ? "+" : ""}${reading.cents}¢` : "Listening…"}
            </p>
          </div>

          <div className="relative h-3 w-full max-w-xs rounded-full bg-bg">
            <div className="bg-accent/25 absolute inset-y-0 left-1/2 w-[12%] -translate-x-1/2 rounded-full" />
            <div
              className="absolute top-1/2 h-6 w-1.5 rounded-full transition-[left] duration-100"
              style={{
                left: `${needlePct}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: reading ? needleColor(reading.cents, reading.inTune) : "var(--border)",
              }}
            />
          </div>
          <div className="text-muted flex w-full max-w-xs justify-between text-[10px]">
            <span>Flat</span>
            <span>In tune</span>
            <span>Sharp</span>
          </div>

          <button type="button" onClick={stop} className="text-muted hover:text-text text-sm">
            Stop tuner
          </button>
        </div>
      )}
    </ToolShell>
  );
}
