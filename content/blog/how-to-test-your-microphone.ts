import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "how-to-test-your-microphone",
  path: "/blog/how-to-test-your-microphone",
  category: "Testing",
  title: "How to Test Your Microphone (Windows, Mac, Android & iPhone)",
  primaryKeyword: "how to test your microphone",
  secondaryKeywords: ["mic test online", "check if mic is working", "microphone not working test"],
  metaTitle: "How to Test Your Microphone (Windows, Mac, Android & iPhone)",
  metaDescription:
    "Not sure if your mic is actually working? Here's how to test it on any device in under a minute, plus what a bad test result usually means.",
  answer:
    "The fastest way to test a microphone on any device is a browser-based mic test that visualizes your voice as you speak — no app or account needed, and it works the same way on Windows, Mac, Android and iPhone since it just uses the browser's microphone permission. If you see no movement at all while speaking, the issue is almost always permissions or a wrong input device, not broken hardware.",
  quickFix: {
    label: "Run the Mic Test",
    href: "/mic-test",
    blurb: "Speak normally and watch the input level respond in real time — takes about 10 seconds to know if your mic is working.",
  },
  sections: [
    {
      heading: "Why a quick visual test beats just recording yourself",
      paragraphs: [
        "Recording a voice memo and playing it back tells you the mic worked once, but not why it failed if it didn't — you can't tell permissions, wrong device selection, and dead hardware apart from a blank recording alone. A live level meter shows input the instant you speak, which makes the difference obvious immediately.",
        "This is also faster for confirming a fix worked, since you don't need to record, stop, and play back every time you change a setting.",
      ],
    },
    {
      heading: "On Windows: check the input device first",
      paragraphs: [
        "Windows often has more than one microphone registered — a laptop's built-in mic, a webcam's mic, and a headset mic can all be present at once, and the wrong one being selected as default is the most common reason a working mic \"doesn't work.\"",
        "Open Sound settings, confirm the correct input device is selected and its volume isn't at zero, then run a browser-based test to confirm live input before assuming anything is broken.",
      ],
    },
    {
      heading: "On Mac: check System Settings permissions",
      paragraphs: [
        "macOS requires explicit per-app microphone permission, including for browsers. If Chrome, Safari or Firefox has never been granted mic access, a browser test will show no input at all, which looks identical to a hardware failure.",
        "Check Privacy & Security → Microphone in System Settings, confirm your browser is allowed, then retest.",
      ],
    },
    {
      heading: "On Android and iPhone: permissions and app conflicts",
      paragraphs: [
        "Mobile browsers ask for microphone permission the first time a page needs it — if you denied it, or it was denied automatically by a device policy, no input will register no matter how loudly you speak. Check the browser's site settings for the specific page and confirm microphone access is allowed.",
        "Also check that no other app is actively using the microphone in the background — a call app or voice assistant holding the mic can block a browser test from getting any input.",
      ],
    },
    {
      heading: "What a failed test usually means, in order of likelihood",
      paragraphs: [
        "In rough order of how often each cause turns out to be the real one: browser or OS microphone permission not granted, wrong input device selected, another app holding the microphone, then finally actual hardware failure. Physical mic damage is real but far less common than the first three combined.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "Test shows input but it's extremely quiet",
      cause: "Input gain may be set low, or the mic port has debris.",
      fix: "Check input volume/gain settings first; if that's not it, a gentle grille cleaning may help.",
    },
    {
      problem: "Works in one browser but not another",
      cause: "Microphone permission is granted per-browser, not system-wide.",
      fix: "Check and grant permission specifically in the browser that's failing.",
    },
    {
      problem: "Mic worked yesterday, nothing today with no changes made",
      cause: "Often a background app or call that's still holding the microphone.",
      fix: "Close other apps and restart the device before assuming a deeper problem.",
    },
  ],
  repairShopSigns: [
    "No input registers on any browser, with permissions confirmed granted and no other app using the mic.",
    "The issue affects every app, not just the browser, including phone calls.",
    "You can see or hear physical damage near the microphone port.",
    "Input cuts in and out unpredictably regardless of app or permission settings.",
  ],
  faqs: [
    {
      q: "Do I need to install anything to test my microphone?",
      a: "No — a browser-based test uses the same microphone permission any video-calling site already asks for, with nothing to install.",
    },
    {
      q: "Why does my mic work on calls but not in the browser test?",
      a: "That almost always points to the browser specifically lacking microphone permission, since calling apps often have their own separate permission already granted.",
    },
    {
      q: "Is my audio actually being recorded or sent anywhere during a test?",
      a: "A browser-based level meter reads the microphone locally to draw the visualization — nothing needs to be uploaded or saved for a level test to work.",
    },
    {
      q: "Can water damage affect the microphone the same way it affects speakers?",
      a: "Yes — the mic has its own small port that can also collect water or dust, separate from the speaker grille, and benefits from the same drying approach.",
    },
    {
      q: "Why does the test show input but calls still sound bad to others?",
      a: "A working input level doesn't rule out background noise, a partially blocked port, or a positioning issue — those affect clarity without necessarily stopping input entirely.",
    },
  ],
  relatedTools: ["mic-test", "water-eject", "db-meter"],
  relatedPosts: [
    "how-to-get-water-out-of-phone-speaker",
    "phone-speaker-not-working-but-headphones-work",
    "how-loud-is-too-loud-decibel-levels-explained",
  ],
  publishedDate: "2026-09-28",
  updatedDate: "2026-09-28",
};

export default post;
