# Translation workflow

*How an article goes from French to a published translation. Architecture: docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md. Italian conventions: IT_STYLE_GUIDE.md.*

## 1. Status today (2026-10-22)

`node tools/i18n-status.mjs`:

- **Italian:** 0 published, **7 drafts** (the whole aloe vera pole), 9 not started.
- **Other locales:** nothing yet; they also need their interface text first (§6).

| French source | Italian draft | Localization beyond translation |
| --- | --- | --- |
| aloe-vera-bienfaits-peau | `it/aloe-vera-pelle-benefici` | link to the Italian gel guide |
| choisir-gel-aloe-vera | `it/come-scegliere-gel-aloe-vera` | farmacia/erboristeria context, PAO symbol |
| aloe-vera-a-boire-comment-choisir | `it/aloe-vera-da-bere-come-sceglierla` | **Italian botanicals rules** (ministerial *effetti fisiologici* for aloe gel); *succo* vs *succus*; Italian-language label; Italian EUR-Lex sources + Ministry source |
| jus-aloe-vera-science | `it/succo-di-aloe-vera-cosa-dice-la-scienza` | "detox" section explains the Italian label wording *funzioni depurative dell'organismo* |
| routine-peau-apres-soleil | `it/pelle-sensibile-dopo-il-sole` | sea/pool context; link to the untranslated hydration article replaced by a short tip |
| gel-aloe-vera-maison | `it/gel-di-aloe-vera-fatto-in-casa` | IARC instead of CIRC; links to Italian articles |
| cultiver-aloe-vera-en-pot | `it/coltivare-aloe-vera-in-vaso` | frost-free coasts and islands |

Drafts are never built into the site. **Review notes for the reviewer** are written as `#` comments at the top of each file.

## 2. Roles

- **Translator**: adapts the text (may be Claude Code, a professional or the editorial team).
- **Reviewer**: fluent in the target language and able to check health and regulatory statements for that country. Their name goes in `translationReviewer` and is shown on the page as the reviewer (*Revisione:*). **Philippe Cros reviews French content; Italian content needs an Italian-speaking reviewer.**

## 3. Steps

1. **Research intent (before translating).** List the questions Italian readers type for this topic.
   - Sources: Google autocomplete and "Altre domande" on google.it, Google Trends (Italia), Italian competitors' headings, Search Console once Italian pages exist.
   - Write the hypotheses down; **never invent search volumes**.
2. **Start the draft.**
   ```sh
   node tools/new-translation.mjs it <french-id> <slug-italiano>
   ```
   This creates `src/content/articles/it/<slug>.md` with `status: draft`, `translationOf` and `sourceHash` (the French version you start from). Product references are dropped (product pages are French-only).
3. **Adapt.** Translate title, description, `coverAlt` and body following IT_STYLE_GUIDE.md. Check every regulatory sentence against the Italian context. Internal links point to Italian articles only.
4. **Check locally.**
   ```sh
   npx playwright test tests/i18n.spec.ts --project=desktop   # links, typography, stamp
   ```
5. **Review** with the checklist (§4). To see the page rendered, set `status: published` and `translationReviewer: "ANTEPRIMA"` locally, then run `npm run dev` and open `/it/…`. **Do not commit that state.**
6. **Publish.**
   - Set `status: published` and `translationReviewer: "<Name Surname>"`. The schema refuses publication without both and without `sourceHash`.
   - Run `npm run build && npx playwright test`.
   - Commit, and push with the owner's go-ahead (a push deploys to production).
   - Translations that link to each other should be published together; the link-integrity test fails otherwise.
7. **Verify in production.**
   - `/it/…` returns 200.
   - The French page shows *Également disponible en : Italiano*.
   - `sitemap.xml` lists the Italian URL with `xhtml:link` alternates.
   - Search Console: inspect the Italian URL.
8. **Keep in sync.** When a French article changes, `node tools/i18n-status.mjs` marks its translations **stale**, and a published stale translation fails the tests. Update the translation, then:
   ```sh
   node tools/i18n-status.mjs --stamp it/<slug>
   ```
   If the French change does not affect the meaning (typo), re-stamp after checking.

## 4. Review checklist

- [ ] Meaning faithful to the French source; nothing added that the sources do not support.
- [ ] Health statements:
  - no disease prevention or cure;
  - cosmetic effects stay cosmetic;
  - limits and "see a doctor" sentences kept.
- [ ] Italy-specific regulation correct and current. For the two drinking articles: the aloe gel wording in the Allegato 1 of the DM 10 agosto 2018 (Ministero della Salute). Checked here in the 2014 version of the ministerial guidelines; **confirm against the current annex**.
- [ ] Sources open and are the Italian versions where they exist.
- [ ] Register *tu*, Italian typography, terminology table respected.
- [ ] Title ≤ ~60 characters and description 50–160 characters, both phrased as Italians search; slug final (changing it after publication needs a redirect).
- [ ] `coverAlt` describes the image in Italian.
- [ ] Internal links resolve to Italian articles published in the same batch.

## 5. Open decisions (owner)

- **Who reviews Italian content** (D8 in INTERNATIONAL_SEO_ARCHITECTURE.md). The same reviewer should also review the Italian interface text (`src/i18n/ui.ts`) and category text.
- **Distributor window in Italian** with an Italian WhatsApp message to Philippe (D7).
- **Product pages for Italy** (D6): Italian LR shop links with `ref=cros` and Italian mandatory mentions. Until then Italian articles carry no product links (enforced by the schema).

## 6. Adding another locale

1. Add its interface text to `src/i18n/ui.ts` (the build refuses to publish a locale without it) and its category text to `CATEGORY_I18N`.
2. Write a style guide like IT_STYLE_GUIDE.md.
3. Follow the steps above. Routing, hreflang and the sitemap need no change.
