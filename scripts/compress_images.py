"""Shrink screenshots without changing what they look like.

PNG: store with a 256-colour palette (no dither), which is how screenshot
tools save UI captures anyway; pixel dimensions are untouched. JPEG: re-encode
at quality 82, progressive. A file is only rewritten when the result is
smaller, and formats are kept as they are (some .jpg files are PNGs or GIFs;
GIFs are left alone). Translated articles keep byte-identical copies of the
English images under docusaurus/i18n/, so --mirror-i18n writes the same
compressed bytes over every copy that matched the original.

Needs Pillow:  pip install Pillow

Usage, from docusaurus/:
    python ../scripts/compress_images.py --dry-run $(find docs static training -type f \\( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \\) -size +200k)
    python ../scripts/compress_images.py --mirror-i18n <same file list>
"""
import io
import os
import sys

from PIL import Image

I18N_ROOTS = {
    'docs': ['i18n/{loc}/docusaurus-plugin-content-docs/current'],
    'training': ['i18n/{loc}/docusaurus-plugin-content-docs-training/current'],
}
LOCALES = ['fr', 'es']


def compress(path):
    """Return the compressed bytes for an image, or None to leave it alone."""
    im = Image.open(path)
    buf = io.BytesIO()
    if im.format == 'JPEG':
        im.save(buf, 'JPEG', quality=82, optimize=True, progressive=True)
    elif im.format == 'PNG':
        src = im if im.mode in ('RGBA', 'P', 'L') else im.convert('RGBA')
        if src.mode == 'RGBA':
            src = src.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
        src.save(buf, 'PNG', optimize=True)
    else:
        return None
    return buf.getvalue()


def i18n_copies(path):
    """Paths of this image's copies in the translated trees, existing ones only."""
    top, _, rest = path.partition('/')
    out = []
    for root in I18N_ROOTS.get(top, []):
        for loc in LOCALES:
            copy = os.path.join(root.format(loc=loc), rest)
            if os.path.isfile(copy):
                out.append(copy)
    return out


def main(argv):
    dry = '--dry-run' in argv
    mirror = '--mirror-i18n' in argv
    files = [a for a in argv if not a.startswith('--')]
    total_in = total_out = mirrored = 0
    for path in files:
        try:
            original = open(path, 'rb').read()
            data = compress(path)
        except Exception as exc:  # unreadable or not an image
            print(f'SKIP {path}: {exc}')
            continue
        if data is None or len(data) >= len(original):
            continue
        total_in += len(original)
        total_out += len(data)
        copies = [c for c in i18n_copies(path) if mirror and open(c, 'rb').read() == original]
        print(f'{len(original) // 1024:6d} -> {len(data) // 1024:6d} KB  {path}' + (f'  (+{len(copies)} i18n)' if copies else ''))
        if dry:
            continue
        open(path, 'wb').write(data)
        for copy in copies:
            open(copy, 'wb').write(data)
            mirrored += 1
    print(f'{total_in // 1024 // 1024} MB -> {total_out // 1024 // 1024} MB over {len(files)} files, '
          f'{mirrored} i18n copies updated' + (' (dry run)' if dry else ''))


if __name__ == '__main__':
    main(sys.argv[1:])
