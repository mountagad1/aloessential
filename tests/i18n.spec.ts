import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "./fixtures";
import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES } from "../src/i18n/locales";
import { UI } from "../src/i18n/ui";
import { productUi } from "../src/i18n/product-ui";
import { WATERING_UI } from "../src/i18n/watering-ui";
import { WATER_UI } from "../src/i18n/water-ui";
import { FIBRE_UI } from "../src/i18n/fibre-ui";

/** Tool pages a translation may link to, in its own language (watering planner, water calculator, fibre table). */
const toolPaths = (locale: string) =>
  [WATERING_UI, WATER_UI, FIBRE_UI].map((tool) => tool[locale as keyof typeof tool]?.path).filter(Boolean);
import { CATEGORY_I18N, CATEGORY_SLUGS } from "../src/data/categories";
// @ts-expect-error plain .mjs helper shared with tools/i18n-status.mjs
import { freshness, parseMarkdown, translations } from "../tools/i18n-lib.mjs";
import { LR_SHOP_PATH } from "../src/i18n/locales";

/*
 * International SEO regression checks (docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md).
 * The test build includes a fictional translation of the demo article in
 * every supported locale (tests/fixtures/articles/<locale>/) and an unreviewed Italian
 * draft (bozza-demo.md) that must never surface. Every check runs for each
 * published test locale described in PUBLISHED below.
 */
const ORIGIN = "https://aloessential.com";
const dist = join(process.cwd(), "dist-test");

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
const pathOf = (file: string) => file.replace(dist, "").replace(/index\.html$/, "");
const pages = () => htmlFiles(dist).filter((f) => !f.endsWith("404.html"));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const exists = (path: string) => existsSync(join(dist, path, "index.html"));
const localeOf = (path: string) =>
  LOCALE_CODES.find((l) => l !== DEFAULT_LOCALE && path.startsWith(`${LOCALES[l].prefix}/`)) ?? DEFAULT_LOCALE;

/** The locales published in the test build, and what their pages must show. */
const PUBLISHED = {
  it: {
    home: "/it/",
    article: "/it/articoli/articolo-demo/",
    category: "/it/rubriche/salute/",
    categoryLabel: "Salute",
    // Italian is published for real (src/content/articles/it/): every Italian category holds articles.
    emptyCategories: [],
    body: "Paragrafo di prova in italiano",
    name: "Italiano",
    fab: "Diventa distributore LR",
    whatsapp: /text=Buongiorno%20Philippe/,
    shopLabel: "Negozio ufficiale LR",
    shopUrl: "https://shop.lrworld.com/home/IT/it?ref=cros",
    transparency: "Trasparenza e link partner",
    menu: ["Apri il menu", "Chiudi il menu"],
  },
  en: {
    home: "/en/",
    article: "/en/articles/demo-article/",
    category: "/en/topics/health/",
    categoryLabel: "Health",
    // English is published for real (src/content/articles/en/): every English category holds articles.
    emptyCategories: [],
    body: "Test paragraph in English",
    name: "English",
    fab: "Become an LR distributor",
    whatsapp: /text=Hello%20Philippe/,
    shopLabel: "Official LR shop",
    shopUrl: "https://shop.lrworld.com/home/GB/en?ref=cros",
    transparency: "Transparency and partner links",
    menu: ["Open menu", "Close menu"],
  },
  de: {
    home: "/de/",
    article: "/de/artikel/demo-artikel/",
    category: "/de/rubriken/gesundheit/",
    categoryLabel: "Gesundheit",
    // German is published for real (src/content/articles/de/): every German category holds articles.
    emptyCategories: [],
    body: "Testabsatz auf Deutsch",
    name: "Deutsch",
    fab: "LR-Vertriebspartner werden",
    whatsapp: /text=Hallo%20Philippe/,
    shopLabel: "Offizieller LR-Shop",
    shopUrl: "https://shop.lrworld.com/home/DE/de?ref=cros",
    transparency: "Transparenz und Partnerlinks",
    menu: ["Menü öffnen", "Menü schließen"],
  },
  es: {
    home: "/es/",
    article: "/es/articulos/articulo-demo/",
    category: "/es/secciones/salud/",
    categoryLabel: "Salud",
    // Spanish is published for real (src/content/articles/es/): every Spanish category holds articles.
    emptyCategories: [],
    body: "Párrafo de prueba en español",
    name: "Español",
    fab: "Hazte distribuidor de LR",
    whatsapp: /text=Hola%20Philippe/,
    shopLabel: "Tienda oficial de LR",
    shopUrl: "https://shop.lrworld.com/home/ES/es?ref=cros",
    transparency: "Transparencia y enlaces de afiliado",
    menu: ["Abrir el menú", "Cerrar el menú"],
  },
  "pt-pt": {
    home: "/pt-pt/",
    article: "/pt-pt/artigos/artigo-demo/",
    category: "/pt-pt/rubricas/saude/",
    categoryLabel: "Saúde",
    // Portuguese is published for real (src/content/articles/pt-pt/): every Portuguese category holds articles.
    emptyCategories: [],
    body: "Parágrafo de teste em português",
    name: "Português",
    fab: "Torna-te distribuidor LR",
    whatsapp: /text=Ol%C3%A1%20Philippe/,
    shopLabel: "Site oficial da LR",
    shopUrl: "https://www.lrworld.com/pt-pt?ref=cros",
    transparency: "Transparência e links de parceiro",
    menu: ["Abrir o menu", "Fechar o menu"],
  },
  pl: {
    home: "/pl/",
    article: "/pl/artykuly/artykul-demo/",
    category: "/pl/dzialy/zdrowie/",
    categoryLabel: "Zdrowie",
    // Polish is published for real (src/content/articles/pl/): every Polish category holds articles.
    emptyCategories: [],
    body: "Akapit testowy po polsku",
    name: "Polski",
    fab: "Zostań dystrybutorem LR",
    whatsapp: /text=Dzie%C5%84%20dobry%20Philippe/,
    shopLabel: "Oficjalny sklep LR",
    shopUrl: "https://shop.lrworld.com/home/PL/pl?ref=cros",
    transparency: "Przejrzystość i linki partnerskie",
    menu: ["Otwórz menu", "Zamknij menu"],
  },
} as const;
/**
 * Real published translations (all six locales): 16 articles and 3 more categories each
 * (Santé is already counted), plus the same 19 French pages, annotated once.
 */
const REAL_LOCALES = 6;
const REAL_ANNOTATED = (16 + 3) * (REAL_LOCALES + 1);
const published = Object.entries(PUBLISHED) as [keyof typeof PUBLISHED, (typeof PUBLISHED)[keyof typeof PUBLISHED]][];

/** hreflang → absolute URL, from <link rel="alternate" hreflang> tags. */
const alternatesOf = (html: string) =>
  Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => [m[1], m[2]]));

test.describe("locale registry", () => {
  test("defines every supported locale once, with valid codes and URL prefixes", () => {
    expect([...LOCALE_CODES].sort()).toEqual(["de", "en", "es", "fr", "it", "pl", "pt-pt"]);
    const prefixes = new Set<string>();
    for (const code of LOCALE_CODES) {
      const l = LOCALES[code];
      expect(l.code).toBe(code);
      expect(l.prefix).toBe(code === DEFAULT_LOCALE ? "" : `/${code}`);
      expect(prefixes.has(l.prefix), code).toBe(false);
      prefixes.add(l.prefix);
      expect(l.htmlLang, code).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
      expect(l.ogLocale, code).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      expect(l.segments.articles, code).toMatch(/^[a-z-]+$/);
      expect(l.segments.categories, code).toMatch(/^[a-z-]+$/);
      expect(l.segments.products, code).toMatch(/^[a-z-]+$/);
      expect(new Set(Object.values(l.segments)).size, code).toBe(3);
    }
    expect(LOCALES.it).toMatchObject({ prefix: "/it", htmlLang: "it", ogLocale: "it_IT", schemaLang: "it-IT" });
    expect(LOCALES.en).toMatchObject({ prefix: "/en", htmlLang: "en", ogLocale: "en_GB" });
    expect(LOCALES.de).toMatchObject({ prefix: "/de", htmlLang: "de", ogLocale: "de_DE", schemaLang: "de-DE" });
    expect(LOCALES.es).toMatchObject({ prefix: "/es", htmlLang: "es", ogLocale: "es_ES", schemaLang: "es-ES" });
    expect(LOCALES["pt-pt"]).toMatchObject({ prefix: "/pt-pt", htmlLang: "pt-PT", ogLocale: "pt_PT", schemaLang: "pt-PT" });
    expect(LOCALES.pl).toMatchObject({ prefix: "/pl", htmlLang: "pl", ogLocale: "pl_PL", schemaLang: "pl-PL" });
  });

  for (const locale of ["it", "en", "de", "es", "pt-pt", "pl"] as const) {
    test(`${locale}: interface text and category text are complete`, () => {
      expect(Object.keys(UI[locale]!).sort()).toEqual(Object.keys(UI.fr!).sort());
      for (const [key, value] of Object.entries(UI[locale]!)) {
        if (typeof value === "string" && !["inFrench", "frenchSite"].includes(key)) expect(value, key).not.toBe("");
      }
      const slugs = new Set<string>();
      for (const c of CATEGORY_SLUGS) {
        const text = CATEGORY_I18N[locale]![c];
        expect(text.label && text.description && text.intro.length, c).toBeTruthy();
        expect(text.slug, c).toMatch(/^[a-z-]+$/);
        slugs.add(text.slug);
      }
      expect(slugs.size).toBe(CATEGORY_SLUGS.length);
      // Product pages: same keys as French, nothing empty, the three supplement notices.
      const p = productUi(locale);
      expect(Object.keys(p).sort()).toEqual(Object.keys(productUi("fr")).sort());
      for (const [key, value] of Object.entries(p)) if (typeof value === "string") expect(value, key).not.toBe("");
      expect(p.supplementMentions).toHaveLength(3);
    });
  }
});

test.describe("translation files", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  const roots = ["src/content/articles", "tests/fixtures/articles"].map((d) => join(process.cwd(), d));
  type T = { locale: string; slug: string; file: string; data: Record<string, string> };
  const all = (): { base: string; t: T }[] => roots.flatMap((base) => (translations(base) as T[]).map((t) => ({ base, t })));

  test("every published translation matches the current French source (not stale)", () => {
    for (const { t } of all().filter(({ t }) => t.data.status === "published")) {
      expect(freshness(t, roots), `${t.locale}/${t.slug}: update it, then run node tools/i18n-status.mjs --stamp ${t.locale}/${t.slug}`).toBe("current");
    }
  });

  test("drafts are complete enough to review: source, stamp, and links to pages of the same language", () => {
    for (const { base, t } of all()) {
      const id = `${t.locale}/${t.slug}`;
      expect(t.data.locale, id).toBe(t.locale);
      expect(["current", "stale"], `${id} needs translationOf + sourceHash`).toContain(freshness(t, roots));
      const { body } = parseMarkdown(readFileSync(t.file, "utf8"));
      for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        if (toolPaths(t.locale).includes(href)) continue;
        const target = href.match(new RegExp(`^/${t.locale}/${LOCALES[t.locale as keyof typeof LOCALES].segments.articles}/([a-z0-9-]+)/$`));
        expect(target, `${id} links to ${href}: link to a ${t.locale} article instead`).toBeTruthy();
        expect(existsSync(join(base, t.locale, `${target![1]}.md`)), `${id} → ${href} has no ${t.locale} file`).toBe(true);
      }
    }
  });

  const productRoots = ["src/content/products", "tests/fixtures/products"].map((d) => join(process.cwd(), d));
  const products = (): { base: string; t: T }[] =>
    productRoots.flatMap((base) => (translations(base) as T[]).map((t) => ({ base, t })));

  test("product translations: stamped, current when published, own country's shop, links in their language", () => {
    const articleRoots = roots;
    for (const { t } of products()) {
      const id = `products/${t.locale}/${t.slug}`;
      expect(t.data.locale, id).toBe(t.locale);
      const state = freshness(t, productRoots);
      expect(["current", "stale"], `${id} needs translationOf + sourceHash`).toContain(state);
      if (t.data.status === "published") expect(state, `${id}: update it, then run node tools/i18n-status.mjs --stamp ${id}`).toBe("current");
      expect(t.data.shopUrl, id).toContain(`https://shop.lrworld.com/product/${LR_SHOP_PATH[t.locale as keyof typeof LR_SHOP_PATH]}/`);
      expect(t.data.shopUrl, id).toContain("ref=cros");
      const { body } = parseMarkdown(readFileSync(t.file, "utf8"));
      for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        if (toolPaths(t.locale).includes(href)) continue;
        const target = href.match(new RegExp(`^/${t.locale}/${LOCALES[t.locale as keyof typeof LOCALES].segments.articles}/([a-z0-9-]+)/$`));
        expect(target, `${id} links to ${href}: link to a ${t.locale} article instead`).toBeTruthy();
        expect(articleRoots.some((b) => existsSync(join(b, t.locale, `${target![1]}.md`))), `${id} → ${href}`).toBe(true);
      }
    }
  });

  test("titles and descriptions fit search results, already in drafts", () => {
    for (const { t } of all()) {
      const id = `${t.locale}/${t.slug}`;
      expect(t.data.description.length, `${id} description`).toBeGreaterThanOrEqual(50);
      expect(t.data.description.length, `${id} description`).toBeLessThanOrEqual(160);
      expect(t.data.title.length, `${id} title`).toBeLessThanOrEqual(65);
    }
  });

  test("translations use their language's typography (no French space before : ; ? !)", () => {
    for (const { t } of all()) {
      const { data, body } = parseMarkdown(readFileSync(t.file, "utf8"));
      const text = [data.title, data.description, data.coverAlt, body].join("\n").replace(/\]\([^)]*\)/g, "]");
      const bad = text.match(/.{0,20}[ \u00a0\u202f][:;?!](?=\s|$).{0,10}/gm) ?? [];
      expect(bad, `${t.locale}/${t.slug}`).toEqual([]);
    }
  });
});

test.describe("localized pages (static scan)", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file scan runs once");
  });

  test("translated pages exist only for published content", () => {
    for (const [code, l] of published) {
      for (const path of [l.home, l.article, l.category]) expect(exists(path.slice(1)), `${code} ${path}`).toBe(true);
      // No article in these categories: no page (no empty hub).
      for (const path of l.emptyCategories) expect(exists(path), path).toBe(false);
    }
    // Locales without a published article have no page at all.
    for (const code of LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && !(l in PUBLISHED))) {
      expect(existsSync(join(dist, code)), code).toBe(false);
    }
  });

  test("translated product pages: only published ones, with that country's shop and notices", () => {
    expect(exists("it/prodotti")).toBe(true);
    const html = read("it/prodotti/prodotto-demo");
    expect(html).toContain("Gel dimostrativo");
    expect(html).toContain("Paragrafo di recensione di prova in italiano");
    for (const m of productUi("it").supplementMentions) expect(html).toContain(m.replace(/'/g, "&#39;"));
    for (const [, href] of html.matchAll(/href="(https:\/\/shop\.lrworld\.com[^"]*)"/g)) {
      expect(href.replace(/&amp;/g, "&")).toMatch(/^https:\/\/shop\.lrworld\.com\/(product\/it\/it\/|home\/IT\/it\?)/);
    }
    // The Italian demo article shows the Italian version of the product its French source cites.
    expect(read("it/articoli/articolo-demo")).toContain('href="/it/prodotti/prodotto-demo/"');
    // Draft product translations have no page in any locale.
    for (const base of ["src/content/products", "tests/fixtures/products"]) {
      for (const t of translations(join(process.cwd(), base)) as { locale: string; slug: string; data: Record<string, string> }[]) {
        if (t.data.status === "published") continue;
        const l = LOCALES[t.locale as keyof typeof LOCALES];
        expect(exists(`${t.locale}/${l.segments.products}/${t.slug}`), `${t.locale}/${t.slug}`).toBe(false);
      }
    }
  });

  test("every page has a language switcher: each published language, to this page or that language's home", () => {
    const locales = [DEFAULT_LOCALE, ...published.map(([code]) => code), ...LOCALE_CODES.filter((l) => l !== DEFAULT_LOCALE && existsSync(join(dist, l)) && !(l in PUBLISHED))];
    for (const file of pages()) {
      const p = pathOf(file);
      const html = readFileSync(file, "utf8");
      const menu = html.match(/<ul class="lang-switch__menu">([\s\S]*?)<\/ul>/)?.[1];
      expect(menu, `${p} has no language switcher`).toBeTruthy();
      const links = [...menu!.matchAll(/<a href="([^"]+)" hreflang="([^"]+)"[^>]*>/g)];
      expect(links.length, p).toBe(new Set(locales).size);
      const alternates = alternatesOf(html);
      for (const [, href, lang] of links) {
        const target = LOCALES[localeOf(href)];
        expect(lang, `${p} → ${href}`).toBe(target.htmlLang);
        // Same page in that language when it exists, else that language's home.
        // (The page's own language links to the page itself, hreflang or not.)
        expect([alternates[lang]?.replace(ORIGIN, ""), `${target.prefix}/`, ...(target.code === localeOf(p) ? [p] : [])], `${p} → ${href}`).toContain(href);
        expect(exists(href.slice(1)), `${p} → ${href}`).toBe(true);
      }
      expect(menu!.match(/aria-current="true"/g)?.length, p).toBe(1);
    }
  });

  test("the unreviewed draft never surfaces", () => {
    for (const file of [...htmlFiles(dist), join(dist, "sitemap.xml")]) {
      const text = readFileSync(file, "utf8");
      expect(text, pathOf(file)).not.toContain("bozza-demo");
      expect(text, pathOf(file)).not.toContain("Bozza non revisionata");
    }
    // Its French source points only to the reviewed Italian translation.
    expect(alternatesOf(read("articles/jus-aloe-vera-science")).it).toBe(`${ORIGIN}/it/articoli/succo-di-aloe-vera-cosa-dice-la-scienza/`);
  });

  test("html lang, Open Graph locale and structured data language match the URL's locale", () => {
    for (const file of htmlFiles(dist)) {
      const p = pathOf(file);
      const l = LOCALES[localeOf(p)];
      const html = readFileSync(file, "utf8");
      expect(html, p).toContain(`<html lang="${l.htmlLang}">`);
      expect(html, p).toContain(`<meta property="og:locale" content="${l.ogLocale}">`);
      for (const [, lang] of html.matchAll(/"inLanguage":"([^"]+)"/g)) expect(lang, p).toBe(l.schemaLang);
    }
  });

  test("translated pages are indexable and self-canonical under their prefix", () => {
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
      const p = pathOf(file);
      const html = readFileSync(file, "utf8");
      expect(html, p).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
      expect(html, p).toContain(`<link rel="canonical" href="${ORIGIN}${p}">`);
    }
  });

  test("hreflang annotations are reciprocal, self-referencing and point to real indexable pages", () => {
    let annotated = 0;
    for (const file of pages()) {
      const p = pathOf(file);
      const alts = alternatesOf(readFileSync(file, "utf8"));
      if (!Object.keys(alts).length) continue;
      annotated++;
      const { "x-default": xDefault, ...langs } = alts;
      expect(Object.keys(langs).length, p).toBeGreaterThanOrEqual(2);
      expect(Object.values(langs), `${p} must list itself`).toContain(`${ORIGIN}${p}`);
      expect(xDefault, `${p} x-default`).toBe(langs.fr);
      for (const [lang, url] of Object.entries(langs)) {
        const target = url.replace(ORIGIN, "");
        expect(exists(target.slice(1)), `${p} → ${lang} ${target}`).toBe(true);
        const targetHtml = read(target.slice(1));
        expect(targetHtml, target).toContain(`<link rel="canonical" href="${url}">`);
        expect(targetHtml, target).toContain(`<html lang="${lang}">`);
        expect(alternatesOf(targetHtml), `reciprocity ${p} ↔ ${target}`).toEqual(alts);
      }
    }
    // Demo article, homepages and the Santé category, in all seven locales (21 pages),
    // the demo product and the product listing in French and Italian (4 pages),
    // and the 14 published product translations with their 4 French sources and 5 listings (23 pages, /produits/ already counted),
    // plus the published articles and categories of all six locales with their French sources,
    // and the three tools (aloe vera watering planner, water calculator, fibre table) in all seven locales (21 pages).
    expect(annotated).toBe(21 + 4 + REAL_ANNOTATED + 22 + 21);
    expect(alternatesOf(read("produits/produit-demo"))).toEqual({
      fr: `${ORIGIN}/produits/produit-demo/`,
      it: `${ORIGIN}/it/prodotti/prodotto-demo/`,
      "x-default": `${ORIGIN}/produits/produit-demo/`,
    });
    expect(alternatesOf(read("articles/article-demo"))).toEqual({
      fr: `${ORIGIN}/articles/article-demo/`,
      en: `${ORIGIN}/en/articles/demo-article/`,
      de: `${ORIGIN}/de/artikel/demo-artikel/`,
      es: `${ORIGIN}/es/articulos/articulo-demo/`,
      "pt-PT": `${ORIGIN}/pt-pt/artigos/artigo-demo/`,
      pl: `${ORIGIN}/pl/artykuly/artykul-demo/`,
      it: `${ORIGIN}/it/articoli/articolo-demo/`,
      "x-default": `${ORIGIN}/articles/article-demo/`,
    });
    expect(alternatesOf(read("rubriques/sante"))).toMatchObject({ it: `${ORIGIN}/it/rubriche/salute/`, en: `${ORIGIN}/en/topics/health/` });
    expect(alternatesOf(read(""))).toMatchObject({ it: `${ORIGIN}/it/`, en: `${ORIGIN}/en/` });
    // A French category lists only the locales that have articles in it.
    expect(alternatesOf(read("rubriques/beaute"))).toEqual({
      fr: `${ORIGIN}/rubriques/beaute/`,
      it: `${ORIGIN}/it/rubriche/bellezza/`,
      en: `${ORIGIN}/en/topics/beauty/`,
      de: `${ORIGIN}/de/rubriken/schoenheit/`,
      es: `${ORIGIN}/es/secciones/belleza/`,
      "pt-PT": `${ORIGIN}/pt-pt/rubricas/beleza/`,
      pl: `${ORIGIN}/pl/dzialy/uroda/`,
      "x-default": `${ORIGIN}/rubriques/beaute/`,
    });
  });

  test("the sitemap lists translated URLs with the same alternates as the HTML", () => {
    const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    for (const [, loc, body] of sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(.*?)<\/url>/g)) {
      const fromSitemap = Object.fromEntries(
        [...body.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)].map((m) => [m[1], m[2]]),
      );
      const html = read(loc.replace(ORIGIN, "").slice(1));
      expect(fromSitemap, loc).toEqual(alternatesOf(html));
    }
    for (const [, l] of published) {
      for (const path of [l.home, l.article, l.category]) expect(sitemap).toContain(`<loc>${ORIGIN}${path}</loc>`);
    }
  });

  test("links on translated pages stay in their language, or declare the language they lead to", () => {
    const problems: string[] = [];
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
      const prefix = `${LOCALES[localeOf(pathOf(file))].prefix}/`;
      for (const [tag, href] of readFileSync(file, "utf8").matchAll(/<a\b[^>]*\bhref="(\/[^"#]*)[^"]*"[^>]*>/g)) {
        if (href.includes(".")) continue; // files
        if (href.startsWith(prefix)) continue;
        if (/\bhreflang="fr"/.test(tag)) continue; // explicit: French-only page
        // Explicit language switch: hreflang names the language of the target page.
        if (tag.match(/\bhreflang="([^"]+)"/)?.[1] === LOCALES[localeOf(href)].htmlLang) continue;
        problems.push(`${pathOf(file)} → ${href}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("translated pages carry no French interface text and render their own body", () => {
    const french = ["Accueil", "Sommaire", "Relecture", "Publié le", "min de lecture", "Tous les articles", "Lire ·", "Aller au contenu", "Devenir distributeur", "Fil d'Ariane", "Fil d&#39;Ariane", "Rubriques", "Lien partenaire", "Notre avis", "Précautions", "Questions fréquentes", "Mode d&#39;emploi", "Commander sur la boutique", "Découvrir", "Ne pas dépasser"];
    for (const file of pages().filter((f) => localeOf(pathOf(f)) !== DEFAULT_LOCALE)) {
      const html = readFileSync(file, "utf8");
      for (const marker of french) expect(html, `${pathOf(file)} contains "${marker}"`).not.toContain(marker);
    }
    for (const [, l] of published) {
      const article = read(l.article.slice(1));
      expect(article).toContain(l.body);
      expect(article).not.toContain("Paragraphe de test");
    }
  });
});

test.describe("localized pages (browser)", () => {
  for (const [code, l] of published) {
    test(`${code}: routes answer 200 and render in that language`, async ({ page }) => {
      for (const path of [l.home, l.article, l.category]) {
        const response = await page.goto(path);
        expect(response?.status(), path).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", LOCALES[code].htmlLang);
      }
      await expect(page.locator("h1")).toHaveText(l.categoryLabel);
    });

    test(`${code}: the header language switcher leads to the same article in French and back`, async ({ page }) => {
      await page.goto(l.article);
      await page.locator(".lang-switch__toggle").click();
      await page.locator(".lang-switch__menu a", { hasText: "Français" }).click();
      await expect(page).toHaveURL(/\/articles\/article-demo\/$/);
      await page.locator(".lang-switch__toggle").click();
      await page.locator(".lang-switch__menu a", { hasText: l.name }).click();
      await expect(page).toHaveURL(new RegExp(`${l.article}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", LOCALES[code].htmlLang);
    });

    test(`${code}: an article links to its French version and back`, async ({ page }) => {
      await page.goto(l.article);
      await expect(page.locator(".breadcrumb a").first()).toHaveAttribute("href", l.home);
      await page.locator(".article-languages a", { hasText: "Français" }).click();
      await expect(page).toHaveURL(/\/articles\/article-demo\/$/);
      await expect(page.locator(".article-languages a", { hasText: l.name })).toHaveAttribute("href", l.article);
    });

    test(`${code}: distributor invitation, LR shop link and disclosure in that language`, async ({ page }) => {
      await page.goto(l.home);
      const shop = page.locator(".site-footer a", { hasText: l.shopLabel });
      await expect(shop).toHaveAttribute("href", l.shopUrl);
      await expect(shop).toHaveAttribute("rel", /sponsored/);
      await expect(page.locator(".site-footer a", { hasText: l.transparency })).toHaveAttribute("hreflang", "fr");
      const fab = page.locator("[data-distributor-open]");
      await expect(fab).toContainText(l.fab);
      await fab.click();
      const dialog = page.locator("#distributor-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", l.whatsapp);
    });

    test(`${code}: the mobile menu button is labelled in that language`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "menu button is mobile-only");
      await page.goto(l.home);
      const toggle = page.locator("[data-menu-toggle]");
      await expect(toggle).toHaveAttribute("aria-label", l.menu[0]);
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-label", l.menu[1]);
      await expect(page.locator("#mobile-nav a").first()).toHaveAttribute("href", new RegExp(`^${LOCALES[code].prefix}/`));
    });
  }

  test("unknown translated URLs and unpublished locales are real 404s, not French fallbacks", async ({ page, allowConsoleError }) => {
    allowConsoleError(/404/);
    expect((await page.goto("/it/articoli/n-existe-pas/"))?.status()).toBe(404);
    expect((await page.goto("/en/articles/does-not-exist/"))?.status()).toBe(404);
    expect((await page.goto("/de/artikel/gibt-es-nicht/"))?.status()).toBe(404);
    expect((await page.goto("/es/articulos/no-existe/"))?.status()).toBe(404);
    expect((await page.goto("/pt-pt/artigos/nao-existe/"))?.status()).toBe(404);
    expect((await page.goto("/pl/artykuly/nie-istnieje/"))?.status()).toBe(404);
    // Not a supported locale at all.
    expect((await page.goto("/nl/"))?.status()).toBe(404);
  });
});
