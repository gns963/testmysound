@AGENTS.md

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
