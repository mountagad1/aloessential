import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORY_SLUGS } from "./data/categories";
import { hasPartnerRef } from "./lib/partner";

/*
 * CONTENT_FIXTURES=1 (set by the Playwright config) adds the fictional
 * fixtures in tests/fixtures/ to the real content. Ids are file names.
 */
const FIXTURES = !!process.env.CONTENT_FIXTURES;
const fileId = ({ entry }: { entry: string }) => entry.split("/").pop()!.replace(/\.md$/, "");

const articles = defineCollection({
  loader: glob({
    base: ".",
    pattern: FIXTURES ? ["src/content/articles/*.md", "tests/fixtures/articles/*.md"] : "src/content/articles/*.md",
    generateId: fileId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_SLUGS),
    date: z.coerce.date(),
    cover: z.string(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
    /** LR products discussed in the article; only published ones are shown. */
    products: z.array(reference("products")).default([]),
    /** Byline. Defaults to the site's writer and reviewer (src/data/site.ts). */
    author: z.string().optional(),
    reviewer: z.string().optional(),
    /** Primary sources (regulation, agencies, studies) backing the article's factual statements. */
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
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
    pattern: FIXTURES ? ["src/content/products/*.md", "tests/fixtures/products/*.md"] : "src/content/products/*.md",
    generateId: fileId,
  }),
  schema: z.object({
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
    sourceCheckedAt: z.coerce.date().optional(),
  }),
});

export const collections = { articles, products };
