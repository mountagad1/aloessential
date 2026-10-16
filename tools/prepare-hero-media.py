"""Derive the homepage harvest illustration from brand/source/aloe-harvest.webp.

    python3 tools/prepare-hero-media.py

Requires Pillow. The source is a frame captured from a video player: the
bottom 120 px hold the player controls and are cropped away. Outputs go to
public/media/ and are committed, so the site build never depends on Python.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "source" / "aloe-harvest.webp"
OUT = ROOT / "public" / "media"
CROP_BOTTOM = 820  # first row of the player control bar is ~826
WIDTHS = (640, 1024, 1600)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(SRC).convert("RGB")
    im = im.crop((0, 0, im.width, CROP_BOTTOM))
    for w in WIDTHS:
        h = round(im.height * w / im.width)
        out = OUT / f"aloe-harvest-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, quality=78, method=6)
        print(f"{out.relative_to(ROOT)}  {w}x{h}  {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
