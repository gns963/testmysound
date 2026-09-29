import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "speaker-polarity-test",
  path: "/speaker-polarity-test",
  name: "Speaker Phase & Polarity Test",
  shortName: "Polarity Test",
  engine: "polarity",
  priority: "P2",
  primaryKeyword: "speaker polarity test",
  secondaryKeywords: ["speaker phase test", "speakers out of phase test", "check speaker wiring"],
  metaTitle: "Speaker Phase & Polarity Test — Check Wiring",
  metaDescription:
    "Free speaker phase/polarity test — play a bass tone through both speakers and toggle inversion to hear if a stereo speaker's wiring is reversed.",
  answer:
    "A speaker phase test plays an identical low tone through both stereo speakers, then lets you toggle a deliberately inverted version to hear the difference reversed wiring makes. Correctly wired speakers reinforce bass and sound full; reversed wiring cancels some bass and sounds thinner and harder to localize.",
  howToSteps: [
    "Sit centered between your two stereo speakers, at a normal listening distance, in a fairly quiet room.",
    'Tap "Play test tone" to start a low, steady tone playing through both speakers at once.',
    "Listen closely to the bass and how easy it is to tell where the sound is coming from.",
    "Tap \"Invert right channel\" to flip that speaker's polarity while the tone keeps playing.",
    "Compare the two states: normal should sound fuller and more centered; inverted often sounds thinner, quieter in the bass, and harder to pinpoint in space.",
    "Switch back and forth a few times — the difference is sometimes subtle on small or poorly placed speakers.",
    "If you can't hear any difference at all, see the troubleshooting table below before concluding your wiring is fine.",
  ],
  howItWorks: [
    "This tool plays the exact same tone through both the left and right channel at once, using a single oscillator connected to both outputs so they start perfectly in sync, sample for sample. When two identical sound waves from two speakers arrive in phase at your ears, they reinforce each other, which is what correct speaker wiring produces.",
    'Tapping "Invert right channel" multiplies that channel\'s signal by -1 — flipping every point in the waveform to its opposite. This is exactly what happens electrically when a speaker\'s positive and negative wires are swapped: the speaker cone now moves inward when it should move outward, and vice versa. When one speaker is inverted relative to the other, the two waves partially cancel where their frequencies overlap, especially in the bass, which is why reversed wiring is often described as sounding "thin" or "hollow."',
    "Bass frequencies make this most audible because their wavelengths are long relative to typical speaker spacing, so the cancellation effect is more pronounced and more consistent across a room than it would be at higher frequencies, where the effect becomes more position-dependent and harder to judge reliably by ear.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "This test is designed for external stereo speakers, not a phone's own built-in speakers, which are too close together for the phase effect to be meaningfully audible — use it with speakers connected to or paired with your iPhone instead.",
    },
    {
      title: "Android",
      body: "Same as iPhone — connect or cast to actual external stereo speakers rather than relying on the phone's own built-in speaker for this specific test.",
    },
    {
      title: "Windows",
      body: "This works well with a Windows PC's connected stereo speakers or a 2.1 speaker set — make sure both speakers are actually connected and set to stereo, not a mono or mixed output mode.",
    },
    {
      title: "Mac",
      body: "Same idea on Mac — connect real external stereo speakers rather than relying on a laptop's own built-in speakers, which are far too close together for phase differences to be clearly audible.",
    },
  ],
  troubleshooting: [
    {
      problem: "I can't hear any difference when I invert the channel",
      cause: "Your speakers might be too close together, mono, or the room's acoustics are masking the effect, or one speaker might already have low output for an unrelated reason.",
      fix: "Try a quieter room, sit more centered between the speakers, and check both speakers are actually producing sound at a similar volume.",
    },
    {
      problem: "One speaker seems much quieter regardless of invert state",
      cause: "That's a volume or wiring issue unrelated to polarity — a broken connection or balance setting, not what this test checks.",
      fix: "Check your system's balance setting and speaker connections before drawing conclusions about polarity specifically.",
    },
    {
      problem: "The tone sounds harsh or uncomfortable",
      cause: "Bass tones at higher volume can feel more intense than their actual loudness suggests.",
      fix: "Lower the volume to a comfortable level — the phase effect is still audible at a moderate volume.",
    },
    {
      problem: "I'm testing headphones, not speakers, and don't hear a difference",
      cause: "Headphones sit too close to each ear for the same acoustic cancellation effect that happens when two speaker outputs mix in open air.",
      fix: "This test is designed for actual room speakers, not headphones — use the Headphone Test tool's in-phase/out-of-phase check instead for headphones.",
    },
  ],
  safetyNote:
    "This tool only plays a moderate-volume tone through your speakers to compare normal and inverted wiring by ear — it can't detect or fix wiring issues automatically, and the result depends on your own listening judgment, room, and speaker placement. It's a helpful ear-training check, not a definitive electrical measurement.",
  faqs: [
    {
      q: "What does it mean if my speakers are \"out of phase\"?",
      a: "It usually means one speaker's positive and negative wire connections are swapped compared to the other, causing its cone to move in the opposite direction to an identical signal — which partially cancels sound where the two speakers' output overlaps.",
    },
    {
      q: "Can out-of-phase speakers damage anything?",
      a: "No — it's a wiring orientation issue that affects sound quality, not a safety or equipment-damage concern.",
    },
    {
      q: "How do I actually fix reversed speaker polarity?",
      a: "Swap the positive and negative speaker wire connections at either the speaker or the amplifier for the affected speaker — this test only helps you identify the problem, not fix the physical wiring.",
    },
    {
      q: "Does this work for surround sound systems, not just stereo?",
      a: "This specific test only checks two channels, left and right, against each other — a full surround setup with more speakers would need each pair checked individually, which this tool doesn't automate.",
    },
    {
      q: "Why use a low tone instead of music for this test?",
      a: "Bass wavelengths are long enough that the reinforcement or cancellation effect is strong and consistent across a room, making the difference much easier to hear than it would be with a typical music track.",
    },
    {
      q: "Is this the same as testing headphone wiring?",
      a: "No — headphones sit too close to your ears for the same open-air cancellation effect. Use the Headphone Test tool's dedicated wiring check for headphones instead.",
    },
    {
      q: "Can a professional audio meter confirm this more precisely than listening?",
      a: "Yes — a dedicated polarity/phase meter gives a definitive electrical answer. This tool is a free, ear-based alternative for a quick home check, not a replacement for calibrated test equipment.",
    },
  ],
  related: ["left-right-speaker-test", "headphone-test", "speaker-test", "bass-test"],
};

export default content;
