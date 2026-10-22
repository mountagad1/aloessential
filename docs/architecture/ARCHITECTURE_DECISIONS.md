# Architecture decision records

*Format: problem · evidence · decision · alternatives · cost and complexity · migration · rollback. Status: Accepted (in force), Proposed (needs the owner), Implemented (in the working tree, pending deploy).*

## ADR-001 — Stay fully static on Astro (Accepted)

- **Problem**: serve 1 M visits/month reliably and cheaply.
- **Evidence**: 100 % of responses are static CDN hits; 0 function invocations, 0 database calls [measured, SCALABILITY_AUDIT.md].
- **Decision**: keep `output: "static"`; every public page, every locale, prerendered.
- **Alternatives**: SSR/ISR (adds functions, cold starts and cost for content that changes a few times a week); Next.js migration (rewrite with no measured benefit).
- **Cost/complexity**: lowest possible; build time grows linearly (≈ 1 min at 5,000 articles, measured).
- **Rollback**: n/a (status quo).

## ADR-002 — No database, CMS server, Redis or queue (Accepted)

- **Problem**: content growth and translations.
- **Evidence**: content is Markdown in Git, edited by a small team; no runtime query exists to accelerate.
- **Decision**: content stays in the repository. Revisit only if non-technical editors need a UI, and then prefer a Git-based or headless CMS that outputs at build time (no runtime dependency).
- **Rollback**: n/a.

## ADR-003 — Paginate listings at 24 items (Implemented)

- **Problem**: listing pages embedded every article.
- **Evidence**: 5.3 MB `/articles/` at 5,000 articles; 41 KB after the change [measured].
- **Decision**: `src/lib/pagination.ts`; page 1 at the listing URL, page n at `<listing>/n/`; every page indexable, self-canonical, in the sitemap; plain previous/next links.
- **Alternatives**: "load more" with JavaScript (hides content from crawlers, adds JS); infinite scroll (same); per-year archives (uneven page sizes).
- **Cost**: one helper, one component; no change at today's catalogue size (all listings fit on page 1).
- **Rollback**: revert the commit; pages ≥ 2 disappear (none exist today).

## ADR-004 — Pre-generated images, no runtime image optimisation (Accepted)

- **Problem**: responsive, fast images and large share images.
- **Evidence**: covers are SVG (≤ 6 KB); one photo with three WebP variants; share twins 17–50 KB [measured].
- **Decision**: generate variants with repository tools and commit them; JPEG 1200 × 800 twins of SVG covers for `og:image` and Article `image`.
- **Alternatives**: Vercel Image Optimization (per-transformation cost, runtime dependency, unnecessary for SVG); build-time `astro:assets` (would pull `sharp` into the build path, currently flagged by `npm audit`).
- **Rollback**: revert; share images fall back to the brand image.

## ADR-005 — Baseline security headers now, strict script CSP later (Implemented)

- **Problem**: missing security headers (SCALABILITY_AUDIT.md F6).
- **Decision**: `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Frame-Options: DENY`, CSP limited to `frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'`.
- **Why not a full CSP**: Astro inlines small module scripts and the design uses inline `style` custom properties; a `script-src`/`style-src` CSP would need per-build hashes and could break the menu, dialog and motion. Benefit is small on a site with no user-generated content and no third-party script.
- **Risk**: `form-action 'self'` will block a future newsletter form that posts *natively* to a third-party domain; the current form uses `fetch` (governed by `connect-src`, which is not restricted). Update the CSP when a provider is chosen.
- **Rollback**: remove the `headers` block from `vercel.json` and redeploy.

## ADR-006 — Cookieless analytics and real-user monitoring (Proposed)

- **Problem**: no traffic or field performance data (F3); capacity cannot be validated.
- **Options**: (a) Vercel Web Analytics + Speed Insights — first-party, cookieless, no consent banner expected, billed per event depending on plan; (b) a self-hosted or EU-hosted cookieless tool (Plausible, Matomo without cookies); (c) Google Analytics — needs a consent banner (CNIL) and adds a third-party script.
- **Recommendation**: (a) for simplicity on Vercel, or (b) if the owner prefers EU hosting. Either way, add Google Search Console (free, no script).
- **Cost**: verify current Vercel pricing and plan inclusion before enabling; adds one small script per page.
- **Needs**: owner approval (privacy policy update in `src/pages/confidentialite.astro`).

## ADR-007 — Gate production deploys on CI (Proposed)

- **Problem**: every push to the working branch deploys to production immediately, in parallel with CI; a failing test does not stop a deploy.
- **Options**: (a) protect a `main` branch, set it as Vercel's production branch, merge only green pull requests; (b) keep the branch but enable Vercel's deployment checks so promotion waits for GitHub checks.
- **Recommendation**: (a): it also gives preview URLs per pull request for review.
- **Needs**: owner action in GitHub and Vercel settings (production branch change); no code change.

## ADR-008 — Subdirectory locales with French unprefixed (Proposed)

See INTERNATIONAL_SEO_ARCHITECTURE.md §2–3. Keeps every existing URL; hreflang and sitemap alternates generated from one function; translations published one at a time.

## ADR-009 — Deterministic listing order (Implemented)

- **Problem**: same-day articles swapped order between builds (F8).
- **Decision**: sort by date, then by id (descending).
- **Rollback**: revert one line.
