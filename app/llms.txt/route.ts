import { siteConfig } from "@/lib/config/site";
import { deviceHubs } from "@/data/deviceHubs";

// Blueprint §12 tactic 8: a plain-text map of the site's key pages/tools for AI
// crawlers and answer engines. Extend the "Tools" and "Guides" sections as pages
// ship in later phases — keep one line per entry, no fluff.
export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.tagline}`,
    "",
    siteConfig.description,
    "",
    "## Tools",
    "",
    "- All Tools (/tools): full directory of every tool below, grouped by category.",
    "- Speaker Cleaner (/ and /water-eject): free browser tool to eject water and dust from a phone speaker.",
    "- Deep Speaker Cleaner (/deep-speaker-cleaner): 3-stage program for speakers still muffled after a quick clean.",
    "- Earpiece Speaker Cleaner (/earpiece-speaker-cleaner): cleans the call earpiece speaker; honest about browser routing limits.",
    "- Speaker Dust Remover (/speaker-dust-remover): frequency sweep to help clear dust from the speaker grille.",
    "- Left/Right Speaker Test (/left-right-speaker-test): tests each stereo channel independently, or alternates between them.",
    "- Speaker Sound Test (/speaker-test): quick test, full 20Hz-20kHz sweep, and individual frequency tones.",
    "- Mic Test (/mic-test): live waveform, level meter, and a 5-second record/playback check.",
    "- Tone Generator (/tone-generator): 1Hz-22kHz tone generator with sine/square/sawtooth/triangle waves.",
    "- Bass Test (/bass-test): 20-200Hz sweep and fixed bass frequency chips.",
    "- Headphone Test (/headphone-test): in-phase vs out-of-phase wiring check for headphones.",
    "- Sound Level Meter (/db-meter): approximate (uncalibrated) dB reading from the microphone.",
    "- Hearing Test (/hearing-test): 8kHz-19kHz ascending tone ladder; not a medical test.",
    "- Noise Generator (/noise-generator): white, pink and brown noise with a timer.",
    "- Frequency Sweep Generator (/frequency-sweep): configurable from/to/duration sweep.",
    "- Webcam Test (/webcam-test): live camera preview, resolution readout, and a local-only snapshot.",
    "- Keyboard Tester (/keyboard-tester): highlights every key on-screen as it's pressed; no permission needed.",
    "- Dead Pixel & Screen Test (/dead-pixel-test): full-screen solid colors, gradient and checkerboard to spot dead or stuck pixels.",
    "- Touch Screen Test (/touch-screen-test): draws every active touch point live; checks multi-touch and ghost touches.",
    "- Online Tuner (/tuner): mic pitch detection with guitar, ukulele, violin, bass and chromatic presets.",
    "- Online Metronome (/metronome): 30-300 BPM, time signatures, accent beat, tap tempo; lookahead-scheduled clicks.",
    "- BPM Counter (/bpm-counter): tap along to a song to measure its tempo; links to the Metronome to practice at it.",
    "- CPS Test (/cps-test): click speed test, 1/5/10/30/60s modes; local best score only, no leaderboard.",
    "- Typing Speed Test (/typing-speed-test): 15/30/60s, easy/medium word sets; net WPM, accuracy and error count.",
    "- Sleep & Focus Sounds (/sleep-focus-sounds): synthesized rain/ocean/white/pink/brown/fan textures with a fading sleep timer.",
    "- Safe Volume Calculator (/safe-volume-calculator): NIOSH/OSHA/WHO exposure-time guidance; not medical advice, sources cited.",
    "- Text to Speech (/text-to-speech): reads typed text aloud; labels each voice as on-device or cloud.",
    "- Audio Recorder (/audio-recorder): mic recording with pause/resume, playback and local-only download.",
    "- Vibration Test (/vibration-test): triggers vibration patterns to check a phone's motor; Android only, no iOS support.",
    "- Speaker Phase & Polarity Test (/speaker-polarity-test): tone with an invert toggle to hear reversed stereo speaker wiring.",
    "- Surround Sound Test (/surround-sound-test): reports your browser's real output channel count, then tests each available 5.1/7.1 position.",
    "- Smartwatch Water Eject (/watch-water-eject): guide to Apple Watch's built-in Water Lock, plus a phone/laptop tone tool.",
    "- Online Piano (/virtual-piano): synthesized, polyphonic virtual keyboard playable by mouse/touch or A S D F G H J K keys.",
    "- Camera & Mic Test (/camera-mic-test): combined camera+mic permission check with per-device diagnosis and a speaker test.",
    "",
    "## Device guides",
    "",
    ...deviceHubs.map((hub) => `- ${hub.name} (${hub.path}): ${hub.intro}`),
    "",
    "## Notes",
    "",
    "This site does not upload microphone audio or camera video to any server; all audio and video processing runs locally in the browser.",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
