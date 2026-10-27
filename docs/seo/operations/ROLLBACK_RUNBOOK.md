# SEO rollback runbook

The general deployment rollback is in `docs/architecture/ROLLBACK_PLAN.md`. This file covers the SEO-specific cases.

## 1. Fast rollback (minutes)

1. In Vercel, open the project's deployments and promote the last good production deployment ("Instant Rollback"). Static output makes this a pointer switch.
2. Revert the faulty commit in git (`git revert <sha>`) and push, so the next deploy does not bring the problem back. Never rewrite the history of the production branch.
3. Check production:
   ```sh
   curl -sI https://aloessential.com/ | head -1
   curl -s https://aloessential.com/sitemap.xml | grep -c "<loc>"   # expected count: docs/seo/MASTER_BASELINE.md
   curl -s https://aloessential.com/robots.txt
   ```

## 2. Cases

| Incident | Detect | Fix |
| --- | --- | --- |
| A template ships `noindex` or a wrong canonical | `tests/seo.spec.ts`; Search Console "Excluded by noindex" or "Alternate page with proper canonical" spikes | Roll back, then fix the template. Do not resubmit before the fix is live |
| The sitemap loses or gains URLs unexpectedly | URL count against the baseline; `tests/indexation.spec.ts` | Roll back; compare the content changes (drafts, `status`) |
| A URL is removed or renamed by mistake | 404 in the Search Console Pages report; audit | Restore the page, or add a 301 in `vercel.json` to the closest equivalent |
| hreflang breaks (missing reciprocity) | `tests/i18n.spec.ts` | Roll back; fix the alternates source (`src/lib/*.ts`, `src/i18n/*-ui.ts`) |
| robots.txt blocks crawling | `curl` above; Search Console robots report | Roll back immediately. A long block can drop pages from the index |
| A change hurts rankings (experiment) | `docs/growth/EXPERIMENTATION_FRAMEWORK.md` guardrails | Revert the change. Do not chain new edits on the same pages while measuring |

## 3. After the fix

- Re-run `npm test` and `npm run seo:audit -- dist`.
- Inspect up to 10 affected URLs (URL Inspection).
- Record the incident and its cause in `docs/growth/reviews/`.
