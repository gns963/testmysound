"use client";

import { SpeakerCleaner } from "@/components/tools/SpeakerCleaner";

/**
 * Smartwatch Water Eject: no browser tool can reach a smartwatch's own
 * speaker (most smartwatches, including Apple Watch, don't support
 * browsing to a website at all) — the page's real fix is Apple's own
 * Water Lock feature, covered in the content below. This component just
 * reuses the main SpeakerCleaner tone tool, honestly framed as being for
 * whichever device (phone/laptop) you're actually viewing this page on,
 * in case that one also got wet in the same splash.
 */
export function SmartwatchWaterEject() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="border-warn/40 bg-warn/10 text-text w-full rounded-xl border p-4 text-sm">
        <p className="font-medium">Heads up: this tool plays through this device, not your watch.</p>
        <p className="text-muted mt-1">
          Browsers can&apos;t run on most smartwatches, so this tone can&apos;t reach your watch&apos;s own speaker.
          For an Apple Watch, use its built-in Water Lock feature instead (steps below). This tool is here in case
          your phone or laptop also got wet in the same splash.
        </p>
      </div>
      <SpeakerCleaner />
    </div>
  );
}
