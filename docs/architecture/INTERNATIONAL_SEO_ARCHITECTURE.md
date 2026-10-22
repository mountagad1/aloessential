# International SEO architecture

*2026-10-22. Status: **design, not implemented.** Today the site is French-only and must stay so until a translation is actually published. Target locales: fr (source), en, es, de, **it**, pt-pt, pl (Italian added 2026-10-22).*

## 1. Current state [measured]

- One locale: `<html lang="fr">`, `og:locale` `fr_FR`, JSON-LD `inLanguage` `fr-FR`, French slugs at the root (`/articles/<slug>/`).
- No hreflang, no locale prefixes, no translated content, no translation workflow.
- Guard tests (`tests/delivery.spec.ts` › "locale integrity"): every page declares French consistently, no hreflang is emitted, and no page lives under a language prefix. These tests are meant to be replaced by the full checks in §5 when the first translation ships, not deleted.

## 2. Decisions to take (owner)

| # | Decision | Recommendation |
| --- | --- | --- |
| D1 | URL structure | **Subdirectories on the same domain**, French unprefixed: `/` (fr), `/en/`, `/es/`, `/de/`, `/it/`, `/pt-pt/`, `/pl/`. Keeps all links and authority on one host and preserves every existing French URL. ccTLDs or subdomains add cost and split authority for no gain at this size. |
| D2 | Slugs | Translated slugs per locale (`/en/articles/aloe-vera-skin/`), mapped through a shared translation key. |
| D3 | Which content gets translated | Only pages with a real, reviewed translation. No machine-only publication without human review (health and regulatory content). |
| D4 | Products | LR partner pages differ by country (shop URL, availability, legal mentions such as the French supplement notices). A product page is published in a locale only with that country's shop link carrying `ref=cros` and the local mandatory mentions. |
| D5 | First locale | Pick one (likely `en`, `de` or `it`, depending on where LR partnership traffic is wanted) and ship it end to end before adding others. |
| D6 | Italian products | Same rule as D4: an Italian product page needs the Italian LR shop link with `ref=cros` and the mentions required in Italy for food supplements and cosmetics, reviewed locally. |

## 3. Target model

**Single source of truth** — a new `src/i18n/locales.ts`:

```ts
// Sketch, not implemented.
export const LOCALES = {
  fr: { prefix: "", htmlLang: "fr", ogLocale: "fr_FR", schemaLang: "fr-FR", published: true },
  en: { prefix: "/en", htmlLang: "en", ogLocale: "en_GB", schemaLang: "en", published: false },
  es: { prefix: "/es", htmlLang: "es", ogLocale: "es_ES", schemaLang: "es-ES", published: false },
  de: { prefix: "/de", htmlLang: "de", ogLocale: "de_DE", schemaLang: "de-DE", published: false },
  it: { prefix: "/it", htmlLang: "it", ogLocale: "it_IT", schemaLang: "it-IT", published: false },
  "pt-pt": { prefix: "/pt-pt", htmlLang: "pt-PT", ogLocale: "pt_PT", schemaLang: "pt-PT", published: false },
  pl: { prefix: "/pl", htmlLang: "pl", ogLocale: "pl_PL", schemaLang: "pl-PL", published: false },
} as const;
```

**Content identity** — each article/product file gains `locale` (default `fr`) and `translationKey` (default: the French id). Translations live in `src/content/articles/<locale>/<slug>.md`. A translation only renders when `status: published` (the products collection already has this field; articles would gain it).

**Alternates** — computed at build time from the set of published entries sharing a `translationKey`:

- `<link rel="alternate" hreflang="…" href="…">` for every published version, **including itself**;
- `x-default` → the French version (the source, and the only complete locale), justified because French remains the default audience;
- emitted only when ≥ 2 published versions exist; a page with no translation emits none;
- the same alternates in the sitemap (`xhtml:link`), generated from the same function, so HTML and sitemap cannot disagree.

**Per-locale requirements** — self-canonical per locale (never canonicalise a translation to French); localized `title`, `description`, H1, body, breadcrumbs, `og:locale`, `og:locale:alternate`, `coverAlt`, JSON-LD `inLanguage`; locale-aware internal links (an English page links to English pages where they exist, otherwise to nothing rather than silently to French, except an explicit "read in French" link); listings and categories per locale, paginated with the same helper.

**What never happens** — no automatic language redirect based on `Accept-Language` or IP (it blocks crawlers and users); no fallback rendering of French content under an `/en/` URL; no empty locale homepages or category pages; no hreflang to an unpublished or `noindex` page.

## 4. Programmatic and landing pages

Every new page family (e.g. "aloe vera for X") needs, before it is built: a distinct search intent, genuinely useful localized content, and a written indexability decision. Families that would produce near-duplicates across locales or products are not built. This applies the same rule as the existing products policy (`docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md`).

## 5. Regression checks to add with the first translation

Static scan of the test build, for every page of every published locale:

1. `<html lang>`, `og:locale`, JSON-LD `inLanguage` match the page's locale.
2. Self-canonical, absolute, trailing slash, under the locale's prefix.
3. hreflang set is reciprocal (A → B implies B → A), includes self, uses valid codes, points only to 200, indexable, self-canonical URLs; `x-default` present exactly once when alternates exist.
4. Sitemap alternates equal HTML alternates.
5. No page under a locale prefix contains another locale's body text (detect via a per-locale marker or `lang` of the main content).
6. Titles and descriptions unique per locale and within length.
7. No unpublished translation renders; drafts never appear in sitemap or hreflang.

Test fixtures: one fictional article translated into one extra locale, plus one untranslated article, so both paths are exercised.

## 6. Effort and sequencing (estimate)

1. Locale registry, content fields, routing for one extra locale, alternates helper, tests — M.
2. UI strings (header, footer, legal pages per country — legal content needs local review) — M to L.
3. Each further locale — S for plumbing, content effort dominates.

Open questions: D1–D6 above; who translates and reviews; whether legal pages (mentions légales, confidentialité) must be adapted per country.
