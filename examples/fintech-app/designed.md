# Tally design

> **For AI agents and developers.** This file is the source of truth for all UI work in this project. Read it fully before creating or changing any screen, component, style or copy. Do not invent tokens, colors, fonts or patterns outside it. Machine-readable values are in `tokens.json`. If a change needs something new, update this file and `tokens.json` first, then build. Do not use emojis or em dashes anywhere in the UI or copy.

Version: 1.0
Last updated: 2026-10-23
Mode: Unified, Apple flavor on iOS, Material 3 on Android because personal money app used daily on phones; each platform should feel native.

This is an example made with the `designed` skill.

## 1. Brief

Product: Mobile app that tracks spending and shared bills between housemates.
Core job: See what you can still spend this month and settle a shared bill.
Users: Renters 20 to 35 sharing flats, checking several times a week.
Platforms: iOS, Android
Feel: calm, precise, fair / not: flashy, anxious, gamified
Signature detail: The safe to spend number: one large tabular figure that counts down smoothly as you spend.

## 2. Brand

### Color

Seed: primary hue 195, chroma 0.1 (OKLCH). Accent hue 35.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| primary | #eef9f9 | #dbf2f2 | #b8e3e2 | #88cecd | #5fbebe | #2ea4a4 | #058081 | #056767 | #024e4e | #003737 | #012121 |
| secondary | #f4f8f8 | #e7efee | #cedddc | #aec5c4 | #8daaa9 | #6f8f8e | #587776 | #455f5f | #334848 | #233332 | #131e1e |
| accent | #fef4f2 | #ffe7e0 | #feccbf | #ffa58e | #ef7f63 | #d65d3f | #ba4325 | #993116 | #76230e | #551707 | #360a02 |
| neutral | #f6f7f7 | #ebedee | #d5dadb | #b9c1c2 | #9ca5a7 | #808a8c | #697274 | #535b5d | #3e4546 | #2b3031 | #191c1d |
| success | #f0faf1 | #def3e2 | #bfe5c5 | #95d0a0 | #73c185 | #4da765 | #278445 | #166b34 | #0e5226 | #063918 | #02230c |
| warning | #fef5eb | #fbead4 | #f2d4ab | #e5b676 | #dba046 | #c18201 | #966503 | #795000 | #5c3c00 | #422900 | #281800 |
| error | #fef4f3 | #fee7e3 | #ffcbc4 | #ffa398 | #f4796d | #db554c | #bf3b35 | #9d2925 | #791d1a | #58120f | #380706 |
| info | #f0f8ff | #e0effd | #c1ddf6 | #9ac5ea | #72a9d8 | #508ec0 | #3775a6 | #275e88 | #1b4769 | #11324b | #071d2f |

Roles

| Role | Light | Dark |
|---|---|---|
| bg | neutral.50 (#f6f7f7) | neutral.950 (#191c1d) |
| surface | neutral.50 (#f6f7f7) | neutral.900 (#2b3031) |
| surface-raised | #ffffff (#ffffff) | neutral.800 (#3e4546) |
| surface-sunken | neutral.100 (#ebedee) | neutral.950 (#191c1d) |
| border | neutral.200 (#d5dadb) | neutral.800 (#3e4546) |
| border-strong | neutral.300 (#b9c1c2) | neutral.700 (#535b5d) |
| text | neutral.900 (#2b3031) | neutral.50 (#f6f7f7) |
| text-muted | neutral.600 (#697274) | neutral.400 (#9ca5a7) |
| primary | primary.700 (#056767) | primary.400 (#5fbebe) |
| on-primary | #ffffff (#ffffff) | primary.950 (#012121) |
| primary-container | primary.100 (#dbf2f2) | primary.900 (#003737) |
| on-primary-container | primary.900 (#003737) | primary.100 (#dbf2f2) |
| accent | accent.600 (#ba4325) | accent.400 (#ef7f63) |
| focus-ring | primary.600 (#058081) | primary.400 (#5fbebe) |
| success | success.700 (#166b34) | success.400 (#73c185) |
| warning | warning.700 (#795000) | warning.400 (#dba046) |
| error | error.600 (#bf3b35) | error.400 (#f4796d) |
| info | info.600 (#3775a6) | info.400 (#72a9d8) |
| on-status | #ffffff (#ffffff) | neutral.950 (#191c1d) |

All 28 contrast pairs pass (scripts/contrast.mjs, 2026-10-23).

Rules: accent appears only in the signature detail and in selected chips. Status always pairs color with text or an icon.

### Typography

| Role | Family | Source | Fallback |
|---|---|---|---|
| display | Inter Tight | Google Fonts | system-ui, sans-serif |
| body | Inter | Google Fonts | system-ui, sans-serif |
| mono | JetBrains Mono | Google Fonts | ui-monospace, monospace |

| Token | Size | Line height | Weight |
|---|---|---|---|
| display | 52px | 1.05 | 650 |
| headline | 36px | 1.15 | 600 |
| title | 24px | 1.25 | 600 |
| title-sm | 20px | 1.3 | 600 |
| body-lg | 18px | 1.55 | 400 |
| body | 16px | 1.5 | 400 |
| body-sm | 14px | 1.45 | 400 |
| label | 14px | 1.2 | 600 |
| caption | 12px | 1.35 | 500 |

Numbers use tabular figures.

### Iconography

SF Symbols on iOS, Material Symbols Rounded on Android, Lucide on web

### Imagery and illustration

No photos. Small flat category glyphs in the secondary scale. Avatars with initials.

### Voice and tone

| Trait | This | Not that |
|---|---|---|
| Calm | You have 412 left | Warning: low funds! |
| Fair | Sam owes you 18.40 | Sam has not paid |
| Exact | Rent, due 1 Nov | Upcoming payment |

Copy rules: sentence case, buttons are verbs, errors explain the fix, no emojis, no em dashes.

## 3. Tokens

Spacing: 4px base: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
Radii: sm 8, md 12, lg 20, full. Inner radius = outer minus padding.
Elevation: Material blur on tab bar only, soft shadow on sheets
Motion: fast 150ms, base 250ms, slow 450ms; standard cubic-bezier(0.2, 0, 0, 1). Reduced motion: fades only.
Breakpoints: compact under 600, medium 600 to 839, expanded 840 to 1199, large 1200 and up.

## 4. Components

Button (primary, secondary, tertiary, destructive), text input, select, checkbox, switch, chips, card, list row, table, toast, banner, empty state, skeleton. All states as in the skill's components reference. See design-demo.html.

## 5. Do not

- No emojis, no em dashes
- No gradients on surfaces, no glass on content
- No more than one primary button per view

## 6. Changelog

| Date | Change | Why |
|---|---|---|
| 2026-10-23 | Created | Example for the designed skill |
