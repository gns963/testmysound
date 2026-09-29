import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "frequency-sweep",
  path: "/frequency-sweep",
  name: "Frequency Sweep Generator",
  shortName: "Frequency Sweep",
  primaryKeyword: "frequency sweep generator",
  secondaryKeywords: [
    "custom frequency sweep",
    "audio sweep test online",
    "sine sweep generator",
  ],
  metaTitle: "Frequency Sweep Generator — Custom Range",
  metaDescription:
    "Free configurable frequency sweep generator. Set your own from/to range and duration, with a live Hz readout.",
  answer:
    "This tool sweeps smoothly from one frequency to another over a duration you choose, with a live Hz readout as it plays. Unlike the preset Speaker Test and Bass Test sweeps, you set your own exact range and timing — useful for custom audio testing, equipment diagnostics, or specific frequency-range checks.",
  howToSteps: [
    'Enter your desired "From" frequency in Hz.',
    'Enter your "To" frequency in Hz.',
    "Set the duration in seconds (2-60s).",
    "Tap Start — the sweep plays smoothly between your two frequencies, with the current Hz shown live.",
    "Tap Stop at any point, or let it complete naturally.",
  ],
  howItWorks: [
    "The sweep uses an exponential frequency ramp (via the Web Audio API), which means it moves through frequencies at a rate that matches how pitch is perceived — equal musical intervals take equal time, rather than equal Hz increments taking equal time. This is why a sweep from 20Hz to 200Hz doesn't spend disproportionately more time in the lower range even though the low end covers far fewer raw Hz.",
    "The live Hz readout is calculated from your elapsed time and chosen range using the same exponential formula driving the actual audio, so what you see on screen should track closely with what you're hearing at any moment.",
  ],
  tips: [
    {
      title: "Need a specific narrow range?",
      body: "Set From and To close together (e.g. 1000-1200Hz) for a focused sweep across a narrow band, useful for pinpointing a specific resonance or rattle.",
    },
    {
      title: "Prefer a ready-made preset?",
      body: "The Speaker Test and Bass Test tools have fixed, pre-tuned sweeps if you don't need custom control.",
      href: "/speaker-test",
      linkLabel: "Speaker Sound Test →",
    },
    {
      title: "Longer durations for careful listening",
      body: "A longer duration (30-60s) over a narrow range gives you more time to catch a subtle issue than a fast, wide sweep.",
    },
  ],
  troubleshooting: [
    {
      problem: '"From" and "To" fields won\'t accept my value',
      cause:
        "Inputs are clamped to 1Hz-22kHz to stay within the tool's safe and meaningful range.",
      fix: "Enter a value within that range — anything outside it will be automatically adjusted to the nearest valid value.",
    },
    {
      problem: "Sweep sounds like it speeds through the low end fast",
      cause:
        "Exponential sweeps naturally spend proportionally more time (in real seconds) in the higher-frequency range's larger Hz span, if the range is wide.",
      fix: "This is expected behavior — try a narrower range if you want to focus more time on a specific area.",
    },
    {
      problem: "Inputs are disabled",
      cause:
        "The range/duration fields lock while a sweep is actively running.",
      fix: "Tap Stop first, then adjust your range and start again.",
    },
  ],
  safetyNote:
    "Very narrow or very high-frequency sweeps can end up effectively holding near one loud frequency for a while — keep volume moderate, especially the first time you try a new custom range.",
  faqs: [
    {
      q: "What's the difference between this and the sweeps in Speaker Test or Bass Test?",
      a: "Those tools use fixed, pre-chosen ranges (20Hz-20kHz and 20-200Hz respectively) suited to their specific purpose. This tool lets you set any custom From/To range and duration yourself.",
    },
    {
      q: "Why does the sweep use exponential rather than linear frequency change?",
      a: "Exponential ramps match how pitch is perceived — equal time spent per musical interval rather than per raw Hz — which is the standard approach for audio frequency sweeps.",
    },
    {
      q: 'Can I set the "From" frequency higher than "To"?',
      a: "Yes — the sweep will simply move downward from a higher starting frequency to a lower ending one.",
    },
    {
      q: "What's the maximum duration?",
      a: "60 seconds, to keep sessions reasonably short — for a longer continuous tone at one frequency instead, use the Tone Generator.",
    },
  ],
  related: ["tone-generator", "bass-test", "speaker-test", "noise-generator"],
};

export default content;
