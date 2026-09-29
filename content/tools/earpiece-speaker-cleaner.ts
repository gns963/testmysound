import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "earpiece-speaker-cleaner",
  path: "/earpiece-speaker-cleaner",
  name: "Earpiece / Call Speaker Cleaner",
  shortName: "Earpiece Cleaner",
  primaryKeyword: "earpiece speaker cleaner",
  secondaryKeywords: ["call speaker cleaner", "can't hear calls phone speaker"],
  metaTitle: "Earpiece / Call Speaker Cleaner",
  metaDescription:
    "Clean your phone's earpiece (call) speaker. Free, no app — includes the honest manual method browsers can't fully automate.",
  answer:
    "The earpiece speaker is the small driver you hold to your ear during calls, separate from the main loudspeaker. Browsers can only play audio through the main loudspeaker, not the earpiece, so this tool combines a lower-gain tone on the main speaker with a manual method for the earpiece itself.",
  howToSteps: [
    "Set your phone's media volume to max and turn off Silent mode.",
    "Read the note on this page — the browser plays through your main speaker, not the earpiece, so the automated tone is a supporting step, not a complete fix for the earpiece itself.",
    "For the earpiece: hold the phone close to your ear and gently tap the earpiece grille a few times with a fingertip while on a call or voice memo playback.",
    "Tap Start below to also run a lower-volume tone through the main speaker, holding the phone upside-down so the earpiece faces the floor.",
    "Test with an actual phone call afterward — that's the only real way to check the earpiece specifically.",
  ],
  howItWorks: [
    "Phones typically have two separate speaker drivers: a main loudspeaker (for media, speakerphone, and often doubles as a second stereo channel) and a much smaller earpiece driver used only during calls.",
    "The Web Audio API that powers this tool — like virtually all browser audio — routes through the phone's default main audio output, not the earpiece specifically. There's no web standard that lets a website choose the earpiece as an output device, so we won't pretend this tool can clean it the same way it cleans the main speaker.",
    "What actually helps the earpiece: gentle physical taps to dislodge debris, and giving the phone time to dry if the earpiece got wet — the same principles as the main speaker, just without a way to vibrate it directly from the browser.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "On many iPhones the earpiece also functions as the top stereo channel during media playback — running the main Water Eject tool can indirectly help it too.",
      href: "/water-eject",
      linkLabel: "Try Water Eject →",
    },
    {
      title: "Android",
      body: "Earpiece placement is usually a thin slit above the screen; avoid inserting anything into it, even a toothpick.",
      href: "/speaker-cleaner/android",
      linkLabel: "Android speaker cleaner →",
    },
    {
      title: "During calls",
      body: "If calls sound muffled but everything else (music, videos) sounds fine, the issue is likely isolated to the earpiece, not the main speaker.",
    },
  ],
  troubleshooting: [
    {
      problem: "Calls are muffled but media/speakerphone sounds fine",
      cause:
        "The issue is likely specific to the earpiece driver or the proximity sensor mesh over it.",
      fix: "Gently clean the mesh above the screen with a soft, dry brush — avoid liquids or sharp objects near it.",
    },
    {
      problem: "Can't hear anything during calls at all",
      cause:
        "Could be a setting (e.g. call routed to Bluetooth) rather than a hardware issue.",
      fix: "Check Bluetooth isn't connected to another device, and that media volume during a call isn't muted.",
    },
    {
      problem: "Earpiece was exposed to water",
      cause:
        "Water in the mesh can muffle sound the same way it does on the main speaker.",
      fix: "Let the phone air-dry with the earpiece facing down, and avoid holding it to your wet ear until it's dry.",
    },
  ],
  safetyNote:
    "We won't claim this (or any browser tool) can route audio directly to your earpiece — that's a real technical limitation, not something we're choosing not to build. The manual method and main-speaker tone are genuinely the best browser-based options available.",
  faqs: [
    {
      q: "Can a website actually clean my earpiece speaker with sound?",
      a: "Not directly — browsers can't route audio to a phone's earpiece driver, only the main loudspeaker. We're upfront about that rather than claiming otherwise.",
    },
    {
      q: "So what's the point of this tool?",
      a: "It runs a lower-volume tone through your main speaker (which can indirectly help on phones where the earpiece doubles as a stereo channel) and walks you through the manual method that actually targets the earpiece.",
    },
    {
      q: "Is it safe to tap my earpiece speaker?",
      a: "A few gentle fingertip taps on the grille/mesh are generally fine. Don't use anything sharp or insert objects into the opening.",
    },
    {
      q: "My earpiece sounds crackly, not just quiet — is that the same issue?",
      a: "Crackling can point to actual damage rather than just water or dust. If it doesn't clear up after drying and gentle cleaning, it may need a repair check.",
    },
  ],
  related: ["water-eject", "deep-speaker-cleaner", "mic-test", "speaker-test"],
};

export default content;
