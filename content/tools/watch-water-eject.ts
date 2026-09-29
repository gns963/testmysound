import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "watch-water-eject",
  path: "/watch-water-eject",
  name: "Smartwatch Water Eject",
  shortName: "Watch Water Eject",
  engine: "cleaner",
  priority: "P2",
  primaryKeyword: "apple watch water eject",
  secondaryKeywords: ["smartwatch water in speaker", "apple watch water lock", "wear os water eject"],
  metaTitle: "Smartwatch Water Eject — Apple Watch Water Lock Guide",
  metaDescription:
    "How to eject water from an Apple Watch using Water Lock, plus a backup pulsed-tone tool for your phone if it got wet in the same splash.",
  answer:
    "Apple Watch has a real, built-in water-eject feature called Water Lock: pressing and holding the Digital Crown after it's on plays a tone sequence that clears water from the speaker. Since a browser can't run on most smartwatches, this page also offers this site's own pulsed-tone tool for your phone if it got wet in the same incident.",
  howToSteps: [
    "Press the side button on your Apple Watch to open Control Center.",
    "Tap the Water Lock button — a blue water-drop icon appears at the top of your watch face to confirm it's on.",
    'When you\'re ready to clear water, press and hold the Digital Crown until the display says "Unlocked" (on watchOS 8 or earlier, rotate the Digital Crown instead of pressing it).',
    "A series of tones plays automatically to clear water from the speaker — wait for it to finish before checking sound quality.",
    "Water Lock also turns on automatically during swimming or surfing workouts, and during a scuba dive on Apple Watch Ultra, so you may not need to turn it on manually in those cases.",
    "If your watch isn't an Apple Watch, check its own settings or companion app for a similar feature — this varies a lot by manufacturer, and not all smartwatches have one.",
    "If your phone or laptop also got wet in the same splash, scroll down and use this page's own tool on that device instead — it can't reach your watch directly.",
  ],
  howItWorks: [
    "Apple Watch's Water Lock feature works on the same basic principle as this site's own Water Eject tool: playing a specific tone through the speaker makes its diaphragm vibrate forcefully enough to help shake water loose from the grille. Apple built this directly into watchOS, triggered by pressing and holding (or, on watchOS 8 and earlier, rotating) the Digital Crown once Water Lock is active.",
    "This site's tool can't reach your watch's speaker directly, because a website needs a browser to run in, and most smartwatches, including Apple Watch, don't support browsing to a general website like this one. That's a real hardware and software limitation, not something a setting can work around.",
    "If your phone or laptop was also splashed or dunked alongside your watch, which is common if you were swimming, caught in rain, or dropped something in water, the tool on this page plays the exact same kind of pulsed low-frequency tone for that device's own speaker.",
  ],
  tips: [
    {
      title: "Apple Watch",
      body: "Water Lock and its eject tone work on Apple Watch Series 2 and later and all Apple Watch Ultra models — the exact Digital Crown gesture differs slightly by watchOS version, so check which one your watch is running if it doesn't seem to respond.",
    },
    {
      title: "Samsung Galaxy Watch",
      body: "Some Galaxy Watch models have their own water-resistance and moisture-detection prompts, though the exact steps vary by model — check your specific watch's settings or Samsung's own support guidance.",
    },
    {
      title: "Wear OS (other brands)",
      body: "Water Lock is an Apple-specific feature name; most other Wear OS watches don't have a direct equivalent built in. If yours doesn't, power it off if possible, avoid charging while wet, and let it air-dry the same way you would a wet phone.",
    },
    {
      title: "Your phone",
      body: "If your phone also got wet, the main Water Eject tool on the homepage and the tool included right here on this page both use the exact same pulsed-tone approach.",
    },
  ],
  troubleshooting: [
    {
      problem: "Pressing or rotating the Digital Crown doesn't do anything",
      cause: "Water Lock may not be active yet — the eject tone only plays as part of turning off an already-active Water Lock.",
      fix: "Press the side button, open Control Center, tap Water Lock to turn it on first, then use the Digital Crown to turn it off and trigger the eject sequence.",
    },
    {
      problem: "The watch still sounds muffled after using Water Lock",
      cause: "A single cycle may not clear all the water, especially after full submersion rather than a light splash.",
      fix: "Repeat the Water Lock eject cycle a few times, with some air-drying time in between, before assuming there's a deeper problem.",
    },
    {
      problem: "My watch isn't an Apple Watch and has no water-lock feature",
      cause: "Not every smartwatch brand includes a dedicated water-eject feature.",
      fix: "Treat it like any other wet electronic: power off if possible, don't charge it, and let it air-dry fully before assuming anything is damaged.",
    },
    {
      problem: "I want to use this page's tool but I'm viewing it on a watch with a browser",
      cause: "A handful of watches have limited web browsing, but the tool still can't do anything meaningful through a smartwatch's tiny speaker in this context.",
      fix: "Open this page on your phone or laptop instead, and use its speaker for the tool.",
    },
  ],
  safetyNote:
    "The Water Lock steps on this page describe Apple's own published feature and behavior — we don't control or modify how it works, and it's worth checking Apple's own support page if your watch behaves differently than described here. This site's own tone tool, included below, only affects whichever device you're actually viewing this page on; it cannot reach or eject water from a smartwatch remotely, and no browser-based tool can.",
  faqs: [
    {
      q: "Does Water Lock actually remove water, or just lock the screen?",
      a: "Both — while active it prevents accidental taps from water on the display, and turning it off plays a tone sequence specifically meant to clear water from the speaker.",
    },
    {
      q: "Can I trigger the water-eject tone without turning Water Lock on first?",
      a: "The eject tone plays as part of turning Water Lock off, so you generally need to turn it on first, either manually from Control Center or automatically via a water-based workout.",
    },
    {
      q: "Does this work on every Apple Watch model?",
      a: "It works on Apple Watch Series 2 and later, and Apple Watch Ultra models — the water-resistant generations. The original first-generation Apple Watch isn't water resistant and doesn't have this feature.",
    },
    {
      q: "What about Samsung Galaxy Watch or other Wear OS watches?",
      a: "Some have their own water-resistance features with varying names and steps; check your specific watch's settings, companion app, or manufacturer support page, since there's no single universal equivalent across all Wear OS devices.",
    },
    {
      q: "Can I use this website's tool directly on my watch?",
      a: "No — this website needs a browser, and most smartwatches, including Apple Watch, don't support browsing to general websites like this one. That's a device limitation, not a setting you can change.",
    },
    {
      q: "Why does this page include a phone/laptop tool at all, then?",
      a: "Because water incidents often affect more than one device at once, like swimming with both a watch and a phone. If your phone also got wet, this page's tool works for that, using the same pulsed-tone approach as the main Water Eject tool.",
    },
    {
      q: "Is it safe to charge my watch right after using Water Lock?",
      a: "Wait until you're confident it's fully dry — the same general precaution as any other wet electronic device, even after the eject tone has run.",
    },
  ],
  related: ["water-eject", "deep-speaker-cleaner", "earpiece-speaker-cleaner"],
  relatedBlogPosts: ["does-rice-fix-a-wet-phone", "how-to-get-water-out-of-phone-speaker"],
  sources: [
    {
      label: "Apple Support — How to use Water Lock and eject water from your Apple Watch",
      href: "https://support.apple.com/en-us/108352",
    },
  ],
};

export default content;
