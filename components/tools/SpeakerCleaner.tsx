"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Program } from "@/lib/audio/types";
import { useToolRunner } from "@/lib/audio/useToolRunner";
import { useVibrateRunner } from "@/lib/audio/useVibrateRunner";
import { supportsVibration } from "@/lib/platform";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ToolRunControl } from "@/components/tools/shell/ToolRunControl";
import { ModeTabs, type ModeOption } from "@/components/tools/shell/ModeTabs";
import { ChecklistPreflight } from "@/components/tools/shell/ChecklistPreflight";
import { PostRunFeedback } from "@/components/tools/shell/PostRunFeedback";

const CYCLE_DURATION_MS = 60_000;
const MAX_CYCLES = 3;
const COOLDOWN_MS = 60_000;

const CHECKLIST = [
  { icon: "🔊", label: "Volume max" },
  { icon: "🔕", label: "Silent off" },
  { icon: "⬇️", label: "Speaker facing down" },
];

export type CleanerMode = "water" | "dust" | "vibrate";

function buildWaterProgram(intense: boolean): Program {
  return [
    {
      kind: "pulse",
      label: intense ? "Intense water eject" : "Water eject",
      freq: 165,
      type: intense ? "square" : "sine",
      gain: intense ? 0.55 : 1,
      onMs: 1500,
      offMs: 300,
      duration: CYCLE_DURATION_MS,
    },
  ];
}

function buildDustProgram(): Program {
  return [
    {
      kind: "sweep",
      label: "Dust remover sweep",
      from: 200,
      to: 1000,
      loop: true,
      cycleMs: 1500,
      duration: CYCLE_DURATION_MS,
    },
  ];
}

/** Tool 1 (blueprint §4.3): Water eject (default), Dust, and Vibrate modes. */
export function SpeakerCleaner({
  defaultMode = "water",
  allowedModes = ["water", "dust", "vibrate"],
}: {
  defaultMode?: CleanerMode;
  allowedModes?: CleanerMode[];
}) {
  // supportsVibration() reads navigator, so it must stay false through the
  // server render and the client's first render (they must match) — the real
  // check runs in an effect after mount, matching blueprint §4.1's guidance to
  // feature-detect and hide the Vibrate tab rather than show a broken one.
  const [vibrateSupported, setVibrateSupported] = useState(false);
  useEffect(() => {
    // One-time read of a browser API after mount — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (supportsVibration()) setVibrateSupported(true);
  }, []);
  const vibrateAvailable = allowedModes.includes("vibrate") && vibrateSupported;
  const modes: ModeOption[] = useMemo(() => {
    const options: ModeOption[] = [];
    if (allowedModes.includes("water"))
      options.push({ id: "water", label: "Water" });
    if (allowedModes.includes("dust"))
      options.push({ id: "dust", label: "Dust" });
    if (vibrateAvailable) options.push({ id: "vibrate", label: "Vibrate" });
    return options;
  }, [allowedModes, vibrateAvailable]);

  const [mode, setMode] = useState<CleanerMode>(
    modes.some((m) => m.id === defaultMode)
      ? defaultMode
      : (modes[0]?.id as CleanerMode),
  );
  const [intense, setIntense] = useState(false);

  const audioRunner = useToolRunner({
    tool: "speaker-cleaner",
    mode: mode === "dust" ? "dust" : intense ? "water-intense" : "water",
    buildProgram: () =>
      mode === "dust" ? buildDustProgram() : buildWaterProgram(intense),
    maxCycles: MAX_CYCLES,
    cooldownMs: COOLDOWN_MS,
  });

  const vibrateRunner = useVibrateRunner({
    tool: "speaker-cleaner",
    mode: "vibrate",
    totalMs: CYCLE_DURATION_MS,
    maxCycles: MAX_CYCLES,
    cooldownMs: COOLDOWN_MS,
  });

  const runner = mode === "vibrate" ? vibrateRunner : audioRunner;
  const running = runner.status === "running";
  const showResult = runner.status === "complete";
  const inCooldown = runner.status === "cooldown";

  function handleModeChange(next: string) {
    if (running) return;
    setMode(next as CleanerMode);
  }

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={modes}
          active={mode}
          onChange={handleModeChange}
          disabled={running}
        />
      }
      hint={<ChecklistPreflight items={CHECKLIST} />}
    >
      {mode === "water" && !running && (
        <label className="text-muted flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={intense}
            onChange={(e) => setIntense(e.target.checked)}
            className="border-border h-4 w-4 rounded accent-[var(--primary)]"
          />
          Intense clean (louder, lower-pitched pulse)
        </label>
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
          extraLink={
            <Link
              href="/deep-speaker-cleaner"
              className="text-primary hover:underline"
            >
              Still muffled? Try Deep Clean →
            </Link>
          }
        />
      )}
    </ToolShell>
  );
}
