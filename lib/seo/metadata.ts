import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

type BuildMetadataParams = {
  /** Page title, without the brand suffix — this function appends " | {{BRAND}}". */
  title: string;
  /** ≤155 chars: action + benefit + "free, no app" per blueprint §8. */
  description: string;
  /** Canonical path starting with "/", e.g. "/mic-test". */
  path: string;
  /** Path to an OG image; defaults to the auto-generated per-page image route. */
  ogImage?: string;
  noIndex?: boolean;
};

// Shared builder so every page gets a unique title/meta/canonical (blueprint §11.2/§11.3)
// without hand-rolling the same object each time.
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: BuildMetadataParams): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
