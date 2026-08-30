#!/usr/bin/env python3
"""Convert navigation chains to house style: backticks joined by arrows.

    **Partner Center** > **Commerce** > **Payments**   ->   `Partner Center` -> `Commerce` -> `Payments`

Handles the separators `>`, `&gt;`, and the stray `›` alongside the correct arrow, and
normalises bold tokens to backticks. This is the convention pile from the
docs-drift-audit skill: mechanical, high volume, zero judgment.

Deliberately skips:
  - fenced code blocks (``` and ~~~)
  - lines that are markdown blockquotes (a leading >)
  - any token containing [ or ] or a backtick, which keeps markdown links intact

Usage:
    python3 sweep.py docs/            # dry run, prints samples
    python3 sweep.py docs/ --apply    # write changes

After applying, always verify no link targets changed:
    git diff -U0 -- docs/ | grep '^-' | grep -v '^---' | grep -oE '\\]\\([^)]*\\)' | sort > /tmp/before.txt
    git diff -U0 -- docs/ | grep '^+' | grep -v '^+++' | grep -oE '\\]\\([^)]*\\)' | sort > /tmp/after.txt
    diff /tmp/before.txt /tmp/after.txt && echo IDENTICAL
"""
import os
import re
import sys

ARROW = "→"          # the arrow this repo uses
STRAY = "›"          # a third separator found in the wild

# A nav token: bold or already-backticked, with no brackets or nested backticks.
TOKEN = r"(?:\*\*[^*\n\[\]`]{1,45}\*\*|`[^`\n\[\]]{1,45}`)"
SEP = rf"(?:{ARROW}|{STRAY}|&gt;|>)"
RUN = re.compile(rf"{TOKEN}(?:\s*{SEP}\s*{TOKEN})+")


def normalise(run: str) -> str:
    """Rewrite one matched navigation run into house style."""
    out = []
    for tok in re.findall(TOKEN, run):
        inner = tok[2:-2] if tok.startswith("**") else tok[1:-1]
        out.append("`" + inner.strip() + "`")
    return f" {ARROW} ".join(out)


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    root = args[0] if args else "docs"
    apply_changes = "--apply" in sys.argv

    if not os.path.isdir(root):
        print(f"error: {root} is not a directory")
        return 1

    changed_files = 0
    changed_lines = 0
    samples = []

    for dirpath, _dirnames, filenames in os.walk(root):
        for name in sorted(filenames):
            if not name.endswith((".md", ".mdx")):
                continue
            path = os.path.join(dirpath, name)
            with open(path, encoding="utf-8") as fh:
                lines = fh.read().split("\n")

            in_fence = False
            touched = False
            new_lines = []

            for line in lines:
                stripped = line.lstrip()
                if stripped.startswith("```") or stripped.startswith("~~~"):
                    in_fence = not in_fence
                # Never touch code blocks or real blockquotes.
                if in_fence or stripped.startswith(">"):
                    new_lines.append(line)
                    continue

                rewritten = RUN.sub(lambda m: normalise(m.group(0)), line)
                if rewritten != line:
                    touched = True
                    changed_lines += 1
                    if len(samples) < 8:
                        samples.append((path, line.strip()[:110], rewritten.strip()[:110]))
                new_lines.append(rewritten)

            if touched:
                changed_files += 1
                if apply_changes:
                    with open(path, "w", encoding="utf-8") as fh:
                        fh.write("\n".join(new_lines))

    label = "APPLIED" if apply_changes else "DRY RUN"
    print(f"{label}: {changed_lines} lines in {changed_files} files")
    for path, before, after in samples:
        print(f"\n  {path}\n  -  {before}\n  +  {after}")
    if not apply_changes and changed_lines:
        print("\nRe-run with --apply to write these changes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
