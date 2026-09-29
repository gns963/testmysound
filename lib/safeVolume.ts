// Noise-exposure math for the Safe Volume Calculator. Every reference number
// here comes from a verified, currently-live page from NIOSH, OSHA or WHO
// (see the "Sources" section on the tool page for the exact links) — nothing
// is estimated or invented. The formula itself is each standard's own
// published "exchange rate" / equal-energy rule, applied honestly:
// allowedHours = referenceHours / 2^((db - referenceDb) / exchangeRateDb)

export type NoiseStandardId = "niosh" | "osha" | "who";

export type NoiseStandard = {
  id: NoiseStandardId;
  label: string;
  referenceDb: number;
  referenceHours: number;
  periodLabel: string;
  exchangeRateDb: number;
};

// NIOSH: 85 dBA REL over an 8-hour day, 3 dB exchange rate.
// Source: https://www.cdc.gov/niosh/noise/prevent/understand.html
// OSHA: 90 dBA PEL over an 8-hour day, 5 dB exchange rate.
// Source: https://www.osha.gov/noise
// WHO: 80 dB over a 40-hour week for personal listening devices (adults),
// consistent with the 3 dB rule against WHO's own published reference points
// (85dB/12h30m, 90dB/4h, 95dB/1h15m per week).
// Source: https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening
export const NOISE_STANDARDS: NoiseStandard[] = [
  { id: "niosh", label: "NIOSH", referenceDb: 85, referenceHours: 8, periodLabel: "per 8-hour day", exchangeRateDb: 3 },
  { id: "osha", label: "OSHA", referenceDb: 90, referenceHours: 8, periodLabel: "per 8-hour day", exchangeRateDb: 5 },
  {
    id: "who",
    label: "WHO (personal listening)",
    referenceDb: 80,
    referenceHours: 40,
    periodLabel: "per 40-hour week",
    exchangeRateDb: 3,
  },
];

export function getNoiseStandard(id: NoiseStandardId): NoiseStandard {
  return NOISE_STANDARDS.find((s) => s.id === id) ?? NOISE_STANDARDS[0];
}

export function computeAllowedHours(standard: NoiseStandard, db: number): number {
  const halvings = (db - standard.referenceDb) / standard.exchangeRateDb;
  return standard.referenceHours / Math.pow(2, halvings);
}

export function formatDuration(hours: number): string {
  if (hours > 24) return "More than 24 hours — essentially unrestricted at this level";
  if (hours < 1 / 60) return "Under 1 minute";
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  if (minutes === 0) return `${wholeHours} hour${wholeHours === 1 ? "" : "s"}`;
  return `${wholeHours}h ${minutes}m`;
}

// CDC's own published everyday-sound decibel ranges — used as reference
// chips, not as the calculator's core standard. `db` is the midpoint of the
// published range, used only as the slider's starting value when a chip is
// tapped; the chip label always shows the real published range.
// Source: https://www.cdc.gov/nceh/hearing_loss/infographic/
export const EVERYDAY_SOUND_EXAMPLES = [
  { label: "Whispering", rangeLabel: "~30 dB", db: 30 },
  { label: "Normal conversation", rangeLabel: "65-80 dB", db: 72 },
  { label: "Lawnmower", rangeLabel: "80-100 dB", db: 90 },
  { label: "Motorcycle", rangeLabel: "80-110 dB", db: 95 },
  { label: "Headphones at max volume", rangeLabel: "96-110 dB", db: 103 },
  { label: "Rock concert / nightclub", rangeLabel: "95-115 dB", db: 105 },
  { label: "Sirens", rangeLabel: "110-129 dB", db: 119 },
];
