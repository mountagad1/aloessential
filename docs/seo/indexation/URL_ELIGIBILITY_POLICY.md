# URL eligibility policy

*Adopted 2026-10-27. Enforced by `src/pages/sitemap.xml.ts`, `src/layouts/BaseLayout.astro` and `tests/seo.spec.ts` / `tests/indexation.spec.ts`.*

A URL enters the sitemap, and carries a canonical to itself, only if it is **eligible**. Because the site is static, eligibility is decided at build time from the content: no page is generated first and filtered later.

## Outcomes

| Outcome | Meaning | Where it shows |
| --- | --- | --- |
| eligible | built, indexable, in the sitemap | every URL in `/sitemap.xml` (201 on 2026-10-27) |
| needs_review | built but its quality is not settled | translations and products in `status: draft`: **not built at all**, so never in the sitemap |
| ineligible | never built or `noindex` | drafts, fixtures, 404, redirects, parameter variants |

## Hard gates (all enforced)

| Gate | How it is enforced |
| --- | --- |
| Unpublished or draft | Only `status: published` translations and products are routed (`src/pages/[locale]/[...path].astro`, `src/lib/products.ts`) |
| Locale without published content | No routes at all: nothing falls back to French under a foreign prefix |
| Redirects | `www` and slash-less URLs redirect at the edge (`vercel.json`) and are never generated, so never listed |
| Noncanonical or parameter variants | Never generated; every page's canonical is its own path; `tests/indexation.spec.ts` rejects any sitemap URL with a query string or uppercase letter |
| `noindex` | Only the 404 page; the sitemap test requires the sitemap to equal the set of indexable built pages |
| Stale translation | A published translation whose French source changed fails `tests/i18n.spec.ts` in CI (`.github/workflows/ci.yml`). CI does not block the Vercel deployment today (`CRITICAL_FINDINGS.md`, C8): the suite must pass locally before every push |
| Fixtures | Built only into `dist-test/` (`CONTENT_FIXTURES=1`), never into `dist/` |
| robots.txt | `Allow: /` for every crawler. A future block must be a deliberate decision recorded here: robots.txt stops crawling, `noindex` stops indexing, and they are not interchangeable |

## Value tiers

These tiers set priority for crawling, links and monitoring. They never decide whether a URL is in the sitemap.

| Tier | Pages (2026-10-27) |
| --- | --- |
| 1 | The 3 tools × 7 locales; `/aloe-vera/`; the articles of the opportunity map (aloe drinks, aloe skin, growing guide, hydration, digestion) |
| 2 | Other articles, category hubs, product pages and listings, localized homes |
| 3 | Publisher and legal pages (`/equipe/`, `/transparence/`, `/contact/`, `/mentions-legales/`, `/confidentialite/`) |
| excluded | 404, drafts, fixtures, redirecting hosts and paths |

## When a page fails a quality check after publication

Fix it, or set it back to `status: draft`. Its URL then stops being built: plan a 301 to the closest page if it had impressions or links (`operations/ROLLBACK_RUNBOOK.md`). Do not add `noindex` to a page that is still in the sitemap.
