// Imports cover photographs (WebP, 16:9, at least 1200 px wide) into
// public/covers/photos/ and records their size in src/data/cover-photos.json.
//   node tools/import-cover-photos.mjs <folder>     every *.webp in <folder>
// For each photo <name>.webp it writes:
//   <name>.webp           the original, untouched (largest srcset candidate)
//   <name>-1200.webp, <name>-800.webp, <name>-480.webp   smaller candidates
//   <name>.jpg            1200 px wide JPEG for sharing (Open Graph, Article
//                         structured data, Google Discover)
// The file name is the photo's public name: pick it before importing.
// Outputs are committed. See docs/architecture/IMAGE_DELIVERY.md.

import sharp from "sharp";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "covers", "photos");
const MANIFEST = join(ROOT, "src", "data", "cover-photos.json");
export const WIDTHS = [1200, 800, 480];
const SHARE_WIDTH = 1200;

const source = process.argv[2];
if (!source) throw new Error("usage: node tools/import-cover-photos.mjs <folder of .webp photos>");
mkdirSync(OUT, { recursive: true });
const manifest = JSON.parse(readFileSync(MANIFEST, { encoding: "utf8", flag: "a+" }) || "{}");

for (const file of readdirSync(source).filter((n) => n.endsWith(".webp")).sort()) {
  const name = basename(file, ".webp");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) throw new Error(`${file}: use a lowercase, hyphenated file name`);
  const input = join(source, file);
  const { width, height } = await sharp(input).metadata();
  if (width < 1200) throw new Error(`${file}: ${width} px wide, at least 1200 needed (Google Discover)`);
  if (Math.abs(width / height - 16 / 9) > 0.01) throw new Error(`${file}: ${width} × ${height} is not 16:9`);

  copyFileSync(input, join(OUT, `${name}.webp`));
  for (const w of WIDTHS) {
    await sharp(input).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  await sharp(input)
    .resize({ width: SHARE_WIDTH })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(join(OUT, `${name}.jpg`));
  manifest[name] = { width, height };
  console.log(`covers/photos/${name}  ${width} × ${height}`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
