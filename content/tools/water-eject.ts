import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "water-eject",
  path: "/water-eject",
  name: "Water Eject",
  shortName: "Water Eject",
  primaryKeyword: "speaker cleaner",
  secondaryKeywords: ["phone speaker cleaner", "water eject", "fix my speaker"],
  metaTitle: "Speaker Cleaner — Eject Water & Dust From Your Phone Speaker",
  metaDescription:
    "Free, no-app speaker cleaner that ejects water and dust from your phone in about 60 seconds. Works on iPhone, Android and laptops.",
  answer:
    "A speaker cleaner is a sound-based tool that plays a low-frequency pulsed tone — around 165Hz — through your phone's speaker to vibrate trapped water or dust loose from the grille. It's a free, browser-based first step for a muffled speaker after a splash, not a repair for hardware damage.",
  howToSteps: [
    "Turn your phone's media volume all the way up and make sure Silent/Do Not Disturb mode is off.",
    "Hold the phone with the speaker grille facing down, over a towel or sink.",
    "Tap Start. The tool plays a pulsed tone for about 60 seconds — you'll feel it vibrate.",
    "When it finishes, wipe the grille with a soft, dry cloth.",
    'Tap "Did it help?" so we can track real-world results, or run it again if it\'s still muffled.',
    "Still sounds off after 2-3 tries? Move on to the Deep Clean or let the phone air-dry for a few hours before trying again.",
  ],
  howItWorks: [
    "Most phone speakers are small diaphragms that push air to make sound. When water sits on or behind the grille, it dampens that movement and muffles the sound, and can trap the diaphragm against the housing.",
    "Playing a pulsed low-frequency tone makes the diaphragm oscillate more forcefully than normal speech or music would. The rapid back-and-forth motion — combined with gravity, if you hold the phone grille-down — helps shake water droplets out through the grille openings.",
    "This is a mechanical nudge, not magic: it works best on small amounts of water sitting on the surface. It can't remove water that has worked its way deeper into the phone, and it does nothing for actual liquid damage to internal components.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Many iPhones use the bottom speaker grille and the earpiece as a stereo pair — clean both if audio still sounds off after this tool.",
      href: "/speaker-cleaner/iphone",
      linkLabel: "iPhone speaker cleaner →",
    },
    {
      title: "Android",
      body: "Grille placement varies a lot by brand — check the bottom edge first, then the back near the camera on some models.",
      href: "/speaker-cleaner/android",
      linkLabel: "Android speaker cleaner →",
    },
    {
      title: "Laptop",
      body: "Laptop speakers are usually larger and less exposed, but the same pulsed-tone approach can help with dust or light splashes.",
      href: "/speaker-cleaner/laptop",
      linkLabel: "Laptop speaker cleaner →",
    },
  ],
  troubleshooting: [
    {
      problem: "No sound at all, not just muffled",
      cause:
        "Could be a deeper hardware or software issue, not just water on the grille.",
      fix: "Check your phone isn't muted or connected to another Bluetooth device, then try a restart before assuming hardware damage.",
    },
    {
      problem: "Sound distorts or crackles when you play anything loud",
      cause: "A sign the diaphragm may be damaged, not just wet.",
      fix: "Stop running the tool at high volume repeatedly — let the phone dry fully and consider a repair check if it persists.",
    },
    {
      problem: "Muffled sound comes back after a few hours",
      cause:
        "Water that migrated deeper is slowly working its way back to the grille.",
      fix: "Let the phone sit speaker-down on a dry towel for a few hours, then run the tool again.",
    },
    {
      problem: "Phone was submerged, not just splashed",
      cause:
        "This tool only addresses surface water on the grille, not internal liquid exposure.",
      fix: "Power off the phone if you haven't already, don't charge it, and let it fully dry (or see a repair shop) before worrying about speaker sound.",
    },
  ],
  safetyNote:
    "This tool helps shift small amounts of water or dust sitting on the speaker grille. It does not repair liquid-damaged components, and we're not responsible for any device damage — stop immediately if you hear distortion or the sound gets worse.",
  faqs: [
    {
      q: "Does a sound-based speaker cleaner actually work?",
      a: "It can help push out small amounts of surface water or dust by vibrating the speaker diaphragm. It won't fix internal liquid damage or a genuinely broken speaker.",
    },
    {
      q: "Is it safe to run this on a wet phone?",
      a: "Yes — playing sound through a speaker that has water on it isn't dangerous to the phone. Just don't charge the phone while it's wet, regardless of this tool.",
    },
    {
      q: "Why 165Hz?",
      a: "It's a low enough frequency to move real air and vibrate the speaker diaphragm noticeably, while still being within what small phone speakers can reproduce clearly.",
    },
    {
      q: "Does putting my phone in rice help instead?",
      a: "No — rice doesn't actively draw out moisture any better than open air, and grains can get lodged in ports. Air-drying or a sound-based nudge like this tool are better first steps.",
    },
    {
      q: "How many times can I run it?",
      a: "We cap it at 3 back-to-back cycles with a short cooldown after, mainly so you don't run your speaker at volume indefinitely. Spacing out attempts with drying time in between tends to help more than running it constantly.",
    },
    {
      q: "My phone is IP68 rated — do I even need this?",
      a: "Water resistance ratings describe short-term exposure limits, not a guarantee against muffled sound. Water can still sit on the grille after a splash even on a water-resistant phone.",
    },
  ],
  related: [
    "deep-speaker-cleaner",
    "speaker-dust-remover",
    "earpiece-speaker-cleaner",
    "left-right-speaker-test",
  ],
};

export default content;
