# Aloessential

**Naturellement essentiel.** An editorial wellness publication about health, beauty, nutrition and everyday advice, built around the natural world.

- **Stack:** [Astro](https://astro.build) 5, static output, no UI framework and no client-side hydration.
- **Motion:** CSS-first, no animation library. See [`docs/aloessential/MOTION_DESIGN_SYSTEM.md`](docs/aloessential/MOTION_DESIGN_SYSTEM.md).
- **Tests:** Playwright against the production build (desktop and mobile projects).
- **Architecture, capacity and caching:** see [`docs/architecture/`](docs/architecture/README.md).

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve the build
npx playwright test
npm run size       # after a build: what ships, raw and gzip
```

Copy `.env.example` to `.env` and set `PUBLIC_NEWSLETTER_ENDPOINT` to enable newsletter sign-up. The endpoint receives a POST with a JSON body `{"email": "..."}`, and any 2xx response counts as success.

## Project layout

```
src/
  content/articles/   Markdown articles (front matter: title, description, category, date, cover, coverAlt, featured)
  data/categories.ts  The four sections: Conseils, Santé, Beauté, Nutrition
  components/         Header, Footer, Hero, ArticleCard, CardGrid, FeaturedArticle, Newsletter, TOC, ReadingProgress, Icon
  layouts/            BaseLayout (head, motion boot script, header and footer)
  pages/              /, /articles/, /articles/[slug]/, /rubriques/[slug]/, 404
  scripts/            motion, header, newsletter and reading-progress (progressive enhancement)
  styles/             tokens.css (brand and motion tokens), motion.css, global.css
public/brand/         Web-ready brand assets (generated)
public/covers/        Editorial cover illustrations (generated SVG placeholders)
brand/source/         Original brand artwork: brand board, wordmark, icon, lockup
tools/                Asset generators, bundle report, throttled measurement
tests/                Playwright suite
```

## Brand assets

`brand/source/` holds the original artwork. To regenerate the web assets (requires Python 3 with Pillow):

```bash
python3 tools/prepare-brand-assets.py   # wordmark (colour and white), emblem, favicons
node tools/generate-covers.mjs          # cover illustrations
node tools/rasterize-covers.mjs        # 1200 × 800 JPEG twin of each cover (share images; required by tests)
python3 tools/generate-og-image.py       # default share image (public/brand/og-default.png)
python3 tools/prepare-hero-media.py     # homepage harvest photo (public/media/)
```

Catalogue growth check (synthetic articles in a temporary copy; nothing is written to the repository):

```bash
node tools/scale-check.mjs 5000
```

Translations (see [`docs/i18n/TRANSLATION_WORKFLOW.md`](docs/i18n/TRANSLATION_WORKFLOW.md)):

```bash
node tools/i18n-status.mjs                        # coverage per locale, drafts, stale translations
node tools/new-translation.mjs it <id> <slug>     # start a draft from a French article
node tools/i18n-status.mjs --stamp it/<slug>      # record the French version a translation matches
```

## Adding an article

Create `src/content/articles/<slug>.md`:

```md
---
title: "Titre de l'article"
description: "Une phrase de résumé."
category: conseils   # conseils | sante | beaute | nutrition
date: 2026-10-15
cover: /covers/aloe-peau.svg
coverAlt: "Description de l'image"
featured: false      # true puts it in "À la une" on the homepage
---
```

## SEO foundations

- Canonical origin: `https://aloessential.com`, every page URL ends with `/` (`site` and `trailingSlash: "always"` in `astro.config.mjs`).
- `src/layouts/BaseLayout.astro` emits the canonical, Open Graph (shared image `public/brand/og-default.png`) and one JSON-LD `@graph` per page; helpers live in `src/lib/seo.ts`.
- `/sitemap.xml` and `/robots.txt` are generated from the content (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`); drafts and the 404 page are never listed.
- Structured data only describes what a page shows: Organization, WebSite, Article, BreadcrumbList. No Product, Offer, Review or rating markup.
- `tests/seo.spec.ts` checks canonicals, title and description lengths, JSON-LD, the sitemap and trailing slashes on every built page.

## Product pages (LR partner selection)

Products live in `src/content/products/<slug>.md` and only get a public page at `/produits/<slug>/` once `status: published`. Follow [`docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md`](docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md): every composition, dose and usage line comes from the official LR page, and health claims must be authorised EU claims. To link an article to products, add `products: [slug-a, slug-b]` to its front matter.

Tests build with `CONTENT_FIXTURES=1`, which adds the fictional entries in `tests/fixtures/` and writes the output to `dist-test/`.

## Deployment

Hosted on Vercel (project `aloessential`). Every push to the production branch deploys to https://aloessential.com. `vercel.json` redirects `www.aloessential.com` to the apex domain and adds the trailing slash. `.github/workflows/ci.yml` runs the build and the Playwright suite on every push.
