# German style guide (de, audience in Germany)

*For translators and reviewers of Aloessential in German: articles (`src/content/articles/de/`), interface text (`src/i18n/ui.ts`, `de`) and category text (`CATEGORY_I18N.de`). Version 1, 2026-10-22.*

## 1. Audience and market

The German version targets **readers in Germany**, which is where the LR shop link goes (`https://shop.lrworld.com/home/DE/de?ref=cros`, prices in EUR). Locale settings: `<html lang="de">`, hreflang `de` (also reaches Austria and Switzerland), `og:locale` `de_DE`, schema.org `de-DE`.

Germany is an EU member: **the EU rules used in the French articles apply unchanged**.
- Regulation 2021/468.
- The T-189/21 ruling and the pending appeal.
- Regulation 1924/2006 and aloe claims "on hold".

Unlike the UK and Italy versions, the German version needs **no regulatory rewrite**. The adaptation is about language, healthcare context and typography.

| Topic | German version | Checked |
| --- | --- | --- |
| Where products are sold | Apotheke, Drogerie, Reformhaus | — |
| When to get help | Hausarztpraxis; outside opening hours the **ärztlicher Bereitschaftsdienst 116117**; life-threatening emergencies **112** | 116117.de / gesund.bund.de footer, 2026-10-22 |
| Growing aloe | not frost-hardy in Germany: overwinters indoors | RHS |
| Labels | German ingredient list, EU business address | — |

Legal pages stay French (publisher established in France). Whether German readers need a German-language *Impressum* is a question for the owner's legal check, not for the translator.

## 2. Register and tone

- **Formal *Sie***, consistently in articles and interface.
  - It is the expected register for health information in German.
  - It differs from Italian (*tu*) and English (*you*); that is intentional.
- Sober and precise; no *Wundermittel* except to deny it.
- Health limits explicit: *ersetzt nicht den Rat einer Ärztin oder eines Arztes*.
- Prefer inclusive pairs where natural: *Ärztin oder Arzt*, *Ihre Apotheke*. Do not use gender symbols (*Ärzt\*innen*) in body text.

## 3. Typography

| Rule | Example |
| --- | --- |
| Quotation marks | „…“ for quotes and linked titles: `[„Aloe-vera-Gel kaufen: worauf achten?“](/de/artikel/aloe-vera-gel-kaufen-worauf-achten/)` |
| No space before `: ; ? !` | `Kurz gesagt:` (tested for every translation) |
| Percent | `98 %` (space before %) |
| Decimals | comma: `0,5 g`; `250 ml` |
| Dates | `22. Oktober 2026` (templates, `de-DE`) |
| Compounds | hyphenate with proper names: `Aloe-vera-Gel`, `Aloe-Getränk` |
| Slugs | ASCII only: ä → ae, ö → oe, ü → ue, ß → ss (`ernaehrung`, `fuer`) |
| Ellipsis | `…` with a space before when it ends a clause: `achten sollten …` |

## 4. Terminology

| French | German |
| --- | --- |
| complément alimentaire | Nahrungsergänzungsmittel |
| allégation de santé | gesundheitsbezogene Angabe |
| allégation autorisée | zugelassene Angabe |
| « en attente » (claims) | zurückgestellt |
| aloïne | Aloin |
| latex (de l'aloe) | Blattsaft (Latex) |
| dérivés hydroxyanthracéniques | Hydroxyanthracenderivate |
| aloe-émodine, émodine | Aloe-Emodin, Emodin |
| Tribunal de l'Union européenne | Gericht der Europäischen Union |
| Cour de justice | Gerichtshof |
| pourvoi | Rechtsmittel |
| dose journalière | empfohlene tägliche Verzehrmenge |
| liste INCI | INCI-Liste / Inhaltsstoffliste |
| période après ouverture | Haltbarkeit nach dem Öffnen (Symbol des geöffneten Tiegels, z. B. „12M“) |
| coup de soleil | Sonnenbrand |
| médecin traitant | Hausärztin / Hausarzt, Hausarztpraxis |
| rejets (plante) | Ableger, Kindel |
| terreau pour cactus | Kakteen- und Sukkulentenerde |
| relecture | Geprüft von |

## 5. Links, sources and SEO

- **Internal links** go only to German articles (`/de/artikel/<slug>/`) that exist as files (tested).
- **Sources:**
  - EUR-Lex in German (`/legal-content/DE/TXT/?uri=CELEX:…`);
  - German official sources where relevant (116117, BfR, BVL);
  - English-only sources labelled *(englisch)*.
- **SEO text:**
  - title: German search wording, at most ~60 characters (tested ≤ 65);
  - description: 50–160 characters (tested in drafts).
