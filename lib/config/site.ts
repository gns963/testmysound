export const siteConfig = {
  name: "TestMySound",
  shortName: "TestMySound",
  domain: "testmysound.com",
  url: "https://testmysound.com",
  tagline:
    "Free browser tools to clean, test and fix your phone, laptop and earbud audio — no app, no sign-up, works in 60 seconds.",
  description:
    "Free, no-download audio tools: eject water and dust from your phone speaker, test left/right sound, check your mic, and more — all in the browser.",
  locale: "en",
  defaultTheme: "system" as const,
  contactEmail: "hello@testmysound.com",
  social: {
    twitter: "",
    github: "",
    youtube: "",
    instagram: "",
  },
  legalName: "TestMySound",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

// Tool groupings for the header "Tools" dropdown (§7.1: grouped Clean / Test / Mic / Hearing).
// Hrefs point at routes defined in the Phase 1+ tools registry (data/tools.ts); they are
// wired up here ahead of the pages themselves so the nav shape matches §5 from day one.
export const toolNavGroups: NavGroup[] = [
  {
    label: "Clean",
    links: [
      { label: "Speaker Cleaner", href: "/" },
      { label: "Deep Speaker Cleaner", href: "/deep-speaker-cleaner" },
      { label: "Earpiece Cleaner", href: "/earpiece-speaker-cleaner" },
      { label: "Speaker Dust Remover", href: "/speaker-dust-remover" },
    ],
  },
  {
    label: "Test",
    links: [
      { label: "Left/Right Speaker Test", href: "/left-right-speaker-test" },
      { label: "Speaker Sound Test", href: "/speaker-test" },
      { label: "Headphone Test", href: "/headphone-test" },
      { label: "Bass Test", href: "/bass-test" },
      { label: "Frequency Sweep", href: "/frequency-sweep" },
    ],
  },
  {
    label: "Mic",
    links: [
      { label: "Mic Test", href: "/mic-test" },
      { label: "dB Meter", href: "/db-meter" },
    ],
  },
  {
    label: "Hearing",
    links: [
      { label: "Hearing Test", href: "/hearing-test" },
      { label: "Tone Generator", href: "/tone-generator" },
      { label: "Noise Generator", href: "/noise-generator" },
    ],
  },
];

export const footerNav: NavGroup[] = [
  {
    label: "Tools",
    links: toolNavGroups.flatMap((group) => group.links),
  },
  {
    label: "Devices",
    links: [
      { label: "iPhone", href: "/speaker-cleaner/iphone" },
      { label: "Samsung", href: "/speaker-cleaner/samsung" },
      { label: "Android", href: "/speaker-cleaner/android" },
      { label: "Laptop", href: "/speaker-cleaner/laptop" },
      { label: "MacBook", href: "/speaker-cleaner/macbook" },
      { label: "AirPods / Earbuds", href: "/speaker-cleaner/airpods" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "How We Test", href: "/how-we-test" },
      { label: "Editorial Policy", href: "/editorial-policy" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export const languages = [
  { code: "en", label: "EN", href: "/" },
  { code: "hi", label: "हिं", href: "/hi" },
] as const;
