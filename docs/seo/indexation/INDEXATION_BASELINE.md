# Indexation baseline

*URL Inspection API (read through OpenSEO), 2026-10-26 and 2026-10-27. The API reads Google's stored state; it does not crawl live.*

| URL | Coverage state | Last crawl | Google canonical = declared |
| --- | --- | --- | --- |
| `/combien-d-eau-par-jour/` | Submitted and indexed | 2026-10-27 | yes |
| `/aliments-riches-en-fibres/` | Discovered – currently not indexed | – | – |
| `/aloe-vera/arrosage/` | Discovered – currently not indexed | – | – |
| `/de/ballaststoffreiche-lebensmittel/` | Discovered – currently not indexed | – | – |
| `/en/articles/aloe-vera-juice-what-science-says/` | Submitted and indexed | 2026-10-25 | yes |
| `/pl/` | Submitted and indexed | 2026-10-25 | yes |
| `/es/productos/` | Submitted and indexed | 2026-10-26 | yes |
| `/pt-pt/artigos/alimentos-ricos-em-agua/` | Submitted and indexed | 2026-10-25 | yes |
| `/articles/hydratation-aliments-riches-en-eau/` | Submitted and indexed | 2026-10-25 | yes |
| `/articles/2/` | URL is unknown to Google | – | (does not exist; expected) |

Earlier inspection (2026-10-26, `docs/growth/ORGANIC_GROWTH_METRICS.md`):
- home, 2 French articles, the guide, a product, the Italian home and an English article: all indexed, canonical as declared;
- `http://aloessential.com/`: "Crawled – currently not indexed", the expected outcome for the http variant.

## Reading

- Every URL older than 48 hours that was inspected is indexed with the declared canonical.
- The three "Discovered – currently not indexed" pages were published on the day of inspection. This is a waiting state, not a quality verdict.
- Re-inspect these three on 2026-11-10. If they are still not crawled, follow the diagnostic rules in `monitoring/SEO_FEEDBACK_LOOP.md`.

## Re-running

Inspect at most 10 URLs at a time, and only the URLs listed here plus newly published tier-1 pages. The API quota is per property and per day; checking every URL repeatedly gives no new information.
