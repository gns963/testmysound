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
  { icon: "📵", label: "Hold earpiece facing down" },
];

const PROGRAM: Program = [
  {
    kind: "pulse",
    label: "Earpiece clean",
    freq: 220,
    gain: 0.4,
    onMs: 1200,
    offMs: 300,
    duration: 45_000,
  },
];

/**
 * Tool 3 (blueprint §4.3). Browsers play through the main loudspeaker, not the
 * earpiece — this tool is honest about that limit and gives the manual method
 * instead of pretending it can route audio to the earpiece driver.
 */
export function EarpieceSpeakerCleaner() {
  const runner = useToolRunner({
    tool: "earpiece-speaker-cleaner",
    mode: "earpiece",
    buildProgram: () => PROGRAM,
    maxCycles: MAX_CYCLES,
    cooldownMs: COOLDOWN_MS,
  });

  const running = runner.status === "running";
  const showResult = runner.status === "complete";
  const inCooldown = runner.status === "cooldown";

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="border-warn/40 bg-warn/10 text-text w-full rounded-xl border p-4 text-sm">
        <p className="font-medium">
          Heads up: this plays through your main speaker, not the earpiece.
        </p>
        <p className="text-muted mt-1">
          Browsers can&apos;t route audio to a phone&apos;s earpiece driver —
          only the main loudspeaker. For the earpiece itself, hold the phone
          close to your ear at max media volume and gently tap the earpiece
          grille, or run the main tone below with the phone held upside-down so
          the earpiece faces the floor.
        </p>
      </div>

      <ToolShell hint={<ChecklistPreflight items={CHECKLIST} />}>
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
    </div>
  );
}
