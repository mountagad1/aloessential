# Growth backlog: Engineering as Marketing, SEO and GEO

*Created 2026-10-26.*

**Scoring:** formula in `ENGINEERING_AS_MARKETING_PLAYBOOK.md` §2. The score orders the work; it does not forecast traffic.

**Sources:**
- **Demand:** DataForSEO through OpenSEO, measured on 2026-10-26 (monthly averages, national markets).
- **Positions and impressions:** Search Console, 2026-07-23 to 2026-10-23. Data actually starts on 2026-10-15.

**Status values:** planned · in progress · shipped · measured · kept · improved · extended · removed · abandoned · blocked.

## Prioritised list

| ID | Initiative | Type | Score | Status |
| --- | --- | --- | --- | --- |
| SEO-01 | Contextual internal links: 52 articles without inbound body links; the aloe guide is an orphan | SEO | 56 | in progress: links written, awaiting publication |
| EAM-03 | Aloe vera watering planner | Interactive tool | 56 | in progress: built in 7 locales, awaiting review and publication |
| EAM-02 | How much water per day, plus a water-rich foods table | Calculator and dataset | 51 | in progress: calculator and foods table built in 7 locales, awaiting review |
| EAM-01 | High-fibre foods: searchable table and daily-fibre calculator | Dataset and calculator | 40 | in progress: built in 7 locales, awaiting review |
| SEO-05 | Deepen the highest-demand aloe articles | Content | 34 | in progress: aloe drinks article refreshed in 7 locales (2026-10-27), awaiting review |
| SEO-04 | PRO 12 + snippet test | Experiment | 30 | waiting for data |
| EAM-04 | Aloe drink label checker | Interactive checklist | 29 | planned |
| SEO-03 | Redirect legacy URLs from the previous site | Technical | 24 | blocked: 404 export |
| EAM-05 | %NRV and claim checker for supplement labels | Calculator | 21 | parked |
| GEO-01 | Organization entity: `sameAs`, about statement | GEO | 21 | blocked: official profiles |
| EAM-06 | INCI decoder for aloe cosmetics | Data product | 18 | parked |
| EAM-07 | Multilingual browser of EU authorised health claims | Data product | 11 | parked |
| MEAS-01 | Cookieless analytics (Vercel Web Analytics) | Measurement | (prerequisite) | blocked: owner decision |

## Initiative details

### SEO-01: contextual internal links (score 56)
- **Problem:**
  - 52 of 112 articles receive no link from another article's body;
  - Portuguese articles average 0.69 body links;
  - `/aloe-vera/` is reachable only from the menu.

  Source: `npm run seo:audit`, 2026-10-26.
- **Proposal:** add 1 to 3 natural links per article, between articles of the same language and towards the aloe guide. Examples: digestion → breakfast; breakfast → hydration; hydration → sleep; aloe articles → the guide. The links are written in the source French and in each translation, with no automated anchor text at scale.
- **Mechanism:** spreads authority to pages ranked 50 to 90, and helps readers continue their path.
- **Effort, maintenance, risk:**

  | Factor | Score | Why |
  | --- | --- | --- |
  | Effort | 1 | |
  | Maintenance | 1 | |
  | Risk | 1 | A French text change makes translations stale, so the translations get the same edit and are re-stamped |
- **Measurement:**
  - **Primary:** average position and impressions of the linked articles over 28 days, compared with the articles not touched (observational).
  - **Guardrail:** no new broken links (tests).
- **Score inputs:** U3 D3 X1 L1 B3, C4.

### EAM-03: aloe vera watering planner (score 56)
- **Problem:** "When and how much should I water my aloe?" The growing guide answers in one paragraph and ranks around position 90 for watering queries (Search Console).
- **Demand:**

  | Market | Query | Monthly searches | Difficulty |
  | --- | --- | --- | --- |
  | France | arroser aloe vera | 1,600 | 0 |
  | Germany | aloe vera gießen | 590 | 0 |
  | United Kingdom | how to water aloe vera | 260 | 0 |
  | Poland | jak podlewać aloes | 210 | 0 |
  | Spain | como regar aloe vera | 40 | 0 |
  | Portugal | como regar aloe vera | 10 | 41 |
- **Proposal:** the reader enters season, pot type (terracotta or plastic, with or without a drainage hole), position (window, balcony, outdoors) and room temperature. The planner returns a watering rhythm with the "finger test" rule and the warning signs of over- and under-watering. The rules are deterministic and documented on the page (succulent care references, RHS). The page also carries a static summary table that is readable without JavaScript.
- **Effort, maintenance, risk:**

  | Factor | Score | Why |
  | --- | --- | --- |
  | Effort | 2 | |
  | Maintenance | 1 | |
  | Risk | 1 | No health claim. It is the safest first asset for testing the Engineering-as-Marketing pipeline in 7 languages |
- **Measurement:** impressions and clicks for watering queries on the tool and the growing guide; tool usage once analytics exist.
- **Score inputs:** U4 D3 X3 L2 B2, C4.
- **Build (2026-10-27):**
  - Rules: `src/data/watering.ts`; text and URLs: `src/i18n/watering-ui.ts`; page: `src/components/WateringPlannerView.astro`.
  - URLs: `/aloe-vera/arrosage/`, `/en/aloe-vera-watering-planner/`, `/es/riego-aloe-vera/`, `/de/aloe-vera-giessen/`, `/it/annaffiare-aloe-vera/`, `/pt-pt/rega-aloe-vera/`, `/pl/podlewanie-aloesu/`, with hreflang and sitemap alternates.
  - Sources checked on 2026-10-26: RHS (Indoor plants resources), Penn State Extension, UF/IFAS Gardening Solutions. None gives a calendar; the day counts are the team's own estimate, calibrated on the growing guide and stated as such on the page.
  - Linked from the growing article in all 7 languages and from `/aloe-vera/`.
  - Tests: `tests/watering.spec.ts`.

### EAM-02: how much water per day, plus a water-rich foods table (score 51)
- **Problem:** the hydration article has the most impressions (41, position about 75) but does not answer the most searched question.
- **Demand:**

  | Market | Query | Monthly searches | Difficulty |
  | --- | --- | --- | --- |
  | United Kingdom | how much water should I drink a day | 14,800 | 52 |
  | Italy | quanta acqua bere al giorno | 5,400 | 0 |
  | France | combien de litres d'eau par jour | 4,400 | 4 |
  | Germany | wie viel Wasser am Tag trinken | 1,300 | 27 |
  | Spain | cuánta agua beber al día | 320 | 7 |
  | Poland | ile wody dziennie pić | 110 | 0 |
- **Proposal:**
  - A calculator based on EFSA's adequate intakes for total water: 2.0 L a day for women and 2.5 L for men, of which about 20 to 30 % usually comes from food. It adds the context the reader controls (heat, physical activity) and states clearly when to see a doctor (kidney or heart conditions, pregnancy).
  - A table of water-rich foods from open composition data, shared with EAM-01.
  - It upgrades the existing hydration article rather than competing with it.
- **Effort, maintenance, risk:**

  | Factor | Score | Why |
  | --- | --- | --- |
  | Effort | 2 | |
  | Maintenance | 1 | |
  | Risk | 2 | Health: reference values only, no personal prescription |
- **Measurement:** clicks and impressions of the hydration article cluster in each locale, after the change compared with before.
- **Score inputs:** U4 D4 X3 L3 B3, C4.
- **Build (2026-10-27), calculator only:**
  - Values: `src/data/water.ts`; text and URLs: `src/i18n/water-ui.ts`; page: `src/components/WaterCalculatorView.astro`.
  - URLs: `/combien-d-eau-par-jour/`, `/en/how-much-water-per-day/`, `/es/cuanta-agua-beber-al-dia/`, `/de/wie-viel-wasser-am-tag/`, `/it/quanta-acqua-bere-al-giorno/`, `/pt-pt/quanta-agua-beber-por-dia/`, `/pl/ile-wody-dziennie/`.
  - Sources checked on 2026-10-27: EFSA 2010 opinion (abstract: adequate intakes by age, pregnancy +300 mL, lactation about +700 mL); Guelinckx et al. 2016 (EFSA assumed food supplies 20 to 30 %); NHS "Water, drinks and hydration" (tea and coffee count, pale urine, situations that raise needs).
  - Heat, exercise and illness add notes only: EFSA gives no figure for them, so the tool shows none.
  - Linked from the hydration article in all 7 languages, and links back to it.
  - Tests: `tests/water.spec.ts`.
- **Water-rich foods table (2026-10-27):** on the calculator page, in every locale. It lists the foods of the shared selection (`src/data/foods.ts`, Ciqual 2025) with at least 80 g of water per 100 g, richest first, per 100 g and per usual portion (61 foods). 21 water-rich foods were added to the selection for it (watermelon, melon, radish, celery, soups, yoghurt…); they also appear in the fibre table. Ciqual is credited with its licence. Module: `src/data/water-foods.ts`.
- **Not done yet:**
  - National reference values (for example D-A-CH in Germany) where they differ from EFSA: not researched; every locale shows EFSA values today.

### EAM-01: high-fibre foods table and daily-fibre calculator (score 40, largest prize)
- **Problem:** readers want to know which foods contain the most fibre and how to reach the recommended intake. Aloessential mentions 30 g/day (digestion article) but offers no resource.
- **Demand, the highest of the audit:**

  | Market | Query | Monthly searches | Difficulty |
  | --- | --- | --- | --- |
  | United Kingdom | high fibre foods | 60,500 | 28 |
  | Germany | ballaststoffreiche Lebensmittel | 27,100 | 8 |
  | France | aliments riches en fibres | 18,100 | 10 |
  | Italy | alimenti ricchi di fibre | 6,600 | 3 |
  | Spain | alimentos ricos en fibra | 6,600 | 15 |
  | Poland | produkty bogate w błonnik | 3,600 | 0 |
  | Portugal | alimentos ricos em fibra | 1,900 | 0 |
- **Proposal:**
  - A searchable, sortable table of foods by fibre per 100 g and per usual portion, built from open food-composition data. Candidate: ANSES Ciqual. **Licence and attribution to be verified before use.**
  - Each food is tagged with the EU nutrition-claim thresholds, quoted as regulatory definitions: "source of fibre" from 3 g/100 g, "high fibre" from 6 g/100 g (Regulation 1924/2006, annex).
  - A daily calculator: pick foods and portions, see the total against the reference intake.
  - Food names localized for the 7 locales, starting with a curated list of about 120 common foods.
- **Differentiation:** most top results are static lists. Here the values are sourced, sortable, tied to portions and carry the EU regulatory labels. Answer engines can cite figures with a source.
- **Effort, maintenance, risk:**

  | Factor | Score | Why |
  | --- | --- | --- |
  | Effort | 4 | Data pipeline, food names in 7 languages |
  | Maintenance | 2 | The source data is versioned |
  | Risk | 2 | Data licence and nutrition wording |

  EAM-02 reuses the same pipeline: build them together.
- **Build (2026-10-27):**
  - **Licence checked:** Ciqual 2025 (Anses, version of 2025-11-03, https://doi.org/10.57745/RDMHWY) is published under the Etalab Open Licence 2.0. Reuse is allowed with attribution; the page credits Anses, the table and its version.
  - **Data:** curated foods in `src/data/foods.json` (94 at launch, 115 since the water-rich foods were added) (Ciqual code, category, usual portion, names in 7 languages). `tools/extract-ciqual.py` reads the Ciqual Excel file, which is not stored in the repository, and writes fibre, water and energy per 100 g to `src/data/ciqual-values.json`. Portions are the team's estimate and the page says so.
  - **Labels:** EU claim thresholds checked: "source of fibre" from 3 g per 100 g or 1.5 g per 100 kcal, "high fibre" from 6 g per 100 g or 3 g per 100 kcal. They are applied to foods as benchmarks, not as product claims.
  - **Daily references:** EFSA 25 g (opinion 2010, DOI 10.2903/j.efsa.2010.1462) and 30 g, the target of SACN (UK, 2015, checked in the report). The ANSES 30 g figure was found only in secondary sources, so the page does not cite ANSES.
  - **Pages:** `/aliments-riches-en-fibres/`, `/en/high-fibre-foods/`, `/es/alimentos-ricos-en-fibra/`, `/de/ballaststoffreiche-lebensmittel/`, `/it/alimenti-ricchi-di-fibre/`, `/pt-pt/alimentos-ricos-em-fibra/`, `/pl/produkty-bogate-w-blonnik/`. The full table is static HTML; search, sort and the day calculator run in the browser (about 2.4 kB of script, no food data in it).
  - Linked from the fibre section of the digestion article in all 7 languages, and links back to it.
  - Tests: `tests/fibre.spec.ts`.
- **Not done yet:**
  - Food names follow French usage. Some national staples are missing (rye crispbread, pumpernickel, kasza gryczana…).
  - National data (for example the German BLS) is not used; every locale shows Ciqual values.
- **Measurement:** clicks and impressions for the fibre query cluster in each locale; links earned (Search Console Links report); tool usage once analytics exist.
- **Score inputs:** U5 D5 X4 L4 B3, C4.

### SEO-05: deepen the highest-demand aloe articles (score 34)
- **Demand:**
  - aloe vera à boire (FR 2,900);
  - aloe vera da bere (IT 5,400);
  - aloes do picia (PL 5,400);
  - aloe vera drink (UK 6,600);
  - aloe vera bienfaits (FR 2,400);
  - jus aloe vera (FR 1,300);
  - gel aloe vera pur (FR 1,000).
- **Proposal:** extend the matching articles with the questions readers actually ask (dose, taste, how long a bottle lasts once opened, pure gel or juice), keeping the regulatory caution. No new pages: this avoids cannibalisation.
- **Effort, maintenance, risk:**

  | Factor | Score | Why |
  | --- | --- | --- |
  | Effort | 3 | |
  | Maintenance | 1 | |
  | Risk | 2 | Health claims; translations must follow |
- **Score inputs:** U4 D5 X3 L2 B4, C3.

### SEO-04: PRO 12 + snippet test (score 30)
- **Evidence:** the PRO 12 + page ranks at about 7.8 with 12 impressions; "pro 12 lr avis" is at position 9. The current title is "Capsules PRO 12 + : composition et avis".
- **Hypothesis:** naming LR in the title ("PRO 12 + LR : composition et avis") matches the query better and lifts CTR.
- **Condition:** start only once the page has at least 200 impressions in 28 days. Today the sample is far too small (`EXPERIMENTATION_FRAMEWORK.md`).

### EAM-04: aloe drink label checker (score 29)
- **Problem:** buyers compare aloe drinks without knowing what to check: aloe content, aloin and hydroxyanthracene derivatives (Regulation 2021/468), sugar, additives.
- **Proposal:** an interactive checklist that reads like a label. It builds on the "aloe vera à boire" article and relates naturally to the drinking-gel products.
- **Risk:** 3 (regulatory accuracy; the T-189/21 ruling is under appeal).
- **Score inputs:** U4 D5 X4 L3 B5, C3; effort 3, maintenance 2, risk 3.

### SEO-03: redirect legacy URLs from the previous site (score 24, blocked)
- **Evidence:** Search Console lists `https://aloessential.com/product/aloe-first-spray/` (404) as a page referring to the home page, a trace of an earlier site on the domain.
- **Blocker:** the list of legacy URLs. Owner action: Search Console → Pages → "Not found (404)" → export.
- **Proposal:** add a 301 to the closest equivalent page only when one exists (for example `aloe-first-spray` → the Emergency Spray page); leave the others as 404.

### Parked
- **EAM-05: %NRV and claim checker.**
  - Demand: "valeur nutritionnelle de référence" FR 110, "calcul vnr" no measurable volume.
  - Unique, but low demand and medium compliance risk. Revisit once Search Console shows regulatory queries.
- **EAM-06: INCI decoder.**
  - Demand: liste inci FR 480, inci liste DE 320, inci cosmetici IT 260.
  - The ingredient database would be heavy to maintain. Revisit after EAM-01.
- **EAM-07: browser of EU authorised claims.**
  - Demand: "allégations de santé autorisées" FR 10.
  - High citation potential but almost no search demand.
- **GEO-01: Organization entity.**
  - Add `sameAs` once official profiles exist, and an "about" paragraph that tells Aloessential apart from the "AloEssentials" business listed in directories.
  - Blocked: needs the owner's official profiles.
