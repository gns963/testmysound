import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "android",
  path: "/speaker-cleaner/android",
  name: "Android",
  kind: "device-type",
  metaTitle: "Android Speaker Cleaner — Remove Water & Dust",
  metaDescription:
    "Free speaker cleaner for Android phones. Eject water and dust from your speaker in about 60 seconds, no app needed.",
  intro:
    "Android covers a huge range of phone brands and speaker designs, so grille placement varies more than on a single-brand device. This tool works the same way regardless of brand: it plays a pulsed tone through whichever speaker Android is currently routing audio to, to help shake loose water or dust.",
  speakerLayoutNote:
    "Most Android phones put the main speaker on the bottom edge, but some brands place a secondary or stereo speaker on the earpiece, the top edge, or even the back near the camera. If you're not sure where your grille is, look for small slotted openings along the edges or back of the phone.",
  tips: [
    {
      title: "Vibrate mode is Android-only",
      body: "This tool's Speaker Cleaner offers a Vibrate mode on supported Android devices, using physical vibration as an alternative to sound.",
    },
    {
      title: "Check brand-specific placement",
      body: "If you know your brand (Samsung, Xiaomi/Redmi, OnePlus, Vivo, Oppo, Realme, Pixel and others), check for a dedicated hub page for more specific guidance.",
    },
    {
      title: "Media volume, not just ringtone",
      body: "Android splits volume controls by type — make sure media/app volume specifically is turned up, not just ringtone or notification volume.",
    },
  ],
  commonIssues: [
    "Muffled speaker after rain, a splash, or a pool.",
    "Distortion or crackling at higher volumes.",
    "Dust or lint buildup in the grille from being carried in a pocket.",
    "Quiet sound caused by a case partially covering the speaker grille.",
  ],
  whenToSeeService:
    "If cleaning doesn't help after a day or two of trying, or your phone shows other signs of liquid exposure, contact your phone manufacturer's support or an independent repair shop rather than continuing to run cleaning tools indefinitely.",
  faqs: [
    {
      q: "Does this work on any Android phone?",
      a: "Yes — it works on any Android phone with a working speaker and a modern mobile browser (Chrome, Samsung Internet, Firefox, etc.), regardless of brand.",
    },
    {
      q: "Why is there a Vibrate mode for Android but not iPhone?",
      a: "Vibrate mode uses the Vibration API, which iOS Safari doesn't support for web pages — the tool automatically hides that mode where it's not available rather than showing something broken.",
    },
    {
      q: "My phone has two speakers — will this clean both?",
      a: "The tool plays through whichever output your phone's audio is currently routed to. If your phone has a true stereo pair, you may need to test and clean each side using the Left/Right Speaker Test to identify which one needs attention.",
    },
  ],
};

export default content;
