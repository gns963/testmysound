import { supportsWakeLock } from "@/lib/platform";

// navigator.wakeLock.request('screen') for the duration of a tool run, per
// blueprint §4.1. Silently no-ops where unsupported (most non-Chromium mobile
// browsers as of writing) — never blocks the tool from running.
let sentinel: WakeLockSentinel | null = null;

export async function requestScreenWakeLock(): Promise<void> {
  if (!supportsWakeLock()) return;
  try {
    sentinel = await navigator.wakeLock.request("screen");
  } catch {
    sentinel = null;
  }
}

export async function releaseScreenWakeLock(): Promise<void> {
  try {
    await sentinel?.release();
  } catch {
    // Already released or the tab lost visibility — ignore.
  } finally {
    sentinel = null;
  }
}
