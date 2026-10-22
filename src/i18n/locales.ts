/*
 * Single source of truth for the site's locales.
 * docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md
 *
 * French is the source language and lives at the root (no prefix). Every
 * other locale lives under its own prefix (/it/, /en/, …). A locale only gets
 * pages once it has at least one *published* translation: no empty locale
 * homepages, no fallback to French under a foreign prefix.
 *
 * Pure data and functions, no Astro imports: shared by routes, the sitemap
 * and the tests.
 */

export const LOCALE_CODES = ["fr", "en", "es", "de", "it", "pt-pt", "pl"] as const;
export type Locale = (typeof LOCALE_CODES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export interface LocaleInfo {
  code: Locale;
  /** URL prefix, "" for the default locale. */
  prefix: string;
  /** <html lang>, also used for hreflang. */
  htmlLang: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** schema.org inLanguage. */
  schemaLang: string;
  /** Intl locale for dates. */
  dateLocale: string;
  /** Name of the language in that language (language switchers). */
  name: string;
  /** Localized path segments. */
  segments: { articles: string; categories: string };
}

export const LOCALES: Record<Locale, LocaleInfo> = {
  fr: {
    code: "fr",
    prefix: "",
    htmlLang: "fr",
    ogLocale: "fr_FR",
    schemaLang: "fr-FR",
    dateLocale: "fr-FR",
    name: "Français",
    segments: { articles: "articles", categories: "rubriques" },
  },
  en: {
    code: "en",
    prefix: "/en",
    htmlLang: "en",
    ogLocale: "en_GB",
    schemaLang: "en",
    dateLocale: "en-GB",
    name: "English",
    segments: { articles: "articles", categories: "topics" },
  },
  es: {
    code: "es",
    prefix: "/es",
    htmlLang: "es",
    ogLocale: "es_ES",
    schemaLang: "es-ES",
    dateLocale: "es-ES",
    name: "Español",
    segments: { articles: "articulos", categories: "secciones" },
  },
  de: {
    code: "de",
    prefix: "/de",
    htmlLang: "de",
    ogLocale: "de_DE",
    schemaLang: "de-DE",
    dateLocale: "de-DE",
    name: "Deutsch",
    segments: { articles: "artikel", categories: "rubriken" },
  },
  it: {
    code: "it",
    prefix: "/it",
    htmlLang: "it",
    ogLocale: "it_IT",
    schemaLang: "it-IT",
    dateLocale: "it-IT",
    name: "Italiano",
    segments: { articles: "articoli", categories: "rubriche" },
  },
  "pt-pt": {
    code: "pt-pt",
    prefix: "/pt-pt",
    htmlLang: "pt-PT",
    ogLocale: "pt_PT",
    schemaLang: "pt-PT",
    dateLocale: "pt-PT",
    name: "Português",
    segments: { articles: "artigos", categories: "rubricas" },
  },
  pl: {
    code: "pl",
    prefix: "/pl",
    htmlLang: "pl",
    ogLocale: "pl_PL",
    schemaLang: "pl-PL",
    dateLocale: "pl-PL",
    name: "Polski",
    segments: { articles: "artykuly", categories: "dzialy" },
  },
};

/** "/" for French, "/it/" for Italian. */
export function homePath(locale: Locale): string {
  return `${LOCALES[locale].prefix}/`;
}

/** "/articles/<slug>/" (fr) or "/it/articoli/<slug>/". */
export function articlePath(locale: Locale, slug: string): string {
  const l = LOCALES[locale];
  return `${l.prefix}/${l.segments.articles}/${slug}/`;
}

/** "/rubriques/<slug>/" (fr) or "/it/rubriche/<slug>/" — slug already localized. */
export function categoryPath(locale: Locale, localizedSlug: string): string {
  const l = LOCALES[locale];
  return `${l.prefix}/${l.segments.categories}/${localizedSlug}/`;
}
