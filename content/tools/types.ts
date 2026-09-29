// Shape for every tool page's long-form content (blueprint §8 tool page
// template + §4.5 tool registry). Kept as typed data rather than literal
// .mdx files: steps/FAQ/troubleshooting rows are structured data the JSON-LD
// builders and content components consume directly, not prose that benefits
// from markdown+JSX mixing — MDX is worth its setup cost for the blog
// (freeform prose), not here.

export type ToolFaq = { q: string; a: string };

export type ToolTip = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export type TroubleshootRow = {
  problem: string;
  cause: string;
  fix: string;
};

// Registry-facing classification (blueprint §4.5) — extend this union as new
// tool families ship rather than widening it to a plain string, so every
// engine kind stays a deliberate, typo-proof choice.
export type ToolEngine =
  | "cleaner"
  | "deepCleaner"
  | "stereo"
  | "sweep"
  | "tone"
  | "mic"
  | "db"
  | "hearing"
  | "noise"
  | "webcam"
  | "keyboard"
  | "screen"
  | "touch"
  | "tuner"
  | "metronome"
  | "bpmCounter"
  | "cps"
  | "typing"
  | "ambientSound"
  | "safeVolume"
  | "tts"
  | "recorder"
  | "vibration"
  | "polarity"
  | "surround"
  | "piano"
  | "cameraMic";

export type ToolPriority = "P0" | "P1" | "P2";

export type ToolContent = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  /** Blueprint §4.5 registry fields — optional so the original 14 tools (predating
   *  this addition) don't need backfilling; new tools should set both. */
  engine?: ToolEngine;
  priority?: ToolPriority;
  /** 40-60 word answer-first summary (AEO), entity named in the first sentence. */
  answer: string;
  howToSteps: string[];
  /** 1-3 short paragraphs, plain language. */
  howItWorks: string[];
  /** 3-4 short practical tip blocks (device-specific for cleaners, OS-specific
   *  permission/setup notes for tools that need camera/mic/keyboard access). */
  tips: ToolTip[];
  troubleshooting: TroubleshootRow[];
  /** 1-3 sentences, honest about limits. */
  safetyNote: string;
  faqs: ToolFaq[];
  /** Slugs of related tools, matched against the registry in data/tools.ts. */
  related: string[];
  /** Slugs of related blog posts, matched against data/blog.ts. Omitted when
   *  no genuinely relevant post exists yet — never padded with weak matches. */
  relatedBlogPosts?: string[];
  /** External citations for health/safety-guidance tools (e.g. NIOSH/OSHA/WHO
   *  noise-exposure standards) — only ever real, verified URLs, never guessed. */
  sources?: { label: string; href: string }[];
};
