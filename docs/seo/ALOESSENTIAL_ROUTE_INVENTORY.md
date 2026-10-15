# Aloessential — Inventaire des routes

> Relevé le 2026-10-15 à partir du code (`src/pages/`) et du build (`dist/`), commit `dc0068e`.
> Statut HTTP en production : **inconnu** (site non joignable depuis l'environnement d'audit). Les URL sont relatives, faute de `site` configuré.
> Colonnes : **T** = longueur du `<title>`, **D** = longueur de la meta description, **Mots** = mots visibles approximatifs hors en-tête et pied de page, **Liens entrants** = liens internes depuis le contenu des autres pages (hors navigation et pied de page).

## 1. Modèles de route

| Fichier | Route | Source des données | Génération |
| --- | --- | --- | --- |
| `src/pages/index.astro` | `/` | articles (`featured`, derniers) | statique |
| `src/pages/articles/index.astro` | `/articles/` | collection `articles` | statique |
| `src/pages/articles/[slug].astro` | `/articles/{slug}/` | collection `articles` | une page par fichier |
| `src/pages/rubriques/[slug].astro` | `/rubriques/{slug}/` | `src/data/categories.ts` | 4 pages |
| `src/pages/produits/index.astro` | `/produits/` | produits `status: published` | statique |
| `src/pages/produits/[slug].astro` | `/produits/{slug}/` | produits `status: published` | une page par produit publié |
| `src/pages/transparence.astro` | `/transparence/` | contenu en dur | statique |
| `src/pages/404.astro` | `/404.html` | contenu en dur | statique |

**Absentes :** mentions légales, politique de confidentialité, contact, à propos, politique éditoriale, pages auteur, `robots.txt`, sitemap, flux RSS.

## 2. Modèles de contenu

| Collection | Champs clés | Contrôles |
| --- | --- | --- |
| `articles` | `title`, `description`, `category`, `date`, `cover`, `coverAlt`, `featured`, `products[]` | Schéma Zod. **Pas** de champ auteur, relecteur, sources, date de mise à jour |
| `products` | `name`, `sku`, `shopUrl` (ref=cros obligatoire), `status`, `kind`, `category`, `range`, `tagline`, `summary`, `format`, `highlights[≤4]`, `forWhom[]`, `composition[]`, `usage[]`, `precautions[]`, `faq[]`, `sourceCheckedAt` | Le build échoue sur un lien LR sans `ref=cros` ; les brouillons ne génèrent aucune page (testé) |

Fixtures de test (`tests/fixtures/`) : incluses uniquement si `CONTENT_FIXTURES=1`, écrites dans `dist-test/`. **OBS :** aucune fixture dans `dist/`.

## 3. Pages générées

### Hubs et institutionnel

| URL | Type | T | D | H1 | Mots | Liens entrants |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Accueil | 38 | 130 | Votre source bien-être naturelle | ~524 | 1 |
| `/articles/` | Liste | 32 | 81 | Tous les articles | ~601 | 1 |
| `/produits/` | Liste commerciale | 33 | 142 | Les produits que nous avons étudiés | ~256 | 0 (accessible par l'en-tête et le pied de page) |
| `/transparence/` | Institutionnel | 48 | 130 | Liens partenaires et indépendance | ~278 | 14 |
| `/404.html` | Erreur | 31 | 42 | Cette page s'est envolée avec le vent | ~31 | — |

### Rubriques

| URL | T | D | Articles | Mots | Constat |
| --- | --- | --- | --- | --- | --- |
| `/rubriques/conseils/` | 23 | 83 | 2 | ~110 | Faible |
| `/rubriques/nutrition/` | 24 | 72 | 3 | ~154 | Faible |
| `/rubriques/beaute/` | 21 | 79 | 4 | ~209 | Faible |
| `/rubriques/sante/` | 20 | 75 | 5 | ~249 | Faible |

Titres de rubrique génériques (« Santé · Aloessential »), sans texte d'introduction éditorial au-delà de la description.

### Articles (éditorial)

| URL | Rubrique | Date | T | D | Mots | Liens entrants | Produits liés (publiés) | Sources externes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/articles/aloe-vera-a-boire-comment-choisir/` | nutrition | 2026-10-15 | 58 | 152 | ~1083 | 9 | Immune Plus, Set vitalité | 0 |
| `/articles/digestion-foie-detox-complements/` | sante | 2026-10-15 | 89 | 157 | ~1061 | 16 | PRO 12 +, Liver Support | 0 |
| `/articles/routine-peau-apres-soleil/` | beaute | 2026-10-14 | 68 | 180 | ~855 | 8 | Emergency Spray, DermaIntense | 0 |
| `/articles/vitamines-fatigue-reglementation/` | sante | 2026-10-13 | 75 | 183 | ~951 | 10 | Set vitalité | 0 |
| `/articles/articulations-mobilite-quotidien/` | sante | 2026-10-12 | 71 | 169 | ~885 | 9 | — (Active Freedom en brouillon) | 0 |
| `/articles/soin-anti-age-quels-actifs/` | beaute | 2026-10-10 | 64 | 177 | ~870 | 7 | DermaIntense | 0 |
| `/articles/aloe-vera-bienfaits-peau/` | beaute | 2026-10-08 | 60 | 137 | ~630 | 8 | Emergency Spray, DermaIntense | 0 |
| `/articles/choisir-gel-aloe-vera/` | conseils | 2026-10-01 | 47 | 114 | ~520 | 5 | Emergency Spray | 0 |
| `/articles/jus-aloe-vera-science/` | sante | 2026-09-24 | 54 | 131 | ~527 | 7 | Immune Plus | 0 |
| `/articles/routine-matin-energie/` | conseils | 2026-09-17 | 55 | 131 | ~421 | 3 | — | 0 |
| `/articles/hydratation-aliments-riches-en-eau/` | nutrition | 2026-09-10 | 55 | 134 | ~401 | 5 | — | 0 |
| `/articles/sommeil-pilier-bien-etre/` | sante | 2026-09-03 | 46 | 127 | ~408 | 3 | — | 0 |
| `/articles/petit-dejeuner-equilibre/` | nutrition | 2026-08-27 | 59 | 119 | ~413 | 6 | — | 0 |
| `/articles/soins-cheveux-naturel/` | beaute | 2026-08-20 | 53 | 130 | ~398 | 5 | — | 0 |

Titres > 60 caractères (affichage tronqué probable, **DED**) : 6 articles, le plus long à 89 caractères.

### Fiches produit (commercial, liens d'affiliation LR)

| URL | Marque / gamme | Type | T | D | Mots | Liens entrants | Vérifié le |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/produits/aloe-vera-gel-a-boire-immune-plus/` | LR — Aloe Vera | complément | 41 | **235** | ~1396 | 3 | 2026-10-15 |
| `/produits/lifetakt-liver-support/` | LR — Lifetakt | complément | 40 | **246** | ~1173 | 2 | 2026-10-15 |
| `/produits/capsules-pro-12-plus/` | LR — Lifetakt | complément | 32 | **234** | ~1184 | 2 | 2026-10-15 |
| `/produits/set-vitalite/` | LR — Lifetakt | coffret | 27 | **296** | ~1557 | 3 | 2026-10-15 |
| `/produits/aloe-vera-dermaintense-creme-regeneratrice/` | LR — ALOE VIA | soin | 57 | **207** | ~972 | 4 | 2026-10-15 |
| `/produits/aloe-vera-emergency-spray/` | LR — Aloe Vera | soin | 40 | **210** | ~1162 | 4 | 2026-10-15 |

Brouillons (pas d'URL publique) : `vita-active-fruits-rouges`, `lifetakt-mind-master-formula-red`, `aloe-vera-drinking-gel-active-freedom`, `lifetakt-active-freedom-capsules`, `creme-anti-age-platinum` (motif noté dans chaque front matter).

Titres de fiche = nom LR seul (ex. « Set vitalité · Aloessential », 27 caractères) : aucune indication du type de page (avis, composition) ni de la marque pour certains.

## 4. Liens externes

| Destination | Pages | Attributs |
| --- | --- | --- |
| `https://www.lrworld.com/fr-fr?ref=cros` | toutes (pied de page) | `rel="sponsored noopener"`, `target="_blank"`, mention « lien partenaire » pour lecteurs d'écran |
| `https://shop.lrworld.com/product/fr/fr/…&ref=cros` | 6 fiches produit (hero, barre mobile, CTA final) | idem |
| Sources scientifiques ou réglementaires | **aucune** | — |

## 5. À compléter en production (non vérifiable ici)

- [ ] Code HTTP de chaque URL ci-dessus (200 attendu), avec et sans slash final.
- [ ] Code HTTP d'une URL inexistante (404 attendu, pas 200).
- [ ] Redirections `http → https` et `www ↔ apex` (une seule version canonique).
- [ ] Liste des URL connues de Google (GSC > Pages) comparée à ce tableau ; URL héritées éventuelles.
