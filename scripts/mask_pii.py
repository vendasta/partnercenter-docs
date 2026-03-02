#!/usr/bin/env python3
"""
PII masking for documentation screenshots.

Blurs or redacts personally identifiable information (names, emails,
phone numbers, account IDs) in PNG screenshots before they are committed
to the documentation repository.

Usage:
    python scripts/mask_pii.py path/to/screenshot.png
    python scripts/mask_pii.py path/to/img/directory/

Status: STUB — manual review required before merging.
Future implementation will use Pillow for automated region blurring.
"""

import sys
from pathlib import Path


def check_for_pii(image_path: Path) -> None:
    """
    Placeholder: reminds the reviewer to check for PII.
    Future: use OCR or annotated regions to detect and blur PII automatically.
    """
    print(f"WARNING: Manual PII review required for {image_path}")
    print("  - Check for partner names, email addresses, phone numbers, account IDs")
    print("  - Blur or replace any sensitive data before merging the PR")
    print("  - See: partnercenter-docs CLAUDE.md — 'Blur or replace sensitive data (PII) in screenshots'")
    print()


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/mask_pii.py <image-or-directory>", file=sys.stderr)
        sys.exit(1)

    target = Path(sys.argv[1])

    if target.is_dir():
        pngs = sorted(target.glob("*.png"))
        if not pngs:
            print(f"No PNG files found in {target}")
            return
        for png in pngs:
            check_for_pii(png)
    elif target.is_file():
        check_for_pii(target)
    else:
        print(f"ERROR: Path not found: {target}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
