import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "touch-screen-test",
  path: "/touch-screen-test",
  name: "Touch Screen Test",
  shortName: "Touch Screen Test",
  engine: "touch",
  priority: "P1",
  primaryKeyword: "touch screen test",
  secondaryKeywords: ["multi touch test", "touchscreen tester", "ghost touch test"],
  metaTitle: "Touch Screen Test — Check Multi-Touch & Ghost Touches",
  metaDescription:
    "Free touch screen tester — see every touch point drawn live, check multi-touch support, and spot ghost touches on your phone, tablet or laptop.",
  answer:
    "A touch screen test draws a colored dot for every finger touching the screen in real time, so you can confirm multi-touch works and count exactly how many points respond at once. It also helps reveal ghost touches — points that appear without anyone touching the screen — a common sign of a cracked screen or a faulty digitizer.",
  howToSteps: [
    "Place one finger on the canvas below and confirm a colored dot appears exactly where you're touching.",
    "Add more fingers, one at a time, and check that each one gets its own dot without any of them disappearing.",
    "Spread all your fingers out at once, including a thumb, to test how many simultaneous touch points your screen actually supports.",
    "Drag your fingers around slowly and check the dots track smoothly, without jumping, freezing, or lagging behind.",
    "Lift all fingers off and set the device down without touching it — watch for a few seconds for any dot that appears on its own, which would be a ghost touch.",
    "Check the corners and edges of the screen specifically — some touch issues, especially after a screen replacement or a crack, only show up near the edges.",
    'Tap "Clear" to reset the count and try again on a different part of the screen.',
  ],
  howItWorks: [
    "This tool listens for standard pointer events your browser already provides for every finger, mouse click, or stylus touching the screen. Each one gets a unique ID the moment it touches down, which is how the tool can draw and track several fingers independently instead of mixing them into one input.",
    "The dot for each touch is drawn on a canvas at the exact coordinates your browser reports, and follows that finger in real time as it moves, using the same coordinate data your screen's touch digitizer sends to the operating system and then to the browser.",
    "Ghost touches happen when the digitizer — the layer under the glass that senses touch — registers a touch input without any actual finger present, often due to physical damage, trapped moisture, electrical interference, or a low-quality screen protector creating a static or pressure issue. This tool can't fix that, but it makes ghost touches easy to see: any dot appearing on its own, with the device untouched and resting on a flat surface, is very likely a ghost touch.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "iOS supports many simultaneous touch points in Safari — if dots stop appearing after a certain number of fingers, that's more likely a hardware limit on your specific model than a limitation of this tool.",
    },
    {
      title: "Android",
      body: "On Android, some phones' gesture-navigation areas near the screen edges are reserved by the system for back and home gestures and may not report touches the same way the rest of the screen does — test the very edges with that in mind.",
    },
    {
      title: "Windows",
      body: "On a Windows touchscreen laptop or tablet, this works the same as on mobile, but make sure you're actually touching the screen and not using the trackpad, which reports as a single mouse pointer, not a touch point.",
    },
    {
      title: "Mac",
      body: "Standard Macs and MacBooks don't have touchscreens at all — if you're testing an external touch monitor connected to a Mac, use a browser that reports it as a proper pointer device, since some setups only expose it as a mouse.",
    },
  ],
  troubleshooting: [
    {
      problem: "Only one dot appears no matter how many fingers I use",
      cause: "The device or browser may not support multi-touch, or a case or screen protector is dampening some touch points.",
      fix: "Try removing any case or screen protector, and confirm your device's spec sheet actually lists multi-touch support.",
    },
    {
      problem: "A dot appears and won't go away even after lifting my finger",
      cause: "Could be a genuinely stuck touch point on the digitizer, or the release event wasn't received.",
      fix: 'Tap "Clear", then try again; if a specific spot keeps sticking, that area may have a real hardware problem.',
    },
    {
      problem: "Dots jump or stutter instead of following smoothly",
      cause: "Often a performance issue in the browser tab, or a genuinely inconsistent touch response from the hardware.",
      fix: "Close other tabs or apps running in the background, then retest; if it's still jumpy, note which part of the screen it happens on.",
    },
    {
      problem: "A dot appears on its own with nothing touching the screen",
      cause: "This is a ghost touch — the digitizer is registering a false input.",
      fix: "Check for a cracked screen, moisture near the edges, or a poor-quality screen protector, and remove any case or protector before retesting.",
    },
  ],
  safetyNote:
    "This tool only reads standard touch and pointer input already available to any webpage — it can't detect internal hardware faults with certainty, only make touch behavior visible so you can judge it yourself. A consistent ghost touch or a touch point that never responds is a sign of a hardware or digitizer issue that this tool can help you notice, but not diagnose with certainty or repair.",
  faqs: [
    {
      q: "What exactly is a ghost touch?",
      a: "A ghost touch is a touch input your screen registers without anyone actually touching it, often seen as a phone tapping things or scrolling on its own. It's usually caused by physical damage, moisture, or interference at the digitizer layer.",
    },
    {
      q: "How many touch points should a modern phone support?",
      a: "Most modern phone and tablet screens support at least 10 simultaneous touch points, though how many actually respond depends on your specific device and its digitizer hardware.",
    },
    {
      q: "Can a screen protector cause touch problems?",
      a: "Yes — a thick, poorly fitted, or low-quality screen protector can dampen touch sensitivity or, in rarer cases, contribute to ghost touches through trapped air, moisture, or static buildup.",
    },
    {
      q: "Does this test work with a stylus or pen?",
      a: "Yes — the same pointer events this tool listens for also cover stylus and pen input, shown as its own tracked point, generally distinguishable by pressure and consistency compared to a finger.",
    },
    {
      q: "Why does my mouse cursor also show up as a touch point on a laptop?",
      a: "A mouse reports through the same underlying pointer system as touch, just as a single point that follows the cursor — that's expected on any device with both a touchscreen and a mouse or trackpad connected.",
    },
    {
      q: "Is a laggy touch response always a hardware problem?",
      a: "Not always — background apps, a battery-saving mode, or an overloaded browser tab can all cause temporary lag that isn't related to the touch hardware itself.",
    },
    {
      q: "Can this tool test pressure sensitivity?",
      a: "It can display the pressure value your browser reports for each touch point where the hardware supports it, but not all touchscreens report meaningful pressure data — many simply report a fixed default value regardless of how hard you press.",
    },
  ],
  related: ["dead-pixel-test", "webcam-test", "keyboard-tester", "mic-test"],
};

export default content;
