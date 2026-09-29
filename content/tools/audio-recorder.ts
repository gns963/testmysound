import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "audio-recorder",
  path: "/audio-recorder",
  name: "Audio Recorder",
  shortName: "Audio Recorder",
  engine: "recorder",
  priority: "P1",
  primaryKeyword: "online audio recorder",
  secondaryKeywords: ["voice recorder online", "record audio in browser", "free voice memo"],
  metaTitle: "Audio Recorder — Free Online Voice Recorder",
  metaDescription:
    "Free browser audio recorder — record, pause, resume and download your voice. Nothing is uploaded; recordings stay in this tab only.",
  answer:
    "This audio recorder captures sound from your microphone directly in the browser, with pause and resume, live level metering, and instant playback. Every recording stays in this browser tab only — nothing is uploaded anywhere — and you can download any take as a local audio file before you close the page.",
  howToSteps: [
    'Click "Start recording" and allow microphone access when your browser asks.',
    "Speak or record whatever sound you need — the live timer and level meter confirm it's picking up audio.",
    'Tap "Pause" any time to stop temporarily without ending the recording, then "Resume" to continue the same take.',
    'Tap "Stop" when you\'re done — the recording appears below as a playable take.',
    "Press play on the take to listen back immediately, right on this page.",
    'Tap "Download" to save that take as a file on your device, or "Delete" to discard it.',
    "Record as many separate takes as you like — each one is listed and kept until you leave the page or delete it.",
  ],
  howItWorks: [
    "This tool uses two browser features together: getUserMedia to access your microphone, and MediaRecorder to capture that audio stream into a file as you record. Both are standard browser APIs — there's no separate recording software or plugin involved.",
    "The live level meter reads your microphone in real time using a separate audio analysis node, purely to show you that sound is being picked up — it doesn't affect what actually gets recorded. Pausing calls the recorder's own pause method, which cleanly stops capturing without ending the file, so resuming continues the same recording rather than starting a new one.",
    "When you stop, the captured audio chunks are assembled into a single file entirely in your browser's memory, which is what the playback and download both use. Nothing is sent anywhere in this process — the file exists locally until you download it or leave the page, at which point it's gone unless you saved it.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Safari on iPhone will pause a recording if you switch apps or lock the screen — stay on this tab while recording if you need it to keep going uninterrupted.",
    },
    {
      title: "Android",
      body: "Chrome on Android generally continues recording in the background briefly, but battery-optimization settings on some phones can still interrupt a long recording — keep the tab active for anything important.",
    },
    {
      title: "Windows",
      body: "Check Windows' sound settings to confirm the correct microphone is selected as default input, especially if you have a headset or USB mic connected alongside a built-in one.",
    },
    {
      title: "Mac",
      body: "On a Mac, System Settings → Privacy & Security → Microphone must have your browser allowed, separate from the in-page permission prompt, or recording will silently fail to pick up audio.",
    },
  ],
  troubleshooting: [
    {
      problem: "The recording plays back silent",
      cause: "The wrong microphone may have been selected at the system level, or the mic was muted in hardware, since some headsets have a physical mute switch.",
      fix: "Check your system's default microphone and any physical mute switch, then record a short new test take.",
    },
    {
      problem: "Download doesn't do anything on my phone",
      cause: "Some mobile browsers handle file downloads differently, sometimes opening the file in a new tab instead of saving it directly.",
      fix: "Look for a save or share option on the page that opens, or try downloading from a desktop browser instead.",
    },
    {
      problem: "The file format looks unfamiliar, like .webm",
      cause: "Browsers record in whichever format they support natively, commonly WebM or OGG, rather than a universal one like MP3.",
      fix: "Most modern media players and phones can play these formats; if a specific app can't, try converting the file with a general-purpose audio converter.",
    },
    {
      problem: "Pausing and resuming created a gap of silence",
      cause: "This would be unusual — pause and resume are meant to skip the paused time entirely, not insert silence.",
      fix: "If this happens consistently, try a different browser, since pause/resume support in MediaRecorder can vary slightly between them.",
    },
  ],
  safetyNote:
    "This tool only records what your device's own microphone picks up while the page is open and you've pressed Start — nothing is uploaded, transmitted, or stored anywhere outside your browser tab. Recordings are lost when you close or reload the page unless you download them first, so save anything you want to keep before leaving.",
  faqs: [
    {
      q: "Does this upload my recording anywhere?",
      a: "No — recording, playback and download all happen entirely within your browser. Nothing is sent to a server at any point.",
    },
    {
      q: "What file format do recordings save as?",
      a: "Whichever format your browser's MediaRecorder supports natively, typically WebM or OGG — this tool picks the best available option automatically and names the downloaded file with the matching extension.",
    },
    {
      q: "Can I record longer than a few minutes?",
      a: "Yes — there's no built-in time limit, though very long recordings use more of your device's memory since the whole file is held in the browser until you stop.",
    },
    {
      q: "Will my recordings still be there if I close the tab?",
      a: "No — recordings exist only in this browser tab's memory for that session. Download anything you want to keep before closing or reloading the page.",
    },
    {
      q: "Can I record system audio or another app, not just my microphone?",
      a: "No — this tool only captures your microphone input, the same as any standard voice recording feature, not other audio playing on your device.",
    },
    {
      q: "Why does the level meter move even with quiet background noise?",
      a: "It reflects whatever your microphone picks up, including quiet room noise — that's expected and doesn't mean something is wrong.",
    },
    {
      q: "Is there a limit to how many takes I can record in one session?",
      a: "No fixed limit, but each take stays in your browser's memory until you delete it or leave the page, so a very large number of long recordings could use noticeable memory.",
    },
  ],
  related: ["mic-test", "text-to-speech", "tuner", "db-meter"],
  relatedBlogPosts: ["how-to-test-your-microphone"],
};

export default content;
