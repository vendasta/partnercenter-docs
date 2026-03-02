#!/usr/bin/env python3
"""
Idempotent markdown image injection.

Finds a text anchor in a markdown file and inserts or updates an image
reference below it. Running this script multiple times with the same
arguments produces identical output.

Usage:
    python scripts/update_markdown.py \
        --doc path/to/guide.mdx \
        --after "### Company Name" \
        --image "./img/partner-branding-company-name.png" \
        --alt "Company Name field on the Partner Branding page"
"""

import argparse
import re
import sys
from pathlib import Path
from typing import List, Optional


IMAGE_PATTERN = re.compile(r"^!\[.*\]\(.*\)\s*$")


def find_anchor_line(lines: List[str], anchor: str) -> Optional[int]:
    """Return the 0-based index of the first line containing the anchor text."""
    for i, line in enumerate(lines):
        if anchor in line:
            return i
    return None


def find_existing_image(lines: List[str], start: int) -> Optional[int]:
    """
    Starting after `start`, skip blank lines and look for an existing
    image reference. Returns its index if found, None otherwise.
    """
    i = start + 1
    while i < len(lines) and lines[i].strip() == "":
        i += 1
    if i < len(lines) and IMAGE_PATTERN.match(lines[i].strip()):
        return i
    return None


def build_image_line(alt: str, image_path: str) -> str:
    return f"![{alt}]({image_path})"


def inject_image(
    doc_path: Path,
    anchor: str,
    image_path: str,
    alt: str,
    dry_run: bool = False,
) -> bool:
    """
    Insert or update an image reference in a markdown file.

    Returns True if the file was modified, False if no changes were needed.
    """
    content = doc_path.read_text(encoding="utf-8")
    lines = content.splitlines(keepends=True)
    stripped = [l.rstrip("\n\r") for l in lines]

    anchor_idx = find_anchor_line(stripped, anchor)
    if anchor_idx is None:
        print(f"ERROR: Anchor text not found: '{anchor}'", file=sys.stderr)
        print(f"  File: {doc_path}", file=sys.stderr)
        return False

    new_image_line = build_image_line(alt, image_path)
    existing_idx = find_existing_image(stripped, anchor_idx)

    if existing_idx is not None:
        if stripped[existing_idx] == new_image_line:
            print(f"OK (no change): {image_path}")
            return False
        lines[existing_idx] = new_image_line + "\n"
        print(f"UPDATED: {image_path} (line {existing_idx + 1})")
    else:
        insert_at = anchor_idx + 1
        insertion = f"\n{new_image_line}\n\n"
        lines.insert(insert_at, insertion)
        print(f"INSERTED: {image_path} (after line {anchor_idx + 1})")

    if not dry_run:
        doc_path.write_text("".join(lines), encoding="utf-8")

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Idempotent markdown image injection"
    )
    parser.add_argument(
        "--doc", required=True, type=Path, help="Path to the markdown file"
    )
    parser.add_argument(
        "--after",
        required=True,
        help="Text anchor to insert the image after (e.g. a heading)",
    )
    parser.add_argument(
        "--image", required=True, help="Relative image path for the markdown syntax"
    )
    parser.add_argument("--alt", required=True, help="Alt text for the image")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would change without writing",
    )
    args = parser.parse_args()

    if not args.doc.exists():
        print(f"ERROR: File not found: {args.doc}", file=sys.stderr)
        sys.exit(1)

    changed = inject_image(
        doc_path=args.doc,
        anchor=args.after,
        image_path=args.image,
        alt=args.alt,
        dry_run=args.dry_run,
    )

    if not changed and not args.dry_run:
        sys.exit(0)


if __name__ == "__main__":
    main()
