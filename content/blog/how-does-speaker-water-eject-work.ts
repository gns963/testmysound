import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "how-does-speaker-water-eject-work",
  path: "/blog/how-does-speaker-water-eject-work",
  category: "How It Works",
  title: "How Does Speaker Water Eject Work? (165Hz, Explained)",
  primaryKeyword: "how does water eject work",
  secondaryKeywords: [
    "165Hz speaker water eject",
    "sound based water removal",
    "speaker water eject explained",
  ],
  metaTitle: "How Does Speaker Water Eject Work? 165Hz Explained",
  metaDescription:
    "The science behind sound-based water eject tools: why a low, pulsed tone helps shift water off a speaker grille, and what it can't do.",
  answer:
    "A speaker water-eject tool plays a low, pulsed tone — commonly around 165Hz — through the phone's own speaker to make its diaphragm vibrate more forcefully than normal audio would. That extra motion, combined with gravity if the phone is held grille-down, helps shake surface water out through the grille openings. It's a mechanical nudge for light exposure, not a fix for internal liquid damage.",
  quickFix: {
    label: "Try it yourself",
    href: "/",
    blurb: "See the effect directly — run the free tool and feel the pulse against your palm while it plays.",
  },
  sections: [
    {
      heading: "The basic mechanism: vibration, not suction",
      paragraphs: [
        "It's easy to assume a water-eject tool works like a tiny vacuum, pulling water out. It doesn't — there's no suction involved at all. Instead, the speaker's own diaphragm, the thin membrane that moves to create sound, is driven to oscillate strongly, and that physical motion is what disturbs water sitting on or near it.",
        "Held grille-down, gravity does the rest: water that's been shaken loose from the surface simply falls out through the grille's own openings rather than needing to be extracted.",
      ],
    },
    {
      heading: "Why a low frequency, and why 165Hz specifically",
      paragraphs: [
        "Lower frequencies move more air per cycle than higher ones, which is why bass notes feel physical while treble doesn't. A tone around 165Hz sits low enough to drive the diaphragm with real, felt force, while still being high enough for small phone speakers to reproduce clearly without excessive strain.",
        "The pulsing pattern matters as much as the frequency itself — a steady tone lets the diaphragm settle into a rhythm, while short on/off bursts, roughly the pattern our own tool uses, repeatedly jolt it, which tends to dislodge droplets more effectively than a continuous note.",
      ],
    },
    {
      heading: "What this method can realistically fix",
      paragraphs: [
        "This approach is well suited to light, common exposure: a splash, rain, a quick dunk, sweat, or humidity — anything that leaves a thin layer of water sitting on the grille's surface. For that kind of exposure, a pulsed tone plus gravity plus a short drying period is often all it takes.",
        "It also works for dust and light debris, though a sweeping frequency, rather than a single pulsed tone, tends to be more effective for that specific case, since dust responds differently to vibration than liquid does.",
      ],
    },
    {
      heading: "What it can't fix, and why",
      paragraphs: [
        "Sound-based methods only affect what's near the speaker's own diaphragm. Water that has migrated past seals and gaskets into the phone's internals — onto a logic board, battery, or charging port — is completely outside what a speaker can physically influence, no matter the frequency.",
        "Similarly, if the diaphragm itself is already damaged — torn, warped, or corroded — vibrating it won't repair the damage. It may briefly change the sound, but the underlying part is still broken.",
      ],
    },
    {
      heading: "Is this the same as just playing a bass-heavy song?",
      paragraphs: [
        "Conceptually, yes — some people have used loud bass tracks for the same effect for years. A purpose-built tool just tunes the frequency and pulse pattern specifically for this, rather than relying on whatever happens to be in a song, and caps the volume and duration to avoid straining the speaker.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "I don't feel any vibration when the tool runs",
      cause: "Media volume may be too low, or Silent/Do Not Disturb mode may still be muting audio.",
      fix: "Max out media volume and confirm silent mode is off before running it.",
    },
    {
      problem: "It worked once but sound came back muffled later",
      cause: "Water that had migrated slightly deeper can slowly work its way back toward the grille.",
      fix: "Give it a longer drying period before running the tool again.",
    },
  ],
  repairShopSigns: [
    "The phone was submerged well beyond a quick splash or dunk.",
    "Sound doesn't change at all no matter how many times you run it.",
    "You notice a burning smell, swelling, or the phone won't power on.",
    "Distortion appears that wasn't there before you started troubleshooting.",
  ],
  faqs: [
    {
      q: "Why not just use a random loud sound instead of a specific tool?",
      a: "You can, but a tuned pulsed tone at a controlled volume is more consistent and easier on the speaker than guessing with music at full volume.",
    },
    {
      q: "Does this use ultrasonic frequencies like professional cleaning devices?",
      a: "No — professional ultrasonic cleaners use frequencies far above human hearing and specialized equipment. Browser-based tools work within the audible range a phone speaker can actually reproduce.",
    },
    {
      q: "Can this method damage my speaker if I run it too much?",
      a: "Running it at a sensible volume for a limited number of cycles, as our tool caps automatically, isn't damaging. Running any speaker at maximum volume for extended, repeated periods is what causes strain, regardless of the tone used.",
    },
    {
      q: "Does the phone need to be a specific model for this to work?",
      a: "No — the mechanism relies on the speaker's own diaphragm moving, which every phone speaker does. Effectiveness varies with how the water is sitting, not the phone brand.",
    },
    {
      q: "Is there real evidence this works, or is it just a placebo?",
      a: "The physics — vibration disturbing surface liquid, aided by gravity — is well understood and not unique to phones. It's a genuinely mechanical effect, though it's limited to surface-level exposure, not a guarantee for every case.",
    },
  ],
  relatedTools: ["water-eject", "deep-speaker-cleaner", "frequency-sweep", "bass-test"],
  relatedPosts: [
    "how-to-get-water-out-of-phone-speaker",
    "does-rice-fix-a-wet-phone",
    "why-is-my-phone-speaker-muffled",
  ],
  publishedDate: "2026-09-28",
  updatedDate: "2026-09-28",
};

export default post;
