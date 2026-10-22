# Caching strategy

*2026-10-22. Applies to the static Astro build served by Vercel. There is no personalised, authenticated or private response anywhere on the site [config: no cookies set, no auth, no server routes], so shared caching is safe for every public response.*

## 1. Layers

| Layer | What it caches | Who controls it | Invalidation |
| --- | --- | --- | --- |
| Vercel CDN | Every static file of the current production deployment | Vercel; headers in `vercel.json` | Automatically on each production deployment (new deployment = new cache); manual purge with `vercel cache purge --type cdn` |
| Browser HTTP cache | Whatever `Cache-Control` allows | `vercel.json` headers; Vercel defaults | Expiry, or a new file name |
| Framework caches | None at runtime (no ISR, no data cache) | — | — |

Do not read a fast response as a cache hit: check `x-vercel-cache` (`HIT`, `MISS`, `STALE`, `PRERENDER`) for the CDN and the browser's DevTools "size" column (`(disk cache)`/`(memory cache)`) for the browser.

## 2. Policy matrix

| Resource | Path pattern | `Cache-Control` sent to browsers | CDN behaviour | Why | Status |
| --- | --- | --- | --- | --- | --- |
| HTML pages (editorial, listings, legal) | `/`, `/**/` | `public, max-age=0, must-revalidate` (Vercel default) | Cached until the next deployment | Content must update as soon as a deployment goes live; revalidation is a cheap 304 | unchanged [measured] |
| Paginated listings | `/articles/n/`, `/rubriques/<slug>/n/` | same as HTML | same | Same freshness needs | new pages, same policy |
| Hashed CSS/JS/fonts | `/_astro/*` | `public, max-age=31536000, immutable` (Vercel default for Astro's hashed assets) | Cached | File name changes when content changes | unchanged [measured] |
| Unhashed images | `/media/*`, `/covers/*`, `/brand/*` | **`public, max-age=86400, stale-while-revalidate=604800`** | Cached until next deployment | Avoids one revalidation request per image per page view; names are stable but rarely change | **changed in `vercel.json`, not yet deployed** |
| Sitemap, robots.txt | `/sitemap.xml`, `/robots.txt` | default (revalidate) | Cached until next deployment | Crawlers must see changes on the next fetch | unchanged |
| 404 page | any unknown path | default | Cached (`HIT` observed) | Static | unchanged |
| Redirects (www → apex, missing slash) | — | 308, Vercel default | Edge | — | unchanged |
| Dynamic APIs, personalised content | — | **none exist** | — | If one is ever added: `private, no-store` unless it is genuinely public, and never behind a public HTML route | rule |

### Stale-content rule for unhashed images

A browser may show the previous version of a changed image for up to 1 day (then revalidates in the background for up to 7 days). Therefore:

- **Never overwrite an image with different content under the same name.** Give a changed image a new name (e.g. `aloe-harvest-v2-1024.webp`) and update the references. Generators (`tools/generate-covers.mjs`, `tools/rasterize-covers.mjs`, `tools/prepare-hero-media.py`) overwrite in place: when their output changes visibly, rename or accept a ≤ 1-day delay.
- Social networks cache share images on their side regardless of our headers; use their debuggers to refresh.

## 3. Cache keys

Vercel keys static files by deployment and path; query strings do not create new files for static assets. Nothing on the site varies by cookie, header, country or device, so no `Vary` beyond encoding is needed. Do not add personalisation (geo-based content, A/B tests) to public HTML without revisiting this document: it would split or break the cache.

## 4. Failure behaviour

A failed build never replaces the live deployment: the previous deployment keeps serving from cache. A bad deployment is reverted with an instant rollback (ROLLBACK_PLAN.md); the CDN then serves the previous deployment's files.

## 5. Validation procedure

Automated (no network): `tests/delivery.spec.ts` › "vercel.json delivery rules" checks that unhashed image paths get the 1-day policy and that HTML, sitemap, robots and `/_astro/` get no override.

After the next production deployment (manual, needs a deploy):

```sh
# 1. Browser policy on an unhashed image
curl -sI https://aloessential.com/media/aloe-harvest-1024.webp | grep -iE 'cache-control|x-vercel-cache'
#    expect: cache-control: public, max-age=86400, stale-while-revalidate=604800

# 2. HTML still revalidates and is a CDN hit on the second request
curl -sI https://aloessential.com/ | grep -iE 'cache-control|x-vercel-cache'
curl -sI https://aloessential.com/ | grep -iE 'x-vercel-cache'      # expect HIT

# 3. Hashed assets still immutable
curl -sI "https://aloessential.com$(curl -s https://aloessential.com/ | grep -o '/_astro/[^"]*\.css' | head -1)" | grep -i cache-control

# 4. Security headers present
curl -sI https://aloessential.com/ | grep -iE 'x-content-type-options|referrer-policy|content-security-policy|x-frame-options|permissions-policy'
```

Repeat-view check in a browser: open `/`, navigate to an article, go back; image rows should show `(memory cache)`/`(disk cache)` instead of `304`.
