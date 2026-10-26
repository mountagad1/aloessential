// Internal linking and content inventory audit of a built site.
//   npm run build && node tools/seo-audit.mjs [dist] [--json]
// Reads the static HTML (no network, no dependencies) and reports, per locale:
// - every indexable page and its type;
// - inbound internal links: editorial (in the body text, .prose), card links
//   (related articles, product cards) and navigation (header, footer,
//   breadcrumbs, language switcher);
// - pages no other page links to from its body or a card ("editorial orphans");
// - broken internal links and body links that leave the page's language.
// Deterministic: the same build gives the same report. It changes nothing.
// docs/growth/INTERNAL_LINKING_STRATEGY.md

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, LOCALE_CODES, DEFAULT_LOCALE } from "../src/i18n/locales.ts";

const args = process.argv.slice(2);
const dist = args.find((a) => !a.startsWith("--")) ?? "dist";
const asJson = args.includes("--json");
if (!existsSync(dist)) throw new Error(`${dist} not found: run npm run build first`);

const files = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : n === "index.html" ? [p] : [];
  });
const pathOf = (file) => file.slice(dist.length).replace(/index\.html$/, "") || "/";
const localeOf = (path) =>
  LOCALE_CODES.find((l) => l !== DEFAULT_LOCALE && path.startsWith(`${LOCALES[l].prefix}/`)) ?? DEFAULT_LOCALE;

function typeOf(path) {
  const l = LOCALES[localeOf(path)];
  const rest = path.slice(l.prefix.length);
  if (rest === "/") return "home";
  if (/^\/\d+\/$/.test(rest) || /\/\d+\/$/.test(rest)) return "pagination";
  if (rest.startsWith(`/${l.segments.articles}/`)) return rest === `/${l.segments.articles}/` ? "listing" : "article";
  if (rest.startsWith(`/${l.segments.categories}/`)) return "category";
  if (rest.startsWith(`/${l.segments.products}/`)) return rest === `/${l.segments.products}/` ? "product-listing" : "product";
  return "page";
}

const hrefs = (html) => [...html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)[^"]*"[^>]*>/g)].map((m) => m[1]);
/** Links that leave the page's language without saying so (no hreflang on the link). */
const undeclared = (html) =>
  [...html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)[^"]*"[^>]*>/g)].filter((m) => !/\bhreflang="/.test(m[0])).map((m) => m[1]);
const region = (html, re) => [...html.matchAll(re)].map((m) => m[0]).join("\n");

const pages = new Map();
for (const file of files(dist)) {
  const html = readFileSync(file, "utf8");
  const path = pathOf(file);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  // Body text (articles, products, guides) and cards (related content, product callouts).
  const prose = region(html, /<div class="(?:disclaimer )?prose"[\s\S]*?<\/div>\s*(?=<\/section>|<\/div>|<section|<aside|<footer|<nav)/g);
  const cards = region(html, /<article class="(?:card|card product-card|featured)"[\s\S]*?<\/article>/g);
  pages.set(path, {
    path,
    locale: localeOf(path),
    type: typeOf(path),
    title,
    words: (html.match(/<div class="prose"[\s\S]*?<\/div>/)?.[0].replace(/<[^>]+>/g, " ").match(/\S+/g) ?? []).length,
    body: [...new Set(hrefs(prose))].filter((h) => h !== path),
    bodyUndeclared: [...new Set(undeclared(prose))],
    cards: [...new Set(hrefs(cards))].filter((h) => h !== path),
    all: [...new Set(hrefs(html))],
  });
}

const inbound = (target, kind) => [...pages.values()].filter((p) => p.path !== target && p[kind].includes(target)).length;
const rows = [...pages.values()].map((p) => ({
  ...p,
  inBody: inbound(p.path, "body"),
  inCards: inbound(p.path, "cards"),
  inAll: inbound(p.path, "all"),
}));

const broken = [];
const crossLocale = [];
for (const p of pages.values()) {
  for (const h of p.all) if (!h.includes(".") && !existsSync(join(dist, h, "index.html"))) broken.push(`${p.path} → ${h}`);
  for (const h of p.bodyUndeclared) if (localeOf(h) !== p.locale) crossLocale.push(`${p.path} → ${h}`);
}

const editorial = rows.filter((r) => ["article", "product", "page"].includes(r.type));
const orphans = editorial.filter((r) => r.inBody + r.inCards === 0);
const report = {
  pages: rows.length,
  byLocale: Object.fromEntries(LOCALE_CODES.map((l) => [l, rows.filter((r) => r.locale === l).length])),
  byType: rows.reduce((acc, r) => ((acc[r.type] = (acc[r.type] ?? 0) + 1), acc), {}),
  broken,
  crossLocaleBodyLinks: crossLocale,
  editorialOrphans: orphans.map((r) => r.path),
  weakestArticles: editorial
    .filter((r) => r.type === "article")
    .sort((a, b) => a.inBody - b.inBody || a.inCards - b.inCards)
    .slice(0, 15)
    .map(({ path, inBody, inCards, inAll, words }) => ({ path, inBody, inCards, inAll, words })),
  bodyLinksPerArticle: Object.fromEntries(
    LOCALE_CODES.map((l) => {
      const a = rows.filter((r) => r.locale === l && r.type === "article");
      return [l, a.length ? +(a.reduce((s, r) => s + r.body.length, 0) / a.length).toFixed(2) : 0];
    }),
  ),
};

if (asJson) {
  console.log(JSON.stringify({ report, rows }, null, 2));
} else {
  console.log(`# Internal linking audit (${dist})\n`);
  console.log(`Indexable pages: ${report.pages}`);
  console.log(`By locale: ${JSON.stringify(report.byLocale)}`);
  console.log(`By type: ${JSON.stringify(report.byType)}`);
  console.log(`Average body links per article, by locale: ${JSON.stringify(report.bodyLinksPerArticle)}`);
  console.log(`\nBroken internal links: ${broken.length}`);
  broken.slice(0, 20).forEach((b) => console.log(`  ${b}`));
  console.log(`Body links leaving the page's language without hreflang: ${crossLocale.length}`);
  crossLocale.slice(0, 20).forEach((b) => console.log(`  ${b}`));
  console.log(`\nEditorial orphans (no body or card link from another page): ${orphans.length}`);
  orphans.forEach((o) => console.log(`  ${o.path}`));
  console.log(`\nArticles with the fewest body links pointing to them:`);
  for (const r of report.weakestArticles) console.log(`  ${String(r.inBody).padStart(2)} body · ${String(r.inCards).padStart(2)} card · ${String(r.inAll).padStart(3)} total  ${r.path}`);
}
