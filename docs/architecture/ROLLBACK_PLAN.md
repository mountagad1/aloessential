# Rollback plan

*2026-10-22. Applies to every production deployment of aloessential.com.*

## 1. Instant rollback (first response, < 1 minute)

Vercel keeps previous deployments. Re-pointing production to the last good one restores the previous HTML, assets and `vercel.json` headers together, without a rebuild.

- Dashboard: Project → Deployments → last good production deployment → "Instant Rollback" (or "Promote to Production").
- CLI: `vercel rollback <deployment-url-or-id>` (or `vercel promote`).

Limits to know (Vercel CLI docs, checked 2026-10-22): on the Hobby plan, rollback is limited to the **immediately previous** production deployment; older targets need a code rollback (§2). After a rollback, check in the dashboard whether the next push is promoted automatically or must be promoted by hand (`vercel promote`), and promote the fixed deployment explicitly.

## 2. Code rollback (durable fix)

On the production branch, revert the offending commit (`git revert <sha>`), never rewrite history, then push (owner's go-ahead). The new deployment replaces the rolled-back state.

## 3. This change set: what each revert does

| Change | Files | Effect of reverting | Data or URL impact |
| --- | --- | --- | --- |
| Listing pagination | `src/lib/pagination.ts`, `src/components/Pagination.astro`, `src/pages/articles/[...page].astro`, `src/pages/rubriques/[slug]/[...page].astro`, `src/pages/sitemap.xml.ts`, CSS | Listings show all articles again | none today: no page ≥ 2 exists below 25 articles per listing. If pages ≥ 2 were already indexed, they would 404 after a revert — acceptable, but prefer a forward fix |
| Share images + `max-image-preview:large` | `src/lib/seo.ts`, `src/layouts/BaseLayout.astro`, article and product pages, `public/covers/*.jpg`, `tools/rasterize-covers.mjs` | Articles share the brand image again; robots meta removed | none |
| Security and image cache headers | `vercel.json` | Previous headers | Browsers may keep cached images up to 1 day after a revert — harmless (same files) |
| Deterministic order | `src/lib/articles.ts` | Same-day order may flip between builds | none |
| Tests and docs | `tests/delivery.spec.ts`, `tests/seo.spec.ts`, `docs/architecture/*` | — | none |

## 4. When to roll back

Roll back first, investigate second, if after a deployment: any key page returns non-200; the sitemap or robots.txt is wrong; canonical or `noindex` tags changed unexpectedly; LR links lose `ref=cros`; layout visibly broken on mobile. Otherwise prefer a forward fix.

## 5. Verification after rollback

Run the post-deploy checks in VERCEL_DEPLOYMENT.md §3 against the restored deployment and confirm `x-vercel-cache` returns to `HIT` after the first requests.
