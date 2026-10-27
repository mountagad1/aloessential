# Organic growth metrics

## 1. Data sources

| Source | Status (2026-10-26) | What it gives | Limits |
| --- | --- | --- | --- |
| Google Search Console, property `sc-domain:aloessential.com` | **verified, connected to OpenSEO** (OBS) | Clicks, impressions, CTR, average position by query, page, country and device; index status per URL | About 3 days of lag; anonymised rare queries; position is an average, not a rank |
| OpenSEO (DataForSEO) | connected; **0 credits left** (2026-10-27, after 7 SERP fetches) | Search volume, keyword difficulty, intent, SERPs | Third-party estimates; costs credits |
| Web analytics | **none**: Vercel Web Analytics answers `web_analytics_not_enabled` | Would give landing-page visits, engagement, tool usage, AI referrers, conversions (partner-link clicks) | **Owner decision (ADR-006)**; the privacy policy must be updated when enabled |
| Field performance (Core Web Vitals) | none | Would give LCP, INP and CLS by template | Vercel Speed Insights, or CrUX once traffic is enough |
| Search Console links report | available in the Search Console interface | Earned links | Not exposed by the API used here |

## 2. Metric definitions

| Metric | Definition | Source | Use |
| --- | --- | --- | --- |
| **Qualified organic clicks** (primary) | Search Console web clicks on indexable pages, excluding brand queries (those containing "aloessential") | Search Console | North-star metric |
| Clicks by locale | Clicks grouped by URL prefix (`/`, `/it/`, `/en/`…) | Search Console (page dimension) | International priorities |
| Clicks by cluster | Pages mapped to clusters: aloe, hydration, fibre/digestion, skin, sleep/energy, products | Search Console plus the content inventory | Topic decisions |
| Clicks by page type | article, product, tool, category, home | `tools/seo-audit.mjs` page types | Engineering as Marketing versus editorial |
| Impressions | Times shown in results | Search Console | Visibility; **not visits** |
| CTR | clicks ÷ impressions | Search Console | Snippet work; read with position |
| Average position | Search Console average | Search Console | **Diagnostic only**, not a goal |
| Index coverage | Indexed URLs ÷ URLs in the sitemap | Search Console Pages report | Crawl health |
| Tool usage | Tool started, result shown | Analytics events (**unavailable**) | Engineering-as-Marketing value |
| Partner-link clicks | Clicks on `data-shop-link` | Analytics events (**unavailable**) | Business value |
| AI referrals | Sessions referred by chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com… | Analytics referrers (**unavailable**) | GEO; **only measured referrals count, never "visibility"** |

**Rules:**
- Impressions are never reported as visits.
- Average position is never reported as clicks.
- Brand and non-brand queries are reported separately.
- Search Console metrics are never mixed with analytics metrics under the same name.

## 3. Baseline (Search Console, 2026-10-15 to 2026-10-23)

First impressions appeared on 2026-10-15; earlier days have no data. Translations went live on 2026-10-24 and are **not** in this window.

| Metric | Value |
| --- | --- |
| Clicks | 6 (5 of them on the home page or the team page, which suggests brand searches) |
| Impressions | 194 |
| Pages with impressions | 28 |
| Queries with impressions | 52 (query and page pairs) |
| Daily impressions, last 3 days | 32, 24, 35 |

### Top pages by impressions

| Page | Impressions | Average position |
| --- | --- | --- |
| /articles/hydratation-aliments-riches-en-eau/ | 41 | 74.9 |
| /produits/ | 20 | 27.1 |
| /articles/digestion-foie-detox-complements/ | 17 | 35.0 |
| /articles/articulations-mobilite-quotidien/ | 16 | 79.6 |
| /articles/cultiver-aloe-vera-en-pot/ | 16 | 80.2 |
| /articles/aloe-vera-bienfaits-peau/ | 15 | 78.5 |
| /articles/petit-dejeuner-equilibre/ | 15 | 77.0 |
| /produits/capsules-pro-12-plus/ | 12 | 7.8 |

**Index status:** 8 URLs inspected on 2026-10-26: home, 2 French articles, the guide, a product, the Italian home, an English article, and `http://` (expected). All are "Submitted and indexed", and Google's chosen canonical matches the declared one, except `http://aloessential.com/`: "Crawled – currently not indexed", the expected outcome for the http variant.

## 4. Reporting rhythm

- **Weekly:**
  - Search Console pages and queries for the last 7 days against the previous 7;
  - new queries in positions 5 to 20 with at least 50 impressions (striking distance);
  - index anomalies.
- **Monthly:** the full growth review (`SEO_GEO_GROWTH_LOOP.md`).
- **Where reports live:** `docs/growth/reviews/YYYY-MM-DD.md`. Each report must give its data source and date range.

## 5. Gaps to close

1. **Analytics (MEAS-01).**
   - Without them there is no engagement, tool usage, partner clicks or AI referrals.
   - Recommended: Vercel Web Analytics (cookieless, already on the hosting), plus custom events for tool use and partner-link clicks.
   - Owner decision required; then update `confidentialite`.
2. **Legacy 404 export from Search Console** (SEO-03).
3. **Field Core Web Vitals** (Speed Insights), once analytics are decided.
