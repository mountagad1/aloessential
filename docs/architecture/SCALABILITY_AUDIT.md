# Scalability audit — Aloessential

*Audit of 2026-10-22, branch `claude/sleepy-wozniak-wbf030`, base commit `7bc1d50`.*
Scope: repository, build output, production response headers and Vercel project metadata.
Every statement is labelled **[measured]** (observed in this audit), **[config]** (read from the repository or the Vercel API), **[estimate]**, **[assumption]** or **[unknown]**.

## 1. System inventory

| Area | Finding | Evidence |
| --- | --- | --- |
| Framework | Astro 5.18.2, `output: "static"`, no adapter, no UI framework, no hydration | [config] `package.json`, `astro.config.mjs` |
| Runtime dependencies | 3: `astro`, `@fontsource/poppins`, `@fontsource-variable/inter` | [config] `package.json` |
| Rendering | **Every route is prerendered at build time.** No server endpoints, no middleware, no ISR, no server islands. `sitemap.xml` and `robots.txt` are static endpoints rendered at build. | [config] `src/pages/**`, `astro.config.mjs`; [measured] `dist/` holds only static files |
| Data sources | Markdown content collections (16 articles, 11 products of which some are drafts) loaded with `glob()`; TypeScript data files | [config] `src/content.config.ts`, `src/content/**`, `src/data/*.ts` |
| Database / CMS / queues | None | [config] |
| Runtime external calls | None. The newsletter form posts only if `data-endpoint` is set, and it is not; WhatsApp and LR links are plain links | [config] `src/components/Newsletter.astro`, `src/scripts/newsletter.ts` |
| Serverless functions | None in the build output | [config] |
| Routes | 36 HTML pages + `sitemap.xml` + `robots.txt` (before this audit's pagination; unchanged count at today's catalogue) | [measured] `npm run build` |
| Locale | French only: `<html lang="fr">`, `og:locale fr_FR`, `inLanguage fr-FR`; no locale prefix, no hreflang | [measured] built HTML |
| Canonical / URLs | `site: https://aloessential.com`, `trailingSlash: "always"`, self-canonical on every indexable page, www → apex 308 | [config] `astro.config.mjs`, `vercel.json`; [measured] production |
| JavaScript | 0 external JS files; 2.0–2.7 KB gzip of inline module scripts per page | [measured] `npm run size` |
| CSS | 1 file, 45.1 KB raw / 9.1 KB gzip, hashed, `immutable` | [measured] |
| Fonts | Self-hosted (Fontsource), 3 woff2 preloaded; 62–70 KB transferred on a cold first view | [measured] |
| Images | SVG covers (1.9–6.2 KB) shown in pages; WebP hero photo 640/1024/1600 w (46/91/158 KB); WebP brand assets; no runtime image transformation | [measured] `dist/media`, `dist/covers`, `dist/brand` |
| Hosting | Vercel project `aloessential` (framework preset Astro, Node 24.x), team "Mountaga's projects"; production deploys on every push to `claude/sleepy-wozniak-wbf030`; previews behind Vercel SSO protection | [config] Vercel API `get_project` |
| CI | GitHub Actions: `npm ci`, build, Playwright suite (Node 22) | [config] `.github/workflows/ci.yml` |
| Tests | Playwright, desktop + Pixel 7, against `dist-test` (fixtures included) | [config] `playwright.config.ts` |
| Analytics / RUM | **None.** Vercel Web Analytics is not enabled (API answer `web_analytics_not_enabled`); no Speed Insights; no third-party analytics | [measured] Vercel API |
| Error tracking | None needed at runtime (no server code); build failures surface in Vercel and CI | [config] |
| Existing docs reused | `docs/seo/*` (baseline, route inventory, risk register), `docs/aloessential/MOTION_DESIGN_SYSTEM.md` | — |

### Production delivery headers (sampled 2026-10-22) [measured]

| Resource | Status | `cache-control` | `x-vercel-cache` | Encoding |
| --- | --- | --- | --- | --- |
| `/` (HTML) | 200 | `public, max-age=0, must-revalidate` | HIT | br |
| `/articles/jus-aloe-vera-science/` | 200 | same | HIT | br |
| `/_astro/*.css` | 200 | `public, max-age=31536000, immutable` | HIT | br |
| `/media/aloe-harvest-1024.webp` | 200 | `public, max-age=0, must-revalidate` | HIT | none (already compressed) |
| `/sitemap.xml` | 200 | `public, max-age=0, must-revalidate` | HIT | br |
| `https://www.…/contact/` | 308 → apex | — | — | — |
| `/contact` | 308 → `/contact/` | — | — | — |
| `/nope/` | 404 (custom page) | — | HIT | br |

HSTS is present (`max-age=63072000`, no `includeSubDomains`). No `X-Content-Type-Options`, `Referrer-Policy`, framing protection or `Permissions-Policy` were sent.

## 2. What actually limits scale here

The site serves no dynamic request: every response is a file already cached on Vercel's CDN. Request throughput at 1 M visits/month is therefore not a compute or database problem. What does grow with traffic and content is:

1. **Plan terms and included usage** (bandwidth, edge requests) — a cost and compliance question, not a performance one. See CAPACITY_MODEL.md.
2. **Page weight × traffic** — bandwidth bill and mobile experience.
3. **Catalogue size** — build time, listing page size, sitemap size.
4. **Measurement** — nothing measures real traffic or real-user performance today, so no capacity claim can be validated against field data.

## 3. Bottleneck and risk register

Severity: S1 critical · S2 high · S3 medium · S4 low. Confidence: H/M/L.

| ID | Finding | Evidence | Impact | Sev. | Conf. | Effort | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **F1** | Listing pages (`/articles/`, `/rubriques/*`) rendered every article with no pagination | [measured] synthetic build: 5,000 articles → `/articles/` 5.3 MB HTML | Listing HTML grows linearly with the catalogue: slow pages, heavy crawl, poor CWV | S2 | H | S | **Fixed** (24 per page, `src/lib/pagination.ts`); largest page at 5,000 articles now 41 KB [measured] |
| **F2** | Vercel plan unknown; Hobby is restricted to non-commercial use and the site carries partner (affiliate) links | [config] team plan not exposed by the API; Vercel fair-use guidelines (see sources) | Possible terms violation / suspension regardless of traffic; Hobby's included Fast Data Transfer (100 GB per the guidelines) is below the 1 M-visit estimate | S1 | M | — | **Blocked on owner**: confirm plan in the dashboard |
| **F3** | No traffic or real-user measurement | [measured] Web Analytics disabled; no RUM | Cannot verify capacity, CWV, bot share or peak shape | S2 | H | S | Open — needs owner decision (ADR-006) |
| **F4** | Articles shared a generic brand image; covers are SVG, which Open Graph consumers and Discover do not use | [measured] `og:image` = `/brand/og-default.png` on every article; Article JSON-LD `image` = SVG | Weak social previews, no large raster image for Discover | S2 | H | S | **Fixed**: 1200×800 JPEG twin per cover, used for `og:image` and Article `image` |
| **F5** | No `max-image-preview:large` | [measured] no robots meta on indexable pages | Google may limit image preview size (Discover, results) | S3 | H | XS | **Fixed** on indexable pages |
| **F6** | Missing security headers | [measured] production headers | Clickjacking, MIME sniffing, referrer leakage | S3 | H | XS | **Fixed in `vercel.json`** (not deployed) |
| **F7** | Unhashed images (`/media`, `/covers`, `/brand`) served `max-age=0, must-revalidate` | [measured] | Every page view re-validates each image: extra edge requests and round trips on repeat views | S3 | H | XS | **Fixed in `vercel.json`** (1 day + 7 days stale-while-revalidate; not deployed) |
| **F8** | Same-day articles were ordered non-deterministically | [measured] two builds of identical content swapped `gel-aloe-vera-maison` / `cultiver-aloe-vera-en-pot` | HTML churn between deploys, unstable internal linking | S4 | H | XS | **Fixed** (tie-break by id) |
| **F9** | Astro 5.18.2 has published advisories (1 critical, 1 high via `sharp`, 1 low via `esbuild`); fix is Astro 7.4.1 (major upgrade) | [measured] `npm audit` | Affected features (`define:vars`, server islands, spread attribute names, dev server on Windows, `sharp` image decoding) are **not used** here [config: grep] → exploitability judged low | S3 | M | M | Open — controlled upgrade (backlog B4) |
| **F10** | Homepage hero picks the 1600 w WebP (158 KB) on a 412 px, DPR 2.6 phone | [measured] Pixel 7 request log | Largest single download on the homepage; LCP 1.75 s in the throttled lab profile | S4 | H | S | Open — add a 1200/1280 w variant (backlog B6) |
| **F11** | Sitemap is a single file | [measured] 5,451 URLs at 5,000 articles | Protocol limit is 50,000 URLs: reached only at ~45 k indexable pages (e.g. 6 locales × 7.5 k) | S4 | H | S | Open — switch to a sitemap index when > 40 k URLs (scale-check fails above 50 k) |
| **F12** | Build time grows with the catalogue | [measured] 36 pages ≈ 3–5 s; 5,000 articles 32–65 s on a 4-vCPU container | Fine for years at the current pace; becomes material only at tens of thousands of pages | S4 | M | — | Monitor with `tools/scale-check.mjs` |
| **F13** | Header wordmark (24 KB WebP, 433×80) loads on every first view | [measured] | Minor weight on every landing | S4 | H | S | Open — SVG or smaller encode (backlog B7) |
| **F14** | International SEO: only French exists; five target locales have no content, no routing, no translation model | [config] | Not a defect today; design needed before the first translation ships | — | H | L | Designed (INTERNATIONAL_SEO_ARCHITECTURE.md), not implemented |

No N+1 queries, connection pools, cold starts, timeouts or retry storms exist to audit: there is no database, no function and no runtime API call (see §1).

## 4. Security review (proportionate to a static site)

| Topic | State |
| --- | --- |
| Attack surface | Static files only; no forms posting to a server, no auth, no cookies set by the site [config] |
| Secrets | None in the repository or the build; no environment variables are read at build except `CONTENT_FIXTURES` (tests) [config] |
| Headers | Added: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, CSP limited to `frame-ancestors`/`base-uri`/`object-src`/`form-action`. A full `script-src` CSP is deferred: inline module scripts and inline `style` attributes would need hashes regenerated each build (ADR-005) |
| Dependencies | See F9 |
| Abuse / rate limiting | CDN-served static files; Vercel's platform DDoS mitigation applies. A WAF rule is only worth adding once real traffic shows abuse (needs F3) |
| Preview exposure | Previews protected by Vercel SSO (`all_except_custom_domains`) [config] |

## 5. Open questions

1. Which Vercel plan does the team use (Hobby or Pro)? (F2)
2. May we enable a privacy-friendly analytics and RUM tool (ADR-006)? Today the only "measurement" decided was sales tracking on the LR side.
3. Who will produce translations, and which locales first? (INTERNATIONAL_SEO_ARCHITECTURE.md §6)
4. Is Search Console verified, and has the sitemap been submitted? (already open in `docs/seo/ALOESSENTIAL_RISK_REGISTER.md`)

## 6. Validation method

- `npm run build && npx playwright test` — full suite (results in README.md §Tests).
- `node tools/scale-check.mjs 5000` — synthetic catalogue build; fails if any page exceeds 150 KB or the sitemap exceeds 50,000 URLs.
- Production headers: `curl -sI https://aloessential.com/media/aloe-harvest-1024.webp` after the next deployment (VERCEL_DEPLOYMENT.md §3).

## Sources

- Vercel fair use guidelines (commercial use on Hobby, included usage): https://vercel.com/docs/limits/fair-use-policy
- Vercel limits overview: https://vercel.com/docs/limits
