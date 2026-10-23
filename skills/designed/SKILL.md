---
name: designed
description: Plans and builds UI/UX and design systems for web, iOS, Android and desktop apps. Use when the user asks to design, redesign, style, theme or polish any UI, screen, page, landing page, website, app or component; to choose a color palette, fonts, icons, logo or app icon direction; to set up design tokens, dark mode, or a Tailwind or CSS theme; to add animation, micro-interactions, page transitions, parallax, scroll effects or image sequences; to fix visual consistency or contrast; when they run /designed (brand, demo, sync, audit); and always when the project has a designed.md file and any UI, style or copy work is requested. Combines Apple HIG, Material 3, One UI, Fluent 2, Carbon, Polaris, Atlassian and the Linear/Vercel/Stripe style with switchable flavors, starts with product discovery, and records every decision in designed.md.
---

# designed

One design system built from the best parts of the big ones, applied only after the product is understood, recorded in `designed.md` so every later session and every agent builds the same way.

`<skill>` below means the absolute path of the folder this SKILL.md lives in. Resolve it before running any script.

## Hard rules

1. **Discovery before design.** No palette, layout, token or component until the product idea is understood and the user has said yes to the brief. See [discovery](references/discovery.md).
2. **Designed by a human, not by AI.** Ban the default AI look. Every choice must trace back to the brief. See the anti-pattern list in [patterns](references/patterns.md#the-ai-look-and-how-to-avoid-it).
3. **No emojis and no em dashes.** Not in UI, copy, `designed.md`, the demo, commit messages, or replies about the design. Use a real icon set and plain punctuation (commas, periods, colons). Write ranges with "to" (50 to 950).
4. **`designed.md` is the source of truth** once it exists. `tokens.json` beside it is the machine copy. Never invent tokens, colors, fonts or patterns outside them. If something new is needed, update both first, then build.

## Subcommands

Read the first word after `/designed`:

| Command | Does | If designed.md already exists |
|---|---|---|
| `/designed` or `/designed <idea>` | Full flow below | Step 0 applies: build on it |
| `/designed brand` | Steps 1 to 3, then writes tokens.json and a draft designed.md (brief and brand sections) so nothing is lost | Ask whether to revise the existing brand or start over |
| `/designed demo` | Builds or rebuilds the demo per [demo](references/demo.md) | Uses it as is |
| `/designed sync` | After design changes: update designed.md and tokens.json, add a changelog line, run the drift check | Required |
| `/designed audit` | Reverse-engineer an existing codebase into a draft designed.md. See [audit](references/audit.md) | Audit against it and report drift instead |

`/designed demo` with no tokens.json: say so and offer `/designed brand` first.

## Workflow (strict order)

**0. Look for `designed.md`** in the project root. If it exists, read it fully and `tokens.json`, then go to step 6. Do not redesign what is already decided.

**1. Discovery.** Read README, package files, routes and existing screens first. Then ask the user only what is still unknown: product, users, core job, platforms, tone, content, constraints. Research 3 to 5 competitors with web search when available. If the idea is vague, use `superpowers:brainstorming` if installed. Write a short brief using the template in [discovery](references/discovery.md). Check [presets](references/presets.md) for the industry starting point. Show the brief and get the user's yes before step 2.

**2. Pick a mode.** Unified by default ([core](references/core.md)). Switch to a flavor ([flavors](references/flavors.md)) when the brief calls for it: native iOS feel, Android-first, Windows app, dense enterprise data, commerce admin, dark developer tool. Say which one and why in one line. A flavor's values override core.

**3. Brand kit and design plan.** Follow [brand](references/brand.md). Output everything the project needs:
- Palette: primary, secondary, accent, neutral ramp, success, warning, error, info. Each a tonal scale 50 to 950 in OKLCH with hex, light and dark role mapping.
- Typography: display, body, mono with reasons, free sources, fallbacks, full type scale.
- Spacing, radii, borders, elevation, materials, grid, breakpoints.
- Motion: tokens, a one line motion language, and the animation patterns this product uses, each with its job and reduced motion alternative ([motion](references/motion.md)).
- Icon set, imagery and illustration direction, logo and app icon direction, voice and tone.
- Components with states ([components](references/components.md)), navigation, key screens.

Generate the color scales with `node <skill>/scripts/palette.mjs --primary <hue:chroma> --accent <hue:chroma> --out tokens.json`. Add type, space, radius and motion tokens to the same file in the exact shapes shown in [core](references/core.md#token-shapes). Then run `node <skill>/scripts/contrast.mjs tokens.json` and fix every failure before moving on.

**4. Ask about a demo.** Ask exactly: "Do you want to see a demo of the design first?" If yes, build it per [demo](references/demo.md), show it, and iterate until the user approves. If no, continue.

**5. Write `designed.md`** in the project root from [the template](references/designed-template.md). If a draft already exists (from `/designed brand` or audit), update it with the final values instead of recreating it. Then add the pointer section from the template to `CLAUDE.md` (create it if missing) and to `AGENTS.md`, `GEMINI.md` and `.cursor/rules/designed.mdc` when those exist or the project uses that agent. Skip any file that already has a `## Design system` heading.

**6. Build.** Generate platform code from tokens.json using [platforms](references/platforms.md), and animations from [motion](references/motion.md). Call companion skills where they fit (table below).

**7. Review.** Run the checklist below, `node <skill>/scripts/drift.mjs tokens.json <src dir>`, then `impeccable` for critique and polish if installed.

## Decision tree

- Brand new product, no code: full flow
- Existing product with UI but no designed.md: `/designed audit` (it includes a brief check), then continue from step 4
- designed.md exists, new screen or component: step 0, then 6 and 7
- User asks for "Apple style", "Material", "Windows" and so on: step 2 flavor, still do discovery first
- Charts or dashboards: core plus the `dataviz` companion
- Game: [presets](references/presets.md#game) and the SpriteShip connector for UI packs
- Animation, scroll effects, image sequences, parallax, page transitions: [motion](references/motion.md)
- Right-to-left or multiple languages: [patterns](references/patterns.md#rtl-and-i18n)

## Companion skills

`designed` leads. It hands work to other skills at the right step and passes them the tokens and brief so output stays on brand. Names, install sources and hand-off notes are in [companions](references/companions.md).

| Step | Companion | Use for |
|---|---|---|
| 1 | `superpowers:brainstorming` | Shaping a vague idea |
| 1 | `graphify` | Mapping a large existing codebase |
| 3 | `frontend-design:frontend-design` | Aesthetic direction and type choices that avoid templates |
| 3 | `gemini-ai-visual-design` | AI assistant products |
| 3 | Canva connector | Existing Canva brand kit, or brand assets in Canva |
| 3, 6 | `anatomy` | Isometric explainer illustrations and diagrams |
| 3, 6 | `hairline-create`, `hairline-adopt` | Interactive isometric line figures, or turning an SVG into one |
| 3, 6 | `artifact-diagramming` | Flows, sitemaps, user journeys |
| 4 | `artifact-design`, `playground:playground` | Shareable demo page, interactive token tuning |
| 4, 6 | `figma:figma-generate-design`, `figma:figma-generate-library`, `figma:figma-design-to-code` | Figma in or out |
| 6 | `dataviz` | Charts, KPI tiles, dashboards |
| 6 | `vercel:shadcn`, `vercel:nextjs`, `vercel:react-best-practices`, `expo:expo-ui`, `expo:expo-design-system`, `expo:expo-native-ui`, `figma:figma-swiftui` | Matching stack |
| 6 | `hyperframes-animation`, `expo:expo-animation`, `figma:figma-implement-motion`, `figma:figma-shaders` | Motion and signature effects |
| 6 | SpriteShip connector | Game UI packs |
| 7 | `run`, `vercel:verification`, Playwright or Chrome DevTools | Screenshots: light, dark, 320, 390 and 1440 wide |
| 7 | `chrome-devtools-mcp:a11y-debugging`, `chrome-devtools-mcp:debug-optimize-lcp`, `cloudflare:web-perf` | Accessibility and performance |
| 7 | `impeccable`, `code-review`, `simplify` | Critique and cleanup |
| After | `hyperframes`, `brag`, `media-use` | Launch video and media |

**Missing companions.** At the start of step 1, once the stack and needs are clear, check only the companions whose use matches this project (its stack, charts, game, Figma, illustrations). Check the session's skill list and the skills folders listed in [companions](references/companions.md#checking-if-a-companion-is-installed). Ask once, about all missing ones together: "These steps work better with `<a>` and `<b>`, which are not installed. Do you want to download them?" On yes, install from the sources in companions and continue. On no, use this skill's own guidance and do not ask again this session. Companions follow the hard rules too.

## Pre-ship checklist

- [ ] Every screen uses only tokens from tokens.json, drift check is clean
- [ ] Contrast script passes, focus states visible, touch targets 44pt / 48dp minimum
- [ ] Works in light and dark, at 320, 390 and 1440 wide
- [ ] Dynamic type or browser zoom to 200 percent does not break layout
- [ ] Reduced motion respected, every animation has a job and holds 60fps on a mid range phone
- [ ] Empty, loading, error and success states exist for every data view
- [ ] Real copy, no lorem ipsum, no emojis, no em dashes
- [ ] None of the AI-look anti-patterns present
- [ ] Platform conventions kept (back gesture, safe areas, native controls where expected)
- [ ] designed.md changelog updated if anything changed
