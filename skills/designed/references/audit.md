# Audit (`/designed audit`)

Turn an existing product's real UI into a draft designed.md and tokens.json. Read only until the user approves.

## 1. Find design sources

| Stack | Look at |
|---|---|
| Web | `*.css`, `*.scss`, `*.module.css`, `tailwind.config.*`, `@theme` blocks, CSS-in-JS theme files (`theme.ts`, `styled.ts`, `stitches.config.*`), `components/ui/*`, `globals.css`, font imports in layout files |
| iOS | `Assets.xcassets/*.colorset`, `Color+*.swift`, `Font+*.swift`, `Theme.swift` |
| Android | `res/values/colors.xml`, `themes.xml`, `ui/theme/Color.kt`, `Type.kt`, `Shape.kt` |
| React Native | `theme.ts`, `StyleSheet.create` calls, `tamagui.config.*`, `nativewind` config |
| Flutter | `ThemeData`, `ColorScheme`, `lib/theme/*` |
| Any | Logo and icon files, `public/`, `assets/`, fonts folders |

For large repos, use `graphify` (if installed) or targeted grep.

## 2. Collect values

Run the drift script in report mode to list every raw value with locations:

```
node <skill>/scripts/drift.mjs --report <src dir>
```

It prints colors, font families and px values with counts and file:line. Then also collect by reading: radii, shadows, breakpoints, z-index scale, durations and easings, component list (buttons, inputs, cards, modals) with their variants.

## 3. Cluster and clean

- Colors: convert to OKLCH, group values within a small distance (about 0.02 in L and 0.01 in C, same hue within 5 degrees). The most used value in a group is the canonical one. Map groups onto scales (50 to 950) by lightness.
- Spacing: snap to the 4px grid, list values that do not fit.
- Type: list every size and weight combination in use, map to the scale tokens, flag one-offs.
- Radii and shadows: same clustering.

## 4. Report

```
# Design audit: <project>

Summary: <colors found> colors in <groups> groups, <n> font sizes, <n> spacing values, <n> radii.

Inconsistencies
| Issue | Examples (file:line) | Suggested fix |
|---|---|---|
| 7 near-identical grays | ... | Collapse to neutral-500 |

Contrast failures
| Pair | Ratio | Fix |

AI-look tells present
| Tell | Where | Fix |

Proposed tokens: (summary table)
```

## 5. Confirm the brief

Audit replaces most of discovery, not all of it. Draft the brief from the code (template in [discovery](discovery.md#4-brief-template)), mark the fields you could not infer, and ask only those. Get a yes on the brief.

## 6. Write and continue

Show the report and brief. Ask: "Do you want me to write designed.md and tokens.json from this?" Only write on yes. Mark the designed.md changelog entry as "Created from audit". Then offer a migration: replace raw values in code with tokens, file by file, starting with the most used components.

After writing, continue from step 4 of the main flow (offer a demo). In step 5, update this designed.md with any demo changes and add the pointer; do not recreate it.
