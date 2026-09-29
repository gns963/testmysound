"use client";

import type { Program } from "@/lib/audio/types";
import { useToolRunner } from "@/lib/audio/useToolRunner";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ToolRunControl } from "@/components/tools/shell/ToolRunControl";
import { ChecklistPreflight } from "@/components/tools/shell/ChecklistPreflight";
import { PostRunFeedback } from "@/components/tools/shell/PostRunFeedback";

const MAX_CYCLES = 3;
const COOLDOWN_MS = 60_000;

const CHECKLIST = [
  { icon: "🔊", label: "Volume max" },
  { icon: "🔕", label: "Silent off" },
  { icon: "⬇️", label: "Speaker facing down" },
];

const PROGRAM: Program = [
  {
    kind: "pulse",
    label: "Stage 1 of 3: Loosening",
    freq: 165,
    onMs: 1500,
    offMs: 300,
    duration: 30_000,
  },
  {
    kind: "sweep",
    label: "Stage 2 of 3: Sweeping",
    from: 100,
    to: 500,
    duration: 30_000,
  },
  {
    kind: "tone",
    label: "Stage 3 of 3: Final push",
    freq: 165,
    duration: 30_000,
  },
];

const TOTAL_STAGES = PROGRAM.length;

/** Tool 2 (blueprint §4.3): 3-stage program with a stage indicator. */
export function DeepSpeakerCleaner() {
  const runner = useToolRunner({
    tool: "deep-speaker-cleaner",
    mode: "deep-clean",
    buildProgram: () => PROGRAM,
    maxCycles: MAX_CYCLES,
    cooldownMs: COOLDOWN_MS,
  });

  const running = runner.status === "running";
  const showResult = runner.status === "complete";
  const inCooldown = runner.status === "cooldown";

  return (
    <ToolShell hint={<ChecklistPreflight items={CHECKLIST} />}>
      {running && (
        <p className="text-text text-sm font-medium" aria-live="polite">
          {runner.stageLabel ??
            `Stage ${runner.stageIndex + 1} of ${TOTAL_STAGES}`}
        </p>
      )}

      <ToolRunControl
        running={running}
        inCooldown={inCooldown}
        progressPct={runner.progressPct}
        secondsLeft={runner.secondsLeft}
        cooldownSecondsLeft={runner.cooldownSecondsLeft}
        maxCycles={MAX_CYCLES}
        onToggle={() => (running ? runner.stop() : runner.start())}
      />

      {showResult && (
        <PostRunFeedback
          feedbackGiven={runner.feedbackGiven}
          onFeedback={runner.submitFeedback}
          onRunAgain={runner.start}
        />
      )}
    </ToolShell>
  );
}
