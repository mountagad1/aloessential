# Growth engineering strategy

*Audit of 2026-10-26.*

This strategy treats SEO and GEO as one system. Each initiative starts from a reader's problem and ends with a measured result. Engineering as Marketing (free tools, data, interactive resources) is a first-class part of it, not an add-on.

Evidence levels, as in `docs/seo/ALOESSENTIAL_BASELINE.md`:
- **OBS:** observed (code, build, test, or a first-party API call made on the date shown).
- **EXT:** third-party estimate, such as search volumes from DataForSEO via OpenSEO.
- **INC:** unknown.

## 1. Executive summary

- **The technical base is strong (OBS).**
  - Static Astro site, CDN-delivered.
  - 180 indexable pages in 7 languages.
  - 0 broken internal links.
  - hreflang and sitemap generated from one source and tested.
  - 229 automated tests.
  - Every page checked in Search Console is "Submitted and indexed", including translations published on 2026-10-24.
- **There is almost no search traction yet (OBS, Search Console).** First impressions appeared on 2026-10-15. From 2026-10-15 to 2026-10-23 there were 6 clicks and 194 impressions. Article pages sit at an average position of 35 to 80. The site is 10 days into indexing: this is a starting point, not a verdict.
- **Little is measured.** Search Console is verified and connected to OpenSEO (OBS), so queries, pages and index status are available. No web analytics are installed: Vercel Web Analytics returns `web_analytics_not_enabled`. Engagement, tool usage and conversions are therefore **not measurable today**. This is the main blocker of the loop (§4).
- **The content is short and thinly linked (OBS, `tools/seo-audit.mjs`).**
  - Articles average about 440 words.
  - 52 of 112 articles receive no link from another article's body.
  - The aloe vera guide (`/aloe-vera/`) is linked only from navigation.
- **There is a large, measurable opportunity the site does not cover (EXT).** "Aliments riches en fibres" and its equivalents have high demand and low difficulty in all 7 markets:

  | Market | Query | Monthly searches | Difficulty |
  | --- | --- | --- | --- |
  | France | aliments riches en fibres | 18,100 | 10 |
  | United Kingdom | high fibre foods | 60,500 | 28 |
  | Germany | ballaststoffreiche Lebensmittel | 27,100 | 8 |
  | Italy | alimenti ricchi di fibre | 6,600 | 3 |
  | Spain | alimentos ricos en fibra | 6,600 | 15 |
  | Poland | produkty bogate w błonnik | 3,600 | 0 |
  | Portugal | alimentos ricos em fibra | 1,900 | 0 |

  Aloessential already states the 30 g/day fibre target in its digestion article but has no fibre resource. This is the strongest Engineering-as-Marketing candidate: a searchable fibre table built on open data, plus a daily-intake calculator (`ENGINEERING_AS_MARKETING_BACKLOG.md`, EAM-01).

## 2. What Aloessential has (OBS)

| Area | State |
| --- | --- |
| Stack | Astro 5 static output on Vercel. No database, no server code at request time. Images responsive (WebP srcset) |
| Content | 16 French articles, each translated into 6 languages (112 articles). 6 published products, with 14 localized product pages. One aloe vera guide |
| International | 7 locales with localized URLs, hreflang, sitemap alternates and a language switcher. The reviewer of every translation is the owner's choice (Philippe Cros) |
| Trust signals | Named author and reviewer; sources on regulatory articles; partner-link disclosure; no Product or Review markup (the site sells nothing) |
| Structured data | Organization, Article (with ImageObject), BreadcrumbList, WebPage with `primaryImageOfPage` on products |
| Measurement | Search Console: verified, connected through OpenSEO, readable by API. Analytics: none. Field Core Web Vitals: none |
| Tests | 229 Playwright tests (SEO, i18n, delivery, accessibility basics) |

## 3. SEO and GEO audit

### What works
- **Crawl and index:** all URLs checked are indexed, and the canonical Google selects matches the declared one (8 URLs inspected on 2026-10-26).
- **International:** translations were crawled within 48 hours. Google lists them as referring pages of their French source, so the hreflang clusters are being read.
- **Early product signal:** product pages rank close to page one for brand-plus-product queries, for example "pro 12 lr avis" at position 9 and the PRO 12 + page at an average of 7.8 (12 impressions).

### Gaps, ranked by impact
1. **No resource where demand is highest.** Fibre: see the table above. Hydration ("combien de litres d'eau par jour", FR 4,400; "quanta acqua bere al giorno", IT 5,400; UK 14,800) only has a 160-word article. Aloe watering ("arroser aloe vera", FR 1,600; "aloe vera gießen", DE 590) is a short paragraph inside the growing guide, which ranks around position 90.
2. **Thin pages.** At about 440 words, articles compete with long guides and tools on pages ranked 50 to 90. Length alone is not the goal; covering the reader's questions is. The hydration article has the most impressions (41) and no answer to "how much water per day".
3. **Weak internal linking.** 52 of 112 articles have no inbound body link, the aloe vera guide is an orphan, and Portuguese articles average 0.69 body links.
4. **No measurement of what readers do** (no analytics).
5. **Legacy URL, a possible quick win.** Search Console lists `https://aloessential.com/product/aloe-first-spray/` (404) as a page referring to the home page: the domain had an earlier site. Any backlinks to its URLs are lost. Exporting the "Not found (404)" report from Search Console will tell whether 301 redirects are worth adding (owner action).
6. **Entity ambiguity for GEO.** Search Console shows a directory listing for "AloEssentials" (findglocal), a different business with a near-identical name. A consistent Organization entity (name, logo, `sameAs` once official profiles exist) and a clear "about" statement help answer engines tell them apart.

### GEO position
- **What the site does well for answer engines:**
  - articles state facts directly and cite primary sources (EUR-Lex, EFSA, national agencies);
  - authorship is explicit;
  - pages are static and fast, and no robots rule blocks AI crawlers.
- **What it lacks:**
  - original data an answer engine could cite (a fibre table built on open data would be one);
  - a methodology page;
  - Organization `sameAs`.
- **What cannot be measured yet:** AI referral traffic, because there are no analytics. No AI-citation data is available, and none is claimed here.

## 4. Roadmap

Phases are small, reversible and measured. Every production change stays under human control: nothing ships without the owner's "push".

| Phase | Content | Status |
| --- | --- | --- |
| 0. Audit and system | Baseline, metrics, loop, backlog, playbook. Internal linking audit tool (`npm run seo:audit`) | **done (this change)** |
| 1. Measurement | Owner enables cookieless analytics (Vercel Web Analytics, ADR-006). Weekly Search Console snapshot (`ORGANIC_GROWTH_METRICS.md`) | **blocked: owner decision** |
| 2. Quick wins | SEO-01 contextual internal links, SEO-02 link the aloe guide, SEO-03 legacy redirects (after the 404 export) | planned |
| 3. First Engineering-as-Marketing asset | EAM-01 fibre table and calculator, French first, then the 6 locales (data licence and nutrition review first) | planned, awaiting approval |
| 4. Second and third assets | EAM-02 water needs and water-rich foods (upgrades the hydration article). EAM-03 aloe watering planner | planned |
| 5. Monthly review | First growth review 4 weeks after phase 2: keep, improve, extend or remove | planned |

Related documents:
- `ENGINEERING_AS_MARKETING_PLAYBOOK.md`
- `ENGINEERING_AS_MARKETING_BACKLOG.md`
- `SEO_GEO_GROWTH_LOOP.md`
- `EXPERIMENTATION_FRAMEWORK.md`
- `ORGANIC_GROWTH_METRICS.md`
- `CONTENT_GROWTH_SYSTEM.md`
- `INTERNAL_LINKING_STRATEGY.md`
- `AI_ML_GROWTH_WORKFLOWS.md`
- `INTERNATIONAL_GROWTH_STRATEGY.md`

Architecture and capacity are covered by the existing documents in `docs/architecture/` (audit of 2026-10-22). Nothing in this strategy changes them: every planned asset is static or runs in the browser, with no origin load.

## 5. Risks and unresolved questions

- **Health and nutrition:** tools must present data and regulatory thresholds, never personal medical advice. Each tool needs a review before publication (`ENGINEERING_AS_MARKETING_PLAYBOOK.md` §4).
- **Data licences:** open datasets (for example ANSES Ciqual) must have their licence and attribution checked before reuse. **Not verified yet.**
- **Search volumes** are third-party estimates (DataForSEO via OpenSEO, 2026-10-26). They rank opportunities; they do not predict traffic.
- **OpenSEO credits:** none left (2026-10-27). Further keyword research needs a top-up or a decision on which markets to research.
