# Observability, alerting and cost monitoring

*2026-10-22. Today nothing measures production traffic or real-user performance (Vercel Web Analytics is disabled — API answer `web_analytics_not_enabled`). This plan lists what to measure, where, and which thresholds should trigger action. Items marked **owner** need a decision or a dashboard change; nothing here has been enabled.*

## 1. What to measure

| Signal | Source | Applicable? | Status |
| --- | --- | --- | --- |
| Visits, page views, referrers, landing pages, countries | Vercel Web Analytics or a cookieless alternative (ADR-006) | yes | **owner** |
| Core Web Vitals in the field (LCP, INP, CLS) by route | Vercel Speed Insights; later CrUX / Search Console once the origin has enough traffic | yes | **owner** |
| Indexing, crawl errors, sitemap status, Discover traffic | Google Search Console (Pages, Sitemaps, Discover reports) | yes | **owner** (verification + sitemap submission already pending in `docs/seo/`) |
| Availability and HTTP errors | External uptime probe on `/`, one article, `/sitemap.xml` (any uptime service); Vercel observability for 4xx/5xx | yes | **owner** |
| CDN cache behaviour | `x-vercel-cache` on sampled requests (CACHING_STRATEGY.md §5); Vercel Observability | yes | manual check |
| Bandwidth and edge requests | Vercel Usage page; usage notifications | yes | **owner** |
| Function invocations, duration, cold starts | — | no functions | n/a |
| Database latency, connections | — | no database | n/a |
| p50/p95/p99 latency | CDN-served static files; meaningful only from synthetic multi-region probes | optional | not planned |
| Build duration and failures | Vercel deployments list; GitHub Actions | yes | available |
| SEO regressions | Playwright static scans in CI (`tests/seo.spec.ts`, `tests/delivery.spec.ts`) | yes | **in place** |
| Catalogue scale | `node tools/scale-check.mjs` | yes | in place (manual) |

## 2. Alerts (recommended)

| Alert | Threshold | Channel | Action |
| --- | --- | --- | --- |
| Site down | 2 consecutive failed probes on `/` (1-min interval) | e-mail/SMS | check Vercel status, last deployment; roll back if a deploy caused it |
| Sitemap or robots unreachable | 1 failed probe on `/sitemap.xml` or `/robots.txt` | e-mail | same |
| Fast Data Transfer | > 70 % of the plan's monthly included amount | Vercel usage notification | review image weight, bot traffic |
| Edge Requests | > 70 % of the included amount | Vercel usage notification | review caching, bot traffic |
| Spend | owner-defined monthly cap | Vercel Spend Management | decide: raise cap or reduce weight |
| Production build failed | any | Vercel/GitHub notification | fix; production keeps the previous deployment |
| CI red on the production branch | any | GitHub | fix before the next deploy (ADR-007) |
| Field LCP p75 > 2.5 s or CLS p75 > 0.1 or INP p75 > 200 ms | weekly review | Speed Insights | investigate the route |
| Search Console: indexed pages drop > 10 % week over week, or new "Excluded" reasons | weekly review | Search Console e-mails | investigate |

## 3. Cost model

See CAPACITY_MODEL.md §5. Monthly review: Usage page (Fast Data Transfer, Edge Requests, build minutes), compared with the model's 120–230 GB and 14–18 M requests at 1 M visits. If actual usage per visit differs by more than ±30 % from the model, update the model's inputs.

## 4. Security monitoring

- `npm audit` in CI (add as a non-blocking step) and before each dependency upgrade; current findings in SCALABILITY_AUDIT.md F9.
- Dependabot or Renovate on the repository (owner action in GitHub).
- Response headers verified after each deployment that touches `vercel.json` (CACHING_STRATEGY.md §5).

## 5. Validation

When analytics are enabled: confirm the beacon fires on one page per template, confirm no cookie is set (DevTools → Application → Cookies), and update `src/pages/confidentialite.astro` to describe the tool.
