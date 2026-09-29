import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "metronome",
  path: "/metronome",
  name: "Online Metronome",
  shortName: "Metronome",
  engine: "metronome",
  priority: "P1",
  primaryKeyword: "online metronome",
  secondaryKeywords: ["metronome online free", "metronome with time signature", "tap tempo metronome"],
  metaTitle: "Online Metronome — Time Signatures & Tap Tempo",
  metaDescription:
    "Free online metronome from 30-300 BPM with time signatures, an accent beat, and tap tempo — precisely scheduled so timing never drifts.",
  answer:
    "An online metronome plays a steady click at a set tempo to help you practice keeping time, adjustable from 30 to 300 BPM with different time signatures and an accented first beat. This one uses precise Web Audio scheduling rather than a simple on-screen timer, so the tempo stays accurate even if the page is busy doing something else.",
  howToSteps: [
    "Set your tempo using the slider, the +/- buttons, or by tapping the tempo button in time with a beat you already know.",
    "Pick a time signature — 2/4, 3/4, 4/4, 5/4 or 6/8 — to match how many beats you want counted per bar.",
    'Turn on "Accent first beat" if you want the first click of each bar to sound slightly different, which helps you feel where the bar starts.',
    'Click "Start" and listen — the beat dots along the bottom light up in time with each click.',
    "Adjust the tempo slider while it's running if you want to speed up or slow down gradually — the click adjusts smoothly without stopping.",
    "Practice along with it, focusing on landing exactly on each click rather than slightly before or after.",
    'Click "Stop" whenever you\'re done, or leave it running — your screen won\'t sleep automatically while it\'s playing.',
  ],
  howItWorks: [
    "A metronome sounds simple, but getting its timing right in a browser is trickier than it looks. A plain JavaScript timer isn't precise — it can drift over time and gets delayed whenever the browser is busy with something else, which would make the beat noticeably uneven over a few minutes.",
    "Instead, this metronome uses a technique sometimes called lookahead scheduling: every 25 milliseconds, it checks the Web Audio clock, which is sample-accurate, and schedules any upcoming clicks slightly ahead of time, using the browser's own precise audio timing rather than a JavaScript timer to decide exactly when each click plays.",
    "The visual beat indicator is kept in sync separately, checking that same precise audio clock on every animation frame so the dot lights up right when you actually hear the click, not up to a tenth of a second early the way it would if the visual and audio were tied to the lookahead schedule directly.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "If your iPhone is in Silent mode, the click may be quiet or silent depending on iOS version and browser — check media volume specifically, not just the ringer switch.",
    },
    {
      title: "Android",
      body: "On some Android browsers, switching apps or locking the screen may pause background audio — keep this tab in the foreground while practicing for the most reliable timing.",
    },
    {
      title: "Windows",
      body: "On Windows, Bluetooth headphones can add a small, inherent audio delay between when a sound is sent and when you actually hear it — for tight timing practice, wired headphones or speakers avoid that extra lag.",
    },
    {
      title: "Mac",
      body: "On Mac, the same Bluetooth latency note applies — if you're practicing precise timing, built-in speakers or wired headphones will feel more immediate than Bluetooth ones.",
    },
  ],
  troubleshooting: [
    {
      problem: "The click sounds like it speeds up or slows down slightly",
      cause: "Very rare with lookahead scheduling, but heavy background load on an old or overloaded device can still cause occasional strain.",
      fix: "Close other heavy tabs or apps; the audio scheduling itself doesn't drift, but extreme system load can still affect overall performance.",
    },
    {
      problem: "Tap tempo isn't giving an accurate BPM",
      cause: "Tap tempo averages your last several taps — a very inconsistent tapping rhythm, or too few taps, gives a rougher estimate.",
      fix: "Tap steadily for at least 4-6 beats before checking the result; the more consistent your taps, the more accurate the estimate.",
    },
    {
      problem: "I can't hear the accent beat differently from the others",
      cause: "The accent uses a higher pitch and slightly louder volume — on some speakers or at very low volume, that difference can be subtle.",
      fix: "Increase volume, or watch the larger, differently colored beat dot for a visual cue instead.",
    },
    {
      problem: "The beat dots don't seem to match the sound exactly",
      cause: "This can happen on a device with unusually high audio output latency, like some Bluetooth speakers.",
      fix: "Try wired headphones or your device's built-in speaker to compare, since Bluetooth output delay varies by device.",
    },
  ],
  safetyNote:
    "This tool only plays a short click sound at your chosen tempo — it's not a substitute for a music teacher's feedback on timing and can't detect whether you're actually playing on beat, only provide the beat itself. Very long practice sessions at loud volume through headphones carry the same hearing-health considerations as any other sustained audio.",
  faqs: [
    {
      q: "Why does the tempo stay steady even if my browser tab is doing other things?",
      a: "The clicks are scheduled slightly ahead of time using the Web Audio API's own precise clock, rather than relying on a simple JavaScript timer that could be delayed by other page activity.",
    },
    {
      q: "What's the difference between 4/4 and 6/8 here?",
      a: "Both are offered as a number of evenly spaced clicks per bar, 4 versus 6, with the first one accented. This is a simplified model — it doesn't distinguish how a time signature is felt or subdivided, just how many clicks make up one bar.",
    },
    {
      q: "Can I use tap tempo to match a song I'm listening to?",
      a: "Yes — tap along with the beat you hear, and the metronome will adopt roughly that tempo. For a dedicated version of that same feature, the BPM Counter tool is built specifically around measuring a song's tempo from taps.",
    },
    {
      q: "Will my screen turn off while the metronome is running?",
      a: "This tool requests a screen wake lock while playing, on browsers that support it, so your screen shouldn't sleep mid-session. It releases that lock as soon as you stop.",
    },
    {
      q: "What's the highest and lowest tempo supported?",
      a: "30 BPM at the slow end and 300 BPM at the fast end, covering everything from a very slow practice tempo to extremely fast passages.",
    },
    {
      q: "Does changing the tempo while it's running cause a glitch or skipped beat?",
      a: "No — the schedule recalculates the next click's timing using the new tempo smoothly, without stopping or skipping a beat.",
    },
    {
      q: "Can I link directly to a specific tempo?",
      a: "Yes — adding ?bpm=140 (or any number) to this page's URL starts the metronome pre-set to that tempo, which is also how the BPM Counter tool's \"Practice at this tempo\" button works.",
    },
  ],
  related: ["tuner", "bpm-counter", "frequency-sweep", "tone-generator"],
};

export default content;
