"use client";

import { useAmbientSound } from "@/lib/audio/useAmbientSound";
import { AMBIENT_PRESETS, SLEEP_TIMER_OPTIONS } from "@/lib/audio/ambientSounds";
import { ToolShell } from "@/components/tools/shell/ToolShell";

function formatRemaining(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Sleep/Focus Sounds: synthesized ambient noise textures (rain/ocean/white/pink/brown/fan) with a fading sleep timer. */
export function SleepFocusSounds() {
  const sound = useAmbientSound();

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Synthesized noise textures, not recordings — plays until you stop it, and should keep going even if your
        screen locks.
      </p>

      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
        {AMBIENT_PRESETS.map((preset) => {
          const isActive = sound.presetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => sound.play(preset.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors ${
                isActive ? "border-primary bg-primary/10" : "border-border bg-surface hover:border-primary/40"
              }`}
            >
              <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-text"}`}>{preset.label}</span>
              <span className="text-muted text-[11px]">{preset.description}</span>
            </button>
          );
        })}
      </div>

      <div className="flex w-full max-w-xs items-center gap-3">
        <span className="text-muted text-xs">Volume</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={sound.volume}
          onChange={(e) => sound.setVolume(Number(e.target.value))}
          className="accent-primary w-full"
          aria-label="Volume"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Sleep timer">
        <span className="text-muted text-xs">Sleep timer:</span>
        <button
          type="button"
          onClick={() => sound.setSleepTimerMin(null)}
          aria-pressed={sound.sleepTimerMin === null}
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
            sound.sleepTimerMin === null ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
          }`}
        >
          Off
        </button>
        {SLEEP_TIMER_OPTIONS.map((min) => (
          <button
            key={min}
            type="button"
            onClick={() => sound.setSleepTimerMin(min)}
            aria-pressed={sound.sleepTimerMin === min}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
              sound.sleepTimerMin === min ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
            }`}
          >
            {min}m
          </button>
        ))}
      </div>

      {sound.presetId && (
        <div className="flex flex-col items-center gap-2" aria-live="polite">
          <p className="text-muted text-sm">
            Playing {AMBIENT_PRESETS.find((p) => p.id === sound.presetId)?.label}
            {sound.timeRemainingS !== null && ` · fades out in ${formatRemaining(sound.timeRemainingS)}`}
          </p>
          <button
            type="button"
            onClick={() => sound.stop()}
            className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            Stop
          </button>
        </div>
      )}
    </ToolShell>
  );
}
