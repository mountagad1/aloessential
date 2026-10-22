# Capacity model — 1,000,000 visits per month

*2026-10-22. This is a planning model, **not** a claim that the site has served or been tested at this volume. There is no production traffic data (Web Analytics disabled), so every traffic-shape input below is an **assumption**; page weights and request counts are **measured** in the lab (PERFORMANCE_BASELINE.md).*

## 1. Workload shape

The whole site is prerendered static files cached on Vercel's CDN (SCALABILITY_AUDIT.md §1). A visit therefore costs:

- **CDN edge requests** (HTML, CSS, fonts, images): no function, database or third-party call behind them;
- **bytes transferred** from the CDN to browsers;
- nothing at the origin except cache fills after each deployment.

So the questions are bandwidth, request count, plan terms and catalogue size, not CPU or database throughput.

## 2. Inputs

| Input | Value | Type | Confidence |
| --- | --- | --- | --- |
| Visits per 30-day month | 1,000,000 | planning target | — |
| Page views per visit (P) | 1.3 / **1.6** / 2.0 (low / mid / high) | assumption (search-led content sites often sit in this band) | L |
| Cold first-view requests | 8–21 per page, median ≈ 12 | measured (lab) | H |
| Cold first-view transfer | 105–283 KB; articles/products ≈ 112 KB, homepage ≈ 280 KB | measured (lab) | H |
| Landing mix | 70 % article/product, 15 % homepage, 15 % listings/other | assumption | L |
| Next view in the same visit | ≈ 25 KB (HTML ≈ 7 KB + card images); ≈ 3 requests after the cache-header change, ≈ 6 before | estimate from measured files | M |
| Bot traffic | +20–50 % HTML requests, mostly HTML only (≈ 8 KB) | assumption | L |
| Peak hour vs average hour | ×2.5 | assumption (French-speaking audience, day-time traffic) | L |
| Burst | 30,000 visits in one hour (e.g. a Discover or social spike) | assumption | L |

## 3. Calculations (mid case unless stated)

| Quantity | Formula | Result |
| --- | --- | --- |
| Visits per day | 1,000,000 / 30 | 33,333 |
| Visits per second (average) | 33,333 / 86,400 | 0.39 |
| Page views per month | 1,000,000 × P | 1.3 M / **1.6 M** / 2.0 M |
| Page views per second (average) | 1.6 M / 2,592,000 | **0.62** (0.50 – 0.77) |
| Peak-hour page views per second | 0.62 × 2.5 | **1.5** |
| Burst page views per second | 30,000 × 1.2 PV / 3,600 s; ×3 for the first minutes | **10**, momentarily **≈ 30** |
| HTML requests per month | 1.6 M + bots (20–50 %) | ≈ 1.9 – 2.4 M |
| Edge requests per visit | 12 + (P − 1) × 3 | ≈ 14 |
| Edge requests per month | 1 M × 14 + bot HTML | **≈ 14 – 17 M** (≈ 18 M before the cache-header change) |
| Edge requests per second at burst | 30 PV/s × 12 | ≈ 360 req/s, all CDN cache hits |
| First-view weight (mix) | 0.70 × 112 + 0.15 × 280 + 0.15 × 125 | ≈ 139 KB |
| Transfer per visit | 139 + (P − 1) × 25 | ≈ 154 KB |
| **Transfer per month** | 1 M × 154 KB + bots ≈ 3 GB | **≈ 155 GB** (low ≈ 120 GB with P = 1.3 and article landings; high ≈ 230 GB with P = 2.0 and 200 KB first views) |
| Function invocations | — | **0** |
| Database queries | — | **0** |
| Third-party runtime calls | — | **0** |

Cacheable share: 100 % of public responses are static and CDN-cached [measured: `x-vercel-cache: HIT` on HTML, CSS, images, sitemap and 404].

## 4. Scenarios

| Scenario | Visits / month | Avg PV/s | Peak PV/s | Transfer / month | Edge requests / month | First likely limit |
| --- | --- | --- | --- | --- | --- | --- |
| Today | unknown | unknown | unknown | unknown | unknown | measurement (F3) |
| **Base** | 1 M | 0.6 | 1.5 (hour), ≈ 30 (burst minute) | 120 – 230 GB | 14 – 18 M | **plan included usage and terms** (F2) |
| Growth | 10 M | 6 | 15 (hour), ≈ 300 (burst minute) | 1.2 – 2.3 TB | 140 – 180 M | **bandwidth cost**; image weight becomes the main lever |
| Catalogue growth | — | — | — | — | — | build time and sitemap size at tens of thousands of pages (§6) |

At these request rates a CDN serving cached static files is not near a throughput limit; the binding constraints are contractual and financial. **This is a reasoned expectation, not a measured result**: no load test was run (LOAD_TEST_PLAN.md explains why and how).

## 5. Cost drivers and review thresholds

No prices are quoted here: Vercel's prices and included amounts change, and the team's plan is unknown. Verify on https://vercel.com/pricing and the team's Usage page before any decision.

| Driver | Unit | Grows with | Lever |
| --- | --- | --- | --- |
| Fast Data Transfer | GB | visits × page weight | lighter hero (B6, done), wordmark (B7), browser caching (done) |
| Edge Requests | count | visits × requests per view | browser caching of images (done), fewer image files per page |
| Build minutes | minutes | deploys × build duration | batch content changes; scale-check |
| Image Optimization | transformations | not used | keep pre-generated variants |
| Functions | invocations, GB-hours | not used | keep public pages static |

Plan terms, as published by Vercel when checked on 2026-10-22: Vercel's fair-use guidelines state that Hobby is for non-commercial personal use only, and that commercial usage requires Pro or Enterprise. The same guidelines list Hobby Fast Data Transfer up to 100 GB and Pro up to 1 TB. Aloessential carries partner links (commercial intent), and the base scenario exceeds 100 GB. **The owner must confirm the plan** (SCALABILITY_AUDIT.md F2). Edge-request allowances were not confirmed from an official page in this audit.

Recommended alerts (configure in Vercel Spend Management / usage notifications once the plan is known):

- monthly Fast Data Transfer above 70 % of the included amount;
- monthly Edge Requests above 70 % of the included amount;
- any build longer than 10 minutes or failing;
- `tools/scale-check.mjs` failing (largest page > 150 KB or sitemap > 50,000 URLs).

## 6. Catalogue and build capacity

| Pages | Build time on the audit container | Notes |
| --- | --- | --- |
| 36 (today) | 3–5 s | measured |
| 5,452 (5,000 articles) | 32–65 s | measured, two runs |
| ≈ 38,000 (5,000 articles × 7 locales + listings) | ≈ 3.5–8 min | **extrapolation**, linear trend assumed |

Storage: `dist/` reached 147 MB at 5,000 articles [measured]. Each article adds about 27 KB of HTML per locale plus its share image (20–50 KB JPEG); covers are shared between locales (IMAGE_DELIVERY.md). Check Vercel's deployment size and build duration limits for the plan before passing ~20,000 pages.

Sitemap: 5,451 URLs at 5,000 articles [measured]; the protocol limit is 50,000 URLs per file. Split into a sitemap index before 40,000 URLs (backlog B9). With seven locales, 5,000 articles per locale already gives ≈ 38,000 URLs: plan one sitemap per locale under a sitemap index as part of the i18n rollout.

## 7. Missing measurements (in priority order)

1. Real monthly visits, page views per visit, landing mix and bot share — needs analytics (OBSERVABILITY.md).
2. Real peak shape (hourly profile, largest burst).
3. Field Core Web Vitals by page type.
4. Vercel usage figures (Fast Data Transfer, Edge Requests) from the team's Usage page.
5. The team's plan and its current included amounts.

Re-run this model with those numbers once 30 days of analytics exist.

## Sources

- Vercel fair use guidelines: https://vercel.com/docs/limits/fair-use-policy
- Vercel limits: https://vercel.com/docs/limits
- Vercel pricing: https://vercel.com/pricing
