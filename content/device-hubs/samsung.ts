import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "samsung",
  path: "/speaker-cleaner/samsung",
  name: "Samsung",
  kind: "brand",
  metaTitle: "Samsung Speaker Cleaner — Remove Water & Dust",
  metaDescription:
    "Free speaker cleaner for Samsung Galaxy phones. Eject water and dust from the main speaker in about 60 seconds, no app needed.",
  intro:
    "Samsung Galaxy phones typically use a bottom-firing main speaker, and many Galaxy models also use the earpiece as a second channel during media playback, similar to other stereo-capable phones. This tool plays a pulsed tone to help shake loose water or dust from whichever speaker is active.",
  speakerLayoutNote:
    "The main speaker grille is usually along the bottom edge. Exact placement (and whether the earpiece doubles as a stereo channel) varies by specific Galaxy model and generation — check your model's speaker if you're unsure which grille is muffled.",
  tips: [
    {
      title: "Vibrate mode is available on Android",
      body: "Samsung phones support the Vibrate mode in this tool's Speaker Cleaner, which uses physical vibration instead of (or alongside) sound — worth trying if the tone-based modes don't help.",
    },
    {
      title: "Hold it grille-down",
      body: "Point the bottom edge toward the floor while the tool runs so loosened water can fall away.",
    },
    {
      title: "One UI sound settings",
      body: "Double-check media volume specifically (not just ringtone volume) is turned up in Samsung's sound settings before running the tool.",
    },
  ],
  commonIssues: [
    "Muffled speaker after exposure to rain, a pool, or a spill.",
    "Speaker sounds fine at low volume but distorts or cuts out at high volume.",
    "Quieter sound after a case or screen protector installation blocking part of the grille.",
    "One speaker channel weaker than the other during stereo playback.",
  ],
  whenToSeeService:
    "If a few cleaning cycles over a day or two don't help, or the phone shows other signs of liquid exposure, contact Samsung support or an authorized repair center rather than continuing to run cleaning tools indefinitely.",
  faqs: [
    {
      q: "Does this work on all Galaxy phones?",
      a: "It works on any Samsung phone with a working speaker and a modern mobile browser — no specific model requirement.",
    },
    {
      q: "Should I use Water, Dust, or Vibrate mode?",
      a: "Start with Water mode for a wet speaker or Dust mode for debris; Vibrate mode (Android-only) is a physical alternative worth trying if sound-based modes don't help.",
    },
    {
      q: "Is this affiliated with Samsung?",
      a: "No — this is an independent tool, not affiliated with, sponsored by, or endorsed by Samsung.",
    },
  ],
};

export default content;
