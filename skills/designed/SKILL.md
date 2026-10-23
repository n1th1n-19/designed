---
name: designed
description: Plans and builds UI/UX for any app or website on any platform (web, iOS, Android, desktop, cross-platform) using one design system that combines Apple HIG, Material 3, Samsung One UI, Fluent 2, IBM Carbon, Shopify Polaris, Atlassian and the Linear/Vercel/Stripe style, with switchable flavors. Starts with product discovery, then builds a full brand kit (palette, fonts, icons, tokens), offers a demo, and writes designed.md as the project's design source of truth. Use when the user asks to design, plan, style, theme or build UI, screens, a design system, brand colors or fonts, when they run /designed (brand, demo, sync, audit), or whenever a project contains designed.md and any UI work is requested.
---

# designed

One design system built from the best parts of the big ones, applied only after the product is understood, recorded in `designed.md` so every later session and every agent builds the same way.

## Hard rules

1. **Discovery before design.** No palette, layout, token or component until the product idea is understood. See [discovery](references/discovery.md).
2. **Designed by a human, not by AI.** Ban the default AI look. Every choice must trace back to the brief. See the anti-pattern list in [patterns](references/patterns.md#the-ai-look-and-how-to-avoid-it).
3. **No emojis and no em dashes.** Not in UI, copy, `designed.md`, the demo, commit messages, or replies about the design. Use a real icon set and plain punctuation (commas, periods, colons; en dash only for numeric ranges).
4. **`designed.md` is the source of truth** once it exists. `tokens.json` beside it is the machine copy. Never invent tokens, colors, fonts or patterns outside them. If something new is needed, update both first, then build.

## Subcommands

Read the first word after `/designed`:

| Command | Does |
|---|---|
| `/designed` or `/designed <idea>` | Full flow below |
| `/designed brand` | Steps 1 to 3 only, outputs the brand kit and tokens.json |
| `/designed demo` | Builds or rebuilds the demo from current designed.md and tokens.json |
| `/designed sync` | After design changes: update designed.md and tokens.json, add a changelog line, run the drift check |
| `/designed audit` | Reverse-engineer an existing codebase into a draft designed.md. See [audit](references/audit.md) |

## Workflow (strict order)

**0. Look for `designed.md`** in the project root. If it exists, read it fully and `tokens.json`, then go to step 6. Do not redesign what is already decided.

**1. Discovery.** Read README, package files, routes and existing screens first. Then ask the user only what is still unknown: product, users, core job, platforms, tone, content, constraints. Research 3 to 5 competitors with web search when available. If the idea is vague, use `superpowers:brainstorming` if installed. Write a short brief using the template in [discovery](references/discovery.md). Check [presets](references/presets.md) for the industry starting point.

**2. Pick a mode.** Unified by default ([core](references/core.md)). Switch to a flavor ([flavors](references/flavors.md)) when the brief calls for it: native iOS feel, Android-first, Windows app, dense enterprise data, commerce admin, dark developer tool. Say which one and why in one line.

**3. Brand kit and design plan.** Follow [brand](references/brand.md). Output everything the project needs:
- Palette: primary, secondary, accent, neutral ramp, success, warning, error, info. Each a tonal scale 50 to 950 in OKLCH with hex, light and dark role mapping.
- Typography: display, body, mono with reasons, free sources, fallbacks, full type scale.
- Spacing, radii, borders, elevation, materials, motion, grid, breakpoints.
- Icon set, imagery and illustration direction, logo and app icon direction, voice and tone.
- Components with states ([components](references/components.md)), navigation, key screens.
Generate the color scales with `node <skill>/scripts/palette.mjs --primary <hue:chroma> --accent <hue:chroma> --out tokens.json`, add type, space, radius and motion tokens to the same file (W3C Design Tokens format), then run `node <skill>/scripts/contrast.mjs tokens.json`. Fix every failure before moving on.

**4. Ask about a demo.** Ask exactly: "Do you want to see a demo of the design first?" If yes, build it per [demo](references/demo.md), show it, and iterate until the user approves. If no, continue.

**5. Write `designed.md`** in the project root from [the template](references/designed-template.md). Then add the pointer section to `CLAUDE.md` (create it if missing) and to `AGENTS.md`, `GEMINI.md`, `.cursorrules` when they exist. Skip any file that already has the pointer.

**6. Build.** Generate platform code from tokens.json using [platforms](references/platforms.md). Call companion skills where they fit (table below).

**7. Review.** Run the checklist below, `node <skill>/scripts/drift.mjs tokens.json <src dir>`, then `impeccable` for critique and polish if installed.

`<skill>` is the folder this SKILL.md lives in.

## Decision tree

- Brand new product, no code → full flow
- Existing product with UI but no designed.md → `/designed audit`, then continue from step 4
- designed.md exists, new screen or component → step 0, then 6 and 7
- User asks for "Apple style", "Material", "Windows", etc. → step 2 flavor, still do discovery first
- Charts or dashboards → core plus `dataviz` companion
- Game → [presets](references/presets.md#game) and the SpriteShip companion for UI packs
- Right-to-left or multiple languages → [patterns](references/patterns.md#rtl-and-i18n)

## Companion skills

`designed` leads. It hands work to other skills at the right step and passes them the tokens and brief so output stays on brand. Full details and install sources in [companions](references/companions.md).

| Step | Companion | Use for |
|---|---|---|
| 1 | `superpowers:brainstorming` | Shaping a vague idea |
| 1 | `graphify` | Mapping a large existing codebase |
| 3 | `frontend-design` | Aesthetic direction and type choices that avoid templates |
| 3 | `gemini-ai-visual-design` | AI assistant products |
| 3 | Canva connector | Existing Canva brand kit, or brand assets in Canva |
| 3, 6 | `anatomy` | Isometric explainer illustrations and diagrams |
| 3, 6 | `hairline-create`, `hairline-adopt` | Interactive isometric line figures, or turning an SVG into one |
| 3, 6 | `artifact-diagramming` | Flows, sitemaps, user journeys |
| 4 | `artifact-design`, `playground` | Shareable demo page, interactive token tuning |
| 4, 6 | `figma-generate-design`, `figma-generate-library`, `figma-design-to-code` | Figma in or out |
| 6 | `dataviz` | Charts, KPI tiles, dashboards |
| 6 | `shadcn`, `nextjs`, `react-best-practices`, `expo-ui`, `expo-design-system`, `expo-native-ui`, `figma-swiftui` | Matching stack |
| 6 | `hyperframes-animation`, `expo-animation`, `figma-implement-motion`, `figma-shaders` | Motion and signature effects |
| 6 | SpriteShip connector | Game UI packs |
| 7 | `run`, `verification`, Playwright or Chrome DevTools | Screenshots: light, dark, phone, desktop |
| 7 | `a11y-debugging`, `debug-optimize-lcp`, `web-perf` | Accessibility and performance |
| 7 | `impeccable`, `code-review`, `simplify` | Critique and cleanup |
| After | `hyperframes`, `brag`, `media-use` | Launch video and media |

**Missing companions.** Before a step that needs one, check it exists (the session's skill list, or the agent's skills folder: `~/.claude/skills`, `~/.codex/skills`, `~/.gemini/extensions`). If missing, ask once: "This step works better with `<skill>`, which is not installed. Do you want to download it?" If several are missing, ask about them together in one question. On yes, install from the source in [companions](references/companions.md) and continue. On no, use this skill's own guidance and do not ask again this session. Companions follow the hard rules too.

## Pre-ship checklist

- [ ] Every screen uses only tokens from tokens.json, drift check is clean
- [ ] Contrast script passes, focus states visible, touch targets 44pt / 48dp minimum
- [ ] Works in light and dark, at 320px wide and at desktop width
- [ ] Dynamic type or browser zoom to 200 percent does not break layout
- [ ] Reduced motion respected
- [ ] Empty, loading, error and success states exist for every data view
- [ ] Real copy, no lorem ipsum, no emojis, no em dashes
- [ ] None of the AI-look anti-patterns present
- [ ] Platform conventions kept (back gesture, safe areas, native controls where expected)
- [ ] designed.md changelog updated if anything changed
