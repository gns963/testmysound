import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "left-right-speaker-test",
  path: "/left-right-speaker-test",
  name: "Left and Right Speaker Test",
  shortName: "L/R Speaker Test",
  primaryKeyword: "left right speaker test",
  secondaryKeywords: [
    "one speaker louder than the other",
    "stereo speaker test",
    "test both speakers",
  ],
  metaTitle: "Left and Right Speaker Test",
  metaDescription:
    "Test your left and right speakers separately, or alternate between them, to check for a dead or quiet channel. Free, no app.",
  answer:
    "A left/right speaker test plays audio through only the left channel, only the right, or alternates between them, so you can confirm both speakers actually work and are balanced. It's the fastest way to tell whether one channel is dead, quiet, or has become swapped after an audio setting change.",
  howToSteps: [
    "Put on headphones or sit centered between two speakers for the clearest result.",
    'Tap "Left" and confirm you hear sound only on the left side.',
    'Tap "Right" and confirm you hear sound only on the right side.',
    'Tap "Center" to check both play evenly together.',
    'Tap "Alternate" to hear it flip between sides automatically every second — useful for spotting a channel that\'s quieter, not just silent.',
    "Tap the active button again, or Stop, to end the test.",
  ],
  howItWorks: [
    "This tool uses a StereoPannerNode to route the same tone entirely to the left channel, entirely to the right, or split evenly, giving you a clean, repeatable signal instead of relying on whatever you happen to be listening to.",
    "Alternating automatically is useful because a channel that's simply quieter (rather than completely silent) is easy to miss when both sides play together — hearing it in isolation, back and forth, makes small differences in volume much more obvious.",
  ],
  tips: [
    {
      title: "Headphones give the clearest test",
      body: "Room acoustics and speaker placement can make phone/laptop speaker balance hard to judge — headphones isolate each channel cleanly.",
    },
    {
      title: "If one phone speaker is quiet, not silent",
      body: "Try the Speaker Dust Remover or Water Eject tool on that side before assuming it's a hardware fault.",
      href: "/water-eject",
      linkLabel: "Try Speaker Cleaner →",
    },
    {
      title: "Bluetooth speakers and headphones",
      body: "Make sure the device is actually connected in stereo mode — some Bluetooth accessories default to mono, which would make this test misleading.",
    },
  ],
  troubleshooting: [
    {
      problem: "One side is completely silent",
      cause:
        "Could be a hardware fault, a muted channel in system audio settings, or (for wired headphones) a bent or dirty connector.",
      fix: "Test the same headphones/speakers on another device if possible to isolate whether it's the audio source or the output hardware.",
    },
    {
      problem: "Left and right sound swapped",
      cause:
        "Usually a system-level audio balance or channel-swap setting, not a hardware issue.",
      fix: "Check your OS or app's audio balance/channel settings rather than assuming a wiring fault.",
    },
    {
      problem: "One phone speaker is quieter than the other",
      cause:
        "Often debris or moisture partially blocking the grille on that side.",
      fix: "Run the Speaker Cleaner or Dust Remover tool, focused on the quieter side.",
    },
  ],
  safetyNote:
    "This test plays a plain tone at a moderate volume — nothing unusual for your speakers or headphones. Lower your volume first if you're using in-ear headphones.",
  faqs: [
    {
      q: "Why does only one of my phone's speakers seem to work?",
      a: 'Many phones only have one true loudspeaker plus an earpiece that doubles as a second stereo channel during media playback — so "one side" being quieter is often expected, not a fault. Compare against the same test on headphones to be sure.',
    },
    {
      q: "Can I use this to test a Bluetooth speaker?",
      a: "Yes, as long as it's connected in stereo. Many single Bluetooth speakers are mono and will play the same signal from both the Left and Right buttons, which is expected.",
    },
    {
      q: 'What does "Alternate" mode actually help with?',
      a: "It's easier to notice a subtle volume difference between channels when they play one at a time, back and forth, rather than together.",
    },
    {
      q: "Is this test accurate on laptop speakers?",
      a: "It's accurate for confirming each channel produces sound, but laptop speaker placement and room reflections can make subtle volume differences harder to judge than on headphones.",
    },
  ],
  related: ["speaker-test", "headphone-test", "water-eject", "bass-test"],
};

export default content;
