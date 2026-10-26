# Content growth system

Builds on the existing editorial rules, which this document reuses rather than repeats:
- `docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md`;
- the style guides in `docs/i18n/`;
- the translation workflow in `docs/i18n/TRANSLATION_WORKFLOW.md`.

## 1. Inventory (2026-10-26)

| Cluster | French articles | Tools | Search signal (Search Console and keyword data) |
| --- | --- | --- | --- |
| Aloe vera (skin, gel, drinks, juice, growing, homemade gel) | 7 + the `/aloe-vera/` guide | none | High demand for drinks and benefits (FR 2,900 / 2,400; IT 5,400; PL 5,400; UK 6,600); watering FR 1,600 |
| Hydration | 1 (about 160 words) | none | Most impressions on the site; "how much water per day" FR 4,400, IT 5,400, UK 14,800 |
| Digestion and fibre | 1 (digestion, liver, detox) | none | Fibre: the largest demand of the audit (EAM-01) |
| Vitamins, fatigue, regulation | 1 | none | Regulatory angle; low direct demand |
| Joints | 1 | none | "renforcer les articulations" seen at position ~78 |
| Breakfast, morning routine, sleep | 3 | none | Small signals |
| Anti-ageing, hair | 2 | none | "actif anti âge" seen at position ~78 |

Each French article has 6 reviewed translations. Average length is about 440 words (`npm run seo:audit --json`).

## 2. Brief for any new or refreshed content

1. **Reader and problem.** Who the page is for and what they want to do.
2. **Intent.** One page per intent. Check that no existing page already serves it (cannibalisation).
3. **Evidence.** Search Console queries, keyword data with source and date, or reader questions.
4. **Unique value.** Primary sources, a tool, data or a regulatory explanation the current top results lack.
5. **Structure.**
   - A direct answer in the first 2 sentences (helps readers and answer engines).
   - Then detail, limits and when to see a professional.
6. **Sources.** Primary sources only for health and regulatory statements (EUR-Lex, EFSA, national agencies).
7. **Review by risk level.** Health and nutrition wording needs the reviewer. Every locale goes through its own translation review.
8. **Links.** Add internal links following `INTERNAL_LINKING_STRATEGY.md`.
9. **Validation.** Run the tests and `seo:audit`, then publish with the owner's approval.
10. **Measurement.** Measure 28 days after recrawl.

## 3. Refresh policy

Refresh a page only when there is evidence:
- outdated information or a regulatory change;
- a broken source;
- an intent mismatch seen in Search Console (the queries show readers wanted something else);
- a meaningful performance decline;
- a better way to answer, such as a tool.

Never change the date to signal freshness without a real change. Translations follow every French refresh: the stale check enforces it.

## 4. Programmatic pages: quality gate

Generated page families (for example one page per food) are **not planned**. EAM-01 is a single tool page with a table, not one page per food.

Before any page family, check:
- each page has its own intent and enough unique information;
- the source data is reliable;
- the locale is adapted;
- the indexability rules are written down;
- canonical, sitemap and links are valid;
- maintenance is owned;
- the risk of duplicates or cannibalisation is low.

Pages that fail the gate are not generated, or are `noindex`.
