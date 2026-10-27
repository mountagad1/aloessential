# Technical SEO audit

*2026-10-27. Production `https://aloessential.com`, build of commit a83e7c8 plus this change. OBS unless stated.*

| Area | Result | Evidence |
| --- | --- | --- |
| HTTP status | every sitemap URL is built as a static page (200); unknown paths 404 | build parity check; `curl` on production |
| Redirects | `www` → apex 308; slash-less → slash 308; single hop | `curl -I` |
| http → https | **unverified from this environment** (port 80 blocked) | `CRITICAL_FINDINGS.md` C7 |
| Rendering | static HTML, full main content in the first response; no client rendering of content | `RENDERING_AND_INDEXABILITY.md` |
| Canonicals | 201/201 self-referencing, absolute, trailing slash; query strings ignored | `tests/seo.spec.ts`; `/articles/?utm_source=x` serves the clean canonical |
| robots | `robots.txt` allows all; only the 404 page is `noindex` | production `robots.txt` |
| Sitemap | equals the indexable set; truthful lastmod | `tests/seo.spec.ts`, `tests/indexation.spec.ts` |
| hreflang | reciprocal, self-including, `x-default` French | `international/HREFLANG_VALIDATION.md` |
| Titles, descriptions, H1 | present, unique, descriptions 50 to 160 characters, one H1 per page | `tests/seo.spec.ts` |
| Broken internal links | 0 | `npm run seo:audit` |
| Orphans | 2 editorial orphans by design (`/equipe/`, `/mentions-legales/`, linked from the footer only) | `npm run seo:audit` |
| Crawl depth | every page within 2 clicks of a home page: footer (categories, tools, legal) and header (categories, products) | templates |
| Pagination | listing pages are not paginated at 16 articles per locale; `/articles/2/` does not exist | build |
| Parameters and facets | none generated; tool filters run in the browser without changing the URL | `FibreTableView.astro` |
| Structured data | Organization, WebSite, BreadcrumbList, Article (`datePublished`, `dateModified`, ImageObject), WebPage on products. No Product, Offer or Review markup: the site sells nothing itself | `tests/seo.spec.ts` "never claims products, offers or reviews"; Search Console rich results: Breadcrumbs PASS |
| Images | responsive WebP with width and height, descriptive alt text, share image 1200 wide | `docs/architecture/IMAGE_DELIVERY.md` |
| Mobile | no horizontal scroll on the tool pages at 390 px; wide tables scroll inside their frame | screenshots 2026-10-27 |
| JavaScript | tool scripts are inline modules of 1.3 to 2.4 KB; no third-party script | build output |
| Fonts | self-hosted, preloaded for the first viewport | `BaseLayout.astro` |
| Core Web Vitals | lab only; **no field data** (no Speed Insights) | `docs/architecture/PERFORMANCE_BASELINE.md` |
| Deployment | Vercel builds every push; CI does not gate production | `CRITICAL_FINDINGS.md` C8 |

## Changes made in this audit

1. "Our tools" column in the footer on every page and in every locale.
2. Optional `updated` field for articles, with a visible "updated on" line, `dateModified` and `lastmod`.
3. `tests/indexation.spec.ts` guards the sitemap (eligibility and lastmod) and tool discovery.

No URL, canonical, redirect or robots rule was changed.
