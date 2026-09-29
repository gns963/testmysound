import type { CleanerMode } from "@/components/tools/SpeakerCleaner";

export type DeviceHubTip = { title: string; body: string };
export type DeviceHubFaq = { q: string; a: string };

// Content for a device/brand HUB page (blueprint §5 "device-type hubs" /
// "brand hubs" — e.g. /speaker-cleaner/iphone), not an individual verified
// MODEL page (e.g. /speaker-cleaner/iphone-15, blueprint §9). Hub content
// stays general and honest about what's broadly true of the device family;
// it never cites a specific model's exact spec (IP rating, release year,
// etc.) without a source — that level of claim is reserved for future
// verified model pages per the blueprint's data/devices.ts rule.
export type DeviceHubContent = {
  slug: string;
  path: string;
  name: string;
  kind: "device-type" | "brand";
  metaTitle: string;
  metaDescription: string;
  /** 40-60 word answer-first summary. */
  intro: string;
  speakerLayoutNote: string;
  tips: DeviceHubTip[];
  commonIssues: string[];
  whenToSeeService: string;
  faqs: DeviceHubFaq[];
  /** Restrict the embedded Speaker Cleaner's modes for this device family. */
  toolAllowedModes?: CleanerMode[];
};
