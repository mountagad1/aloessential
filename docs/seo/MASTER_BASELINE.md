# SEO master baseline

*Snapshot of 2026-10-27. Re-run the same checks to compare before and after a change.*

Evidence levels, as elsewhere in `docs/`:
- **OBS:** observed on the date shown (code, build, test, production response or a first-party API call).
- **EXT:** third-party estimate (DataForSEO through OpenSEO).
- **INC:** unknown or not measurable today.

This file is the entry point. Earlier baselines stay valid for what they cover:
- `docs/seo/ALOESSENTIAL_BASELINE.md`: first SEO baseline (2026-10-16).
- `docs/growth/GROWTH_ENGINEERING_STRATEGY.md`: growth audit (2026-10-26).
- `docs/architecture/PERFORMANCE_BASELINE.md`: performance (2026-10-22).

## 1. Site inventory (OBS, build of 2026-10-27)

| Measure | Value |
| --- | --- |
| Framework | Astro 5.18.2, fully static output (`output: "static"`), deployed on Vercel. No server code runs at request time |
| Indexable pages | 201, all listed in `/sitemap.xml` (186 KB, one file) |
| Pages with `noindex` | none apart from the 404 page, which is not in the sitemap |
| Canonicals | 201 of 201 self-referencing, absolute, trailing slash |
| Locales | 7: fr (38 URLs), en, es, de, it (28 each), pl (27), pt-pt (24) |
| Page types | 112 articles, 20 product pages, 6 product listings, 28 category pages, 7 homes, 21 tool pages, 1 article listing, 6 French-only pages |
| Automated tests | 294 Playwright tests pass (66 more are skipped by design: file checks run once, on the desktop project); SEO, i18n, indexation, delivery, accessibility basics, tools |
| Production sitemap | identical to the build (201 URLs, checked 2026-10-27) |

Breakdown by locale: `international/LOCALE_INDEXABILITY_MATRIX.md`.

## 2. Search Console (OBS, `sc-domain:aloessential.com`, read through OpenSEO)

Window 2026-09-27 to 2026-10-24. Google reports nothing before 2026-10-15. The last ~3 days are incomplete.

| Measure | Value |
| --- | --- |
| Clicks | 7, of which 5 go to the home or team page (likely brand searches) |
| Impressions | 197 |
| Daily impressions, last 5 days | 32, 32, 24, 35, 33 |
| Pages with impressions | 28, all French: translations went live on 2026-10-24 and the tools on 2026-10-27, after the window |
| Query and page pairs | 57 |

### Positions that matter

| Page | Impressions | Average position | Reading |
| --- | --- | --- | --- |
| `/articles/hydratation-aliments-riches-en-eau/` | 48 | 74.8 | most impressions; queries "légumes/fruits riches en eau" |
| `/produits/` | 22 | 28.8 | LR brand queries |
| `/articles/cultiver-aloe-vera-en-pot/` | 20 | 80.5 | watering queries ("arroser aloe vera en pot", position ~90) |
| `/articles/aloe-vera-bienfaits-peau/` | 18 | 77.6 | "aloe vera peau" cluster |
| `/articles/digestion-foie-detox-complements/` | 18 | 37.8 | "complément détox" queries, positions 20 to 75 |
| `/produits/capsules-pro-12-plus/` | 16 | 8.3 | "pro 12 lr avis", position 9 |

## 3. Index status (OBS, URL Inspection API, 2026-10-27)

10 URLs inspected: `indexation/INDEXATION_BASELINE.md`.
- **Indexed, Google canonical = declared canonical:** the French hydration article, the water calculator (crawled the day it went live), and the four translated pages inspected.
- **"Discovered – currently not indexed":** the fibre table (fr, de) and the aloe watering planner, all published the same day.
- **"URL is unknown to Google":** `/articles/2/`. This is expected: the URL does not exist and is not linked.

## 4. Production behaviour (OBS, 2026-10-27)

| Request | Response |
| --- | --- |
| `https://www.aloessential.com/` | 308 to `https://aloessential.com/` |
| `https://aloessential.com/articles` (no slash) | 308 to `/articles/` |
| Unknown path, upper-case path, `/product/aloe-first-spray/` (legacy) | 404 |
| `/articles/?utm_source=x` | 200 with a canonical without the parameter |
| `/robots.txt` | `Allow: /`, points to the sitemap |
| `http://` variants | **INC**: port 80 is blocked from the audit environment. Search Console reported `http://aloessential.com/` as "Crawled – currently not indexed" on 2026-10-26, consistent with a redirect |

## 5. Live SERPs (OBS, DataForSEO through OpenSEO, 2026-10-27, desktop, top 10)

Five queries were fetched: "aliments riches en fibres", "combien de litres d'eau par jour", "arroser aloe vera", "aloe vera peau" (France, fr) and "ballaststoffreiche Lebensmittel" (Germany, de). All five show an AI Overview first, and four show a People Also Ask block. Details: `research/COMPETITOR_GAP_ANALYSIS.md`.

## 6. What is not measured (INC)

- Analytics: none installed (owner decision MEAS-01), so no engagement, tool usage, conversions or AI referrals.
- Field Core Web Vitals: none.
- Backlinks: no backlink data was pulled; OpenSEO has no credits left.
- Server logs: not available. Vercel keeps no crawl logs for static files, so crawl frequency is not observable.
- Search volumes beyond those listed in `docs/growth/ENGINEERING_AS_MARKETING_BACKLOG.md`.
