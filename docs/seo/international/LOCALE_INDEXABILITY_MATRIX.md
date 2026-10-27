# Locale indexability matrix

*Built from `/sitemap.xml` of 2026-10-27. Every count is of eligible, indexable, canonical URLs. Architecture: `docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md`.*

| Locale | Prefix | Home | Article listing | Categories | Articles | Product listing | Products | Tools | Other pages | Total | With hreflang |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fr | (none) | 1 | 1 | 4 | 16 | 1 | 6 | 3 | 6 | 38 | 29 |
| en | `/en/` | 1 | 0 | 4 | 16 | 1 | 3 | 3 | 0 | 28 | 28 |
| es | `/es/` | 1 | 0 | 4 | 16 | 1 | 3 | 3 | 0 | 28 | 28 |
| de | `/de/` | 1 | 0 | 4 | 16 | 1 | 3 | 3 | 0 | 28 | 28 |
| it | `/it/` | 1 | 0 | 4 | 16 | 1 | 3 | 3 | 0 | 28 | 28 |
| pt-pt | `/pt-pt/` | 1 | 0 | 4 | 16 | 0 | 0 | 3 | 0 | 24 | 24 |
| pl | `/pl/` | 1 | 0 | 4 | 16 | 1 | 2 | 3 | 0 | 27 | 27 |
| **Total** | | 7 | 1 | 28 | 112 | 6 | 20 | 21 | 6 | **201** | 192 |

## Notes

- **Article listing:** in the other locales the home page is the article listing, so they have no separate `/articles/` page.
- **French-only pages without hreflang:** 9 French URLs have no alternate:
  - the aloe vera guide;
  - 5 publisher and legal pages;
  - the `/articles/` listing;
  - the 2 French products that have no translation.

  The foreign footers link to the publisher and legal pages with `hreflang="fr"` and an "(in French)" label.
- **Portuguese products:** none. The LR Portuguese shop requires a login, so there is no public page to link to.
- **Products per locale:** they follow what LR sells in each country; a product page exists only where the country's shop sells it (`LR_SHOP_PATH`).
- **Missing translations:** none. Each of the 16 French articles is published in all 6 locales.

## Search data by locale

Search Console has no non-French impressions yet: the window ends on 2026-10-24, the day the translations went live. Compare by URL prefix from 2026-11-24 (`monitoring/SEO_FEEDBACK_LOOP.md`).
