# Companion skills

`designed` leads, companions do specialised work. Before handing off, give the companion: the brief, the mode or flavor, tokens.json (or the relevant part), and the hard rules (no emojis, no em dashes, no AI look, tokens only). After, check its output against designed.md and fix drift.

## Checking if a companion is installed

1. Look in the session's available skill list (plugin skills appear as `plugin:skill`).
2. Otherwise check the agent's skills folders: `~/.claude/skills/`, `./.claude/skills/`, `~/.agents/skills/`, `~/.codex/skills/`, `~/.gemini/extensions/`.
3. Connectors (Canva, Figma, SpriteShip) count as installed when their tools are available in the session.

## Asking to download

Ask once per missing skill per session, and batch them when several are missing at the start:

> This step works better with `anatomy` and `dataviz`, which are not installed. Do you want to download them?

On yes, run the install command from the table (Claude Code plugin commands are typed by the user in the prompt, so give the exact command if you cannot run it). On no, continue with this skill's own guidance.

## Install sources

| Skill | Install | Notes |
|---|---|---|
| `frontend-design` | `/plugin install frontend-design@claude-plugins-official` | Claude Code plugin |
| `superpowers` (brainstorming) | `/plugin install superpowers@claude-plugins-official` | Claude Code plugin |
| `figma` skills | `/plugin install figma@claude-plugins-official` | Also needs the Figma connector |
| `expo` skills | `/plugin install expo@claude-plugins-official` | |
| `vercel` skills (shadcn, nextjs, react-best-practices, verification) | `/plugin install vercel@claude-plugins-official` | |
| `chrome-devtools-mcp` (a11y-debugging, debug-optimize-lcp) | `/plugin install chrome-devtools-mcp@claude-plugins-official` | |
| `cloudflare` (web-perf) | `/plugin install cloudflare@claude-plugins-official` | |
| `playground` | `/plugin install playground@claude-plugins-official` | |
| `playwright` | `/plugin install playwright@claude-plugins-official` | Browser screenshots |
| `code-review`, `code-simplifier` | `/plugin install code-review@claude-plugins-official` | |
| `anatomy` | `npx skills add wheresryan22/anatomy` | |
| `hairline-create`, `hairline-adopt` | `npx skills add lucasmarkes/hairline` | Uses the `@lucasmarkes/hairline` engine |
| `impeccable` | `npx skills add pbakaus/impeccable` | |
| `hyperframes`, `hyperframes-animation`, `media-use` | `npx skills add heygen-com/hyperframes` | |
| `brag` | `npx skills add latent-spaces/brag` | Needs hyperframes |
| `graphify` | `uv tool install graphifyy`, then follow its setup | Python tool plus skill |
| `find-skills` | `npx skills add vercel-labs/skills` | Search for anything not listed |
| `dataviz`, `artifact-design`, `artifact-diagramming` | Built into Claude Code with Artifacts | No install, skip if absent |
| `gemini-ai-visual-design` | `npx skills find gemini visual design` | Source varies |
| Canva, Figma, SpriteShip connectors | Connect in claude.ai connector settings or `claude mcp add` | Auth needed |

Unknown source: `npx skills find <name>` and show the user the top result before installing.

## Hand-off notes

**frontend-design** (step 3). Ask for an aesthetic direction that fits the brief's feel words. Take its type and layout ideas, then normalise into the token system here. Reject any suggestion on the AI-look list.

**gemini-ai-visual-design** (step 3). Only for AI assistant products or when asked. Use its gradient and shape language for the AI surfaces (assistant panel, generating state), keep the rest on the core system.

**superpowers:brainstorming** (step 1). Use when the idea is a sentence or less. Its output feeds the brief.

**graphify** (step 1). Map routes, screens and shared components in a big repo before audit or discovery.

**anatomy** (steps 3, 6). Isometric explainer figures for landing pages and docs. Pass palette primitives (primary, neutral, accent) as its four tone shading colors and the brand fonts for its card labels.

**hairline-create / hairline-adopt** (steps 3, 6). Interactive line figures for hero spots, empty states, feature sections. Pass stroke color from `text` or `primary`, background from `bg`. Use adopt when the user has a logo or icon SVG.

**artifact-diagramming** (steps 3, 6). Sitemaps, user flows, journey maps for the brief and designed.md.

**artifact-design** (step 4). When the user wants the demo as a shareable link.

**playground** (step 4). An interactive page to tune palette, radius and type scale live; write the chosen values back to tokens.json.

**figma-generate-library / figma-generate-design** (steps 4, 6). Build variables and components in Figma from tokens.json; lay out key screens. **figma-design-to-code** when the user starts from a Figma file: extract its tokens first, then reconcile with designed.md.

**dataviz** (step 6). All charts. Pass the categorical and sequential palettes derived from brand scales, and run its validator.

**Stack skills** (step 6). `shadcn`, `nextjs`, `react-best-practices`, `expo-ui`, `expo-native-ui`, `expo-design-system`, `figma-swiftui`: use when the stack matches. Map tokens into their theme system (see [platforms](platforms.md)).

**Motion skills** (step 6). `hyperframes-animation`, `expo-animation`, `figma-implement-motion`: pass motion tokens (durations, easings). `figma-shaders`: only for the signature detail, never as background noise.

**SpriteShip connector** (step 6, games). Create a UI pack with the palette and fonts; review generated components against the brand.

**Verification** (step 7). `run` or `vercel:verification` to launch, Playwright or Chrome DevTools to screenshot each key screen in light and dark at 390px and 1440px. `a11y-debugging` for accessibility, `debug-optimize-lcp` and `web-perf` for font and image weight.

**impeccable, code-review, simplify** (step 7). Critique and polish. Feed findings back into designed.md if they change a rule.

**hyperframes, brag, media-use** (after ship). Launch video and media in the brand: pass palette, fonts, motion tokens and voice.
