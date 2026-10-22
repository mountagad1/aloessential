# Load test plan

*2026-10-22. Status: **plan only — no load test has been run**, against production or anything else. No capacity claim in these documents rests on a load test.*

## 1. What a load test can and cannot show here

Every response is a static file served from Vercel's CDN cache. A load test would therefore measure Vercel's CDN, not code we wrote, and would cost real bandwidth and edge requests on the team's bill. A test against a local `astro preview` server would measure a Node development preview server that production does not use — it says nothing about production capacity. So:

- Throughput capacity at the modelled peak (≈ 30 page views/s, ≈ 360 req/s; CAPACITY_MODEL.md) is a provider question, best answered by Vercel's published limits and the team's plan.
- The useful things to test are **correctness under concurrency** (cache hits, no 5xx, redirects) and **latency from real regions**, at a modest rate.

## 2. Preconditions (all required)

1. Written authorisation from the owner, naming the target URL, date and maximum rate.
2. Plan confirmed (CAPACITY_MODEL.md §5) and spend cap set: a test of N requests costs N edge requests plus N × page weight in transfer.
3. Target: a **preview deployment** of the commit under test, not the production domain. Previews are behind Vercel SSO protection; use a protection-bypass token generated for the test and revoked afterwards (never committed or logged).
4. Vercel Firewall / DDoS mitigation may challenge synthetic traffic; tell Vercel support beforehand if testing above a few hundred requests per second.

## 3. Workload

Route mix (weights follow the capacity model's landing assumptions):

| Route family | Share | Example |
| --- | --- | --- |
| Article pages | 55 % | all `/articles/<slug>/` |
| Product pages | 15 % | all `/produits/<slug>/` |
| Homepage | 15 % | `/` |
| Listings and categories | 10 % | `/articles/`, `/rubriques/*/` (and page 2+ when they exist) |
| Other | 5 % | `/aloe-vera/`, legal pages, `/sitemap.xml`, one 404, one www → apex redirect |

Each virtual user fetches the HTML and its same-origin assets (CSS, fonts, images) with a browser-like cache: assets once per user, HTML each time.

## 4. Profile and safety limits

| Phase | Rate (page views/s) | Duration |
| --- | --- | --- |
| Warm-up | 1 | 2 min |
| Base peak hour | 2 | 5 min |
| Burst | 10 → 30 (ramp over 2 min) | 5 min |
| Cool-down | 1 | 2 min |

Stop immediately if: error rate > 1 %, any 5xx, p95 latency > 2 s from the test region, or projected spend exceeds the approved amount.

Approximate volume of this profile: ≈ 12,000 page views ≈ 150,000 requests ≈ 1.5–2 GB transfer [estimate from the measured page weights].

## 5. What to record

Achieved request rate and concurrency; status code distribution; latency p50/p95/p99 per route family and region; `x-vercel-cache` distribution (expect ≈ 100 % HIT after the first request per path); redirect correctness; any firewall challenges; Vercel usage delta for the test window. Store results in `docs/architecture/load-tests/<date>.md` with the exact script and commit.

## 6. Tooling

Any HTTP load generator that can replay a weighted URL list and send a bypass header (k6, Artillery, vegeta). Keep the script in `tools/` with the URL list generated from `dist/` (`find dist -name index.html`), and the bypass token read from an environment variable at run time.

## 7. Real-user validation (more valuable than synthetic load)

Once analytics exist (ADR-006), compare 30 days of actual peaks, page views per visit and bytes per visit against the model; that comparison, not a synthetic test, is what validates the 1 M-visit plan.
