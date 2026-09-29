import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "tuner",
  path: "/tuner",
  name: "Online Tuner",
  shortName: "Tuner",
  engine: "tuner",
  priority: "P1",
  primaryKeyword: "online tuner",
  secondaryKeywords: ["guitar tuner online", "chromatic tuner", "instrument tuner", "pitch tuner"],
  metaTitle: "Online Tuner — Guitar, Ukulele, Violin & Bass",
  metaDescription:
    "Free online tuner using your mic — guitar, ukulele, violin, bass and chromatic presets with note name and cents needle. No app, no sign-up.",
  answer:
    "An online tuner listens through your microphone and shows the closest musical note to what you're playing, plus how many cents sharp or flat you are. This tool offers guitar, ukulele, violin, bass and chromatic presets, and works entirely in the browser — accuracy depends on your microphone and how quiet the room is.",
  howToSteps: [
    "Choose your instrument preset — guitar, ukulele, violin, bass, or chromatic for any pitch — from the tabs above the tuner.",
    'Click "Start tuner" and allow microphone access when your browser asks.',
    "Play one string or note at a time, and let it ring rather than muting it immediately, so the tuner has a clean signal to read.",
    "Watch the note name and needle: the needle centers and turns green when you're within a few cents of the target pitch.",
    "If the needle sits to the left, the note is flat — tighten or raise the pitch. If it's to the right, it's sharp — loosen or lower it.",
    "Play in a quiet room where possible — background noise, other instruments, or a TV playing nearby can all throw off the reading.",
    "Switch presets any time without restarting — the tuner keeps listening, it just changes what it compares your pitch against.",
  ],
  howItWorks: [
    "This tuner analyzes the sound wave from your microphone using a technique called autocorrelation — it compares the waveform against itself at many small time delays to find the delay where it repeats most strongly. That repeating interval is the pitch's period, and its inverse is the frequency in Hz.",
    "Once a frequency is detected, it's compared to either a fixed set of target notes for the instrument preset you picked, like a guitar's six standard strings, or to the nearest note in the full 12-note chromatic scale if you're in Chromatic mode. The difference is shown in cents, a music-theory unit where 100 cents equals one semitone, so the needle can show fine tuning, not just which note you're near.",
    "Several short readings are averaged before the note name updates, which is why the display doesn't jump around wildly — it's trading a small amount of responsiveness for a steadier, easier-to-read result.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "iPhone's built-in mic works fine for tuning, but a case covering the microphone opening, or holding the phone very close to a loud amp, can distort the signal — hold it at a normal arm's length from the instrument.",
    },
    {
      title: "Android",
      body: "Android phones vary more than iPhones in microphone quality and default audio processing — if readings seem unstable, try moving to a quieter spot before assuming the tuner is wrong.",
    },
    {
      title: "Windows",
      body: "On a Windows laptop, check that the correct microphone is selected as the default input in Sound settings, especially if you also have a USB mic or audio interface connected.",
    },
    {
      title: "Mac",
      body: "On a Mac, external audio interfaces sometimes need to be selected manually as the input device in System Settings → Sound before the browser can use them instead of the built-in mic.",
    },
  ],
  troubleshooting: [
    {
      problem: "The note name keeps flickering between two different notes",
      cause: "You may be right on the boundary between two notes, or there's background noise competing with your instrument.",
      fix: "Play the note more firmly and let it sustain, and try to reduce background noise if possible.",
    },
    {
      problem: "Nothing happens no matter how loud I play",
      cause: "The detector requires a minimum signal level and a genuinely periodic pitch — very quiet playing or heavily percussive sound may not register.",
      fix: "Play a single, clear, sustained note at a normal volume rather than a quick pluck or a chord.",
    },
    {
      problem: "The needle seems consistently off, even on a note I know is in tune",
      cause: "A different reference pitch standard, or you're actually slightly off and just not used to that instrument's true pitch.",
      fix: "This tool uses standard A4 = 440Hz tuning; if you intentionally tune to a different reference, like 442Hz for some orchestras, the needle will reasonably show as sharp.",
    },
    {
      problem: "It works for some notes but not very low or very high ones",
      cause: "Extremely low or high frequencies are harder for small phone microphones and the detection range to pick up reliably.",
      fix: "This tool is tuned for roughly 30Hz to 1500Hz, covering guitar, bass, ukulele and violin — a note far outside that range may not register cleanly.",
    },
  ],
  safetyNote:
    "This tool only listens to your microphone to detect pitch — nothing is recorded, saved, or sent anywhere. Tuning accuracy depends heavily on your device's microphone quality, background noise, and how cleanly you play the note; treat it as a helpful guide rather than a lab-grade tuning reference, especially in a noisy room.",
  faqs: [
    {
      q: "How accurate is an online tuner compared to a physical clip-on tuner?",
      a: "A clip-on tuner reads vibration directly from the instrument, so it's less affected by room noise. A microphone-based tuner like this one is generally accurate in a quiet room, but background noise and mic quality can affect it more than a clip-on device.",
    },
    {
      q: "What does 'cents' mean on a tuner?",
      a: "A cent is 1/100th of a semitone. Being +15 cents means you're a bit sharp of the target note but not sharp enough to be a different note entirely; most tuners consider within about 5 cents to be in tune.",
    },
    {
      q: "Can I tune to a reference other than A4 = 440Hz?",
      a: "Not in this version — this tuner is fixed to standard A4 = 440Hz equal temperament, which covers the vast majority of everyday tuning needs.",
    },
    {
      q: "Why does chromatic mode show a different note than my instrument preset would?",
      a: "Chromatic mode always shows the single nearest note in the full 12-note scale. An instrument preset instead compares you to that instrument's specific strings, which matters if you're intentionally using an alternate tuning.",
    },
    {
      q: "Does this work for tuning by ear practice, or only automated tuning?",
      a: "Both — you can use the needle to tune precisely, or just watch the note name update as you learn to recognize pitches by ear.",
    },
    {
      q: "Can background music or a metronome running at the same time confuse the tuner?",
      a: "Yes — any other sound your microphone picks up competes with your instrument's signal and can produce an incorrect or unstable reading.",
    },
    {
      q: "Is this tuner suitable for a full orchestra or professional recording setting?",
      a: "It's built for everyday practice and casual tuning. Professional settings typically use dedicated tuning hardware or DI-connected tuners that aren't affected by room acoustics or ambient noise at all.",
    },
  ],
  related: ["metronome", "bpm-counter", "mic-test", "frequency-sweep"],
  relatedBlogPosts: ["how-to-test-your-microphone"],
};

export default content;
