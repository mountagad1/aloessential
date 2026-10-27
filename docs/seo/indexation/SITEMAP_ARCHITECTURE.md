# Sitemap architecture

## Current design (kept)

- **One file:** `/sitemap.xml`, generated at build time by `src/pages/sitemap.xml.ts`. On 2026-10-27 it held 201 URLs and weighed 186 KB.
- **Limits:** Google's limits are 50,000 URLs and 50 MB uncompressed per file. Splitting by locale or type would add a sitemap index and nothing more: there is no operational need at 201 URLs. Revisit above about 10,000 URLs or 10 MB, or if per-locale indexing reports become useful in Search Console.
- **Static output:** the file is static and cached by the Vercel CDN (`x-vercel-cache: HIT`). No request triggers a content scan or a database query.
- **Alternates:** `xhtml:link` alternates are listed for each URL with at least two language versions. They come from the same functions that write the HTML hreflang tags, so the two cannot disagree. `x-default` is the French version.
- **Escaping:** URLs are ASCII slugs. `tests/indexation.spec.ts` rejects any `<loc>` outside `[a-z0-9-/]`, so no escaping is ever needed.

## lastmod rules

| URL type | lastmod | Source |
| --- | --- | --- |
| Article (all locales) | `updated` when set, otherwise `date` | front matter; `updated` is set only for meaningful changes (`content/EDITORIAL_QUALITY_STANDARD.md`) |
| Product | `sourceCheckedAt` | front matter: the date the product facts were last checked against LR |
| Home, listings, categories, tools, French-only pages | omitted | No truthful single date exists. Omitting the field is better than a build date |

`lastmod` never comes from the build or deploy time. `tests/indexation.spec.ts` checks that every lastmod is a valid date that is not in the future, and that the fixture article reports its `updated` date.

## Submission

The sitemap is referenced in `robots.txt` and was submitted once in Search Console: every URL inspected lists it under "sitemaps". Google refetches it on its own schedule. Resubmission adds nothing after an ordinary deploy, so no automated submission runs (`monitoring/SEO_FEEDBACK_LOOP.md` §4).
