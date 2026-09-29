import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "speaker-test",
  path: "/speaker-test",
  name: "Speaker Sound Test",
  shortName: "Speaker Test",
  primaryKeyword: "speaker test",
  secondaryKeywords: [
    "test my speaker",
    "speaker frequency test",
    "check if speaker is damaged",
  ],
  metaTitle: "Speaker Sound Test",
  metaDescription:
    "Test your speakers with a quick check, a full 20Hz-20kHz sweep, or individual frequencies. Free, no app needed.",
  answer:
    "A speaker sound test plays known tones through your speaker — a quick check, a full 20Hz-20kHz sweep, or fixed frequencies — so you can confirm it's producing clean sound across the range it's supposed to cover. It's a diagnostic tool, not a hearing test, though the sweep also shows roughly where your own hearing tapers off.",
  howToSteps: [
    "Start with Quick Test for a fast low/mid/high check across three tones.",
    "Use Full Sweep to hear a continuous 20Hz-20kHz sweep — listen for any point where the sound cuts out, distorts, or changes character unexpectedly.",
    'If you stop hearing sound before the sweep finishes, tap "I stopped hearing it" to see roughly where your hearing (or the speaker) topped out.',
    "Use Frequencies to play fixed test tones (50Hz-16kHz) individually and check each one sounds clean.",
    "Listen for buzzing, crackling, or silence at any point — those point to a speaker issue rather than a hearing limit.",
  ],
  howItWorks: [
    "Real music and speech only exercise part of a speaker's range at any moment, so problems in specific frequency bands can go unnoticed during normal listening. A full sweep or a set of fixed test tones deliberately exercises the entire audible range (roughly 20Hz to 20kHz) so gaps or distortion become obvious.",
    "During the full sweep, whether you personally stop hearing sound before it reaches 20kHz usually reflects your own hearing range rather than a speaker fault — most adult hearing tapers off well below 20kHz, especially at higher frequencies. A speaker fault instead usually sounds like crackling, buzzing, or a hard cutout rather than a gradual fade.",
  ],
  tips: [
    {
      title: "Distortion vs. hearing limit",
      body: "A gradual, clean fade near the top of the sweep is normal hearing decline. Crackling, buzzing, or a sudden hard cutout points to a speaker problem instead.",
    },
    {
      title: "Test at a moderate volume first",
      body: "Very high volume can mask genuine speaker distortion by overdriving healthy speakers too — test at a normal listening level before maxing it out.",
    },
    {
      title: "Curious about your hearing specifically?",
      body: "The dedicated Hearing Test tool is built for that comparison and gives a typical age-range estimate.",
      href: "/hearing-test",
      linkLabel: "Try the Hearing Test →",
    },
  ],
  troubleshooting: [
    {
      problem: "Sound cuts out completely at a specific frequency",
      cause:
        "Likely a genuine speaker fault at that frequency, not a hearing limit.",
      fix: "Try the same test on headphones or another device to confirm it's the speaker and not the audio source.",
    },
    {
      problem: "Crackling or buzzing during the sweep",
      cause: "Can indicate a damaged speaker cone or loose component.",
      fix: "Lower the volume and retest — if crackling persists even at low volume, it's likely hardware, not a volume issue.",
    },
    {
      problem: "Individual frequency chips sound fine but full sweep has gaps",
      cause:
        "Some faults only show up during continuous frequency changes, not static tones.",
      fix: "Trust the full sweep result over individual chips if they disagree — it's a more thorough check.",
    },
  ],
  safetyNote:
    "The full sweep and bass frequencies can get loud, especially at the low end. Start at a moderate volume, and stop immediately if anything sounds physically uncomfortable rather than just unfamiliar.",
  faqs: [
    {
      q: "What frequencies can phone speakers actually play?",
      a: "Most phone speakers cover roughly 100Hz-15kHz reasonably well, with real drop-off below 100Hz — true sub-bass. That's normal for small drivers, not a defect.",
    },
    {
      q: "I couldn't hear anything past about 14kHz — is my speaker broken?",
      a: "Probably not — that's within the normal range where adult hearing starts tapering off, especially with age. Try the same sweep on a different device or with someone younger to compare.",
    },
    {
      q: "What's the difference between this and the Hearing Test tool?",
      a: "This tool is primarily for diagnosing speaker health across its full range. The dedicated Hearing Test tool is framed specifically around estimating your hearing range, with typical-age context.",
    },
    {
      q: "Can I use this to test earbuds or headphones?",
      a: "Yes — plug them in or connect via Bluetooth first, then run any of the three tests the same way.",
    },
  ],
  related: [
    "left-right-speaker-test",
    "bass-test",
    "hearing-test",
    "headphone-test",
  ],
};

export default content;
