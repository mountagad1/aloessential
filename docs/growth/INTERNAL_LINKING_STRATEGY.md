# Internal linking strategy

## Tool

`npm run build && npm run seo:audit` (or `node tools/seo-audit.mjs <dist> [--json]`) reads the built HTML and reports, per locale:
- page counts by type;
- inbound links of each page, split between:
  - **body** links: links inside `.prose`;
  - **card** links: related articles and product cards;
  - **all** links: including navigation, breadcrumbs and the language switcher;
- editorial orphans;
- broken links;
- body links that leave the page's language without `hreflang`.

The tool is deterministic and needs no network.

## Baseline (2026-10-26, production build)

- **Pages:** 180 indexable:

  | Page type | Count |
  | --- | --- |
  | Articles | 112 |
  | Categories | 28 |
  | Products | 20 |
  | Locale homes | 7 |
  | Product listings | 6 |
  | Other pages | 7 |
- **Clean so far:** 0 broken internal links, and 0 body links leaving the page's language without `hreflang`.
- **Articles with no inbound body link:** 52 of 112.

  | Locale | Articles without inbound body link |
  | --- | --- |
  | French | 7 |
  | English | 7 |
  | Spanish | 7 |
  | German | 7 |
  | Italian | 7 |
  | Portuguese | 9 |
  | Polish | 8 |
- **Body links per article, on average:**

  | Locale | Average |
  | --- | --- |
  | French | 1.81 |
  | Spanish | 1.44 |
  | German | 1.44 |
  | Italian | 1.44 |
  | English | 1.25 |
  | Polish | 1.19 |
  | Portuguese | 0.69 |
- **Editorial orphans** (no body or card link from another page): `/aloe-vera/` (the guide), `/equipe/`, `/mentions-legales/`. The last two are normal; **the guide is not**.

## Rules

1. **Reader first:** a link answers the reader's next question at the point where it arises, not in a block of keywords.
2. **Same language:** body links stay in the page's language. Links to French-only pages (team, legal, transparency) carry `hreflang="fr"` and the "(in French)" label (already tested).
3. **Anchor text:** descriptive and varied, matching the target's subject. No identical exact-match anchors repeated across pages.
4. **Order of work:** pillars and tools first. Every Engineering-as-Marketing asset gets links from the articles on its subject, and links back to them.
5. **Translations:** a link added in French is added to each translation, with the target in that language. The French change makes translations stale until they are updated and re-stamped (tested).
6. **Validation:** after each linking change, run `npm run seo:audit` (0 broken links, orphans not increased) and `npm test`.

## AI assistance (optional, later)

Candidate links may be suggested by similarity between pages (`AI_ML_GROWTH_WORKFLOWS.md`). Every suggestion goes through the deterministic checks above and an editor's choice: nothing is inserted automatically.
