# Flavors

A flavor is the core system with a set of overrides. Pick one when the brief calls for a platform-native or brand-specific feel. Name it in `designed.md` under Mode. A product can use different flavors per platform (Apple on iOS, Material on Android) with one shared palette and type.

Do not copy logos, trademarked names in UI, proprietary fonts or icons outside their platform.

---

## Apple (HIG)

**Identity.** Clarity, deference, depth. Content fills the screen, controls are quiet, translucent chrome hints at what is underneath.

**Signature moves**
- Large titles that collapse into an inline title on scroll
- Grouped inset lists (settings style) with 10 to 12pt corner radius
- Sheets with detents (medium, large) and a grabber
- Translucent materials for bars and sidebars (`.regularMaterial`, `.thinMaterial`)
- SF Symbols, weights matched to adjacent text
- Spring animations, haptics on meaningful events
- Swipe actions on list rows, context menus on long press

**Overrides**
| Token | Value |
|---|---|
| Font | System (SF Pro, SF Pro Rounded for friendly products), Dynamic Type styles |
| Body | 17pt |
| Radius | Continuous corners (squircle); 10 to 13 controls, 20+ cards and sheets |
| Depth | Material blur on chrome, soft shadows rarely |
| Targets | 44pt |
| Navigation | Tab bar (2 to 5 tabs) on iPhone, sidebar on iPad and Mac |
| Accent | One tint color applied app wide |

**Do** use native controls (toggles, pickers, date pickers), respect safe areas and the home indicator, support Dynamic Type to the largest accessibility sizes.
**Do not** put a hamburger menu on iPhone, use Android style FABs, override the back swipe.

---

## Material 3 (Google)

**Identity.** Personal, adaptive, expressive. Color roles derived from a seed, tonal surfaces, bold shapes.

**Signature moves**
- Dynamic color from wallpaper (Android 12+), with brand fallback
- Tonal elevation: higher surfaces tint toward primary instead of casting shadow
- Shape scale from extra small (4) to extra large (28) and full
- FAB for the single primary action, extended FAB with label on wide screens
- Navigation bar (compact), rail (medium), drawer (expanded)
- Top app bar variants: small, center aligned, medium, large
- Expressive motion with shared axis and container transform transitions

**Overrides**
| Token | Value |
|---|---|
| Font | Roboto or Google Sans Flex where licensed; brand face for display |
| Color | Full M3 role set (primary, on-primary, primary-container, surface-container-lowest to highest, outline, outline-variant) |
| Radius | 4, 8, 12, 16, 28, full |
| Depth | Tonal, shadow only on FAB and dragged items |
| Targets | 48dp |

**Do** use state layers (8 percent hover, 10 percent focus and press overlay of the content color), predictive back gesture, edge to edge layout.
**Do not** stack multiple FABs, use iOS style back chevrons with text.

---

## Samsung One UI

**Identity.** Comfortable for one hand on large phones. Calm, rounded, generous.

**Signature moves**
- **Viewing area and interaction area**: large header (title, summary, illustration) takes the top third and scrolls away; lists, buttons and inputs live in the lower part within thumb reach
- Very rounded cards and grouped lists (radius 20 to 26)
- Bottom aligned actions and bottom sheets for choices
- Clear, high contrast typography, slightly larger defaults
- Soft, low saturation surfaces, a single vivid accent

**Overrides**
| Token | Value |
|---|---|
| Font | System (SamsungOne on device, Roboto fallback) |
| Radius | 12 controls, 24 cards, 28 sheets |
| Layout | Expandable app bar header, content in lower 2/3 |
| Targets | 48dp, primary actions in bottom 40 percent of screen |

**Do** put primary actions at the bottom, make headers informative (counts, status) not decorative.
**Do not** place critical buttons in the top corners on phones.

---

## Fluent 2 (Microsoft)

**Identity.** Natural on every Microsoft surface. Calm, coherent, efficient, with light and depth.

**Signature moves**
- Mica (desktop wallpaper tinted base layer) for windows, Acrylic (blur) for transient surfaces like flyouts
- Layered surfaces: base, layer, card with subtle 1px strokes
- Segoe UI Variable with optical sizes, Fluent System Icons (regular and filled)
- Reveal of focus with a two tone focus rectangle
- Compact and standard density modes
- Command bars, navigation view with collapsible left pane, tabs in title bar

**Overrides**
| Token | Value |
|---|---|
| Font | Segoe UI Variable on Windows; web uses Segoe UI with system fallbacks |
| Body | 14px |
| Radius | 4 controls, 8 cards and windows |
| Depth | Material plus thin stroke, shadow 2 to 64 ramp for flyouts and dialogs |
| Targets | 32px pointer compact, 40px standard, 44 touch |

**Do** support Windows light, dark and high contrast themes, keyboard accelerators, snap layouts.
**Do not** use mobile bottom tabs in a desktop app.

---

## IBM Carbon

**Identity.** Productive, precise, built for data and enterprise work.

**Signature moves**
- 2x grid: everything aligns to a 16 column grid with 8px mini units
- IBM Plex family, productive and expressive type sets
- Flat, sharp surfaces (radius 0 to 4), borders and layers for depth
- Data tables with sorting, batch actions, expandable rows, toolbar
- Bottom border inputs (fluid inputs) or boxed inputs
- Notification patterns: inline, toast, actionable, callout
- Gray themes: White, Gray 10, Gray 90, Gray 100

**Overrides**
| Token | Value |
|---|---|
| Font | IBM Plex Sans, Plex Mono, Plex Serif |
| Body | 14px productive, 16px expressive |
| Radius | 0 by default, 2 to 4 only where softness helps |
| Depth | Layers (`layer-01` to `layer-03`) and borders, almost no shadow |
| Density | Small 32, medium 40, large 48 row and control heights |

**Do** use for dashboards, admin, analytics, dev tools needing rigor.
**Do not** use for playful consumer products.

---

## Shopify Polaris and Atlassian

**Identity.** Product and admin UI that gets work done. Plain language, predictable layouts, one clear next step.

**Signature moves (Polaris)**
- Page with title, primary action top right, secondary actions in a menu
- Index tables and resource lists with filters, saved views, bulk actions
- Cards grouped into layout sections (one third / two thirds)
- Content guidelines: sentence case, active verbs, merchant focused
- Subdued surfaces, a single strong primary button style

**Signature moves (Atlassian)**
- Lozenges for status (color plus uppercase short label)
- Inline edit on fields, side panels for detail without leaving the list
- Avatars and presence everywhere, mentions
- Spotlight onboarding and flags (dismissable notifications)

**Overrides**
| Token | Value |
|---|---|
| Font | Inter or system stack; body 14 to 16 |
| Radius | 6 to 8 controls, 12 cards |
| Depth | Soft card shadow plus 1px border |
| Density | Comfortable on settings, compact on tables |

**Do** use for back office, CMS, project tools, marketplaces.
**Do not** overload a page with more than one primary button.

---

## Modern web (Linear, Vercel, Stripe style)

**Identity.** Fast, precise, crafted. Dark first or monochrome, typography and detail do the work, color is rare.

**Signature moves**
- Dark theme as the main theme, near black with a slight hue (not pure `#000`)
- 1px hairline borders at 6 to 10 percent white, very subtle inner highlights on raised surfaces
- Tight, dense type: Inter or Geist, 13 to 14px UI text, negative tracking on headings
- Command menu (Cmd K), keyboard shortcuts shown in menus and tooltips
- Monospace for IDs, numbers, code; tabular numbers
- One vivid accent or a carefully controlled gradient used once (Stripe), not everywhere
- Motion fast (120 to 200ms), small offsets, no bounce
- Marketing pages: big confident type, product screenshots as the hero, real UI over illustrations

**Overrides**
| Token | Value |
|---|---|
| Font | Inter, Geist, or Satoshi; Geist Mono or JetBrains Mono |
| Body | 14px app, 16 to 18px marketing |
| Radius | 6 to 8 controls, 10 to 12 cards |
| Depth | Borders plus subtle glow on focus and selected; shadow only on popovers |
| Color | Neutral ramp does 95 percent of the work |

**Do** sweat empty states, loading skeletons, transitions between states.
**Do not** add glassmorphism, gradient blobs or neon glows to imitate the look; the look comes from restraint.
