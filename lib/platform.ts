// Small feature/platform checks used across lib/audio and the tool components.
// Always feature-detect rather than user-agent sniff where possible; iOS detection
// is the one place UA sniffing is unavoidable (Web Audio + Safari quirks).

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isIOS(): boolean {
  if (!isBrowser()) return false;
  const ua = navigator.userAgent;
  const isAppleTouch =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports as "MacIntel" with touch support.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isAppleTouch;
}

export function supportsVibration(): boolean {
  return isBrowser() && typeof navigator.vibrate === "function";
}

export function supportsWakeLock(): boolean {
  return isBrowser() && "wakeLock" in navigator;
}

export type DeviceType = "phone" | "tablet" | "laptop" | "desktop" | "other";

// Rough heuristic for the `device_type` analytics dimension (§14) — not exact,
// just enough to segment mobile vs. desktop usage.
export function detectDeviceType(): DeviceType {
  if (!isBrowser()) return "other";
  const touch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  const w = window.innerWidth;
  if (touch && w < 640) return "phone";
  if (touch && w < 1100) return "tablet";
  return "desktop";
}
