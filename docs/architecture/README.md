# Architecture — Aloessential

*Scalability, performance and international SEO programme, started 2026-10-22. Base commit `7bc1d50`; the changes described here are in the working tree, **not committed or deployed**.*

## Documents

| Document | Contents |
| --- | --- |
| [SCALABILITY_AUDIT.md](SCALABILITY_AUDIT.md) | System inventory with evidence, bottleneck and risk register (F1–F14), security review |
| [PERFORMANCE_BASELINE.md](PERFORMANCE_BASELINE.md) | Lab measurements: weights, requests, throttled FCP/LCP/CLS, catalogue build scaling |
| [CAPACITY_MODEL.md](CAPACITY_MODEL.md) | 1 M visits/month model: formulas, base/peak/growth scenarios, cost drivers, thresholds |
| [TARGET_ARCHITECTURE.md](TARGET_ARCHITECTURE.md) | Current and target diagrams, request flows, dynamic-workload rules, resilience |
| [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) | ADR-001 to ADR-009 |
| [CACHING_STRATEGY.md](CACHING_STRATEGY.md) | Cache policy matrix, stale-content rule, validation commands |
| [IMAGE_DELIVERY.md](IMAGE_DELIVERY.md) | Image data model, share images, Discover signals, validation |
| [INTERNATIONAL_SEO_ARCHITECTURE.md](INTERNATIONAL_SEO_ARCHITECTURE.md) | Locale design for fr/en/es/de/it/pt-pt/pl, decisions needed, regression checks |
| [OBSERVABILITY.md](OBSERVABILITY.md) | What to measure, alerts, cost and security monitoring |
| [LOAD_TEST_PLAN.md](LOAD_TEST_PLAN.md) | Why and how to load test safely (not executed) |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | Current setup, deploy steps, post-deploy checks |
| [ROLLBACK_PLAN.md](ROLLBACK_PLAN.md) | Instant and code rollback, per-change revert effects |

Related, older: `docs/seo/` (SEO baseline, route inventory, risk register), `docs/aloessential/` (motion system, product content rules).

## Executive summary

**Architecture found.** Aloessential is a fully static Astro 5 site: 36 prerendered pages, 0 serverless functions, 0 database, 0 runtime API calls, about 2 KB of inline JavaScript per page, everything served from Vercel's CDN cache (`x-vercel-cache: HIT` observed on HTML, CSS, images and sitemap). French only.

**What 1 M visits/month means here.** About 0.6 page views per second on average, around 1.5 in a peak hour and up to around 30 in a Discover-style burst minute, roughly 14–18 M CDN requests and **120–230 GB of transfer per month**. These figures are estimates: traffic shape is assumed, page weights are measured. Serving that from a CDN is not a throughput problem. The binding constraints are:

1. **Vercel plan and terms (blocker, owner).** The plan could not be read through the API. Vercel's guidelines restrict Hobby to non-commercial use, and this site carries partner links. They also list Hobby transfer at up to 100 GB, which is below the estimate.
2. **No measurement.** Analytics and real-user monitoring are off, so no capacity or Core Web Vitals claim can be checked against reality.
3. **Catalogue growth.** Listings embedded every article; at 5,000 articles `/articles/` would have been a 5.3 MB page. **Fixed:** the largest page is now 41 KB at 5,000 articles.

**Implemented** (working tree, tested, not deployed):
- listing pagination;
- per-article raster share images and `max-image-preview:large`;
- security headers;
- browser caching for unhashed images;
- deterministic article order;
- a catalogue scale-check tool;
- 11 new regression tests.

**Not done and why:**
- International SEO is designed, not built: it needs six owner decisions and real translations.
- No load test was run: it needs authorisation, and it would measure Vercel's CDN rather than this code.
- The Astro 7 upgrade for `npm audit` findings is deferred: the affected features are not used, and a major upgrade deserves its own change.

## Prioritised backlog

| ID | Item | Priority | Impact | Effort | Owner action? | Status |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | Confirm Vercel plan; move to Pro if on Hobby | P1 | compliance, transfer headroom | XS | **yes** | open |
| B2 | Deploy this change set (pagination, share images, headers) and run post-deploy checks | P1–P2 | SEO, security, fewer requests | XS | **yes** (push = production) | ready |
| B3 | Enable cookieless analytics + Speed Insights; verify Search Console, submit sitemap | P1 | measurement | S | **yes** | open |
| B4 | Upgrade Astro 5 → 7 (clears `npm audit`), full regression run | P2 | security hygiene | M | review | open |
| B5 | Gate production on CI: protected `main` as production branch (ADR-007) | P2 | availability | S | **yes** | open |
| B6 | Homepage hero: 1.4:1 mobile crop (480/800/1100 w) for screens ≤ 30rem | P2 | hero 158 → 94 KB on phones; mobile homepage 283 → 222 KB; throttled LCP 1.77 → 1.47 s | S | no | **done** |
| B7 | Lighter header wordmark (SVG or smaller WebP) | P3 | −10–20 KB per first view | S | no | open |
| B8 | i18n step 1: locale registry, content fields, one extra locale end to end, hreflang + sitemap alternates + tests | P4 | international SEO | M | **decisions D1–D6** | designed |
| B9 | Sitemap index when > 40 k URLs | P4 | crawl | S | no | not needed yet |
| B10 | Licensed photography for key articles (Discover) | P4 | Discover eligibility | content | **yes** | open |
| B11 | `npm audit` + Dependabot in CI | P5 | security monitoring | XS | partly | open |
| B12 | Uptime probe and usage alerts | P5 | operations | XS | **yes** | open |
| B13 | Staging load test per LOAD_TEST_PLAN.md (optional) | P6 | provider validation | S | **authorisation** | not run |

## Tests (2026-10-22, this working tree)

- `npm run build`: 36 pages, no errors.
- `npx playwright test`: **142 passed, 30 skipped, 0 failed**. The skips are by design: the file-scan suites run once, on desktop, and the device-specific tests run only on their device. Before the change: 131 passed, 19 skipped.
- New `tests/delivery.spec.ts` (11 tests), all passing. A mutation check removed one share image and the suite failed as expected.
- `node tools/scale-check.mjs 5000`: passes, largest page 41.0 KB, 5,451 sitemap URLs, build 31.8 s.
- Not tested:
  - production headers after deployment (nothing deployed);
  - real-user metrics;
  - load;
  - other locales (none exist).
