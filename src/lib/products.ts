import { getCollection, getEntries, type CollectionEntry } from "astro:content";

export type Product = CollectionEntry<"products">;

export async function getPublishedProducts(): Promise<Product[]> {
  const all = await getCollection("products", (p) => p.data.status === "published");
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, "fr"));
}

/** Resolve article → product references, keeping only published products. */
export async function resolvePublished(refs: { collection: "products"; id: string }[]): Promise<Product[]> {
  if (!refs.length) return [];
  const entries = await getEntries(refs);
  return entries.filter((p) => p.data.status === "published");
}

export function productUrl(product: Product): string {
  return `/produits/${product.id}/`;
}

export const KIND_LABEL: Record<Product["data"]["kind"], string> = {
  complement: "Complément alimentaire",
  soin: "Soin",
  set: "Coffret",
};

/** Mentions required on food supplement labelling in France (décret n° 2006-352, art. 10). */
export const SUPPLEMENT_MENTIONS = [
  "Ne pas dépasser la dose journalière recommandée.",
  "Les compléments alimentaires ne doivent pas être utilisés comme substituts d'un régime alimentaire varié et équilibré et d'un mode de vie sain.",
  "Tenir hors de la portée des jeunes enfants.",
];
