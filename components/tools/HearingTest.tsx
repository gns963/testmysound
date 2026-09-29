"use client";

import { useState } from "react";
import type { Program } from "@/lib/audio/types";
import { useToolRunner } from "@/lib/audio/useToolRunner";
import { formatHz } from "@/lib/format";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const FREQ_STEPS = [
  8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000,
  19000,
];
const STEP_DURATION_MS = 1500;

const PROGRAM: Program = FREQ_STEPS.map((freq) => ({
  kind: "tone",
  label: `${freq} Hz`,
  freq,
  duration: STEP_DURATION_MS,
}));

// Rough, widely-cited pattern of age-related high-frequency hearing decline
// (presbycusis) — presented as a hedged "typical range," never a diagnosis or
// a precise calculated age.
const AGE_BANDS: { min: number; label: string }[] = [
  { min: 17000, label: "under 20s" },
  { min: 15000, label: "20s-30s" },
  { min: 12000, label: "30s-50s" },
  { min: 9000, label: "50s-60s" },
  { min: 0, label: "60s+" },
];

function bandFor(freq: number): string {
  return (
    AGE_BANDS.find((b) => freq >= b.min)?.label ??
    AGE_BANDS[AGE_BANDS.length - 1].label
  );
}

/** Tool 12 (blueprint §4.4): ascending 8kHz-19kHz ladder; honest "typical range," not a diagnosis. */
export function HearingTest() {
  const [capturedFreq, setCapturedFreq] = useState<number | null>(null);
  const runner = useToolRunner({
    tool: "hearing-test",
    mode: "ladder",
    buildProgram: () => PROGRAM,
  });
  const running = runner.status === "running";
  const showResult = runner.status === "complete";

  function handleStart() {
    setCapturedFreq(null);
    runner.start();
  }

  function handleCantHear() {
    setCapturedFreq(FREQ_STEPS[runner.stageIndex]);
    runner.stop();
  }

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Not a medical or calibrated hearing test. If you&apos;re concerned about
        your hearing, see an audiologist.
      </p>

      {!running && !showResult && (
        <button
          type="button"
          onClick={handleStart}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Start
        </button>
      )}

      {running && (
        <div className="flex flex-col items-center gap-3">
          <p
            className="text-text text-4xl font-semibold tabular-nums"
            aria-live="polite"
          >
            {formatHz(FREQ_STEPS[runner.stageIndex] ?? FREQ_STEPS[0])}
          </p>
          <button
            type="button"
            onClick={handleCantHear}
            className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            I can&apos;t hear this anymore
          </button>
          <button
            type="button"
            onClick={runner.stop}
            className="text-muted hover:text-text text-sm"
          >
            Stop
          </button>
        </div>
      )}

      {showResult && (
        <div className="flex flex-col items-center gap-3 text-center">
          {capturedFreq ? (
            <>
              <p className="text-text text-sm">
                You stopped hearing tones around {formatHz(capturedFreq)}.
              </p>
              <p className="text-muted text-sm">
                That&apos;s typically in the range for people in their{" "}
                <strong>{bandFor(capturedFreq)}</strong> — but speaker quality,
                volume and room noise all affect this, so treat it as a rough
                guide only.
              </p>
            </>
          ) : (
            <p className="text-text text-sm">
              You could hear the full range tested, up to 19 kHz — that&apos;s
              at the top of the typical range.
            </p>
          )}
          <button
            type="button"
            onClick={handleStart}
            className="bg-primary hover:bg-primary-strong rounded-full px-4 py-1.5 text-sm font-medium text-white"
          >
            Test again
          </button>
        </div>
      )}
    </ToolShell>
  );
}
