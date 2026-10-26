# Engineering as Marketing playbook

**Engineering as Marketing:** build something genuinely useful (a tool, a dataset, a calculator, an interactive resource) whose usefulness earns visits, links and citations. The asset must have a reason to exist without SEO; search amplifies its usefulness, it does not replace it.

## 1. From a reader's problem to an asset

1. **Problem.** Start from a reader's problem, using one of these sources:
   - Search Console queries;
   - keyword data;
   - questions the articles already answer badly;
   - product questions;
   - a regulatory point readers misunderstand.
2. **Format.** Choose the format that solves the problem best:

   | Reader's need | Format |
   | --- | --- |
   | Understand | guide |
   | Compare | comparator or table |
   | Compute | calculator |
   | Check something | checklist or diagnostic |
   | Look something up | searchable dataset |
   | Trust a figure | original study with its method |

   Build a tool only when interaction helps the reader.
3. **Score.** Score the asset (§2) and record it in the backlog.
4. **Build.** Use a static page with a browser-side script where possible: no server, no origin load, and it works on the CDN at any traffic.
5. **Validate.** Check the asset against the quality gate (§4).
6. **Publish and measure.** Publish with the owner's approval, then measure it (`SEO_GEO_GROWTH_LOOP.md`).

## 2. Scoring (prioritisation aid, not a traffic forecast)

Each criterion is scored from 1 (low) to 5 (high).

| Criterion | Weight | Question |
| --- | --- | --- |
| Usefulness (U) | ×3 | Does it solve a real problem better than what readers find today? |
| Demand (D) | ×2 | Measured search demand across the 7 markets: 1 for <100/month in total, 2 for <1k, 3 for <5k, 4 for <20k, 5 for ≥20k |
| Differentiation (X) | ×2 | Is it different from the current top results (data, interaction, regulatory accuracy)? |
| Link and citation potential (L) | ×1 | Would other sites or answer engines cite it? |
| Business relevance (B) | ×1 | Does it lead naturally to Aloessential's articles or products? |
| Effort (E) | cost | Engineering, content and translation work |
| Maintenance (M) | cost | Data updates, regulatory changes, 7 locales |
| Risk (R) | cost | Health claims, data licences, cannibalisation |
| Confidence (C) | factor | How solid the evidence is, from 1 (a guess) to 5 (first-party data) |

**Formula:**

**Score = (3U + 2D + 2X + L + B) × (C / 5) ÷ (E + M + R) × 10**, rounded.

- **Value** ranges from 9 to 45; **cost** from 3 to 15.
- **Above 40:** examine first.
- **20 to 40:** keep in the backlog.
- **Below 20:** park.

The score orders the backlog. The final decision weighs the reader's need, compliance and the cost of maintenance.

## 3. Asset standards

- **Free access:** no registration or e-mail is needed to get the result.
- **Accessible:**
  - keyboard and screen reader friendly;
  - results announced politely (`aria-live`);
  - works on mobile;
  - the essential content is readable without JavaScript (static table, method, sources), and JavaScript only adds interaction.
- **Methodology on the page:** sources, date of the data, formula, limits.
- **International:** the asset exists in every locale where it is reviewed, with that locale's units, food names and regulatory wording. Publication follows the same draft and review workflow as articles.
- **Indexable:** a tool page is indexable only if it carries its own useful content; parameter variants (`?age=…`) are never indexed.
- **Performance:** no new framework, small scripts, data shipped as static JSON.

## 4. Quality gate (blocking)

- [ ] Source data has a known provenance and licence, and attribution is in place.
- [ ] Calculations are tested against hand-computed cases.
- [ ] There is no medical diagnosis or personal recommendation. Where needed, the page says "see a health professional".
- [ ] Health and nutrition wording is checked against Regulation 1924/2006 (nutrition and health claims). Thresholds such as "source of fibre" (≥ 3 g/100 g) and "high fibre" (≥ 6 g/100 g) are quoted as regulatory definitions, not as advice.
- [ ] Translations are reviewed, and units and food names are localized.
- [ ] SEO checks pass: canonical, hreflang, sitemap, structured data, internal links.
- [ ] The existing test suite passes, and new tests cover the logic.
- [ ] A rollback is ready: removing the page and its links (and redirecting it if it was indexed).
