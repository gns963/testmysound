import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "hearing-range-by-age-explained",
  path: "/blog/hearing-range-by-age-explained",
  category: "Testing",
  title: "Hearing Range by Age: What Frequencies Can You Hear?",
  primaryKeyword: "hearing range by age",
  secondaryKeywords: ["what frequency can humans hear", "high frequency hearing loss age", "can i hear 16khz"],
  metaTitle: "Hearing Range by Age Explained: What Frequencies Can You Hear?",
  metaDescription:
    "Humans are commonly said to hear 20Hz to 20kHz, but the top end shrinks with age. Here's how hearing range changes, and how to check yours informally.",
  answer:
    "Humans are commonly said to hear roughly 20Hz to 20kHz, but that figure describes young, healthy ears. The upper limit usually drops gradually with age, a pattern called presbycusis, so many adults can't hear the highest tones that children can. Exact limits vary a lot from person to person, and an online test is only a rough guide.",
  quickFix: {
    label: "Try the Hearing Test",
    href: "/hearing-test",
    blurb:
      "Listen to ascending tones from 8kHz to 19kHz and stop when you can't hear them. It's an informal check, not a medical test.",
  },
  sections: [
    {
      heading: "What is the normal human hearing range?",
      paragraphs: [
        "The textbook figure is about 20Hz at the low end to 20kHz at the high end. Real people sit at different points inside, and sometimes outside, that range, and the number is a convention rather than a guarantee for any one person.",
        "Hearing is also not equally sensitive across that range. We hear mid-range frequencies, where speech sits, much more easily than the extremes, so a tone at the edge of the range needs to be louder before you notice it.",
      ],
    },
    {
      heading: "Why does hearing range shrink with age?",
      paragraphs: [
        "The most common pattern is gradual loss of sensitivity at high frequencies, usually described as age-related hearing change, or presbycusis. It tends to start at the very top of the range and move downward slowly over the decades.",
        "That's why a tone many young people find obvious can be silent to an older adult, even though both hear everyday speech and music normally. The loss at the top end often goes unnoticed for years.",
      ],
    },
    {
      heading: "Can I find my own limit with an online test?",
      paragraphs: [
        "You can get a rough idea. A tool that steps upward through high frequencies lets you note where the sound disappears for you. It works as a curiosity check and a way to compare devices, but it is not an audiogram.",
        "Results depend heavily on your equipment. Phone and laptop speakers often can't reproduce the highest tones cleanly, which can make your hearing look worse than it is, so headphones in a quiet room give a fairer result.",
      ],
    },
    {
      heading: "Why might my result look worse than expected?",
      paragraphs: [
        "The playback device is the most common reason. Many small speakers roll off before the top of the tested range, and volume, background noise and even earwax or a poor headphone fit all change what you hear.",
        "Retest on a different device before drawing conclusions. If the result is still unexpectedly low, treat it as a prompt to ask a professional, not as a diagnosis.",
      ],
    },
    {
      heading: "When should I see an audiologist?",
      paragraphs: [
        "Sudden hearing loss, hearing loss in only one ear, ringing that won't stop, or trouble following conversations are all reasons to book a proper hearing assessment rather than rely on a website.",
        "An online tone test cannot detect or rule out medical conditions. A clinic test measures each ear separately with calibrated equipment, which is the only reliable way to know where you stand.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "I can't hear the highest tones on my laptop",
      cause: "Laptop speakers often can't reproduce very high frequencies well.",
      fix: "Retest with headphones before assuming anything about your hearing.",
    },
    {
      problem: "Results change every time I test",
      cause: "Volume, background noise and headphone fit all shift what you hear.",
      fix: "Use the same device, a quiet room and a normal, comfortable volume each time.",
    },
    {
      problem: "I hear a faint whistle that isn't in the tone",
      cause: "That may be ringing in your ears (tinnitus) or electronic noise from the device.",
      fix: "If it is persistent, talk to a doctor or audiologist.",
    },
  ],
  repairShopSigns: [
    "Sudden loss of hearing in one or both ears.",
    "Hearing seems clearly worse in one ear than the other.",
    "Ringing, buzzing or a feeling of fullness in the ear that doesn't go away.",
    "You regularly struggle to follow speech in everyday conversation.",
  ],
  faqs: [
    {
      q: "Is 20kHz the real limit of human hearing?",
      a: "It's the commonly quoted upper limit for young, healthy ears. Many adults hear less than that, and individual limits vary.",
    },
    {
      q: "Can children hear sounds adults can't?",
      a: "Often, yes, at the very high end. The top of the range commonly fades with age, so some tones audible to children are silent to adults.",
    },
    {
      q: "Is an online hearing test accurate?",
      a: "Only roughly. Your device, volume and room all affect it. It's useful for curiosity, not for diagnosis.",
    },
    {
      q: "Can loud sound reduce my hearing range?",
      a: "Yes, repeated exposure to loud sound can damage hearing over time. Our guide to decibel levels explains safer listening habits.",
    },
    {
      q: "Does hearing high frequencies matter for everyday life?",
      a: "Speech mostly sits well below the highest tones, so losing the very top end is often not noticed day to day.",
    },
  ],
  relatedTools: ["hearing-test", "safe-volume-calculator", "frequency-sweep", "headphone-test"],
  relatedPosts: [
    "how-loud-is-too-loud-decibel-levels-explained",
    "how-to-test-headphones-properly",
    "what-frequencies-can-phone-speakers-play",
    "how-to-test-bass-on-speakers-and-headphones",
  ],
  publishedDate: "2026-10-05",
  updatedDate: "2026-10-05",
};

export default post;
