# Aloessential — Motion Design System

> Subtle motion, strong identity, zero unnecessary distraction.

This document specifies how Aloessential moves: the principles, the tokens, every animated component, the reduced-motion and mobile rules, the performance budget, and how all of it is tested. It describes the implementation in this repository. If the code and this document disagree, fix one of them.

---

## 1. Principles

1. **Reading first.** Aloessential is an editorial publication. Motion supports orientation (where am I, what changed, what can I press) and brand recognition. It never competes with the text.
2. **Content is never held hostage.** Everything is in the HTML and visible without JavaScript. Motion only *enhances* content that is already there. Nothing waits for an animation before it can be read, clicked or indexed.
3. **One botanical accent.** The hero emblem is the single element with ambient (continuous) motion: a breeze-like sway plus a one-time warm glow. Nothing else loops.
4. **Natural, not playful.** Ease-out curves, short distances (3–18 px), tiny scales (1.02). No bounce, no overshoot, no spin (except a loading spinner), no parallax, no scroll-jacking.
5. **Compositor-only.** Only `opacity` and `transform` are animated. Colour and border transitions are limited to small UI elements on hover and focus.
6. **Respect the reader's settings.** `prefers-reduced-motion: reduce` removes all travel, scaling and looping. Feedback stays immediate.

### Brand references in motion

| Brand image | Motion translation |
| --- | --- |
| Leaves moving in a breeze | Hero emblem sways ±0.7° and lifts 3 px over 9 s (`motion-breeze`) |
| Warm sunlight on botanical surfaces | A sun-coloured radial glow fades in once behind the emblem (`motion-sun-warm`) |
| Water droplets resting on aloe | Restraint: droplets stay static in the artwork. No particle systems |
| Editorial typography with deliberate timing | Hero eyebrow → headline → lead → CTAs, 90 ms apart |
| Magazine-style section transitions | Section heads and cards rise 14 px and fade in as they enter the viewport |

---

## 2. Architecture

```
src/styles/tokens.css        Brand, type and MOTION TOKENS (+ mobile and reduced-motion overrides)
src/styles/motion.css        Reveal utilities, hero keyframes, ambient accent, image fade, print
src/styles/global.css        Components, including their micro-interactions
src/scripts/motion.ts        Scroll reveal, image-load fade, ambient-accent pause (≈1 KB gzip)
src/scripts/header.ts        Header scrolled state, mobile menu
src/scripts/newsletter.ts    Validation and async states
src/scripts/reading-progress.ts  Fallback for browsers without scroll-driven animations
src/layouts/BaseLayout.astro Inline boot script (sets .js / .motion + failsafe)
```

**Stack decision.** The site is built with Astro (static output, no UI framework, zero hydration). **No animation library was added.** Everything here is CSS transitions and keyframes plus about 2 KB (gzip) of plain TypeScript per page. Framer Motion would need React and hydration. GSAP adds about 25 KB+ for effects CSS already provides. The Web Animations API wasn't needed either, because no animation depends on runtime values.

### The progressive-enhancement contract

```
<html>                       → no JS: everything visible, mobile nav is a plain list
<html class="js">            → JS runs: mobile menu becomes a toggle
<html class="js motion">     → JS + IntersectionObserver: [data-reveal] / img[data-fade]
                               may start hidden and are revealed by motion.ts
```

* The boot script in `<head>` adds `.js` and `.motion` before first paint, so revealed content doesn't flash.
* **Failsafe:** if `motion.ts` hasn't set `data-reveal-ready` on `<html>` within 3 s, for example because a script failed to load, the boot script removes `.motion` and all content fades in. This is covered by a test.
* The hero entrance is pure CSS (`@keyframes` with `animation-fill-mode: both`). It runs with or without JavaScript and always ends fully visible.
* Article body text never has `data-reveal`.

---

## 3. Tokens

All values live in `src/styles/tokens.css`. Components reference tokens only. Never hard-code a duration or curve.

### Durations

| Token | Default | Use |
| --- | --- | --- |
| `--motion-duration-micro` | 150 ms | Colour changes, underline, input focus, icon nudge |
| `--motion-duration-ui` | 200 ms | Buttons, mobile menu, status messages, TOC, header state |
| `--motion-duration-reveal` | 560 ms | Scroll reveal of sections and cards |
| `--motion-duration-hero` | 640 ms | Hero / page-header entrance steps |
| `--motion-duration-media` | 600 ms | Image hover scale, image load fade |
| `--motion-duration-glow` | 1200 ms | One-time sunlight glow behind the hero emblem |
| `--motion-duration-ambient` | 9 s | One cycle of the emblem's breeze |

### Easing

| Token | Value | Use |
| --- | --- | --- |
| `--motion-ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default for anything entering or responding |
| `--motion-ease-in-out` | `cubic-bezier(0.45, 0.05, 0.35, 1)` | Reserved for symmetrical state changes |
| `--motion-ease-ambient` | `cubic-bezier(0.37, 0, 0.63, 1)` | Sine-like breeze loop |

No spring curves are used. A spring was considered for the CTA arrow, but the overshoot read as playful rather than botanical.

### Distances, scales, choreography

| Token | Desktop | ≤ 47.99rem | Reduced motion |
| --- | --- | --- | --- |
| `--motion-distance-nudge` (CTA arrow) | 3 px | 3 px | 0 |
| `--motion-distance-reveal` | 14 px | 10 px | 0 |
| `--motion-distance-hero` | 18 px | 12 px | 0 |
| `--motion-scale-media-hover` | 1.02 | (hover disabled) | 1 |
| `--motion-sway-angle` / `--motion-sway-lift` | 0.7° / −3 px | (loop disabled) | 0 |
| `--motion-stagger` | 70 ms | 50 ms | 0 |
| `--motion-hero-step` | 90 ms | 70 ms | 0 |

Reduced motion also shortens `--motion-duration-reveal` to 180 ms (opacity only) and sets hero, media and glow durations to 0.

---

## 4. Component specifications

### 4.1 Hero entrance (homepage) and page-header entrance (archives, articles)

| Step (`data-hero-step`, `--step`) | Element | Delay | Animation |
| --- | --- | --- | --- |
| 0 | Eyebrow / breadcrumb | 0 ms | `motion-rise-in`: opacity 0→1, translateY 18→0 px, 640 ms |
| 1 | `h1` | 90 ms | same |
| 2 | Lead / dek | 180 ms | same |
| 3 | CTAs / chips / meta | 270 ms | same |
| `visual` | Hero emblem / article cover | 90–270 ms | `motion-settle-in`: opacity 0→1, scale 0.97→1, 800 ms |

* The whole content sequence completes within **1 s**. A test enforces this.
* Text is in the DOM from the first byte, and links are clickable throughout.
* There's no per-word or per-letter animation and no clipping masks.

### 4.2 Botanical accent (hero emblem)

* `.accent-glow`: a sun-coloured radial gradient that fades in **once** (opacity, 1.2 s, after 200 ms).
* `.accent-sway`: `motion-breeze`, rotate ±0.7° and lift 3 px around a point near the base, 9 s, infinite, starting after 1.2 s so it doesn't overlap the entrance.
* **Only** at `min-width: 48rem` **and** `prefers-reduced-motion: no-preference`.
* Paused (`animation-play-state: paused`) while off-screen, via IntersectionObserver.
* A test asserts it is the only infinite animation on the page.

### 4.3 Scroll reveal (`[data-reveal]`)

* Hidden state (only under `.motion`): `opacity: 0; transform: translateY(14px)`.
* Revealed by `motion.ts` when the element's top crosses 94% of the viewport height (`rootMargin: 0 0 -6% 0`). Opacity and transform transition over 560 ms.
* **Stagger:** elements that enter in the same observer batch get 0, 70, 140 or 210 ms of delay. The cap is 3 steps, so a long archive never cascades.
* **First view is instant:** anything already on screen when the observer starts is shown without a transition (`.is-instant`). The hero sequence is the page's entrance, and above-the-fold content never waits on a second fade. This also keeps it out of the LCP path.
* **Passed content** (anchor jumps, restored scroll position) is revealed instantly.
* Each element is `unobserve`d after its reveal. The observer `disconnect`s when none remain.
* Used on: section heads, featured article, card list items, pillars, category tiles, newsletter block.
* **Never** used on: article body, headings inside articles, navigation, forms' fields individually, or archive cards in the first row. Those cards use `CardGrid priority={3}`, which also loads their images eagerly with no fade.

### 4.4 Article cards and featured article

| State | Effect |
| --- | --- |
| Enter | Scroll reveal (4.3) on the `<li>` |
| Image load | `img[data-fade]`: opacity 0→1 over 600 ms once `load` fires (also on `error`, so broken images never stay invisible). The frame keeps a fixed `aspect-ratio` and a mint→cream gradient placeholder, so there's no layout shift |
| Hover (`hover: hover` and `pointer: fine` only) | Image `scale(1.02)` inside an `overflow: hidden` frame (600 ms). Card background and border fade in (200 ms). Title underline appears in light leaf green. "Lire" arrow nudges 3 px |
| Focus | One stretched link per card. The focus ring is drawn around the whole card, and the arrow nudges |

The card's box never changes size or position. A test hovers and compares bounding boxes.

### 4.5 Header

* Sticky. The `.is-scrolled` border and soft shadow transition in over 200 ms once the page leaves the top. This is driven by an IntersectionObserver on a 12 px sentinel, so there is **no scroll listener**.
* The header doesn't hide, shrink or move while scrolling.

### 4.6 Navigation links

* Underline: `::after` `scaleX(0 → 1)` from the left, 200 ms, on hover and `:focus-visible`.
* Current page: `aria-current="page"` keeps the underline drawn, in forest green.
* Focus ring: 3 px solid forest green, offset 3 px. On dark sections (`.on-dark`) the ring switches to sun yellow for contrast.

### 4.7 Mobile menu (< 56rem)

* A disclosure pattern: a `<button aria-expanded aria-controls="mobile-nav">` and a panel below the header.
* Open: opacity 0→1 and translateY −8→0 px over 200 ms. Closed: `visibility: hidden` after the fade, so closed links can't receive focus.
* Burger bars morph into a ✕ (transform, 200 ms).
* Closes on Escape (returning focus to the button), on an outside tap, when a link is chosen, when focus leaves the panel, and when crossing the desktop breakpoint.
* No JavaScript: the button is hidden and the panel renders as a static list.

### 4.8 Buttons

| State | Treatment |
| --- | --- |
| Hover | Background or border colour, 200 ms. Arrow icon `translateX(3px)` |
| Pressed | `translateY(1px)`, 150 ms |
| Focus | 3 px ring with offset; arrow nudge |
| Disabled (`disabled` / `aria-disabled`) | 55% opacity, `not-allowed` cursor, no transform |
| Loading (`aria-busy="true"`) | Label changes ("Inscription…"), arrow swapped for a 16 px spinner (700 ms linear rotation; static under reduced motion). Uses `aria-disabled` rather than `disabled`, so focus isn't lost |

### 4.9 Newsletter form

* Input focus: border turns sun yellow, background lightens, plus a soft 3 px outline (150 ms).
* Validation runs on submit. Messages appear in a `role="status" aria-live="polite"` region with a 200 ms fade and a −4 px slide. The text is set immediately, so animation never delays feedback.
* `aria-invalid` is toggled on the input. Focus returns to the input on validation errors. The error clears as soon as the value becomes valid.
* **Success is shown only after a 2xx from `PUBLIC_NEWSLETTER_ENDPOINT`.** With no endpoint configured, the form says sign-ups aren't open yet. Network errors and non-2xx responses show an error and keep the typed address.

### 4.10 Article page

* **Reading progress:** a 3 px bar fixed at the top, `scaleX(0→1)` from the left, using brand leaf green, `aria-hidden`, `pointer-events: none`. It tracks the article from its top reaching the viewport top to its bottom reaching the viewport bottom.
  * Where supported, it's driven by CSS scroll-driven animation (`view-timeline: --article`, `animation-range: contain`), with zero JavaScript per frame.
  * Elsewhere, `reading-progress.ts` uses one passive scroll listener batched with `requestAnimationFrame`. Geometry is re-measured only on resize (ResizeObserver).
* **Table of contents:** a native `<details>`. The chevron rotates 180° and the list fades in, offset −6 px, over 200 ms. It isn't height-animated.
* **Anchors:** `scroll-behavior: smooth` (only with no-preference) and `scroll-padding-top` = header height + 24 px, so headings land below the sticky header. The targeted heading tints olive briefly (colour only, 1.6 s).
* The article body is never animated.

### 4.11 Category tiles and chips

* Tiles: border and background fade (200 ms). The colour swatch stretches `scaleX(1.5)` and the arrow nudges.
* Chips: background, border and colour fade (150 ms).

---

### 4.12 Harvest stage (homepage hero)

* Order: the harvest photo first, then the introduction (eyebrow, H1, lead, CTAs) under it.
* The photo has the load entrance (`data-hero-step="visual"`). While the page scrolls, it opens from a card aligned with the container to the full width (`clip-path: inset(...)` → `inset(0)`) and settles from `scale(1.08)` to `scale(1)` over the first 60vh (`animation-timeline: scroll(root)`).
* « Du champ » / « au flacon » start hidden, ±12vw apart, and slide in to meet in the middle of the photo over the first 25vh (12vh below 48rem, where the photo is shorter).
* Each line of the introduction rises in (opacity 0 → 1, `--motion-distance-hero`) as it enters the viewport: `animation-timeline: view()`, `animation-range: entry calc(var(--i) * 10%) entry calc(70% + var(--i) * 10%)`, so the lines follow one another.
* **The page is never pinned and no event is intercepted.** This is the deliberate alternative to scroll-expansion components that call `preventDefault()` on wheel/touch or reset `scrollTo(0, 0)`.
* Without scroll-driven animation support, or with reduced motion: card framed and still, words and introduction simply visible.
* The emblem sits in a badge on the photo; it keeps `.accent-sway` (the single looping accent) and `.accent-glow`.
* Image: `public/media/aloe-harvest-{640,1024,1600}.webp`, generated by `tools/prepare-hero-media.py` from `brand/source/aloe-harvest.webp`. Labelled « Illustration » in the caption.

### 4.13 Production line (homepage, /aloe-vera/)

* Six steps from field to bottle, each a note pinned on a lined-paper board (numbered 01–06, slight alternating tilt). Below 48rem the notes stack in one column; from 48rem they zig-zag left/right and a dashed path links them.
* The dashed path is uncovered from top to bottom as the board crosses the viewport (`view-timeline: --production`, `clip-path` keyframes `production-draw`, `animation-range: entry 25% cover 70%`). It runs once with the scroll and never loops, so the page keeps a single infinite animation. Without support or with reduced motion it is drawn in full.
* Notes use the shared scroll reveal (`[data-reveal]`); the tilt sits on an inner `.production__note` so it never fights the reveal transform. Hover (fine pointers, no reduced motion) straightens a note. No JavaScript.

## 5. Reduced motion (`prefers-reduced-motion: reduce`)

| Removed | Kept |
| --- | --- |
| Hero and page-header entrance animations (content is simply there) | All hover and focus colour feedback |
| Emblem breeze and glow | Focus rings, underline state for the current page |
| Reveal travel (distance 0) | Reveal as a 180 ms opacity fade |
| Image hover scale, arrow nudges | Menu open and close (opacity only, instant movement) |
| Smooth anchor scrolling | Reading progress (it maps scroll position; it doesn't animate on its own) |
| Spinner rotation (shown static) | Busy, success and error states and their text |
| TOC and status entrance slides | |

All of this is driven by token overrides plus a few `animation: none` rules. A component built only from tokens gets reduced-motion behaviour for free.

---

## 6. Mobile

* Shorter travel (10 px reveal, 12 px hero) and tighter stagger (50 ms).
* No ambient loop below 48rem, to save battery.
* Hover effects are gated by `(hover: hover) and (pointer: fine)`, so taps never trigger sticky hover scale.
* Tap feedback is immediate. Buttons use colour plus a 1 px press, with no delayed effects. `-webkit-tap-highlight-color` is replaced by the press state.
* No fixed overlays beyond the 3 px reading bar. The menu panel is absolutely positioned under the sticky header and doesn't lock scrolling.

---

## 7. Performance constraints

**Rules**

* Animate `opacity` and `transform` only. A test checks the transition properties of every `[data-reveal]` element.
* No `will-change`. Browsers promote layers while a transform or opacity animation runs, and the throttled scroll measurement below shows at most 1 slow frame in about 170 without it. Add it only if a profile on a real device shows a need.
* There is exactly one infinite animation, and it's paused off-screen.
* No scroll listeners except the reading-progress fallback (passive, rAF-batched).
* No layout reads inside animation loops, and no animation library.
* Images reserve space (`width`/`height` attributes plus `aspect-ratio` frames).
* Fonts: Latin subsets only. The three faces used in the first viewport are preloaded, with metric-matched fallbacks (`size-adjust`, `ascent-override`) to limit reflow.

**What ships** (from `npm run size` on the production build)

| | Raw | Gzip |
| --- | --- | --- |
| CSS (one file, all pages) | 29 KB | 6.3 KB |
| JS per page (inlined by Astro) | — | 2.0–2.2 KB |
| External JS files | 0 | 0 |
| Fonts actually fetched (woff2: Poppins 500/600/700 + Inter variable, Latin) | 70 KB | — (already compressed) |

**Measurements.** These are lab numbers: headless Chromium 141 on one machine against `astro preview`, so they're indicative, not field data.

Unthrottled (`tests/performance.spec.ts`, 1280×800 and Pixel 7):

| Page | CLS (load + full scroll) | LCP |
| --- | --- | --- |
| `/` | 0.0000 | 100–112 ms |
| `/articles/` | 0.0000 | 84–116 ms |
| `/rubriques/beaute/` | 0.0000 | 80–132 ms |
| `/articles/aloe-vera-bienfaits-peau/` | 0.0000 | 80–124 ms |

Throttled (`tools/measure-throttled.mjs`: Pixel 7, 4× CPU, 150 ms RTT, 1.6 Mbps, median of 3):

| Page | Motion | FCP | LCP | CLS | TBT≈ | Hero h1 settled | Frames > 50 ms while scrolling |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | default | 788 | 988 | 0.000 | 39 | 1485 ms | 1 / 168 |
| `/` | reduced | 788 | 788 | 0.000 | 54 | — | 0 / 177 |
| `/articles/` | default | 772 | 772 | 0.000 | 58 | 1482 ms | 0 / 177 |
| `/articles/` | reduced | 784 | 784 | 0.000 | 55 | — | 0 / 181 |
| `/articles/aloe-…` | default | 764 | 948 | 0.000 | 42 | 1463 ms | 0 / 176 |
| `/articles/aloe-…` | reduced | 772 | 772 | 0.000 | 62 | — | 0 / 178 |

Reading the numbers honestly:

* On the homepage and article pages, the entrance costs about **200 ms of LCP** under throttling compared with reduced motion. This is the price of the visual's settle-in, and we accept it. Archives have no motion on their LCP element.
* Chrome doesn't count elements that start at opacity 0 as LCP candidates, so the hero headline doesn't appear in the LCP figure. It's visible and fading in from first paint, and fully settled at **FCP + ~710 ms** (the "Hero h1 settled" column).
* Early runs measured a 0.0098 CLS from the headline rewrapping when Poppins swapped in. Preloading the first-view fonts brought it to 0.

---

## 8. Testing

```bash
npm install
npx playwright test          # builds, serves the production build on :4322, runs 2 projects
npm run size                 # after a build: bundle report
npx astro preview --port 4323 & node tools/measure-throttled.mjs   # throttled lab numbers
```

The Playwright suite (`tests/`) runs in two projects: **desktop** (1280×800, mouse) and **mobile** (Pixel 7: touch, no hover).

| Area | What is asserted |
| --- | --- |
| Hero | Content is in the DOM immediately, settles at opacity 1, and content steps end within 1 s |
| Accent | Sways on desktop only, pauses off-screen, and is the only infinite animation |
| Reveal | Everything is revealed after scrolling, stagger is capped, content is revealed after anchor jumps, and images fade in after load |
| Hover | Image scale between 1.01 and 1.025; card bounding box unchanged |
| Reduced motion | No entrance, loop, glow, travel, hover scale or smooth scroll; content still reveals |
| No JavaScript | Every `[data-reveal]` / `img[data-fade]` at opacity 1; mobile nav visible as a list |
| Failsafe | Module scripts stripped → `.motion` removed after 3 s → nothing hidden |
| Header | `.is-scrolled` toggles; `aria-current` underline drawn |
| Keyboard | Skip link first; focus rings solid on nav and CTAs |
| Mobile menu | `aria-expanded`/label, keyboard reachable, Escape restores focus, outside tap closes, link navigates, closed panel is `visibility: hidden`, gutter kept |
| Newsletter | Empty/invalid errors with `aria-invalid` and focus; no fake success without an endpoint; busy state then success on 2xx; error on 500 keeps input; polite live region |
| Article | Progress tracks 0 → ~0.5 → 1 (CSS path and JS fallback); TOC jump lands below the header; body never hidden |
| Performance | CLS < 0.1 on 4 pages × 2 projects (all measured 0.0000); reveal transitions limited to opacity and transform |
| Static output | No `astro-island` (no hydration anywhere) |
| All tests | Fail on any console error or uncaught exception |

### Manual checks before release

* macOS: System Settings → Accessibility → Display → Reduce motion. Windows: Settings → Accessibility → Visual effects → Animation effects off. Then reload and walk through the home, archive and article pages.
* Real mid-range Android device on 4G: scroll the homepage and an article, and open and close the menu.
* Safari and Firefox: the reading progress uses the JS fallback where scroll-driven animations aren't available. Check that the bar tracks the article.

---

## 9. Adding new motion: checklist

- [ ] Does it help the reader orient, understand a state change, or recognise the brand? If not, don't add it.
- [ ] Uses tokens only. No literal durations or curves.
- [ ] Animates only `opacity` and/or `transform`.
- [ ] Content is visible without JavaScript and without the animation.
- [ ] Has a reduced-motion behaviour: inherits from tokens, or `animation: none`.
- [ ] Hover-only effects are inside `@media (hover: hover) and (pointer: fine)`, and nothing essential needs hover.
- [ ] No new infinite animations. The hero emblem is the only one.
- [ ] Covered by a Playwright assertion.

---

## 10. Known limitations

* **Editorial imagery is illustrative.** Covers are generated SVG illustrations in the brand palette (`tools/generate-covers.mjs`). Swapping in real photography is a front-matter change. For large raster photos, add responsive `srcset` (Astro `<Image>`) and keep the `.media` frame for the placeholder and fade.
* **Newsletter has no backend.** Set `PUBLIC_NEWSLETTER_ENDPOINT` at build time. Without it the form honestly reports that sign-ups aren't open yet. A no-JS submission posts directly to the endpoint, but there is no server-rendered confirmation page.
* **No search.** The brand board shows a search icon, but no search feature exists yet, so the icon was left out rather than shipping dead UI.
* **Browser coverage tested:** Chromium only (Playwright's bundled Chromium 141). Safari and Firefox are NOT TESTED. The progressive-enhancement design means the worst case is "less motion", not hidden content.
* **Lab numbers only.** No field (RUM) data exists yet. Re-measure after deployment.
