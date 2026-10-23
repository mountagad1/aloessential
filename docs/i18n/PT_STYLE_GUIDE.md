# Portuguese style guide (pt-PT, audience in Portugal)

*For translators and reviewers of Aloessential in European Portuguese: articles (`src/content/articles/pt-pt/`), interface text (`src/i18n/ui.ts`, `pt-pt`) and category text (`CATEGORY_I18N["pt-pt"]`). Version 1, 2026-10-23.*

## 1. Audience and market

- **Readers in Portugal.** Locale settings: `<html lang="pt-PT">`, hreflang `pt-PT`, `og:locale` `pt_PT`.
- **European Portuguese, not Brazilian**:
  - vocabulary: *sumo*, *frigorífico*, *casa de banho*, *equipa*, *ecrã*;
  - spelling: the 1990 Orthographic Agreement (*aspeto*, *ativo*, *atividade*).
- **LR link.** The shop link supplied (`shop.lrworld.com/PT/pt`) returned 404, and `shop.lrworld.com/home/PT/pt` ends on the LR login page for visitors without an account (checked 2026-10-23). The footer therefore links to **LR Portugal's site**, `https://www.lrworld.com/pt-pt?ref=cros` (same approach as France), labelled *Site oficial da LR*. Revisit if LR opens the Portuguese shop to visitors.

Portugal is an EU member, so **the EU rules in the French articles apply unchanged**:
- Regulation 2021/468;
- the T-189/21 ruling, now under appeal;
- Regulation 1924/2006, with aloe claims *em suspenso*.

| Topic | Portuguese version | Checked |
| --- | --- | --- |
| Where products are sold | farmácia, parafarmácia, ervanária | — |
| When to get help | centro de saúde / médico de família, **SNS 24 (808 24 24 24)**, **112** for emergencies | press and public sources, 2026-10-23 |
| Growing aloe | outdoors all year where there is no frost (coast, Algarve, Madeira, Azores); indoors in winter inland | — |

## 2. Register and tone

- **Address the reader with *tu*** (*escolhe*, *consulta*, *a tua pele*), as in Portuguese lifestyle media.
- **Health limits stay explicit**: *não substitui o parecer de um médico*.

## 3. Typography

| Rule | Example |
| --- | --- |
| Quotation marks | « » for quotes and linked titles |
| No space before `: ; ? !` | tested |
| Percent | `98%` |
| Decimals | comma: `0,5 g` |
| Dates | `23 de outubro de 2026` (templates, `pt-PT`) |
| Slugs | ASCII without accents: `saude`, `nutricao` |

## 4. Terminology

| French | Portuguese (Portugal) |
| --- | --- |
| complément alimentaire | suplemento alimentar |
| allégation de santé | alegação de saúde |
| « en attente » | em suspenso |
| aloïne / latex | aloína / látex |
| dérivés hydroxyanthracéniques | derivados hidroxiantracénicos |
| Tribunal de l'UE / Cour de justice | Tribunal Geral / Tribunal de Justiça |
| pourvoi | recurso |
| jus | sumo |
| coup de soleil | queimadura solar |
| rejets (plante) | rebentos |
| relecture | Revisto por |

## 5. Links, sources and SEO

- **Links:** body links point only to Portuguese articles (`/pt-pt/artigos/<slug>/`).
- **Sources:** EUR-Lex in Portuguese (`/legal-content/PT/TXT/?uri=CELEX:…`).
- **Title:** at most ~60 characters.
- **Description:** 50–160 characters (tested).
