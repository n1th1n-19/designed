# Patterns

## Navigation by platform

| Platform | Top level | Hierarchy | Back |
|---|---|---|---|
| iPhone | Tab bar | Push navigation, large title collapsing | Swipe from left edge, back chevron with previous title |
| iPad, Mac | Sidebar, split view | Columns | Sidebar selection, toolbar back |
| Android phone | Navigation bar | Push, predictive back | System back gesture |
| Android tablet, foldable | Rail or drawer, list detail | Two pane | System back |
| One UI phone | Navigation bar, expandable header | Push | System back, actions at bottom |
| Windows | Navigation view (left pane), tabs | Frames | Back button in title bar |
| Web app | Sidebar or top nav | Routes, breadcrumbs | Browser back must always work |
| Marketing site | Top nav, footer | Pages | Browser back |

Rules: users should always know where they are, how they got there, how to get back. Deep links land on a real screen with a way up.

## Forms

- One column. Labels above fields. Group with headings when over 6 fields.
- Mark optional fields, not required ones, when most are required.
- Smart defaults, autofill, correct keyboards.
- Inline validation after blur; summary at top on submit for long forms, with links to fields.
- Primary button at the end, says the outcome ("Create account").
- Never clear what the user typed on error.
- Long forms: save progress, steps, or split into sections.

## Onboarding

Get users to the core job fast. Prefer: sample data, empty states that teach, progressive disclosure, contextual tips at the moment of need. Avoid long carousels before the product. Ask for permissions (notifications, location) only when the feature needs them, with a sentence on why.

## States for every data view

| State | Show |
|---|---|
| Loading | Skeleton matching layout |
| Empty, first use | What goes here, primary action |
| Empty, no results | What was searched, clear filters action |
| Partial | Content plus a notice of what is missing |
| Error | What happened, retry, keep any content already loaded |
| Offline | Cached content, a clear but quiet offline indicator |
| Success | Confirmation in place, toast for background tasks |

## Density

Offer density based on users: comfortable default for consumer, compact for pro tools. Desktop pro apps may offer a density toggle (Carbon, Fluent). Density changes row heights and padding, never the type size below 12px.

## Feedback

- Every action acknowledges within 100ms (press state).
- Optimistic UI when reversible; show sync status quietly.
- Destructive: undo over confirm. Confirm when irreversible and large.
- Errors near the cause.

## Microcopy

- Sentence case everywhere except proper nouns.
- Short, specific, active: "Payment failed. Check the card number and try again."
- Buttons and links say where they go or what they do.
- No emojis, no em dashes. Use a period, comma, colon or parentheses instead.
- No "Oops", no blaming the user, no jokes in errors.
- Write real content for the demo and screens. Lorem ipsum hides layout problems.

## Accessibility

WCAG 2.2 AA is the floor.

- **Contrast**: 4.5:1 text, 3:1 large text and meaningful UI. Script checks it.
- **Color**: never the only signal. Add text, icon or pattern.
- **Focus**: visible on every interactive element, logical order, no traps except modals.
- **Keyboard**: everything works without a pointer. Skip link on web.
- **Screen readers**: semantic HTML first (`button`, `nav`, `main`, headings in order), ARIA only to fill gaps. Native: accessibility labels, traits, hints. Images: alt text or marked decorative.
- **Text scaling**: layouts survive 200 percent zoom (web) and the largest Dynamic Type and font scale settings (native).
- **Motion**: honor `prefers-reduced-motion`, `UIAccessibility.isReduceMotionEnabled`, Android animator scale. No flashing over 3 times a second.
- **Targets**: 24px minimum (WCAG 2.2), 44pt / 48dp on touch.
- **Forms**: labels tied to inputs, errors announced, no timeout without warning.
- **Language**: set `lang`, mark language changes.

Verify with `chrome-devtools-mcp:a11y-debugging` when available, plus a manual keyboard pass and a screen reader pass (VoiceOver, TalkBack, NVDA).

## RTL and i18n

- Use logical properties: `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`. SwiftUI and Compose use leading and trailing by default.
- Mirror in RTL: layout direction, back and forward arrows, progress direction, sliders, list chevrons.
- Do not mirror: media playback controls, clocks, logos, charts with time axes (usually), phone number and code.
- Plan for text expansion of 30 to 40 percent (German, Finnish), up to 200 percent for very short labels. No fixed width buttons.
- Fonts: pick families with full coverage, or a Noto fallback per script. Increase line height for scripts with tall glyphs (Thai, Devanagari, Arabic).
- Format numbers, currency, dates, plurals with the platform APIs (`Intl`, `Formatter`, `ICU`), never by string building.
- Do not put text in images. Do not concatenate translated strings.

## The AI look and how to avoid it

Generated interfaces share tells. Remove them by default unless the brief explicitly asks for one.

| Tell | Why it reads as generated | Do instead |
|---|---|---|
| Purple to blue gradient hero | Default of many generators | Seed hue from the brief, solid surfaces, one controlled gradient at most |
| Glassmorphism on content cards | Trend copied without purpose | Blur only on chrome over moving content |
| Centered hero plus three icon cards plus CTA | The template layout | Lead with the product: real screenshot, real data, asymmetric layout |
| "Unlock the power of", "Seamless", "Elevate" | Empty copy | Say what the product does with a number or a concrete example |
| Emoji as icons or bullets | Cheap substitute | A real icon set, consistent stroke |
| Em dashes in copy | Strong AI writing tell | Commas, periods, colons, parentheses |
| Same 16px radius on every element | No shape system | Radius scale by size, nested radius rule |
| Every section the same height and spacing | No hierarchy | Spacing that follows importance, varied section rhythm |
| Gradient blobs and floating orbs in background | Filler decoration | Empty space, or one meaningful illustration |
| Neon glow shadows | Trend noise | Subtle neutral shadow or a border |
| Generic stock 3D illustrations | Off brand | Real photos, product UI, or a custom style (anatomy, hairline) |
| Lorem ipsum, "John Doe", round fake numbers | No content thinking | Realistic names, odd numbers, long and short cases |
| Gradient text on every heading | Overuse | Solid text; gradient text once if it is the signature |
| Too many badges, pills and "New" labels | Visual noise | Only status that users act on |
| Testimonials grid with 5 star cards | Template | One strong quote with name and role, or real logos |

Human-designed signals to add:
- One signature detail owned by this product (a distinctive number style, a unique empty state, a custom cursor in a creative tool, a recognisable color moment).
- Real content edge cases visible: long names truncated well, zero and huge numbers.
- Alignment that is exact: optical alignment of icons and text, baseline alignment across columns.
- Restraint: fewer colors, fewer effects, more whitespace where it matters.
