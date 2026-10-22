import type { Locale } from "./locales";

/*
 * Interface text per locale. A locale can only publish pages once its
 * dictionary exists here and is complete (enforced by `ui()` at build time
 * and by tests/i18n.spec.ts). French strings are the site's existing text.
 *
 * Italian: written for the first rollout; to be reviewed by a native speaker
 * before the first Italian page is published (INTERNATIONAL_SEO_ARCHITECTURE.md).
 */

export interface UiStrings {
  skipLink: string;
  brandHome: string;
  navLabel: string;
  mobileNavLabel: string;
  menuOpen: string;
  menuClose: string;
  home: string;
  allArticles: string;
  breadcrumb: string;
  publishedOn: string;
  minRead: (n: number) => string;
  readCard: (n: number) => string;
  by: string;
  review: string;
  sources: string;
  newTab: string;
  disclaimer: string;
  relatedEyebrow: string;
  relatedTitle: string;
  toc: string;
  tocNav: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  pageStatus: (page: number, total: number) => string;
  pageSuffix: (page: number) => string;
  alsoIn: string;
  footerTagline: string;
  footerCategories: string;
  footerExplore: string;
  footerLegal: (year: number) => string;
  /** LR shop link in the footer (partner link). */
  shopLink: string;
  shopLinkHidden: string;
  transparency: string;
  /** Pages that only exist in French, linked from other locales. */
  inFrench: string;
  frenchSite: string;
  team: string;
  contact: string;
  legalNotice: string;
  privacy: string;
  distributorFab: string;
  distributorEyebrow: string;
  distributorTitle: string;
  distributorBody: (name: string) => string;
  distributorNote: string;
  distributorWhatsapp: string;
  distributorMessage: (name: string) => string;
  close: string;
  /** Locale homepage (non-default locales: the article listing). */
  homeEyebrow: string;
  homeTitle: string;
  homeDescription: string;
  homeLead: (count: number) => string;
  categoryEyebrow: string;
  filterLabel: string;
  all: string;
}

const fr: UiStrings = {
  skipLink: "Aller au contenu",
  brandHome: "Aloessential — accueil",
  navLabel: "Rubriques",
  mobileNavLabel: "Menu principal",
  menuOpen: "Ouvrir le menu",
  menuClose: "Fermer le menu",
  home: "Accueil",
  allArticles: "Tous les articles",
  breadcrumb: "Fil d'Ariane",
  publishedOn: "Publié le",
  minRead: (n) => `${n} min de lecture`,
  readCard: (n) => `Lire · ${n} min`,
  by: "Par",
  review: "Relecture :",
  sources: "Sources",
  newTab: " (nouvel onglet)",
  disclaimer:
    "Cet article est informatif et ne remplace pas l'avis d'un médecin, d'un pharmacien ou d'un diététicien. En cas de doute, de grossesse, de traitement en cours ou de symptômes persistants, consultez un professionnel de santé.",
  relatedEyebrow: "À lire aussi",
  relatedTitle: "Poursuivre la lecture",
  toc: "Sommaire",
  tocNav: "Sommaire de l'article",
  pagination: "Pagination",
  previousPage: "Page précédente",
  nextPage: "Page suivante",
  pageStatus: (p, t) => `Page ${p} sur ${t}`,
  pageSuffix: (p) => ` (page ${p})`,
  alsoIn: "Également disponible en :",
  footerTagline: "Naturellement essentiel",
  footerCategories: "Rubriques",
  footerExplore: "Explorer",
  footerLegal: (y) =>
    `© ${y} Aloessential. Les contenus de ce site sont informatifs et ne remplacent pas l'avis d'un professionnel de santé.`,
  shopLink: "Boutique officielle LR",
  shopLinkHidden: " (lien partenaire, nouvel onglet)",
  transparency: "Transparence et liens partenaires",
  inFrench: "",
  frenchSite: "",
  team: "L'équipe",
  contact: "Contact",
  legalNotice: "Mentions légales",
  privacy: "Confidentialité",
  distributorFab: "Devenir distributeur LR",
  distributorEyebrow: "Rejoindre LR",
  distributorTitle: "Vous voulez devenir distributeur LR ?",
  distributorBody: (name) =>
    `${name}, éditeur d'Aloessential et partenaire indépendant LR Health & Beauty, répond à vos questions sur l'activité de distributeur : statut, démarrage, accompagnement.`,
  distributorNote:
    "Échange sans engagement. Les revenus dépendent entièrement de votre activité : nous ne promettons aucun gain.",
  distributorWhatsapp: "Écrire sur WhatsApp",
  distributorMessage: (name) =>
    `Bonjour ${name}, je découvre Aloessential et j'aimerais en savoir plus sur l'activité de distributeur LR.`,
  close: "Fermer",
  homeEyebrow: "Le magazine",
  homeTitle: "Tous les articles",
  homeDescription: "Tous les articles Aloessential : conseils, santé, beauté et nutrition au naturel.",
  homeLead: (n) => `${n} articles pour prendre soin de soi, naturellement.`,
  categoryEyebrow: "Rubrique",
  filterLabel: "Filtrer par rubrique",
  all: "Tout",
};

const it: UiStrings = {
  skipLink: "Vai al contenuto",
  brandHome: "Aloessential — home",
  navLabel: "Rubriche",
  mobileNavLabel: "Menu principale",
  menuOpen: "Apri il menu",
  menuClose: "Chiudi il menu",
  home: "Home",
  allArticles: "Tutti gli articoli",
  breadcrumb: "Percorso",
  publishedOn: "Pubblicato il",
  minRead: (n) => `${n} min di lettura`,
  readCard: (n) => `Leggi · ${n} min`,
  by: "Di",
  review: "Revisione:",
  sources: "Fonti",
  newTab: " (nuova scheda)",
  disclaimer:
    "Questo articolo ha scopo informativo e non sostituisce il parere di un medico, di un farmacista o di un dietista. In caso di dubbi, gravidanza, terapie in corso o sintomi persistenti, rivolgiti a un professionista sanitario.",
  relatedEyebrow: "Da leggere anche",
  relatedTitle: "Continua a leggere",
  toc: "Indice",
  tocNav: "Indice dell'articolo",
  pagination: "Paginazione",
  previousPage: "Pagina precedente",
  nextPage: "Pagina successiva",
  pageStatus: (p, t) => `Pagina ${p} di ${t}`,
  pageSuffix: (p) => ` (pagina ${p})`,
  alsoIn: "Disponibile anche in:",
  footerTagline: "Naturalmente essenziale",
  footerCategories: "Rubriche",
  footerExplore: "Esplora",
  footerLegal: (y) =>
    `© ${y} Aloessential. I contenuti di questo sito hanno scopo informativo e non sostituiscono il parere di un professionista sanitario.`,
  shopLink: "Negozio ufficiale LR",
  shopLinkHidden: " (link partner, nuova scheda)",
  transparency: "Trasparenza e link partner",
  inFrench: " (in francese)",
  frenchSite: "Aloessential in francese",
  team: "La redazione",
  contact: "Contatti",
  legalNotice: "Note legali",
  privacy: "Privacy",
  distributorFab: "Diventa distributore LR",
  distributorEyebrow: "Entra in LR",
  distributorTitle: "Vuoi diventare distributore LR?",
  distributorBody: (name) =>
    `${name}, editore di Aloessential e partner indipendente LR Health & Beauty, risponde alle tue domande sull'attività di distributore: inquadramento, avvio, affiancamento.`,
  distributorNote:
    "Contatto senza impegno. I ricavi dipendono interamente dalla tua attività: non promettiamo alcun guadagno.",
  distributorWhatsapp: "Scrivi su WhatsApp",
  distributorMessage: (name) =>
    `Buongiorno ${name}, ho scoperto Aloessential e vorrei saperne di più sull'attività di distributore LR.`,
  close: "Chiudi",
  homeEyebrow: "Il magazine",
  homeTitle: "Tutti gli articoli",
  homeDescription: "Tutti gli articoli di Aloessential in italiano: consigli, salute, bellezza e nutrizione al naturale.",
  homeLead: (n) => (n === 1 ? "1 articolo per prenderti cura di te, in modo naturale." : `${n} articoli per prenderti cura di te, in modo naturale.`),
  categoryEyebrow: "Rubrica",
  filterLabel: "Filtra per rubrica",
  all: "Tutti",
};

export const UI: Partial<Record<Locale, UiStrings>> = { fr, it };

/** Interface strings for a locale. Throws if the locale has no dictionary yet. */
export function ui(locale: Locale): UiStrings {
  const strings = UI[locale];
  if (!strings) throw new Error(`No interface text for locale "${locale}": add it to src/i18n/ui.ts before publishing`);
  return strings;
}
