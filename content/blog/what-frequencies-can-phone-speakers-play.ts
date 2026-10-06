import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "what-frequencies-can-phone-speakers-play",
  path: "/blog/what-frequencies-can-phone-speakers-play",
  category: "Testing",
  title: "What Frequencies Can a Phone Speaker Actually Play?",
  primaryKeyword: "what frequencies can phone speakers play",
  secondaryKeywords: ["phone speaker frequency range", "why phone speakers have no bass", "speaker frequency response"],
  metaTitle: "What Frequencies Can Phone Speakers Play? Range & Limits",
  metaDescription:
    "Phone speakers are tiny, so they struggle with bass and fade at the extremes. Here's why, and how to see where your own speaker's limits are with a sweep.",
  answer:
    "Phone speakers play most of the mid-range well, but struggle with deep bass because the driver is very small and moves little air. Exact limits vary by model, and manufacturers rarely publish them. The practical way to find your own phone's range is to play a frequency sweep and note where the sound fades or distorts.",
  quickFix: {
    label: "Run a Frequency Sweep",
    href: "/frequency-sweep",
    blurb:
      "Set your own From and To range and listen for where the sound fades, buzzes or disappears on your phone.",
  },
  sections: [
    {
      heading: "Why can't phone speakers play deep bass?",
      paragraphs: [
        "Low frequencies need a lot of air moved, which usually means a larger driver and a bigger enclosure. A phone speaker has neither, so the lowest notes fade out well before they reach the bottom of human hearing.",
        "This is a size limit, not a fault. A thin phone with a clean but bass-light sound is behaving normally.",
      ],
    },
    {
      heading: "Where does a phone speaker usually start to fade?",
      paragraphs: [
        "There's no single number, and we won't claim one for your model. Many small speakers fade noticeably through the low hundreds of Hz and are weak below that, but the exact point differs between phones and sometimes between units of the same phone.",
        "Phone makers rarely publish frequency response, so the most reliable data is your own ears and a controlled test tone.",
      ],
    },
    {
      heading: "What happens at the high end?",
      paragraphs: [
        "Tiny speakers can usually play high frequencies better than low ones, but they roll off at the very top and can sound thin or harsh. Your own hearing also fades at the high end, which makes it hard to tell where the speaker stops and your ears begin.",
        "If a tone seems to vanish at a high frequency, test on another device or with headphones. That helps separate the speaker's limit from yours.",
      ],
    },
    {
      heading: "How can I find my phone's real range?",
      paragraphs: [
        "Play a slow sweep over the range you care about, at a low and comfortable volume, and listen for the point where it fades, gets quieter or distorts. A narrow, slow sweep makes limits easier to spot than a fast wide one.",
        "Repeat it once the phone is out of its case and away from other objects, since a loose case or desk item can add buzzing that isn't from the speaker.",
      ],
    },
    {
      heading: "Does a speaker problem look different from a normal limit?",
      paragraphs: [
        "A normal limit is a clean, gradual fade. A problem tends to sound like crackling, buzzing, rattling or one section suddenly dropping out while the rest is fine.",
        "If a range that used to play now sounds dull, a blocked grille or moisture may be responsible. Our cleaning guides cover those causes.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "Sweep disappears at low frequencies",
      cause: "The speaker is too small to reproduce deep bass, which is normal.",
      fix: "No fix needed. Use headphones or an external speaker for bass-heavy tests.",
    },
    {
      problem: "Buzzing at a particular frequency",
      cause: "A loose case, a nearby object or a damaged speaker can resonate at one frequency.",
      fix: "Remove the case, clear nearby objects and retest. If it persists, test the speaker for damage.",
    },
    {
      problem: "Sweep sounds weaker than it used to",
      cause: "Dust, lint or moisture on the grille can dull some ranges.",
      fix: "Clean the grille gently and retest.",
    },
  ],
  repairShopSigns: [
    "Crackling or buzzing across much of the range, not at one spot.",
    "One frequency range drops out completely when it used to play.",
    "The problem began after a drop or contact with water.",
    "Cleaning and removing the case change nothing.",
  ],
  faqs: [
    {
      q: "Do all phones have the same frequency range?",
      a: "No. It varies by model, speaker design and even the individual unit, and makers rarely publish it.",
    },
    {
      q: "Is a phone speaker with no bass broken?",
      a: "Usually not. Weak bass is a size limitation. Buzzing or distortion is what suggests a real fault.",
    },
    {
      q: "Can software boost bass on a phone speaker?",
      a: "EQ can change the balance, but it can't make a small driver move more air, and pushing it can cause distortion.",
    },
    {
      q: "Why do headphones play lower notes than my phone?",
      a: "Headphone drivers sit close to the ear and are designed for the job, so they can reproduce low frequencies at much lower volume.",
    },
  ],
  relatedTools: ["frequency-sweep", "bass-test", "speaker-test", "tone-generator"],
  relatedPosts: [
    "how-to-test-bass-on-speakers-and-headphones",
    "how-to-test-if-phone-speaker-is-damaged",
    "hearing-range-by-age-explained",
    "why-is-my-phone-speaker-muffled",
  ],
  publishedDate: "2026-10-05",
  updatedDate: "2026-10-05",
};

export default post;
