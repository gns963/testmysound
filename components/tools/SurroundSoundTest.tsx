"use client";

import { useSurroundTest } from "@/lib/audio/useSurroundTest";
import { SURROUND_CHANNELS } from "@/lib/audio/surroundChannels";
import { ToolShell } from "@/components/tools/shell/ToolShell";

/** Surround Sound Test: honestly reports the browser's real channel count first, then tests whatever's actually available. */
export function SurroundSoundTest() {
  const test = useSurroundTest();

  return (
    <ToolShell>
      {!test.checked ? (
        <>
          <p className="text-muted max-w-sm text-center text-xs">
            First, check how many output channels your browser and current audio device actually report — most
            setups only report 2 (stereo), even with real surround hardware connected.
          </p>
          <button
            type="button"
            onClick={test.check}
            className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
          >
            Check my setup
          </button>
        </>
      ) : (
        <div className="flex w-full flex-col items-center gap-4">
          <div
            className={`w-full max-w-sm rounded-xl border p-3 text-center text-sm ${
              test.maxChannels >= 6 ? "border-accent/40 bg-accent/10 text-text" : "border-warn/40 bg-warn/10 text-text"
            }`}
            aria-live="polite"
          >
            <p className="font-medium">
              Your browser reports {test.maxChannels} output channel{test.maxChannels === 1 ? "" : "s"} available.
            </p>
            {test.maxChannels < 6 ? (
              <p className="text-muted mt-1 text-xs">
                That&apos;s stereo only — true 5.1/7.1 channel-by-channel testing isn&apos;t possible on this setup
                right now, even with real surround hardware. See &quot;How it works&quot; below for why this is so
                common.
              </p>
            ) : (
              <p className="text-muted mt-1 text-xs">
                Enough channels are reported for a 5.1{test.maxChannels >= 8 ? " or 7.1" : ""} test — try each speaker
                below. Channel-to-speaker mapping still isn&apos;t guaranteed correct on every system.
              </p>
            )}
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4" aria-live="polite">
            {SURROUND_CHANNELS.map((channel) => {
              const available = channel.index < test.maxChannels;
              const active = test.activeIndex === channel.index;
              return (
                <button
                  key={channel.index}
                  type="button"
                  disabled={!available}
                  onClick={() => test.playChannel(channel.index)}
                  aria-pressed={active}
                  className={`rounded-xl border p-3 text-xs font-medium transition-colors ${
                    !available
                      ? "border-border text-muted cursor-not-allowed opacity-40"
                      : active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-text hover:border-primary/40"
                  }`}
                >
                  <span className="block text-sm font-semibold">{channel.shortLabel}</span>
                  {channel.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {!test.sequencing ? (
              <button
                type="button"
                onClick={() => void test.playSequence()}
                disabled={test.availableChannels.length === 0}
                className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                Test all in sequence
              </button>
            ) : (
              <button type="button" onClick={test.cancelSequence} className="text-muted hover:text-text text-sm">
                Stop sequence
              </button>
            )}
          </div>
        </div>
      )}
    </ToolShell>
  );
}
