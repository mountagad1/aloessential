# SEO and GEO growth loop

A repeating cycle, not a one-off checklist. Each turn of the loop leaves a written trace in the backlog and in `docs/growth/reviews/`.

```
Observe → Diagnose → Discover → Prioritise → Build → Validate → Publish → Measure → Learn → Improve → Observe…
```

## The ten steps on Aloessential

| Step | What happens | Tools and files |
| --- | --- | --- |
| 1. Observe | Pull Search Console: pages, queries, countries, devices, index status. Then analytics once enabled. Note any data gap | OpenSEO (`get_search_console_performance`, `inspect_urls`); `ORGANIC_GROWTH_METRICS.md` |
| 2. Diagnose | Look for: pages gaining or losing clicks; impressions without clicks; positions 5 to 20; intent mismatches (two pages for one query); index anomalies; locale gaps; performance regressions. Separate correlation from cause | `npm run seo:audit`; query × page export |
| 3. Discover | Write each idea as an initiative: problem, evidence, intent, solution, mechanism, work, localization, risk, measurement | `ENGINEERING_AS_MARKETING_BACKLOG.md` |
| 4. Prioritise | Score each initiative (playbook §2). Prefer high-value, testable, reversible work. Never pick on search volume alone | backlog |
| 5. Build | Small, independently reviewable changes | repository |
| 6. Validate | Build, the 229+ tests, SEO checks (canonical, hreflang, sitemap, structured data), accessibility, performance, locale integrity, regulatory review | `npm test`, `npm run seo:audit` |
| 7. Publish | **Only on the owner's go-ahead** (a push deploys to production). Record the date, URLs, templates, links, expected effect and rollback | commit message plus backlog row |
| 8. Measure | Wait for the window (usually 28 days for search changes). Compare with a control group or the period before. Note confounders: seasonality, core updates, newly indexed translations | `EXPERIMENTATION_FRAMEWORK.md` |
| 9. Learn | What worked, what did not, which assumptions were wrong | review file |
| 10. Improve | Update the backlog, the scoring weights, the content rules, the automated checks | docs plus tests |

## Rhythm

- **Daily (automatic, when monitoring exists):** failed deployments; sudden index drops.
- **Weekly (about 30 minutes):**
  - Search Console week-on-week;
  - striking-distance queries;
  - experiment status;
  - next backlog item.
- **Monthly review:**
  - clicks by locale, cluster and page type;
  - Engineering-as-Marketing assets;
  - experiments closed;
  - backlog re-scored.
- **Quarterly:** strategy, international priorities, architecture assumptions (`docs/architecture/`), AI workflow evaluation.

## Guardrails

- **No automatic rewriting:** important content is never rewritten or republished automatically because of short-term noise.
- **Human approval required:**
  - material content changes;
  - health, nutrition or regulatory wording;
  - URL or indexability changes;
  - new page families;
  - architecture changes;
  - every production deployment.
- **Dates:** publication dates are not changed to fake freshness. `date` changes only when the content changes meaningfully.
- **Programmatic pages:** a family of generated pages ships only after the quality gate in `CONTENT_GROWTH_SYSTEM.md` §4.
