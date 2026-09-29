import type { NoiseType } from "@/lib/audio/noise";

// Sleep/Focus Sounds presets. Everything here is synthesized from filtered
// noise — there are no recorded samples in this project (Web Audio API only,
// per the blueprint). "Rain" and "Ocean Waves" are noise shaped to sound
// rain- or ocean-like, not recordings, and the page says so plainly.

export type AmbientPresetId = "rain" | "ocean" | "white" | "pink" | "brown" | "fan";

export type AmbientPreset = {
  id: AmbientPresetId;
  label: string;
  description: string;
  noiseType: NoiseType;
  filter?: { type: BiquadFilterType; frequency: number; q?: number };
  lfo?: { rateHz: number; depth: number };
};

export const AMBIENT_PRESETS: AmbientPreset[] = [
  {
    id: "rain",
    label: "Rain",
    description: "High-pass filtered noise for a rain-like hiss",
    noiseType: "pink",
    filter: { type: "highpass", frequency: 700 },
  },
  {
    id: "ocean",
    label: "Ocean Waves",
    description: "Low-pass noise with a slow swell",
    noiseType: "brown",
    filter: { type: "lowpass", frequency: 500 },
    lfo: { rateHz: 0.15, depth: 0.5 },
  },
  {
    id: "white",
    label: "White Noise",
    description: "Full-spectrum flat noise",
    noiseType: "white",
  },
  {
    id: "pink",
    label: "Pink Noise",
    description: "Softer, bass-weighted noise",
    noiseType: "pink",
  },
  {
    id: "brown",
    label: "Brown Noise",
    description: "Deep, rumbling low-frequency noise",
    noiseType: "brown",
  },
  {
    id: "fan",
    label: "Fan Hum",
    description: "Low-pass filtered noise for a steady fan/AC hum",
    noiseType: "brown",
    filter: { type: "lowpass", frequency: 900, q: 1.5 },
  },
];

export function getAmbientPreset(id: AmbientPresetId): AmbientPreset {
  return AMBIENT_PRESETS.find((p) => p.id === id) ?? AMBIENT_PRESETS[0];
}

export const SLEEP_TIMER_OPTIONS = [15, 30, 60, 90] as const;
