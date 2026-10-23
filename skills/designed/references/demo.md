# Demo

A single, self-contained HTML file that shows the design before any product code. Only built when the user says yes in step 4.

## File

- `design-demo.html` in the project root (or `docs/` if the project uses it)
- One file, inline CSS and JS, no frameworks
- Only external requests allowed: the chosen fonts (Google Fonts or Fontshare links)
- Uses CSS custom properties written from tokens.json into one `:root` block (and the dark theme block), following [platforms](platforms.md#web-css-custom-properties). When tokens change, rewrite that block from tokens.json; the rest of the page only uses the variables
- Works at 320px wide up to desktop
- Light and dark toggle (top right), defaulting to system, remembered in localStorage inside try/catch
- No emojis, no em dashes, real product copy from the brief

If `artifact-design` is available and the user wants a link to share, publish it as an Artifact as well.

## Sections, in order

1. **Header**: product name in the display face, one line positioning from the brief, mode or flavor used.
2. **Palette**: every scale 50 to 950 as swatches with step, hex and OKLCH; then the role table for light and dark showing each role on its pair with the contrast ratio.
3. **Typography**: each type token rendered with real copy, with size, line height and weight labels; font families with a short note on why.
4. **Spacing, radii, elevation**: visual scale for each.
5. **Components**: buttons (all variants and states: default, hover, focus, pressed, disabled, loading), inputs (empty, filled, focus, error, disabled), select, checkbox, radio, switch, chips, tags, avatar, toast, banner, card, list rows, table sample, empty state, skeleton. States shown side by side, forced with classes, not only on hover.
6. **Key screens**: one or two of the most important screens from the brief, built with the components and real content, shown in a phone frame and a desktop frame.
7. **Iconography and imagery**: sample icons from the chosen set as inline SVG (no icon font or CDN), imagery direction notes, logo and app icon direction sketch if useful.
8. **Motion**: a small interactive example of each motion token (click to play), plus a live sample of each animation pattern chosen from [motion](motion.md) (for example a short scroll scrubbed sequence or a shared element transition), respecting reduced motion.

## Iteration

Show the demo (open it in the browser or take screenshots with Playwright or Chrome DevTools if available). Ask what to change. Apply changes to tokens.json first, regenerate the demo, repeat. When the user approves, go to step 5 and write designed.md with the final values.
