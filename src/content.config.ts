import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { CATEGORY_SLUGS } from "./data/categories";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_SLUGS),
    date: z.coerce.date(),
    cover: z.string(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { articles };
