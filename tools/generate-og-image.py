"""Generate the default share image (Open Graph / Twitter) from the brand lockup.

    python3 tools/generate-og-image.py

Requires Pillow. Writes public/brand/og-default.png (1200 x 630, the size
social networks expect). The output is committed, so the site build never
depends on Python. Article covers are SVG, which several networks do not
accept, so every page shares this raster image for now.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "source" / "lockup.webp"
OUT = ROOT / "public" / "brand" / "og-default.png"
W, H = 1200, 630
MARGIN = 70


def main() -> None:
    lockup = Image.open(SRC).convert("RGB")
    # The source artwork sits on a flat off-white background: extend it.
    canvas = Image.new("RGB", (W, H), lockup.getpixel((2, 2)))
    scale = min((W - 2 * MARGIN) / lockup.width, (H - 2 * MARGIN) / lockup.height)
    size = (round(lockup.width * scale), round(lockup.height * scale))
    lockup = lockup.resize(size, Image.LANCZOS)
    canvas.paste(lockup, ((W - size[0]) // 2, (H - size[1]) // 2))
    canvas.save(OUT, optimize=True)
    print(f"{OUT.relative_to(ROOT)}  {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
