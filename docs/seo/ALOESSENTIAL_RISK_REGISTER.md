# Aloessential — Registre des risques et opportunités

> Établi le 2026-10-15, commit `dc0068e`. Aucun correctif appliqué.
> **Priorité** : P0 = bloquant avant mise en ligne ou risque légal ; P1 = à traiter dans le prochain cycle ; P2 = amélioration ; P3 = à surveiller.
> **Confiance** : Élevée = observé dans le code ou le build ; Moyenne = déduit ; Faible = hypothèse à vérifier.
> Ce registre n'est pas un avis juridique. Les points légaux sont à valider par un professionnel.

## Synthèse

| ID | Sujet | Catégorie | Priorité | Confiance |
| --- | --- | --- | --- | --- |
| R01 | Pas de mentions légales | Légal / confiance | P0 | Élevée |
| R02 | Pas de politique de confidentialité, newsletter sans information RGPD | Légal / RGPD | P0 (avant d'activer la newsletter) | Élevée |
| R03 | Aucune URL de référence : pas de `site`, de canonical, de sitemap ni de `robots.txt` | SEO technique | P0 → **traité dans le code** (redirections hébergeur à faire) | Élevée |
| R04 | Hébergement, domaine et statut en ligne inconnus | Données / technique | P0 → **identifié** (Vercel) ; `www` redirigé dans `vercel.json` | Élevée |
| R05 | Aucune mesure : pas de Search Console vérifiable ici, pas d'analytics | Données | P0 | Élevée |
| R06 | Contenus santé sans auteur, sans relecteur et sans sources | E-E-A-T / YMYL / conformité | P1 → **partiel** (sources sur 6 articles ; auteur et relecteur en attente) | Élevée |
| R07 | Conformité aux règles LR pour les sites de partenaires non vérifiée | Affiliation / marque | P1 | Faible (inconnu) |
| R08 | Antériorité de marque « Aloe Essentials » | Marque | P1 | Faible (à vérifier) |
| R09 | Aucune donnée structurée | SEO / GEO | P1 → **traité** (Organization, WebSite, Article, BreadcrumbList ; auteur à ajouter avec R06) | Élevée |
| R10 | Positionnement « aloe vera » faible dans l'architecture | Stratégie SEO | P1 | Moyenne |
| R11 | Meta descriptions des fiches produit trop longues, titres peu informatifs | SEO on-page | P2 → **traité** | Élevée |
| R12 | Rubriques et hubs minces | Contenu | P2 → **partiel** (introductions de rubrique) | Élevée |
| R13 | Open Graph incomplet (pas d'image, d'URL, de locale) | Partage / GEO | P2 → **traité** (image commune ; images par article à prévoir) | Élevée |
| R14 | Données LR incohérentes reprises par le site | Exactitude produit | P2 | Élevée |
| R15 | Contenu réglementaire daté (aloe, appel C-38/25 P) | Exactitude | P2 | Élevée |
| R16 | « Signalez-la-nous » sans moyen de contact | Confiance | P1 | Élevée |
| R17 | Imprécision botanique (« liliacées ») | Exactitude éditoriale | P3 → **traité** | Élevée |
| R18 | Slogans d'accueil vagues (« Plus d'énergie au quotidien ») | Allégations | P3 | Moyenne |
| R19 | Visuels produits génériques (SVG) | Conversion / images | P3 | Élevée |
| R20 | Pas d'intégration continue | Qualité | P2 → **traité** (`.github/workflows/ci.yml`) | Élevée |
| O01 | Base technique saine (HTML statique, 2 Ko JS, tests) | Opportunité | — | Élevée |
| O02 | Fiches produit très documentées et conformes | Opportunité | — | Élevée |
| O03 | Transparence d'affiliation déjà en place et testée | Opportunité | — | Élevée |

---

## Suivi des traitements

### Prompt 01 — fondations SEO techniques (2026-10-15)
- `site: "https://aloessential.com"`, `trailingSlash: "always"` ; canonical absolu et `og:url` sur toutes les pages indexables ; `noindex` et pas de canonical sur la 404.
- `/sitemap.xml` (28 URL, `lastmod` = date de publication des articles et date de vérification des fiches produit) et `/robots.txt` qui le référence.
- Open Graph complet : `og:site_name`, `og:locale`, `og:url`, `og:image` 1200 × 630 (`public/brand/og-default.png`, généré par `tools/generate-og-image.py`), `og:type=article` sur les articles, `twitter:card`.
- JSON-LD : `Organization` + `WebSite` (accueil), `Article` + `BreadcrumbList` (articles), `BreadcrumbList` (fiches produit, rubriques). Aucun balisage Product/Offer/Review.
- Fiches produit : titre « {Nom} : composition et avis », description = accroche (≤ 129 caractères).
- 4 descriptions d'articles raccourcies sous 160 caractères.
- Mention « Lien partenaire » placée juste sous le premier bouton ; sur mobile, l'illustration du hero passe sous le texte. Sur un écran de 839 px de haut, la mention est visible dès l'arrivée sur 5 fiches sur 6 (DermaIntense : quelques pixels sous la ligne de flottaison) ; sur un petit écran de 667 px, elle reste juste sous la ligne de flottaison mais immédiatement après le bouton.
- Nouveaux tests : `tests/seo.spec.ts` (7 tests) ; `tests/products.spec.ts` vérifie en plus que la mention suit directement le bouton.
- **Reste à faire hors dépôt :** redirections 301 `www → apex`, `http → https`, sans slash → avec slash chez l'hébergeur ; soumettre `https://aloessential.com/sitemap.xml` dans la Search Console.

### Lot 2 — hébergement, sources, rubriques, CI (2026-10-16)
- **Hébergement identifié (OBS, API Vercel) :** projet Vercel `aloessential`, framework Astro, Node 24.x. Domaines : `aloessential.com`, `www.aloessential.com` (tous deux vérifiés), `aloessential.vercel.app`. Les URL `*.vercel.app` sont protégées par l'authentification Vercel ; seuls les domaines personnalisés sont publics.
- **Déploiement :** chaque push sur `claude/sleepy-wozniak-wbf030` part **en production** (déploiements `target: production` pour chaque commit de la branche). La branche de travail est donc aussi la branche de production : tout push est une mise en ligne.
- **Avant ce lot, `www.aloessential.com` servait le site sans redirection** (doublon atténué par les canonicals). `vercel.json` ajoute une redirection permanente `www` → `aloessential.com` et `trailingSlash: true` (URL sans slash redirigées vers la version avec slash). `http → https` est assuré par Vercel.
- **Sources :** nouveau champ `sources` dans le schéma des articles, affiché en fin d'article ; renseigné sur les 6 articles qui s'appuient sur des textes réglementaires ou des recommandations (EUR-Lex, Tribunal de l'UE, OMS, EFSA).
- **Rubriques :** texte d'introduction éditorial sur chaque page de rubrique.
- **R17 :** « liliacées » corrigé (l'aloe appartient aux asphodélacées ; la mise en garde allergique est conservée).
- **CI :** GitHub Actions lance `npm run build` et la suite Playwright à chaque push et pull request.

## Détail

### R01 — Pas de mentions légales · P0 · Confiance élevée
- **Preuve :** aucune page de mentions légales dans `src/pages/` ; le pied de page (`src/components/Footer.astro`) n'en propose pas.
- **Concerné :** tout le site.
- **Impact :** en France, l'éditeur d'un service en ligne doit permettre d'identifier l'éditeur, le directeur de la publication et l'hébergeur (loi LCEN, art. 6). Un site qui touche à la santé et à l'affiliation sans éditeur identifié perd aussi en crédibilité.
- **Vérification :** contrôle juridique ; vérifier la page en ligne une fois le site joignable.
- **Recommandation :** créer `/mentions-legales/` (éditeur, statut de partenaire LR, directeur de publication, hébergeur, contact) et la lier depuis le pied de page.

### R02 — Pas de politique de confidentialité ; newsletter sans information RGPD · P0 avant activation · Confiance élevée
- **Preuve :** `src/components/Newsletter.astro` ne contient aucun texte sur l'usage des données ; aucune page de confidentialité. `PUBLIC_NEWSLETTER_ENDPOINT` est vide par défaut (`.env.example`), donc aucune collecte **dans le dépôt** ; la valeur en production est **inconnue**.
- **Impact :** collecter des adresses e-mail sans information claire (finalité, base légale, durée, droits) contrevient au RGPD.
- **Vérification :** variable d'environnement de production ; fournisseur d'e-mailing choisi.
- **Recommandation :** politique de confidentialité, mention sous le formulaire, double opt-in chez le fournisseur. N'activer l'endpoint qu'après.

### R03 — Pas de `site`, de canonical, de sitemap ni de `robots.txt` · P0 · Confiance élevée
- **Preuve :** `astro.config.mjs` sans `site` ; 0/29 pages avec `rel="canonical"` ; pas de `robots.txt` ni de sitemap dans `dist/` ; `trailingSlash: "ignore"`.
- **Impact :** Google doit deviner l'URL de référence ; risque de doublons (`/x` et `/x/`, `www` et apex, `http` et `https`) selon l'hébergeur ; découverte des pages moins fiable ; pas de sitemap à soumettre dans la Search Console.
- **Vérification :** après déploiement, `curl -I` sur les variantes d'URL ; GSC > Pages > « Page en double sans URL canonique sélectionnée ».
- **Recommandation :** définir `site`, générer canonical absolus, ajouter un sitemap XML et un `robots.txt` qui le référence, fixer `trailingSlash: "always"` (cohérent avec les liens internes, qui finissent tous par `/`).
- **Décision (2026-10-15) :** domaine canonique `https://aloessential.com`, URL avec slash final. Reste ouvert : redirections chez l'hébergeur (lié à R04).

### R04 — Hébergement, domaine et statut en ligne inconnus · P0 · Confiance élevée
- **Preuve :** aucun fichier de configuration d'hébergement ; le domaine n'est pas joignable depuis l'environnement d'audit (refus du proxy, ce qui n'informe pas sur le site).
- **Impact :** impossible de vérifier codes HTTP, redirections, en-têtes, 404 réelle, version servie.
- **Vérification :** compte hébergeur, registrar, `curl -I` depuis un poste non restreint.
- **Recommandation :** documenter l'hébergeur et la procédure de déploiement dans le dépôt ; autoriser `aloessential.com` dans l'environnement pour les audits suivants.

### R05 — Aucune mesure disponible · P0 · Confiance élevée
- **Preuve :** aucun script analytics dans `src/` ; aucun export GSC fourni.
- **Impact :** aucune baseline de trafic, de requêtes ni de clics vers LR ; impossible de prouver un progrès.
- **Vérification :** existence d'une propriété GSC (type Domaine) ; back-office partenaire LR.
- **Recommandation :** vérifier GSC, soumettre le sitemap (après R03), exporter la date zéro. Choisir un outil de mesure respectueux de la vie privée si possible sans cookies (décision de l'éditeur, impacte R02).

### R06 — Contenus santé sans auteur, relecteur ni sources · P1 · Confiance élevée
- **Preuve :** le schéma `articles` n'a ni auteur, ni relecteur, ni sources, ni date de mise à jour (`src/content.config.ts`) ; 0/14 articles avec un lien vers une source. Exemples d'affirmations non sourcées : « plusieurs études suggèrent un effet favorable sur l'inconfort des coups de soleil légers » (`aloe-vera-bienfaits-peau.md`), « Quelques petites études suggèrent un effet favorable… » (`jus-aloe-vera-science.md`), recommandations OMS et seuils réglementaires (articles d'octobre).
- **Impact :** thématique YMYL ; les contenus santé sans expertise identifiable sont moins crédibles pour les lecteurs, pour Google (qualité / E-E-A-T) et pour les moteurs génératifs, qui privilégient les sources citables. Risque de conformité si une affirmation se révèle inexacte.
- **Vérification :** relecture ligne à ligne ; liste des affirmations factuelles par article.
- **Recommandation :** ajouter auteur, relecteur (idéalement un professionnel de santé pour les sujets santé), date de mise à jour et liste de sources dans le schéma ; citer EUR-Lex, EFSA, OMS, ANSES pour chaque affirmation réglementaire ou scientifique.

### R07 — Conformité aux règles LR pour les sites de partenaires non vérifiée · P1 · Confiance faible
- **Preuve :** le site se déclare « partenaire indépendant de LR Health & Beauty » (`src/pages/transparence.astro`), emploie les noms de produits et de gammes LR, et mène un discours commercial. Aucune trace dans le dépôt des conditions partenaire LR. **Le partenariat lui-même est déclaratif** du point de vue de cet audit.
- **Impact :** si LR encadre la communication de ses partenaires (usage de la marque, noms de domaine, visuels, allégations, publicité), un écart pourrait entraîner une demande de retrait ou une perte du statut de partenaire.
- **Vérification :** contrat et chartes LR applicables au partenaire, service conformité LR.
- **Recommandation :** obtenir les règles écrites et les consigner dans `docs/aloessential/` ; adapter si nécessaire.

### R08 — Antériorité de marque « Aloe Essentials » · P1 · Confiance faible
- **Preuve :** une recherche web fait apparaître une marque américaine « ALOE ESSENTIALS » pour des soins à l'aloe vera ([Justia, William B. Tanke](https://trademark.justia.com/owners/tanke-william-b-1286800)). Statut, territoire et validité **non vérifiés**.
- **Impact :** nom proche sur la même catégorie de produits ; risque à évaluer surtout si Aloessential devient une marque commerciale (produits propres, dépôt).
- **Vérification :** recherche d'antériorité INPI, EUIPO (eSearch), WIPO (Global Brand Database).
- **Recommandation :** faire faire une recherche d'antériorité avant d'investir dans la marque (dépôt, identité visuelle).

### R09 — Aucune donnée structurée · P1 · Confiance élevée
- **Preuve :** 0/29 pages avec `application/ld+json`.
- **Impact :** pas de signaux explicites d'entité (éditeur, site), d'article (date, auteur), de fil d'Ariane ; moins de contexte pour Google et les moteurs génératifs.
- **Vérification :** test des résultats enrichis de Google après déploiement.
- **Recommandation :** `Organization` + `WebSite` (accueil), `Article` (articles, avec auteur une fois R06 traité), `BreadcrumbList` (le fil d'Ariane HTML existe déjà). **Ne pas** ajouter `Review`/`AggregateRating` sans avis réels, ni de balisage `Product` présentant des offres que le site ne vend pas.

### R10 — Positionnement « aloe vera » faible dans l'architecture · P1 · Confiance moyenne
- **Preuve :** titre d'accueil « Aloessential — Naturellement essentiel » et H1 « Votre source bien-être naturelle », sans « aloe vera » ; rubriques génériques (Conseils, Santé, Beauté, Nutrition) ; 5 articles sur 14 traitent principalement de l'aloe vera.
- **Impact :** l'objectif « média de référence sur l'aloe vera et la beauté botanique » n'est pas lisible dans la structure ; pas de page pilier sur l'aloe.
- **Vérification :** données de requêtes GSC et volumes de recherche (outil externe) avant toute refonte.
- **Recommandation :** concevoir un pôle « Aloe vera » (page pilier + grappe) et une rubrique botanique ; réviser titre et H1 d'accueil. À décider sur données, pas sur intuition.

### R11 — Meta descriptions produit trop longues, titres produit peu informatifs · P2 · Confiance élevée
- **Preuve :** descriptions des 6 fiches entre 207 et 296 caractères (le `summary` sert de description, `src/pages/produits/[slug].astro`) ; titres réduits au nom LR (« Set vitalité · Aloessential »).
- **Impact :** extraits tronqués ; l'intention (avis, composition, mode d'emploi) n'apparaît pas dans le titre.
- **Vérification :** GSC > Performances (CTR par page) une fois les données disponibles.
- **Recommandation :** champ `seoTitle` / `seoDescription` optionnel, ou gabarit du type « {Nom} : composition, avis et mode d'emploi », description ≤ 155 caractères.

### R12 — Rubriques et hubs minces · P2 · Confiance élevée
- **Preuve :** `/rubriques/conseils/` ~110 mots et 2 articles ; autres rubriques 154 à 249 mots ; `/produits/` ~256 mots.
- **Impact :** pages de faible valeur propre ; risque de classement « Explorée, actuellement non indexée ».
- **Vérification :** GSC > Pages (motifs d'exclusion).
- **Recommandation :** texte d'introduction éditorial par rubrique, sélection d'articles piliers ; envisager de fusionner « Conseils » si elle reste petite.

### R13 — Open Graph incomplet · P2 · Confiance élevée
- **Preuve :** `src/layouts/BaseLayout.astro` n'émet que `og:title`, `og:description`, `og:type=website`.
- **Impact :** partages sans image ; articles typés « website ».
- **Recommandation :** `og:url` (après R03), `og:image` (couverture en PNG/JPG, le SVG n'étant pas toujours accepté), `og:locale=fr_FR`, `og:type=article` sur les articles.

### R14 — Données LR incohérentes · P2 · Confiance élevée
- **Preuve :** colonne « pour 100 ml » incohérente pour le zinc et le sélénium sur la fiche LR Immune Plus ; ingrédients de marketing absents de la liste INCI sur la fiche LR Platinum (brouillon) ; teneur en vitamine C du gel pêche donnée en % sans mg. Signalé dans les front matter concernés.
- **Impact :** une erreur de LR reprise par le site engagerait sa crédibilité ; les fiches peuvent changer sans préavis.
- **Vérification :** emballages ; revérification périodique (`sourceCheckedAt`).
- **Recommandation :** vérifier sur emballage ; fixer une fréquence de revérification (ex. trimestrielle) et un test d'alerte sur les `sourceCheckedAt` trop anciens.

### R15 — Contenu réglementaire daté · P2 · Confiance élevée
- **Preuve :** `aloe-vera-a-boire-comment-choisir.md` et `docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md` décrivent l'annulation partielle du règlement (UE) 2021/468 et l'appel C-38/25 P « toujours pendant ».
- **Impact :** devient faux dès que la Cour de justice statue.
- **Vérification :** CURIA, affaire C-38/25 P.
- **Recommandation :** date de mise à jour visible, rappel de revue.

### R16 — « Signalez-la-nous » sans moyen de contact · P1 · Confiance élevée
- **Preuve :** `src/pages/transparence.astro`, section « Une erreur ? » : aucune adresse, aucun formulaire ; pas de page contact.
- **Impact :** promesse non tenable ; signal de confiance manquant.
- **Recommandation :** adresse de contact (à fournir par l'éditeur) ou formulaire.

### R17 — Imprécision botanique · P3 · Confiance élevée
- **Preuve :** `aloe-vera-bienfaits-peau.md` : « plantes de la famille des liliacées ». Les classifications actuelles (APG IV) placent le genre *Aloe* dans les Asphodélacées.
- **Impact :** faible, mais contraire à l'ambition de référence botanique.
- **Recommandation :** corriger et sourcer.

### R18 — Slogans d'accueil vagues · P3 · Confiance moyenne
- **Preuve :** `src/pages/index.astro` : « Plus d'énergie au quotidien », « Des solutions saines et authentiques ».
- **Impact :** ne vise aucun produit, donc risque réglementaire faible ; mais formulations génériques qui ne différencient pas le média.
- **Recommandation :** reformuler en promesse éditoriale (« des informations vérifiées sur l'aloe vera… »).

### R19 — Visuels produits génériques · P3 · Confiance élevée
- **Preuve :** couvertures SVG générées (`tools/generate-covers.mjs`), volontairement différentes des emballages LR.
- **Impact :** pas de présence Google Images sur les produits ; conversion potentiellement plus faible. Les droits d'utilisation des photos LR sont **inconnus** (lié à R07).
- **Recommandation :** photos originales des produits (prises par l'éditeur), ou photos LR si les règles partenaires l'autorisent.

### R20 — Pas d'intégration continue · P2 · Confiance élevée
- **Preuve :** pas de `.github/workflows/` ; les garde-fous (ref=cros, brouillons, mentions obligatoires) ne s'exécutent qu'en local.
- **Recommandation :** exécuter `npm run build` et `npx playwright test` à chaque push ; ajouter des tests SEO (canonical, description ≤ 160, JSON-LD valide) une fois R03/R09 traités.

---

## Opportunités

### O01 — Base technique saine
HTML statique complet sans JavaScript, ~2 Ko de JS par page, aucune ressource tierce, tests de stabilité de mise en page, d'accessibilité clavier et de mouvement réduit. Bon socle pour l'exploration, la performance et les moteurs génératifs.

### O02 — Fiches produit documentées et prudentes
Composition par dose, sources officielles datées, allégations limitées au registre UE, rubriques « pour qui ce n'est pas le bon choix », brouillons bloqués tant que les données manquent. C'est un différenciateur rare sur des produits de vente directe, et un atout E-E-A-T dès que l'auteur sera identifié.

### O03 — Transparence d'affiliation intégrée
Mention près du premier CTA et du CTA final, page `/transparence/`, `rel="sponsored"`, `ref=cros` imposé par le schéma et testé. Conforme à l'esprit des règles de transparence publicitaire ; reste à formaliser l'identité de l'éditeur (R01).
