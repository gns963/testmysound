import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "text-to-speech",
  path: "/text-to-speech",
  name: "Text to Speech",
  shortName: "Text to Speech",
  engine: "tts",
  priority: "P1",
  primaryKeyword: "text to speech",
  secondaryKeywords: ["free tts online", "text to voice", "read aloud tool"],
  metaTitle: "Text to Speech — Free Online TTS Reader",
  metaDescription:
    "Free text-to-speech tool — type or paste text, pick a voice, and hear it read aloud. Clearly labels on-device vs. cloud voices.",
  answer:
    "Text to speech converts typed or pasted text into spoken audio using your browser's built-in voices, with adjustable rate, pitch and volume. Some voices process text entirely on your device, while others may use your browser's cloud text-to-speech service — this tool labels each voice so you know which kind you're using.",
  howToSteps: [
    "Type or paste the text you want read aloud into the box, up to 2,000 characters.",
    "Pick a voice from the dropdown — each one shows its language and whether it runs on-device or via a cloud service.",
    "Adjust rate, pitch and volume with the sliders if you want faster, slower, higher or lower speech.",
    'Tap "Play" to start — the button changes to "Pause" while speaking.',
    'Use "Pause" and "Resume" to stop and continue at the same point, or "Stop" to end playback completely.',
    "Edit the text and tap Play again any time; a new play always restarts from the beginning of the current text.",
    'If you want a fully offline experience, choose a voice labeled "On-device" rather than "Cloud."',
  ],
  howItWorks: [
    "This tool uses the Web Speech API's speech synthesis feature, which is built directly into your browser rather than a separate app or a service this site runs. When you press Play, the browser itself converts your text into audio using one of the voices it has available.",
    "Available voices vary a lot by browser, operating system, and device — some come from your OS's own text-to-speech engine, which run entirely locally, while others are provided by the browser as a cloud service, meaning your text is sent to that service to generate the audio. The underlying voice API actually exposes which kind each voice is, and this tool shows that directly next to each voice so you can choose based on your own privacy preference.",
    'Rate, pitch and volume are standard parameters supported by the underlying browser API, applied the same way regardless of which voice you pick, though the exact sound of "pitch 1.5" can vary noticeably between voices and languages.',
  ],
  tips: [
    {
      title: "iPhone",
      body: "Safari on iOS typically offers a good range of on-device voices tied to the languages you've installed under Settings → General → Language & Region — installing more languages there can add more voice options here.",
    },
    {
      title: "Android",
      body: "Chrome on Android often includes both on-device voices and higher-quality cloud voices — check Android's own Settings → Accessibility → Text-to-speech output to manage installed voice engines.",
    },
    {
      title: "Windows",
      body: "Windows ships with its own on-device voices that Edge and other browsers can access directly; more can usually be added via Windows Settings → Time & Language → Speech.",
    },
    {
      title: "Mac",
      body: "macOS lets you download additional on-device voices under System Settings → Accessibility → Spoken Content, which then become available to Safari and other browsers here.",
    },
  ],
  troubleshooting: [
    {
      problem: "The voice dropdown is empty",
      cause: "Some browsers load the voice list asynchronously, and it can take a moment after the page loads, or briefly show nothing until the browser reports its voices.",
      fix: "Wait a few seconds and check again; if it stays empty, try reloading the page or a different browser.",
    },
    {
      problem: "Nothing happens when I press Play",
      cause: "The text box may be empty, or the browser may block audio until a direct click, which this tool already requires.",
      fix: "Make sure there's text in the box and that you clicked Play directly rather than through a keyboard shortcut or automated action.",
    },
    {
      problem: "The voice sounds different than expected for the same settings",
      cause: "Different voices interpret rate, pitch and volume slightly differently, and some voices are simply higher quality than others.",
      fix: "Try a few different voices at the same settings to compare, rather than assuming one setting behaves identically across all of them.",
    },
    {
      problem: "Playback stops partway through a long text",
      cause: "Some browsers have an internal limit on how much text a single utterance can queue reliably.",
      fix: "Try shortening the text, or break it into a few shorter plays instead of one very long one.",
    },
  ],
  safetyNote:
    'Text you enter is processed by your browser\'s speech engine to generate audio — for voices labeled "On-device," that happens entirely locally; for voices labeled "Cloud," your browser sends the text to its own text-to-speech service to generate the audio, the same way it would for any other cloud voice feature in that browser. Avoid entering sensitive personal information if you\'ve selected a cloud voice and want to keep that text private.',
  faqs: [
    {
      q: "Does this tool record or store what I type?",
      a: "No — this site doesn't save or transmit your text anywhere. If you select a cloud voice, your browser, not this site, sends the text to its own text-to-speech service to generate audio, the same as it would on any other page using that feature.",
    },
    {
      q: "Can I download the speech as an MP3 or audio file?",
      a: "Not directly — the Web Speech API this tool uses doesn't provide a way to export audio to a file. It can only play speech live through your speakers or headphones.",
    },
    {
      q: "Why do the available voices look different on my phone versus my laptop?",
      a: "Voices come from your operating system and browser, not from this site, so the exact list always depends on what's installed on that specific device.",
    },
    {
      q: "What does \"On-device\" vs \"Cloud\" actually mean for a voice?",
      a: "On-device voices generate speech locally without sending your text anywhere; cloud voices send the text to the browser's own text-to-speech service over the internet to generate higher-quality audio. Both are legitimate, standard browser features — this just tells you which one you're using.",
    },
    {
      q: "Can I use this to read a webpage or PDF aloud automatically?",
      a: "Not directly — you'd need to copy the text you want read and paste it into the box yourself; this tool doesn't extract text from other pages or files.",
    },
    {
      q: "Is there a character limit?",
      a: "Yes, this tool caps input at 2,000 characters per play, mainly to keep playback reliable across different browsers' voice engines.",
    },
    {
      q: "Why does the voice list sometimes take a moment to appear?",
      a: "Some browsers load their voice list asynchronously after the page loads rather than having it ready instantly — this is normal browser behavior, not a bug in this tool.",
    },
  ],
  related: ["tuner", "mic-test", "audio-recorder"],
};

export default content;
