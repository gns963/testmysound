// GA4 wrapper (blueprint §14). Every call is a safe no-op when GA hasn't loaded
// (ad blockers, consent not yet given, or NEXT_PUBLIC_GA_MEASUREMENT_ID unset) so
// call sites never need to guard for it themselves.

import type { DeviceType } from "@/lib/platform";

export type { DeviceType } from "@/lib/platform";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag(...args);
}

function trackEvent(name: string, params?: GtagEventParams) {
  gtag("event", name, params);
}

/** User pressed Start on a tool. */
export function trackToolStart(params: {
  tool: string;
  mode?: string;
  deviceType?: DeviceType;
}) {
  trackEvent("tool_start", params);
}

/** A tool's cycle ran to completion. */
export function trackToolComplete(params: { tool: string; duration: number }) {
  trackEvent("tool_complete", params);
}

/** User pressed Stop before the cycle finished. */
export function trackToolStopEarly(params: {
  tool: string;
  secondsPlayed: number;
}) {
  trackEvent("tool_stop_early", {
    tool: params.tool,
    seconds_played: params.secondsPlayed,
  });
}

/** "Did it help?" Yes/No response after a tool run. */
export function trackToolFeedback(params: { tool: string; helped: boolean }) {
  trackEvent("tool_feedback", {
    tool: params.tool,
    helped: params.helped ? "yes" : "no",
  });
}

/** getUserMedia mic permission outcome. */
export function trackMicPermission(status: "granted" | "denied" | "error") {
  trackEvent("mic_permission", { status });
}

/** getUserMedia camera permission outcome. */
export function trackCameraPermission(status: "granted" | "denied" | "error") {
  trackEvent("camera_permission", { status });
}

export function trackRelatedToolClick(params: {
  fromTool: string;
  toTool: string;
}) {
  trackEvent("related_tool_click", {
    from_tool: params.fromTool,
    to_tool: params.toTool,
  });
}

export function trackBlogToToolClick(params: {
  fromSlug: string;
  toTool: string;
}) {
  trackEvent("blog_to_tool_click", {
    from_slug: params.fromSlug,
    to_tool: params.toTool,
  });
}

export function trackAffiliateClick(params: {
  label: string;
  destination: string;
}) {
  trackEvent("affiliate_click", {
    label: params.label,
    destination: params.destination,
  });
}

export function trackLanguageSwitch(params: { from: string; to: string }) {
  trackEvent("language_switch", { from: params.from, to: params.to });
}
