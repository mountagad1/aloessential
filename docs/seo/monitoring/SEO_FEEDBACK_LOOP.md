# SEO feedback loop

Extends `docs/growth/SEO_GEO_GROWTH_LOOP.md` (monthly growth review) and `docs/growth/ORGANIC_GROWTH_METRICS.md` (metric definitions) with indexation diagnostics.

## 1. Sources and limits

| Source | Gives | Limits |
| --- | --- | --- |
| Search Console Performance (API through OpenSEO, no credits) | clicks, impressions, CTR, position by query, page, country, device | about 3 days of lag; rare queries anonymised; the top 1,000 rows per request |
| URL Inspection API (through OpenSEO, no credits) | coverage state, last crawl, Google canonical | daily quota per property; Google's stored state, not a live crawl |
| Search Console Pages and Sitemaps reports | indexed and not-indexed counts, reasons | interface only (owner); exports by hand |
| Sitemap | the eligible set (201 URLs on 2026-10-27) | |
| Analytics | none (MEAS-01) | |
| Server logs | none for static files on Vercel | crawl frequency not observable |

## 2. Cadence

| When | What | Output |
| --- | --- | --- |
| Weekly | Performance by page (28 days); striking-distance queries (positions 5 to 20, ≥ 50 impressions) | notes in `docs/growth/reviews/` |
| 2 weeks after publishing a tier-1 page | URL Inspection of that page | `indexation/INDEXATION_BASELINE.md` |
| Monthly | Pages report export: Discovered / Crawled not indexed, duplicates, soft 404, 404; growth review | review file |
| On demand | Cannibalization check (query + page) | `research/CONTENT_CANNIBALIZATION_MAP.md` |

**Next dates:**
- 2026-11-10: re-inspect the three tools not yet indexed.
- 2026-11-24: first monthly review, including EXP-001 and the first per-locale comparison.

## 3. Diagnostics

| Symptom | Check, in order | Do not |
| --- | --- | --- |
| Not discovered | in the sitemap? linked from a crawlable page (footer, article)? returns 200 in production? | resubmit the sitemap again and again |
| Discovered – currently not indexed | age (under 2 to 3 weeks is normal); internal links; whether the page adds something the SERP lacks | request indexing repeatedly |
| Crawled – currently not indexed | thin or duplicate content; canonical; whether another Aloessential page answers the same intent | resubmit without changing anything |
| Duplicate, Google chose a different canonical | identical or near-identical content across URLs; wrong hreflang | add `noindex` to a sitemap URL |
| Impressions up, clicks flat | intent mismatch, title and description against the SERP, AI Overview above | rewrite titles weekly |
| Two pages share a query | the cannibalization map's rule | merge without evidence |
| A locale lags | translation complete and published? local demand? local internal links? canonical and hreflang? | assume it shares French demand |

## 4. Search Console API: decision

- **Sitemap:** it is static and already registered. Google refetches it on its own. Resubmitting through the API after each deploy brings no measurable benefit and would need a service-account key in Vercel. **Not implemented.**
- **Indexing API:** reserved by Google for job postings and live streams. **Never used** here.
- **URL Inspection and Performance:** used through OpenSEO's connection for diagnosis, within the quota.
- **If automation becomes useful** (for example after a large URL migration): a manual script run by the owner, with a key read from the environment and never committed, that submits `https://aloessential.com/sitemap.xml` once and logs the response. A successful submission says nothing about crawling or indexing.
