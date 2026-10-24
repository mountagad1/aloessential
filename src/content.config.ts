import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORY_SLUGS } from "./data/categories";
import { hasPartnerRef } from "./lib/partner";
import { DEFAULT_LOCALE, LOCALE_CODES, LR_SHOP_PATH } from "./i18n/locales";

/*
 * CONTENT_FIXTURES=1 (set by the Playwright config) adds the fictional
 * fixtures in tests/fixtures/ to the real content.
 */
const FIXTURES = !!process.env.CONTENT_FIXTURES;
/** Articles and products: "slug" for French files, "<locale>/slug" for translations in a locale folder. */
const articleId = ({ entry }: { entry: string }) => {
  const parts = entry.replace(/\.md$/, "").split("/");
  const folder = parts.at(-2);
  return folder && (LOCALE_CODES as readonly string[]).includes(folder) ? `${folder}/${parts.at(-1)}` : parts.at(-1)!;
};

const articles = defineCollection({
  loader: glob({
    base: ".",
    pattern: FIXTURES
      ? ["src/content/articles/**/*.md", "tests/fixtures/articles/**/*.md"]
      : "src/content/articles/**/*.md",
    generateId: articleId,
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(CATEGORY_SLUGS),
      date: z.coerce.date(),
      cover: z.string(),
      coverAlt: z.string(),
      /** Shown under the cover (figcaption) and used as the image caption in structured data. */
      coverCaption: z.string().optional(),
      /** Image name in structured data. */
      coverTitle: z.string().optional(),
      /** Longer description of the image, for structured data only. */
      coverDescription: z.string().optional(),
      featured: z.boolean().default(false),
      /** LR products discussed in the article; only published ones are shown. */
      products: z.array(reference("products")).default([]),
      /** Byline. Defaults to the site's writer and reviewer (src/data/site.ts). */
      author: z.string().optional(),
      reviewer: z.string().optional(),
      /** Primary sources (regulation, agencies, studies) backing the article's factual statements. */
      sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
      /*
       * Translations (docs/architecture/INTERNATIONAL_SEO_ARCHITECTURE.md).
       * French articles sit in src/content/articles/; a translation sits in
       * src/content/articles/<locale>/, names its French source and stays a
       * draft until a reviewer fluent in that language has checked it.
       */
      locale: z.enum(LOCALE_CODES).default(DEFAULT_LOCALE),
      /** Id of the French article this one translates (translations only). */
      translationOf: z.string().optional(),
      /**
       * Fingerprint of the French version the translation matches
       * (`node tools/i18n-status.mjs --stamp <locale>/<slug>`). A published
       * translation whose source changed since is reported stale and fails
       * tests/i18n.spec.ts until it is updated and re-stamped.
       */
      sourceHash: z.string().optional(),
      status: z.enum(["draft", "published"]).default("published"),
      /** Who reviewed the translation; required to publish one. */
      translationReviewer: z.string().optional(),
    })
    .superRefine((a, ctx) => {
      if (a.locale === DEFAULT_LOCALE) {
        if (a.translationOf) ctx.addIssue({ code: "custom", message: "French articles are sources: no translationOf" });
        return;
      }
      if (!a.translationOf) ctx.addIssue({ code: "custom", message: "A translation must name its French source (translationOf)" });
      if (a.products.length > 0)
        ctx.addIssue({ code: "custom", message: "Product pages are French-only: translations cannot list products yet" });
      if (a.status === "published" && !a.translationReviewer)
        ctx.addIssue({ code: "custom", message: "A published translation needs a translationReviewer" });
      if (a.status === "published" && !a.sourceHash)
        ctx.addIssue({ code: "custom", message: "A published translation needs a sourceHash (tools/i18n-status.mjs --stamp)" });
    }),
});

/*
 * Product pages (LR Health & Beauty partner selection).
 *
 * Every factual field (composition, doses, format, usage, precautions) must be
 * copied from the official LR product page or packaging, never inferred.
 * `sourceCheckedAt` records when that was last verified. A product only gets
 * a public page once `status: published`. See
 * docs/aloessential/PRODUCT_CONTENT_GUIDELINES.md.
 */
const products = defineCollection({
  loader: glob({
    base: ".",
    pattern: FIXTURES
      ? ["src/content/products/**/*.md", "tests/fixtures/products/**/*.md"]
      : "src/content/products/**/*.md",
    generateId: articleId,
  }),
  schema: z
    .object({
    name: z.string(),
    /** LR article number, e.g. "81180-99". */
    sku: z.string(),
    /** Partner link to the LR shop. LR links must carry ref=cros (see src/lib/partner.ts). */
    shopUrl: z.string().url().refine(hasPartnerRef, { message: "LR links must include ?ref=cros" }),
    status: z.enum(["draft", "published"]).default("draft"),
    /** Drives legally required mentions: food supplements get the French mandatory notices. */
    kind: z.enum(["complement", "soin", "set"]),
    category: z.enum(CATEGORY_SLUGS),
    /** Product range as LR names it, e.g. "Aloe Vera", "LR Lifetakt". */
    range: z.string(),
    tagline: z.string(),
    summary: z.string(),
    format: z.string().optional(),
    highlights: z
      .array(z.object({ icon: z.enum(["leaf", "sun", "drop", "heart"]), title: z.string(), text: z.string() }))
      .max(4)
      .default([]),
    forWhom: z.array(z.string()).default([]),
    composition: z
      .array(z.object({ name: z.string(), amount: z.string().optional(), note: z.string().optional() }))
      .default([]),
    compositionNote: z.string().optional(),
    usage: z.array(z.string()).default([]),
    precautions: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    cover: z.string(),
    coverAlt: z.string(),
    /** Photo metadata, as for articles: caption (shown), name and description (structured data). */
    coverCaption: z.string().optional(),
    coverTitle: z.string().optional(),
    coverDescription: z.string().optional(),
    sourceCheckedAt: z.coerce.date().optional(),
    /*
     * Translations, as for articles: src/content/products/<locale>/<slug>.md
     * names its French source, links to that country's LR shop and stays a
     * draft until reviewed. A product gets a page in a locale only if LR sells
     * the same article number in that country.
     */
    locale: z.enum(LOCALE_CODES).default(DEFAULT_LOCALE),
    translationOf: z.string().optional(),
    /** Fingerprint of the French product page the translation matches (tools/i18n-status.mjs --stamp products/<locale>/<slug>). */
    sourceHash: z.string().optional(),
    translationReviewer: z.string().optional(),
  })
  .superRefine((p, ctx) => {
    if (p.locale === DEFAULT_LOCALE) {
      if (p.translationOf) ctx.addIssue({ code: "custom", message: "French products are sources: no translationOf" });
      return;
    }
    // A translation links to its own country's LR shop, never to another one.
    if (!p.shopUrl.includes(`/product/${LR_SHOP_PATH[p.locale]}/`))
      ctx.addIssue({ code: "custom", message: `A "${p.locale}" product links to the LR shop of that country (/product/${LR_SHOP_PATH[p.locale]}/)` });
    if (!p.translationOf) ctx.addIssue({ code: "custom", message: "A translation must name its French source (translationOf)" });
    if (p.status === "published" && !p.translationReviewer)
      ctx.addIssue({ code: "custom", message: "A published translation needs a translationReviewer" });
    if (p.status === "published" && !p.sourceHash)
      ctx.addIssue({ code: "custom", message: "A published translation needs a sourceHash (tools/i18n-status.mjs --stamp)" });
  }),
});

export const collections = { articles, products };
