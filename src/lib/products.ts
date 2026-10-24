import { getCollection, getEntries, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, productPath, productsPath, type Locale } from "../i18n/locales";
import { productUi } from "../i18n/product-ui";
import type { Alternate, Article } from "./articles";

export type Product = CollectionEntry<"products">;

/**
 * Every published product page in every locale. Drafts never leave this
 * module. Fails the build if a translation names a French product that is not
 * published, sits in the wrong folder, or duplicates another one in its locale.
 */
async function publishedProducts(): Promise<Product[]> {
  const all = await getCollection("products", (p) => p.data.status === "published");
  const french = new Set(all.filter((p) => p.data.locale === DEFAULT_LOCALE).map((p) => p.id));
  const seen = new Set<string>();
  for (const p of all) {
    if (p.data.locale === DEFAULT_LOCALE) continue;
    if (!p.id.startsWith(`${p.data.locale}/`)) throw new Error(`${p.id}: a "${p.data.locale}" product must sit in src/content/products/${p.data.locale}/`);
    if (!french.has(p.data.translationOf!)) throw new Error(`${p.id}: translationOf "${p.data.translationOf}" is not a published French product`);
    const key = `${p.data.locale}:${p.data.translationOf}`;
    if (seen.has(key)) throw new Error(`${p.id}: a second "${p.data.locale}" translation of ${p.data.translationOf}`);
    seen.add(key);
  }
  return all;
}

/** Published products of one locale (French by default), by name. */
export async function getPublishedProducts(locale: Locale = DEFAULT_LOCALE): Promise<Product[]> {
  const all = (await publishedProducts()).filter((p) => p.data.locale === locale);
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, LOCALES[locale].dateLocale));
}

/** Locales other than French that have at least one published product page. */
export async function getProductLocales(): Promise<Locale[]> {
  const present = new Set((await publishedProducts()).map((p) => p.data.locale));
  return LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && present.has(l));
}

/** Resolve article → product references, keeping only published products. */
export async function resolvePublished(refs: { collection: "products"; id: string }[]): Promise<Product[]> {
  if (!refs.length) return [];
  const entries = await getEntries(refs);
  return entries.filter((p) => p.data.status === "published");
}

/**
 * Products shown with an article. French articles list them; a translation
 * shows the published products of its locale that translate the products of
 * its French source (translations cannot list products themselves).
 */
export async function productsForArticle(article: Article, source?: Article): Promise<Product[]> {
  if (article.data.locale === DEFAULT_LOCALE) return resolvePublished(article.data.products);
  if (!source) return [];
  const ids = new Set(source.data.products.map((ref) => ref.id));
  return (await getPublishedProducts(article.data.locale)).filter((p) => ids.has(p.data.translationOf!));
}

/** The product's slug in its own locale (file name). */
export function productSlug(product: Product): string {
  return product.id.split("/").pop()!;
}

export function productUrl(product: Product): string {
  return productPath(product.data.locale, productSlug(product));
}

/** Identity shared by a product and its translations: the French id. */
export function productKey(product: Product): string {
  return product.data.translationOf ?? product.id;
}

/** Published language versions of a product page, itself included, French first. */
export async function productAlternates(product: Product): Promise<Alternate[]> {
  const key = productKey(product);
  return (await publishedProducts())
    .filter((p) => productKey(p) === key)
    .map((p) => ({ locale: p.data.locale, hreflang: LOCALES[p.data.locale].htmlLang, path: productUrl(p) }))
    .sort((a, b) => LOCALE_CODES.indexOf(a.locale) - LOCALE_CODES.indexOf(b.locale));
}

/** The product listings of French and of every locale with product pages. */
export async function productsListingAlternates(): Promise<Alternate[]> {
  return [DEFAULT_LOCALE, ...(await getProductLocales())].map((locale) => ({
    locale,
    hreflang: LOCALES[locale].htmlLang,
    path: productsPath(locale),
  }));
}

export const KIND_LABEL: Record<Product["data"]["kind"], string> = productUi(DEFAULT_LOCALE).kind;

/** Mentions required on food supplement labelling in France (décret n° 2006-352, art. 10). */
export const SUPPLEMENT_MENTIONS = productUi(DEFAULT_LOCALE).supplementMentions;
