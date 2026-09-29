import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "tone-generator",
  path: "/tone-generator",
  name: "Tone Generator",
  shortName: "Tone Generator",
  primaryKeyword: "tone generator",
  secondaryKeywords: [
    "online tone generator",
    "sine wave generator",
    "test tone generator",
  ],
  metaTitle: "Tone Generator — 1Hz to 22kHz Online",
  metaDescription:
    "Free online tone generator: sine, square, sawtooth and triangle waves from 1Hz to 22kHz, with volume and balance control.",
  answer:
    "A tone generator produces a pure audio signal at any frequency and waveform you choose — this one covers 1Hz to 22kHz across sine, square, sawtooth and triangle waves, with volume and left/right balance control, right in your browser. It's used for audio testing, tuning, and general signal-generation needs without installing software.",
  howToSteps: [
    "Drag the frequency slider, or use the -1Hz/+1Hz buttons for precise adjustment.",
    "Pick a waveform — sine for a pure clean tone, or square/sawtooth/triangle for harmonically richer signals.",
    "Adjust volume and left/right balance with the sliders.",
    "Tap Play to start; the frequency and waveform can be changed live while it's playing.",
    "Tap Stop when you're done, or it will auto-stop after 2 minutes as a safety limit.",
    "Share a specific setting with someone else by copying the URL — it encodes the frequency and waveform.",
  ],
  howItWorks: [
    "This tool uses the Web Audio API's OscillatorNode to generate a mathematically precise waveform at the exact frequency you set, rather than playing back a recorded sound file. That's what makes it accurate down to 1Hz and lets you sweep or nudge the frequency smoothly while it plays.",
    "Sine waves contain only the fundamental frequency, making them useful for calibration and pure pitch reference. Square, sawtooth and triangle waves each add different harmonic overtones on top of the fundamental, which is why they sound noticeably different even at the same frequency — useful for testing how equipment handles more complex signals.",
  ],
  tips: [
    {
      title: "Tuning instruments",
      body: "Set 440Hz sine for standard concert pitch A, or any other reference frequency your tuning needs.",
    },
    {
      title: "Testing speaker frequency response",
      body: "Sweep slowly through the range and listen for volume drops or distortion — or use the dedicated Frequency Sweep tool for an automated version.",
      href: "/frequency-sweep",
      linkLabel: "Frequency Sweep Generator →",
    },
    {
      title: "Checking for tinnitus or hearing sensitivity",
      body: "A precise sine wave lets you find the exact frequency of a ringing sound you're trying to identify or mask — for reference only, not medical advice.",
    },
  ],
  troubleshooting: [
    {
      problem: "No sound when I tap Play",
      cause:
        "Volume slider may be at 0, or the device's own volume/mute could be off.",
      fix: "Check both the in-app volume slider and your device's physical volume and mute state.",
    },
    {
      problem: "Shared link doesn't load the right frequency",
      cause:
        "The URL params (?f= and &w=) may have been altered or truncated when sharing.",
      fix: "Copy the full URL directly from the address bar after setting your frequency, rather than retyping it.",
    },
    {
      problem: "Tone stopped playing on its own",
      cause: "The built-in 2-minute safety auto-stop.",
      fix: "Tap Play again to start a new 2-minute session.",
    },
  ],
  safetyNote:
    "Very high or very low frequencies can sound louder or quieter than expected at the same volume setting due to how human hearing and speakers respond across the range — start at a moderate volume when testing a new frequency.",
  faqs: [
    {
      q: "Can this generator produce frequencies below 20Hz or above 20kHz?",
      a: "It's capped at 1Hz-22kHz. Frequencies outside typical human hearing (below ~20Hz or above ~20kHz) may not be audible even though the signal is technically being generated — and most consumer speakers can't reproduce the extremes cleanly anyway.",
    },
    {
      q: "What's the difference between the waveforms?",
      a: "Sine is a pure single frequency. Square, sawtooth and triangle each add different harmonic overtones on top, giving them a distinctly different, richer timbre at the same base frequency.",
    },
    {
      q: "Can I use the URL params to embed a specific tone somewhere?",
      a: "The ?f= and &w= URL parameters set frequency and waveform, so a link like this page's URL with those params will load with that tone pre-selected.",
    },
    {
      q: "Is this accurate enough for professional audio calibration?",
      a: "It's accurate for the frequency itself, but final output also depends on your device's speaker/headphone response and volume setting, which this tool doesn't calibrate for.",
    },
  ],
  related: ["frequency-sweep", "bass-test", "noise-generator", "speaker-test"],
};

export default content;
