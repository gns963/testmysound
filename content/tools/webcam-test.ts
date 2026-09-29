import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "webcam-test",
  path: "/webcam-test",
  name: "Webcam Test",
  shortName: "Webcam Test",
  engine: "webcam",
  priority: "P1",
  primaryKeyword: "webcam test",
  secondaryKeywords: ["test my webcam", "check webcam online", "webcam not working test"],
  metaTitle: "Webcam Test — Check Your Camera Online",
  metaDescription:
    "Test your webcam online for free — see a live preview, check resolution, and fix permission or 'camera in use' errors instantly. No install.",
  answer:
    "A webcam test lets you check your camera directly in the browser, with no software to install. It shows a live preview and the camera's actual reported resolution, plus clear next steps if your browser blocks access, another app is already using the camera, or no camera is detected at all.",
  howToSteps: [
    'Click "Start camera" and allow camera access when your browser asks.',
    "Check the live preview below — you should see yourself, in real time, with no noticeable delay.",
    "Look at the resolution reading under the preview to confirm your camera's actual output quality.",
    "If you have more than one camera, use the dropdown to switch between them and test each one.",
    'Tap "Take snapshot" to capture a still image and check focus, lighting, and framing.',
    "If the preview looks dark, blurry, or frozen, try the fixes in the troubleshooting table below before assuming your camera is broken.",
    'Click "Stop camera" when you\'re done — this immediately turns off the camera light.',
  ],
  howItWorks: [
    "This tool uses your browser's built-in camera API to open a live video stream from your webcam and display it directly on the page. The video is decoded and rendered locally by your browser — there's no server involved in showing you the preview, and nothing is uploaded at any point.",
    "The resolution reading comes straight from the camera's own reported capabilities, not a guess. Different apps and browser tabs can request different resolutions from the same hardware, which is why the same webcam might show 720p in one app and 1080p in another — the number here reflects what's actually active right now, not the camera's maximum possible spec.",
    "Taking a snapshot works the same way a screenshot does: the current video frame is copied onto a hidden canvas and turned into an image, entirely on your device. The image only exists in your browser until you save or close the page.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Safari on iPhone and iPad only allows camera access over a secure connection and needs a direct tap to trigger the permission prompt — if nothing happens, tap \"Start camera\" again directly rather than through a link that opens in a new tab.",
    },
    {
      title: "Android",
      body: "On Android, Chrome shows a small camera icon in the address bar once access is granted — tap it any time to change permission without digging through your phone's Settings app.",
    },
    {
      title: "Windows",
      body: 'Windows has its own camera privacy toggle separate from the browser. If the permission prompt never appears at all, check Settings → Privacy & Security → Camera and make sure both "Camera access" and your specific browser are switched on.',
    },
    {
      title: "Mac",
      body: "macOS asks for camera permission the first time any browser requests it, and remembers your choice per browser. If you accidentally blocked it, go to System Settings → Privacy & Security → Camera, enable it for your browser, then reload this page.",
    },
  ],
  troubleshooting: [
    {
      problem: "Preview is very dark or grainy",
      cause: "Low ambient light — most webcam sensors are small and need decent lighting to look clear.",
      fix: "Face a light source, like a window or lamp, rather than having it behind you, and avoid strong backlighting.",
    },
    {
      problem: "Preview is blurry or won't focus",
      cause: "Many webcams have a fixed or slow-adjusting autofocus, especially at close range.",
      fix: "Move back slightly and wait a few seconds, or gently clean the lens with a dry microfiber cloth.",
    },
    {
      problem: "Video freezes or lags after a few seconds",
      cause: "Often a CPU or USB bandwidth issue, especially with multiple camera apps or heavy tabs open.",
      fix: "Close other apps using the camera and any heavy background tabs, then restart the test.",
    },
    {
      problem: "Colors look off or washed out",
      cause: "Auto white-balance struggling with mixed lighting, like daylight combined with indoor bulbs.",
      fix: "Try turning off one light source so the camera has a single, consistent light type to balance against.",
    },
  ],
  safetyNote:
    "This tool only shows a live preview and a local snapshot in your browser — nothing is recorded or uploaded anywhere. Camera quality itself depends on your device's hardware; this test can't fix a physically damaged lens or sensor, and older or budget webcams may simply have limited resolution and low-light performance that no setting can fully overcome.",
  faqs: [
    {
      q: "Does this webcam test upload or save my video anywhere?",
      a: "No — the video stream and any snapshot you take stay entirely in your browser. Nothing is recorded, saved, or sent to a server at any point.",
    },
    {
      q: "Why does my browser ask for camera permission every time?",
      a: "Most browsers remember your choice per site after the first time you allow it. If it keeps asking, check that you haven't blocked cookies or site data for this page, which can reset that memory.",
    },
    {
      q: "Can I test my webcam without installing anything?",
      a: "Yes — this tool runs entirely in your browser using the standard camera API every modern browser supports, so nothing needs to be downloaded or installed.",
    },
    {
      q: "Why does my camera work in one app but not in the browser?",
      a: "A camera can usually only be used by one app at a time. If a video-calling app or another browser tab already has it open, close that first, then reload this page.",
    },
    {
      q: "My camera light is off but the preview still shows an image — is that normal?",
      a: "No — if there's a genuine live preview, the indicator light should be on. A stuck last frame can sometimes look live; try moving in front of the camera to confirm the image actually updates.",
    },
    {
      q: "Does this work on mobile phones?",
      a: "Yes — modern mobile browsers support the same camera API, though you may also need to grant permission through your phone's app-level settings, not just the browser's own prompt.",
    },
    {
      q: "Why does the resolution look lower than my camera's advertised spec?",
      a: "Browsers often request a moderate default resolution for performance reasons rather than a camera's maximum. The number shown here is the camera's actual current output, not necessarily its top spec.",
    },
    {
      q: "Is a webcam test accurate for judging video call quality?",
      a: "It's a good first check for resolution, focus and lighting, but real call quality also depends on your internet connection and the calling app's own video compression, neither of which this test measures.",
    },
  ],
  related: ["mic-test", "keyboard-tester", "headphone-test", "db-meter"],
  relatedBlogPosts: ["how-to-test-your-microphone", "how-to-test-headphones-properly"],
};

export default content;
