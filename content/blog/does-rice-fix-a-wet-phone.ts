import type { BlogPost } from "@/content/blog/types";

const post: BlogPost = {
  slug: "does-rice-fix-a-wet-phone",
  path: "/blog/does-rice-fix-a-wet-phone",
  category: "Water Damage",
  title: "Does Putting a Phone in Rice Actually Work? What to Do Instead",
  primaryKeyword: "does rice fix a wet phone",
  secondaryKeywords: ["phone in rice myth", "wet phone what to do", "phone dropped in water"],
  metaTitle: "Does Rice Fix a Wet Phone? The Truth, Plus What Works",
  metaDescription:
    "Putting a wet phone in rice is a popular myth. Here's why it doesn't really work, and the steps that actually help after a splash or dunk.",
  answer:
    "No — putting a wet phone in rice doesn't meaningfully speed up drying, and rice grains can get stuck in the charging port or speaker grille. Rice absorbs moisture too slowly and inconsistently to out-perform simply leaving the phone in open air. The better first steps are: power it off, don't charge it, dry the surface, and let it air-dry speaker-down for a few hours.",
  quickFix: {
    label: "Check your speaker once it's dry",
    href: "/",
    blurb:
      "Once the phone has had time to air-dry, a quick water-eject cycle can help clear any water still sitting on the grille.",
  },
  sections: [
    {
      heading: "Where the rice myth actually comes from",
      paragraphs: [
        "The idea likely spread from rice's use as a cheap desiccant in food storage and small household fixes — it does absorb some ambient moisture over long periods. The leap to \"seal a wet phone in a bag of rice\" assumes that effect is fast and strong enough to matter for electronics. It isn't.",
        "Rice absorbs moisture slowly, works better on humidity in the air than on liquid already inside a device, and has no way to reach water that's settled in a sealed compartment near the speaker or charging port.",
      ],
    },
    {
      heading: "Why rice doesn't outperform just leaving it out",
      paragraphs: [
        "Repeated informal testing by tech outlets and repair communities has found that phones left in open air dry at a similar rate to phones packed in rice — sometimes faster, since open air allows better evaporation than a phone buried in grains. Rice mainly adds risk without adding benefit.",
        "The real risk: rice dust and small grain fragments can lodge in the speaker grille or charging port, creating a new blockage that then needs its own cleanup.",
      ],
    },
    {
      heading: "What actually helps in the first few minutes",
      paragraphs: [
        "Power the phone off if it's still on, and don't plug it in to charge — this is the single highest-risk action after a splash, since it introduces current to whatever moisture is present. Wipe the outside dry with a soft cloth, including around ports, buttons, and the speaker grille.",
        "If the phone has a SIM tray or removable back and you're comfortable doing so, open it to let trapped moisture evaporate faster. Skip this step if you're not confident doing it safely.",
      ],
    },
    {
      heading: "The next few hours: patience beats intervention",
      paragraphs: [
        "Leave the phone speaker-down, or however its main ports face, on a dry towel in a room-temperature, well-ventilated space. Skip the hair dryer, oven, microwave, or direct sunlight — heat can damage the battery, warp plastic components, or push moisture further inward instead of out.",
        "A silica gel packet, the kind that comes in shoe boxes or vitamin bottles, placed near the phone rather than buried like rice, is a better desiccant if you want to use one at all — just don't seal the phone in an airtight container with it.",
      ],
    },
    {
      heading: "Once it's dry: check the speaker specifically",
      paragraphs: [
        "Powering the phone back on isn't the same test as checking whether sound is still muffled. If the speaker sounds off after drying, that's usually leftover surface water on the grille rather than internal damage — a pulsed-tone tool or a bit more drying time typically clears it.",
        "If sound doesn't improve, or the phone won't power on at all after adequate drying time, that's the point to stop DIY troubleshooting.",
      ],
    },
  ],
  troubleshooting: [
    {
      problem: "Phone smells musty after drying",
      cause: "Trapped moisture in seals or ports that hasn't fully evaporated.",
      fix: "Give it more open-air drying time before assuming it's dry.",
    },
    {
      problem: "Rice grains or dust are visible near the ports",
      cause: "A common side effect of the rice method itself.",
      fix: "Gently brush debris away; don't use compressed air to blow it further in.",
    },
    {
      problem: "Phone powers on but touchscreen is unresponsive",
      cause: "Moisture between the screen and digitizer, separate from the speaker issue.",
      fix: "Let it dry longer; this isn't something a speaker tool addresses.",
    },
  ],
  repairShopSigns: [
    "The phone was submerged for more than a few seconds, not just splashed.",
    "It won't power on at all after a full day of proper air-drying.",
    "You see corrosion, discoloration, or a burning smell.",
    "The battery appears swollen or the back cover is bulging.",
  ],
  faqs: [
    {
      q: "Is there any scenario where rice helps at all?",
      a: "It might absorb a small amount of ambient humidity over a very long period, but it doesn't out-perform simply leaving the phone in open air, and it carries a real risk of grain debris in ports.",
    },
    {
      q: "What should I actually put a wet phone in, if anything?",
      a: "Nothing airtight. Open air on a dry towel works as well as most alternatives; a silica gel packet placed nearby, not burying the phone, is a reasonable, low-risk option.",
    },
    {
      q: "How soon can I charge my phone after it gets wet?",
      a: "Only once you're confident it's fully dry — typically several hours of open-air drying at minimum, longer for a dunk versus a light splash. When in doubt, wait longer.",
    },
    {
      q: "My phone is water resistant — does the rice myth still apply?",
      a: "Yes — water resistance ratings cover specific lab conditions, not unlimited exposure. If water is visibly present or sound is muffled, the same drying advice applies regardless of the rating.",
    },
    {
      q: "Does turning the phone on right away make things worse?",
      a: "Powering on isn't as risky as charging, but if the phone was properly wet, waiting until it's dry avoids any small risk of a short circuit if moisture reached internal components.",
    },
  ],
  relatedTools: ["water-eject", "deep-speaker-cleaner"],
  relatedPosts: [
    "how-to-get-water-out-of-phone-speaker",
    "how-does-speaker-water-eject-work",
    "why-is-my-phone-speaker-muffled",
    "what-do-ip67-ip68-ratings-mean",
  ],
  publishedDate: "2026-09-28",
  updatedDate: "2026-09-28",
};

export default post;
