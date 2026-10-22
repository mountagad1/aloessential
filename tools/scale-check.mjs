// Catalogue scale check: builds a throwaway copy of the site with N synthetic
// articles and reports build time and page weights. Nothing is written to the
// repository; the copy lives in the system temp directory and is deleted.
//   node tools/scale-check.mjs [articles=2000] [maxHtmlKB=150]
//
// Measures what grows with the catalogue: build duration, page count, the
// largest HTML page (listings must stay bounded: src/lib/pagination.ts) and
// the sitemap. Numbers describe this machine; Vercel build machines differ.
// See docs/architecture/CAPACITY_MODEL.md.

import { execFileSync, execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const N = Number(process.argv[2] ?? 2000);
const MAX_HTML_KB = Number(process.argv[3] ?? 150);
const CATEGORIES = ["conseils", "sante", "beaute", "nutrition"];

const work = mkdtempSync(join(tmpdir(), "aloessential-scale-"));
try {
  // Working-tree source files (tracked or new, minus .gitignore), so build output never leaks in.
  const files = execSync("git ls-files --cached --others --exclude-standard", { cwd: ROOT, encoding: "utf8" });
  for (const file of files.split("\n").filter(Boolean)) {
    if (!statSync(join(ROOT, file), { throwIfNoEntry: false })) continue; // deleted, not yet staged
    mkdirSync(dirname(join(work, file)), { recursive: true });
    writeFileSync(join(work, file), readFileSync(join(ROOT, file)));
  }
  symlinkSync(join(ROOT, "node_modules"), join(work, "node_modules"));

  const template = readFileSync(join(ROOT, "src/content/articles/jus-aloe-vera-science.md"), "utf8");
  for (let i = 1; i <= N; i++) {
    const day = String(1 + (i % 28)).padStart(2, "0");
    const body = template
      .replace(/^title: "/m, `title: "Scale ${i} `)
      .replace(/^category: .*/m, `category: ${CATEGORIES[i % CATEGORIES.length]}`)
      .replace(/^date: .*/m, `date: 2025-01-${day}`);
    writeFileSync(join(work, "src/content/articles", `zz-scale-${i}.md`), body);
  }

  const start = process.hrtime.bigint();
  try {
    execFileSync("npx", ["astro", "build"], { cwd: work, stdio: "pipe" });
  } catch (error) {
    console.error(String(error.stdout).slice(-3000), String(error.stderr).slice(-3000));
    throw new Error("astro build failed");
  }
  const seconds = Number(process.hrtime.bigint() - start) / 1e9;

  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
  const dist = join(work, "dist");
  const html = walk(dist).filter((f) => f.endsWith(".html"));
  const sizes = html.map((f) => ({ path: f.replace(dist, "").replace(/index\.html$/, ""), kb: statSync(f).size / 1024 }));
  sizes.sort((a, b) => b.kb - a.kb);
  const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
  const urls = (sitemap.match(/<loc>/g) ?? []).length;
  const distMB = walk(dist).reduce((t, f) => t + statSync(f).size, 0) / 1024 / 1024;

  console.log(`synthetic articles   ${N}`);
  console.log(`build time           ${seconds.toFixed(1)} s`);
  console.log(`HTML pages           ${html.length}`);
  console.log(`dist size            ${distMB.toFixed(1)} MB`);
  console.log(`sitemap URLs         ${urls} (${(sitemap.length / 1024).toFixed(0)} KB; protocol limit 50,000 URLs / 50 MB)`);
  console.log(`largest HTML pages`);
  for (const s of sizes.slice(0, 5)) console.log(`  ${s.kb.toFixed(1).padStart(8)} KB  ${s.path}`);
  console.log(`/articles/ pages     ${html.filter((f) => /\/articles\/(\d+\/)?index\.html$/.test(f)).length}`);

  if (sizes[0].kb > MAX_HTML_KB) {
    console.error(`\nFAIL: largest page ${sizes[0].path} is ${sizes[0].kb.toFixed(0)} KB (limit ${MAX_HTML_KB} KB)`);
    process.exitCode = 1;
  }
  if (urls > 50000) {
    console.error(`\nFAIL: sitemap has ${urls} URLs; split it into a sitemap index`);
    process.exitCode = 1;
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
