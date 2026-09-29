// Shape for every blog post (blueprint §10 "Blog post template"). Structured
// data rather than raw MDX prose, same tradeoff already made for tool pages
// in content/tools/types.ts — the AnswerBox/TOC/FAQ/troubleshooting blocks
// are typed data the JSON-LD builders and shared content components consume
// directly, and this keeps every post shaped consistently.

export type BlogFaq = { q: string; a: string };

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type TroubleshootRow = {
  problem: string;
  cause: string;
  fix: string;
};

export type BlogPost = {
  slug: string;
  path: string;
  category: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  /** 40-60 word answer-first summary (AEO), entity named in the first sentence. */
  answer: string;
  quickFix: { label: string; href: string; blurb: string };
  /** H2 body sections, phrased as questions users ask. */
  sections: BlogSection[];
  troubleshooting?: TroubleshootRow[];
  /** Bullet warning signs — when DIY steps aren't enough. */
  repairShopSigns: string[];
  faqs: BlogFaq[];
  /** Slugs of related tools, matched against the registry in data/tools.ts. */
  relatedTools: string[];
  /** Slugs of related posts, matched against the registry in data/blog.ts. */
  relatedPosts: string[];
  publishedDate: string;
  updatedDate: string;
};
