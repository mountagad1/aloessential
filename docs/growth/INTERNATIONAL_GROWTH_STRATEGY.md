# International growth strategy (7 locales)

Architecture: `docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md`, which covers routing, hreflang, sitemap, the language switcher and the localized product pages. Content workflow: `docs/i18n/TRANSLATION_WORKFLOW.md`.

## 1. State (2026-10-26)

| Locale | Articles | Product pages | Indexed (sample inspected) | Search Console data |
| --- | --- | --- | --- | --- |
| French | 16 | 6 | yes | since 2026-10-15 |
| Italian, English (UK), German, Spanish, Portuguese, Polish | 16 each | 3, 3, 3, 3, 0, 2 | yes (Italian home and an English article inspected) | none yet: published 2026-10-24 |

## 2. Demand by market for the planned assets (DataForSEO via OpenSEO, 2026-10-26)

| Market | Fibre foods | Water per day | Aloe drink | Watering aloe |
| --- | --- | --- | --- | --- |
| France (fr) | 18,100 (KD 10) | 4,400 (KD 4) | 2,900 | 1,600 |
| United Kingdom (en) | 60,500 (KD 28) | 14,800 (KD 52) | 6,600 | 260 |
| Germany (de) | 27,100 (KD 8) | 1,300 (KD 27) | 1,000 | 590 |
| Italy (it) | 6,600 (KD 3) | 5,400 (KD 0) | 5,400 | n/a |
| Spain (es) | 6,600 (KD 15) | 320 | 210 | 40 |
| Poland (pl) | 3,600 (KD 0) | 110 | 5,400 | 210 |
| Portugal (pt-pt) | 1,900 (KD 0) | 30 | 110 | 10 |

KD is keyword difficulty, from 0 to 100. These are estimates for comparing markets, not traffic forecasts.

**What this means:**
- **Fibre** is the one subject with strong demand in every market.
- **Water intake** matters in Italy, France and the UK. In the UK the difficulty (KD 52) is high.
- **Aloe drinks** are big in Italy, Poland and the UK.
- **Watering** matters in France and Germany.

The order of localization for each asset follows this table rather than a fixed order.

## 3. Rules

- **Research per market.** Research each market's wording before translating a tool, for example "ballaststoffreiche Lebensmittel" rather than a literal translation.
- **Localize the data, not only the labels:**
  - food names and portions as people in that country use them;
  - units;
  - the national reference values where they differ from EFSA (stated with their source).
- **Same publication rules as articles:**
  - draft, then review, then publication;
  - hreflang only between published versions;
  - no fallback to French under a foreign prefix.
- **What to track for each localized asset:**
  - source identity;
  - locale;
  - translation, review, publication and indexing status;
  - last meaningful update;
  - target queries for that locale.

  The existing `translationOf`, `status`, `translationReviewer` and `sourceHash` fields already cover most of this for articles and products.
- **Measure per locale.** Use Search Console with the page filter on each prefix (`/it/`, `/en/`…).
