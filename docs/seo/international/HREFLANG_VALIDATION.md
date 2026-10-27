# hreflang validation

*Checked 2026-10-27 on the build that was then in production (201 URLs).*

## What is enforced automatically

| Rule | Test |
| --- | --- |
| Every alternate is reciprocal: each page lists the same set as the pages it points to | `tests/i18n.spec.ts`, "hreflang annotations are reciprocal, self-referencing and point to real indexable pages" |
| Each set includes the page itself | same test |
| `x-default` points to the French version | same test |
| Each target exists, is indexable, has a self canonical and the right `<html lang>` | same test |
| Codes: `fr`, `en`, `es`, `de`, `it`, `pt-PT`, `pl` (BCP 47; `pt-PT` is distinct from Brazilian Portuguese) | `src/i18n/locales.ts`; the test compares with `htmlLang` |
| Sitemap alternates equal the HTML alternates | same source functions (`src/lib/articles.ts`, `src/lib/products.ts`, `src/i18n/*-ui.ts`) |
| A set is emitted only when there are at least 2 published versions | `BaseLayout.astro`; the sitemap emits no alternates for single-language URLs |
| No body link leaves the page's language without `hreflang` | `npm run seo:audit` (0 on 2026-10-27) |
| No canonical points to another language | "every page has a self-referencing absolute canonical" (`tests/seo.spec.ts`) |

## Result on 2026-10-27

- 192 URLs carry hreflang, all reciprocal; the tests pass.
- Search Console chose the declared canonical for every translated page inspected, and lists the other language versions as referring pages. This suggests Google reads the clusters; it does not prove it.

## Not covered

Regional variants (`fr-BE`, `de-AT`, `en-IE`…) are not targeted. The English version targets the UK through vocabulary and its `en_GB` Open Graph locale, while `hreflang="en"` serves all English speakers. Add regional codes only if a market needs different content.
