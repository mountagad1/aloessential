# Spanish style guide (es, audience in Spain)

*For translators and reviewers of Aloessential in Spanish: articles (`src/content/articles/es/`), interface text (`src/i18n/ui.ts`, `es`) and category text (`CATEGORY_I18N.es`). Version 1, 2026-10-23.*

## 1. Audience and market

The Spanish version targets **readers in Spain**, which is where the LR shop link goes (`https://shop.lrworld.com/home/ES/es?ref=cros`, prices in EUR). Locale settings:

- `<html lang="es">` and hreflang `es`, so the page also reaches Latin American readers. The vocabulary is Spain's: *zumo*, not *jugo*.
- `og:locale` `es_ES`, schema.org `es-ES`.

Spain is an EU member: **the EU rules used in the French articles apply unchanged**.

- Regulation 2021/468.
- Ruling T-189/21 and the pending appeal (*recurso de casación*).
- Regulation 1924/2006, with aloe claims *en suspenso*.

No regulatory rewrite is needed. The adaptation covers language, healthcare context and typography.

| Topic | Spanish version |
| --- | --- |
| Where products are sold | farmacia, parafarmacia, herbolario |
| When to get help | centro de salud, the pharmacist (farmacia), **112** for emergencies |
| Growing aloe | outdoors all year where there is no frost (much of the Mediterranean coast, the south, the Canary Islands); indoors in winter in cold inland areas |
| Labels | Spanish ingredient list, EU business address |

## 2. Register and tone

- **Address the reader with *tú*.** This is the usual register of Spanish wellness and lifestyle media, and it matches the Italian *tu*.
- Clear and calm, never alarmist; no *milagroso* except to deny it.
- **Health limits stay explicit:** *no sustituye la opinión de un médico o un farmacéutico*.
- Gender:
  - prefer neutral wording;
  - *estás embarazada* is used where it applies;
  - no "@" or "x" endings.

## 3. Typography

| Rule | Example |
| --- | --- |
| Opening marks | `¿de qué hablamos?`, `¡Atención!` |
| No space before `: ; ? !` | `En resumen:` (tested) |
| Quotation marks | « » (RAE preference) for quotes and linked titles: `[«Cómo elegir un gel de aloe vera»](/es/articulos/como-elegir-gel-de-aloe-vera/)` |
| Percent | `98 %` (space before %, RAE) |
| Decimals | comma: `0,5 g`; `250 ml` |
| Dates | `23 de octubre de 2026` (templates, `es-ES`) |
| Ordinal abbreviation | `n.º 1924/2006` |
| Slugs | ASCII, no accents or ñ: `nutricion`, `articulo-demo` |

## 4. Terminology

| French | Spanish (Spain) |
| --- | --- |
| complément alimentaire | complemento alimenticio |
| allégation de santé | declaración de propiedades saludables |
| allégation autorisée | declaración autorizada |
| « en attente » (claims) | en suspenso |
| aloïne | aloína |
| latex (de l'aloe) | látex |
| dérivés hydroxyanthracéniques | derivados hidroxiantracénicos |
| aloe-émodine, émodine | aloe-emodina, emodina |
| Tribunal de l'Union européenne | Tribunal General de la Unión Europea |
| Cour de justice | Tribunal de Justicia |
| pourvoi | recurso de casación |
| jus | zumo |
| gel à boire | gel para beber |
| liste INCI | lista INCI / lista de ingredientes |
| période après ouverture | plazo después de abrir (tarro abierto, p. ej. «12M») |
| coup de soleil | quemadura solar |
| médecin traitant | médico de cabecera / centro de salud |
| rejets (plante) | hijuelos |
| terreau pour cactus | sustrato para cactus y suculentas |
| relecture | Revisado por |

## 5. Links, sources and SEO

- **Internal links** point only to Spanish articles (`/es/articulos/<slug>/`) that exist as files (tested).
- **Sources:** EUR-Lex in Spanish (`/legal-content/ES/TXT/?uri=CELEX:…`). Spanish official sources where relevant (AESAN, AEMPS). English-only sources are labelled *(en inglés)*.
- **Title:** Spanish search wording, at most ~60 characters.
- **Description:** 50–160 characters (tested in drafts).
