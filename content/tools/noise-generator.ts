import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "noise-generator",
  path: "/noise-generator",
  name: "White / Pink / Brown Noise Generator",
  shortName: "Noise Generator",
  primaryKeyword: "white noise generator",
  secondaryKeywords: [
    "pink noise generator",
    "brown noise generator",
    "noise for sleep online",
  ],
  metaTitle: "White Noise, Pink Noise & Brown Noise Generator",
  metaDescription:
    "Free white, pink and brown noise generator with volume control and a sleep/focus timer. No app, no sign-up.",
  answer:
    "This tool generates white, pink or brown noise directly in your browser — continuous, randomized sound often used for sleep, focus, or masking background distractions. White noise has equal energy across all frequencies, pink noise is weighted toward lower frequencies for a softer sound, and brown noise is weighted even further toward deep, rumbly low frequencies.",
  howToSteps: [
    "Choose White, Pink or Brown noise using the tabs.",
    "Set your volume to a comfortable level.",
    "Optionally pick a timer (15/30/60 minutes) so it stops automatically.",
    "Tap Play to start, and Stop whenever you're done — it also auto-stops after 2 minutes if you don't set a timer and forget to stop it manually.",
    "Switch colors any time, even while it's playing, to compare which one you prefer.",
  ],
  howItWorks: [
    "White noise contains equal energy at every frequency, which is why it sounds bright and hiss-like — similar to static or a fan on high. It's generated here from pure random values, the simplest form of noise.",
    'Pink noise reduces energy at higher frequencies (roughly halving energy each time frequency doubles), giving it a softer, deeper, more "natural" sound closer to steady rainfall. Brown noise reduces high-frequency energy even further, producing a low, rumbly sound closer to a distant waterfall or heavy surf.',
    "None of these are recordings — each is generated algorithmically in your browser using standard, well-known noise-shaping techniques, then looped continuously while playing.",
  ],
  tips: [
    {
      title: "For sleep",
      body: "Brown or pink noise tends to feel less harsh than white noise for many people over a full night — try a longer timer like 60 minutes.",
    },
    {
      title: "For focus/masking office noise",
      body: "White noise's even coverage can be more effective at masking varied background chatter than pink or brown.",
    },
    {
      title: "Combine with the dB Meter",
      body: "If you're using noise to mask a loud environment, check the actual ambient level first so you're not compensating with more volume than needed.",
      href: "/db-meter",
      linkLabel: "Check ambient noise level →",
    },
  ],
  troubleshooting: [
    {
      problem: "Noise stopped playing on its own",
      cause:
        "Either your chosen timer finished, or the built-in 2-minute safety auto-stop kicked in if no timer was set.",
      fix: "Tap Play again, and set a timer if you want it to run longer unattended.",
    },
    {
      problem: "Noticeable repeating pattern in the sound",
      cause:
        "The noise loops a short buffer (a few seconds) rather than generating infinitely, so a subtle loop point can sometimes be noticeable.",
      fix: "This is a known limitation of the current version — it's usually much less noticeable at lower volumes or with other ambient sound present.",
    },
    {
      problem: "Switching noise colors sounds like a hard cut",
      cause: "Changing the noise type restarts playback on a new buffer.",
      fix: "This is expected behavior — a brief transition is normal when switching colors.",
    },
  ],
  safetyNote:
    "Keep volume at a comfortable level, especially for overnight use — very loud sustained noise, even for sleep, isn't better for you than moderate volume.",
  faqs: [
    {
      q: "What's the difference between white, pink and brown noise?",
      a: "White noise has equal energy across all frequencies (bright, hissy). Pink noise reduces high-frequency energy for a softer sound. Brown noise reduces it even further for a deep, rumbly sound.",
    },
    {
      q: "Does noise actually help with sleep or focus?",
      a: "Many people find steady background noise helps mask distracting sounds and makes it easier to fall or stay asleep, though individual response varies — this is general information, not medical advice.",
    },
    {
      q: "Will this keep playing if I lock my phone or switch tabs?",
      a: "Behavior can vary by browser and device — some browsers suspend background audio in inactive tabs or when the screen locks. Keep the tab active for the most reliable playback.",
    },
    {
      q: "Is generated noise the same quality as a recorded noise track?",
      a: "It's a standard algorithmic approach to noise generation, not a studio recording — for most sleep/focus/masking uses the difference isn't meaningful, but audiophiles may notice a difference in a dedicated recording.",
    },
  ],
  related: ["tone-generator", "db-meter", "hearing-test", "frequency-sweep"],
};

export default content;
