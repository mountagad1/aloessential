# Experimentation framework

## Template (one per experiment, kept in this file or in `docs/growth/experiments/`)

| Field | Content |
| --- | --- |
| ID | EXP-### |
| Problem | What the evidence shows |
| Evidence | Data, source, date range |
| Hypothesis | "If we …, then … because …" |
| Pages and locales | Test group, and the control group if any |
| Primary metric | Usually Search Console clicks of the test pages |
| Secondary metrics | Impressions, CTR, position, tool usage |
| Guardrails | Clicks of the rest of the cluster, test suite, index status |
| Change | Exact diff, commit |
| Window | Default 28 days after Google recrawls the pages (check with `inspect_urls`) |
| Confounders | Seasonality, Google updates, other changes in the same window, newly indexed translations |
| Success, failure, rollback | Thresholds written **before** launch |
| Result, decision, lessons | Filled after the window |

## Statistical honesty

- **Minimum sample:** Aloessential is new. As long as a page has fewer than **200 impressions in 28 days**, a CTR change cannot be told from noise. Snippet tests wait for that threshold.
- **Group tests:** with few pages per template, prefer changing a group of comparable pages and keeping a similar group untouched (for example half of the articles without inbound links get links first). Such a comparison is **observational**, and the result is labelled that way.
- **No forecasts:** no traffic forecast is ever reported as a result.

## Queued experiments

### EXP-001: contextual internal links (initiative SEO-01)
- **Evidence:** 52 of 112 articles have no inbound body link (`npm run seo:audit`, 2026-10-26).
- **Hypothesis:** adding 1 to 3 relevant body links towards these articles raises their impressions and improves their average position within 28 days of recrawl, compared with comparable articles left unlinked.
- **Groups:**
  - **Test:** the French articles without inbound body links, and their translations (same edits in every locale).
  - **Control:** French articles that already have inbound links. This makes the comparison observational, since the groups are not random.
- **Primary metric:** impressions of the test group.
- **Success, failure:**
  - **Success:** test-group impressions grow at least 20 % more than the control group's, over the same window.
  - **Failure:** no difference, or any guardrail regression.
- **Guardrails:**
  - 0 broken links;
  - translations not stale;
  - tests pass.
- **Status:** changes prepared on 2026-10-26, not yet deployed. The 28-day window starts on the deployment date, which is recorded here once the owner publishes.
- **Test group (French source → link added from):**
  - aloe-vera-a-boire-comment-choisir ← jus-aloe-vera-science (French only; the translations already had it)
  - aloe-vera-bienfaits-peau ← choisir-gel-aloe-vera, routine-peau-apres-soleil
  - soin-anti-age-quels-actifs ← routine-peau-apres-soleil
  - routine-matin-energie ← sommeil-pilier-bien-etre
  - articulations-mobilite-quotidien ← routine-matin-energie
  - vitamines-fatigue-reglementation ← routine-matin-energie, digestion-foie-detox-complements
  - soins-cheveux-naturel ← aloe-vera-bienfaits-peau
  - `/aloe-vera/` (French only) ← cultiver-aloe-vera-en-pot, aloe-vera-a-boire-comment-choisir
  - Translations of hydratation-aliments-riches-en-eau ← their after-sun article (the French already had this link)
- **Not covered:** 3 translated articles (pt-pt digestion and after-sun, pl after-sun) whose French inbound links come from product pages that do not exist in those languages.

### EXP-002: PRO 12 + title (initiative SEO-04)
- **Start condition:** 200 impressions in 28 days on `/produits/capsules-pro-12-plus/`. On 2026-10-23 the page had 12.
- **Hypothesis:** "PRO 12 + LR : composition et avis" matches "pro 12 lr avis" better than the current title and raises CTR without lowering position.
