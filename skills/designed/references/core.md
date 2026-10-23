# Core system (unified mode)

The default system. Each choice names the system it was taken from and why. Flavors in [flavors](flavors.md) override parts of this.

## Principles

| Principle | Source | Meaning in practice |
|---|---|---|
| Clarity, deference, depth | Apple HIG | Content first, chrome steps back, depth shows hierarchy |
| Personal, adaptive color | Material 3 | Color roles, not raw colors, so themes and dynamic color work |
| Reachability | Samsung One UI | On phones, viewing area at top, interaction area at bottom |
| Calm, coherent across devices | Fluent 2 | Same tokens everywhere, platform-native controls |
| Productive vs expressive | IBM Carbon | Dense tools and expressive marketing use different type sets |
| Merchant-first clarity | Shopify Polaris | One primary action per screen, plain language |
| Bold, optimistic, practical | Atlassian | Inline editing, status shown with color plus text |
| Craft and speed | Linear, Vercel, Stripe | Keyboard first, fast feedback, sweated details |

## Token structure

Three layers. Only layer 3 appears in components.

1. **Primitive**: `color.primary.600`, `space.4`, `radius.md`. Raw values.
2. **Semantic**: `color.text`, `color.surface-raised`, `space.inset-md`. Roles mapped to primitives, per theme.
3. **Component**: `button.primary.bg`, `card.padding`. Optional, only when a component needs to differ from the semantic default.

Stored in `tokens.json` using the W3C Design Tokens format:

```json
{
  "color": {
    "primary": {
      "600": { "$type": "color", "$value": "#2f5bd3", "$extensions": { "oklch": "oklch(0.545 0.16 262)" } }
    }
  },
  "theme": {
    "light": {
      "text": { "$type": "color", "$value": "{color.neutral.900}" },
      "bg":   { "$type": "color", "$value": "{color.neutral.50}" }
    },
    "dark": {
      "text": { "$type": "color", "$value": "{color.neutral.50}" },
      "bg":   { "$type": "color", "$value": "{color.neutral.950}" }
    }
  },
  "contrast": [
    ["text", "bg"], ["text-muted", "bg"], ["text", "surface"], ["on-primary", "primary"]
  ]
}
```

The `contrast` array lists the foreground/background role pairs the contrast script checks in every theme. Add every pair the UI actually uses. An optional third value sets the minimum ratio (default 4.5), e.g. `["focus-ring", "bg", 3]`.

### Token shapes

Use exactly these shapes so the scripts can read them. `palette.mjs` writes `color`, `theme` and `contrast`; add the rest by hand.

```json
{
  "font": {
    "display": { "$type": "fontFamily", "$value": ["Fraunces", "Georgia", "serif"] },
    "body":    { "$type": "fontFamily", "$value": ["Inter", "system-ui", "sans-serif"] }
  },
  "type": {
    "body": { "$type": "typography", "$value": { "fontFamily": "{font.body}", "fontSize": "16px", "lineHeight": 1.5, "fontWeight": 400 } }
  },
  "space":  { "4": { "$type": "dimension", "$value": "16px" } },
  "radius": { "md": { "$type": "dimension", "$value": "12px" } },
  "motion": {
    "duration": { "base": { "$type": "duration", "$value": "250ms" } },
    "easing":   { "standard": { "$type": "cubicBezier", "$value": [0.2, 0, 0, 1] } }
  }
}
```

Dimensions may also be written as `{ "value": 16, "unit": "px" }` (newer spec) and font families as one comma separated string; the scripts accept both. Values in `rem` count as 16px per rem.

## Color

Built per [brand](brand.md#1-color). Rules:
- Color carries meaning only together with text or icon (Atlassian lozenge rule): never color alone for status.
- One primary action color per screen.
- Accent under 5 percent of any screen.
- Dynamic color (Material You) is optional: if enabled on Android, keep brand color for the logo and key actions.

## Typography

Built per [brand](brand.md#2-typography). Two sets, from Carbon:
- **Productive**: app screens, tables, forms. Ratio 1.2, tighter line heights, `body-sm` 14 is common.
- **Expressive**: marketing, onboarding, empty states. Ratio 1.25 to 1.333, larger display.

Support user text scaling: web uses `rem`, iOS Dynamic Type text styles, Android `sp`, Windows text scaling.

## Spacing

4px base, 8px rhythm (Material, Carbon, Apple all align here).

| Token | px |
|---|---|
| `space.0` | 0 |
| `space.1` | 4 |
| `space.2` | 8 |
| `space.3` | 12 |
| `space.4` | 16 |
| `space.5` | 20 |
| `space.6` | 24 |
| `space.8` | 32 |
| `space.10` | 40 |
| `space.12` | 48 |
| `space.16` | 64 |
| `space.20` | 80 |
| `space.24` | 96 |

Group related things tight, separate groups loosely: spacing inside a group should be at most half the spacing between groups. Uneven spacing that follows hierarchy reads as designed; equal spacing everywhere reads as generated.

Screen margins: 16 phone, 24 tablet, 32 to 48 desktop. iOS uses 16 or 20 depending on device, keep system margins in native apps.

## Layout and breakpoints

Window size classes from Material 3, grid from Carbon:

| Class | Width | Columns | Gutter | Typical navigation |
|---|---|---|---|---|
| compact | under 600 | 4 | 16 | Bottom tab bar |
| medium | 600 to 839 | 8 | 24 | Navigation rail |
| expanded | 840 to 1199 | 12 | 24 | Rail or sidebar |
| large | 1200 to 1599 | 12 | 32 | Sidebar |
| extra-large | 1600 and up | 16 | 32 | Sidebar plus detail pane |

Content max width 1200 to 1440 for apps, 680 to 760 for reading. Use container queries for components, media queries for page structure.

## Shape, depth, motion

Built per [brand](brand.md#3-shape). Unified default: balanced radius, border depth language for web apps, shadow for consumer, material blur only on chrome.

## Interaction

- Touch targets: 44 by 44pt (Apple), 48 by 48dp (Material, One UI). Visual size can be smaller, hit area cannot.
- Pointer targets: 32px minimum for dense desktop (Carbon, Fluent compact), 24px absolute minimum (WCAG 2.2 target size).
- Focus: visible 2px ring with 2px offset in `focus-ring`, never removed. Use `:focus-visible` on web.
- Feedback within 100ms for every press. Optimistic updates where undo is possible (Linear).
- Keyboard: every action reachable, logical tab order, command menu (Cmd/Ctrl K) for apps with more than 10 actions.
- Destructive actions: confirm or undo, prefer undo (toast with Undo, 5 to 8 seconds).

## Accessibility baseline

WCAG 2.2 AA minimum. Details in [patterns](patterns.md#accessibility).
