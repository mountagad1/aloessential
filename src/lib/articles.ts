import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, articlePath, type Locale } from "../i18n/locales";

export type Article = CollectionEntry<"articles">;

const byDate = (a: Article, b: Article) =>
  // Newest first; same-day articles by id (descending) so every build lists them in the same order.
  b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id);

/**
 * Every published article in every locale. Drafts (unreviewed translations)
 * never leave this module. Fails the build if a translation names a French
 * source that does not exist, or if two translations of the same source share
 * a locale.
 */
async function publishedArticles(): Promise<Article[]> {
  const all = (await getCollection("articles")).filter((a) => a.data.status === "published");
  const french = new Set(all.filter((a) => a.data.locale === DEFAULT_LOCALE).map((a) => a.id));
  const seen = new Set<string>();
  for (const a of all) {
    if (a.data.locale === DEFAULT_LOCALE) continue;
    if (!a.id.startsWith(`${a.data.locale}/`)) throw new Error(`${a.id}: a "${a.data.locale}" article must sit in src/content/articles/${a.data.locale}/`);
    if (!french.has(a.data.translationOf!)) throw new Error(`${a.id}: translationOf "${a.data.translationOf}" is not a published French article`);
    const key = `${a.data.locale}:${a.data.translationOf}`;
    if (seen.has(key)) throw new Error(`${a.id}: a second "${a.data.locale}" translation of ${a.data.translationOf}`);
    seen.add(key);
  }
  return all.sort(byDate);
}

/** Published articles of one locale (French by default), newest first. */
export async function getArticles(locale: Locale = DEFAULT_LOCALE): Promise<Article[]> {
  return (await publishedArticles()).filter((a) => a.data.locale === locale);
}

/** Locales other than French that have at least one published article. */
export async function getTranslatedLocales(): Promise<Locale[]> {
  const present = new Set((await publishedArticles()).map((a) => a.data.locale));
  return LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && present.has(l));
}

/** The article's slug in its own locale (file name). */
export function articleSlug(article: Article): string {
  return article.id.split("/").pop()!;
}

export function articleUrl(article: Article): string {
  return articlePath(article.data.locale, articleSlug(article));
}

/** Identity shared by an article and its translations: the French id. */
export function translationKey(article: Article): string {
  return article.data.translationOf ?? article.id;
}

export interface Alternate {
  locale: Locale;
  hreflang: string;
  path: string;
}

/**
 * Published language versions of an article, itself included, French first.
 * A single entry means "no translation": no hreflang is emitted then.
 */
export async function articleAlternates(article: Article): Promise<Alternate[]> {
  const key = translationKey(article);
  return (await publishedArticles())
    .filter((a) => translationKey(a) === key)
    .map((a) => ({ locale: a.data.locale, hreflang: LOCALES[a.data.locale].htmlLang, path: articleUrl(a) }))
    .sort((a, b) => LOCALE_CODES.indexOf(a.locale) - LOCALE_CODES.indexOf(b.locale));
}

/** Estimated reading time in minutes, at ~200 words per minute. */
export function readingTime(article: Article): number {
  const words = (article.body ?? "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const dateFormats = new Map<string, Intl.DateTimeFormat>();

export function formatDate(date: Date, locale: Locale = DEFAULT_LOCALE): string {
  const tag = LOCALES[locale].dateLocale;
  if (!dateFormats.has(tag)) dateFormats.set(tag, new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", year: "numeric" }));
  return dateFormats.get(tag)!.format(date);
}

/*
 * Hub pages (locale homepages, category pages) have equivalents in every
 * locale that publishes articles (in that category). Page 1 only: paginated
 * pages carry no hreflang.
 */
export async function homeAlternates(): Promise<Alternate[]> {
  return [DEFAULT_LOCALE, ...(await getTranslatedLocales())].map((locale) => ({
    locale,
    hreflang: LOCALES[locale].htmlLang,
    path: `${LOCALES[locale].prefix}/`,
  }));
}

export async function categoryAlternates(
  category: Article["data"]["category"],
  localizedSlug: (locale: Locale) => string,
): Promise<Alternate[]> {
  const published = await publishedArticles();
  return LOCALE_CODES.filter(
    (locale) => locale === DEFAULT_LOCALE || published.some((a) => a.data.locale === locale && a.data.category === category),
  ).map((locale) => {
    const l = LOCALES[locale];
    return { locale, hreflang: l.htmlLang, path: `${l.prefix}/${l.segments.categories}/${localizedSlug(locale)}/` };
  });
}
