import { BigStartButton } from "@/components/tools/shell/BigStartButton";
import {
  ProgressRing,
  PROGRESS_RING_SIZE,
} from "@/components/tools/shell/ProgressRing";

// Ring + Start/Stop button + seconds-left readout + cooldown notice — the part
// every program-based tool (Speaker Cleaner, Deep Cleaner, Earpiece Cleaner,
// Dust Remover) shares regardless of what program it's running.
export function ToolRunControl({
  running,
  inCooldown,
  progressPct,
  secondsLeft,
  cooldownSecondsLeft,
  maxCycles = 3,
  onToggle,
}: {
  running: boolean;
  inCooldown: boolean;
  progressPct: number;
  secondsLeft: number;
  cooldownSecondsLeft: number;
  maxCycles?: number;
  onToggle: () => void;
}) {
  return (
    <>
      <div
        className="relative flex items-center justify-center"
        style={{ width: PROGRESS_RING_SIZE, height: PROGRESS_RING_SIZE }}
      >
        <ProgressRing
          progressPct={progressPct}
          secondsLeft={running ? secondsLeft : undefined}
        />
        <BigStartButton
          running={running}
          disabled={inCooldown}
          onClick={onToggle}
        />
      </div>

      {running && (
        <p className="text-muted text-sm" aria-live="polite">
          {secondsLeft}s left
        </p>
      )}

      {inCooldown && (
        <p className="text-warn text-sm" aria-live="polite">
          That&apos;s {maxCycles} cycles in a row — take a {cooldownSecondsLeft}
          s break before running it again.
        </p>
      )}
    </>
  );
}
