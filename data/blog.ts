import type { BlogPost } from "@/content/blog/types";
import howToGetWaterOut from "@/content/blog/how-to-get-water-out-of-phone-speaker";
import whyMuffled from "@/content/blog/why-is-my-phone-speaker-muffled";
import cleanGrillesSafely from "@/content/blog/how-to-clean-phone-speaker-grilles-safely";
import testSpeakerDamaged from "@/content/blog/how-to-test-if-phone-speaker-is-damaged";
import howWaterEjectWorks from "@/content/blog/how-does-speaker-water-eject-work";
import riceMyth from "@/content/blog/does-rice-fix-a-wet-phone";
import oneSpeakerLouder from "@/content/blog/one-speaker-louder-than-the-other";
import speakerNotWorkingHeadphonesWork from "@/content/blog/phone-speaker-not-working-but-headphones-work";
import howToTestMic from "@/content/blog/how-to-test-your-microphone";
import howToTestHeadphones from "@/content/blog/how-to-test-headphones-properly";
import howLoudIsTooLoud from "@/content/blog/how-loud-is-too-loud-decibel-levels-explained";
import ipRatingsExplained from "@/content/blog/what-do-ip67-ip68-ratings-mean";
import howLongToDry from "@/content/blog/how-long-does-it-take-for-a-phone-speaker-to-dry";
import compressedAir from "@/content/blog/is-compressed-air-safe-for-phone-speakers";
import mutedDuringCalls from "@/content/blog/phone-speaker-muffled-only-during-calls";
import hearingRange from "@/content/blog/hearing-range-by-age-explained";
import phoneFrequencies from "@/content/blog/what-frequencies-can-phone-speakers-play";
import testBass from "@/content/blog/how-to-test-bass-on-speakers-and-headphones";
import crackling from "@/content/blog/phone-speaker-crackling-at-high-volume";
import watchWaterLock from "@/content/blog/how-apple-watch-water-lock-works";
import monoVsStereo from "@/content/blog/mono-vs-stereo-phone-speakers";

// Registry aggregated from content/blog/*.ts — what the blog index, post
// pages and RelatedPosts all read from, same pattern as data/tools.ts.
export const blogPosts: BlogPost[] = [
  howToGetWaterOut,
  whyMuffled,
  cleanGrillesSafely,
  testSpeakerDamaged,
  howWaterEjectWorks,
  riceMyth,
  oneSpeakerLouder,
  speakerNotWorkingHeadphonesWork,
  howToTestMic,
  howToTestHeadphones,
  howLoudIsTooLoud,
  ipRatingsExplained,
  howLongToDry,
  compressedAir,
  mutedDuringCalls,
  hearingRange,
  phoneFrequencies,
  testBass,
  crackling,
  watchWaterLock,
  monoVsStereo,
];

const postsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export function getPost(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}
