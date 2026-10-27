# Repository SEO map

Where each search-related concern lives in the code (verified 2026-10-27). Change the source listed here, never a generated output.

## Build and delivery

| Concern | Source | Notes |
| --- | --- | --- |
| Rendering | `astro.config.mjs` | `output: "static"`: every page is HTML built at deploy time. No SSR, ISR or client hydration. Googlebot receives the full content in the first response |
| Canonical origin and trailing slash | `astro.config.mjs` (`site`, `trailingSlash: "always"`), `vercel.json` (`trailingSlash: true`) | apex domain; `www` redirects with a 308 (`vercel.json`) |
| Security and cache headers | `vercel.json` | static assets cached by the Vercel CDN |
| Build commands | `package.json` | `npm run build` (production, `dist/`); tests build with `CONTENT_FIXTURES=1` into `dist-test/` |

## Routes

| Page type | Route file | Data |
| --- | --- | --- |
| French home, article listing, articles | `src/pages/index.astro`, `src/pages/articles/` | `src/content/articles/*.md` |
| French categories | `src/pages/rubriques/[slug]/[...page].astro` | `src/data/categories.ts` |
| French products | `src/pages/produits/` | `src/content/products/*.md` |
| Every page of the other 6 locales | `src/pages/[locale]/[...path].astro` | published translations only (`status: published`) |
| Aloe vera guide (French only) | `src/pages/aloe-vera.astro` | |
| Tools, French | `src/pages/aloe-vera/arrosage.astro`, `src/pages/combien-d-eau-par-jour.astro`, `src/pages/aliments-riches-en-fibres.astro` | `src/data/watering.ts`, `water.ts`, `fibre.ts`, `foods.ts` |
| Tools, other locales | `src/pages/[locale]/[...path].astro` (kinds `watering`, `water`, `fibre`) | localized URLs in `src/i18n/*-ui.ts` |
| Legal and publisher pages (French only) | `src/pages/{transparence,equipe,contact,mentions-legales,confidentialite}.astro` | |
| 404 | `src/pages/404.astro` | `noindex`, no canonical |

Full list with intent: `docs/seo/ALOESSENTIAL_ROUTE_INVENTORY.md`.

## Signals

| Signal | Source |
| --- | --- |
| `<title>`, description, canonical, robots, Open Graph, hreflang | `src/layouts/BaseLayout.astro` (props `title`, `description`, `noindex`, `alternates`) |
| hreflang sets | `src/lib/articles.ts` (`articleAlternates`, `homeAlternates`, `categoryAlternates`), `src/lib/products.ts`, `src/i18n/*-ui.ts` (`*Alternates` for tools) |
| Structured data | `src/lib/seo.ts`: Organization, WebSite, BreadcrumbList, Article (with `dateModified`), ImageObject; WebPage with `primaryImageOfPage` on products |
| Sitemap | `src/pages/sitemap.xml.ts`: built once at deploy time from the same functions as the HTML hreflang |
| robots.txt | `src/pages/robots.txt.ts` |
| Article dates | front matter `date` (publication) and optional `updated` (last meaningful change); `src/content.config.ts` |
| Locales and URL segments | `src/i18n/locales.ts` (single source of truth) |
| Translation freshness | `tools/i18n-status.mjs`, `tools/i18n-lib.mjs` (`sourceHash`) |

## Internal discovery

| Path | Source |
| --- | --- |
| Header navigation, language switcher | `src/components/Header.astro` |
| Footer: categories, tools (every locale), explore | `src/components/Footer.astro` |
| Breadcrumbs | `ArticleView.astro`, `ProductView.astro`, tool views |
| Related articles and cards | `ArticleView.astro`, `CardGrid.astro` |
| Contextual links | article bodies (`src/content/articles/**`); rules in `docs/growth/INTERNAL_LINKING_STRATEGY.md` |

## Checks

| Check | Command or file |
| --- | --- |
| Test suite | `npm test` (Playwright against `dist-test/`) |
| SEO foundations: canonical, titles, sitemap parity, JSON-LD | `tests/seo.spec.ts` |
| Indexation guards: sitemap eligibility, lastmod, tool discovery | `tests/indexation.spec.ts` |
| hreflang reciprocity, translation freshness | `tests/i18n.spec.ts` |
| Internal-link audit (orphans, broken links, cross-language links) | `npm run seo:audit -- <dist>` (`tools/seo-audit.mjs`) |
| Translation status | `node tools/i18n-status.mjs` |
| Food data extraction | `python3 tools/extract-ciqual.py <Ciqual.xlsx>` |
