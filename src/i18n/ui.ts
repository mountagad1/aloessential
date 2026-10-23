import type { Locale } from "./locales";

/*
 * Interface text per locale. A locale can only publish pages once its
 * dictionary exists here and is complete (enforced by `ui()` at build time
 * and by tests/i18n.spec.ts). French strings are the site's existing text.
 *
 * Italian, English (British), German and Spanish (Spain): written for the rollout; to be
 * reviewed by a native speaker before the first page in that language is
 * published (docs/i18n/TRANSLATION_WORKFLOW.md).
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

const en: UiStrings = {
  skipLink: "Skip to content",
  brandHome: "Aloessential — home",
  navLabel: "Topics",
  mobileNavLabel: "Main menu",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  home: "Home",
  allArticles: "All articles",
  breadcrumb: "Breadcrumb",
  publishedOn: "Published on",
  minRead: (n) => `${n} min read`,
  readCard: (n) => `Read · ${n} min`,
  by: "By",
  review: "Reviewed by",
  sources: "Sources",
  newTab: " (opens in a new tab)",
  disclaimer:
    "This article is for information only and does not replace advice from a doctor, pharmacist or dietitian. If in doubt, if you are pregnant, taking medication or have symptoms that persist, speak to a healthcare professional.",
  relatedEyebrow: "Read next",
  relatedTitle: "Keep reading",
  toc: "Contents",
  tocNav: "Article contents",
  pagination: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  pageStatus: (p, t) => `Page ${p} of ${t}`,
  pageSuffix: (p) => ` (page ${p})`,
  alsoIn: "Also available in:",
  footerTagline: "Naturally essential",
  footerCategories: "Topics",
  footerExplore: "Explore",
  footerLegal: (y) =>
    `© ${y} Aloessential. The content on this site is for information only and does not replace advice from a healthcare professional.`,
  shopLink: "Official LR shop",
  shopLinkHidden: " (partner link, opens in a new tab)",
  transparency: "Transparency and partner links",
  inFrench: " (in French)",
  frenchSite: "Aloessential in French",
  team: "Our team",
  contact: "Contact",
  legalNotice: "Legal notice",
  privacy: "Privacy",
  distributorFab: "Become an LR distributor",
  distributorEyebrow: "Join LR",
  distributorTitle: "Would you like to become an LR distributor?",
  distributorBody: (name) =>
    `${name}, publisher of Aloessential and independent LR Health & Beauty partner, answers your questions about becoming a distributor: status, getting started, support.`,
  distributorNote:
    "No obligation. Earnings depend entirely on your own activity: we promise no income.",
  distributorWhatsapp: "Message on WhatsApp",
  distributorMessage: (name) =>
    `Hello ${name}, I found Aloessential and would like to know more about becoming an LR distributor.`,
  close: "Close",
  homeEyebrow: "The magazine",
  homeTitle: "All articles",
  homeDescription: "All Aloessential articles in English: everyday advice, health, beauty and nutrition, the natural way.",
  homeLead: (n) => (n === 1 ? "1 article to help you look after yourself, naturally." : `${n} articles to help you look after yourself, naturally.`),
  categoryEyebrow: "Topic",
  filterLabel: "Filter by topic",
  all: "All",
};

const de: UiStrings = {
  skipLink: "Zum Inhalt springen",
  brandHome: "Aloessential — Startseite",
  navLabel: "Rubriken",
  mobileNavLabel: "Hauptmenü",
  menuOpen: "Menü öffnen",
  menuClose: "Menü schließen",
  home: "Startseite",
  allArticles: "Alle Artikel",
  breadcrumb: "Brotkrumennavigation",
  publishedOn: "Veröffentlicht am",
  minRead: (n) => `${n} Min. Lesezeit`,
  readCard: (n) => `Lesen · ${n} Min.`,
  by: "Von",
  review: "Geprüft von",
  sources: "Quellen",
  newTab: " (öffnet in neuem Tab)",
  disclaimer:
    "Dieser Artikel dient der Information und ersetzt nicht den Rat einer Ärztin, eines Arztes, einer Apothekerin oder eines Apothekers. Bei Zweifeln, in der Schwangerschaft, bei laufender Behandlung oder anhaltenden Beschwerden wenden Sie sich bitte an medizinisches Fachpersonal.",
  relatedEyebrow: "Auch lesenswert",
  relatedTitle: "Weiterlesen",
  toc: "Inhalt",
  tocNav: "Inhalt des Artikels",
  pagination: "Seitennavigation",
  previousPage: "Vorherige Seite",
  nextPage: "Nächste Seite",
  pageStatus: (p, t) => `Seite ${p} von ${t}`,
  pageSuffix: (p) => ` (Seite ${p})`,
  alsoIn: "Auch verfügbar auf:",
  footerTagline: "Natürlich essenziell",
  footerCategories: "Rubriken",
  footerExplore: "Entdecken",
  footerLegal: (y) =>
    `© ${y} Aloessential. Die Inhalte dieser Website dienen der Information und ersetzen nicht den Rat medizinischen Fachpersonals.`,
  shopLink: "Offizieller LR-Shop",
  shopLinkHidden: " (Partnerlink, öffnet in neuem Tab)",
  transparency: "Transparenz und Partnerlinks",
  inFrench: " (auf Französisch)",
  frenchSite: "Aloessential auf Französisch",
  team: "Unser Team",
  contact: "Kontakt",
  legalNotice: "Impressum",
  privacy: "Datenschutz",
  distributorFab: "LR-Vertriebspartner werden",
  distributorEyebrow: "Partner von LR werden",
  distributorTitle: "Möchten Sie LR-Vertriebspartner werden?",
  distributorBody: (name) =>
    `${name}, Herausgeber von Aloessential und unabhängiger Partner von LR Health & Beauty, beantwortet Ihre Fragen zur Tätigkeit als Vertriebspartner: Status, Einstieg, Begleitung.`,
  distributorNote:
    "Unverbindlicher Austausch. Die Einnahmen hängen vollständig von Ihrer eigenen Tätigkeit ab: Wir versprechen keine Verdienste.",
  distributorWhatsapp: "Per WhatsApp schreiben",
  distributorMessage: (name) =>
    `Hallo ${name}, ich habe Aloessential entdeckt und möchte mehr über die Tätigkeit als LR-Vertriebspartner erfahren.`,
  close: "Schließen",
  homeEyebrow: "Das Magazin",
  homeTitle: "Alle Artikel",
  homeDescription: "Alle Artikel von Aloessential auf Deutsch: Tipps, Gesundheit, Schönheit und Ernährung auf natürliche Weise.",
  homeLead: (n) => (n === 1 ? "1 Artikel, um natürlich gut für sich zu sorgen." : `${n} Artikel, um natürlich gut für sich zu sorgen.`),
  categoryEyebrow: "Rubrik",
  filterLabel: "Nach Rubrik filtern",
  all: "Alle",
};

const es: UiStrings = {
  skipLink: "Ir al contenido",
  brandHome: "Aloessential — inicio",
  navLabel: "Secciones",
  mobileNavLabel: "Menú principal",
  menuOpen: "Abrir el menú",
  menuClose: "Cerrar el menú",
  home: "Inicio",
  allArticles: "Todos los artículos",
  breadcrumb: "Ruta de navegación",
  publishedOn: "Publicado el",
  minRead: (n) => `${n} min de lectura`,
  readCard: (n) => `Leer · ${n} min`,
  by: "Por",
  review: "Revisado por",
  sources: "Fuentes",
  newTab: " (se abre en una pestaña nueva)",
  disclaimer:
    "Este artículo es informativo y no sustituye la opinión de un médico, un farmacéutico o un dietista-nutricionista. Si tienes dudas, estás embarazada, sigues un tratamiento o tienes síntomas que no desaparecen, consulta a un profesional sanitario.",
  relatedEyebrow: "Te puede interesar",
  relatedTitle: "Sigue leyendo",
  toc: "Índice",
  tocNav: "Índice del artículo",
  pagination: "Paginación",
  previousPage: "Página anterior",
  nextPage: "Página siguiente",
  pageStatus: (p, t) => `Página ${p} de ${t}`,
  pageSuffix: (p) => ` (página ${p})`,
  alsoIn: "También disponible en:",
  footerTagline: "Naturalmente esencial",
  footerCategories: "Secciones",
  footerExplore: "Explorar",
  footerLegal: (y) =>
    `© ${y} Aloessential. Los contenidos de este sitio son informativos y no sustituyen la opinión de un profesional sanitario.`,
  shopLink: "Tienda oficial de LR",
  shopLinkHidden: " (enlace de afiliado, se abre en una pestaña nueva)",
  transparency: "Transparencia y enlaces de afiliado",
  inFrench: " (en francés)",
  frenchSite: "Aloessential en francés",
  team: "Nuestro equipo",
  contact: "Contacto",
  legalNotice: "Aviso legal",
  privacy: "Privacidad",
  distributorFab: "Hazte distribuidor de LR",
  distributorEyebrow: "Únete a LR",
  distributorTitle: "¿Quieres ser distribuidor de LR?",
  distributorBody: (name) =>
    `${name}, editor de Aloessential y socio independiente de LR Health & Beauty, responde a tus preguntas sobre la actividad de distribuidor: modalidades, primeros pasos, acompañamiento.`,
  distributorNote:
    "Sin compromiso. Los ingresos dependen por completo de tu propia actividad: no prometemos ninguna ganancia.",
  distributorWhatsapp: "Escribir por WhatsApp",
  distributorMessage: (name) =>
    `Hola ${name}, he descubierto Aloessential y me gustaría saber más sobre la actividad de distribuidor de LR.`,
  close: "Cerrar",
  homeEyebrow: "La revista",
  homeTitle: "Todos los artículos",
  homeDescription: "Todos los artículos de Aloessential en español: consejos, salud, belleza y nutrición de forma natural.",
  homeLead: (n) => (n === 1 ? "1 artículo para cuidarte de forma natural." : `${n} artículos para cuidarte de forma natural.`),
  categoryEyebrow: "Sección",
  filterLabel: "Filtrar por sección",
  all: "Todos",
};

export const UI: Partial<Record<Locale, UiStrings>> = { fr, it, en, de, es };

/** Interface strings for a locale. Throws if the locale has no dictionary yet. */
export function ui(locale: Locale): UiStrings {
  const strings = UI[locale];
  if (!strings) throw new Error(`No interface text for locale "${locale}": add it to src/i18n/ui.ts before publishing`);
  return strings;
}
