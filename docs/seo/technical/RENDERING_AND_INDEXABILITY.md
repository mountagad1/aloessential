# Rendering and indexability

- **Rendering model:** Astro static site generation. Each URL is an HTML file produced at build time (`output: "static"`). There is no SSR, ISR, edge function or client-side routing, and no content is rendered by JavaScript. What Googlebot fetches is what a reader sees.
- **Scripts:** small inline modules enhance pages that are already complete:
  - language switcher, reading progress, motion;
  - newsletter (French only);
  - the three tools: calculation, filtering and sorting.

  With JavaScript off, every tool page still shows its full table, method and sources. Tests run without JavaScript to prove it (`tests/watering.spec.ts`, `tests/water.spec.ts`, `tests/fibre.spec.ts`).
- **Indexability:** decided at build time (`indexation/URL_ELIGIBILITY_POLICY.md`). Drafts are never built.
- **Cache:** the Vercel CDN serves the files. A new deploy replaces them atomically, so there is no stale-while-revalidate content window to reason about.
- **What could break it:**
  - client-rendered content added to a page;
  - a `noindex` left in a template;
  - a page built without being added to the sitemap.

  The SEO and indexation tests catch the last two. The first is caught by the no-JavaScript tests on the tools only.
