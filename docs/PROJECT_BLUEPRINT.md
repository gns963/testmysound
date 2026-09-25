# Speaker Cleaner & Audio Tools Website — Project Blueprint

> Master spec for building the site with Claude Code (CLI). Put this file at the repo root as `docs/PROJECT_BLUEPRINT.md` and reference it from `CLAUDE.md` (starter at the end of this file).
>
> Competitor benchmark: phonespeakercleaner.com (live ~June 2026, WordPress + Elementor, ~22 pages + 11 blogs, no new blogs since July, expanding into "test" pages).

---

## 0. Table of Contents

1. Project goals & positioning
2. Brand & domain
3. Tech stack & architecture
4. Tools strategy (specs for every tool)
5. Site architecture & full page list
6. Design system
7. Homepage design (section by section)
8. Tool page template
9. Programmatic device/brand pages
10. Blog strategy & full topic list
11. SEO strategy
12. AEO (Answer Engine Optimization) strategy
13. Monetization
14. Analytics & tracking
15. Legal, trust & safety
16. Build phases & CLI task list
17. KPIs & review cadence
18. `CLAUDE.md` starter

---

## 1. Project Goals & Positioning

**Goal:** Become the fastest, cleanest, most trustworthy free "audio fix & test" toolkit on the web — starting with speaker water/dust ejection, then expanding into speaker, mic, headphone and hearing tools.

**Positioning statement:**
"Free browser tools to clean, test and fix your phone, laptop and earbud audio — no app, no sign-up, works in 60 seconds."

**How we beat the competitor:**

| Area | Competitor | Us |
|---|---|---|
| Stack | WordPress + Elementor (heavy) | Next.js static, <100 KB JS on tool pages |
| Tools | Cleaner + a few tests | 15–20 real tools in one cluster |
| Brands | iPhone 11–13, Samsung, Oppo | All India top-sellers + iPhone 11–17 + Pixel |
| Language | English only | English + Hindi (`/hi/`) |
| Content | Templated, generic claims ("100% satisfaction") | Honest claims, device-specific data, own testing |
| AEO | None visible | Answer-first blocks, llms.txt, structured data everywhere |
| UX | Tool mixed with long content | Tool above the fold, thumb-friendly, runs full-screen |

**Audience:**
- Primary: someone whose phone just got wet / sounds muffled, on mobile, in a hurry (high intent, 60 sec session).
- Secondary: people testing speakers, headphones, mics (desktop + mobile).
- Geography: English global (higher ad RPM: US/UK/CA/AU) + India (volume, Hindi, Indian brands).

---

## 2. Brand & Domain

Use a **broad, brandable** name so mic/headphone/hearing tools fit later. Avoid "phone speaker cleaner" style exact-match names — they lock the site into one tool.

Candidate names (check domain + trademark availability before deciding):
- SoundFixer
- AudioRescue
- ClearSpeaker
- SpeakerDoc
- TuneCheck
- EjectWater (more keyword-y, narrower)

Placeholder used below: `{{BRAND}}` and `{{DOMAIN}}`.

**Brand voice:** calm, practical, honest. "Here's what works, here's what doesn't, here's when to see a repair shop." No hype, no fake stats.

---

## 3. Tech Stack & Architecture

### Stack
- **Framework:** Next.js (App Router), mostly static (`generateStaticParams` for all programmatic pages).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Content:** MDX for blogs and long-form page content (`content/` folder), JSON/TS data files for devices and tools.
- **Hosting:** Vercel or Cloudflare Pages.
- **Audio:** Web Audio API only (no audio libraries needed).
- **Fonts:** One variable font, self-hosted via `next/font` (e.g., Inter or Geist) + Noto Sans Devanagari for Hindi.
- **Images:** `next/image`, WebP/AVIF, SVG illustrations preferred over photos.
- **Analytics:** GA4 (or Plausible) + Google Search Console + Bing Webmaster Tools.

### Folder structure

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                         # Homepage (Speaker Cleaner tool)
│   ├── [tool]/page.tsx                  # Generic tool pages (from tools registry)
│   ├── [tool]/[device]/page.tsx         # Programmatic device pages (e.g. /speaker-cleaner/iphone-15)
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── hi/...                           # Hindi mirror (Phase 2)
│   ├── about/ contact/ privacy-policy/ terms/ disclaimer/ editorial-policy/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── llms.txt/route.ts
├── components/
│   ├── tools/                           # One component per tool engine
│   │   ├── SpeakerCleaner.tsx
│   │   ├── StereoTest.tsx
│   │   ├── ToneGenerator.tsx
│   │   ├── MicTest.tsx
│   │   ├── DbMeter.tsx
│   │   ├── HearingTest.tsx
│   │   └── ...
│   ├── layout/ (Header, Footer, Breadcrumbs, ToolShell)
│   ├── content/ (AnswerBox, StepList, FAQ, DeviceSpecCard, RelatedTools, Callout)
│   └── ads/ (AdSlot)
├── lib/
│   ├── audio/                           # Shared audio engine (context, oscillators, sweeps, safety limits)
│   ├── seo/                             # metadata builders, JSON-LD builders
│   └── analytics.ts
├── data/
│   ├── tools.ts                         # Tool registry (slug, name, engine, presets, content refs)
│   ├── devices.ts                       # Device registry (brand, model, speaker layout, verified facts)
│   └── brands.ts
├── content/
│   ├── tools/*.mdx                      # Long-form content for each tool page
│   ├── devices/*.mdx                    # Unique notes per device page
│   └── blog/*.mdx
└── public/
```

### Performance budgets (hard rules)
- LCP < 1.8 s on mid-range Android over 4G.
- CLS < 0.05 (reserve space for ads!).
- INP < 150 ms.
- Tool page JS < 100 KB gzipped (excluding ads).
- No layout shift when tool starts/stops.

---

## 4. Tools Strategy

### 4.1 Shared audio engine (`lib/audio/`)

Every tool reuses one engine:

- `getAudioContext()` — lazy-create a single `AudioContext` only on user gesture (required on iOS/Chrome autoplay rules).
- `playTone({ freq, type, gain, duration })`
- `playSweep({ from, to, duration, loop })` — exponential ramp via `frequency.exponentialRampToValueAtTime`.
- `playPulse({ freq, onMs, offMs, duration })` — gain automation for pulsing.
- `stopAll()` — ramp gain to 0 over 50 ms before stopping (avoids clicks/pops).
- **Safety limiter:** master `GainNode` capped (e.g., 0.8) + `DynamicsCompressorNode`; hard max session duration per tool (e.g., 120 s), then auto-stop and ask the user to confirm another cycle.
- **iOS handling:**
  - iPhone's ring/silent switch can mute Web Audio. Where supported, set `navigator.audioSession.type = 'playback'` (Safari 16.4+).
  - Fallback: render the tone to a WAV `Blob` via `OfflineAudioContext` and play it through an `<audio>` element.
  - Always show an on-screen hint: "Turn off Silent mode and set volume to max."
- **Vibration:** `navigator.vibrate()` works on most Android browsers, not on iOS. Feature-detect and hide the "Vibrate" mode when unsupported instead of showing a broken button.
- **Wake lock:** `navigator.wakeLock.request('screen')` during a session so the screen doesn't sleep mid-cycle.
- **Media Session API:** optional, lets the tone keep playing if the user switches tabs briefly.

### 4.2 Tool list, priorities and specs

Priority: **P0** = launch, **P1** = month 1–2, **P2** = month 3+.

| # | Tool | Slug | Priority | Engine |
|---|---|---|---|---|
| 1 | Speaker Cleaner (Water Eject) | `/` + `/water-eject` | P0 | tone + pulse |
| 2 | Deep Speaker Cleaner | `/deep-speaker-cleaner` | P0 | sweep + pulse |
| 3 | Earpiece / Call Speaker Cleaner | `/earpiece-speaker-cleaner` | P0 | low-gain tone |
| 4 | Dust Remover mode | `/speaker-dust-remover` | P0 | higher-freq sweep |
| 5 | Left/Right Speaker Test | `/left-right-speaker-test` | P0 | StereoPannerNode |
| 6 | Speaker Sound Test | `/speaker-test` | P0 | sweep 20 Hz–20 kHz |
| 7 | Mic Test | `/mic-test` | P0 | getUserMedia + analyser |
| 8 | Tone Generator | `/tone-generator` | P1 | oscillator (all waves) |
| 9 | Bass / Subwoofer Test | `/bass-test` | P1 | low sweep 20–200 Hz |
| 10 | Headphone Test | `/headphone-test` | P1 | stereo + sweep + phase |
| 11 | Sound Level Meter (dB) | `/db-meter` | P1 | mic RMS → dB |
| 12 | Hearing Test / Hearing Age | `/hearing-test` | P1 | high-freq ladder |
| 13 | White / Pink / Brown Noise | `/noise-generator` | P1 | noise buffers |
| 14 | Frequency Sweep Generator | `/frequency-sweep` | P1 | sweep |
| 15 | Mic Cleaner (honest version) | `/mic-cleaner` | P2 | tone + guidance |
| 16 | Audio Latency Test (Bluetooth) | `/bluetooth-latency-test` | P2 | tap-sync test |
| 17 | Vibration Test | `/vibration-test` | P2 | navigator.vibrate |
| 18 | Surround Sound Test (5.1/7.1) | `/surround-sound-test` | P2 | multichannel |
| 19 | Phase / Polarity Test | `/speaker-polarity-test` | P2 | inverted channels |
| 20 | Smartwatch Water Eject | `/watch-water-eject` | P2 | tone |

### 4.3 Detailed specs (P0 tools)

#### Tool 1 — Speaker Cleaner (Water Eject)
- **Modes:** `Water` (default), `Dust`, `Vibrate` (Android only).
- **Water mode:** 165 Hz sine, pulsed (e.g., 1.5 s on / 0.3 s off), ~60 s total. Optional "Intense" preset: square wave at lower gain.
- **Dust mode:** sweep 200 → 1000 Hz, repeating, 60 s.
- **UI:** giant circular Start button, live circular progress (0–100%), countdown timer, animated water droplets/waveform, Stop button always visible.
- **Before start:** 3-item checklist (volume max, silent off, speaker facing down).
- **After finish:** "Did it help?" Yes/No buttons (analytics + social proof counter), "Run again" button, "Still muffled? Try Deep Clean" link.
- **Safety:** max 3 back-to-back cycles, then a 60 s cooldown message.

#### Tool 2 — Deep Speaker Cleaner
- 3-stage program: Stage 1 = 165 Hz pulse (30 s), Stage 2 = sweep 100→500 Hz (30 s), Stage 3 = 165 Hz steady (30 s).
- Stage indicator UI ("Stage 2 of 3: Loosening").

#### Tool 3 — Earpiece / Call Speaker Cleaner
- Lower gain (the earpiece speaker is smaller and quieter), instructions to hold the phone upside-down with the earpiece facing the floor.
- Note: browsers play through the main loudspeaker by default, not the earpiece. **State this honestly** on the page and give the manual method (hold the phone close, max media volume, tap gently). Don't claim the browser can route to the earpiece.

#### Tool 5 — Left/Right Speaker Test
- Buttons: Left, Center, Right, Alternate (auto L↔R every 1 s).
- Visual: phone/laptop/headphone illustration with the active side highlighted.
- Result helper: "Only one side plays?" → links to troubleshooting blog.

#### Tool 6 — Speaker Sound Test
- Presets: Quick test (voice sample + tone), Full sweep (20 Hz–20 kHz, 20 s), Individual frequencies (chips: 50, 100, 250, 500, 1k, 4k, 8k, 12k, 16k Hz).
- Live frequency readout during the sweep; user clicks "I stopped hearing it" → shows their device/hearing range.

#### Tool 7 — Mic Test
- `getUserMedia({ audio: true })`, live waveform + level bar, record 5 s and play back.
- Device picker (`enumerateDevices`) for laptops with multiple mics.
- **Privacy notice:** "Your audio never leaves your device." (Must be true — no uploads.)
- Error states: permission denied, no mic found, mic in use — each with fix instructions per browser.

### 4.4 Specs (P1 tools, short)
- **Tone Generator:** 1–22,000 Hz input + slider + fine ±1 Hz buttons, waveform select (sine/square/sawtooth/triangle), volume, balance, shareable URL params (`?f=440&w=sine`).
- **Bass Test:** 20–200 Hz sweep + fixed chips (30/40/50/60/80/100 Hz). Warn about low volume start.
- **Headphone Test:** L/R, sweep, bass, and an "in-phase vs out-of-phase" check (wiring test).
- **dB Meter:** RMS from the analyser → dBFS → approximate dB SPL with an offset. **Label clearly as an approximation** (phone mics aren't calibrated). Show min/avg/max, a noise-level reference chart (whisper, conversation, traffic).
- **Hearing Test:** ascending tones 8k → 20k Hz, user taps when they can't hear; show the typical "hearing age" range with a **not a medical test** disclaimer and a suggestion to see an audiologist for concerns.
- **Noise Generator:** white/pink/brown, timer, volume. Doubles as a sleep/focus tool (extra traffic).

### 4.5 Tool registry (`data/tools.ts`) shape

```ts
export type Tool = {
  slug: string;               // 'left-right-speaker-test'
  name: string;               // 'Left and Right Speaker Test'
  shortName: string;
  engine: 'cleaner' | 'deepCleaner' | 'stereo' | 'sweep' | 'tone' | 'mic' | 'db' | 'hearing' | 'noise';
  presets?: Record<string, unknown>;
  primaryKeyword: string;
  secondaryKeywords: string[];
  answer: string;             // 40–60 word answer-first summary (AEO)
  faqs: { q: string; a: string }[];
  related: string[];          // slugs
  supportsDevicePages: boolean;
  priority: 'P0' | 'P1' | 'P2';
};
```

---

## 5. Site Architecture & Full Page List

### URL rules
- Lowercase, hyphenated, no dates, no trailing IDs.
- Tool pages at root: `/{tool-slug}`.
- Device pages nested: `/{tool-slug}/{device-slug}` (e.g., `/speaker-cleaner/iphone-15`).
- Blog: `/blog/{slug}`.
- Hindi: `/hi/...` mirror with hreflang.

### Page inventory

**Core (P0)**
- `/` — Speaker Cleaner (homepage = main tool)
- `/water-eject`
- `/deep-speaker-cleaner`
- `/earpiece-speaker-cleaner`
- `/speaker-dust-remover`
- `/left-right-speaker-test`
- `/speaker-test`
- `/mic-test`
- `/tools` — all tools hub
- `/blog`
- `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, `/editorial-policy`, `/how-we-test`

**Device-type hubs (P0/P1)**
- `/speaker-cleaner/iphone`, `/speaker-cleaner/android`, `/speaker-cleaner/laptop`, `/speaker-cleaner/macbook`, `/speaker-cleaner/tablet`, `/speaker-cleaner/ipad`, `/speaker-cleaner/airpods`, `/speaker-cleaner/earbuds`, `/speaker-cleaner/smartwatch`, `/speaker-cleaner/bluetooth-speaker`

**Brand hubs (P1)**
- `/speaker-cleaner/samsung`, `/redmi`, `/xiaomi`, `/poco`, `/vivo`, `/oppo`, `/realme`, `/oneplus`, `/iqoo`, `/motorola`, `/google-pixel`, `/nothing`, `/infinix`, `/tecno`, `/lava`

**Model pages (P1–P2, programmatic)**
- iPhone: 11, 11 Pro, 11 Pro Max, 12, 12 mini, 12 Pro, 12 Pro Max, 13 series, 14 series, 15 series, 16 series, 17 series, SE (2nd/3rd gen)
- Samsung: Galaxy S21–S26 series, A-series top sellers (A15, A16, A25, A35, A55...), M-series top sellers
- Top 5–10 selling models each for Redmi, Vivo, Oppo, Realme, OnePlus, Pixel
- Laptops: MacBook Air / Pro, HP, Dell, Lenovo, Asus (brand-level, not model-level, at first)

Rule: **only publish a model page when it has verified, unique data** (see §9). Better 60 strong pages than 400 thin ones.

**Other tool pages (P1–P2)** — from §4.2 list.

**Hindi (Phase 2)**
- `/hi/` (speaker saaf karne ka tool), `/hi/water-eject`, `/hi/mic-test`, `/hi/speaker-test` + top 10 Hindi blogs.

**Estimated total by month 3:** ~20 tool pages + ~15 hubs + ~60 device pages + ~40 blogs + legal/trust ≈ 140 URLs.

---

## 6. Design System

### Principles
1. **Tool first.** The tool must be fully visible and usable above the fold on a 360×740 phone.
2. **Thumb zone.** Primary action in the lower-middle area on mobile.
3. **Calm + trustworthy,** not gimmicky. Water/sound motifs, not flashy gradients everywhere.
4. **Fast.** CSS animations over JS; SVG over images.

### Color tokens (light / dark)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F7FAFC` | `#0B1220` | page background |
| `--surface` | `#FFFFFF` | `#111A2E` | cards |
| `--text` | `#0F172A` | `#E6EDF7` | body text |
| `--muted` | `#5B6B82` | `#93A4BD` | secondary text |
| `--primary` | `#0EA5E9` | `#38BDF8` | Start button, links (water blue) |
| `--primary-strong` | `#0369A1` | `#7DD3FC` | hover, focus |
| `--accent` | `#14B8A6` | `#2DD4BF` | success, progress |
| `--warn` | `#F59E0B` | `#FBBF24` | cautions |
| `--danger` | `#E11D48` | `#FB7185` | stop, errors |
| `--border` | `#E2E8F0` | `#1E2A44` | dividers |

Support `prefers-color-scheme` + manual toggle. Check contrast ≥ 4.5:1 for all text.

### Typography
- Font: Inter (or Geist) variable; Hindi: Noto Sans Devanagari.
- Scale (mobile → desktop): H1 28→44, H2 22→30, H3 18→22, body 16→17, small 14.
- Line height 1.6 for body, max line length ~70ch.

### Spacing & shape
- 4 px base grid; section padding 48 px mobile / 96 px desktop.
- Radius: 12 px cards, full-round for the Start button.
- Shadows: soft, single level; no heavy glassmorphism.

### Core components
- `ToolShell` — tool container with title, mode tabs, start/stop, progress, hint row.
- `BigStartButton` — 180–220 px circle, ripple animation while running, `aria-pressed`.
- `ProgressRing` — SVG ring, percent + seconds left.
- `ModeTabs` — segmented control (Water / Dust / Vibrate).
- `ChecklistPreflight` — 3 quick checks before start.
- `AnswerBox` — highlighted 40–60 word answer (AEO).
- `StepList` — numbered how-to steps with icons.
- `DeviceSpecCard` — speaker positions, IP rating, notes.
- `FAQ` — accordion, schema-backed.
- `RelatedTools` — grid of 4–6 tool cards.
- `Callout` — info / warning / "when to see a repair shop".
- `AdSlot` — fixed-height reserved box (no CLS).
- `Breadcrumbs`, `TOC` (blogs), `AuthorBox`, `UpdatedDate`.

### Accessibility
- Keyboard: Space/Enter starts/stops; Esc stops.
- Visible focus rings; `aria-live="polite"` for timer/progress updates.
- Respect `prefers-reduced-motion` (disable ripples/droplets).
- Never auto-play sound.

---

## 7. Homepage Design (Section by Section)

The homepage **is** the Speaker Cleaner tool — the main keyword page.

1. **Header (sticky, slim):** logo, "Tools" dropdown (grouped: Clean / Test / Mic / Hearing), Blog, language switch (EN/हिं), dark-mode toggle. Mobile: hamburger + a visible "All tools" chip.
2. **Hero + Tool (above the fold):**
   - H1: "Speaker Cleaner — Eject Water & Dust From Your Phone Speaker"
   - One-line subtitle: "Free. No app. Works on iPhone, Android and laptops in about 60 seconds."
   - Mode tabs → Big Start button → progress ring → hint row ("🔊 Volume max · 🔕 Silent off · ⬇️ Speaker facing down").
   - Link under the tool: "Still muffled? Try Deep Clean →"
3. **Trust strip:** "No download · Works offline after load · Audio never leaves your device · Updated {{month year}}". No fake counters. Show the real "Did it help?" yes-rate only after enough real data.
4. **AnswerBox:** "What is a speaker cleaner?" (40–60 words, answer-first).
5. **How to use (StepList, 4–5 steps)** with small illustrations.
6. **Choose your device (grid):** iPhone, Samsung, Android, Laptop, MacBook, iPad/Tablet, AirPods/Earbuds, Smartwatch → device hubs.
7. **More free audio tools (grid):** L/R test, Speaker test, Mic test, Tone generator, dB meter, Hearing test.
8. **How it works (science, short):** why ~165 Hz, how vibration moves water, limits of the method. One simple SVG diagram.
9. **Water vs dust vs damage — what to do:** 3-column comparison; includes a "When to see a repair shop" callout (distortion after drying, no sound at all, corrosion signs).
10. **Don'ts:** no rice (explain why), no hair dryer on heat, no poking with pins, don't charge while wet.
11. **Latest guides (blog cards, 3–6).**
12. **FAQ (8–12 questions).**
13. **Footer:** tools by category, device hubs, blog, about/contact/editorial policy/how we test/privacy/terms/disclaimer, language switch, social links.

**Ad placement (homepage):** none above or immediately around the Start button. First ad slot after section 5; then one mid-content and one before the FAQ. All slots have reserved height.

---

## 8. Tool Page Template

Every tool page follows this order (content from `data/tools.ts` + `content/tools/{slug}.mdx`):

1. Breadcrumbs
2. H1 (primary keyword, natural) + 1-line subtitle
3. **Tool** (above the fold)
4. Post-run helper (result explanation, "run again", next-best tool)
5. **AnswerBox** — "What is {tool}?" 40–60 words
6. **How to use** — numbered steps (5–7)
7. **How it works** — plain-language explanation + diagram
8. **Device-specific tips** — short blocks for iPhone / Android / Laptop, each linking to hubs
9. **Troubleshooting table** — Problem → Likely cause → Fix
10. **Safety & limitations** callout (honest)
11. **Related tools** grid
12. **Related guides** (3 blog links)
13. **FAQ** (6–10, schema)
14. Author/reviewer box + "Last updated" date + "How we test" link

**Word count guide:** 900–1,500 words below the tool. Quality over length.

**Metadata template:**
- Title: `{Tool Name} — {Main benefit} (Free, Online) | {{BRAND}}` (≤ 60 chars where possible)
- Meta description: action + benefit + "free, no app" (≤ 155 chars)
- OG image: auto-generated per page with `next/og` (tool name + icon).

---

## 9. Programmatic Device / Brand Pages

### Why they matter
The competitor's device pages are near-identical templates. We win by making each page **genuinely useful for that exact device**.

### Device data model (`data/devices.ts`)

```ts
export type Device = {
  slug: string;                 // 'iphone-15'
  brand: string;                // 'Apple'
  model: string;                // 'iPhone 15'
  type: 'phone' | 'tablet' | 'laptop' | 'earbuds' | 'watch' | 'speaker';
  releaseYear: number;
  speakerLayout: string;        // e.g. 'Stereo: bottom grille + earpiece'
  ipRating?: string;            // only if verified
  waterNotes?: string;          // manufacturer guidance, paraphrased
  commonIssues: string[];
  builtInWaterEject?: string;   // e.g. Apple Watch Water Lock; state accurately
  sources: string[];            // official spec page URLs used to verify
  verified: boolean;            // page only builds when true
};
```

**Rule for Claude Code:** never invent device specs. Every factual field must come from the official manufacturer spec/support page listed in `sources`. If a spec can't be verified, leave it out. Pages with `verified: false` are excluded from `generateStaticParams` and the sitemap.

### Device page template
1. H1: "{Model} Speaker Cleaner — Remove Water & Dust"
2. Tool (pre-set for that device type: phone/laptop/earbuds)
3. `DeviceSpecCard`: speaker layout, IP rating, release year
4. "Where are the speakers on the {Model}?" (with simple SVG outline, not copied product photos)
5. Device-specific steps (e.g., the earpiece doubles as the second stereo speaker on many iPhones → clean both)
6. Manufacturer guidance on water exposure (paraphrased + linked)
7. Common speaker issues for this model + fixes
8. "When to go to service" + official service link
9. Related: sibling models, brand hub, L/R speaker test
10. FAQ (4–6, device-specific)

**Uniqueness checklist per page:** ≥ 3 device-specific facts, ≥ 1 device-specific FAQ, unique intro paragraph, unique meta. If a page can't meet this, merge it into the brand hub instead.

---

## 10. Blog Strategy

### Role of the blog
1. Catch **problem searches** ("phone speaker muffled") and funnel to tools.
2. Build **topical authority** so tool pages rank.
3. Host **affiliate** content.
4. Feed **AEO**: clear answers AI engines can cite.

### Clusters & topics (initial 60)

**Cluster A — Water damage (pillar: "What to do if your phone gets wet")**
1. What to do immediately after dropping your phone in water
2. Does putting a phone in rice work? (no — explain why)
3. How to get water out of a phone speaker (pillar-linked to tool)
4. How to get water out of the charging port
5. "Liquid detected in Lightning/USB-C connector" — what it means and what to do
6. Phone speaker muffled after rain / shower / pool
7. How long does it take for a phone speaker to dry?
8. Is my phone water damaged? Signs to check
9. Does water damage void a phone warranty?
10. Saltwater vs freshwater damage on phones
11. What IP67 and IP68 actually mean
12. Can you use a hair dryer to dry a phone? (safe vs unsafe)

**Cluster B — Muffled / low sound**
13. Why is my phone speaker muffled? (all causes)
14. Phone speaker muffled only during calls
15. How to make your phone speaker louder (settings + cleaning)
16. Phone speaker crackling at high volume
17. One speaker louder than the other
18. Phone speaker not working but headphones work
19. iPhone speaker sounds muffled — fixes
20. Samsung speaker low volume — fixes
21. Redmi / Xiaomi speaker problems — fixes
22. Laptop speakers muffled — fixes (Windows + Mac)

**Cluster C — Cleaning (physical)**
23. How to clean phone speaker grilles safely (tools list)
24. How to clean iPhone speakers without damage
25. How to clean AirPods speakers and mesh
26. How to clean earbuds (all brands)
27. How to clean laptop speakers
28. How to clean a phone's earpiece speaker
29. Is compressed air safe for phone speakers?
30. Isopropyl alcohol on speaker grilles — when it's OK

**Cluster D — Testing**
31. How to test if your phone speaker is damaged
32. How to test left and right speakers
33. How to test your microphone on Windows / Mac / Android / iPhone
34. How to test headphones properly
35. What frequencies can phone speakers play?
36. Hearing range by age — explained
37. How loud is too loud? dB levels explained

**Cluster E — Science / explainers (AEO magnets)**
38. How does speaker water eject work? (165 Hz explained)
39. Does sound actually push water out? What the method can and can't do
40. How Apple Watch Water Lock works
41. How phone speakers work (driver, diaphragm, grille)
42. Mono vs stereo phone speakers

**Cluster F — Comparisons & affiliate**
43. Best speaker cleaning kits for phones
44. Best waterproof phone pouches
45. Best budget earbuds (India)
46. Best waterproof Bluetooth speakers
47. Speaker cleaner apps vs online tools

**Cluster G — Device-specific troubleshooting (long tail)**
48–60. "{Brand/Model} speaker not working after water" for top models (iPhone 13/14/15, Galaxy S23/S24, Redmi Note, Vivo Y, Realme Narzo, OnePlus Nord, etc.)

**Hindi set (Phase 2, top 10):** phone mein paani chala gaya kya karein, speaker ki awaaz kam ho gayi, speaker saaf kaise karein, mic kaam nahi kar raha, earbuds saaf kaise karein, etc.

### Blog post template
1. H1 (question or problem phrasing)
2. **AnswerBox** (40–60 words, direct answer)
3. Quick-fix box with a CTA to the relevant tool (embedded mini-tool or button)
4. TOC
5. Body with H2s phrased as questions users ask
6. Troubleshooting table
7. "When to see a repair shop"
8. FAQ (4–6)
9. Sources (manufacturer support pages, standards bodies)
10. Author box + updated date

### Content rules (quality)
- Every post answers the core question in the first 60 words.
- No invented statistics or fake testimonials. Cite manufacturer pages for device claims.
- Own testing where possible: record a real before/after test (e.g., wet a test phone's grille, run the tool, film it). This is the strongest E-E-A-T and differentiation asset.
- AI can draft, a human edits: check facts, add experience, remove fluff.
- Publishing cadence: 3–4 posts/week for the first 8 weeks, then 2/week + monthly refresh of top 20 pages.

---

## 11. SEO Strategy

### 11.1 Keyword architecture
- **Head (homepage):** speaker cleaner, phone speaker cleaner, water eject, fix my speaker.
- **Tool heads:** left right speaker test, speaker test, mic test, tone generator, db meter, hearing test, bass test, headphone test.
- **Device modifiers:** {brand/model} speaker cleaner, {model} water eject.
- **Problem long-tail:** blogs in §10.
- **Hindi:** Devanagari + Hinglish variants.

Keyword research workflow: Google Search Console (post-launch), Google autocomplete + "People also ask", Ahrefs/Semrush free tools, competitor sitemaps. Map one primary keyword per URL in a `keyword-map.csv` to avoid cannibalization.

### 11.2 On-page
- One H1 per page; primary keyword in H1, title, first paragraph, URL.
- Descriptive H2s phrased as user questions.
- Internal links: every page links to ≥ 3 related pages; hubs link to all children; children link back to hub + siblings.
- Descriptive anchor text (not "click here").
- Image alt text describing the image, not keyword stuffing.

### 11.3 Technical
- Static generation for all pages; `revalidate` only where needed.
- `app/sitemap.ts` generating separate sitemaps (tools, devices, blog, hi) — only verified/indexable pages.
- `robots.ts`: allow all; block `/api/`, search/filter params.
- Canonical on every page; self-referencing.
- hreflang `en` ↔ `hi` + `x-default`.
- 404 page with tool links; 301 for any changed slugs.
- Breadcrumbs (visible + JSON-LD).
- Core Web Vitals budgets from §3.
- No indexable thin tag/category pages.

### 11.4 Structured data (JSON-LD builders in `lib/seo/`)
- `Organization` + `WebSite` (site-wide).
- `WebApplication` (or `SoftwareApplication`) on each tool page: name, applicationCategory `UtilitiesApplication`, operatingSystem "Any (browser)", `offers` price 0.
- `BreadcrumbList` everywhere.
- `FAQPage` on pages with FAQs. (Google shows FAQ rich results only for limited sites now, but the markup still helps machines understand the page — keep it accurate and matching the visible FAQ.)
- `HowTo`-style steps: keep as clear visible numbered steps; markup optional (Google retired HowTo rich results, but structure helps AEO).
- `Article` + `author` (`Person`) on blogs, with `datePublished`/`dateModified`.
- Never mark up content that isn't visible on the page.

### 11.5 Off-page / authority
- Submit to tool directories (e.g., free-tool listing sites, Product Hunt launch for the tool suite).
- Answer relevant Reddit/Quora questions genuinely, linking only when the tool actually helps.
- Pinterest pins for how-to infographics (competitor uses Pinterest).
- Short videos (YouTube Shorts/Instagram Reels): "Water in phone speaker? 60-second fix" → linked in description.
- Outreach to tech blogs with a genuinely useful asset: e.g., "We tested water eject on 20 phones" data study.
- Embeddable widget (P2): let other sites embed the cleaner with a backlink.

### 11.6 E-E-A-T & trust pages
- `/about` — who runs the site, why it exists.
- `/how-we-test` — test method, devices used, photos/video.
- `/editorial-policy` — how content is written, reviewed, updated; AI-use disclosure.
- Author pages with real bios.
- Visible "Last updated" dates (real updates only).

---

## 12. AEO Strategy (Answer Engine Optimization)

Goal: get cited by Google AI Overviews, ChatGPT search, Perplexity, Gemini, Copilot, and voice assistants.

### Tactics
1. **Answer-first blocks:** every page opens (after the tool) with a 40–60 word direct answer in plain language. Put the entity in the first sentence ("A speaker cleaner is a sound-based tool that...").
2. **Question-shaped headings:** H2/H3s match real queries ("Does rice fix a wet phone?").
3. **Self-contained paragraphs:** each section should make sense if quoted alone — AI engines extract chunks.
4. **Lists & tables** for steps, comparisons, dB references, frequency ranges.
5. **Specific, checkable facts** with sources (e.g., IP rating definitions from the standard, manufacturer guidance) — engines prefer citable specifics.
6. **Original data:** publish our own test results (a "Water Eject Test Results" page). Unique data gets cited.
7. **Consistent entity:** same brand name, description and logo everywhere (site, socials, directories) + `Organization` schema with `sameAs` links.
8. **`/llms.txt`:** a plain-text/markdown map of the site's key pages and tools with one-line descriptions.
9. **AI crawler access:** decide deliberately in `robots.ts`. Recommended for this site: allow OAI-SearchBot, PerplexityBot, ClaudeBot/Claude-SearchBot, Google (incl. Google-Extended if you want Gemini use), Bingbot — visibility is the goal here.
10. **Freshness:** refresh top pages monthly with real updates (new models, new findings).
11. **Voice-friendly FAQ answers:** 1–2 sentences, spoken-style.
12. **Track AI referrals:** GA4 segment for referrers like chatgpt.com, perplexity.ai, copilot, gemini; manually check key prompts monthly ("how to get water out of phone speaker") across engines.

---

## 13. Monetization

1. **Display ads (primary):** Google AdSense first; move to a premium network (Ezoic/Mediavine/Raptive-type) once traffic qualifies.
   - No ads adjacent to the Start/Stop buttons (accidental click risk + policy issues).
   - Good slot: below the tool's result helper — users wait ~60 s during a cycle and scroll.
   - Reserve heights to avoid CLS; lazy-load below-the-fold slots.
   - Max 3–4 slots on tool pages; test density later.
2. **Affiliate:** Amazon Associates (India + US) — cleaning kits, earbuds, waterproof pouches, Bluetooth speakers, phone repair kits. Clearly disclosed.
3. **Lead-gen (P2):** "Find a phone repair shop near you" — partner with repair services in India metros.
4. **Sponsored/Pro (optional, later):** ad-free PWA, embeddable widget licensing.

---

## 14. Analytics & Tracking

**GA4 events:**
- `tool_start` (tool, mode, device_type)
- `tool_complete` (tool, duration)
- `tool_stop_early` (tool, seconds_played)
- `tool_feedback` (tool, helped: yes/no)
- `mic_permission` (granted/denied/error)
- `related_tool_click`, `blog_to_tool_click`, `affiliate_click`
- `language_switch`

**Dashboards:** tool completion rate, helped-rate by device, top entry pages, AI-engine referrals, RPM per page.

**Search Console:** submit sitemaps day 1; weekly check for indexing issues on programmatic pages.

---

## 15. Legal, Trust & Safety

- **Disclaimer page + short on-tool note:** the tool can help with small amounts of water/dust; it does not repair hardware damage; not responsible for device damage; use at your own risk; stop if you hear distortion.
- **Honest claims only:** no "100% success", no invented counters. Real feedback stats only.
- **Privacy policy:** mic data processed locally only, never recorded to servers; analytics & ad cookies disclosed; consent banner where required (EU/UK traffic) — use a certified CMP for AdSense in the EEA/UK.
- **Health-adjacent tools (hearing test, dB meter):** clear "not a medical or calibrated measurement" labels; recommend professionals for concerns.
- **Brand names:** use device/brand names descriptively only ("for iPhone 15"), no manufacturer logos, and add a footer note that the site isn't affiliated with any manufacturer.
- **Images:** own illustrations/photos only; no copied product photos.

---

## 16. Build Phases & CLI Task List

### Phase 0 — Setup (Day 1–2)
- [ ] Init Next.js + TS + Tailwind; ESLint/Prettier.
- [ ] Design tokens in Tailwind config (light/dark).
- [ ] Layout: Header, Footer, Breadcrumbs, ThemeToggle.
- [ ] `lib/seo` metadata + JSON-LD builders.
- [ ] `sitemap.ts`, `robots.ts`, `llms.txt` route.
- [ ] Analytics wrapper (`lib/analytics.ts`) with event helpers.

### Phase 1 — Audio engine + P0 tools (Week 1)
- [ ] `lib/audio`: context, tone, pulse, sweep, stopAll, limiter, session cap, iOS audioSession + WAV fallback, wake lock, vibrate detection.
- [ ] `ToolShell`, `BigStartButton`, `ProgressRing`, `ModeTabs`, `ChecklistPreflight`.
- [ ] Speaker Cleaner (Water/Dust/Vibrate), Deep Cleaner, Earpiece guide tool.
- [ ] Left/Right test, Speaker Sound Test, Mic Test.
- [ ] Manual test matrix: iPhone Safari, Android Chrome, Samsung Internet, desktop Chrome/Edge/Firefox/Safari.

### Phase 2 — Pages & content (Week 2)
- [ ] Homepage per §7.
- [ ] Tool page template per §8, driven by `data/tools.ts` + MDX.
- [ ] Trust pages (about, how-we-test, editorial policy, privacy, terms, disclaimer, contact).
- [ ] Blog system (MDX, TOC, author box, related posts, Article schema).
- [ ] First 12 blogs (Clusters A & B priority).

### Phase 3 — Programmatic pages (Weeks 3–4)
- [ ] `data/devices.ts` with verified entries + `sources`.
- [ ] Device-type hubs, brand hubs, first 30 verified model pages.
- [ ] Auto internal-linking (siblings, hub, related tools).
- [ ] Per-page OG images via `next/og`.

### Phase 4 — P1 tools & growth (Month 2)
- [ ] Tone Generator, Bass Test, Headphone Test, dB Meter, Hearing Test, Noise Generator, Frequency Sweep.
- [ ] 20 more blogs; first "our test results" data page.
- [ ] AdSense application + ad slots.
- [ ] Hindi homepage + top 3 Hindi tools + hreflang.

### Phase 5 — Scale (Month 3+)
- [ ] P2 tools; remaining model pages (verified only).
- [ ] Affiliate posts; embeddable widget; outreach.
- [ ] Monthly refresh cycle; prune/merge low performers.

### Definition of done (every page)
- Passes Lighthouse ≥ 95 performance/accessibility/SEO on mobile.
- Valid JSON-LD (Rich Results Test / Schema validator).
- Unique title + meta + H1; ≥ 3 internal links in, ≥ 3 out.
- Tool works on iOS Safari + Android Chrome.
- No unverified facts.

---

## 17. KPIs & Review Cadence

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Indexed pages | 40+ | 120+ | 200+ |
| Tool completion rate | 60%+ | 65%+ | 70%+ |
| "Helped" rate | track | track | improve |
| Organic clicks/day | first clicks | growth trend | growth trend |
| AI-engine referrals | track | present | growing |
| CWV "Good" URLs | 100% | 100% | 100% |

(Traffic targets are deliberately not fixed — set them after 4–6 weeks of Search Console data.)

**Weekly:** Search Console queries → new blog/FAQ ideas; fix indexing issues.
**Monthly:** refresh top 20 pages, add new phone launches, check AI answers for key prompts, compare against competitor sitemaps.

---

## 18. `CLAUDE.md` Starter (paste into repo root)

```md
# Project: {{BRAND}} — Speaker cleaner & audio tools site

Read docs/PROJECT_BLUEPRINT.md before any task. It is the source of truth.

## Stack
Next.js (App Router, static-first), TypeScript, Tailwind, MDX. No UI libraries unless asked.

## Hard rules
- Tool must be above the fold on a 360×740 viewport.
- All audio goes through lib/audio (limiter + session cap). Never autoplay sound.
- Tool page JS < 100 KB gz. No CLS: reserve space for ads and dynamic UI.
- Never invent device specs, stats, testimonials or counters. Device pages build only when `verified: true` with `sources`.
- Mic audio never leaves the device.
- Every page: unique title/meta/H1, canonical, breadcrumbs JSON-LD, ≥3 internal links.
- Honest claims: the tool helps with small amounts of water/dust; it does not repair hardware.

## Conventions
- Tools registry: data/tools.ts. Devices: data/devices.ts. Long-form content: content/**.mdx.
- Components in components/{tools,layout,content,ads}.
- Commit per feature; run lint + typecheck + build before finishing a task.

## Testing
- Manually verify tools on iOS Safari and Android Chrome (silent mode, low-power mode, permission denied).
- Lighthouse mobile ≥95 on changed pages.
```
