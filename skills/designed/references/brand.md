# Brand kit

Everything the project needs to look like itself. Build it from the brief, not from taste alone. If `frontend-design` is installed, use it here for aesthetic direction, then come back to this file for the system.

## Contents of a complete kit

1. Color palette with tonal scales and role mapping (light and dark)
2. Typography: families, scale, platform mapping
3. Shape: radii, borders
4. Depth: elevation, shadows, materials
5. Motion
6. Iconography
7. Imagery and illustration
8. Logo and app icon direction
9. Voice and tone

All of it goes into `tokens.json` and `designed.md`.

## 1. Color

### Pick the seed

Choose one primary hue from the brief, not from habit. Ask: what color do competitors all use (avoid it unless the convention matters, like green for gains in finance), what emotion does the feel list point to, what works on the product's real content (photos, charts, code)?

Avoid by default: violet 270 to 290 as primary, the blue-to-purple gradient, pure `#000` on pure `#fff` for large surfaces.

### Build tonal scales in OKLCH

OKLCH keeps perceived lightness even across hues, so the same step number means the same contrast in every color. For each color pick a hue `H` and peak chroma `C`, then:

| Step | L | Chroma factor |
|---|---|---|
| 50 | 0.975 | 0.12 |
| 100 | 0.945 | 0.25 |
| 200 | 0.885 | 0.45 |
| 300 | 0.805 | 0.70 |
| 400 | 0.715 | 0.90 |
| 500 | 0.625 | 1.00 |
| 600 | 0.545 | 1.00 |
| 700 | 0.465 | 0.90 |
| 800 | 0.385 | 0.75 |
| 900 | 0.305 | 0.60 |
| 950 | 0.225 | 0.45 |

`scripts/palette.mjs` does this for you, including sRGB gamut fitting and the role mapping below: `node <skill>/scripts/palette.mjs --primary 262:0.15 --accent 30:0.18 --out tokens.json`.

Chroma for a step = `C x factor`. Typical peak `C`: 0.10 to 0.16 for primary, 0.20 for a loud accent, 0.01 to 0.03 for neutrals. Yellow through cyan hues (70 to 200) shift: raise L by about 0.03 for 400 and 500 (not 600, which carries text contrast) so they do not look muddy. Always give hex too (convert and clamp to sRGB gamut) for tools that need it.

### The full palette

| Scale | Purpose | Guidance |
|---|---|---|
| primary | Brand, main actions, focus | From the seed |
| secondary | Supporting UI, selected states | Same hue with low chroma, or a neighbour hue 20 to 40 degrees away |
| accent | Rare highlights, the signature detail | Complementary or split complementary hue, used in under 5 percent of the surface |
| neutral | Text, surfaces, borders | Tint toward the primary hue with chroma 0.005 to 0.02. Never pure gray unless the brief is stark |
| success | Confirmations | Hue around 145 to 160 |
| warning | Caution | Hue around 70 to 85, check contrast carefully |
| error | Destructive and errors | Hue around 25 to 30 |
| info | Neutral notices | Hue around 230 to 250, or reuse primary if primary is blue |

### Roles (what code uses)

Code never uses `primary-600` directly. It uses roles, mapped per theme:

| Role | Light | Dark |
|---|---|---|
| `bg` | neutral-50 | neutral-950 |
| `surface` | neutral-50 | neutral-900 |
| `surface-raised` | white | neutral-800 |
| `surface-sunken` | neutral-100 | neutral-950 |
| `border` | neutral-200 | neutral-800 |
| `border-strong` | neutral-300 | neutral-700 |
| `text` | neutral-900 | neutral-50 |
| `text-muted` | neutral-600 | neutral-400 |
| `primary` | primary-600 | primary-400 |
| `on-primary` | white | primary-950 |
| `primary-container` | primary-100 | primary-900 |
| `on-primary-container` | primary-900 | primary-100 |
| `accent` | accent-600 | accent-400 |
| `focus-ring` | primary-500 | primary-400 |
| `success`, `warning` | 700 step | 400 step |
| `error`, `info` | 600 step | 400 step |
| `on-status` (text on any status color) | white | neutral-950 |

`palette.mjs` writes exactly these roles. If a pair fails contrast, it moves the non-surface role one step (darker in light, lighter in dark) until it passes, so check the final mapping in tokens.json. Add extra roles (for example `text-subtle`, `success-container`) by hand under `theme.light` and `theme.dark`, plus a contrast pair for each; re-running the script keeps them.

Dark mode is not inverted light mode: lower chroma slightly, raise surfaces with lightness not shadow, avoid pure black unless OLED battery is a stated goal.

### Contrast targets (WCAG 2.2)

- Body text on its background: 4.5:1 minimum, aim for 7:1
- Large text (24px, or 18.66px bold) and UI components, icons, borders that carry meaning: 3:1
- Placeholder and disabled text: disabled is exempt, placeholder is not

Run `node <skill>/scripts/contrast.mjs tokens.json` and fix every failure.

## 2. Typography

### Choosing families

Pick for the brief's feel and the content, then check: does it have the weights you need, tabular numbers if there is data, the scripts for every language, a variable version for performance?

Use free sources only: Google Fonts, Fontshare, or platform system fonts. Do not bundle SF Pro, Segoe or other licensed system fonts on platforms where they are not the system font.

| Feel | Display | Body | Mono |
|---|---|---|---|
| Precise, technical | Inter Tight | Inter | JetBrains Mono |
| Neutral product | Geist | Geist | Geist Mono |
| Enterprise, sober | IBM Plex Sans | IBM Plex Sans | IBM Plex Mono |
| Warm, friendly | Fraunces | Nunito Sans | DM Mono |
| Editorial, literate | Newsreader | Source Serif 4 | IBM Plex Mono |
| Bold, modern brand | Clash Display (Fontshare) | Satoshi (Fontshare) | JetBrains Mono |
| Playful, rounded | Bricolage Grotesque | Nunito | Space Mono |
| Luxury, calm | Cormorant Garamond | Manrope | DM Mono |
| Geometric, confident | Space Grotesk | Manrope | Space Mono |
| Humanist, accessible | Atkinson Hyperlegible Next | Atkinson Hyperlegible Next | Atkinson Hyperlegible Mono |
| Commerce, clear | Plus Jakarta Sans | Plus Jakarta Sans | Roboto Mono |
| Multilingual | Noto Sans (display weight) | Noto Sans | Noto Sans Mono |

Inter and Roboto are fine when chosen on purpose, not as a default. Two families is usually enough; three only if mono is needed.

Native apps: default to the system font (SF Pro on Apple, Roboto or the OEM font on Android, Segoe UI Variable on Windows) and use the brand face for display sizes only. Users expect system text in native apps.

### Type scale

Base 16px web, 17pt iOS body, 14 to 16sp Android body. Ratio 1.2 for dense product UI, 1.25 for general, 1.333 for marketing pages. Define:

| Token | Use | Size (1.25 ratio, 16 base) | Line height | Weight |
|---|---|---|---|---|
| `display` | Hero, marketing | 48 to 61 | 1.05 | 600 to 700 |
| `headline` | Page titles | 31 to 39 | 1.15 | 600 |
| `title` | Section titles | 25 | 1.25 | 600 |
| `title-sm` | Card titles | 20 | 1.3 | 600 |
| `body-lg` | Lead paragraph | 18 | 1.55 | 400 |
| `body` | Default | 16 | 1.5 | 400 |
| `body-sm` | Dense UI, secondary | 14 | 1.45 | 400 |
| `label` | Buttons, inputs | 14 to 15 | 1.2 | 500 to 600 |
| `caption` | Meta, helper text | 12 to 13 | 1.35 | 400 to 500 |
| `code` | Mono | 0.9em | 1.5 | 400 |

Letter spacing: tighten display sizes by -0.01 to -0.03em, loosen all caps labels by +0.04 to +0.08em. Use `font-variant-numeric: tabular-nums` for numbers in tables and prices. Line length 45 to 75 characters for reading text.

## 3. Shape

Pick a radius personality from the brief, then vary it by size. Do not put one radius on everything.

| Personality | Small (chips, inputs) | Medium (cards, buttons) | Large (sheets, dialogs) |
|---|---|---|---|
| Sharp, precise | 2 | 4 | 8 |
| Balanced | 6 | 8 to 10 | 16 |
| Soft, friendly | 8 | 12 to 14 | 24 to 28 |
| Pill | full | full for buttons, 16 cards | 28 |

Nested radius rule: inner radius = outer radius minus padding. Borders 1px default, 1.5 to 2px for focus and selected. On high density screens, hairline borders (0.5px) only on Apple platforms.

## 4. Depth

Pick one depth language and stick to it:
- **Shadow** (Apple, Polaris): soft, layered, low opacity, tinted toward neutral hue.
- **Tonal** (Material 3): higher surfaces get lighter or tinted, almost no shadow.
- **Border** (Linear, Vercel, Carbon): flat surfaces separated by 1px borders, shadow only for floating layers.
- **Material** (Apple vibrancy, Fluent Mica and Acrylic): translucent blur for chrome only (nav bars, sidebars, menus), never for content cards.

Elevation tokens: `0` flat, `1` raised card, `2` dropdown and popover, `3` sheet and dialog, `4` toast. Define each as shadow plus surface color.

## 5. Motion

| Token | Duration | Use |
|---|---|---|
| `instant` | 100ms | Hover, press feedback |
| `fast` | 150 to 200ms | Small state changes, toggles |
| `base` | 250 to 300ms | Panels, menus, most transitions |
| `slow` | 400 to 500ms | Large surfaces, page transitions |

Pick patterns (image sequence, parallax, shared element, micro-interactions and more) from [motion](motion.md).

Easings: `standard` cubic-bezier(0.2, 0, 0, 1), `enter` cubic-bezier(0, 0, 0, 1), `exit` cubic-bezier(0.3, 0, 1, 1). On Apple platforms prefer springs (response 0.35 to 0.5, damping 0.8 to 1). Respect reduced motion: replace movement with fades or nothing.

## 6. Iconography

Pick one set, one style (outline or filled, with filled for selected state), one stroke weight that matches the body text weight.

| Platform or feel | Set |
|---|---|
| Apple native | SF Symbols |
| Android, Google | Material Symbols (Rounded, Outlined or Sharp to match radius personality) |
| Windows | Fluent System Icons |
| Enterprise | Carbon icons |
| Web, neutral | Lucide, Phosphor, Tabler |
| Web, distinctive | Phosphor duotone, or a small custom set |

Never emojis as icons. Icon-only buttons need an accessible label and, outside of well known icons, a visible text label too.

## 7. Imagery and illustration

Decide: photography, illustration, both, or neither. Write rules: subject, crop, color treatment (duotone with primary, natural, desaturated), aspect ratios. For illustration, choose a style that fits the feel:
- Technical, explanatory: isometric figures via `anatomy`
- Light, interactive, playful technical: line figures via `hairline-create`
- Existing logo or icon to animate: `hairline-adopt`

## 8. Logo and app icon direction

Give direction, not a final logo: concept (what idea it expresses), construction (wordmark, monogram, symbol), which palette colors, minimum size, clear space, app icon grid per platform (iOS squircle mask, Android adaptive icon 108dp with 66dp safe zone, Windows tile), favicon at 16, 32 and SVG. Recommend a designer for the final mark when the brand matters.

## 9. Voice and tone

Three voice traits with "this, not that" examples. Rules for all copy:
- Sentence case for titles and buttons
- Buttons say what happens: "Save changes", not "Submit"
- Errors say what happened and how to fix it, no blame
- No emojis, no em dashes, no exclamation marks in errors
- Numbers as digits, dates in the user's locale
