# Performance baseline

*Measured 2026-10-22 on the production build (`npm run build`), served locally by `astro preview` in the session container (4 vCPU). These are **lab numbers**: they describe this machine and these profiles, not real users. No field data (CrUX, RUM) exists yet — see OBSERVABILITY.md.*

## 1. Build output [measured]

`npm run size` (before this audit's changes; the changes add no JS and ~0.3 KB CSS):

| Group | Files | Raw | Gzip |
| --- | --- | --- | --- |
| HTML | 36 | 906.8 KB | 275.8 KB |
| CSS | 1 | 45.1 KB | 9.1 KB |
| JS (external) | 0 | 0 | 0 |
| Fonts | 7 | 100.8 KB | 100.8 KB |
| Images | 32 | 798.9 KB | 752.8 KB |

Inline JavaScript per page: 2.0–2.7 KB gzip. No hydration, no client framework.

## 2. Cold first view: requests and transfer [measured]

Same-origin requests recorded by Chromium after loading and scrolling the full page; bytes are Brotli (q11) sizes of text files and raw sizes of images and fonts, i.e. close to what the CDN sends. Script: the request recorder used for this audit (method described here so it can be repeated: Playwright, record `request` events, sum file sizes from `dist/`).

| Page | Mobile (Pixel 7) req / KB | Desktop (1366 px) req / KB | Dominant cost |
| --- | --- | --- | --- |
| `/` | 13 / 282.7 | 15 / 277.5 | hero WebP 192 KB (1600 w chosen on mobile) |
| `/articles/jus-aloe-vera-science/` | 11 / 112.0 | 11 / 105.0 | fonts 62–70 KB |
| `/produits/set-vitalite/` | 8 / 110.7 | 8 / 110.7 | fonts |
| `/rubriques/beaute/` | 14 / 136.3 | 13 / 128.7 | fonts, card covers |
| `/articles/` | 17 / 116.3 | 21 / 111.8 | fonts, card covers |
| `/aloe-vera/` | 11 / 112.7 | 15 / 109.2 | fonts |
| `/contact/` | 9 / 130.4 | 8 / 122.8 | fonts, brand images |

Fonts (62–70 KB) and CSS (8 KB) are hashed and `immutable`: they are paid once per browser, not per page view.

## 3. Throttled lab profile [measured]

`node tools/measure-throttled.mjs` — Pixel 7 viewport, 4× CPU slowdown, 150 ms RTT, 1.6 Mbps down; median of 3 runs; times in ms.

| Page | FCP | LCP | CLS | TBT (approx.) |
| --- | --- | --- | --- | --- |
| `/` | 888 | 1768 | 0.000 | 114 |
| `/articles/` | 820 | 820 | 0.000 | 48 |
| `/articles/aloe-vera-bienfaits-peau/` | 812 | 924 | 0.000 | 36 |

With `prefers-reduced-motion: reduce`: `/` LCP 1752, `/articles/` 824, article 812. CLS stays 0 in every case; the Playwright suite also enforces CLS < 0.1 after a full scroll on four pages (`tests/performance.spec.ts`).

After the mobile hero crop (2026-10-22, same profile): `/` FCP 844, **LCP 1484**, CLS 0.000; mobile homepage first view 222.3 KB (was 282.7 KB).

Reading: LCP is under Google's 2.5 s "good" threshold in this harsh lab profile for all three pages. The homepage LCP is the hero photo (finding F10 in SCALABILITY_AUDIT.md).

## 4. Catalogue growth [measured]

`node tools/scale-check.mjs <N>` and an earlier manual run on the same container:

| Synthetic articles | Pages | Build time | `dist/` | Largest HTML |
| --- | --- | --- | --- | --- |
| 0 (today) | 36 | 3–5 s | 2.2 MB | 38 KB (`/`) |
| 500 | 536 | 11.2 s | 19 MB | — (before pagination) |
| 2,000 | 2,036 | 28.0 s | 69 MB | — (before pagination) |
| 5,000 (before pagination) | 5,036 | 64.7 s | 170 MB | **5.3 MB** (`/articles/`) |
| 5,000 (with pagination) | 5,452 | 31.8 s | 147 MB | **41 KB** (`/rubriques/conseils/`) |

The two 5,000-article runs differ by code and by run; treat build time as ±50 % noise on a shared container. Vercel build machines are different hardware: these timings indicate the trend (roughly linear), not Vercel's build time.

## 5. Not measured

- Real-user Core Web Vitals (no RUM, CrUX has no data for a new origin).
- INP: needs real interactions; the only interactive pieces are the menu, the dialog and the newsletter form, all light.
- Production TTFB per region (would need multi-region probes).
- Behaviour under load: see LOAD_TEST_PLAN.md for why a load test of a CDN-cached static site measures the provider, and how to run one safely if wanted.

## How to repeat

```sh
npm run build && npm run size
npx astro preview --port 4323 &   # then:
node tools/measure-throttled.mjs http://localhost:4323
node tools/scale-check.mjs 5000
```
