# Cost and reliability

*2026-10-27. Capacity and caching are detailed in `docs/architecture/CAPACITY_MODEL.md` and `CACHING_STRATEGY.md`.*

## What runs, and when

| Work | When | Cost driver |
| --- | --- | --- |
| Astro build (201 pages, sitemap, robots) | once per push, on Vercel | build minutes; about 10 s of page generation locally |
| Page and sitemap delivery | every request | static files from the CDN: no function invocation, no database |
| Tools (water, fibre, watering) | in the reader's browser | none on the server |
| Search Console reads (OpenSEO) | by hand, during audits | free; within Google quotas |
| SERP and keyword research (OpenSEO, DataForSEO) | by hand | credits: about 2.5 per keyword at depth 10; **no credits left on 2026-10-27** |
| Ciqual extraction | by hand, when Anses publishes a new table | none |

## Rules (all met today)

- No language-model call, API call or content scan during a page request.
- The sitemap is generated once per build and cached.
- No scheduled job, polling or retry loop exists. If one is added, it needs a documented reason, a fixed schedule, bounded retries and idempotent effects.
- No credential is stored in the repository or sent to the browser. Partner links (`ref=cros`) are public by design.
- No personal data is collected; the newsletter endpoint is configured by an environment variable and is off by default.
- New infrastructure only with a measured need.

## Reliability risks

| Risk | Mitigation |
| --- | --- |
| A failing test does not stop a production deploy (`CRITICAL_FINDINGS.md` C8) | Run `npm test` before every push. Owner: enable Vercel deployment checks |
| A content error is published | Instant rollback in Vercel (`ROLLBACK_RUNBOOK.md`) |
| An occasionally failing motion test | Tracked as C9; it does not test SEO behaviour |
