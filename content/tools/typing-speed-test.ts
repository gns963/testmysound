import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "typing-speed-test",
  path: "/typing-speed-test",
  name: "Typing Speed Test",
  shortName: "Typing Test",
  engine: "typing",
  priority: "P1",
  primaryKeyword: "typing speed test",
  secondaryKeywords: ["wpm test", "typing test online", "free typing test", "words per minute test"],
  metaTitle: "Typing Speed Test — Free WPM & Accuracy Test",
  metaDescription:
    "Free typing speed test — 15, 30 or 60 seconds, easy or medium word sets. See your WPM, accuracy and errors, plus tips to type faster.",
  answer:
    "A typing speed test measures how many words per minute (WPM) you can type accurately over a set time — 15, 30 or 60 seconds here, with easy or medium word sets. It reports net WPM based on correctly typed characters, plus your accuracy percentage and error count, so speed alone doesn't tell the whole story.",
  howToSteps: [
    "Choose a duration — 15, 30 or 60 seconds — and a word set difficulty, easy or medium, from the tabs above.",
    "Click into the typing box and start typing the words shown; the timer starts on your very first keystroke.",
    "Type each word followed by a space, just like normal typing — correct characters turn one color, mistakes turn another as you go.",
    "Keep typing until time runs out; don't worry about a mistake mid-word, you can backspace and fix it before moving on.",
    "When the timer hits zero, typing locks and your result — WPM, accuracy and error count — appears automatically.",
    "Read the improvement tips shown with your result before trying again, especially if accuracy was lower than you'd like.",
    'Tap "Try again" for a fresh, randomly shuffled set of words at the same settings, or change duration or difficulty first.',
  ],
  howItWorks: [
    'Words per minute is calculated using the standard convention of treating every 5 typed characters as one "word," regardless of actual word boundaries — this is the same method most typing test sites use, which is why WPM scores are broadly comparable between different tools even though they show you completely different text.',
    "This test reports net WPM, meaning it only counts characters you typed correctly toward your speed — mistakes you made and corrected don't count against you twice, but they also don't inflate your score. Accuracy is calculated separately, as the percentage of all keystrokes that were correct at the moment you typed them, even ones you later fixed with backspace.",
    "Pasting text into the input is disabled on purpose — a typing speed test measures your own typing, and allowing paste would make the result meaningless. The word stream itself is generated fresh each time from a shuffled word list, so you won't see the exact same sequence twice in a row.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Typing quickly on a phone's on-screen keyboard is a genuinely different skill from a physical keyboard — don't be discouraged if your mobile WPM is much lower than what you'd get on a laptop.",
    },
    {
      title: "Android",
      body: "Some Android keyboards have swipe-to-type or autocorrect features that can interfere with a fair typing test — turning off autocorrect temporarily gives a more accurate result of your actual typing.",
    },
    {
      title: "Windows",
      body: "Check your keyboard layout matches what you're used to (QWERTY vs. others) in Windows settings — a mismatched layout will hurt your score for reasons that have nothing to do with typing skill.",
    },
    {
      title: "Mac",
      body: "macOS's \"Smart Punctuation\" can silently swap straight quotes or dashes for stylized ones in some input fields — this test avoids requiring those characters specifically to sidestep that issue.",
    },
  ],
  troubleshooting: [
    {
      problem: "My WPM seems much lower than I expected",
      cause: "Backspacing a lot to fix mistakes takes real time that counts against your net speed, even though it feels like you're \"still typing.\"",
      fix: "Try slowing down slightly and prioritizing accuracy — a steady, mostly-correct pace often beats a fast-but-error-prone one for net WPM.",
    },
    {
      problem: "The text stopped responding before time was up",
      cause: "You may have run out of generated words if you're an extremely fast typist on a long duration.",
      fix: "This is rare, but if it happens, treat your result up to that point as valid.",
    },
    {
      problem: "My accuracy shows lower than I feel like it should be",
      cause: "Accuracy counts every keystroke at the moment you typed it, including ones you immediately corrected with backspace.",
      fix: "This is intentional and matches how most reputable typing tests calculate accuracy — it rewards getting it right the first time, not just the final result.",
    },
    {
      problem: "Pressing backspace doesn't seem to do anything",
      cause: "This would be unusual — the typing box may have lost focus if you clicked elsewhere on the page.",
      fix: "Click directly into the typing input box, then try backspace again.",
    },
  ],
  safetyNote:
    "This tool only measures typing performed directly into the on-page input box during the test — nothing you type is saved, recorded, or sent anywhere beyond the local best score you choose to keep in this browser. WPM and accuracy numbers reflect this specific test's word list and duration, not a certified or standardized typing credential.",
  faqs: [
    {
      q: "What's a good typing speed?",
      a: "Average typists often land somewhere around 35-45 WPM, while experienced typists commonly reach 60-80 WPM or more. These are general, informal ranges, not an official standard, and vary by source.",
    },
    {
      q: "Why does my WPM differ between typing tests on different websites?",
      a: "Different tests use different word lists, some allow punctuation and capitalization while others don't, and some calculate gross WPM (raw speed) instead of net WPM (error-adjusted) — all of that affects the number you see.",
    },
    {
      q: "What's the difference between the easy and medium word sets?",
      a: "The easy set uses very short, extremely common words; the medium set uses longer, less common vocabulary words, which generally require more careful typing and can lower your WPM slightly even at the same skill level.",
    },
    {
      q: "Does punctuation or capital letters appear in the test text?",
      a: "No — this test uses plain lowercase words separated by spaces, without punctuation, to keep the focus on raw typing speed and accuracy rather than symbol or shift-key handling.",
    },
    {
      q: "Can I use this test on a phone?",
      a: "Yes, though typing speed on a touchscreen keyboard is naturally different from a physical keyboard, and this tool doesn't distinguish between them in how it scores.",
    },
    {
      q: "Is my result comparable to an official typing certification?",
      a: "No — this is a free, informal practice tool. A certification test would typically use a proctored, standardized format that this tool doesn't attempt to replicate.",
    },
    {
      q: "How can I actually improve my typing speed over time?",
      a: "Consistent short practice sessions, focusing on accuracy before speed, and learning proper finger placement (touch typing) tend to help more than occasional long sessions — see the tips shown with your result for a quick starting point.",
    },
  ],
  related: ["cps-test", "keyboard-tester", "mic-test", "db-meter"],
};

export default content;
