import { getTool, tools } from "@/data/tools";
import { deviceHubs, getDeviceHub } from "@/data/deviceHubs";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import { DEVICE_ICON_BY_SLUG } from "@/lib/deviceIcons";

export type MenuLink = { name: string; description: string; icon: string; href: string };
export type MenuColumn = { label: string; links: MenuLink[] };

function toolLink(slug: string): MenuLink {
  const tool = getTool(slug);
  if (!tool) throw new Error(`megaMenu: unknown tool slug "${slug}"`);
  return { name: tool.shortName, description: tool.primaryKeyword, icon: TOOL_ICON_BY_SLUG[slug] ?? "🎚️", href: tool.path };
}

function deviceLink(slug: string): MenuLink {
  const hub = getDeviceHub(slug);
  if (!hub) throw new Error(`megaMenu: unknown device slug "${slug}"`);
  return { name: hub.name, description: `${hub.name} speaker cleaner`, icon: DEVICE_ICON_BY_SLUG[slug] ?? "📶", href: hub.path };
}

// Every tool is placed in exactly one column here — sanity-checked against
// data/tools.ts below so the menu can never silently drop or duplicate one.
// Split into more, smaller columns rather than letting one column grow
// indefinitely as new tools ship — "Testing Tools" had swollen past a dozen
// links across earlier batches, uneven against everything next to it.
const FEATURED_SLUG = "water-eject";
const CLEANING_SLUGS = ["deep-speaker-cleaner", "earpiece-speaker-cleaner", "speaker-dust-remover", "watch-water-eject"];
const AUDIO_TESTING_SLUGS = [
  "left-right-speaker-test",
  "speaker-test",
  "bass-test",
  "headphone-test",
  "hearing-test",
  "mic-test",
  "db-meter",
  "safe-volume-calculator",
  "audio-recorder",
  "speaker-polarity-test",
  "surround-sound-test",
];
const DEVICE_SKILL_SLUGS = [
  "webcam-test",
  "keyboard-tester",
  "dead-pixel-test",
  "touch-screen-test",
  "cps-test",
  "typing-speed-test",
  "text-to-speech",
  "vibration-test",
  "camera-mic-test",
];
const GENERATOR_SLUGS = [
  "tone-generator",
  "noise-generator",
  "frequency-sweep",
  "tuner",
  "metronome",
  "bpm-counter",
  "sleep-focus-sounds",
  "virtual-piano",
];

if (process.env.NODE_ENV !== "production") {
  const placed = new Set([
    FEATURED_SLUG,
    ...CLEANING_SLUGS,
    ...AUDIO_TESTING_SLUGS,
    ...DEVICE_SKILL_SLUGS,
    ...GENERATOR_SLUGS,
  ]);
  const missing = tools.map((t) => t.slug).filter((slug) => !placed.has(slug));
  if (missing.length > 0) {
    console.warn(`megaMenu: tool(s) not placed in any column: ${missing.join(", ")}`);
  }
}

export const featuredTool = {
  ...toolLink(FEATURED_SLUG),
  description: "Remove water and dust using sound frequencies.",
};

export const audioToolsMenu: MenuColumn[] = [
  { label: "Cleaning Tools", links: CLEANING_SLUGS.map(toolLink) },
  { label: "Audio Testing", links: AUDIO_TESTING_SLUGS.map(toolLink) },
  { label: "Utilities & Skill Tests", links: DEVICE_SKILL_SLUGS.map(toolLink) },
  { label: "Music Tools", links: GENERATOR_SLUGS.map(toolLink) },
];

const PHONE_SLUGS = ["iphone", "samsung", "android"];
const COMPUTER_SLUGS = ["laptop", "macbook"];

export const devicesMenu: MenuColumn[] = [
  { label: "Phones", links: PHONE_SLUGS.map(deviceLink) },
  { label: "Computers", links: COMPUTER_SLUGS.map(deviceLink) },
  {
    label: "Accessories",
    links: [
      deviceLink("airpods"),
      // No standalone "headphones" device hub exists — the real, honest
      // equivalent is the Headphone Test tool page.
      { ...toolLink("headphone-test"), name: "Headphone Test" },
    ],
  },
  {
    label: "Popular Pages",
    links: ["iphone", "samsung", "laptop"].map((slug) => {
      const hub = getDeviceHub(slug);
      if (!hub) throw new Error(`megaMenu: unknown device slug "${slug}"`);
      return { name: `${hub.name} Speaker Cleaner`, description: hub.metaDescription, icon: DEVICE_ICON_BY_SLUG[slug] ?? "📶", href: hub.path };
    }),
  },
];

// "Resources" points at real, existing pages — mapped to the closest matching
// content rather than inventing standalone guide/FAQ pages that don't exist yet.
export const resourcesMenu: MenuColumn[] = [
  {
    label: "Guides",
    links: [
      { name: "How Water Eject Works", description: "The science behind the tone", icon: "💡", href: "/water-eject" },
      { name: "Speaker Cleaning Guide", description: "The full 3-stage program", icon: "🧽", href: "/deep-speaker-cleaner" },
      { name: "Audio Testing Guide", description: "Quick test, sweep & tones", icon: "🎚️", href: "/speaker-test" },
    ],
  },
  {
    label: "Help",
    links: [
      { name: "FAQs", description: "Answers on every tool page", icon: "❓", href: "/tools" },
      { name: "Troubleshooting", description: "Common problems & fixes", icon: "🛠️", href: "/tools" },
      { name: "Contact Support", description: "Get in touch", icon: "✉️", href: "/contact" },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About", description: "Why this site exists", icon: "🏢", href: "/about" },
      { name: "Privacy", description: "What we do and don't collect", icon: "🔒", href: "/privacy-policy" },
      { name: "Terms", description: "Terms of use", icon: "📄", href: "/terms" },
    ],
  },
];

export const allDeviceHubs = deviceHubs;
