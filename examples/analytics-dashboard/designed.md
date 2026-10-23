# Quarry design

> **For AI agents and developers.** This file is the source of truth for all UI work in this project. Read it fully before creating or changing any screen, component, style or copy. Do not invent tokens, colors, fonts or patterns outside it. Machine-readable values are in `tokens.json`. If a change needs something new, update this file and `tokens.json` first, then build. Do not use emojis or em dashes anywhere in the UI or copy.

Version: 1.0
Last updated: 2026-10-23
Mode: Modern web flavor, Carbon density for tables because data tool for engineers and analysts in long sessions; dark first, keyboard driven.

This is an example made with the `designed` skill.

## 1. Brief

Product: Web dashboard that monitors warehouse query cost and performance.
Core job: Find the query that made this week's bill spike, in under a minute.
Users: Data engineers and analysts at desks, daily, expert users.
Platforms: Web, desktop width first
Feel: precise, quiet, fast / not: playful, decorative, salesy
Signature detail: Cost deltas shown as signed mono numbers with a thin inline bar, no pie charts anywhere.

## 2. Brand

### Color

Seed: primary hue 160, chroma 0.11 (OKLCH). Accent hue 80.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| primary | #f0faf4 | #def3e7 | #bee4ce | #94cfae | #71c097 | #4ba579 | #238359 | #116a46 | #095134 | #043923 | #012313 |
| secondary | #f5f7f6 | #e9eeeb | #d2dcd6 | #b4c4bb | #95a99d | #798e81 | #61766a | #4d5e54 | #3a4840 | #27322c | #161e1a |
| accent | #fdf6ea | #faebd1 | #f1d5a7 | #e3b86e | #d9a237 | #bb8608 | #926703 | #755203 | #593e02 | #3f2b01 | #271901 |
| neutral | #f6f7f7 | #ebedee | #d7d9dc | #bcc0c4 | #9fa4a9 | #83888e | #6c7176 | #565a5e | #414448 | #2d2f32 | #1a1c1e |
| success | #f0faf1 | #def3e2 | #bfe5c5 | #95d0a0 | #73c185 | #4da765 | #278445 | #166b34 | #0e5226 | #063918 | #02230c |
| warning | #fef5eb | #fbead4 | #f2d4ab | #e5b676 | #dba046 | #c18201 | #966503 | #795000 | #5c3c00 | #422900 | #281800 |
| error | #fef4f3 | #fee7e3 | #ffcbc4 | #ffa398 | #f4796d | #db554c | #bf3b35 | #9d2925 | #791d1a | #58120f | #380706 |
| info | #eff8fe | #def0fc | #bddff3 | #93c7e6 | #68acd3 | #4291bb | #2679a2 | #166184 | #0d4966 | #063349 | #021f2e |

Roles

| Role | Light | Dark |
|---|---|---|
| bg | neutral.50 (#f6f7f7) | neutral.950 (#1a1c1e) |
| surface | neutral.50 (#f6f7f7) | neutral.900 (#2d2f32) |
| surface-raised | #ffffff (#ffffff) | neutral.800 (#414448) |
| surface-sunken | neutral.100 (#ebedee) | neutral.950 (#1a1c1e) |
| border | neutral.200 (#d7d9dc) | neutral.800 (#414448) |
| border-strong | neutral.300 (#bcc0c4) | neutral.700 (#565a5e) |
| text | neutral.900 (#2d2f32) | neutral.50 (#f6f7f7) |
| text-muted | neutral.600 (#6c7176) | neutral.400 (#9fa4a9) |
| primary | primary.700 (#116a46) | primary.400 (#71c097) |
| on-primary | #ffffff (#ffffff) | primary.950 (#012313) |
| primary-container | primary.100 (#def3e7) | primary.900 (#043923) |
| on-primary-container | primary.900 (#043923) | primary.100 (#def3e7) |
| accent | accent.600 (#926703) | accent.400 (#d9a237) |
| focus-ring | primary.600 (#238359) | primary.400 (#71c097) |
| success | success.700 (#166b34) | success.400 (#73c185) |
| warning | warning.700 (#795000) | warning.400 (#dba046) |
| error | error.600 (#bf3b35) | error.400 (#f4796d) |
| info | info.600 (#2679a2) | info.400 (#68acd3) |
| on-status | #ffffff (#ffffff) | neutral.950 (#1a1c1e) |

All 28 contrast pairs pass (scripts/contrast.mjs, 2026-10-23).

Rules: accent appears only in the signature detail and in selected chips. Status always pairs color with text or an icon.

### Typography

| Role | Family | Source | Fallback |
|---|---|---|---|
| display | Geist | Google Fonts | system-ui, sans-serif |
| body | Geist | Google Fonts | system-ui, sans-serif |
| mono | Geist Mono | Google Fonts | ui-monospace, monospace |

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

Lucide at 16px, 1.5 stroke

### Imagery and illustration

None. Charts via the dataviz companion, product screenshots on the marketing page.

### Voice and tone

| Trait | This | Not that |
|---|---|---|
| Direct | Cost up 38 percent | Your costs have increased significantly |
| Technical | p95 4.2s | Kind of slow |
| Quiet | No anomalies | Great news! Everything is fine! |

Copy rules: sentence case, buttons are verbs, errors explain the fix, no emojis, no em dashes.

## 3. Tokens

Spacing: 4px base: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
Radii: sm 4, md 6, lg 10, full. Inner radius = outer minus padding.
Elevation: 1px borders, shadow only on popovers and command menu
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
