import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "iphone",
  path: "/speaker-cleaner/iphone",
  name: "iPhone",
  kind: "device-type",
  metaTitle: "iPhone Speaker Cleaner — Remove Water & Dust",
  metaDescription:
    "Free speaker cleaner for iPhone. Eject water and dust from the bottom speaker and earpiece in about 60 seconds, no app needed.",
  intro:
    "iPhones use a bottom-firing loudspeaker plus the top earpiece, which many models also use as a second stereo channel during media playback. This tool plays a pulsed tone through whichever speaker your iPhone is routing audio to, to help shake loose water or dust sitting on the grille.",
  speakerLayoutNote:
    "The main speaker grille sits on the bottom edge, usually next to the charging port. The earpiece sits above the screen and, on many models, also acts as a stereo tweeter for media — which is why both can sound muffled together after a splash.",
  tips: [
    {
      title: "Hold it grille-down",
      body: "Point the bottom edge toward the floor while the tool runs, so loosened water has somewhere to go.",
    },
    {
      title: "Check the earpiece too",
      body: "If calls sound muffled but music doesn't, or vice versa, the issue may be isolated to one driver — see the Earpiece Cleaner for that specific case.",
    },
    {
      title: "Don't rely on water resistance alone",
      body: "A water-resistance rating describes short-term exposure limits, not immunity from a muffled speaker after a splash.",
    },
  ],
  commonIssues: [
    "Muffled sound after a splash, shower, pool, or rain.",
    "One channel (usually the earpiece acting as tweeter) quieter than the main speaker.",
    "Crackling at high volume, which can indicate actual driver damage rather than just water or dust.",
    "Muffled call audio specifically, pointing to the earpiece rather than the main speaker.",
  ],
  whenToSeeService:
    "If sound is still distorted or absent after a few clean/dry cycles over a day or two, or if the phone shows other signs of liquid exposure, it's worth having it looked at by Apple or an authorized repair provider rather than continuing to run cleaning tools indefinitely.",
  faqs: [
    {
      q: "Does this work on every iPhone model?",
      a: "The tool works on any iPhone with a working speaker and a modern browser — it doesn't require a specific model, since it just plays sound through whatever iOS routes audio to.",
    },
    {
      q: "Can I run this tool through Safari?",
      a: "Yes — it works in Safari and other iOS browsers. iOS may require you to have Silent mode off and volume up for the tone to be audible, which the pre-run checklist reminds you to check.",
    },
    {
      q: "Will this affect my iPhone's water resistance rating?",
      a: "No — playing sound through the speaker doesn't affect the phone's seals or rating in any way.",
    },
  ],
};

export default content;
