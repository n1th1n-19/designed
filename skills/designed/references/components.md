# Components

Every component uses semantic tokens only. Every interactive component has these states: default, hover (pointer), focus-visible, pressed, disabled, and where relevant selected, loading, error. Sizes: sm, md (default), lg.

Minimum hit area 44pt / 48dp on touch, 32px on dense pointer UI. Visual size may be smaller with padding making up the hit area.

## Button

**Anatomy.** Container, label, optional leading or trailing icon, optional spinner.
**Variants.** primary (filled `primary`), secondary (tonal `primary-container` or outlined), tertiary (text only), destructive (filled `error`), icon-only.
**Sizes.** sm 32 high, md 40, lg 48. Horizontal padding 12 / 16 / 20.
**States.** Hover: overlay 8 percent of content color. Pressed: 12 percent, scale 0.98 optional. Disabled: 38 percent opacity content, no hover. Loading: keep width, replace label with spinner, `aria-busy`.
**Rules.** One primary per view. Label is a verb phrase ("Create invoice"). Icon-only needs `aria-label` and tooltip. Full width on phones for the main action at the bottom.

## Text input

**Anatomy.** Label (always visible, above), field, optional prefix or suffix, helper text, error text, character count.
**Height.** 40 md, 48 lg (touch default).
**States.** Focus: border to `focus-ring` 2px. Error: border `error`, error text below with icon, `aria-invalid`, `aria-describedby`. Disabled and read-only look different: read-only keeps contrast.
**Rules.** Placeholder is an example, never the label. Validate on blur, not on every keystroke; revalidate on input once an error is shown. Correct `type`, `inputmode`, `autocomplete`.

## Select and combobox

Native select on mobile web and native apps. Custom combobox only when search, multi select or rich options are needed; follow the ARIA combobox pattern. Show the selected value, not a placeholder, after selection.

## Checkbox, radio, switch

- Checkbox: multiple independent choices, or one opt in. Supports indeterminate.
- Radio: one choice from 2 to 6 visible options. More than 6: select.
- Switch: immediate effect setting (no Save button). Label states what is on.
Whole row is the hit area. 20 to 24 visual size.

## Card

**Anatomy.** Container, optional media, header (title, meta), body, actions.
**Rules.** Use cards for items users scan and compare. Do not wrap everything in cards; sections with headings and spacing are often better. If the whole card is clickable, make one link fill it and keep inner buttons separate in the tab order. Padding 16 phone, 20 to 24 desktop.

## List and list row

**Anatomy.** Leading (icon, avatar, checkbox), primary text, secondary text, trailing (meta, chevron, switch, action).
**Height.** 48 single line, 64 two line, 72 to 88 three line.
**Rules.** Chevron only when the row navigates. Swipe actions (iOS, One UI) must also be reachable another way. Dividers inset to the text start.

## Navigation

| Component | Use |
|---|---|
| Tab bar / bottom navigation | 3 to 5 top destinations on phones. Icon plus label always |
| Navigation rail | Medium widths, 3 to 7 destinations |
| Sidebar | Desktop and tablet, many destinations, collapsible, sections |
| Top app bar | Title, back, up to 2 actions plus overflow |
| Breadcrumbs | Deep hierarchies on desktop web |
| Segmented control / tabs | Switching views of the same content, 2 to 5 options |

Current location always marked with more than color (weight, indicator, filled icon).

## Sheet, dialog, drawer

- **Dialog**: blocking decisions. Title as a question or statement, body short, actions: confirm (right or bottom), cancel. Destructive confirm uses the destructive button and names the action ("Delete 3 files").
- **Bottom sheet**: choices and secondary tasks on phones. Grabber, swipe to dismiss, detents.
- **Side sheet / drawer**: details or filters on wide screens without leaving context.
Focus moves into the overlay, is trapped, returns to the trigger on close. Escape closes. Background inert.

## Toast and snackbar

Brief, non blocking, 4 to 8 seconds, one optional action (Undo). Never the only place for an error that needs action. Position: bottom center phones, bottom left or right desktop. Announce with `role="status"` (or `alert` for errors).

## Banner and inline notification

Persistent messages tied to a page or section: info, success, warning, error. Icon plus title plus text plus optional action and dismiss.

## Table

**Anatomy.** Toolbar (search, filters, bulk actions), header (sortable), rows, pagination or infinite load, empty state.
**Density.** Compact 32, default 40 to 48, comfortable 56.
**Rules.** Numbers right aligned with tabular figures. Text left aligned. Sticky header. Row hover highlight. Selection with checkbox column. On phones, turn rows into stacked list items, do not side scroll the whole page.

## Empty state

Title saying what is empty, one line of why or what goes here, one primary action, optional illustration (on brand, small). Different empty states for: first use, no results (offer to clear filters), cleared (positive), error.

## Loading

- Under 300ms: show nothing.
- 300ms to 2s: skeleton that matches the final layout, or inline spinner for small areas.
- Over 2s: progress with text, cancel if possible.
Skeletons use `surface-sunken` with a gentle shimmer that is disabled under reduced motion.

## Menu and context menu

Groups with separators, icons optional but consistent, keyboard shortcuts right aligned in muted text, destructive items last and colored. Max about 10 items before grouping or search.

## Search

Field with leading search icon, clear button, recent and suggested items when empty, results grouped by type, keyboard navigation, highlight of the matched text. Command menu variant (Cmd/Ctrl K) for apps.

## Chips and tags

- Filter chip: toggles a filter, shows check when selected.
- Input chip: represents an entered value, removable.
- Status tag / lozenge: read only, color plus text.
Height 28 to 32, radius per shape personality.

## Avatar

Image, initials fallback on a hashed color from the palette, sizes 24, 32, 40, 56. Group stack with +N overflow.

## Progress and steppers

Linear progress for known duration, indeterminate only when unknown. Steppers for 3 to 6 step flows; show step names, allow going back.
