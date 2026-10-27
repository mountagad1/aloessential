# Critical findings

*Audit of 2026-10-27. Evidence: `MASTER_BASELINE.md`.*

No critical defect was found. The site is static, every page returns its full HTML, and the sitemap matches the indexable pages exactly. The findings below are ranked by expected impact on organic visibility.

## Fixed in this change

| # | Finding | Evidence (OBS) | Fix |
| --- | --- | --- | --- |
| F1 | The 21 tool pages were reachable from only one article body each, with no navigation path | `seo:audit`; inspection: 3 tool pages "Discovered – currently not indexed" | "Our tools" column in the footer of every page, in every locale (`Footer.astro`); guarded by `tests/indexation.spec.ts` |
| F2 | Sitemap `lastmod` and Article `dateModified` could never reflect an update: only the publication date existed | `src/content.config.ts` had no update field; the sitemap used `date` | Optional `updated` field (last meaningful change only), used for the visible "updated on" line, `dateModified` and `lastmod`; guarded by `tests/indexation.spec.ts` |

## Open, ranked

| # | Finding | Level | Evidence | Next step | Owner |
| --- | --- | --- | --- | --- | --- |
| C1 | No analytics: engagement, tool use and conversions cannot be measured | High | Vercel answers `web_analytics_not_enabled` | Enable Vercel Web Analytics (MEAS-01, ADR-006) and update the privacy page | Owner decision |
| C2 | Most French articles rank 70 to 95 for their main queries | High | Search Console | Refresh the articles whose queries show demand (`content/CONTENT_REFRESH_BACKLOG.md`) | Editorial, human review (health) |
| C3 | Overlap between the hydration article and the water-rich foods table on the water calculator page | Medium | both answer "aliments riches en eau" | Watch which URL Google selects; decision rule in `research/CONTENT_CANNIBALIZATION_MAP.md` | SEO |
| C4 | The fibre and water tables use French data and French staples in every locale | Medium | German SERP: REWE and DKV cite Pumpernickel and Roggenknäckebrot, which our table lacks; DGE ranks first | Add national staples per market, starting with Germany (`international/LOCALIZED_SERP_OPPORTUNITIES.md`) | Editorial |
| C5 | Legacy URL from an earlier site on the domain answers 404 | Medium | `/product/aloe-first-spray/` listed by Search Console | Export the "Not found (404)" report, then add a 301 only where an equivalent page exists (SEO-03) | Owner, then SEO |
| C6 | No backlink or brand-mention data | Medium | not pulled (6 OpenSEO credits left) | `authority/BACKLINK_ACQUISITION_PLAYBOOK.md` §1 | Owner (credits) |
| C7 | The http-to-https redirect is not verified from the audit environment | Low | port 80 blocked here; Search Console reports `http://` as "Crawled – currently not indexed" | Check once from a normal network: `curl -I http://aloessential.com/` must return 308 to https | Owner |
| C8 | Production deploys do not wait for the test suite: Vercel builds every push on its own, while GitHub Actions runs the tests in parallel | Medium | `.github/workflows/ci.yml` comment: "Vercel deploys on its own" | Make Vercel wait for the GitHub check before assigning the production domain (Vercel's deployment checks setting), or deploy from CI only. Until then, run `npm test` before every push (current practice) | Owner (Vercel settings) |
| C9 | One test (`motion.spec.ts`, anchor-jump reveal) fails occasionally under full-suite load | Low | failed in 2 full runs on 2026-10-27 (a third earlier failure had the same assertion); passed 8 of 8 when repeated alone | Make the wait deterministic | Engineering |

## Hypotheses (not verified)

- **H1 (not testable without analytics):** the AI Overview at the top of all five SERPs observed lowers the click-through rate on informational queries. Track CTR by query in Search Console once there are enough impressions.
- **H2:** tool pages earn links more easily than articles. Test it through the outreach in the backlink playbook.
