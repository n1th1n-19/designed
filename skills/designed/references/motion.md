# Motion and animation

Motion explains change: where something came from, where it went, what is now in focus. Every animation must answer one of these, or it does not ship. Durations and easings come from the motion tokens in [brand](brand.md#5-motion).

## Rules for every animation

1. **Purpose first.** Name the job: feedback, orientation, continuity, hierarchy, delight. "Looks cool" is not a job. Write the job next to the pattern in designed.md.
2. **One motion language per product.** Same easing family, same direction logic, same duration scale everywhere.
3. **Animate only `transform` and `opacity`** (and `filter`, `clip-path` sparingly). Never animate `width`, `height`, `top`, `left`, `margin` on the main thread; use FLIP or `interpolate-size` instead.
4. **60fps or nothing.** Test on a mid range phone with CPU throttling at 4x. Drop the effect before you ship jank.
5. **Reduced motion is designed, not deleted.** Every pattern below lists its reduced alternative. Movement becomes a fade or an instant change; meaning stays.
6. **Never block input.** Users can interact during and after animations. No animation longer than 500ms on a path the user repeats.
7. **Interruptible.** A new gesture or click cancels or redirects the running animation from its current value (springs do this for free).
8. **Budget.** At most one large motion moment per screen (a hero sequence, a shared element). Everything else is micro feedback.

## Choosing a pattern

| Job | Patterns |
|---|---|
| Feedback on press, hover, toggle | Micro-interactions, state layers, spring press, haptics |
| Show where something came from | Shared element, container transform, FLIP, view transitions |
| Orient between pages | Page transitions, shared axis, slide hierarchy |
| Tell a story on a marketing page | Scroll scrubbed image sequence, pinned scrollytelling, parallax, reveal on scroll |
| Make waiting feel shorter | Skeleton shimmer, progress, optimistic UI, staged loading |
| Draw attention once | Pulse, badge pop, number count, attention shake for errors |
| Character and brand | Lottie or Rive illustrations, path drawing, signature cursor, shader moment |

## Catalogue

Each entry: what it is, when to use, when not to, how to build it, reduced motion alternative.

### Scroll driven

**Image sequence (scroll scrubbed frames).** A product rotates, assembles or opens as the user scrolls, built from 60 to 200 pre-rendered frames drawn to a canvas. Use for one hero product story on a marketing page. Not for app UI, not on pages that must load fast on mobile data.
- Export frames as WebP or AVIF, 1 to 2x display size, numbered. Total weight under about 4 to 6MB; provide a lighter 60 frame set for phones.
- Preload the first frame as a normal `<img>` for LCP, lazy load the rest after the page is interactive.
- Map scroll progress inside a tall sticky section (300 to 500vh) to a frame index; draw with `requestAnimationFrame`, only when the index changes.
- Alternative for short sequences: a muted `<video>` with `currentTime` scrubbed (encode with keyframe every frame, `-g 1`, or seeking stutters).
- Reduced: show 3 to 5 key frames as static images with captions.

```html
<section class="seq" style="height:400vh">
  <canvas id="seq" width="1200" height="1200" style="position:sticky;top:0;width:100%;height:100vh;object-fit:contain"></canvas>
</section>
<script>
const N = 120, canvas = document.getElementById("seq"), ctx = canvas.getContext("2d");
const src = (i) => `/frames/product_${String(i + 1).padStart(3, "0")}.webp`;
const frames = Array.from({ length: N }, (_, i) => { const im = new Image(); im.decoding = "async"; if (i === 0) im.src = src(0); return im; });
addEventListener("load", () => frames.forEach((im, i) => i && (im.src = src(i))));
let current = -1;
function draw() {
  const r = canvas.parentElement.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
  const i = Math.round(p * (N - 1));
  if (i !== current && frames[i].complete) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames[i], 0, 0, canvas.width, canvas.height); current = i; }
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) addEventListener("scroll", () => requestAnimationFrame(draw), { passive: true });
frames[0].complete ? draw() : (frames[0].onload = draw);
</script>
```

**Parallax.** Layers move at different speeds to suggest depth. Use subtly (layer speed differences of 5 to 20 percent) on hero art or section backgrounds. Not on text people read, not with large offsets that cause motion sickness, not on every section.
- Modern CSS: scroll driven animations, no JS, runs off the main thread.
- Fallback: `IntersectionObserver` plus a rAF loop that sets `transform: translate3d(0, y, 0)`.
- Reduced: all layers static.

```css
@supports (animation-timeline: view()) {
  .parallax-layer { animation: drift linear both; animation-timeline: view(); animation-range: cover; }
  @keyframes drift { from { transform: translateY(var(--from, -8%)); } to { transform: translateY(var(--to, 8%)); } }
}
@media (prefers-reduced-motion: reduce) { .parallax-layer { animation: none; } }
```

**Reveal on scroll.** Content fades and moves up 8 to 24px as it enters. Use for marketing sections, once per element. Not on app screens, not on every element of a page (the classic AI tell), never on content above the fold.

```css
@supports (animation-timeline: view()) {
  .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; }
  @keyframes reveal { from { opacity: 0; transform: translateY(16px); } }
}
```

**Pinned scrollytelling.** A section sticks while steps change beside it (text steps on one side, a visual that updates on the other). Use for explaining a process or product in 3 to 6 steps. Build with `position: sticky` plus `IntersectionObserver` on each step. Reduced: steps stack with their visuals inline.

**Horizontal scroll section.** Vertical scroll drives a horizontal track. Use for galleries or timelines on desktop; on phones use a native swipe carousel with scroll snap instead. Always keep a visible way to skip the section.

**Scroll progress indicator.** A thin bar for long articles. `animation-timeline: scroll(root)` on `transform: scaleX()`.

**Scroll linked header.** Large title collapses to a compact bar (Apple large title, One UI expandable header). Use in apps with long lists. Native on iOS and Android; on web, scroll driven animation on height via `transform: scale` and opacity of the large title.

**Zoom through and scale on scroll.** A hero image scales from card to full bleed as you scroll. Use once, for a product reveal. Reduced: show the full bleed state.

**Sticky stacking cards.** Cards stack on top of each other as you scroll, each slightly scaled down. Use for 3 to 5 features. Not more.

**Text reveal on scroll.** Words go from muted to full color as they pass the center. Use for one manifesto paragraph. Reduced: full color.

### Navigation and layout

**Page transitions.** Cross fade (default), shared axis slide (forward and back in a hierarchy), fade through (unrelated destinations). Web: View Transitions API, cross document with `@view-transition { navigation: auto; }` or same document with `document.startViewTransition()`. Duration 200 to 300ms.

**Shared element and container transform.** A card expands into its detail page, a thumbnail becomes the full image. Web: `view-transition-name` on both elements. iOS: `matchedGeometryEffect` or navigation zoom transition. Android: `SharedTransitionLayout`. Flutter: `Hero`. Reduced: cross fade.

```css
.card-thumb { view-transition-name: var(--vt); }
::view-transition-group(*) { animation-duration: 280ms; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }
```

**FLIP layout animation.** Items smoothly move when a list is sorted, filtered or reordered. First, Last, Invert, Play with `transform`. In React use Motion's `layout` prop; in Vue `<TransitionGroup>`; in Svelte `animate:flip`.

**Accordion and disclosure.** Height animation with `interpolate-size: allow-keywords` and `transition: height` to `auto`, or `grid-template-rows: 0fr` to `1fr`. 200 to 250ms. Rotate the chevron 180 degrees with the same timing.

**Sheets, dialogs, menus.** Sheets slide from their edge with a spring; dialogs scale from 0.96 and fade; menus scale from their trigger origin (`transform-origin` at the anchor). Exit faster than enter (about 70 percent of the duration).

**Tabs and segmented controls.** The indicator slides between items (FLIP or `anchor-name` with CSS anchor positioning); content cross fades or shared axis slides.

**List insert and delete.** Insert: expand height then fade in. Delete: fade out then collapse. Swipe to delete follows the finger, then completes with a spring.

**Stagger.** Children enter 20 to 40ms apart, total under 300ms. Use for the first render of a list or grid. Not for long lists (cap at 6 to 8 items, the rest appear together).

### Feedback and micro-interactions

**Press and hover states.** State layer opacity (Material), scale 0.97 to 0.98 on press, quick 100 to 150ms. On touch, no hover effects.

**Toggle and checkbox.** Thumb slides with a spring; checkmark draws with stroke dashoffset in 150ms.

**Like and favorite pop.** Icon scales 1 to 1.2 to 1 with a spring, color fills. A few particles only if the brand is playful. Pair with a light haptic on mobile.

**Button loading morph.** Label fades to a spinner, width held; on success a check, then back.

**Error shake.** Field shakes 3 times horizontally, 4 to 6px, 300ms total, plus error text. Reduced: no shake, error text only.

**Number count up and rolling digits.** KPIs animate from the previous value, not from zero, in 400 to 800ms, tabular figures. Rolling digit columns for prices and counters. Reduced: instant update.

**Progress and steppers.** Determinate bars ease with `standard`; indeterminate loops slowly. Circular progress draws with stroke dashoffset.

**Skeleton shimmer.** Gentle gradient sweep, 1.2 to 1.6s loop. Reduced: static skeleton.

**Pull to refresh.** Native on iOS and Android; on web only inside app shells.

**Drag and drop.** Lifted item scales to 1.02 with a stronger shadow, others make room with FLIP, drop settles with a spring.

**Swipe gestures.** Follow the finger 1:1, release with velocity into a spring. Rubber band at edges.

**Haptics.** iOS `.sensoryFeedback`, Android `HapticFeedbackConstants`, web `navigator.vibrate` only on Android and sparingly. Success, warning, error, selection. Never on every tap.

**Toast and snackbar.** Enter from the bottom edge 200ms, exit 150ms, progress bar for timed undo.

### Expressive and brand

**Lottie.** After Effects animations as JSON (via Bodymovin). Use for onboarding, empty states, success moments. Keep files under 100 to 200KB; prefer `.lottie` (dotLottie) for size. Players: `lottie-web`, `@lottiefiles/dotlottie-web`, `lottie-ios`, `lottie-android`, `lottie-react-native`.

**Rive.** Interactive state machine animations that react to input (hover, progress, mascots). Smaller and more interactive than Lottie. Runtimes for web, iOS, Android, Flutter, React Native.

**SVG path drawing.** Lines draw themselves using `stroke-dasharray` and `stroke-dashoffset`. Use for signatures, diagrams, logo reveals. With `hairline-create` or `anatomy` for interactive figures.

**SVG morphing.** One shape morphs to another (play to pause icon). Needs matching point counts; use Flubber or GSAP MorphSVG, or SF Symbols and Material Symbols with built-in transitions natively.

**Kinetic typography.** Letters or words animate in (split text with a stagger, variable font weight on scroll or hover). Use for one headline. Never for body text, never a typewriter effect on content users must read. Keep text selectable and readable by screen readers (animate spans inside an element with the full text as its accessible name).

**Marquee and ticker.** Continuous horizontal scroll for logos or announcements. Pause on hover and focus, provide a pause control (WCAG 2.2.2 for anything over 5 seconds). Reduced: static row.

**Cursor effects.** Custom cursor, magnetic buttons, spotlight follow. Use only in creative portfolios or as the signature detail. Never hide the real cursor on functional UI. Pointer devices only (`@media (hover: hover) and (pointer: fine)`).

**3D tilt and depth.** Cards tilt toward the pointer a few degrees with a light sheen. Use for product cards or collectibles. Max 6 to 10 degrees.

**Shader and WebGL moments.** Gradient mesh, noise, liquid, particles, 3D product viewers (Three.js, `figma:figma-shaders`). One per site at most, paused when off screen (`IntersectionObserver`), static image fallback, never behind body text.

**Video backgrounds and cinemagraphs.** Muted, looped, short (5 to 10s), compressed (under 2 to 3MB), poster image, pause control, stop under reduced motion and on save data (`navigator.connection.saveData`).

**Ken Burns.** Slow pan and zoom on still photos (6 to 10s). Use in galleries and storytelling. Reduced: static.

**Confetti and celebration.** Only for real achievements (first sale, course completed). Once. Respect reduced motion.

**Mask and clip reveals.** Images revealed with `clip-path: inset()` or circle wipe. Use for section transitions on marketing pages.

**Blur and focus pulls.** Background blurs when a sheet opens (`backdrop-filter`). Expensive: keep blurred areas small and avoid on low end Android.

**Ambient motion.** Slowly drifting gradients or floating shapes. Usually the AI look. Only when the brief asks for calm atmosphere, very slow (20s+ loops), low contrast, and paused under reduced motion.

### Loading sequences

**Staged loading.** Shell first, then content blocks in reading order, then images. Never a full screen spinner longer than 1s.

**Splash and launch.** Native: static launch screen that matches the first frame (no fake loaders). Web: no splash screens.

**Optimistic UI.** Show the result immediately, roll back with a message on failure.

## Tools by platform

| Platform | Default | When more is needed |
|---|---|---|
| Web, plain | CSS transitions, keyframes, scroll driven animations, View Transitions, Web Animations API | GSAP (with ScrollTrigger for scroll work, free including plugins), Motion (`motion` package, formerly Framer Motion) for React, Vue and vanilla |
| React | Motion (`motion/react`) for layout, presence and gestures | GSAP via `@gsap/react` `useGSAP`, React Spring for physics |
| Smooth scroll | Native scrolling | Lenis only for scroll heavy marketing pages, never in apps, keep native keyboard and accessibility behavior |
| iOS (SwiftUI) | `withAnimation(.spring)`, `.animation`, `matchedGeometryEffect`, `PhaseAnimator`, `KeyframeAnimator`, `scrollTransition`, `.contentTransition(.numericText())`, SF Symbol effects | Core Animation, Lottie, Rive |
| Android (Compose) | `animate*AsState`, `AnimatedVisibility`, `AnimatedContent`, `updateTransition`, `SharedTransitionLayout`, `Animatable` with `spring` | MotionLayout (Views), Lottie, Rive |
| React Native, Expo | Reanimated (worklets on the UI thread), Layout Animations, Moti | Lottie, Rive, Skia for custom drawing |
| Flutter | Implicit animations (`AnimatedContainer`, `AnimatedOpacity`), `Hero`, `AnimationController` | Rive, Lottie, `flutter_animate` |
| Windows | WinUI implicit animations, connected animations | Composition APIs |
| Video and motion graphics | `hyperframes` and `hyperframes-animation` companions | Lottie export |

Load companion skills for platform detail: `hyperframes-animation`, `expo:expo-animation`, `figma:figma-implement-motion`, `figma:figma-shaders`.

## Performance checklist

- Only compositor friendly properties animate; check Chrome DevTools Performance and the Layers panel
- `will-change` only during the animation, removed after
- Scroll listeners passive, work inside `requestAnimationFrame`, or use scroll driven CSS
- Pause off screen animations (`IntersectionObserver`, `content-visibility`)
- Image sequences and videos sized for the device, lazy after LCP
- Lottie and Rive files under budget, rendered with the lightest renderer (canvas over SVG for complex scenes)
- No layout shift caused by entering elements (reserve space)
- Test with 4x CPU throttling and on a real low end Android phone

## Accessibility checklist

- `prefers-reduced-motion` handled for every pattern, with the listed alternative
- Nothing flashes more than 3 times per second
- Auto playing motion over 5 seconds has pause, stop or hide controls
- Focus is never lost or moved by an animation; focus rings stay visible during transitions
- Animated text stays readable and in the accessibility tree
- Parallax and zoom effects stay small; large vestibular triggers (big zooms, spinning, fast parallax) are avoided entirely

## Motion in designed.md

Record under Tokens, Motion:
- Duration and easing tokens, and the spring settings for native
- The motion language in one line (for example "fast, short distance, no bounce" or "soft springs, gentle overshoot")
- Allowed patterns with their job, for example: "Shared element from card to detail: continuity", "Image sequence on the product hero: story, once"
- Banned patterns for this product
- Reduced motion behavior
