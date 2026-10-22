/*
 * Listing pagination (/articles/, /rubriques/<slug>/).
 *
 * Page 1 lives at the listing's own URL; page n ≥ 2 at `<base>n/`. Every page
 * is indexable, self-canonical and listed in the sitemap. Pure functions, no
 * Astro imports: shared by the listing routes, the sitemap and the tests.
 * See docs/architecture/SCALABILITY_AUDIT.md (finding F1).
 */

/** Cards per listing page. Keeps listing HTML bounded as the catalogue grows. */
export const LISTING_PAGE_SIZE = 24;

export function pageCount(total: number, size = LISTING_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / size));
}

/** "/articles/", 1 → "/articles/"; "/articles/", 3 → "/articles/3/" */
export function listingPath(base: string, page: number): string {
  return page <= 1 ? base : `${base}${page}/`;
}

/** Items shown on a given page (1-based). */
export function pageSlice<T>(items: T[], page: number, size = LISTING_PAGE_SIZE): T[] {
  return items.slice((page - 1) * size, page * size);
}

/** Every page of a listing: its number, the rest-param value and the path. */
export function listingPages(base: string, total: number, size = LISTING_PAGE_SIZE) {
  return Array.from({ length: pageCount(total, size) }, (_, i) => ({
    page: i + 1,
    param: i === 0 ? undefined : String(i + 1),
    path: listingPath(base, i + 1),
  }));
}
