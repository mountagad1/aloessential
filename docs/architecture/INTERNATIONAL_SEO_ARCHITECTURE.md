# International SEO architecture

*Updated 2026-10-24.*

**Status:**
- The locale **infrastructure is implemented and tested**.
- **All six translated locales are published** (2026-10-24): 16 articles each, reviewed by Philippe Cros, under `/it/`, `/en/`, `/de/`, `/es/`, `/pt-pt/` and `/pl/`.
- Supported locales: fr (source), en, es, de, **it**, pt-pt, pl.
- **Italian is first-class:** registry, interface text, category text, routing, metadata, hreflang, sitemap and tests.
- The other five locales exist in the registry only. They cannot publish until their interface text is added; the build enforces this.

## 1. Audit (2026-10-22) [measured]

| Item | Finding |
| --- | --- |
| Italian routes in production | `/it/`, 4 categories and 16 articles (published 2026-10-24) |
| Italian content | **16 of 16 published** (reviewer: Philippe Cros) in `src/content/articles/it/`, awaiting an Italian-speaking reviewer — see docs/i18n/TRANSLATION_WORKFLOW.md |
| English content (UK) | **16 of 16 published** (2026-10-24, reviewer: Philippe Cros) in `src/content/articles/en/`; interface and category text in British English; GB LR shop linked in the English footer |
| German content (Germany) | **16 of 16 published** (2026-10-24, reviewer: Philippe Cros) in `src/content/articles/de/`; interface and category text (*Sie*); DE LR shop linked in the German footer |
| Spanish content (Spain) | **16 of 16 published** (2026-10-24, reviewer: Philippe Cros) in `src/content/articles/es/`; interface and category text (*tú*); ES LR shop linked in the Spanish footer |
| Portuguese content (Portugal) | **16 of 16 published** (2026-10-24, reviewer: Philippe Cros) in `src/content/articles/pt-pt/`; interface and category text (*tu*); footer links to LR Portugal's site (the PT shop requires an LR login) |
| Polish content (Poland) | **16 of 16 published** (2026-10-24, reviewer: Philippe Cros) in `src/content/articles/pl/`; interface and category text (*ty*); PL LR shop linked in the Polish footer |
| Products in Italian | none; product pages stay French-only (decision D4/D6) |
| hreflang | all seven locales on the home page, the 4 categories and the 16 articles |
| Fallbacks | none: a locale without a published article has no URL at all; `/it/anything/` returns the real 404 status |

## 2. URL structure (decisions D1, D2 — implemented)

French stays at the root and keeps every existing URL. Each other locale lives under its own prefix with translated path segments and slugs:

| Page | French | Italian (pattern) |
| --- | --- | --- |
| Home / all articles | `/` (home), `/articles/` (list) | `/it/` (list of all Italian articles), `/it/2/` … |
| Category | `/rubriques/sante/` | `/it/rubriche/salute/` (`consigli`, `salute`, `bellezza`, `nutrizione`) |
| Article | `/articles/<slug>/` | `/it/articoli/<slug-italiano>/` |

Segments for the other locales are defined in `src/i18n/locales.ts` (e.g. `/de/artikel/`, `/es/articulos/`, `/pt-pt/artigos/`, `/pl/artykuly/`, `/en/articles/`).

**Single source of truth:** `src/i18n/locales.ts` holds:
- the code, prefix, `html lang`/hreflang code, `og:locale`, schema.org language, date locale and native name;
- the path segments, plus the path builders `homePath`, `articlePath`, `categoryPath`.

## 3. Content model and publication policy

- A translation is a Markdown file in `src/content/articles/<locale>/<slug>.md` with:
  - `locale: it`
  - `translationOf: <French article id>` — the shared translation identity
  - `status: draft | published` — **draft by default for translations is the policy; write `status: draft` until reviewed**
  - `translationReviewer: <name>` — **required** for `status: published`, enforced by the content schema; shown as the page's reviewer
  - `sourceHash: <12 hex>` — fingerprint of the French title, description and body the translation matches (`node tools/i18n-status.mjs --stamp`). **Required** to publish. A published translation whose French source changed is *stale* and fails the tests until updated and re-stamped
- Translations cannot list `products` (schema error): product pages and their LR links are French-only until D4/D6 are settled.
- **Build failures guard integrity.** The build fails when:
  - a translation names a French source that does not exist;
  - two translations of one source share a locale;
  - a file's `locale` disagrees with its folder;
  - a locale has published content but no interface text.
- **Drafts never surface.** They are not rendered, not linked, not in hreflang and not in the sitemap (tested).
- Cover images are shared by all language versions (one file). Only `coverAlt`, title, description and body are translated. No per-locale image duplication.

Interface text: `src/i18n/ui.ts`, French (the site's existing text, unchanged) and Italian. Category text: `CATEGORY_I18N` in `src/data/categories.ts`. **The Italian strings must be reviewed by a native speaker before the first Italian article is published.**

## 4. Rendering

| Route | File | Notes |
| --- | --- | --- |
| French pages | unchanged files; articles now render through `src/components/ArticleView.astro` | output identical to before (normalised diff of all 36 pages: 0 differences) |
| Every non-French page | `src/pages/[locale]/[...path].astro` | generated only from published translations; listing view `src/components/LocaleListing.astro`; paginated with `src/lib/pagination.ts` |

On a translated page:

- **Language metadata:** `<html lang>`, `og:locale` (+ `og:locale:alternate`), JSON-LD `inLanguage`, title, description, H1, breadcrumbs (home → localized category → article), dates (`Intl` per locale) and reading-time text are all localized.
- **Navigation:** header and footer list only that locale's sections: categories with articles, and its home. Brand, menu button and skip link are localized.
- **French-only pages:** pages that exist only in French (team, contact, legal notice, privacy, distributor contact section, the French site) are linked with `hreflang="fr"` and labelled "(in francese)". They are never presented as Italian pages.
- **Not shown in Italian:** the newsletter block (French list) and the LR shop link (French shop) are not shown.
- **Distributor window:** the "Diventa distributore LR" window is shown in Italian, with an Italian WhatsApp message (owner confirmation needed, §8).
- **Language switcher:** an article with other published versions shows "Disponibile anche in: Français" (and the French page shows "Également disponible en : Italiano").

## 5. hreflang and sitemap

- **Pages that carry alternates:** articles (French source + each published translation), locale homes (`/` ↔ `/it/`) and category pages that hold articles in both languages (`/rubriques/sante/` ↔ `/it/rubriche/salute/`).
- **Page 1 only:** paginated pages (`/it/2/`) carry none.
- **Which links each annotated page lists:** every published version, itself included, plus `x-default` → the French version (the source and the default audience). A page with a single version emits no hreflang.
- **Sitemap:** it lists every published URL in every locale. When alternates exist, it adds `xhtml:link` entries generated by the same functions as the HTML tags (`articleAlternates`, `homeAlternates`, `categoryAlternates` in `src/lib/articles.ts`). The `xmlns:xhtml` namespace appears only when needed, so today's sitemap is byte-identical to before.
- **Sitemap index:** with seven locales the sitemap reaches ~38,000 URLs at 5,000 articles per locale. Switch to one sitemap per locale under a sitemap index before 40,000 URLs (backlog B9).

## 6. Italian search intent (before translating)

Working method and per-article status: docs/i18n/TRANSLATION_WORKFLOW.md. Style and terminology: docs/i18n/IT_STYLE_GUIDE.md.

Do not translate French keywords word for word. For each article planned in Italian:

1. Identify how Italian searchers phrase the need. Examples to verify, not assumptions:
   - « gel di aloe vera puro » vs « gel aloe vera 100% »;
   - « succo di aloe vera » vs « aloe da bere ».
2. Sources: Google Search Console (once Italian pages exist), Google Trends for Italy, autocomplete and "People also ask" on google.it, Italian competitors' headings, and a keyword tool with Italian data if the owner has one.
3. **Never invent search volumes** (rule R3). Record the source and date of any figure.
4. Choose the Italian slug, title and description from that research. Adapt examples, units and regulation references to Italy:
   - Italian Ministry of Health guidance on botanicals in supplements;
   - Italian mandatory mentions.
   EU health-claim rules (Regulation 1924/2006, register 432/2012) apply as in France.
5. Have the translation reviewed (fluency + health/regulatory accuracy), then set `status: published` with `translationReviewer`.

## 7. Regression tests (`tests/i18n.spec.ts`, plus locale-aware checks in `tests/seo.spec.ts`)

Translation files (all locales, drafts included):
- published translations are not stale;
- every translation names an existing French source and carries a `sourceHash`;
- body links point only to articles of the same language that exist as files;
- Italian texts use Italian typography (no French space before `: ; ? !`).

Whole build: every internal link resolves to a built page (`tests/seo.spec.ts`).

The test build includes a fictional published Italian translation (`tests/fixtures/articles/it/articolo-demo.md`) and an unreviewed Italian draft (`bozza-demo.md`). Checks:

- registry: every locale once, valid codes and prefixes; Italian interface and category text complete;
- Italian pages exist only for published content; no empty Italian category; no page for locales without content;
- the draft never appears (HTML, links, sitemap) and its French source has no hreflang;
- `html lang`, `og:locale`, `inLanguage` match the URL's locale on every page;
- Italian pages indexable and self-canonical under `/it/`;
- hreflang reciprocal, self-referencing, pointing to existing, self-canonical pages in the right language, `x-default` = French; exactly the expected six annotated pages;
- sitemap alternates equal HTML alternates for every URL; Italian URLs listed;
- links on Italian pages stay under `/it/` or carry `hreflang="fr"`;
- no French interface text on Italian pages; the Italian article renders its own body;
- browser: Italian routes return 200 and `lang="it"`; unknown `/it/…` and `/en/` return 404; language switcher both ways; Italian distributor window and WhatsApp text; Italian mobile menu labels.

Mutation checks run during development:
- removing `hreflang="fr"` from one link fails the link test;
- pointing `x-default` at the wrong version fails the reciprocity test.

## 8. Decisions and open questions

| # | Decision | Status |
| --- | --- | --- |
| D1 | Subdirectories, French unprefixed | **done** |
| D2 | Translated slugs per locale | **done** (segments in the registry; article slug = file name) |
| D3 | Only reviewed translations are published | **enforced** (`translationReviewer`) |
| D4 | Products per country need that country's LR link with `ref=cros` and local mentions | open — products stay French-only |
| D5 | First locale | Italian infrastructure ready; owner chooses which articles to translate first |
| D6 | Italian product pages: Italian LR shop link + mentions required in Italy | **partly done**: Italian shop home `https://shop.lrworld.com/home/IT/it?ref=cros` (from the publisher, 2026-10-22) is linked in the Italian footer with a partner disclosure (`LR_SHOP_HOME` in `src/lib/partner.ts`). Product pages still need each product's Italian shop URL and the Italian mandatory mentions |
| D7 | Distributor window on translated pages: text and WhatsApp message in the page's language, to Philippe | **decided 2026-10-23**: Philippe accepts contacts in all supported languages; the window stays on every page in every locale |
| D9 | English targets the UK (GB shop link, British English, GB rules); hreflang stays `en` so other English readers are not excluded | **done** (EN_STYLE_GUIDE.md) |
| D8 | Review of the Italian interface and category text (`src/i18n/ui.ts`, `CATEGORY_I18N`) | **decided 2026-10-24** by the owner: Philippe Cros reviews the Italian content; Italian published |

## 9. Adding a further locale (e.g. German)

1. Add its interface text to `src/i18n/ui.ts` and its category text to `CATEGORY_I18N`.
2. Extend the registry test in `tests/i18n.spec.ts` with that locale.
3. Translate and review articles into `src/content/articles/de/`.

Routing, hreflang and the sitemap need no change.
