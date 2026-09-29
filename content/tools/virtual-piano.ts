import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "virtual-piano",
  path: "/virtual-piano",
  name: "Online Piano",
  shortName: "Virtual Piano",
  engine: "piano",
  priority: "P1",
  primaryKeyword: "online piano",
  secondaryKeywords: ["virtual piano keyboard", "play piano online free", "piano keyboard simulator"],
  metaTitle: "Online Piano — Free Virtual Keyboard",
  metaDescription:
    "Free online piano — play with your mouse, finger, or keyboard (A S D F G H J K row). Synthesized tones, adjustable waveform and octave.",
  answer:
    "An online piano is a virtual keyboard you can play with your mouse, finger, or computer keyboard, each key triggering a synthesized tone at that note's pitch. It's fully polyphonic, so holding multiple keys plays a chord, with adjustable octave range and waveform — a synthesized instrument, not a sampled recording of a real piano.",
  howToSteps: [
    "Click or tap any key to hear its note — white keys play the natural notes, black keys play the sharps/flats between them.",
    "Hold down multiple keys at once to play a chord; every key is independent, so nothing cuts another note off.",
    "Play with your physical keyboard too: A S D F G H J K plays the white keys, W E T Y U plays the black keys in between.",
    "Use the octave buttons to shift the whole keyboard up or down if you need a lower or higher range than what's shown.",
    "Try a different waveform — sine, triangle, square or sawtooth — for a noticeably different tone color on every note.",
    "Release a key to hear it fade out naturally rather than cutting off abruptly.",
    "Combine octave shifts with different waveforms to sketch out a simple melody or chord progression quickly.",
  ],
  howItWorks: [
    "Each key on this piano is mapped to a musical note, and each note has a specific frequency in Hz — for example, the note A above middle C is 440Hz, the same standard tuning convention used by this site's Tuner tool. Pressing a key starts an oscillator at that exact frequency.",
    "Because each key press creates its own independent oscillator, holding several keys at once naturally produces a chord — one key's press or release never interrupts another's, which is what makes this fully polyphonic rather than limited to one note at a time.",
    "The waveform selector changes the basic shape of each note's sound wave, which is the main thing that gives an oscillator its tone color: a sine wave sounds smooth and pure, a sawtooth sounds bright and buzzy, and triangle and square sit in between. None of these are a recording of a physical piano's strings and hammers — they're purely synthesized tones, the same approach this site's Tone Generator uses.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Touch input works the same as clicking — tap a key to play it, and lift your finger to release it. The physical-keyboard shortcuts only apply if you've connected a Bluetooth keyboard to your iPhone or iPad.",
    },
    {
      title: "Android",
      body: "Same as iPhone — touch works directly, and keyboard shortcuts only apply with an external keyboard connected.",
    },
    {
      title: "Windows",
      body: "The A S D F G H J K and W E T Y U keyboard shortcuts work directly on a Windows laptop or desktop keyboard, no setup needed.",
    },
    {
      title: "Mac",
      body: "The same keyboard shortcuts work directly on a Mac's built-in keyboard — just click into the page first so it can receive key presses.",
    },
  ],
  troubleshooting: [
    {
      problem: "Pressing a keyboard key doesn't play a note",
      cause: "The page may not have focus, or that specific key isn't one of the mapped shortcuts — only A S D F G H J K and W E T Y U are mapped.",
      fix: "Click anywhere on the page first, then try one of the mapped keys.",
    },
    {
      problem: "Holding a key plays the note repeatedly instead of sustaining it",
      cause: "This would be unexpected — the tool specifically ignores your OS's key-repeat events so a held key sustains rather than retriggers.",
      fix: "If this happens, try releasing and pressing the key again; it's likely a one-off timing glitch rather than a persistent issue.",
    },
    {
      problem: "Notes sound too quiet or too loud compared to other tools on this site",
      cause: "Different waveforms and multiple simultaneous notes can genuinely sound louder or quieter at the same underlying volume level.",
      fix: "Adjust your device's own volume rather than expecting every waveform or chord to sound identically loud.",
    },
    {
      problem: "The keyboard shortcuts play the wrong notes after I changed octaves",
      cause: "This is expected — the octave buttons shift every key, including the keyboard-shortcut mapping, up or down together.",
      fix: "Check the current octave shown next to the octave buttons if a note sounds unexpectedly high or low.",
    },
  ],
  safetyNote:
    "This tool only plays synthesized tones through your speakers or headphones — nothing is recorded, saved, or sent anywhere. It's a simple synthesizer for casual play and learning note positions, not a substitute for a real piano's touch, dynamics, or sound.",
  faqs: [
    {
      q: "Does this sound like a real piano?",
      a: "No — it's a synthesized tone, not a sampled recording of an actual piano's strings and hammers. It's useful for learning note layout and basic melodies, not for a realistic piano sound.",
    },
    {
      q: "Can I play more than one note at a time?",
      a: "Yes — this piano is fully polyphonic. Hold as many keys as you like, and each one plays and releases independently.",
    },
    {
      q: "How do the keyboard shortcuts work?",
      a: "The A S D F G H J K row plays white keys, C through the next C, and W E T Y U play the black keys in between, matching a common virtual-piano keyboard layout.",
    },
    {
      q: "Can I extend the range beyond what's shown?",
      a: "Yes — use the octave shift buttons to move the entire keyboard, including keyboard shortcuts, up or down by whole octaves.",
    },
    {
      q: "Why do different waveforms sound so different for the same note?",
      a: "The waveform shape determines which overtones are present in the sound, which is what gives an instrument or synthesizer its distinct tone color, separate from the note's pitch itself.",
    },
    {
      q: "Can I save or export what I play?",
      a: "No — this is a simple, live-play tool with no recording or export feature. For capturing audio, this site's separate Audio Recorder tool can record whatever your speakers are producing, including this piano, as a workaround.",
    },
    {
      q: "Is this suitable for learning real piano technique?",
      a: "Not for physical technique or touch sensitivity, since there are no weighted keys or dynamics — it can help with learning note names and simple sequences, though.",
    },
  ],
  related: ["tuner", "tone-generator", "metronome", "audio-recorder"],
};

export default content;
