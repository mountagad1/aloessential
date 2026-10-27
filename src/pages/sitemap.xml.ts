import type { APIRoute } from "astro";
import { categoryList, localizedCategory } from "../data/categories";
import {
  articleAlternates,
  articleUrl,
  categoryAlternates,
  getArticles,
  getTranslatedLocales,
  homeAlternates,
  type Alternate,
} from "../lib/articles";
import { getPublishedProducts, productAlternates, productUrl, productsListingAlternates } from "../lib/products";
import { absoluteUrl } from "../lib/seo";
import { listingPages } from "../lib/pagination";
import { DEFAULT_LOCALE, categoryPath, homePath, productsPath } from "../i18n/locales";
import { WATERING_UI, wateringAlternates } from "../i18n/watering-ui";
import { WATER_UI, waterAlternates } from "../i18n/water-ui";

/*
 * XML sitemap of every indexable page (canonical URLs, trailing slash), in
 * every published locale. Drafts never appear: only published products and
 * published translations get a page. Language versions are listed as
 * xhtml:link alternates from the same functions that write the HTML hreflang
 * tags, so the two cannot disagree.
 */
export const GET: APIRoute = async ({ site }) => {
  const [articles, products, locales, homeAlts, productsAlts] = await Promise.all([
    getArticles(),
    getPublishedProducts(),
    getTranslatedLocales(),
    homeAlternates(),
    productsListingAlternates(),
  ]);
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const productEntry = async (p: (typeof products)[number]) => ({
    path: productUrl(p),
    lastmod: p.data.sourceCheckedAt ? day(p.data.sourceCheckedAt) : undefined,
    alternates: await productAlternates(p),
  });
  const categoryAlts = Object.fromEntries(
    await Promise.all(
      categoryList.map(async (c) => [c.slug, await categoryAlternates(c.slug, (l) => localizedCategory(c.slug, l).slug)] as const),
    ),
  );

  const entries: { path: string; lastmod?: string; alternates?: Alternate[] }[] = [
    ...listingPages("/", 1).map(({ path }) => ({ path, alternates: homeAlts })),
    ...listingPages("/articles/", articles.length).map(({ path }) => ({ path })),
    { path: "/produits/", alternates: productsAlts },
    { path: "/aloe-vera/" },
    { path: WATERING_UI[DEFAULT_LOCALE].path, alternates: wateringAlternates(locales) },
    { path: WATER_UI[DEFAULT_LOCALE].path, alternates: waterAlternates(locales) },
    { path: "/transparence/" },
    { path: "/equipe/" },
    { path: "/contact/" },
    { path: "/mentions-legales/" },
    { path: "/confidentialite/" },
    ...categoryList.flatMap((c) =>
      listingPages(`/rubriques/${c.slug}/`, articles.filter((a) => a.data.category === c.slug).length).map(({ path, page }) => ({
        path,
        alternates: page === 1 ? categoryAlts[c.slug] : undefined,
      })),
    ),
    ...(await Promise.all(
      articles.map(async (a) => ({ path: articleUrl(a), lastmod: day(a.data.date), alternates: await articleAlternates(a) })),
    )),
    ...(await Promise.all(products.map(productEntry))),
  ];

  for (const locale of locales) {
    const local = await getArticles(locale);
    entries.push(...listingPages(homePath(locale), local.length).map(({ path, page }) => ({ path, alternates: page === 1 ? homeAlts : undefined })));
    for (const c of categoryList) {
      const count = local.filter((a) => a.data.category === c.slug).length;
      if (!count) continue;
      const base = categoryPath(locale, localizedCategory(c.slug, locale).slug);
      entries.push(...listingPages(base, count).map(({ path, page }) => ({ path, alternates: page === 1 ? categoryAlts[c.slug] : undefined })));
    }
    for (const a of local) {
      entries.push({ path: articleUrl(a), lastmod: day(a.data.date), alternates: await articleAlternates(a) });
    }
    const localProducts = await getPublishedProducts(locale);
    if (localProducts.length) entries.push({ path: productsPath(locale), alternates: productsAlts });
    entries.push(...(await Promise.all(localProducts.map(productEntry))));
    entries.push({ path: WATERING_UI[locale].path, alternates: wateringAlternates(locales) });
    entries.push({ path: WATER_UI[locale].path, alternates: waterAlternates(locales) });
  }

  const links = (alternates: Alternate[] | undefined) => {
    if (!alternates || alternates.length < 2) return "";
    const xDefault = alternates.find((a) => a.locale === DEFAULT_LOCALE);
    return [
      ...alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${absoluteUrl(a.path, site)}"/>`),
      ...(xDefault ? [`<xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(xDefault.path, site)}"/>`] : []),
    ].join("");
  };
  const multilingual = entries.some((e) => (e.alternates?.length ?? 0) > 1);

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    multilingual
      ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
      : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (e) =>
        `  <url><loc>${absoluteUrl(e.path, site)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${links(e.alternates)}</url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
