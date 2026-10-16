import type { APIRoute } from "astro";
import { categoryList } from "../data/categories";
import { getArticles } from "../lib/articles";
import { getPublishedProducts } from "../lib/products";
import { absoluteUrl } from "../lib/seo";

/*
 * XML sitemap of every indexable page (canonical URLs, trailing slash).
 * Drafts never appear: only published products get a page.
 */
export const GET: APIRoute = async ({ site }) => {
  const [articles, products] = await Promise.all([getArticles(), getPublishedProducts()]);
  const day = (d: Date) => d.toISOString().slice(0, 10);

  const entries: { path: string; lastmod?: string }[] = [
    { path: "/" },
    { path: "/articles/" },
    { path: "/produits/" },
    { path: "/aloe-vera/" },
    { path: "/transparence/" },
    { path: "/equipe/" },
    { path: "/contact/" },
    { path: "/mentions-legales/" },
    { path: "/confidentialite/" },
    ...categoryList.map((c) => ({ path: `/rubriques/${c.slug}/` })),
    ...articles.map((a) => ({ path: `/articles/${a.id}/`, lastmod: day(a.data.date) })),
    ...products.map((p) => ({
      path: `/produits/${p.id}/`,
      lastmod: p.data.sourceCheckedAt ? day(p.data.sourceCheckedAt) : undefined,
    })),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (e) => `  <url><loc>${absoluteUrl(e.path, site)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
