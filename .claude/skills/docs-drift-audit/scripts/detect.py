#!/usr/bin/env python3
"""Find drift the docs reveal about themselves, with no platform access needed.

Two detectors, from the docs-drift-audit skill:

  contradictions  The same destination reached via different parents, or spelled
                  differently. Where the docs already disagree with themselves,
                  one side is wrong and no screenshot is required to know it.

  casedrift       The same UI label written more than one way. Mostly noise
                  (Save/SAVE); the signal is real navigation labels drifting
                  between title and sentence case.

Usage:
    python3 detect.py docs/                    # both detectors
    python3 detect.py docs/ --contradictions
    python3 detect.py docs/ --casedrift
"""
import collections
import os
import re
import sys

PAIR = re.compile(
    r"(?:`([^`\n]{1,40})`|\*\*([^*\n]{1,40})\*\*)"      # parent
    r"\s*(?:→|›|&gt;|>)\s*"                              # separator
    r"(?:`([^`\n]{1,40})`|\*\*([^*\n]{1,40})\*\*)"      # child
)
LABEL = re.compile(r"(?:`([^`\n]{2,40})`|\*\*([^*\n]{2,40})\*\*)")


def walk(root):
    for dirpath, _dirnames, filenames in os.walk(root):
        for name in sorted(filenames):
            if name.endswith((".md", ".mdx")):
                path = os.path.join(dirpath, name)
                with open(path, encoding="utf-8", errors="ignore") as fh:
                    for lineno, line in enumerate(fh, 1):
                        yield path, lineno, line


def contradictions(root, limit=20):
    variants = collections.defaultdict(set)
    counts = collections.Counter()
    for path, _lineno, line in walk(root):
        for m in PAIR.finditer(line):
            parent = (m.group(1) or m.group(2)).strip()
            child = (m.group(3) or m.group(4)).strip()
            key = child.lower().replace(" ", "")
            variants[key].add((parent, child))
            counts[key] += 1

    print("=== destinations reached via different parents, or spelled differently ===")
    print("(a destination legitimately shared by separate products is not a bug -- check before flagging)\n")
    shown = 0
    for key, pairs in sorted(variants.items(), key=lambda kv: -len(kv[1])):
        if len(pairs) < 2:
            continue
        labels = {c for _p, c in pairs}
        parents = {p for p, _c in pairs}
        if len(labels) < 2 and len(parents) < 2:
            continue
        shown += 1
        if shown > limit:
            break
        print(f"-- '{key}': {len(pairs)} variants across {counts[key]} occurrences")
        for parent, child in sorted(pairs):
            print(f"     {parent} -> {child}")
        print()


def casedrift(root, limit=30):
    forms = collections.defaultdict(collections.Counter)
    for _path, _lineno, line in walk(root):
        for m in LABEL.finditer(line):
            text = (m.group(1) or m.group(2)).strip()
            if not re.fullmatch(r"[A-Za-z][A-Za-z ]{1,38}", text):
                continue
            if len(text.split()) > 4:
                continue
            forms[text.lower()][text] += 1

    rows = [(sum(c.values()), k, c) for k, c in forms.items() if len(c) > 1]
    rows.sort(reverse=True)
    print("=== same UI label spelled inconsistently ===")
    print("(most of this is noise -- look for real navigation labels only)\n")
    for total, _key, counter in rows[:limit]:
        joined = " | ".join(f"{v}x {n!r}" for n, v in counter.most_common())
        print(f"{total:5d}  {joined}")
    print(f"\nTOTAL labels with case drift: {len(rows)}")


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    root = args[0] if args else "docs"
    if not os.path.isdir(root):
        print(f"error: {root} is not a directory")
        return 1

    want_c = "--contradictions" in sys.argv
    want_d = "--casedrift" in sys.argv
    if not want_c and not want_d:
        want_c = want_d = True

    if want_c:
        contradictions(root)
    if want_c and want_d:
        print()
    if want_d:
        casedrift(root)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
