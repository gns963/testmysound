import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "mic-test",
  path: "/mic-test",
  name: "Mic Test",
  shortName: "Mic Test",
  primaryKeyword: "mic test",
  secondaryKeywords: [
    "test my microphone online",
    "check mic before call",
    "microphone not working",
  ],
  metaTitle: "Mic Test — Check Your Microphone Online",
  metaDescription:
    "Test your microphone with a live waveform and 5-second record/playback. Free, no app, audio never leaves your device.",
  answer:
    "This mic test uses your browser's microphone access to show a live waveform and level meter, and lets you record and play back 5 seconds of audio, so you can confirm your microphone works before a call or recording. Your audio is processed entirely in your browser and never uploaded anywhere.",
  howToSteps: [
    'Tap "Test my mic" and allow microphone access when your browser asks.',
    "Speak normally and watch the waveform and level bar respond in real time.",
    "If your device has more than one microphone, pick the right one from the dropdown that appears.",
    'Tap "Record 5s" to capture a short clip, then use the player that appears to listen back.',
    "If nothing shows up, check the error message on screen — it tells you specifically what went wrong and how to fix it.",
  ],
  howItWorks: [
    "The tool requests microphone access through the browser's standard getUserMedia API, then feeds the live audio into a Web Audio analyser node to draw the waveform and compute a rough volume level — all of this happens locally in your browser's audio pipeline.",
    "For the 5-second recording, it uses the browser's built-in MediaRecorder to capture a short clip into memory, which you can then play back immediately. Nothing is sent to a server at any point — the recording only exists in your browser tab and disappears when you leave the page.",
  ],
  tips: [
    {
      title: "Permission blocked previously?",
      body: 'Most browsers remember a "block" choice. Click the lock or camera icon in your address bar to find and reset the site\'s microphone permission.',
    },
    {
      title: "Multiple microphones",
      body: "Laptops with both a built-in mic and a connected headset/webcam mic will show a device picker — pick the one you actually plan to use.",
    },
    {
      title: "Testing before a call?",
      body: "Also check the app you're calling through (Zoom, Teams, etc.) has picked the same microphone — this test only confirms the browser can access it.",
    },
  ],
  troubleshooting: [
    {
      problem: '"Permission denied" error',
      cause: "You blocked mic access, either just now or in a past visit.",
      fix: "Click the lock/camera icon in your browser's address bar, allow the microphone, then reload the page.",
    },
    {
      problem: '"No microphone found" error',
      cause: "No mic is connected, or it's disabled at the system level.",
      fix: "Check your system's sound settings show an active input device, and that any external mic is properly plugged in.",
    },
    {
      problem: '"Microphone in use" error',
      cause:
        "Another app or browser tab already has exclusive access to the microphone.",
      fix: "Close other apps or tabs that might be using it — video call apps and other recording tools are common culprits.",
    },
    {
      problem: "Waveform shows activity but recording sounds silent",
      cause:
        "Rare, but can happen if the wrong input device was selected mid-session.",
      fix: "Refresh the page and re-select your microphone from the device picker before recording again.",
    },
  ],
  safetyNote:
    "Your microphone audio is processed entirely in your browser and is never uploaded to any server — this is true for both the live waveform and the 5-second recording.",
  faqs: [
    {
      q: "Does this tool upload or store my voice anywhere?",
      a: "No. All audio processing happens locally in your browser. The recording exists only in your browser tab's memory and is gone when you close or refresh the page.",
    },
    {
      q: "Why does my browser ask for microphone permission every time?",
      a: "Depends on your browser's settings — some remember your choice per site, others ask each visit unless you explicitly allow it permanently in site settings.",
    },
    {
      q: "The waveform moves but sounds quiet — is my mic broken?",
      a: "Not necessarily — check your system's input volume/gain setting first, since a mic can register sound at a very low level without being faulty.",
    },
    {
      q: "Can I test a Bluetooth headset mic here?",
      a: "Yes, as long as it's connected and selected as the default (or picked from this tool's device dropdown) input on your device.",
    },
  ],
  related: [
    "db-meter",
    "earpiece-speaker-cleaner",
    "headphone-test",
    "speaker-test",
  ],
};

export default content;
