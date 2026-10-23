# designed.md template

Copy the block below into the project root as `designed.md` and fill every section. Keep it current: any design change updates this file and tokens.json first. No emojis, no em dashes.

````markdown
# <Product> design

> **For AI agents and developers.** This file is the source of truth for all UI work in this project. Read it fully before creating or changing any screen, component, style or copy. Do not invent tokens, colors, fonts or patterns outside it. Machine-readable values are in `tokens.json`. If a change needs something new, update this file and `tokens.json` first, then build. Do not use emojis or em dashes anywhere in the UI or copy.

Version: 1.0
Last updated: <YYYY-MM-DD>
Mode: <unified | flavor name> because <one line>

## 1. Brief

Product: <one sentence>
Core job: <the one task>
Users: <who, context>
Platforms: <list>
Feel: <3 words> / not: <3 words>
Signature detail: <the one thing this design owns>

## 2. Brand

### Color

Seed: <hue and why>

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| primary | | | | | | | | | | | |
| secondary | | | | | | | | | | | |
| accent | | | | | | | | | | | |
| neutral | | | | | | | | | | | |
| success | | | | | | | | | | | |
| warning | | | | | | | | | | | |
| error | | | | | | | | | | | |
| info | | | | | | | | | | | |

Roles

| Role | Light | Dark | Use |
|---|---|---|---|
| bg | | | Page background |
| surface | | | Cards, panels |
| surface-raised | | | Popovers, raised cards |
| surface-sunken | | | Wells, skeletons |
| border | | | Dividers, inputs |
| border-strong | | | Input outlines, emphasis |
| text | | | Body text |
| text-muted | | | Secondary text |
| primary | | | Main actions, links |
| on-primary | | | Text on primary |
| primary-container | | | Tonal buttons, selected |
| on-primary-container | | | Text on primary-container |
| accent | | | Signature detail only |
| focus-ring | | | Focus indicator |
| success / warning / error / info | | | Status |
| on-status | | | Text on status colors |

Rules: <e.g. accent only on the streak counter; status always color plus text>

### Typography

| Role | Family | Source | Fallback | Why |
|---|---|---|---|---|
| Display | | | | |
| Body | | | | |
| Mono | | | | |

| Token | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| display | | | | | |
| headline | | | | | |
| title | | | | | |
| body | | | | | |
| body-sm | | | | | |
| label | | | | | |
| caption | | | | | |

### Iconography

Set: <name>, style: <outline / filled for selected>, stroke: <weight>, sizes: <16, 20, 24>

### Imagery and illustration

<photo or illustration rules, treatments, ratios, which companion skill makes illustrations>

### Logo and app icon

<concept, construction, colors, clear space, minimum size, platform icon notes>

### Voice and tone

Traits: <trait: this, not that> x3
Copy rules: sentence case, buttons are verbs, errors explain the fix, no emojis, no em dashes.

## 3. Tokens

Spacing: <scale>
Radii: <sm / md / lg / full and where each is used>
Borders: <widths and colors>
Elevation: <depth language, levels 0 to 4>
Materials: <where blur is allowed>
Motion: <durations, easings, reduced motion behaviour>
Breakpoints: <compact / medium / expanded / large>
Grid: <columns, gutters, margins, max widths>

## 4. Layout and navigation

<navigation model per platform, page templates, sitemap or flow diagram link>

## 5. Components

| Component | Variants | Sizes | States | Notes |
|---|---|---|---|---|
| Button | | | | |
| Input | | | | |
| ... | | | | |

## 6. Key screens

| Screen | Purpose | Main components | Empty / loading / error |
|---|---|---|---|

## 7. Platform notes

<iOS, Android, web, desktop specifics: fonts, native controls, gestures, generated file locations>

## 8. Accessibility

Target: WCAG 2.2 AA (AAA for <areas>). Contrast checked with the designed skill's contrast.mjs on <date>. Text scaling, reduced motion, keyboard, screen reader notes.

## 9. Internationalisation

Languages: <list>. RTL: <yes/no>. Expansion allowance, font fallbacks, formatting rules.

## 10. Do not

- No emojis, no em dashes
- <project specific bans, plus any AI-look tells relevant here>

## 11. Changelog

| Date | Change | Why |
|---|---|---|
| <YYYY-MM-DD> | Created | <from discovery / from audit> |
````

## Pointer snippet for agent instruction files

Append to `CLAUDE.md` (create if missing), and to `AGENTS.md`, `GEMINI.md` and `.cursor/rules/designed.mdc` if they exist or the project uses that agent. Skip any file that already has a `## Design system` heading.

```markdown
## Design system

All UI work follows `designed.md` (human-readable) and `tokens.json` (machine-readable) in the project root. Read `designed.md` before creating or changing any screen, component, style or copy. Use only its tokens, fonts and patterns. If something new is needed, update `designed.md` and `tokens.json` first. No emojis or em dashes in UI or copy.

Use the `designed` skill (`/designed`) for any UI work. Run `/designed sync` after design changes. If the skill is not installed: `npx skills add n1th1n-19/designed`.
```
