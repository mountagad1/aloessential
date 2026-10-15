# Aloessential — Baseline et audit des preuves

> Audit réalisé le 2026-10-15 sur le dépôt `mountagad1/aloessential`, branche `claude/sleepy-wozniak-wbf030`, commit `dc0068e`.
> Aucun fichier du site n'a été modifié. Ce document, `ALOESSENTIAL_ROUTE_INVENTORY.md` et `ALOESSENTIAL_RISK_REGISTER.md` sont les seuls fichiers créés.

## Légende des niveaux de preuve

| Code | Signification |
| --- | --- |
| **OBS** | Observé directement dans le code, le build ou un test exécuté |
| **DED** | Déduit du code, sans vérification sur le site en ligne |
| **INC** | Inconnu : aucune donnée disponible dans cet environnement |
| **GSC** | À vérifier dans Google Search Console |
| **EXT** | À vérifier dans un outil ou une source externe (hébergeur, registrar, outil SEO, LR, INPI/EUIPO…) |

Aucun chiffre de trafic, de volume de recherche, de position, de backlink ou de conversion n'apparaît dans ce document : aucune de ces données n'était disponible.

---

## 1. Ce que l'on sait du site en ligne

| Question | Statut | Preuve |
| --- | --- | --- |
| Le domaine aloessential.com répond-il ? | **INC** | Le proxy réseau de l'environnement d'audit refuse la connexion (`CONNECT 403`, 2026-10-15 16:18 UTC). Ce n'est pas une information sur le site. |
| Ce dépôt est-il déployé sur aloessential.com ? | **INC** | Aucun fichier de configuration d'hébergement dans le dépôt (pas de `vercel.json`, `netlify.toml`, `_redirects`, `_headers`, workflow CI). |
| Les pages sont-elles indexées ? | **GSC** | Une recherche web « aloessential.com » (2026-10-15) ne renvoie aucun résultat sur le domaine. Cela **ne prouve pas** une absence d'indexation (règle n° 7). Seul le rapport « Pages » de la Search Console fait foi. |
| Historique du domaine (ancien site, pénalité, redirections héritées) | **EXT** | Registrar, Wayback Machine, Search Console (onglet « Actions manuelles »). |

---

## 2. Cartographie du dépôt (A)

### Stack (OBS, `package.json`, `astro.config.mjs`)

| Élément | Valeur |
| --- | --- |
| Framework | Astro **5.18.2**, `output: "static"` : chaque page est un fichier HTML généré au build |
| UI / hydratation | Aucun framework UI, aucune île Astro. JavaScript limité à des scripts d'amélioration progressive (`src/scripts/`) |
| Contenu | Collections de contenu Astro (`src/content.config.ts`) : Markdown + front matter validé par Zod. **Pas de CMS, pas de base de données.** |
| Polices | `@fontsource/poppins` 5.3.0, `@fontsource-variable/inter` 5.3.0, auto-hébergées |
| Tests | `@playwright/test` 1.56.1, sur le build de production, projets desktop et mobile |
| Node | `>=20.3` |
| Variable d'environnement | `PUBLIC_NEWSLETTER_ENDPOINT` (vide par défaut, `.env.example`) |
| `site` (URL absolue) | **Non défini** dans `astro.config.mjs` |
| `trailingSlash` | `"ignore"` |
| Intégrations Astro | **Aucune** (ni `@astrojs/sitemap`, ni autre) |
| Analytics | **Aucun** (recherche `gtag`, `googletagmanager`, `plausible`, `matomo`, `umami`, `analytics` dans `src/` : 0 résultat) |
| CI | **Aucune** (pas de dossier `.github/`) |

### Arborescence utile

```
src/content.config.ts      schémas articles + produits (ref=cros obligatoire sur shopUrl)
src/content/articles/      14 articles (Markdown)
src/content/products/      11 fiches produit LR (6 publiées, 5 brouillons)
src/data/categories.ts     4 rubriques : conseils, sante, beaute, nutrition
src/layouts/BaseLayout.astro  <head> commun (title, description, og:title/description/type)
src/pages/                 routes (voir ALOESSENTIAL_ROUTE_INVENTORY.md)
src/lib/partner.ts         ref=cros, LR_HOME_URL, withPartnerRef()
src/lib/products.ts        statut publié/brouillon, mentions obligatoires compléments
tests/                     8 fichiers de test Playwright + fixtures fictives
tools/                     génération des couvertures SVG, mesure de poids, mesure throttlée
docs/aloessential/         MOTION_DESIGN_SYSTEM.md, PRODUCT_CONTENT_GUIDELINES.md
```

---

## 3. Inventaire du contenu (B) — résumé

Détail page par page : `ALOESSENTIAL_ROUTE_INVENTORY.md`.

| Type | Nombre (OBS) | Remarques |
| --- | --- | --- |
| Pages HTML générées | 29 | dont `404.html` |
| Pages indexables potentielles | 28 | toutes sans `noindex` |
| Articles | 14 | santé 5, beauté 4, nutrition 3, conseils 2 |
| Fiches produit publiées | 6 | LR Health & Beauty (aloe, Lifetakt) |
| Fiches produit en brouillon | 5 | non générées (pas d'URL publique), vérifié par test |
| Rubriques | 4 | |
| Pages hub / institutionnelles | 4 | accueil, `/articles/`, `/produits/`, `/transparence/` |
| Langues | 1 | `<html lang="fr">`, pas de hreflang (inutile tant qu'il n'y a qu'une langue) |

---

## 4. Signaux SEO on-page (C) — mesures OBS sur `dist/`

| Signal | Résultat | Commentaire |
| --- | --- | --- |
| `<title>` unique | 28/28 uniques | Gabarit `{titre} · Aloessential` |
| `meta description` | 28/28 présentes | Fiches produit : **207 à 296 caractères** (le `summary` est réutilisé), donc tronquées dans les résultats |
| H1 | 1 par page sur 29/29 | H1 de l'accueil : « Votre source bien-être naturelle » (sans « aloe vera ») |
| `rel="canonical"` | **0/29** | Impossible sans `site` configuré |
| `meta robots` | 0/29 | Pas nécessaire en soi (indexable par défaut) |
| `robots.txt` | **Absent** | Ni dans `public/` ni généré |
| Sitemap XML | **Absent** | Pas d'intégration sitemap |
| hreflang | Absent | Sans objet (site monolingue) |
| Données structurées JSON-LD | **0/29** | Ni `Organization`, `WebSite`, `Article`, `BreadcrumbList`, `FAQPage` |
| Open Graph | `og:title`, `og:description`, `og:type=website` seulement | Pas d'`og:url`, d'`og:image`, d'`og:locale` ; `og:type` vaut `website` même pour les articles |
| Images sans `alt` | 0 | |
| Fil d'Ariane HTML | Présent sur articles, produits | Pas balisé en `BreadcrumbList` |
| Liens sortants LR | Tous avec `ref=cros`, `rel="sponsored noopener"` | Vérifié par `tests/partner.spec.ts` |

---

## 5. Rendu, HTTP, build (D)

| Point | Statut | Preuve |
| --- | --- | --- |
| Rendu | **OBS** : HTML statique complet, contenu présent sans JavaScript | `output: "static"`, test « without JavaScript » |
| Build | **OBS** : `npm run build` → 0, 29 pages, aucun avertissement | exécuté le 2026-10-15 |
| Codes HTTP en production | **INC / EXT** | Dépend de l'hébergeur, non identifiable |
| Page 404 | **DED** : `dist/404.html` existe ; renvoi d'un vrai code 404 selon l'hébergeur | À tester en ligne (`curl -I` sur une URL inexistante) |
| Redirections | **OBS** : aucune règle dans le dépôt | |
| Slash final | **DED** : `/articles/x` et `/articles/x/` peuvent répondre tous deux selon l'hébergeur, sans canonical pour trancher | À tester en ligne |
| Poids | **OBS** : ~2 Ko de JS gzip par page, 0 fichier JS externe, CSS 7,3 Ko gzip | `npm run size` |
| Performance | **OBS** : tests de stabilité de mise en page et de LCP passent sur 4 pages | `tests/performance.spec.ts` (labo, pas terrain) |
| Core Web Vitals terrain | **GSC / EXT** | Rapport « Signaux Web essentiels », CrUX |

### Pages faibles ou proches (OBS, mots visibles hors header/footer, approximatif)

| URL | Mots | Constat |
| --- | --- | --- |
| `/rubriques/conseils/` | ~110 | 2 articles seulement |
| `/rubriques/nutrition/` | ~154 | 3 articles |
| `/rubriques/beaute/` | ~209 | |
| `/rubriques/sante/` | ~249 | |
| `/produits/` | ~256 | |
| `/transparence/` | ~278 | |
| 8 articles d'origine | ~400 à 630 | sans source citée ni auteur |

Aucun doublon de titre ni de description (OBS).

---

## 6. Typologie des pages (E) et pages produits (F)

| Type | Pages |
| --- | --- |
| Éditoriales (information) | 14 articles, 4 rubriques, `/articles/` |
| Commerciales (évaluation d'un produit, lien d'achat) | 6 fiches `/produits/{slug}/` |
| Comparatives | Aucune page dédiée. Les fiches contiennent une section « Face aux autres produits de notre sélection » |
| Transactionnelles | **Aucune sur le site** : l'achat se fait sur la boutique LR (lien externe) |
| Institutionnelles | `/transparence/` ; **pas** de mentions légales, politique de confidentialité, contact, « à propos » ou politique éditoriale |

### Produits LR Health & Beauty (F)

- 6 fiches publiées, 5 brouillons, toutes sur des produits **LR Health & Beauty** (aucune autre marque).
- Le site se présente comme « édité par un partenaire indépendant de LR Health & Beauty » (`src/pages/transparence.astro`). **Statut du partenariat : déclaratif.** Le dépôt ne contient aucune preuve contractuelle ; l'identifiant `ref=cros` est fourni par l'utilisateur. **EXT** : contrat / conditions partenaire LR, règles LR pour les sites de partenaires.
- Le site n'emploie pas de formulation laissant croire à un site officiel LR et affirme le contraire.

---

## 7. Données manquantes (H)

| Donnée | Pourquoi elle compte | Où l'obtenir |
| --- | --- | --- |
| Propriété Search Console (Domaine) | Indexation, couverture, requêtes, CTR, positions, CWV, actions manuelles | Google Search Console |
| Export GSC « Pages » et « Performances » (16 mois) | Baseline trafic organique réelle | GSC |
| Analytics (GA4 ou autre) | Sessions, engagement, clics sortants vers LR | **Aucun outil installé** : décision requise |
| Hébergeur et configuration de déploiement | Codes HTTP, redirections, en-têtes, slash final, 404 | Compte hébergeur |
| Statut du domaine (registrar, DNS, historique) | Ancien contenu, pénalités, liens hérités | Registrar, Wayback Machine |
| Inventaire d'URL en production | Comparer site réel / dépôt | Crawl externe (Screaming Frog, etc.) une fois le site accessible |
| Backlinks | Autorité, liens toxiques hérités | GSC « Liens », outil externe |
| Volumes de recherche / difficulté | Priorisation éditoriale | Outil externe (Google Ads Keyword Planner, Semrush, Ahrefs…) |
| Conversions LR (clics, commandes, commissions) | ROI des fiches produit | Back-office partenaire LR |
| Fournisseur newsletter | RGPD, consentement, double opt-in | Décision à prendre |
| Historique éditorial (auteurs, relecteurs, sources) | E-E-A-T, YMYL | À créer |
| Recherche d'antériorité de marque | Risque « Aloe Essentials » | INPI, EUIPO, WIPO |

---

## 8. Baseline mesurable (I)

Valeurs relevées dans le dépôt au commit `dc0068e`. Ce sont des **mesures de code**, pas de performance.

| Indicateur | Valeur au 2026-10-15 | Méthode de remesure |
| --- | --- | --- |
| Pages HTML générées | 29 | `find dist -name '*.html' \| wc -l` après `npm run build` |
| Articles publiés | 14 | `ls src/content/articles/*.md \| wc -l` |
| Fiches produit publiées / brouillons | 6 / 5 | `grep -l 'status: published' src/content/products/*.md` |
| Pages avec canonical | 0 | parse `dist/` |
| Pages avec JSON-LD | 0 | parse `dist/` |
| `robots.txt` / sitemap | absent / absent | `ls dist/robots.txt dist/sitemap*` |
| Descriptions > 160 caractères | 6 (toutes les fiches produit) | parse `dist/` |
| Articles citant au moins une source externe | 0 / 14 | `grep -c '](http' src/content/articles/*.md` |
| Articles avec auteur nommé | 0 / 14 | schéma de contenu (pas de champ auteur) |
| Pages légales obligatoires (mentions légales, confidentialité) | 0 / 2 | `ls src/pages` |
| JavaScript par page (gzip) | ~2,0 à 2,2 Ko | `npm run size` |
| Tests Playwright | 91 réussis, 11 ignorés volontairement, 0 échec | `npx playwright test` |
| Liens LR sans `ref=cros` | 0 | `tests/partner.spec.ts` |

**Baseline de performance de recherche : à établir.** Dès que la propriété Search Console est vérifiée, exporter la date zéro (impressions, clics, CTR, position moyenne, pages indexées / non indexées par motif) et la consigner ici. Aucune valeur n'est inventée en attendant.

---

## 9. Décisions validées

| Date | Décision | Conséquence |
| --- | --- | --- |
| 2026-10-15 | Domaine canonique : `https://aloessential.com` (sans `www`), URL avec slash final | `site: "https://aloessential.com"` et `trailingSlash: "always"` dans `astro.config.mjs` ; canonical absolus et sitemap sur cette base ; redirections 301 `www → apex`, `http → https` et sans slash → avec slash à configurer chez l'hébergeur (encore inconnu) |

## 10. Commandes exécutées pendant l'audit

| Commande | Résultat |
| --- | --- |
| `git status --short`, `git log --oneline` | Arbre propre, 8 commits |
| `npm run build` | Code 0, 29 pages |
| Script Python de lecture de `dist/` (titres, descriptions, H1, canonical, robots, JSON-LD, liens, mots, alt) | Résultats repris aux sections 4 et 5 |
| `npx playwright test` | 91 passed, 11 skipped (skips conditionnels desktop/mobile), 0 failed |
| `npm run size` | ~2 Ko JS/page, 0 JS externe |
| `curl https://aloessential.com/` (+ `www`, `robots.txt`, `sitemap.xml`) | Refusé par le proxy de l'environnement (403), statut du site inconnu |
| Recherche web « aloessential.com » | Aucun résultat sur le domaine ; une marque américaine « ALOE ESSENTIALS » apparaît ([Justia](https://trademark.justia.com/owners/tanke-william-b-1286800)) |
