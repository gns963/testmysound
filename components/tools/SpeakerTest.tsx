"use client";

import { useState } from "react";
import type { Program } from "@/lib/audio/types";
import { useToolRunner } from "@/lib/audio/useToolRunner";
import { useSweepRunner } from "@/lib/audio/useSweepRunner";
import { formatHz } from "@/lib/format";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ToolRunControl } from "@/components/tools/shell/ToolRunControl";
import { ModeTabs, type ModeOption } from "@/components/tools/shell/ModeTabs";
import { PostRunFeedback } from "@/components/tools/shell/PostRunFeedback";
import { FrequencyChipRow } from "@/components/tools/shell/FrequencyChipRow";

type SubMode = "quick" | "sweep" | "frequencies";

const SUB_MODES: ModeOption[] = [
  { id: "quick", label: "Quick test" },
  { id: "sweep", label: "Full sweep" },
  { id: "frequencies", label: "Frequencies" },
];

// TODO: swap/augment the "Quick test" low/mid/high tone sequence with a real
// recorded voice sample once one is produced (blueprint §4.3 calls for
// "voice sample + tone"); a synthesized sequence is an honest placeholder in
// the meantime — no fabricated audio claims either way.
const QUICK_PROGRAM: Program = [
  { kind: "tone", label: "Low", freq: 250, duration: 1200 },
  { kind: "tone", label: "Mid", freq: 1000, duration: 1200 },
  { kind: "tone", label: "High", freq: 6000, duration: 1200 },
];

const FULL_SWEEP_RANGE = { from: 20, to: 20_000, durationMs: 20_000 };
const getFullSweepRange = () => FULL_SWEEP_RANGE;

const FREQUENCY_CHIPS = [50, 100, 250, 500, 1000, 4000, 8000, 12000, 16000];

/** Tool 6 (blueprint §4.3): Quick test, full 20Hz-20kHz sweep, individual frequency chips. */
export function SpeakerTest() {
  const [subMode, setSubMode] = useState<SubMode>("quick");

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={SUB_MODES}
          active={subMode}
          onChange={(id) => setSubMode(id as SubMode)}
        />
      }
    >
      {subMode === "quick" && <QuickTest />}
      {subMode === "sweep" && <FullSweepTest />}
      {subMode === "frequencies" && (
        <FrequencyChipRow tool="speaker-test" frequencies={FREQUENCY_CHIPS} />
      )}
    </ToolShell>
  );
}

function QuickTest() {
  const runner = useToolRunner({
    tool: "speaker-test",
    mode: "quick",
    buildProgram: () => QUICK_PROGRAM,
  });
  const running = runner.status === "running";

  return (
    <>
      <ToolRunControl
        running={running}
        inCooldown={false}
        progressPct={runner.progressPct}
        secondsLeft={runner.secondsLeft}
        cooldownSecondsLeft={0}
        onToggle={() => (running ? runner.stop() : runner.start())}
      />
      {runner.status === "complete" && (
        <PostRunFeedback
          feedbackGiven={runner.feedbackGiven}
          onFeedback={runner.submitFeedback}
          onRunAgain={runner.start}
        />
      )}
    </>
  );
}

function FullSweepTest() {
  const [capturedFreq, setCapturedFreq] = useState<number | null>(null);
  const runner = useSweepRunner({
    tool: "speaker-test",
    mode: "full-sweep",
    getRange: getFullSweepRange,
  });
  const running = runner.status === "running";

  function handleStart() {
    setCapturedFreq(null);
    runner.start();
  }

  function handleStoppedHearing() {
    setCapturedFreq(runner.liveFreq);
    runner.stop();
  }

  return (
    <>
      <ToolRunControl
        running={running}
        inCooldown={false}
        progressPct={runner.progressPct}
        secondsLeft={runner.secondsLeft}
        cooldownSecondsLeft={0}
        onToggle={() => (running ? runner.stop() : handleStart())}
      />

      {running && (
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-text text-2xl font-semibold tabular-nums"
            aria-live="polite"
          >
            {formatHz(runner.liveFreq)}
          </p>
          <button
            type="button"
            onClick={handleStoppedHearing}
            className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            I stopped hearing it
          </button>
        </div>
      )}

      {runner.status === "complete" && (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-text text-sm">
            {capturedFreq
              ? `You stopped hearing sound around ${formatHz(capturedFreq)}.`
              : "You could hear the full sweep, up to 20 kHz."}
          </p>
          <p className="text-muted max-w-sm text-xs">
            This isn&apos;t a calibrated hearing test — your device&apos;s
            speaker, browser volume and room noise all affect the result.
          </p>
          <PostRunFeedback
            feedbackGiven={runner.feedbackGiven}
            onFeedback={runner.submitFeedback}
            onRunAgain={handleStart}
          />
        </div>
      )}
    </>
  );
}
