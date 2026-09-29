import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "bass-test",
  path: "/bass-test",
  name: "Bass Test",
  shortName: "Bass Test",
  primaryKeyword: "bass test",
  secondaryKeywords: [
    "subwoofer test",
    "low frequency test",
    "20hz to 200hz test",
  ],
  metaTitle: "Bass Test — 20Hz to 200Hz Subwoofer Test",
  metaDescription:
    "Free bass and subwoofer test: a 20-200Hz sweep plus fixed bass frequencies (30-100Hz). No app needed.",
  answer:
    "A bass test plays low frequencies — 20Hz to 200Hz — through your speaker or subwoofer, either as a sweep or as fixed test tones, so you can check how much genuine low-end your setup produces and whether it distorts or rattles at low frequencies.",
  howToSteps: [
    "Start at low volume — bass can be deceptively loud once your ears adjust, and it's harder on small speakers than higher frequencies.",
    "Use Sweep to hear a continuous 20-200Hz ramp and notice where the bass starts to feel/sound present, and where it fades or distorts.",
    "Use Frequencies to play fixed bass tones (30/40/50/60/80/100Hz) individually.",
    "Listen and feel for rattling, buzzing, or the sound cutting out — those point to a speaker or enclosure issue, not just a small driver's natural limits.",
    "Gradually raise volume only after confirming everything sounds clean at a lower level.",
  ],
  howItWorks: [
    "Bass frequencies require moving a lot of air, which is why they're the hardest range for small speakers to reproduce cleanly — most phone and laptop speakers roll off sharply below 100-150Hz simply due to driver size, not a fault.",
    'Playing a controlled sweep or fixed tones in this range lets you distinguish "my speaker just doesn\'t do much bass" (a gradual, clean fade) from "something is wrong" (buzzing, rattling, or a driver that sounds like it\'s hitting its mechanical limit).',
  ],
  tips: [
    {
      title: "Small speakers won't produce much sub-bass",
      body: "It's normal for phone and laptop speakers to fade out well before 20Hz — that's a size limitation, not necessarily a defect.",
    },
    {
      title: "Testing a subwoofer or home speaker?",
      body: "This range is exactly where a dedicated subwoofer should shine — a flat or muffled response here is worth investigating on purpose-built bass hardware.",
    },
    {
      title: "Check for rattling objects nearby",
      body: "Loose items near your speaker (phone case, desk items) can rattle at bass frequencies and be mistaken for speaker distortion.",
    },
  ],
  troubleshooting: [
    {
      problem: "Buzzing or rattling at specific low frequencies",
      cause:
        "Could be the speaker itself distorting, or a loose object nearby vibrating in sympathy.",
      fix: "Move other objects away from the speaker and retest; if the buzz persists, it's likely the speaker or enclosure.",
    },
    {
      problem: "No bass at all, even close to 200Hz",
      cause:
        "Very small speakers (some phones especially) may only meaningfully reproduce well above 150-200Hz.",
      fix: "This can be normal for the hardware — compare against a known good speaker of similar size before assuming a fault.",
    },
    {
      problem: "Bass sounds fine at low volume but distorts as you raise it",
      cause: "The speaker or amplifier is hitting its output limit.",
      fix: "Keep volume below the point where distortion starts for that device — this is often a hardware ceiling, not a fixable issue.",
    },
  ],
  safetyNote:
    "Bass frequencies can sound quieter than they actually are, leading people to turn volume up higher than intended. Start low and raise gradually, and stop if a speaker sounds like it's straining.",
  faqs: [
    {
      q: "Why does my phone barely produce any bass?",
      a: "Small speaker drivers physically can't move enough air to reproduce low frequencies well — this is a size limitation common to nearly all phone and laptop speakers, not usually a fault.",
    },
    {
      q: "What's a good way to test a subwoofer specifically?",
      a: "Use the Sweep mode at a moderate volume and listen/feel for a smooth response across the full 20-200Hz range without noticeable dead spots or buzzing.",
    },
    {
      q: "Is it bad for my speaker to play low bass at high volume?",
      a: "Sustained high-volume bass is more physically demanding on a speaker than higher frequencies at the same volume — if it sounds strained, lower the volume rather than pushing through it.",
    },
    {
      q: "Can this test damage my speakers?",
      a: "At reasonable volumes, no — the tool is capped and ramps gain smoothly. As with any audio, sustained very high volume on any content can stress speakers over time.",
    },
  ],
  related: [
    "speaker-test",
    "frequency-sweep",
    "tone-generator",
    "left-right-speaker-test",
  ],
};

export default content;
