# Content cannibalization map

*2026-10-27. Built from the query and page pairs in Search Console and the URL list. One intent, one primary URL.*

| Cluster | Primary URL | Other URL on the same topic | Distinct purpose? | Observed overlap | Rule |
| --- | --- | --- | --- | --- | --- |
| Watering aloe vera (K01) | `/aloe-vera/arrosage/` (tool) | `/articles/cultiver-aloe-vera-en-pot/` (whole care guide) | Yes: watering rhythm against general care | The guide currently receives the watering queries (~position 90); the tool is not indexed yet | The guide keeps one watering paragraph and links to the tool (done 2026-10-27). If both rank for "arroser" after 8 weeks, shorten the guide's paragraph rather than merge |
| Water-rich foods (K09) | `/articles/hydratation-aliments-riches-en-eau/` | water-rich foods table on `/combien-d-eau-par-jour/` | Partly: the table answers "which foods" inside a page about "how much per day" | The article holds the query today (positions 55 to 93) | Leave both. If Search Console shows the calculator page taking the "riches en eau" queries, make the article the table's home (move the table, link from the calculator) instead of keeping two |
| Fibre (K05) | `/aliments-riches-en-fibres/` (table) | `/articles/digestion-foie-detox-complements/` (supplements and digestion) | Yes | none yet | No action |
| Aloe drinks (K04) | `/articles/aloe-vera-a-boire-comment-choisir/` (choosing a drink) | `/articles/jus-aloe-vera-science/` (what science says) | Yes: buying guide against evidence review | none in Search Console | Keep cross-linked (done 2026-10-26/27) |
| Aloe on skin (K03) | `/articles/aloe-vera-bienfaits-peau/` | `/articles/choisir-gel-aloe-vera/`, `/articles/routine-peau-apres-soleil/` | Yes: evidence, buying, routine | none | Keep; links added 2026-10-27 |
| LR aloe products (K14) | `/produits/` | product pages | Yes: listing against single product | none | No action |

## Across languages

Each translation targets its own market and declares the others through hreflang, so language versions do not compete. The French-only pages (`/aloe-vera/`, legal pages) have no foreign counterpart.

## How to re-check

Search Console, dimensions `query` + `page`, last 28 days. A query that sends impressions to two Aloessential URLs is a candidate. Act only if one of them is not the URL in the "Primary" column for more than 4 weeks.
