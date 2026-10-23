# Polish style guide (pl, audience in Poland)

*For translators and reviewers of Aloessential in Polish: articles (`src/content/articles/pl/`), interface text (`src/i18n/ui.ts`, `pl`) and category text (`CATEGORY_I18N.pl`). Version 1, 2026-10-23.*

## 1. Audience and market

The Polish version targets readers in Poland. The LR shop link is `https://shop.lrworld.com/home/PL/pl?ref=cros` (verified: Polish shop, prices in PLN, `ref=cros` kept). Locale settings: `<html lang="pl">`, `og:locale` `pl_PL`.

Poland is an EU member, so **the EU rules in the French articles apply unchanged** (2021/468, T-189/21, 1924/2006: claims *zawieszone*). Use Polish legal terms:

- **suplement diety** (the term in Polish law);
- **oświadczenia zdrowotne** (health claims).

| Topic | Polish version | Checked |
| --- | --- | --- |
| Where products are sold | apteka, drogeria, sklep zielarski | — |
| When to get help | lekarz rodzinny (POZ); after hours **nocna i świąteczna opieka zdrowotna**; **NFZ helpline 800 190 590** to find care; **112 / 999** in emergencies | press and public sources, 2026-10-23 |
| Growing aloe | not frost-hardy: indoors in winter | — |

## 2. Register and tone

- **Address the reader with *ty*** (*sprawdź*, *wybierz*, *Twoja skóra*), with *Ty/Twój* capitalised when addressing the reader, as is customary in Polish.
- **Health limits stay explicit**: *nie zastępuje porady lekarza*.
- **Gendered first person in the WhatsApp message**: shown as *odkryłem/odkryłam*.

## 3. Typography

| Rule | Example |
| --- | --- |
| Quotation marks | „…” (low opening, high closing) |
| No space before `: ; ? !` | tested |
| Percent | `98%` |
| Decimals | comma: `0,5 g` |
| Ranges | en dash: `co dwa–trzy tygodnie` |
| Dates | `23 października 2026` (templates, `pl-PL`) |
| Plurals | 1 artykuł, 2–4 artykuły, 5+ artykułów (handled in `homeLead`) |
| Slugs | ASCII: ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź/ż→z (`odzywianie`, `artykuly`) |

## 4. Terminology

| French | Polish |
| --- | --- |
| aloe vera | aloes (in running text), aloe vera (product names) |
| gel d'aloe vera | żel aloesowy |
| jus d'aloe | sok z aloesu |
| complément alimentaire | suplement diety |
| allégation de santé | oświadczenie zdrowotne |
| aloïne / latex | aloina / lateks |
| dérivés hydroxyanthracéniques | pochodne hydroksyantracenu |
| Tribunal de l'UE / Cour de justice | Sąd Unii Europejskiej / Trybunał Sprawiedliwości |
| pourvoi | odwołanie |
| coup de soleil | oparzenie słoneczne |
| rejets (plante) | odrosty |
| relecture | Sprawdzone przez |

## 5. Links, sources and SEO

- **Links:** point only to Polish articles (`/pl/artykuly/<slug>/`).
- **Sources:** EUR-Lex in Polish; pacjent.gov.pl for patient guidance.
- **Title:** at most ~60 characters.
- **Description:** 50–160 characters (tested).
