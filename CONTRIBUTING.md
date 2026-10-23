# Contributing

Thanks for helping. Keep changes small and focused.

## Ground rules

- No emojis and no em dashes in any file. `npm run lint` checks this and CI fails on it.
- Plain, specific language. Every rule should say what to do, not just what to avoid.
- Do not copy text from proprietary design system docs. Describe principles in your own words.
- Scripts stay zero dependency Node 18+.

## Layout

- `skills/designed/SKILL.md`: the entry point. Keep it under 200 lines, route to references.
- `skills/designed/references/`: detail files.
- `skills/designed/scripts/`: contrast and drift checkers with `test.mjs`.
- `bin/install.js`, `install.sh`: installers.
- `examples/`: sample projects made with the skill.

## Adding a flavor

1. Add a section to `references/flavors.md` with: Identity, Signature moves, Overrides table, Do, Do not.
2. Add it to the mode list in `SKILL.md` step 2 and to the decision table in `references/discovery.md`.

## Adding an industry preset

Add a section to `references/presets.md` with: Mode, Density, Palette mood, Type, Patterns, Trust or compliance notes.

## Adding a companion skill

Add a row to the table in `SKILL.md`, and an install source plus hand-off note in `references/companions.md`. Verify the install command works.

## Before opening a PR

```
npm test
npm run lint
```

Bump `version` in `package.json`, `.claude-plugin/plugin.json` and `gemini-extension.json` together, and add a CHANGELOG entry.
