import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "how-apple-watch-water-lock-works",
  path: "/blog/how-apple-watch-water-lock-works",
  category: "Science",
  title: "How Apple Watch Water Lock Works (and What It Does to the Speaker)",
  primaryKeyword: "how apple watch water lock works",
  secondaryKeywords: ["apple watch water eject", "water lock apple watch sound", "apple watch speaker water"],
  metaTitle: "How Apple Watch Water Lock Works: Eject Water From the Speaker",
  metaDescription:
    "Water Lock turns off the Apple Watch touchscreen, then plays a sound to push water out of the speaker when you unlock it. Here's how it works and its limits.",
  answer:
    "Water Lock on an Apple Watch turns off the touchscreen so water droplets can't trigger accidental taps. When you turn the Digital Crown to unlock, the watch plays a sound through its speaker and vibrates, which helps push water out of the speaker opening. It helps clear water from the speaker. It does not dry the inside of the watch.",
  quickFix: {
    label: "Try the Watch Water Eject tool",
    href: "/watch-water-eject",
    blurb:
      "Play a similar clearing tone on a device that doesn't have the feature. It helps with small amounts of water and does not repair hardware.",
  },
  sections: [
    {
      heading: "What does Water Lock actually do?",
      paragraphs: [
        "Water Lock is a mode that disables the touchscreen. Water on the display can look like touch input, which causes random taps, so locking the screen avoids that while you swim or shower.",
        "The watch can switch it on automatically when you start a water workout, or you can enable it yourself from Control Center.",
      ],
    },
    {
      heading: "How does unlocking get water out of the speaker?",
      paragraphs: [
        "To leave Water Lock, you turn the Digital Crown. On unlock, the watch plays a series of tones through the speaker and the vibration helps the water droplets leave the speaker opening.",
        "The sound moves the speaker diaphragm quickly, and that motion pushes water out of the small port. You may feel the vibration and hear the tones, and some water may spray from the speaker.",
      ],
    },
    {
      heading: "Why does the sound need a specific frequency?",
      paragraphs: [
        "A low tone moves the diaphragm in larger strokes than a high one, which is better for pushing liquid through the opening. That is the same principle that web-based water eject tones use on phones.",
        "We don't claim an exact figure for Apple's tones, since the company doesn't publish them. The general idea is a low-frequency sound that vibrates the speaker enough to eject water.",
      ],
    },
    {
      heading: "What are the limits?",
      paragraphs: [
        "Water Lock only helps with water in the speaker opening. It doesn't dry the watch internally, and it isn't a repair for a watch that has taken water damage.",
        "Water resistance ratings also have limits and can weaken over time, so follow Apple's guidance for your model and avoid things like high-pressure water or hot water.",
      ],
    },
    {
      heading: "What if my watch speaker still sounds muffled?",
      paragraphs: [
        "Rinse off soap, salt or chlorine with fresh water, dry the outside with a soft cloth, and give the watch time to dry. Try Water Lock again if needed.",
        "If sound stays muffled after a day or two, the cause may be residue or damage. Contact Apple Support for your model.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "No sound plays when I unlock Water Lock",
      cause: "The watch may be in silent mode, or the speaker may be blocked.",
      fix: "Check the sound settings and clean around the speaker opening gently.",
    },
    {
      problem: "Speaker is muffled after swimming",
      cause: "Water or residue may remain in the speaker opening.",
      fix: "Rinse with fresh water, dry the outside, and run Water Lock again.",
    },
    {
      problem: "Touchscreen is acting up in water",
      cause: "Water on the display looks like touch input.",
      fix: "Turn Water Lock on before swimming or showering.",
    },
  ],
  repairShopSigns: [
    "Sound stays muffled or distorted after a day or two.",
    "The watch shows fogging or moisture under the glass.",
    "The speaker stops working altogether.",
    "The watch was exposed to high-pressure or hot water or other conditions outside its rating.",
  ],
  faqs: [
    {
      q: "Does Water Lock make the watch waterproof?",
      a: "No. It only turns off the touchscreen and helps clear water from the speaker. Water resistance comes from the watch's design and rating.",
    },
    {
      q: "Is the sound at unlock harmful to the watch?",
      a: "No. It is designed for this purpose. The tones and vibration are part of normal operation.",
    },
    {
      q: "Can I use the same trick on a phone?",
      a: "A web tool can play a similar clearing tone through a phone speaker. It helps with small amounts of water but isn't an official feature of the phone.",
    },
    {
      q: "Should I charge the watch right after swimming?",
      a: "Dry the watch and its charging area first, and follow Apple's guidance for your model.",
    },
  ],
  relatedTools: ["watch-water-eject", "water-eject", "speaker-test", "left-right-speaker-test"],
  relatedPosts: [
    "how-does-speaker-water-eject-work",
    "how-to-get-water-out-of-phone-speaker",
    "what-do-ip67-ip68-ratings-mean",
    "how-long-does-it-take-for-a-phone-speaker-to-dry",
  ],
  publishedDate: "2026-10-07",
  updatedDate: "2026-10-07",
};

export default post;
