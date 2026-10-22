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

# Small screens: the hero frame is about 1.25–1.9 times wider than tall
# (height clamp(18rem, 52vw, …) in global.css), so a phone only shows ~70 %
# of the wide picture. A 1.4:1 crop centred where `object-position: 40%`
# already looks (the harvester) carries far fewer pixels for the same view.
MOBILE_RATIO = 1.4
MOBILE_X = 0.4
MOBILE_WIDTHS = (480, 800, 1100)
MOBILE_QUALITY = 70


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(SRC).convert("RGB")
    im = im.crop((0, 0, im.width, CROP_BOTTOM))
    for w in WIDTHS:
        h = round(im.height * w / im.width)
        out = OUT / f"aloe-harvest-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, quality=78, method=6)
        print(f"{out.relative_to(ROOT)}  {w}x{h}  {out.stat().st_size / 1024:.1f} KB")

    cw = round(im.height * MOBILE_RATIO)
    x0 = round(MOBILE_X * (im.width - cw))
    mobile = im.crop((x0, 0, x0 + cw, im.height))
    for w in MOBILE_WIDTHS:
        h = round(mobile.height * w / mobile.width)
        out = OUT / f"aloe-harvest-mobile-{w}.webp"
        mobile.resize((w, h), Image.LANCZOS).save(out, quality=MOBILE_QUALITY, method=6)
        print(f"{out.relative_to(ROOT)}  {w}x{h}  {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
