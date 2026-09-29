"use client";

import { useState } from "react";
import { useSweepRunner } from "@/lib/audio/useSweepRunner";
import { formatHz } from "@/lib/format";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ToolRunControl } from "@/components/tools/shell/ToolRunControl";
import { ModeTabs, type ModeOption } from "@/components/tools/shell/ModeTabs";
import { FrequencyChipRow } from "@/components/tools/shell/FrequencyChipRow";

type SubMode = "sweep" | "frequencies";

const SUB_MODES: ModeOption[] = [
  { id: "sweep", label: "Sweep" },
  { id: "frequencies", label: "Frequencies" },
];

const BASS_FROM = 20;
const BASS_TO = 200;
const BASS_DURATION_MS = 15_000;
const BASS_CHIPS = [30, 40, 50, 60, 80, 100];

const getBassRange = () => ({
  from: BASS_FROM,
  to: BASS_TO,
  durationMs: BASS_DURATION_MS,
});

/** Tool 9 (blueprint §4.4): 20-200Hz sweep + fixed bass frequency chips. */
export function BassTest() {
  const [subMode, setSubMode] = useState<SubMode>("sweep");

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
      <div className="border-warn/40 bg-warn/10 text-text w-full rounded-xl border p-3 text-center text-sm">
        Start at low volume — bass can be surprisingly loud (and hard on small
        speakers) before you&apos;ve adjusted to the level.
      </div>

      {subMode === "sweep" && <BassSweep />}
      {subMode === "frequencies" && (
        <FrequencyChipRow
          tool="bass-test"
          frequencies={BASS_CHIPS}
          gain={0.5}
        />
      )}
    </ToolShell>
  );
}

function BassSweep() {
  const runner = useSweepRunner({
    tool: "bass-test",
    mode: "sweep",
    getRange: getBassRange,
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
      {running && (
        <p
          className="text-text text-2xl font-semibold tabular-nums"
          aria-live="polite"
        >
          {formatHz(runner.liveFreq)}
        </p>
      )}
    </>
  );
}
