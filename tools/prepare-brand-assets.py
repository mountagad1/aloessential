"""Derive web-ready brand assets from the source artwork in brand/source/.

The source files are flat images on a white background. This script removes
the background, crops to the artwork and exports the sizes the site uses.

    python3 tools/prepare-brand-assets.py

Requires Pillow. Outputs go to public/brand/ and are committed, so the site
build itself never depends on Python.
"""

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "source"
OUT = ROOT / "public" / "brand"


def white_to_alpha(im: Image.Image, knee: float = 0.5) -> Image.Image:
    """Turn white into transparency, keeping saturated colours fully opaque.

    Alpha comes from how far a pixel is from white; anything further than
    `knee` is opaque. Colour is un-blended from white so anti-aliased edges
    stay clean on any background.
    """
    rgb = im.convert("RGB")
    out = Image.new("RGBA", rgb.size)
    src = rgb.load()
    dst = out.load()
    w, h = rgb.size
    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            deficit = max(255 - r, 255 - g, 255 - b) / 255
            a = min(1.0, deficit / knee)
            if a <= 0.004:
                dst[x, y] = (0, 0, 0, 0)
                continue
            un = lambda c: max(0, min(255, round((c - 255 * (1 - a)) / a)))
            dst[x, y] = (un(r), un(g), un(b), round(a * 255))
    return out


def flood_background_to_alpha(im: Image.Image, threshold: int = 238) -> Image.Image:
    """Remove only the white background connected to the image border.

    White details enclosed by the artwork (droplet highlights, separators)
    are kept. Edge pixels are softened with white_to_alpha.
    """
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    bg = Image.new("L", rgb.size, 0)
    bgp = bg.load()
    queue = deque()
    for x in range(w):
        queue.extend([(x, 0), (x, h - 1)])
    for y in range(h):
        queue.extend([(0, y), (w - 1, y)])
    while queue:
        x, y = queue.popleft()
        if bgp[x, y]:
            continue
        if min(px[x, y]) < threshold:
            continue
        bgp[x, y] = 255
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not bgp[nx, ny]:
                queue.append((nx, ny))

    edge = bg.filter(ImageFilter.MaxFilter(5))
    soft = white_to_alpha(rgb, knee=0.35)
    out = rgb.convert("RGBA")
    op, sp, bp, ep = out.load(), soft.load(), bg.load(), edge.load()
    for y in range(h):
        for x in range(w):
            if bp[x, y]:
                op[x, y] = (0, 0, 0, 0)
            elif ep[x, y]:
                op[x, y] = sp[x, y]
    return out


def crop_to_content(im: Image.Image, pad: int = 4) -> Image.Image:
    box = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    l, t, r, b = box
    return im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))


def recolor(im: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    solid = Image.new("RGBA", im.size, rgb + (0,))
    solid.putalpha(im.getchannel("A"))
    return solid


def save_webp(im: Image.Image, name: str, height: int | None = None, width: int | None = None) -> None:
    if height:
        im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    elif width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    path = OUT / name
    im.save(path, "WEBP", quality=90, method=6)
    print(f"{path.relative_to(ROOT)}  {im.width}x{im.height}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    wordmark = crop_to_content(white_to_alpha(Image.open(SRC / "wordmark.webp")))
    save_webp(wordmark, "wordmark.webp", height=80)
    save_webp(recolor(wordmark, (255, 255, 255)), "wordmark-white.webp", height=80)

    icon = crop_to_content(flood_background_to_alpha(Image.open(SRC / "icon.webp")), pad=8)
    side = max(icon.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(icon, ((side - icon.width) // 2, (side - icon.height) // 2))
    save_webp(square, "icon-720.webp", width=720)
    save_webp(square, "icon-400.webp", width=400)
    save_webp(square, "icon-160.webp", width=160)

    # Favicons: PNG for broad support, apple-touch icon on cream (iOS ignores alpha).
    square.resize((32, 32), Image.LANCZOS).save(OUT / "favicon-32.png")
    touch = Image.new("RGBA", (180, 180), (255, 248, 233, 255))
    inner = square.resize((148, 148), Image.LANCZOS)
    touch.alpha_composite(inner, (16, 16))
    touch.convert("RGB").save(OUT / "apple-touch-icon.png")
    print("public/brand/favicon-32.png, public/brand/apple-touch-icon.png")


if __name__ == "__main__":
    main()
