// Generates the botanical cover illustrations in public/covers/.
//   node tools/generate-covers.mjs
// They are lightweight brand-palette placeholders for editorial photography:
// every article references its cover by path, so swapping in a photo later is
// a front-matter change only. Outputs are committed.

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

  "gel-aloe": svg(
    "Goutte de gel d'aloe vera",
    `<circle cx="600" cy="430" r="300" fill="${C.mint}"/>` +
      `<path d="M600 160 C660 260 760 370 760 470 A160 160 0 0 1 440 470 C440 370 540 260 600 160Z" fill="url(#gel)" stroke="#fff" stroke-width="6"/>` +
      `<ellipse cx="545" cy="440" rx="26" ry="60" fill="#fff" fill-opacity=".55" transform="rotate(18 545 440)"/>` +
      leaf({ x: 380, y: 760, len: 300, width: 70, angle: -38, fill: C.leaf }) +
      leaf({ x: 820, y: 760, len: 300, width: 70, angle: 38, fill: C.olive }) +
      leaf({ x: 600, y: 780, len: 200, width: 52, angle: 0, fill: C.forest }),
    C.cream,
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

  "routine-matin": svg(
    "Lever de soleil sur des collines vertes",
    bgGradient("bg4", "#FFF3D6", C.cream) +
      `<rect width="${W}" height="${H}" fill="url(#bg4)"/>` +
      sun(600, 470, 150) +
      `<path d="M0 520 Q300 420 600 500 T1200 470 V800 H0Z" fill="${C.leafLight}"/>` +
      `<path d="M0 600 Q260 520 560 590 T1200 560 V800 H0Z" fill="${C.leaf}"/>` +
      `<path d="M0 690 Q340 620 700 680 T1200 660 V800 H0Z" fill="${C.forest}"/>` +
      leaf({ x: 140, y: 720, len: 180, width: 42, angle: -18, fill: C.olive }) +
      leaf({ x: 1060, y: 700, len: 160, width: 40, angle: 22, fill: C.olive }),
    C.cream,
  ),

  "hydratation": svg(
    "Gouttes d'eau et rondelles de concombre",
    bgGradient("bg5", "#F1F9F1", C.mint) +
      `<rect width="${W}" height="${H}" fill="url(#bg5)"/>` +
      [
        [330, 500, 120],
        [560, 600, 90],
        [470, 330, 70],
      ]
        .map(
          ([x, y, s]) =>
            `<circle cx="${x}" cy="${y}" r="${s}" fill="${C.leaf}"/><circle cx="${x}" cy="${y}" r="${s - 14}" fill="#E4F4D2"/><circle cx="${x}" cy="${y}" r="${r(s * 0.35)}" fill="${C.leafLight}" fill-opacity=".6"/>`,
        )
        .join("") +
      leaf({ x: 880, y: 760, len: 420, width: 90, angle: 14, fill: C.leaf }) +
      leaf({ x: 820, y: 760, len: 300, width: 70, angle: -22, fill: C.olive }) +
      drop(860, 360, 26) +
      drop(910, 470, 16) +
      drop(800, 520, 12) +
      drop(720, 250, 20) +
      drop(1010, 280, 14),
    C.mint,
  ),

  "sommeil": svg(
    "Croissant de lune au-dessus de feuillages",
    bgGradient("bg6", "#0B3F27", C.forest) +
      `<rect width="${W}" height="${H}" fill="url(#bg6)"/>` +
      `<circle cx="760" cy="250" r="120" fill="${C.sun}"/><circle cx="812" cy="214" r="112" fill="#0D4A2E"/>` +
      [
        [220, 140],
        [380, 90],
        [520, 200],
        [980, 150],
        [1080, 330],
        [300, 300],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${C.cream}" fill-opacity=".8"/>`)
        .join("") +
      leaf({ x: 260, y: 830, len: 420, width: 90, angle: -20, fill: "#1E6B42", rib: false }) +
      leaf({ x: 420, y: 830, len: 360, width: 80, angle: 12, fill: "#2A7A44", rib: false }) +
      leaf({ x: 880, y: 830, len: 460, width: 96, angle: 18, fill: "#1E6B42", rib: false }) +
      leaf({ x: 1020, y: 830, len: 300, width: 70, angle: -14, fill: "#2A7A44", rib: false }),
    C.forest,
  ),

  "petit-dejeuner": svg(
    "Bol de fruits frais et feuilles",
    `<circle cx="600" cy="430" r="320" fill="#FFEFC9"/>` +
      `<circle cx="470" cy="420" r="80" fill="${C.orange}"/><circle cx="470" cy="420" r="62" fill="#FFB35C"/>` +
      `<circle cx="610" cy="380" r="92" fill="${C.sun}"/>` +
      `<circle cx="740" cy="420" r="72" fill="${C.leafLight}"/><circle cx="740" cy="420" r="18" fill="${C.cream}"/>` +
      `<circle cx="545" cy="470" r="40" fill="${C.leaf}"/>` +
      leaf({ x: 640, y: 330, len: 140, width: 36, angle: 28, fill: C.forest }) +
      `<path d="M330 440 H870 A270 230 0 0 1 330 440Z" fill="${C.forest}"/>` +
      `<path d="M352 462 H848" stroke="#fff" stroke-opacity=".25" stroke-width="6" stroke-linecap="round"/>` +
      leaf({ x: 220, y: 780, len: 220, width: 56, angle: -30, fill: C.leaf }) +
      leaf({ x: 980, y: 780, len: 220, width: 56, angle: 30, fill: C.olive }),
    C.cream,
  ),

  "cheveux": svg(
    "Courbes fluides et feuille, évoquant des cheveux",
    bgGradient("bg8", C.cream, C.mint) +
      `<rect width="${W}" height="${H}" fill="url(#bg8)"/>` +
      [
        [C.forest, 0],
        [C.olive, 40],
        [C.leaf, 80],
        [C.leafLight, 120],
      ]
        .map(
          ([color, o]) =>
            `<path d="M${-40} ${560 + o} C 260 ${380 + o}, 460 ${760 + o}, 760 ${520 + o} S 1140 ${300 + o}, 1260 ${420 + o}" fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round"/>`,
        )
        .join("") +
      leaf({ x: 860, y: 330, len: 220, width: 60, angle: 34, fill: C.leaf }) +
      sun(260, 200, 60, false),
    C.cream,
  ),
};

mkdirSync(OUT, { recursive: true });
for (const [name, content] of Object.entries(covers)) {
  writeFileSync(join(OUT, `${name}.svg`), content);
  console.log(`public/covers/${name}.svg  ${(content.length / 1024).toFixed(1)} KB`);
}
