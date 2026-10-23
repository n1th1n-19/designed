# Crumb and Rye design

> **For AI agents and developers.** This file is the source of truth for all UI work in this project. Read it fully before creating or changing any screen, component, style or copy. Do not invent tokens, colors, fonts or patterns outside it. Machine-readable values are in `tokens.json`. If a change needs something new, update this file and `tokens.json` first, then build. Do not use emojis or em dashes anywhere in the UI or copy.

Version: 1.0
Last updated: 2026-10-23
Mode: Unified, warm because a neighbourhood bakery site, mobile first, where photos of bread carry the brand.

This is an example made with the `designed` skill.

## 1. Brief

Product: Website for a small sourdough bakery: today's bakes, hours, preorders.
Core job: Check what is baked today and preorder before it sells out.
Users: Locals on phones, often on the way to work, 25 to 65.
Platforms: Web, mobile first
Feel: warm, honest, unhurried / not: corporate, trendy, sugary
Signature detail: A hand-set daily bake board: today's loaves listed like a chalk menu, with sold out struck through.

## 2. Brand

### Color

Seed: primary hue 45, chroma 0.13 (OKLCH). Accent hue 140.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| primary | #fef5f0 | #fee7dd | #fbceba | #f1ad8e | #df8a63 | #c76b3f | #ac5326 | #8d4017 | #6c2f0f | #4e1f07 | #311102 |
| secondary | #faf6f4 | #f3ebe7 | #e4d6d0 | #d0bab1 | #b79d91 | #9d8174 | #85695d | #6b5349 | #523f37 | #3a2b25 | #231915 |
| accent | #f4f8f3 | #e7f0e5 | #cfdfcb | #afc8aa | #98b791 | #7a9c73 | #5a7a53 | #466240 | #344b30 | #243420 | #141f11 |
| neutral | #f8f6f6 | #efecea | #dcd8d5 | #c4beb9 | #a9a19b | #8e867f | #776e68 | #5f5852 | #48423e | #322e2b | #1e1b19 |
| success | #f0faf2 | #dff3e2 | #c1e4c7 | #99cfa3 | #78c088 | #55a568 | #318349 | #216a37 | #165128 | #0c391a | #05220d |
| warning | #fef5eb | #fbead4 | #f2d4ab | #e5b676 | #dba046 | #c18201 | #966503 | #795000 | #5c3c00 | #422900 | #281800 |
| error | #fef4f3 | #fee7e3 | #ffcbc4 | #ffa398 | #f4796d | #db554c | #bf3b35 | #9d2925 | #791d1a | #58120f | #380706 |
| info | #f0f8fe | #dff0fc | #bfdef4 | #96c6e8 | #6dabd6 | #498fbe | #2f77a4 | #1f5f86 | #154867 | #0c324a | #041e2e |

Roles

| Role | Light | Dark |
|---|---|---|
| bg | neutral.50 (#f8f6f6) | neutral.950 (#1e1b19) |
| surface | neutral.50 (#f8f6f6) | neutral.900 (#322e2b) |
| surface-raised | #ffffff (#ffffff) | neutral.800 (#48423e) |
| surface-sunken | neutral.100 (#efecea) | neutral.950 (#1e1b19) |
| border | neutral.200 (#dcd8d5) | neutral.800 (#48423e) |
| border-strong | neutral.300 (#c4beb9) | neutral.700 (#5f5852) |
| text | neutral.900 (#322e2b) | neutral.50 (#f8f6f6) |
| text-muted | neutral.600 (#776e68) | neutral.400 (#a9a19b) |
| primary | primary.600 (#ac5326) | primary.400 (#df8a63) |
| on-primary | #ffffff (#ffffff) | primary.950 (#311102) |
| primary-container | primary.100 (#fee7dd) | primary.900 (#4e1f07) |
| on-primary-container | primary.900 (#4e1f07) | primary.100 (#fee7dd) |
| accent | accent.600 (#5a7a53) | accent.400 (#98b791) |
| focus-ring | primary.500 (#c76b3f) | primary.400 (#df8a63) |
| success | success.700 (#216a37) | success.400 (#78c088) |
| warning | warning.700 (#795000) | warning.400 (#dba046) |
| error | error.600 (#bf3b35) | error.400 (#f4796d) |
| info | info.600 (#2f77a4) | info.400 (#6dabd6) |
| on-status | #ffffff (#ffffff) | neutral.950 (#1e1b19) |

All 28 contrast pairs pass (scripts/contrast.mjs, 2026-10-23).

Rules: accent appears only in the signature detail and in selected chips. Status always pairs color with text or an icon.

### Typography

| Role | Family | Source | Fallback |
|---|---|---|---|
| display | Fraunces | Google Fonts | Georgia, serif |
| body | Nunito Sans | Google Fonts | system-ui, sans-serif |
| mono | DM Mono | Google Fonts | ui-monospace, monospace |

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

Phosphor (regular, fill for selected)

### Imagery and illustration

Real photos of the bakery and loaves, warm natural light, tight crops on crust and crumb, no stock.

### Voice and tone

| Trait | This | Not that |
|---|---|---|
| Plain | Rye, fresh at 7 | Artisanal rye experience |
| Warm | See you tomorrow | Thank you for your purchase |
| Exact | Ready at 8:30 | Ready soon |

Copy rules: sentence case, buttons are verbs, errors explain the fix, no emojis, no em dashes.

## 3. Tokens

Spacing: 4px base: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
Radii: sm 8, md 14, lg 24, full. Inner radius = outer minus padding.
Elevation: Soft neutral shadow, no blur materials
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
