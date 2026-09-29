import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "deep-speaker-cleaner",
  path: "/deep-speaker-cleaner",
  name: "Deep Speaker Cleaner",
  shortName: "Deep Speaker Cleaner",
  primaryKeyword: "deep speaker cleaner",
  secondaryKeywords: ["speaker still muffled", "deep clean phone speaker"],
  metaTitle: "Deep Speaker Cleaner — 3-Stage Water & Dust Removal",
  metaDescription:
    "A longer 3-stage cleaning program for phone speakers still muffled after a quick clean. Free, no app, about 90 seconds.",
  answer:
    "The Deep Speaker Cleaner is a longer, 3-stage version of a sound-based speaker cleaner: a pulsed tone to loosen debris, a frequency sweep to dislodge it from different spots on the grille, then a steady tone for a final push. It's a next step when a quick 60-second clean didn't fully clear a muffled speaker.",
  howToSteps: [
    "Try the standard Water Eject tool first — use this if your speaker is still muffled afterward.",
    "Set volume to max and turn off Silent mode.",
    "Hold the phone with the speaker grille facing down.",
    "Tap Start and let all 3 stages run (about 90 seconds total) — the screen shows which stage you're on.",
    "Wipe the grille dry afterward and test with a normal call or video.",
    "If it's still muffled after 2-3 full runs, give the phone a few hours to air-dry before trying again.",
  ],
  howItWorks: [
    "A single tone works well for water or dust in one spot, but debris doesn't always sit in the same place on the grille. This tool runs three stages back to back: a pulsed 165Hz tone to start loosening anything stuck, a 100-500Hz sweep that moves through a wider range to reach debris a single frequency might miss, then a steady tone as a final push.",
    "It's the same underlying mechanism as the standard cleaner — vibrating the speaker diaphragm — just run longer and across more frequencies for a more thorough pass.",
  ],
  tips: [
    {
      title: "When to use this over Water Eject",
      body: "If the quick 60-second clean helped a little but the sound is still noticeably muffled, this longer program is the next reasonable step before assuming hardware damage.",
    },
    {
      title: "iPhone & Android",
      body: "Works the same way regardless of brand — the phone just needs a working speaker to vibrate.",
      href: "/speaker-cleaner/android",
      linkLabel: "Browse by device →",
    },
    {
      title: "Laptops",
      body: "The 3-stage program works on laptop speakers too, though larger drivers may need less coaxing than small phone speakers.",
      href: "/speaker-cleaner/laptop",
      linkLabel: "Laptop speaker cleaner →",
    },
  ],
  troubleshooting: [
    {
      problem: "No change after multiple full 3-stage runs",
      cause:
        "The muffling may not be caused by loose surface water or dust at all.",
      fix: "Check for physical damage or debris lodged in the grille, and consider that it could be a hardware fault rather than something a sound-based tool can fix.",
    },
    {
      problem: "One stage sounds much quieter than the others",
      cause:
        "Normal — different frequencies and the pulse pattern naturally sound different in volume and character.",
      fix: "No action needed; let the full 90 seconds complete.",
    },
    {
      problem: "Phone gets warm during the longer run",
      cause:
        "Playing audio for 90 seconds at high volume uses more of the amplifier than normal listening.",
      fix: "This is normal for a short session. Stop the tool if it feels hot to the touch or you notice any smell.",
    },
  ],
  safetyNote:
    "This is a longer session than the standard cleaner, so we cap it at 3 back-to-back runs with a cooldown after. It helps with surface water and dust; it does not repair a damaged speaker driver.",
  faqs: [
    {
      q: "Should I use this instead of the regular Speaker Cleaner?",
      a: "Try the standard Water Eject tool first — it's shorter and works for most quick fixes. Use this one if the sound is still muffled afterward.",
    },
    {
      q: "Why does it take 90 seconds instead of 60?",
      a: "It runs three different stages (pulse, sweep, steady tone) instead of one, covering more frequencies and giving debris more chances to shake loose.",
    },
    {
      q: "Can I stop it partway through?",
      a: "Yes — the Stop button works at any point, and the app fades the audio out smoothly rather than cutting it off abruptly.",
    },
    {
      q: "Will this fix a speaker that's actually broken?",
      a: "No. If the speaker diaphragm or amplifier is physically damaged, no sound-based tool will repair it — you'd need a professional repair.",
    },
  ],
  related: [
    "water-eject",
    "speaker-dust-remover",
    "earpiece-speaker-cleaner",
    "speaker-test",
  ],
};

export default content;
