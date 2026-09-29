// Common Front-Left/Front-Right/Center/LFE/Rear-Left/Rear-Right ordering
// used by many discrete multichannel systems (Side L/R added for 7.1) — a
// widely used convention, not a universally guaranteed standard. Whether
// index 4 actually comes out of your physical rear-left speaker depends on
// your OS/driver/receiver agreeing on the same mapping.
export type SurroundChannel = { index: number; label: string; shortLabel: string };

export const SURROUND_CHANNELS: SurroundChannel[] = [
  { index: 0, label: "Front Left", shortLabel: "FL" },
  { index: 1, label: "Front Right", shortLabel: "FR" },
  { index: 2, label: "Center", shortLabel: "C" },
  { index: 3, label: "Subwoofer (LFE)", shortLabel: "LFE" },
  { index: 4, label: "Rear/Surround Left", shortLabel: "RL" },
  { index: 5, label: "Rear/Surround Right", shortLabel: "RR" },
  { index: 6, label: "Side Left", shortLabel: "SL" },
  { index: 7, label: "Side Right", shortLabel: "SR" },
];
