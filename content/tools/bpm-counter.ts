import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "bpm-counter",
  path: "/bpm-counter",
  name: "BPM Counter",
  shortName: "BPM Counter",
  engine: "bpmCounter",
  priority: "P1",
  primaryKeyword: "bpm counter",
  secondaryKeywords: ["tap tempo bpm", "find bpm of a song", "tempo tapper"],
  metaTitle: "BPM Counter — Tap Tempo to Find a Song's Tempo",
  metaDescription:
    "Free tap-tempo BPM counter — tap along to any song or beat to instantly measure its tempo in beats per minute. No app, no sign-up.",
  answer:
    "A BPM counter measures a song or beat's tempo by having you tap along with it, then averaging the gaps between taps to calculate beats per minute. It measures tempo from your taps rather than generating its own click, which makes it useful for figuring out the speed of a song you're already hearing, not for practicing to a steady beat.",
  howToSteps: [
    "Play the song or beat you want to measure, somewhere you can hear it clearly.",
    "Tap the big button on this page in time with the beat — the kick drum or clap is usually the easiest part to follow.",
    "Keep tapping steadily for at least 4-6 beats; the BPM number appears and keeps refining as you add more taps.",
    "If you tap along with the wrong subdivision, like every half-beat instead of every beat, the number will read roughly double or half the real tempo — try tapping slower or faster to check.",
    'Tap "Reset" if you lose the beat or want to measure a different song without old taps skewing the average.',
    'Once you have a result, tap "Practice at this tempo" to open the Metronome tool pre-set to that exact BPM.',
    "For a fast-tempo song, tapping every other beat (half-time) can actually be easier and more accurate than trying to tap every single beat.",
  ],
  howItWorks: [
    "Each tap is timestamped the instant you press the button. Once there are at least two taps, the tool calculates the time gap between each consecutive pair and averages the last several gaps, converting that average into beats per minute with a simple formula: 60,000 divided by the average gap in milliseconds.",
    "Averaging several taps rather than just the last two matters because human tapping is never perfectly even — a single early or late tap would swing the result a lot on its own, but averaged across 4 or more taps, small timing variations mostly cancel out and the number settles on a more reliable estimate.",
    "If you stop tapping for more than about two seconds, the tool assumes you're starting a fresh measurement and clears its history automatically, rather than mixing an old, unrelated sequence of taps into a new song's average.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Tapping on a touchscreen has a tiny, consistent delay compared to a physical button, but since it affects every tap equally, it doesn't meaningfully change the calculated BPM.",
    },
    {
      title: "Android",
      body: "If you're tapping along to audio playing through the same phone, try using headphones instead of the phone's own speaker, so tapping the screen doesn't interfere with hearing the beat clearly.",
    },
    {
      title: "Windows",
      body: "On a laptop or desktop, a mouse click works the same as a touchscreen tap — use whichever feels more natural to keep steady time with.",
    },
    {
      title: "Mac",
      body: "The same applies on Mac — trackpad clicks register at the same precision as a touchscreen tap would, so use whichever is more comfortable.",
    },
  ],
  troubleshooting: [
    {
      problem: "The BPM reading is roughly double what I expected",
      cause: "You're likely tapping on every half-beat or every 8th note instead of the main beat.",
      fix: "Try tapping only on the strongest, most obvious hit — usually the kick drum or clap — rather than every rhythmic subdivision you hear.",
    },
    {
      problem: "The BPM reading is roughly half what I expected",
      cause: "You're likely tapping once every two beats instead of every beat.",
      fix: "Try tapping twice as often, on every individual beat rather than every other one.",
    },
    {
      problem: "The number keeps changing a lot even though I'm tapping steadily",
      cause: "Early taps in a short session have an outsized effect on the average; the estimate steadies out as more taps are added.",
      fix: "Keep tapping for at least 6-8 beats before trusting the number, especially on a first attempt.",
    },
    {
      problem: "It reset in the middle of my tapping",
      cause: "A gap of more than about two seconds between taps is treated as the start of a new measurement.",
      fix: "Try to keep tapping at a steady pace without long pauses; if you genuinely paused, that's expected behavior, not a bug.",
    },
  ],
  safetyNote:
    "This tool only times your own screen or key taps — it doesn't listen through a microphone, analyze any audio file, or record anything. Its accuracy depends entirely on how consistently you tap along with the beat, not on any audio analysis, so results are only as good as your own sense of rhythm in that moment.",
  faqs: [
    {
      q: "Does this tool listen to my microphone to detect the song's BPM automatically?",
      a: "No — it measures the timing of your taps, not the audio itself. You listen to the song and tap along; the tool never accesses your microphone.",
    },
    {
      q: "Why does my BPM come out different each time I measure the same song?",
      a: "Small variations in your own tapping accuracy are the most common reason. Tapping more beats before checking the result, and tapping on the clearest, most obvious hit in the song, both improve consistency.",
    },
    {
      q: "What's a normal BPM range for different music genres?",
      a: "It varies widely by genre and taste rather than following one fixed rule — this tool measures whatever tempo you tap, without assuming what genre it should be.",
    },
    {
      q: "Can I use this to set a metronome to match a song?",
      a: "Yes — once you have a BPM reading, tap \"Practice at this tempo\" and it opens the Metronome tool pre-set to that exact tempo.",
    },
    {
      q: "Is a BPM counter the same thing as a metronome?",
      a: "No — a metronome generates its own steady click at a tempo you set; a BPM counter listens to your taps and tells you the tempo of something you're already hearing. This site offers both as separate tools for those two different jobs.",
    },
    {
      q: "How many taps do I need for an accurate reading?",
      a: "At least 4 to 6 taps gives a reasonable estimate; more taps, kept steady, will refine it further.",
    },
    {
      q: "Does it matter if I tap with my finger, a mouse click, or a key press?",
      a: "No — all are timestamped the same way, so accuracy depends on your own timing consistency, not which input method you use.",
    },
  ],
  related: ["metronome", "tuner", "tone-generator"],
};

export default content;
