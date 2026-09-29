// Standard open-string tunings (equal temperament, A4 = 440Hz) — real,
// verifiable music theory, not invented. Chromatic mode has no fixed target
// set: it just names the nearest semitone to whatever frequency is detected.

export type TunerString = { note: string; freq: number };
export type TunerPresetId = "chromatic" | "guitar" | "ukulele" | "violin" | "bass";

export type TunerPreset = {
  id: TunerPresetId;
  label: string;
  strings: TunerString[] | null;
};

export const TUNER_PRESETS: TunerPreset[] = [
  { id: "chromatic", label: "Chromatic", strings: null },
  {
    id: "guitar",
    label: "Guitar",
    strings: [
      { note: "E2", freq: 82.41 },
      { note: "A2", freq: 110.0 },
      { note: "D3", freq: 146.83 },
      { note: "G3", freq: 196.0 },
      { note: "B3", freq: 246.94 },
      { note: "E4", freq: 329.63 },
    ],
  },
  {
    id: "ukulele",
    label: "Ukulele",
    strings: [
      { note: "G4", freq: 392.0 },
      { note: "C4", freq: 261.63 },
      { note: "E4", freq: 329.63 },
      { note: "A4", freq: 440.0 },
    ],
  },
  {
    id: "violin",
    label: "Violin",
    strings: [
      { note: "G3", freq: 196.0 },
      { note: "D4", freq: 293.66 },
      { note: "A4", freq: 440.0 },
      { note: "E5", freq: 659.25 },
    ],
  },
  {
    id: "bass",
    label: "Bass",
    strings: [
      { note: "E1", freq: 41.2 },
      { note: "A1", freq: 55.0 },
      { note: "D2", freq: 73.42 },
      { note: "G2", freq: 98.0 },
    ],
  },
];

export function getTunerPreset(id: TunerPresetId): TunerPreset {
  return TUNER_PRESETS.find((p) => p.id === id) ?? TUNER_PRESETS[0];
}

/** The preset's own string closest in pitch to `freq` — not the nearest chromatic semitone. */
export function closestString(strings: TunerString[], freq: number): TunerString {
  return strings.reduce((closest, s) =>
    Math.abs(Math.log2(freq / s.freq)) < Math.abs(Math.log2(freq / closest.freq)) ? s : closest,
  );
}
