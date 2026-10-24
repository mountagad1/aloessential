/*
 * Cover images. Two kinds coexist:
 * - SVG illustrations in public/covers/ (products, older content), shown at
 *   1200 × 800 and shared through a 1200 × 800 JPEG twin
 *   (tools/rasterize-covers.mjs);
 * - photographs in public/covers/photos/ (articles), imported by
 *   tools/import-cover-photos.mjs: 16:9 WebP with smaller candidates for
 *   srcset and a 1200 px JPEG for sharing.
 * docs/architecture/IMAGE_DELIVERY.md
 */
import photos from "../data/cover-photos.json";

const PHOTO = /^\/covers\/photos\/([a-z0-9-]+)\.webp$/;
/** Smaller WebP candidates written for every photo, besides the original. */
export const PHOTO_WIDTHS = [480, 800, 1200] as const;
const SHARE_WIDTH = 1200;

export interface CoverImage {
  src: string;
  width: number;
  height: number;
  /** Responsive candidates (photos only). */
  srcset?: string;
}

function photoSize(cover: string): { name: string; width: number; height: number } | undefined {
  const name = cover.match(PHOTO)?.[1];
  if (!name) return undefined;
  const size = (photos as Record<string, { width: number; height: number }>)[name];
  if (!size) throw new Error(`${cover} has not been imported: node tools/import-cover-photos.mjs <folder>`);
  return { name, ...size };
}

/** What an <img> needs to show a cover. */
export function coverImage(cover: string): CoverImage {
  const photo = photoSize(cover);
  if (!photo) return { src: cover, width: 1200, height: 800 };
  const base = `/covers/photos/${photo.name}`;
  const srcset = [...PHOTO_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`), `${cover} ${photo.width}w`].join(", ");
  return { src: cover, width: photo.width, height: photo.height, srcset };
}

/** Raster image for sharing (Open Graph, structured data, Google Discover). */
export function coverShare(cover: string): { src: string; width: number; height: number } {
  const photo = photoSize(cover);
  if (!photo) return { src: cover.replace(/\.svg$/, ".jpg"), width: 1200, height: 800 };
  return { src: `/covers/photos/${photo.name}.jpg`, width: SHARE_WIDTH, height: Math.round((SHARE_WIDTH * photo.height) / photo.width) };
}
