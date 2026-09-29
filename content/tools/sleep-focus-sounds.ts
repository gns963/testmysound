import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "sleep-focus-sounds",
  path: "/sleep-focus-sounds",
  name: "Sleep & Focus Sounds",
  shortName: "Sleep/Focus Sounds",
  engine: "ambientSound",
  priority: "P1",
  primaryKeyword: "sleep sounds",
  secondaryKeywords: ["focus sounds", "white noise for sleep", "rain sounds", "ocean sounds", "brown noise sleep"],
  metaTitle: "Sleep & Focus Sounds — Rain, Ocean, White Noise",
  metaDescription:
    "Free ambient sound player — rain, ocean waves, white/pink/brown noise and fan hum, with a fading sleep timer. Synthesized, not recordings.",
  answer:
    "Sleep and focus sounds are steady ambient noise textures — rain, ocean waves, white, pink and brown noise, and a fan hum — that many people play to mask distracting noise while falling asleep or working. Every sound here is synthesized from filtered noise in your browser, not a recording, with a sleep timer that fades out gently instead of cutting off abruptly.",
  howToSteps: [
    "Pick a sound — Rain, Ocean Waves, White Noise, Pink Noise, Brown Noise or Fan Hum — and tap it to start playing immediately.",
    "Adjust the volume slider to a comfortable level, ideally well below maximum, especially if you'll have this playing for hours.",
    "Set a sleep timer — 15, 30, 60 or 90 minutes — if you want it to stop on its own instead of playing all night.",
    "Switch sounds any time by tapping a different one; the current sound fades out and the new one starts right away.",
    "Lock your screen or switch apps if you like — playback is designed to keep going in the background, similar to a music app.",
    "When the sleep timer ends, the sound fades out gently over several seconds instead of cutting off abruptly.",
    'Tap "Stop" any time to end playback immediately, with no fade needed.',
  ],
  howItWorks: [
    "Every sound here starts as one of three noise types — white, pink or brown — generated directly in your browser rather than loaded from an audio file. White noise has equal energy across all frequencies; pink and brown noise roll off progressively more at higher frequencies, which is why brown noise sounds deeper and duller than white noise.",
    "Rain, Ocean Waves and Fan Hum take that base noise and reshape it with a filter. Rain uses a high-pass filter that emphasizes the higher frequencies, similar to a light hiss. Ocean Waves uses a low-pass filter for a deep rumble, plus a slow, continuous volume swell — about one cycle every 6-7 seconds — that mimics waves rising and falling. None of this is a recording of an actual rainstorm or ocean; it's noise shaped to evoke that feeling.",
    "The sleep timer doesn't just stop playback abruptly at the set time — it fades the volume down smoothly over about 8 seconds first, so you're less likely to be jolted awake by a sudden silence or click.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "iOS generally keeps browser audio playing after the screen locks, similar to a music or podcast app — if playback does stop unexpectedly, check that Low Power Mode or a background-refresh restriction isn't affecting Safari.",
    },
    {
      title: "Android",
      body: "Some Android phones' aggressive battery-optimization settings can pause background tab audio after the screen is off for a while — if this happens, check your battery optimization settings for your browser app.",
    },
    {
      title: "Windows",
      body: "On a laptop, closing the lid will suspend all playback regardless of any browser setting, since the whole system sleeps — leave the lid open, or use a phone or tablet instead for overnight use.",
    },
    {
      title: "Mac",
      body: "The same applies on a MacBook — closing the lid suspends everything system-wide, so this only keeps playing with the lid open or on a phone or tablet.",
    },
  ],
  troubleshooting: [
    {
      problem: "Playback stopped on its own before the sleep timer finished",
      cause: "The browser tab may have been closed, the device entered a deep battery-saving mode, or the system fully slept, like a laptop lid closing.",
      fix: "Keep the tab open and avoid closing a laptop lid; on phones, check background app or battery restrictions for your browser.",
    },
    {
      problem: "The sound seems to have an audible seam or loop point",
      cause: "Each texture loops a short, few-second generated buffer continuously, and very attentive listening can sometimes catch the seam.",
      fix: "This is a known tradeoff for a lightweight, no-download tool rather than a long pre-rendered audio file; it's usually far less noticeable at low volume or while falling asleep.",
    },
    {
      problem: "I want two sounds playing together, like rain and brown noise",
      cause: "This tool intentionally plays one sound at a time, to keep the interface and audio graph simple.",
      fix: "This isn't currently supported — pick whichever single sound is closest to what you want.",
    },
    {
      problem: "Volume seems to jump when switching sounds",
      cause: "Different noise textures and filters can feel louder or quieter at the same volume slider position due to their frequency content.",
      fix: "Re-check the volume slider after switching sounds, since perceived loudness varies by texture even at an identical numeric level.",
    },
  ],
  safetyNote:
    "This tool is a simple ambient sound player, not a sleep aid, therapy device, or treatment for insomnia or any medical condition — if you have ongoing sleep difficulties, consider talking to a doctor. As with any audio, keep the volume at a comfortable level, especially over long overnight sessions, and see the Safe Volume Calculator on this site if you're unsure what a safe listening level looks like.",
  faqs: [
    {
      q: "Are these real recordings of rain or ocean waves?",
      a: "No — every sound is synthesized from filtered noise generated in your browser. They're designed to evoke rain, ocean or fan sounds, not to be indistinguishable recordings of the real thing.",
    },
    {
      q: "Is it safe to fall asleep with this playing all night?",
      a: "The sleep timer is there so you don't need to — set it to a duration you're comfortable with and it fades out on its own. If you do want it playing longer, keep the volume modest, the same as you would with any device left on overnight.",
    },
    {
      q: "Do these sounds actually help you sleep or focus?",
      a: "Many people find steady background noise helps mask distracting sounds, which is a common, widely reported experience — but this isn't a clinically tested treatment, and results vary by person.",
    },
    {
      q: "Why does the sound stop when I switch to another app or tab?",
      a: "It shouldn't, on most modern mobile browsers — background audio is generally supported the same way a music app works. If it does stop, that's usually a device battery-optimization setting, not something this tool controls.",
    },
    {
      q: "Can I download these sounds as an audio file?",
      a: "No — they're generated live in your browser each time you play them, not pre-rendered files, so there's nothing to download.",
    },
    {
      q: "What's the difference between white, pink and brown noise here?",
      a: "White noise has equal energy at every frequency; pink and brown noise roll off progressively more at higher frequencies, making pink noise softer and brown noise noticeably deeper and duller.",
    },
    {
      q: "Will this drain my battery overnight?",
      a: "Playing audio does use some battery, similar to any music app running for the same length of time — using the sleep timer instead of playing all night reduces that, if it's a concern.",
    },
  ],
  related: ["noise-generator", "tone-generator", "safe-volume-calculator", "db-meter"],
  relatedBlogPosts: ["how-loud-is-too-loud-decibel-levels-explained"],
};

export default content;
