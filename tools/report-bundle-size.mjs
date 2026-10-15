// Reports what the production build ships: per-page HTML (including inlined
// CSS/JS), external CSS/JS, fonts and images, raw and gzip.
//   npm run build && npm run size
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = new URL("../dist/", import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const files = walk(DIST);
const groups = { html: [], css: [], js: [], font: [], image: [] };
for (const file of files) {
  const ext = extname(file);
  if (ext === ".html") groups.html.push(file);
  else if (ext === ".css") groups.css.push(file);
  else if (ext === ".js") groups.js.push(file);
  else if ([".woff2", ".woff"].includes(ext)) groups.font.push(file);
  else if ([".webp", ".png", ".svg", ".jpg", ".avif"].includes(ext)) groups.image.push(file);
}

console.log("\nGroup        files      raw      gzip");
for (const [name, list] of Object.entries(groups)) {
  const raw = list.reduce((sum, f) => sum + statSync(f).size, 0);
  const gz = list.reduce((sum, f) => sum + gzipSync(readFileSync(f)).length, 0);
  console.log(`${name.padEnd(10)} ${String(list.length).padStart(6)} ${kb(raw).padStart(10)} ${kb(gz).padStart(9)}`);
}

console.log("\nJavaScript per page (inline <script> bodies, gzip)");
const SAMPLE = ["index.html", "articles/index.html", "rubriques/sante/index.html", "articles/aloe-vera-bienfaits-peau/index.html"];
for (const file of SAMPLE.map((p) => join(DIST, p))) {
  const html = readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
  console.log(
    `${relative(DIST, file).padEnd(48)} js ${kb(gzipSync(scripts).length).padStart(8)}   inline css ${kb(gzipSync(styles).length).padStart(8)}   html ${kb(gzipSync(html).length).padStart(8)}`,
  );
}
