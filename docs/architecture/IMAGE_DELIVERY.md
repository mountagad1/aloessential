# Image delivery specification

*2026-10-22. Covers editorial covers, the homepage photo, brand assets and share images. Google Discover eligibility signals are implementation considerations, not a promise of Discover traffic.*

## 1. Current inventory [measured]

| Family | Location | Format | Sizes | Shown where | Rights |
| --- | --- | --- | --- | --- | --- |
| Editorial covers | `public/covers/*.svg` | SVG, 1200 × 800 viewBox, 1.9–6.2 KB | one file, scales | article/product pages, cards | generated in-house (`tools/generate-covers.mjs`) |
| **Share twins of covers** (new) | `public/covers/*.jpg` | JPEG q85, **1200 × 800**, 17–50 KB | one | `og:image`, Article JSON-LD `image` only — never downloaded by visitors | derived from the SVG |
| Homepage photo | `public/media/aloe-harvest-{640,1024,1600}.webp` + `aloe-harvest-mobile-{480,800,1100}.webp` | WebP | 46 / 91 / 158 KB; mobile crop 31 / 62 / 94 KB | homepage hero, `srcset` + `sizes="100vw"` | **open question** in `docs/seo/ALOESSENTIAL_RISK_REGISTER.md` (AI-looking image supplied by the owner) |
| Brand | `public/brand/*` | WebP / PNG | icon 160/400/720, wordmark 433 × 80 (24 KB), OG default 1200 × 630 PNG | header, footer, favicon, default share image | owner |

Every `<img>` declares `width` and `height` (now tested), above-the-fold images load eagerly with `fetchpriority="high"`, the rest lazily with a fade.

## 2. Content-image data model

Articles and products carry `cover` (path) and `coverAlt` (text) in front matter (`src/content.config.ts`). Rules:

1. `cover` points to a file in `public/`. An SVG cover **must** have a `.jpg` twin of 1200 × 800 at the same path (`tools/rasterize-covers.mjs`). A raster cover (future photography) is used directly as the share image; it must be at least 1200 px wide.
2. `coverAlt` describes what the image shows, in the page's language, without keyword stuffing; illustrations say "Illustration de …".
3. One image file serves every locale: images are language-neutral. Only `coverAlt` is translated (INTERNATIONAL_SEO_ARCHITECTURE.md). Do not duplicate image files per locale unless the image contains text.
4. Rights: photography must record its source and licence. Proposed front-matter field when the first photo arrives: `coverCredit` (author, source, licence) — not added yet because no current image needs it.

## 3. Share images and Discover signals

| Signal | Implementation | Status |
| --- | --- | --- |
| Large raster share image per article/product | `og:image` = cover's JPEG twin, 1200 × 800, with `og:image:width/height/alt` | **done** (`src/lib/seo.ts` `coverShareImage`, `BaseLayout` `image` prop) |
| Article structured data image | `Article.image` = absolute URL of the JPEG twin | **done** |
| `max-image-preview:large` | `<meta name="robots" content="max-image-preview:large">` on every indexable page; absent on `noindex` pages | **done** |
| Image crawlability | `robots.txt` allows `/`; images are static files returning 200 | verified [config] |
| Image quality for Discover | Covers are flat illustrations; Discover favours compelling, high-quality images, typically photographs | **content decision** — replace key covers with licensed photos (backlog B10) |

Other pages (home, listings, legal) keep the 1200 × 630 brand image.

## 4. Responsive delivery

- Covers are SVG: one tiny file serves every screen; no responsive variants needed.
- The homepage photo offers 640/1024/1600 w for wide screens. Phones (≤ 30rem) get a `<picture>` source with a 1.4:1 crop centred on the harvester, 480/800/1100 w at WebP q70: a phone shows only ~70 % of the wide frame, so it no longer downloads the hidden part. Measured on a Pixel 7 profile: 1100 w chosen, **94 KB instead of 158 KB**; mobile homepage first view 283 → 222 KB; throttled LCP 1.77 → 1.47 s. Regenerate with `python3 tools/prepare-hero-media.py`.
- Vercel Image Optimization is **not** used and is not needed while images are pre-generated; adopting it would add per-transformation cost and a runtime dependency.
- AVIF: not adopted. WebP already serves the one photo; revisit when photography becomes common (measure the saving first).

## 5. Validation

Automated (`tests/delivery.spec.ts`, `tests/seo.spec.ts`):

- every cover referenced by articles, products and fixtures has a JPEG twin that is a valid JPEG of exactly 1200 × 800;
- articles and products expose that twin as `og:image` with width, height and alt; other pages expose the brand image;
- Article JSON-LD `image` points to the raster and the file exists in the build;
- every indexable page has `max-image-preview:large`, the 404 does not;
- every `<img>` in the build declares `width` and `height`.

Manual, after deployment: paste an article URL into the Facebook Sharing Debugger / LinkedIn Post Inspector and Google's Rich Results Test; check the image renders.

Workflow when adding an article with a new SVG cover:

```sh
node tools/generate-covers.mjs      # if the cover is generated
node tools/rasterize-covers.mjs     # writes public/covers/<name>.jpg
npx playwright test tests/delivery.spec.ts --project=desktop
```
