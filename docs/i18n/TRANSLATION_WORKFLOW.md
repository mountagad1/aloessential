# Translation workflow

*How an article goes from French to a published translation. Architecture: docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md. Conventions per language: IT_STYLE_GUIDE.md (Italian), EN_STYLE_GUIDE.md (English, UK), DE_STYLE_GUIDE.md (German, Germany), ES_STYLE_GUIDE.md (Spanish, Spain), PT_STYLE_GUIDE.md (Portuguese, Portugal), PL_STYLE_GUIDE.md (Polish).*

## 1. Status today (2026-10-24)

`node tools/i18n-status.mjs`:

- **Italian:** **16 published** (2026-10-24, reviewer Philippe Cros), 0 drafts.
- **Other locales:** 7 drafts each (the aloe vera pole), see below.

| French source | Italian article (published) | Localization beyond translation |
| --- | --- | --- |
| aloe-vera-bienfaits-peau | `it/aloe-vera-pelle-benefici` | link to the Italian gel guide |
| choisir-gel-aloe-vera | `it/come-scegliere-gel-aloe-vera` | farmacia/erboristeria context, PAO symbol |
| aloe-vera-a-boire-comment-choisir | `it/aloe-vera-da-bere-come-sceglierla` | **Italian botanicals rules** (ministerial *effetti fisiologici* for aloe gel); *succo* vs *succus*; Italian-language label; Italian EUR-Lex sources + Ministry source |
| jus-aloe-vera-science | `it/succo-di-aloe-vera-cosa-dice-la-scienza` | "detox" section explains the Italian label wording *funzioni depurative dell'organismo* |
| routine-peau-apres-soleil | `it/pelle-sensibile-dopo-il-sole` | sea/pool context; link to the untranslated hydration article replaced by a short tip |
| gel-aloe-vera-maison | `it/gel-di-aloe-vera-fatto-in-casa` | IARC instead of CIRC; links to Italian articles |
| cultiver-aloe-vera-en-pot | `it/coltivare-aloe-vera-in-vaso` | frost-free coasts and islands |
| vitamines-fatigue-reglementation | `it/vitamine-stanchezza-cosa-dice-la-normativa` | **Italian botanicals rules**: ginseng, rodiola, guaranà may carry the ministerial effect «tonico (stanchezza fisica, mentale)», not an EFSA claim; VNR; Italian EUR-Lex + Ministry sources |
| digestion-foie-detox-complements | `it/digestione-fegato-detox-integratori` | ministerial effects for carciofo and cardo mariano (funzione epatica, funzioni depurative); **«probiotico» allowed in Italy** under the Ministry guidelines (≥1 billion live cells, quantity per strain); pasta e fagioli |
| articulations-mobilite-quotidien | `it/articolazioni-mobilita-gesti-quotidiani` | boswellia and artiglio del diavolo: ministerial «funzionalità articolare» |
| hydratation-aliments-riches-en-eau | `it/idratazione-alimenti-ricchi-di-acqua` | minestrone |
| petit-dejeuner-equilibre | `it/colazione-equilibrata-idee-semplici` | ricotta, olio extravergine, cornetto |
| routine-matin-energie | `it/routine-del-mattino-energia` | link to the Italian breakfast article |
| soin-anti-age-quels-actifs | `it/crema-anti-age-quali-attivi` | products dropped (French-only); Italian EUR-Lex source |
| soins-cheveux-naturel | `it/cura-dei-capelli-al-naturale` | — |
| sommeil-pilier-bien-etre | `it/sonno-pilastro-del-benessere` | — |

**English** (UK readers): **16 published** (2026-10-24, reviewer Philippe Cros). The English "nutrition" category is labelled *Food and nutrition* so its page title differs from the French *Nutrition* (titles must be unique site-wide).

| French source | English article (published) | Localization beyond translation |
| --- | --- | --- |
| aloe-vera-bienfaits-peau | `en/aloe-vera-for-skin` | pharmacist / GP / NHS 111 |
| choisir-gel-aloe-vera | `en/how-to-choose-aloe-vera-gel` | chemist and health food shop context |
| aloe-vera-a-boire-comment-choisir | `en/aloe-vera-drinks-how-to-choose` | **GB rules**: EU 2021/468 not in GB law (legislation.gov.uk), Northern Ireland follows EU; GB NHC register; ASA on "on hold" botanical claims |
| jus-aloe-vera-science | `en/aloe-vera-juice-what-science-says` | GB/EU difference on aloin rules |
| routine-peau-apres-soleil | `en/after-sun-care-for-sensitive-skin` | NHS urgent signs and NHS 111; NHS source |
| gel-aloe-vera-maison | `en/using-aloe-vera-gel-from-your-plant` | British spelling, links to English articles |
| cultiver-aloe-vera-en-pot | `en/how-to-grow-aloe-vera-in-a-pot` | overwinters indoors in the UK; RHS |
| vitamines-fatigue-reglementation | `en/vitamins-and-tiredness-what-the-rules-say` | GB NHC register and assimilated 1924/2006, 432/2012, 1169/2011 (legislation.gov.uk); plant claims "on hold"; %NRV; GP |
| digestion-foie-detox-complements | `en/digestion-liver-detox-supplements` | **ASA treats "probiotic" as an implied health claim** (CAP advice, 2023 ruling); 30 g fibre per UK guidelines (NHS source) |
| articulations-mobilite-quotidien | `en/joint-health-and-mobility-daily-habits` | GB register version of 432/2012; GP |
| hydratation-aliments-riches-en-eau | `en/hydration-water-rich-foods` | courgette |
| petit-dejeuner-equilibre | `en/healthy-breakfast-ideas` | overnight oats, cottage cheese |
| routine-matin-energie | `en/morning-routine-for-more-energy` | link to the English breakfast article |
| soin-anti-age-quels-actifs | `en/anti-ageing-skincare-which-actives` | products dropped; **GB retinol limits not checked** (EU 2024/996 cited as EU), reviewer to confirm with OPSS |
| soins-cheveux-naturel | `en/natural-hair-care` | GP |
| sommeil-pilier-bien-etre | `en/sleep-a-pillar-of-wellbeing` | GP |

**German** (readers in Germany): **16 published** (2026-10-24, reviewer Philippe Cros). EU rules apply as in French; the adaptation covers register (*Sie*), German typography, Apotheke/Drogerie/Reformhaus, Hausarztpraxis, 116117 and 112, overwintering indoors.

| French source | German article (published) |
| --- | --- |
| aloe-vera-bienfaits-peau | `de/aloe-vera-fuer-die-haut` |
| choisir-gel-aloe-vera | `de/aloe-vera-gel-kaufen-worauf-achten` |
| aloe-vera-a-boire-comment-choisir | `de/aloe-vera-trinken-worauf-achten` |
| jus-aloe-vera-science | `de/aloe-vera-saft-was-sagt-die-wissenschaft` |
| routine-peau-apres-soleil | `de/haut-nach-der-sonne-pflegen` |
| gel-aloe-vera-maison | `de/aloe-vera-gel-aus-der-eigenen-pflanze` |
| cultiver-aloe-vera-en-pot | `de/aloe-vera-im-topf-pflegen` |
| vitamines-fatigue-reglementation | `de/vitamine-und-muedigkeit-was-gilt` |
| digestion-foie-detox-complements | `de/verdauung-leber-detox-nahrungsergaenzung` |
| articulations-mobilite-quotidien | `de/gelenke-beweglichkeit-im-alltag` |
| hydratation-aliments-riches-en-eau | `de/wasserreiche-lebensmittel` |
| petit-dejeuner-equilibre | `de/ausgewogenes-fruehstueck-ideen` |
| routine-matin-energie | `de/morgenroutine-fuer-mehr-energie` |
| soin-anti-age-quels-actifs | `de/anti-aging-pflege-welche-wirkstoffe` (products dropped) |
| soins-cheveux-naturel | `de/haarpflege-natuerlich` |
| sommeil-pilier-bien-etre | `de/schlaf-saeule-des-wohlbefindens` |

**Spanish** (readers in Spain): 0 published, **16 drafts** (every French article), 0 not started. EU rules apply as in French; adaptation: *tú*, Spanish typography (« », ¿?, 98 %), farmacia/parafarmacia/herbolario, centro de salud and 112, frost-free coasts and Canary Islands.

| French source | Spanish draft |
| --- | --- |
| aloe-vera-bienfaits-peau | `es/aloe-vera-para-la-piel` |
| choisir-gel-aloe-vera | `es/como-elegir-gel-de-aloe-vera` |
| aloe-vera-a-boire-comment-choisir | `es/aloe-vera-para-beber-como-elegirlo` |
| jus-aloe-vera-science | `es/zumo-de-aloe-vera-que-dice-la-ciencia` |
| routine-peau-apres-soleil | `es/piel-sensible-despues-del-sol` |
| gel-aloe-vera-maison | `es/gel-de-aloe-vera-de-tu-planta` |
| cultiver-aloe-vera-en-pot | `es/cultivar-aloe-vera-en-maceta` |
| vitamines-fatigue-reglementation | `es/vitaminas-y-cansancio-que-dice-la-normativa` |
| digestion-foie-detox-complements | `es/digestion-higado-detox-complementos` |
| articulations-mobilite-quotidien | `es/articulaciones-y-movilidad-dia-a-dia` |
| hydratation-aliments-riches-en-eau | `es/alimentos-ricos-en-agua` |
| petit-dejeuner-equilibre | `es/desayuno-equilibrado-ideas-sencillas` |
| routine-matin-energie | `es/rutina-de-manana-para-mas-energia` |
| soin-anti-age-quels-actifs | `es/crema-antiedad-que-activos-elegir` (products dropped) |
| soins-cheveux-naturel | `es/cuidado-natural-del-cabello` |
| sommeil-pilier-bien-etre | `es/el-sueno-pilar-del-bienestar` |

**Portuguese** (Portugal, `pt-pt`): 0 published, **16 drafts** (every French article). **Polish** (`pl`): 0 published, **16 drafts** (every French article). EU rules apply as in French. Portuguese: *tu*, European Portuguese, farmácia/ervanária, SNS 24 (808 24 24 24) and 112, frost-free coast and islands; footer links to LR Portugal's site (the PT shop requires login). Polish: *ty*, „…” quotes, suplement diety, apteka/drogeria/sklep zielarski, lekarz rodzinny, nocna i świąteczna opieka, NFZ 800 190 590, 112/999.

| French source | Portuguese draft | Polish draft |
| --- | --- | --- |
| aloe-vera-bienfaits-peau | `pt-pt/aloe-vera-para-a-pele` | `pl/aloes-na-skore` |
| choisir-gel-aloe-vera | `pt-pt/como-escolher-gel-de-aloe-vera` | `pl/jak-wybrac-zel-aloesowy` |
| aloe-vera-a-boire-comment-choisir | `pt-pt/aloe-vera-para-beber-como-escolher` | `pl/aloes-do-picia-jak-wybrac` |
| jus-aloe-vera-science | `pt-pt/sumo-de-aloe-vera-o-que-diz-a-ciencia` | `pl/sok-z-aloesu-co-mowi-nauka` |
| routine-peau-apres-soleil | `pt-pt/pele-sensivel-depois-do-sol` | `pl/skora-wrazliwa-po-sloncu` |
| gel-aloe-vera-maison | `pt-pt/gel-de-aloe-vera-da-tua-planta` | `pl/zel-z-wlasnego-aloesu` |
| cultiver-aloe-vera-en-pot | `pt-pt/cultivar-aloe-vera-em-vaso` | `pl/uprawa-aloesu-w-doniczce` |
| vitamines-fatigue-reglementation | `pt-pt/vitaminas-e-cansaco-o-que-diz-a-lei` | `pl/witaminy-i-zmeczenie-co-mowia-przepisy` |
| digestion-foie-detox-complements | `pt-pt/digestao-figado-detox-suplementos` | `pl/trawienie-watroba-detoks-suplementy` |
| articulations-mobilite-quotidien | `pt-pt/articulacoes-e-mobilidade-no-dia-a-dia` | `pl/stawy-i-sprawnosc-na-co-dzien` |
| hydratation-aliments-riches-en-eau | `pt-pt/alimentos-ricos-em-agua` | `pl/produkty-bogate-w-wode` |
| petit-dejeuner-equilibre | `pt-pt/pequeno-almoco-equilibrado-ideias-simples` | `pl/zbilansowane-sniadanie-proste-pomysly` |
| routine-matin-energie | `pt-pt/rotina-da-manha-para-mais-energia` | `pl/poranna-rutyna-wiecej-energii` |
| soin-anti-age-quels-actifs | `pt-pt/creme-antienvelhecimento-que-ativos` | `pl/pielegnacja-anti-aging-jakie-skladniki` |
| soins-cheveux-naturel | `pt-pt/cuidar-do-cabelo-ao-natural` | `pl/naturalna-pielegnacja-wlosow` |
| sommeil-pilier-bien-etre | `pt-pt/o-sono-pilar-do-bem-estar` | `pl/sen-filar-dobrego-samopoczucia` |

Drafts are never built into the site. **Review notes for the reviewer** are written as `#` comments at the top of each file.

## 2. Roles

- **Translator**: adapts the text (may be Claude Code, a professional or the editorial team).
- **Reviewer**: fluent in the target language and able to check health and regulatory statements for that country (for English: UK rules). Their name goes in `translationReviewer` and is shown on the page as the reviewer (*Revisione:*). **Philippe Cros reviews French content; Italian content needs an Italian-speaking reviewer.**

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
- [ ] Italy-specific regulation correct and current. For the two drinking articles, the vitamins, digestion and joints articles: the plant wordings in the Allegato 1 of the DM 10 agosto 2018 (Ministero della Salute); for digestion, also the current probiotics guidelines. Checked here in the 2014 version of the ministerial guidelines; **confirm against the current annex**.
- [ ] Sources open and are the Italian versions where they exist.
- [ ] Register *tu*, Italian typography, terminology table respected.
- [ ] Title ≤ ~60 characters and description 50–160 characters, both phrased as Italians search; slug final (changing it after publication needs a redirect).
- [ ] `coverAlt` describes the image in Italian.
- [ ] Internal links resolve to Italian articles published in the same batch (vitamins → sleep and breakfast; digestion and morning routine → breakfast).

## 5. Open decisions (owner)

- ~~Who reviews Italian content (D8)~~: decided 2026-10-24, Philippe Cros.
- ~~Distributor window in other languages (D7)~~: decided 2026-10-23, Philippe accepts contacts in all supported languages.
- **Product pages for Italy** (D6): Italian LR shop links with `ref=cros` and Italian mandatory mentions. Until then Italian articles carry no product links (enforced by the schema).

## 6. Adding another locale

1. Add its interface text to `src/i18n/ui.ts` (the build refuses to publish a locale without it) and its category text to `CATEGORY_I18N`.
2. Write a style guide like IT_STYLE_GUIDE.md.
3. Follow the steps above. Routing, hreflang and the sitemap need no change.
