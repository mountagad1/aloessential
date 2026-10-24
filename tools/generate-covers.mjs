// Generates the botanical cover illustrations in public/covers/.
//   node tools/generate-covers.mjs
// Lightweight brand-palette illustrations, used by draft products and the
// test fixtures. Articles use photographs (tools/import-cover-photos.mjs).
// Outputs are committed.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "covers");
const W = 1200;
const H = 800;

const C = {
  forest: "#0F5132",
  leaf: "#5DA645",
  leafLight: "#A3D477",
  olive: "#6F8F24",
  sun: "#F9C23C",
  orange: "#FF8A1F",
  cream: "#FFF8E9",
  mint: "#E9F5EA",
};

const r = (n) => Math.round(n * 10) / 10;

function leaf({ x, y, len, width, angle = 0, fill = C.leaf, rib = true, opacity = 1 }) {
  const w = width;
  const d = `M0 0 C${r(w)} ${r(-len * 0.22)} ${r(w * 0.62)} ${r(-len * 0.72)} 0 ${r(-len)} C${r(-w * 0.62)} ${r(-len * 0.72)} ${r(-w)} ${r(-len * 0.22)} 0 0Z`;
  const ribPath = rib
    ? `<path d="M0 -6 Q${r(w * 0.12)} ${r(-len * 0.5)} 0 ${r(-len * 0.92)}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>`
    : "";
  return `<g transform="translate(${r(x)} ${r(y)}) rotate(${r(angle)})" opacity="${opacity}"><path d="${d}" fill="${fill}"/>${ribPath}</g>`;
}

function aloeLeaf({ x, y, len, width, angle = 0, fill = "url(#aloe)" }) {
  // Aloe: fleshy leaf with small serrations along one edge.
  const w = width;
  let teeth = "";
  for (let i = 1; i <= 6; i++) {
    const t = i / 7;
    const ty = -len * t;
    const tx = w * (1 - t) * 0.92 + 2;
    teeth += `<path d="M${r(tx - 4)} ${r(ty + 8)} L${r(tx + 9)} ${r(ty - 2)} L${r(tx - 2)} ${r(ty - 6)}Z" fill="${C.olive}"/>`;
  }
  const d = `M${r(-w)} 0 C${r(-w)} ${r(-len * 0.4)} ${r(-w * 0.35)} ${r(-len * 0.8)} 0 ${r(-len)} C${r(w * 0.3)} ${r(-len * 0.75)} ${r(w)} ${r(-len * 0.4)} ${r(w)} 0Z`;
  return `<g transform="translate(${r(x)} ${r(y)}) rotate(${r(angle)})">${teeth}<path d="${d}" fill="${fill}"/><path d="M${r(-w * 0.35)} -10 C${r(-w * 0.3)} ${r(-len * 0.45)} ${r(-w * 0.1)} ${r(-len * 0.75)} 0 ${r(-len * 0.92)}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="5" stroke-linecap="round"/></g>`;
}

function drop(x, y, size, opacity = 1) {
  return `<g transform="translate(${r(x)} ${r(y)})" opacity="${opacity}"><circle r="${size}" fill="#fff" fill-opacity=".38" stroke="#fff" stroke-opacity=".85" stroke-width="2"/><circle cx="${r(-size * 0.35)}" cy="${r(-size * 0.35)}" r="${r(size * 0.28)}" fill="#fff" fill-opacity=".9"/></g>`;
}

function sun(x, y, radius, rays = true) {
  let rayEls = "";
  if (rays) {
    for (let i = 0; i < 9; i++) {
      const a = -180 + (i * 180) / 8;
      rayEls += `<ellipse cx="0" cy="${r(-(radius + 48))}" rx="11" ry="30" fill="url(#ray)" transform="rotate(${r(a + 90)})"/>`;
    }
  }
  return `<g transform="translate(${r(x)} ${r(y)})">${rayEls}<circle r="${radius}" fill="url(#sun)"/></g>`;
}

const defs = `
<defs>
  <linearGradient id="aloe" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.forest}"/><stop offset=".55" stop-color="${C.leaf}"/><stop offset="1" stop-color="${C.leafLight}"/></linearGradient>
  <radialGradient id="sun" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".55" stop-color="${C.sun}"/><stop offset="1" stop-color="${C.orange}"/></radialGradient>
  <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.orange}"/><stop offset="1" stop-color="${C.sun}"/></linearGradient>
  <linearGradient id="gel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7F6D7"/><stop offset="1" stop-color="${C.leafLight}"/></linearGradient>
</defs>`;

function svg(title, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">${defs}<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>\n`;
}

function bgGradient(id, a, b) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
}

const covers = {
  "aloe-peau": svg(
    "Feuilles d'aloe vera perlées de gouttes",
    bgGradient("bg1", "#F4FAEF", C.mint) +
      `<rect width="${W}" height="${H}" fill="url(#bg1)"/>` +
      sun(930, 210, 92) +
      aloeLeaf({ x: 560, y: 840, len: 640, width: 70, angle: -24 }) +
      aloeLeaf({ x: 640, y: 840, len: 700, width: 78, angle: 6 }) +
      aloeLeaf({ x: 700, y: 840, len: 560, width: 66, angle: 32 }) +
      aloeLeaf({ x: 480, y: 840, len: 460, width: 58, angle: -48 }) +
      aloeLeaf({ x: 780, y: 840, len: 420, width: 54, angle: 56 }) +
      drop(640, 420, 18) +
      drop(668, 520, 11) +
      drop(610, 600, 8) +
      drop(480, 470, 13) +
      drop(780, 560, 10),
    C.mint,
  ),

  "jus-aloe": svg(
    "Verre de jus d'aloe vera et feuille",
    bgGradient("bg3", C.mint, "#DCEFD9") +
      `<rect width="${W}" height="${H}" fill="url(#bg3)"/>` +
      aloeLeaf({ x: 380, y: 820, len: 600, width: 64, angle: -10 }) +
      `<path d="M560 240 H800 L770 690 Q768 720 738 720 H622 Q592 720 590 690Z" fill="#fff" fill-opacity=".6" stroke="#fff" stroke-width="5"/>` +
      `<path d="M574 380 H786 L771 688 Q769 706 750 706 H610 Q591 706 589 688Z" fill="${C.leafLight}" fill-opacity=".85"/>` +
      drop(640, 470, 9) +
      drop(705, 560, 7) +
      drop(660, 630, 5) +
      sun(930, 170, 70, false),
    C.mint,
  ),

};


// Product illustrations: generic packaging shapes, deliberately not imitations
// of LR packaging, so they never pass for official product photos.
function bottle(x, y, w, h, fill = "#fff", liquid = C.leafLight) {
  const neck = w * 0.34;
  return `<g transform="translate(${x} ${y})">
    <rect x="${r(-neck / 2 - 6)}" y="${r(-h - 70)}" width="${r(neck + 12)}" height="56" rx="10" fill="${C.forest}"/>
    <rect x="${r(-neck / 2)}" y="${r(-h - 22)}" width="${r(neck)}" height="40" fill="${fill}" fill-opacity=".9"/>
    <rect x="${r(-w / 2)}" y="${-h}" width="${w}" height="${h}" rx="${r(w * 0.18)}" fill="${fill}" fill-opacity=".92" stroke="#fff" stroke-width="5"/>
    <rect x="${r(-w / 2 + 14)}" y="${r(-h * 0.62)}" width="${w - 28}" height="${r(h * 0.62 - 14)}" rx="${r(w * 0.14)}" fill="${liquid}" fill-opacity=".85"/>
    <rect x="${r(-w / 2 + 26)}" y="${r(-h * 0.5)}" width="${r(w * 0.5)}" height="${r(h * 0.22)}" rx="8" fill="#fff" fill-opacity=".85"/>
    <path d="M${r(-w / 2 + 34)} ${r(-h * 0.39)} h${r(w * 0.3)}" stroke="${C.leaf}" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function capsule(x, y, angle, a = C.leaf, b = C.cream) {
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><rect x="-70" y="-26" width="140" height="52" rx="26" fill="${b}" stroke="#fff" stroke-width="4"/><path d="M0 -26 H44 A26 26 0 0 1 44 26 H0Z" fill="${a}"/><rect x="-52" y="-14" width="34" height="8" rx="4" fill="#fff" fill-opacity=".7"/></g>`;
}

Object.assign(covers, {
  "produit-gel-boire": svg(
    "Illustration d'une bouteille de gel à boire et de feuilles d'aloe vera",
    `<circle cx="600" cy="420" r="300" fill="#fff" fill-opacity=".55"/>` +
      aloeLeaf({ x: 420, y: 800, len: 520, width: 60, angle: -18 }) +
      aloeLeaf({ x: 790, y: 800, len: 470, width: 56, angle: 20 }) +
      bottle(600, 700, 210, 420) +
      drop(720, 300, 14) +
      drop(470, 360, 10),
    C.mint,
  ),
  "produit-gelules": svg(
    "Illustration de gélules et de feuilles",
    `<circle cx="600" cy="420" r="300" fill="${C.mint}"/>` +
      capsule(520, 360, -24) +
      capsule(700, 420, 18, C.olive) +
      capsule(560, 520, 8, C.leafLight) +
      capsule(760, 280, -40, C.leaf) +
      leaf({ x: 330, y: 760, len: 280, width: 70, angle: -30, fill: C.leaf }) +
      leaf({ x: 880, y: 760, len: 260, width: 64, angle: 32, fill: C.forest }),
    C.cream,
  ),
  "produit-creme": svg(
    "Illustration d'un pot de crème et de feuilles",
    `<circle cx="600" cy="430" r="300" fill="#FFEFC9"/>` +
      leaf({ x: 420, y: 700, len: 330, width: 80, angle: -40, fill: C.leaf }) +
      leaf({ x: 790, y: 700, len: 300, width: 74, angle: 42, fill: C.olive }) +
      `<rect x="430" y="390" width="340" height="80" rx="20" fill="${C.forest}"/>
       <rect x="410" y="460" width="380" height="220" rx="36" fill="#fff" stroke="#fff" stroke-width="5"/>
       <rect x="470" y="520" width="260" height="90" rx="14" fill="${C.mint}"/>
       <path d="M500 566 h200" stroke="${C.leaf}" stroke-width="8" stroke-linecap="round"/>
       <path d="M560 380 q40 -60 80 0" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"/>`,
    C.cream,
  ),
  "produit-flacon": svg(
    "Illustration d'un flacon de concentré et de fruits",
    `<circle cx="600" cy="430" r="300" fill="#FFE7CF"/>` +
      bottle(600, 690, 170, 320, "#fff", "#FFB35C") +
      [[400, 640, 46, C.orange], [460, 690, 34, "#FFB35C"], [780, 650, 50, C.orange], [840, 700, 30, C.sun], [730, 700, 28, "#FFB35C"]]
        .map(([x, y, s, c]) => `<circle cx="${x}" cy="${y}" r="${s}" fill="${c}"/><circle cx="${x - s * 0.3}" cy="${y - s * 0.3}" r="${r(s * 0.22)}" fill="#fff" fill-opacity=".6"/>`)
        .join("") +
      leaf({ x: 420, y: 600, len: 120, width: 34, angle: -30, fill: C.leaf }) +
      leaf({ x: 790, y: 600, len: 120, width: 34, angle: 30, fill: C.leaf }),
    C.cream,
  ),
});

mkdirSync(OUT, { recursive: true });
for (const [name, content] of Object.entries(covers)) {
  writeFileSync(join(OUT, `${name}.svg`), content);
  console.log(`public/covers/${name}.svg  ${(content.length / 1024).toFixed(1)} KB`);
}
