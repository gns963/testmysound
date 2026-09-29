import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "keyboard-tester",
  path: "/keyboard-tester",
  name: "Keyboard Tester",
  shortName: "Keyboard Tester",
  engine: "keyboard",
  priority: "P1",
  primaryKeyword: "keyboard tester",
  secondaryKeywords: ["test keyboard online", "check if keys work", "keyboard key test"],
  metaTitle: "Keyboard Tester — Check Every Key Online",
  metaDescription:
    "Free online keyboard tester. Press any key to see it highlighted instantly and confirm every key, including modifiers and function keys, works.",
  answer:
    "A keyboard tester is a browser tool that highlights each key on an on-screen layout the moment you press it, so you can confirm every key — including modifiers like Shift and Ctrl — is actually registering. It works with any physical keyboard and needs no installation or permission, since reading a key press isn't sensitive the way camera or microphone access is.",
  howToSteps: [
    "Open this page on the computer with the keyboard you want to test — no click or permission needed to start.",
    "Press any key on your physical keyboard and watch it light up on the on-screen layout below.",
    'Check the "Last key pressed" readout to confirm the exact key name matches what you pressed.',
    "Work your way across the keyboard, including number, function and arrow keys, to check each one lights up.",
    "Hold Shift, Ctrl, Alt or the Windows/Cmd key to see modifier keys highlight while they're held down.",
    'Use "Reset" to clear all highlighted keys and start a fresh pass — useful when testing a second keyboard.',
    "If a key doesn't highlight at all, try it a few more times and check the troubleshooting table below before assuming it's faulty.",
  ],
  howItWorks: [
    "This tool listens for the standard keyboard events every browser already provides. It doesn't need any special permission, because knowing which key was pressed isn't treated as sensitive the way a camera or microphone request is.",
    "Each key on the on-screen layout is matched to a specific code your keyboard sends, rather than just the letter or symbol printed on it. That's why this test can tell the difference between your left and right Shift key, even though they'd otherwise look identical.",
    "A key turns green the first time it's pressed and stays that way for the rest of the session, so you can see at a glance which keys you've already confirmed and which ones you still need to test.",
    "Nothing you type is stored or sent anywhere — the moment you refresh or close this page, the tool forgets every key it saw.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "If you're testing a Bluetooth keyboard paired with an iPhone or iPad, open this page in Safari — some keys, like a dedicated emoji or globe key, are handled entirely by iOS and won't reach the browser, so they won't show up here.",
    },
    {
      title: "Android",
      body: "With an external keyboard connected over Android, most keys behave the same as on a computer, but manufacturer-specific keys, like a dedicated assistant button, may be intercepted by the device before they ever reach Chrome.",
    },
    {
      title: "Windows",
      body: "On Windows, a few combinations like Ctrl+Alt+Delete are reserved by the operating system and can't reach any browser page, including this one — that's expected behavior, not a sign the key is broken.",
    },
    {
      title: "Mac",
      body: "On Mac, function-row keys like brightness or volume are treated as system media keys by default, so they may not register here unless you hold Fn and press that key at the same time.",
    },
  ],
  troubleshooting: [
    {
      problem: "A key doesn't light up at all",
      cause: "It may be a media or system key your OS intercepts before it reaches the browser, or the key itself may be faulty.",
      fix: "Test the same key in a plain text field first — if it doesn't type anything there either, it's likely a hardware or OS issue, not this tool.",
    },
    {
      problem: "The wrong key highlights",
      cause: "A non-US or non-standard keyboard layout can send a different code than expected for a key's physical position.",
      fix: "This is expected on non-US layouts — judge the result by the key's physical position rather than the printed letter.",
    },
    {
      problem: "A key seems to fire repeatedly on its own",
      cause: "Holding a key naturally triggers repeated keydown events — that's standard OS key-repeat behavior, not a fault.",
      fix: "Press and release once, quickly, to test a single press instead of holding it down.",
    },
    {
      problem: "Nothing highlights no matter what you press",
      cause: "The browser tab may have lost focus, or an extension is intercepting keyboard events before they reach the page.",
      fix: "Click anywhere on this page once, then try again; if it still doesn't respond, try a different browser or disable extensions temporarily.",
    },
  ],
  safetyNote:
    "This tool only reads which key was pressed and released — it doesn't record, store, or transmit any keystrokes, and there's no reason it would need to, since testing key detection doesn't require remembering what you typed. It also can't test keys your operating system reserves for itself, like some media or system shortcuts, which will appear unresponsive here even though the physical key is working fine.",
  faqs: [
    {
      q: "Does this keyboard tester log or save what I type?",
      a: "No — it only tracks which keys were pressed during this session, in your browser's memory, and forgets everything the moment you leave or refresh the page.",
    },
    {
      q: "Can I use this to test for keyboard ghosting issues?",
      a: "Partially — pressing several keys at once and checking they all highlight can reveal basic ghosting, but browsers can still limit how many simultaneous keys they report, so this isn't a substitute for dedicated rollover-testing software.",
    },
    {
      q: "Why doesn't my Print Screen or volume key do anything here?",
      a: "Some keys are handled directly by your operating system and never generate a standard key event a browser can see — that's a browser or OS limitation, not a sign the key is broken.",
    },
    {
      q: "Will this work with a wireless or Bluetooth keyboard?",
      a: "Yes — once a keyboard is connected, wired or wireless, your browser sees the same standard key events either way.",
    },
    {
      q: "Can I test two keyboards at the same time?",
      a: "You can, but the tool can't tell which physical keyboard sent which key if both are connected at once — test one at a time and hit Reset in between for a clean result.",
    },
    {
      q: "Why does holding a key show it repeating rapidly?",
      a: "That's your operating system's key-repeat setting, the same behavior you'd see typing into any text field — it isn't something this tool controls.",
    },
    {
      q: "Is a laptop's built-in keyboard tested the same way as an external one?",
      a: "Yes — both send the same kind of key events to the browser, so the test works identically either way.",
    },
  ],
  related: ["mic-test", "webcam-test", "headphone-test", "db-meter"],
  relatedBlogPosts: ["how-to-test-your-microphone", "how-to-test-headphones-properly"],
};

export default content;
