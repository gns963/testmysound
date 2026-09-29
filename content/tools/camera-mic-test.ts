import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "camera-mic-test",
  path: "/camera-mic-test",
  name: "Camera & Mic Test",
  shortName: "Camera & Mic Test",
  engine: "cameraMic",
  priority: "P1",
  primaryKeyword: "camera and microphone test",
  secondaryKeywords: ["test camera and mic before zoom", "webcam and mic test online", "meeting readiness check"],
  metaTitle: "Camera & Mic Test — Check Before Your Meeting",
  metaDescription:
    "Free camera and microphone test — checks both together like a video call app, plus a speaker check, so you're ready before Zoom, Meet or Teams.",
  answer:
    "A camera and mic test checks your webcam and microphone together, the way a video-call app does before joining a meeting, plus a speaker check so you know you can be seen, heard, and hear others. If either device fails, this tool checks them separately to say exactly which one has a problem.",
  howToSteps: [
    'Tap "Test camera & mic" and allow both camera and microphone access when your browser asks — one prompt covers both.',
    "Check the live video preview to confirm you can see yourself clearly, with normal lighting and framing.",
    "Watch the mic level bar move while you talk at a normal volume to confirm your microphone is picking up sound.",
    'Tap "Play test sound" to check your speakers or headphones, then confirm honestly whether you actually heard it.',
    "Review the readiness checklist — camera, microphone and speaker — before joining your actual call.",
    "If camera or mic failed, read the specific error for that device rather than assuming both are broken.",
    'Tap "Stop" when you\'re done to release the camera and microphone immediately.',
  ],
  howItWorks: [
    "This tool requests camera and microphone access in a single combined call, the same way most video-call apps like Zoom, Meet or Teams do before letting you join a meeting. Requesting both together, rather than one after another, mirrors that real workflow instead of testing each device in isolation.",
    "If the combined request fails, this tool doesn't just show one generic error — it quietly tries camera and microphone separately in the background to figure out which specific one is the actual problem, since a single failed combined request doesn't tell you that on its own. That's how it can tell you, for example, that your camera works fine but your microphone was specifically denied.",
    "The speaker check plays a short tone through your own device and asks you to confirm whether you heard it, since there's no reliable way for a webpage to automatically detect what came out of your speakers or whether your volume is muted — that part necessarily relies on your own answer.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Safari on iPhone and iPad will ask for camera and microphone permission the first time; if you accidentally denied either, go to Settings → Safari → Camera or Microphone to reset it, then reload this page.",
    },
    {
      title: "Android",
      body: "Chrome on Android shows a small camera/mic icon in the address bar once granted — tap it to review or change permission without digging through Android's own Settings app.",
    },
    {
      title: "Windows",
      body: "Windows has its own camera and microphone privacy toggles separate from the browser, under Settings → Privacy & Security — both need to be enabled for your browser, not just the in-page prompt.",
    },
    {
      title: "Mac",
      body: "macOS requires camera and microphone permission for your specific browser under System Settings → Privacy & Security, separate from this page's own prompt — check both if either device fails here.",
    },
  ],
  troubleshooting: [
    {
      problem: "The combined request failed but I'm not sure why",
      cause: "A single combined getUserMedia call doesn't say which specific device caused the failure.",
      fix: "This tool automatically re-checks camera and microphone separately after a combined failure — check the specific outcome shown for each one.",
    },
    {
      problem: "Camera and mic both show as working, but I still don't hear the test sound",
      cause: "Camera and mic permission being granted doesn't confirm your speakers or headphones are working or unmuted.",
      fix: 'Check your system volume and output device selection, then tap "Play test sound" again.',
    },
    {
      problem: "The video preview is fine but the mic level bar never moves",
      cause: "The wrong microphone may be selected at the system level, or it may be muted in hardware, like a headset's physical mute switch.",
      fix: "Check your system's default microphone and any physical mute switch, then talk again while watching the level bar.",
    },
    {
      problem: "It worked here but still fails in my actual video-call app",
      cause: "Each app manages its own separate camera/mic permissions and device selection, independent of what a website can access.",
      fix: "Check that specific app's own permission and device settings — passing this test confirms your browser and OS can access the devices, not that every other app can.",
    },
  ],
  safetyNote:
    "This tool only shows a live preview and level meter while the page is open — nothing is recorded, saved, or sent anywhere. Passing this check confirms your browser can access your camera and microphone right now; it can't guarantee every video-call app will behave identically, since each manages its own permissions separately.",
  faqs: [
    {
      q: "Does this upload my video or audio anywhere?",
      a: "No — the video preview and mic level meter are processed entirely in your browser. Nothing is recorded or sent to a server at any point.",
    },
    {
      q: "Why does this ask for camera and mic together instead of separately?",
      a: "Because that's how real video-call apps request access before a meeting, and testing them together catches the exact same permission flow you'll actually encounter.",
    },
    {
      q: "What if my camera works but my microphone doesn't?",
      a: "This tool detects that specific situation and tells you which one actually failed, rather than a single combined error that doesn't distinguish between the two.",
    },
    {
      q: "Can this test confirm other people can hear and see me on a real call?",
      a: "It confirms your browser can access your camera and mic and that you can hear your own speaker test — it can't confirm what a specific call happening on another app or platform will actually transmit.",
    },
    {
      q: "Why do I have to manually confirm I heard the test sound?",
      a: "There's no reliable way for a webpage to detect what actually came out of your speakers or whether you're using headphones, muted, or at low volume — only you can confirm that.",
    },
    {
      q: "Is this different from the separate Webcam Test and Mic Test tools on this site?",
      a: "Yes — this tool requests both together in one flow and adds a speaker check, mirroring an actual meeting-readiness check, rather than testing each device on its own.",
    },
    {
      q: "Do I need to run this every time before a call?",
      a: "Not necessarily — it's most useful the first time you set up a new camera or mic, after a system update, or whenever you're troubleshooting a specific call that isn't working.",
    },
  ],
  related: ["webcam-test", "mic-test", "headphone-test", "speaker-test"],
  relatedBlogPosts: ["how-to-test-your-microphone"],
};

export default content;
