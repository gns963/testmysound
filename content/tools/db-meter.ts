import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "db-meter",
  path: "/db-meter",
  name: "Sound Level Meter (dB)",
  shortName: "dB Meter",
  primaryKeyword: "db meter",
  secondaryKeywords: [
    "sound level meter online",
    "how loud is this noise",
    "decibel meter",
  ],
  metaTitle: "Sound Level Meter — Approximate dB Meter Online",
  metaDescription:
    "Free approximate dB sound level meter using your microphone. Not a calibrated measurement — audio never leaves your device.",
  answer:
    "This dB meter uses your microphone to estimate how loud the sound around you is, showing a live reading plus the minimum, average and maximum over your session. Phone and laptop microphones aren't calibrated for sound measurement, so this is a useful approximation for comparing relative loudness — not a substitute for a real, calibrated sound level meter.",
  howToSteps: [
    'Tap "Start dB meter" and allow microphone access.',
    "Watch the live reading respond to sound in the room.",
    "Check the min/avg/max stats to see the range over your session, not just the instant reading.",
    "Compare your reading against the typical noise level reference chart shown below the meter.",
    "Tap Stop when you're done — your audio was never recorded or uploaded.",
  ],
  howItWorks: [
    "The tool measures the root-mean-square (RMS) level of the incoming microphone signal — a standard way of representing how much energy is in an audio signal over a short window — and converts that into an approximate decibel reading using a fixed offset.",
    "The problem: consumer microphones (in phones, laptops, webcams) have no standardized sensitivity or calibration, unlike a dedicated sound level meter. Two different phones can report noticeably different numbers for the exact same real-world sound. That's why this reading is explicitly labeled an approximation — it's genuinely useful for noticing relative change (is it getting louder or quieter?) but not for an exact, comparable-across-devices measurement.",
  ],
  tips: [
    {
      title: "Use it for relative comparisons",
      body: '"Is this room louder than that one?" is a question this tool answers well. "Is this exactly 72dB?" is not, without a calibrated meter.',
    },
    {
      title: "Mic placement matters",
      body: "How you're holding your phone, and whether it's covered by a case or your hand, changes the reading — keep the mic unobstructed for consistency.",
    },
    {
      title: "Concerned about hearing damage from loud environments?",
      body: "Consistent exposure above roughly 85dB over long periods is generally considered a hearing-risk threshold by health authorities — if you're regularly near that, consider hearing protection regardless of this tool's exact number.",
    },
  ],
  troubleshooting: [
    {
      problem:
        "Reading seems way too low or too high compared to what you'd expect",
      cause:
        "The fixed offset used to approximate dB SPL doesn't account for your specific microphone's sensitivity.",
      fix: "Treat the number as relative rather than absolute — compare it to other readings taken with the same device and mic position.",
    },
    {
      problem: "Reading jumps around a lot even in a quiet room",
      cause:
        "Normal — background noise (HVAC, distant traffic, your own movement) naturally varies moment to moment.",
      fix: "Look at the average over time rather than any single instant reading.",
    },
    {
      problem: '"Permission denied" or "no microphone" error',
      cause:
        "Same causes as any microphone-based tool — blocked permission or no active input device.",
      fix: "Check your browser's site permissions and system sound input settings.",
    },
  ],
  safetyNote:
    "This is explicitly an uncalibrated approximation, not a certified sound level meter. Don't use it for anything requiring an accurate, legally or medically meaningful decibel measurement — for that, use a dedicated calibrated instrument.",
  faqs: [
    {
      q: "Is this an accurate decibel meter?",
      a: "No — it's a reasonable approximation using your device's uncalibrated microphone. Treat the number as a rough guide, not a precise measurement.",
    },
    {
      q: "Why do two different phones give different readings for the same sound?",
      a: "Consumer microphones vary in sensitivity and have no standard calibration for sound-level measurement, unlike dedicated meters — this is expected, not a bug.",
    },
    {
      q: "What decibel level is considered dangerous?",
      a: "Health authorities commonly cite prolonged exposure above about 85dB as a hearing-risk threshold, with even shorter safe durations at higher levels. This is general reference information, not a substitute for guidance from a hearing health professional.",
    },
    {
      q: "Does this tool record or upload my audio?",
      a: "No — the microphone signal is analyzed locally in your browser purely to compute a level; nothing is recorded or sent anywhere.",
    },
  ],
  related: ["mic-test", "hearing-test", "noise-generator", "speaker-test"],
};

export default content;
