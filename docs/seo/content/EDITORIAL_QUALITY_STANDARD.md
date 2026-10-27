# Editorial quality standard

Applies to every new page and every refresh, in every language. It complements:
- `docs/growth/CONTENT_GROWTH_SYSTEM.md`: the editorial process;
- `docs/growth/ENGINEERING_AS_MARKETING_PLAYBOOK.md` §4: quality gate for tools;
- `docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md`: product pages;
- `docs/i18n/*_STYLE_GUIDE.md`: language style.

## Quality gate

A page ships only when every "blocking" line is satisfied. A reviewer, not the writer, answers each question.

| # | Question | Blocking |
| --- | --- | --- |
| 1 | Does the page answer the question its target query asks, near the top? | yes |
| 2 | Does it add something the current top results do not: a tool, sourced figures, a clearer method, local data? (Check the live SERP, `research/COMPETITOR_GAP_ANALYSIS.md`) | yes |
| 3 | Is every factual or health statement backed by a primary source listed on the page (regulation, agency, peer-reviewed study, institution)? | yes |
| 4 | Are health and nutrition statements within EU rules: no unauthorised health claim, no personal medical advice, a "when to see a doctor" section where relevant? | yes |
| 5 | Does it say clearly what is the team's own estimate (portions, watering rhythm) as opposed to sourced data? | yes |
| 6 | Is it distinct from every other Aloessential page? Check the primary URL in `research/CONTENT_CANNIBALIZATION_MAP.md` | yes |
| 7 | Is the author and reviewer information true? Translations name their reviewer (`translationReviewer`) | yes |
| 8 | Are images original, licensed or produced for the site, with descriptive alt text? | yes |
| 9 | Is it readable: short paragraphs, headings that state the point, tables where comparison helps? | no |
| 10 | Could a teacher, journalist or health professional reasonably cite it? | no |
| 11 | Does it link to and from at least one related page in the same language (`npm run seo:audit`)? | yes |

## Never

- Pad a page to reach a word count.
- Copy or lightly rephrase competitor text.
- Invent studies, figures, testimonials, credentials, tests or reviews.
- Treat a language model's answer as a source.
- Publish a page that fails a blocking line. Translations stay `status: draft` until reviewed.

## Dates

- `date` is the publication date.
- `updated` is set only for a meaningful change: new or corrected information, a new section, refreshed figures. It is not set for typos, links, images or translation re-stamps.
- `updated` drives the visible "updated on" line, `dateModified` and the sitemap `lastmod`.
