# SERP opportunity map

*Built 2026-10-27. Sources: Search Console (2026-10-15 to 2026-10-24), live SERPs fetched on 2026-10-27 (top 10, desktop), and DataForSEO volumes measured on 2026-10-26 (`docs/growth/ENGINEERING_AS_MARKETING_BACKLOG.md`).*

## 1. Scoring model (100 points)

| Factor | Weight | Scale |
| --- | --- | --- |
| Search demand evidence | 20 | 20 = measured volume ≥ 10,000; 15 = 1,000 to 10,000; 10 = Search Console impressions only; 5 = assumed |
| Business and audience relevance | 20 | 20 = aloe vera or LR products; 12 = adjacent wellness topic; 5 = loose |
| Achievable competitive opportunity | 20 | from the live SERP: weak results (forums, video, old pages) score high; institutions and major brands score low |
| Original value Aloessential can contribute | 20 | 20 = a tool or dataset nobody in the top 10 offers; 10 = better sourcing; 5 = parity |
| Existing authority and topical fit | 10 | current positions, indexed pages, cluster depth |
| Implementation cost and time to value | 10 | 10 = done or under a day; 5 = a week; 2 = more |

The weights live in this table; change them here and re-score. A score orders the work. It is not a ranking probability and it is not Google's formula.

Confidence levels:
- **High:** the SERP was fetched and the volume measured.
- **Medium:** one of the two is missing.
- **Low:** both are missing.

## 2. Scored opportunities

| # | Query (market) | Destination | Demand | Relevance | Achievable | Original | Authority | Cost | **Score** | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| O1 | arroser aloe vera (FR) | `/aloe-vera/arrosage/` | 15 | 20 | 17 | 16 | 7 | 9 | **84** | High |
| O2 | aloe vera à boire (FR, IT, PL, UK) | `/articles/aloe-vera-a-boire-comment-choisir/` and translations | 15 | 20 | 10 | 14 | 7 | 6 | **72** | Medium (SERP fetched 2026-10-27 for FR and IT) |
| O3 | aliments riches en fibres (FR) | `/aliments-riches-en-fibres/` | 20 | 12 | 9 | 17 | 4 | 9 | **71** | High |
| O4 | pro 12 lr avis (FR) | `/produits/capsules-pro-12-plus/` | 10 | 20 | 16 | 10 | 8 | 7 | **71** | Medium (SERP not fetched) |
| O5 | combien de litres d'eau par jour (FR) | `/combien-d-eau-par-jour/` | 15 | 12 | 13 | 15 | 5 | 9 | **69** | High |
| O6 | ballaststoffreiche Lebensmittel (DE) | `/de/ballaststoffreiche-lebensmittel/` | 20 | 12 | 9 | 12 | 3 | 5 | **61** | High |
| O7 | aloe vera peau (FR) | `/articles/aloe-vera-bienfaits-peau/` | 10 | 20 | 7 | 12 | 5 | 6 | **60** | High (SERP), volume not measured |
| O8 | légumes / fruits riches en eau (FR) | hydration article, or the water page's table | 10 | 12 | 10 | 14 | 5 | 8 | **59** | Low |

### Evidence behind each score

- **O1:** 1,600 searches a month, difficulty 0 (EXT).
  - The top 6 are a TikTok video, a 2010 gardening page, a Facebook group, a news-style article, a PagesJaunes forum and a shop. A video pack and an AI Overview sit above them (OBS).
  - No result offers a rhythm tied to pot, season and spot.
  - Our growing guide already gets "arroser aloe vera en pot" impressions at about position 90.
- **O2:**
  - Volumes (EXT): FR 2,900, IT 5,400, PL 5,400, UK 6,600.
  - The French article had one impression at position 8.
  - SERPs fetched on 2026-10-27 (FR, IT): brands, pharmacies and Amazon, with unsupported timing advice and health promises. Business fit is the highest of all: LR sells aloe drinking gels.
- **O3:**
  - Volume (EXT): 18,100, difficulty 10.
  - The SERP (OBS) is led by Ameli (national health insurance), two hospitals, a laboratory, Nestlé and Nutri&Co. All are static lists, and some quote Ciqual figures without per-portion values or a calculator.
  - Authority gap: these are institutions, and the topic is health-adjacent.
- **O4:** small, brand-led demand (EXT not measured). Search Console shows positions 8 to 10 for "pro 12", "pro 12 plus" and "pro 12 lr avis". This is the SEO-04 snippet test, waiting for 200 impressions.
- **O5:**
  - Volume (EXT): 4,400, difficulty 4.
  - The SERP gives contradictory figures: "1.5 L plus food", "30 ml/kg", "1.3 to 1.4 L". Only a Swiss hospital PDF (CHUV) cites the EFSA values.
  - Our page is already indexed (OBS).
- **O6:**
  - Volume (EXT): 27,100, difficulty 8.
  - The DGE (German nutrition society) ranks first, then Plantura, DKV, Swiss Heart, REWE and Chefkoch.
  - Our table lacks the staples German pages cite (Pumpernickel, Roggenknäckebrot, Mohn), and its data is French. Cost covers adding national staples.
- **O7:**
  - The SERP is dominated by brands that sell aloe gel (Aroma-Zone twice, Sanoflore, Garancia, Fleurance, Typology), mostly with optimistic claims.
  - Our angle is "what we really know", with sources. Our article ranks about 73 to 78.
- **O8:** 48 impressions at positions 55 to 93 on "légumes/fruits riches en eau" variants. The overlap is discussed in `CONTENT_CANNIBALIZATION_MAP.md`.

## 3. Decisions

1. **New pages:** none, beyond the three tools already built. Every opportunity has an existing destination.
2. **Priority:**
   - O1: the planner exists; watering queries should move from the growing guide to it. Watch Search Console.
   - O2: SERP research once credits allow, then the SEO-05 refresh, human review required.
   - O5 and O3: indexation and links (playbook).
   - O6: German staples.
3. **Deprioritized:**
   - O7, against brand authority, until the pages above have data.
   - O4, until it reaches 200 impressions in 28 days.
