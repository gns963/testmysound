import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "dead-pixel-test",
  path: "/dead-pixel-test",
  name: "Dead Pixel & Screen Test",
  shortName: "Screen Test",
  engine: "screen",
  priority: "P1",
  primaryKeyword: "dead pixel test",
  secondaryKeywords: ["screen test", "monitor test", "stuck pixel test", "screen color test"],
  metaTitle: "Dead Pixel Test — Check Your Screen for Bad Pixels",
  metaDescription:
    "Free full-screen dead pixel test — solid colors, gradient and checker patterns to spot dead, stuck or discolored pixels on any screen.",
  answer:
    "A dead pixel test shows solid colors, gradients and checker patterns full-screen so a dead, stuck or discolored pixel stands out against a uniform background. This tool cycles through 8 solid colors plus a gradient and checkerboard, using fullscreen where supported, with a fallback on devices like iPhone that don't support it.",
  howToSteps: [
    'Click "Start full-screen test" — your browser may ask to enter fullscreen, or the screen will just fill the visible viewport on devices that don\'t support it, like iPhone.',
    "Look closely at the solid color that appears, checking every part of the screen edge to edge for a spot that stays a different color.",
    "Press the right arrow key, or tap anywhere, to move to the next color — go through black, white and every primary color.",
    "Pay extra attention during black and white, since dead pixels (always dark) show up best on white, and stuck pixels (always lit) show up best on black.",
    "Check the gradient pattern for banding, dark patches, or backlight bleed, and the checkerboard for stuck sub-pixels or an odd moiré shimmer.",
    "Press the left arrow key to go back to a previous pattern if you want a second look.",
    "Press Esc, or tap the small close button in the corner, to exit whenever you're done.",
  ],
  howItWorks: [
    "This tool works by making one color fill the entire visible screen at a time, with nothing else on screen to distract your eye. A single dead or stuck pixel is nearly invisible in normal use, surrounded by constantly changing content — but against a perfectly uniform color, it stands out immediately as a tiny spot that doesn't match.",
    "Different colors reveal different problems. A dead pixel, permanently off, is easiest to spot against white or a bright color. A stuck pixel, permanently on at one color, often red, green or blue, is easiest to spot against black. The gradient and checkerboard patterns aren't about individual pixels at all — they're better for spotting backlight uniformity issues and panel banding across a wider area.",
    "Where your browser supports it, this uses the Fullscreen API to hide browser chrome and other distractions completely. Some browsers, notably Safari on iPhone and iPad, don't support fullscreen for a plain webpage — on those, the tool still fills the entire visible screen area, just with the address bar potentially still showing, which doesn't affect the test itself.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Safari on iPhone and iPad doesn't support the Fullscreen API for regular web pages, so this tool fills the screen the best it can within Safari's own UI — the address bar staying visible is normal and doesn't affect the test.",
    },
    {
      title: "Android",
      body: 'Chrome on Android supports true fullscreen — tap "Start full-screen test" and the address bar and navigation bar hide automatically for an edge-to-edge test.',
    },
    {
      title: "Windows",
      body: "On a Windows laptop or monitor, run this at your screen's native resolution, not a scaled or mirrored display, for the most accurate pixel-level check, especially on external monitors.",
    },
    {
      title: "Mac",
      body: "On a MacBook or a display connected to a Mac, temporarily disable True Tone and Night Shift in System Settings → Displays, since both subtly shift color and can make a borderline pixel harder to judge.",
    },
  ],
  troubleshooting: [
    {
      problem: "Fullscreen won't activate",
      cause: "Some browsers only allow fullscreen right after a direct user click, or the site's fullscreen permission was blocked.",
      fix: 'Click "Start full-screen test" directly rather than through a keyboard shortcut, and check your browser hasn\'t blocked fullscreen for this site.',
    },
    {
      problem: "I see a faint spot but it's not there on a different color",
      cause: "That's expected — dead and stuck pixels are often color-specific, visible on some backgrounds and invisible on others.",
      fix: "Cycle through all the colors before deciding whether it's a real dead or stuck pixel, or just dust or a fingerprint on the glass.",
    },
    {
      problem: "A spot moves or wipes away when I touch the screen",
      cause: "That's dust, a smudge, or a scratch on the glass — not a pixel issue at all.",
      fix: "Clean the screen with a dry microfiber cloth and re-run the test.",
    },
    {
      problem: "The whole screen looks slightly uneven, not one specific spot",
      cause: "That's more likely backlight bleed or panel uniformity, common on LCD panels, especially near the edges.",
      fix: "Check this specifically on the black and gradient patterns in a dark room, since backlight bleed is far more visible in low ambient light.",
    },
  ],
  safetyNote:
    "This tool only displays colors on your existing screen — it can't damage a display, and no setting here can create or fix a dead pixel; it only makes existing ones easier to see. A screen showing dead or stuck pixels found this way is a hardware issue, and whether it's covered by warranty depends on your manufacturer's policy and how many pixels are affected.",
  faqs: [
    {
      q: "What's the difference between a dead pixel and a stuck pixel?",
      a: "A dead pixel is permanently off — it shows as a black dot on any background. A stuck pixel is permanently on at one color, often red, green or blue, and shows as a colored dot even when the rest of the screen is a different color.",
    },
    {
      q: "What's burn-in, and is it the same as a stuck pixel?",
      a: "No — burn-in is a faint, ghost-like image, like a logo or status bar, left behind from displaying the same content for a very long time, usually on OLED screens. It affects a shape or pattern, not a single pixel, and often fades over time; a stuck pixel is a single point that doesn't change no matter what's on screen.",
    },
    {
      q: "Can a dead pixel test tool fix a dead pixel?",
      a: "No tool running in a browser can repair a dead or stuck pixel — that's a physical hardware issue. Some people report a stuck pixel occasionally clearing on its own after gentle pressure or extended color cycling, but this isn't reliable or guaranteed.",
    },
    {
      q: "How many dead pixels are considered normal or acceptable?",
      a: "This varies by manufacturer and product — some allow a small number of dead or stuck pixels within official specifications, especially on budget panels. Check your specific manufacturer's dead pixel policy if you're considering a warranty claim.",
    },
    {
      q: "Why doesn't fullscreen work on my iPhone?",
      a: "Safari on iOS doesn't support the Fullscreen API for regular web pages, only for video. This tool still fills the visible screen area as a fallback, which works fine for the test itself even without true fullscreen.",
    },
    {
      q: "Should I test a new laptop or monitor before the return window closes?",
      a: "Yes — running a dead pixel test in the first few days after buying a screen is a common and sensible check, since most return or replacement policies have a time limit.",
    },
    {
      q: "Does screen brightness affect the test?",
      a: "Yes — test at a high, but not maximum, brightness in a normally lit room. Very low brightness can hide subtle stuck pixels, and very high brightness combined with bright colors can be uncomfortable to look at closely.",
    },
  ],
  related: ["touch-screen-test", "webcam-test", "keyboard-tester", "speaker-test"],
};

export default content;
