# Handoff — Speaker Cleaner Site

Status snapshot for picking this project back up. Read `docs/PROJECT_BLUEPRINT.md` first (source of truth for scope/rules); this file is "where things stand right now," not a spec.

## What's live

- **Stack**: Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 + React 19. No git repo initialized yet (`git status` works locally but there's no remote — confirm before assuming CI/PRs exist).
- **Dev server**: `npm run dev` (was last verified running on port 3001 — port 3000 may be taken).
- **Routes** (`app/*/page.tsx`): homepage, `/tools` (all-tools hub), 14 tool pages (water-eject, deep-speaker-cleaner, earpiece-speaker-cleaner, speaker-dust-remover, left-right-speaker-test, speaker-test, mic-test, tone-generator, bass-test, headphone-test, db-meter, hearing-test, noise-generator, frequency-sweep), `/speaker-cleaner/[device]` dynamic device hub, plus trust pages (about, contact, how-we-test, editorial-policy, privacy-policy, terms, disclaimer).
- **Data registries**: `data/tools.ts`, `data/deviceHubs.ts` — device pages only exist where `verified: true` + `sources` per the hard rule; don't add entries without both.
- **Audio**: all tool audio goes through `lib/audio/` (`engine.ts`, `noise.ts`, `useToolRunner.ts`, `useSweepRunner.ts`, limiter + session cap baked in). Never call raw Web Audio APIs from a tool component.

## Just finished: premium mega-menu navigation

Built out the full nav system per spec:
- `components/layout/Header.tsx` — sticky header, hover-triggered desktop mega menus, scroll-triggered glassmorphism (opacity/shadow intensify past 8px scroll).
- `components/layout/MegaMenu.tsx` — 4-column desktop panel (Featured/Cleaning/Testing/Generators for Audio Tools; similar structure for Devices/Resources).
- `components/layout/MobileNav.tsx` — full-screen accordion nav, reuses the same `lib/megaMenu.ts` data as desktop so mobile/desktop/`/tools` can't drift apart.
- `components/layout/SearchPalette.tsx` — ⌘K command palette, now a controlled component (`open`/`onOpenChange` owned by `Header`).
- `lib/megaMenu.ts` — single source of truth (`audioToolsMenu`, `devicesMenu`, `resourcesMenu`, `featuredTool`) with a dev-time integrity check that warns if any real tool isn't placed in exactly one column.
- `app/tools/page.tsx` — new hub page (several nav links depend on this existing); wired into `app/sitemap.ts` and `app/llms.txt/route.ts`.

### Two real bugs found (via screenshot review, not console-error checks) and fixed
1. **Description truncation** in mega-menu compact cards — `ToolCard.tsx` compact variant switched from single-line `truncate` to `line-clamp-2 leading-snug`; panel widths widened (`w-[900px]/[820px]/[720px]`).
2. **backdrop-filter containing-block bug** — `<header>`'s `backdrop-blur` was creating a new CSS containing block for `position: fixed` descendants, clipping `MobileNav` and the search modal to the header's ~64px height instead of the viewport. Fixed by rendering `MobileNav`/`SearchPalette` as siblings of `<header>`, not children. Worth remembering if any future fixed-position overlay goes near the header.

### Verification done
`tsc --noEmit` clean, `npm run lint` clean, `npm run build` green (all routes generated), Playwright smoke suites all passing (nav hover/click, ⌘K open+navigate, mobile accordion+search, scroll shadow). Test scripts live in the session scratchpad only (not committed) — see `check-nav.mjs` pattern notes below if writing more.

**Not yet done from the testing checklist**: manual verification on real iOS Safari / Android Chrome (silent mode, low-power mode, mic-permission-denied), and Lighthouse mobile ≥95 on the changed pages.

## Testing gotchas worth keeping

- `page.waitForLoadState("networkidle")` right after a `.click()` that triggers Next.js client-side nav is unreliable — it can resolve before navigation starts. Use `page.waitForURL(pattern, { timeout })` instead.
- Locators scoped through a parent locator that sits inside a hover-triggered overlay can misbehave during Playwright's synthetic mouse interpolation (spurious `mouseleave`). An unscoped `page.getByRole(...).first()` mirrors real interaction better.
- Give each assertion its own fresh `browser.newContext()` to avoid hover-state bleed between sequential checks.

## Open items (not started / not re-confirmed with the user)

- `Input.tsx` design-system component (styled text/number/range input) — listed in the original component spec, not yet built.
- Whether a standalone `SearchBar.tsx` is still wanted separately from `SearchPalette`, or whether the palette supersedes it.
- `Tooltip.tsx` exists but isn't wired into any real page yet.
- Final consistency pass confirming every page renders through the shared design-system components (`ToolContentBody`, `DeviceHubBody`, `ToolPageShell`, `Card`, `Button`, etc.) — no page should look visually disconnected from the rest.
- No commits have been made for the mega-menu work yet — `CLAUDE.md`/`AGENTS.md` says "commit per feature," but per standing operating rules commits only happen when the user explicitly asks.

## Hard rules to not forget (from CLAUDE.md)

- Tool must be above the fold on 360×740.
- Never autoplay audio; mic audio never leaves the device.
- Tool page JS < 100 KB gz, no CLS.
- Never invent device specs/stats/testimonials/counters.
- Every page needs unique title/meta/H1, canonical, breadcrumbs JSON-LD, ≥3 internal links.
- Honest claims only — the tool helps with small amounts of water/dust, it does not repair hardware.
