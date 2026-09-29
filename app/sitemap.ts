import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { deviceHubs } from "@/data/deviceHubs";
import { blogPosts } from "@/data/blog";

// Single sitemap for now — only pages that actually exist and are indexable
// (blueprint §11.3: "only verified/indexable pages"); split into per-section
// sitemaps via generateSitemaps() once the combined list grows large.
const P0_TOOL_PATHS = [
  "/water-eject",
  "/deep-speaker-cleaner",
  "/earpiece-speaker-cleaner",
  "/speaker-dust-remover",
  "/left-right-speaker-test",
  "/speaker-test",
  "/mic-test",
];

const P1_TOOL_PATHS = [
  "/tone-generator",
  "/bass-test",
  "/headphone-test",
  "/db-meter",
  "/hearing-test",
  "/noise-generator",
  "/frequency-sweep",
  "/webcam-test",
  "/keyboard-tester",
  "/dead-pixel-test",
  "/touch-screen-test",
  "/tuner",
  "/metronome",
  "/bpm-counter",
  "/cps-test",
  "/typing-speed-test",
  "/sleep-focus-sounds",
  "/safe-volume-calculator",
  "/text-to-speech",
  "/audio-recorder",
  "/virtual-piano",
  "/camera-mic-test",
];

const P2_TOOL_PATHS = [
  "/vibration-test",
  "/speaker-polarity-test",
  "/surround-sound-test",
  "/watch-water-eject",
];

const TRUST_PATHS = [
  "/about",
  "/contact",
  "/how-we-test",
  "/editorial-policy",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/tools", siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/blog", siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: new URL(post.path, siteConfig.url).toString(),
      lastModified: new Date(post.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...P0_TOOL_PATHS.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...P1_TOOL_PATHS.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...P2_TOOL_PATHS.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...TRUST_PATHS.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
    ...deviceHubs.map((hub) => ({
      url: new URL(hub.path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return staticRoutes;
}
