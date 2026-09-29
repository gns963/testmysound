import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "hearing-test",
  path: "/hearing-test",
  name: "Hearing Test",
  shortName: "Hearing Test",
  primaryKeyword: "hearing test",
  secondaryKeywords: [
    "hearing age test",
    "high frequency hearing test",
    "online hearing range test",
  ],
  metaTitle: "Hearing Test — High-Frequency Hearing Range Check",
  metaDescription:
    "Free online hearing range check, 8kHz to 19kHz. Not a medical or calibrated test — see an audiologist for real concerns.",
  answer:
    "This hearing test plays a ladder of ascending tones from 8kHz to 19kHz and asks you to stop it when you can no longer hear the sound, giving a rough sense of the top of your hearing range. It's a fun, informal check based on the well-known pattern of age-related high-frequency hearing decline — not a medical or calibrated diagnostic test.",
  howToSteps: [
    "Use headphones in a quiet room for the most reliable result.",
    "Set your volume to a comfortable, normal listening level before starting — not maxed out.",
    "Tap Start and listen carefully as the tone steps upward in frequency.",
    'Tap "I can\'t hear this anymore" the moment you stop hearing sound.',
    "See your rough result and the typical age range it's associated with — remember it's a guide, not a diagnosis.",
  ],
  howItWorks: [
    "High-frequency hearing loss (presbycusis) is one of the most well-documented and common patterns of age-related hearing change: most people's ability to hear very high frequencies gradually declines over decades, even without any specific hearing damage or condition. This tool exploits that well-known pattern by playing tones that step upward from 8kHz — a range most people hear clearly — up to 19kHz, near the edge of typical adult hearing.",
    "Where you stop hearing the ladder gives a rough indication tied to that general population pattern. It is not a substitute for an audiogram, doesn't account for hearing in one ear vs. both, and is heavily affected by your speaker/headphone quality, volume level, and background noise — all reasons we present the result as a wide typical range, not a specific number.",
  ],
  tips: [
    {
      title: "Headphones matter a lot here",
      body: "Phone and laptop speakers often can't reproduce the highest frequencies tested cleanly, which would make your result look worse than your actual hearing.",
    },
    {
      title: "Try it again on a different device",
      body: "If your result seems surprisingly low, retest with headphones or a different device before drawing conclusions.",
    },
    {
      title: "Concerned about your hearing specifically?",
      body: "This tool is for casual curiosity only — an audiologist can give you an actual, medically meaningful hearing assessment.",
    },
  ],
  troubleshooting: [
    {
      problem: "Result seems much lower than you'd expect for your age",
      cause:
        "Often the playback device (phone/laptop speakers) simply can't reproduce very high frequencies cleanly, not your hearing.",
      fix: "Retest with good headphones — the difference is often significant.",
    },
    {
      problem: "You heard the tone the whole way through",
      cause:
        "Your hearing at the tested range is within the typical range tested, or the top frequency happens to be within what you can hear.",
      fix: "No action needed — that's a good result within what this informal test measures.",
    },
    {
      problem: "You're concerned about sudden or one-sided hearing loss",
      cause:
        "This casual tool isn't designed to detect or diagnose specific hearing conditions.",
      fix: "See an audiologist or doctor for any real concern about your hearing, especially if it's sudden, one-sided, or accompanied by other symptoms.",
    },
  ],
  safetyNote:
    "This is explicitly not a medical or calibrated hearing test. It's a casual, fun estimate based on a well-known general pattern — for any real concern about your hearing, see an audiologist.",
  faqs: [
    {
      q: "Is this a real hearing test?",
      a: "No — it's an informal, uncalibrated estimate for fun, based on the general pattern of age-related high-frequency hearing decline. A real hearing test (audiogram) requires calibrated equipment and a trained professional.",
    },
    {
      q: 'How is my "hearing age" calculated?',
      a: "We map the highest frequency you could hear to a wide typical age range based on well-documented general population patterns — it's a rough guide, not a calculated exact age.",
    },
    {
      q: "Why does the test only go up to 19kHz?",
      a: "That covers the range where age-related decline is most noticeable and measurable for most people; very few adults can reliably hear meaningfully above that regardless of age.",
    },
    {
      q: "My result was worse than I expected — should I be worried?",
      a: "Not necessarily — your speaker or headphones, volume level, and background noise all affect the result significantly. If you're genuinely concerned, an audiologist can give you an accurate assessment.",
    },
  ],
  related: ["speaker-test", "db-meter", "tone-generator", "noise-generator"],
};

export default content;
