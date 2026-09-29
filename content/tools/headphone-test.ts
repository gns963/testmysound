import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "headphone-test",
  path: "/headphone-test",
  name: "Headphone Test",
  shortName: "Headphone Test",
  primaryKeyword: "headphone test",
  secondaryKeywords: [
    "headphone phase test",
    "check headphone wiring",
    "headphones out of phase",
  ],
  metaTitle: "Headphone Test — Phase & Wiring Check",
  metaDescription:
    "Free headphone test: check for miswired or out-of-phase cabling, plus links to L/R, sweep and bass checks.",
  answer:
    "This headphone test plays the same tone to both ears, either in phase (matched) or out of phase (one side inverted), so you can hear the difference a miswired or faulty cable makes. In phase should sound centered and solid; out of phase usually sounds hollow, distant, or hard to pin down in space — a useful check for wiring problems that other tests can miss.",
  howToSteps: [
    "Put your headphones on properly, left and right the correct way round.",
    'Tap Play with "In phase" selected — the tone should sound centered, solid, and easy to locate directly between your ears.',
    'Switch to "Out of phase" while it\'s playing — the same tone should now sound hollow, spacious, or oddly hard to locate.',
    "If you can't tell any difference between the two, that can point to a wiring issue, a mono cable, or one channel not working.",
    "Use the linked L/R, sweep and bass tests below for other headphone checks.",
  ],
  howItWorks: [
    '"In phase" means both ears receive the same waveform at the same time, which your brain fuses into a single, centered sound image — a normal, correctly wired pair of headphones should do this by default with a mono or centered signal.',
    "\"Out of phase\" flips the polarity of one channel (multiplying its signal by -1), so the two ears receive mirror-image waveforms. That mismatch is very noticeable: it typically sounds diffuse, hollow, or like it's coming from inside your head rather than in front of you, because your brain can't localize a sound that doesn't arrive consistently at both ears.",
    'If a headphone cable has a wiring fault — a reversed polarity on one channel, for example — audio that should sound centered can end up sounding subtly "off" or hollow even without you realizing why. This test makes that specific problem easy to hear by exaggerating it on purpose.',
  ],
  tips: [
    {
      title: "Testing wired headphones",
      body: "Wiggle the cable near the plug while the tone plays — if it cuts in and out or the phase seems to shift, that points to a connector or wiring fault.",
    },
    {
      title: "Testing Bluetooth headphones",
      body: "Phase issues are less common over Bluetooth (it's digital), but the test still confirms both channels are active and balanced.",
    },
    {
      title: "Want the individual L/R and sweep tests?",
      body: "Those live on their own dedicated pages, linked below the tool — this page focuses specifically on the phase/wiring check.",
    },
  ],
  troubleshooting: [
    {
      problem: "Can't hear any difference between in-phase and out-of-phase",
      cause: "One channel may not be working, or the headphones might be mono.",
      fix: "Run the Left/Right Speaker Test first to confirm both channels actually produce sound independently.",
    },
    {
      problem: "Out-of-phase sounds normal (centered) rather than hollow",
      cause:
        "Possible wiring fault where one channel is already inverted by default.",
      fix: "Try a different pair of headphones or cable to compare — if the issue follows the headphones, the cable/driver wiring is the likely cause.",
    },
    {
      problem: "Sound cuts out only in one mode",
      cause:
        "Loose connector making intermittent contact, more likely to show up when the signal changes.",
      fix: "Check the plug is fully inserted and try gently wiggling it near the base while listening.",
    },
  ],
  safetyNote:
    "This tone plays directly to both ears — start at a comfortable volume, especially with in-ear headphones, since the out-of-phase effect can feel unusual even at normal volume levels.",
  faqs: [
    {
      q: 'What does "out of phase" actually mean?',
      a: "It means one channel's waveform is inverted (flipped upside down) relative to the other. Playing the same sound to both ears out of phase creates a diffuse, hard-to-locate sensation instead of a solid centered image.",
    },
    {
      q: "Is out-of-phase audio harmful to my hearing?",
      a: "No — it's the same tone at the same volume, just with one channel's polarity flipped. It can just feel odd or slightly disorienting.",
    },
    {
      q: "My headphones sound fine in phase but I still suspect a wiring issue — now what?",
      a: "Try the Left/Right Speaker Test to isolate whether one channel is weak or silent, which is a different (and more common) issue than a phase problem.",
    },
    {
      q: "Does this work for earbuds too?",
      a: "Yes — any stereo headphone or earbud works the same way with this test.",
    },
  ],
  related: [
    "left-right-speaker-test",
    "frequency-sweep",
    "bass-test",
    "mic-test",
  ],
};

export default content;
