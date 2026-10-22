# Vercel deployment runbook

*2026-10-22. Facts marked [config] were read from the Vercel API for project `aloessential` (`prj_HBNetkIIPWoaHoUjqZerxM2vTTKN`, team `mountagas-projects`).*

## 1. Current setup

| Item | Value |
| --- | --- |
| Framework preset | Astro, static output, no adapter [config] |
| Node version on Vercel | 24.x [config] (CI uses 22; `engines` ≥ 20.3) |
| Production domains | `aloessential.com` (canonical), `www.aloessential.com` (308 → apex via `vercel.json`) [config, measured] |
| Production trigger | **every push to `claude/sleepy-wozniak-wbf030`** deploys to production [observed in this project's history] |
| Previews | protected by Vercel SSO (`all_except_custom_domains`) [config] |
| Configuration in repo | `vercel.json`: `trailingSlash`, www redirect, security headers, image cache headers |
| Environment variables | none required by the build |
| Plan | **unknown** — confirm in the dashboard (CAPACITY_MODEL.md §5) |

## 2. Deploying a change

1. Run locally: `npm ci && npm run build && npx playwright test` (all green).
2. If content volume changed a lot: `node tools/scale-check.mjs 5000`.
3. If covers changed: `node tools/rasterize-covers.mjs`, commit the JPEGs.
4. Commit and push **only with the owner's go-ahead**: a push to the production branch is a production deployment.
5. Watch the deployment reach `READY` (Vercel dashboard or `vercel ls`).
6. Run the post-deploy checks below.

Recommended change (ADR-007): make `main` the production branch, protect it, merge pull requests only after CI is green, and use preview deployments for review.

## 3. Post-deploy checks for this change set

```sh
# Pages
for p in / /articles/ /rubriques/sante/ /articles/jus-aloe-vera-science/ /produits/set-vitalite/ /sitemap.xml /robots.txt; do
  printf '%s ' "$p"; curl -s -o /dev/null -w '%{http_code}\n' "https://aloessential.com$p"; done      # all 200
curl -s -o /dev/null -w '%{http_code}\n' https://aloessential.com/articles/2/                        # 404 until > 24 articles

# Share image and robots directive on an article
curl -s https://aloessential.com/articles/jus-aloe-vera-science/ | grep -oE 'og:image" content="[^"]+|max-image-preview:large'
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://aloessential.com/covers/jus-aloe.jpg  # 200 image/jpeg

# Headers: see CACHING_STRATEGY.md §5
```

Then: Rich Results Test on one article (Article + BreadcrumbList, image resolves); a social debugger on one article; Search Console → Sitemaps → resubmit `https://aloessential.com/sitemap.xml`.

## 4. Things not to change without explicit authorisation

DNS, domains, production branch, environment variables, deployment protection, spend settings, Web Analytics/Speed Insights enablement (billing), firewall rules.
