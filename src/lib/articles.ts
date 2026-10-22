import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;

export async function getArticles(): Promise<Article[]> {
  const all = await getCollection("articles");
  // Newest first; same-day articles by id (descending) so every build lists them in the same order.
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id));
}

/** Estimated reading time in minutes, at ~200 words per minute. */
export function readingTime(article: Article): number {
  const words = (article.body ?? "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

export function articleUrl(article: Article): string {
  return `/articles/${article.id}/`;
}
