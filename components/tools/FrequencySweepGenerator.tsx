"use client";

import { useCallback, useState } from "react";
import { useSweepRunner, type SweepRange } from "@/lib/audio/useSweepRunner";
import { formatHz } from "@/lib/format";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ToolRunControl } from "@/components/tools/shell/ToolRunControl";

const MIN_FREQ = 1;
const MAX_FREQ = 22_000;
const MIN_DURATION_S = 2;
const MAX_DURATION_S = 60;

const DEFAULT_RANGE: SweepRange = { from: 20, to: 20_000, durationMs: 20_000 };

/** Tool 14 (blueprint §4.2/§4.4): configurable from/to/duration sweep with a live readout. */
export function FrequencySweepGenerator() {
  const [from, setFrom] = useState(DEFAULT_RANGE.from);
  const [to, setTo] = useState(DEFAULT_RANGE.to);
  const [durationS, setDurationS] = useState(DEFAULT_RANGE.durationMs / 1000);

  const getRange = useCallback(
    (): SweepRange => ({ from, to, durationMs: durationS * 1000 }),
    [from, to, durationS],
  );
  const runner = useSweepRunner({
    tool: "frequency-sweep",
    mode: "custom",
    getRange,
  });
  const running = runner.status === "running";

  return (
    <ToolShell>
      <div className="grid w-full max-w-sm grid-cols-3 gap-3">
        <label className="text-muted flex flex-col gap-1 text-sm">
          From (Hz)
          <input
            type="number"
            min={MIN_FREQ}
            max={MAX_FREQ}
            value={from}
            disabled={running}
            onChange={(e) =>
              setFrom(
                Math.min(MAX_FREQ, Math.max(MIN_FREQ, Number(e.target.value))),
              )
            }
            className="border-border bg-bg text-text rounded-md border px-2 py-1 disabled:opacity-50"
          />
        </label>
        <label className="text-muted flex flex-col gap-1 text-sm">
          To (Hz)
          <input
            type="number"
            min={MIN_FREQ}
            max={MAX_FREQ}
            value={to}
            disabled={running}
            onChange={(e) =>
              setTo(
                Math.min(MAX_FREQ, Math.max(MIN_FREQ, Number(e.target.value))),
              )
            }
            className="border-border bg-bg text-text rounded-md border px-2 py-1 disabled:opacity-50"
          />
        </label>
        <label className="text-muted flex flex-col gap-1 text-sm">
          Duration (s)
          <input
            type="number"
            min={MIN_DURATION_S}
            max={MAX_DURATION_S}
            value={durationS}
            disabled={running}
            onChange={(e) =>
              setDurationS(
                Math.min(
                  MAX_DURATION_S,
                  Math.max(MIN_DURATION_S, Number(e.target.value)),
                ),
              )
            }
            className="border-border bg-bg text-text rounded-md border px-2 py-1 disabled:opacity-50"
          />
        </label>
      </div>

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
    </ToolShell>
  );
}
