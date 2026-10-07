#!/usr/bin/env python3
"""Convert navigation chains to house style: backticks joined by arrows.

    **Partner Center** > **Commerce** > **Payments**   ->   `Partner Center` -> `Commerce` -> `Payments`

Handles the separators `>`, `&gt;`, and the stray `›` alongside the correct arrow, and
normalises bold tokens to backticks. This is the convention pile from the
docs-drift-audit skill: mechanical, high volume, zero judgment.

Handles two shapes of chain:

    **A** > **B** > **C**     separate bold spans
    **A > B > C**             one bold span wrapping the whole chain

The second shape was invisible to this script until 2026-09-18, which made it
report "0 lines in 0 files" on corpora that were full of it. See SKILL.md,
Phase 5 Pass A.

Deliberately skips:
  - fenced code blocks (``` and ~~~)
  - lines that are markdown blockquotes (a leading >)
  - any token containing [ or ] or a backtick, which keeps markdown links intact
  - bold spans whose segments do not look like UI labels (empty, over 45
    characters, or containing no letter), so prose like **10 > 5** is left alone

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

# One bold span containing the whole chain: **A > B > C**
# Wider than TOKEN because the cap applies per segment, not to the whole run.
BOLD_SPAN = re.compile(r"\*\*([^*\n\[\]`]{1,200})\*\*")
HAS_LETTER = re.compile(r"[A-Za-z]")
SPLIT_SEP = re.compile(SEP)


def looks_like_ui_label(text: str) -> bool:
    """True if this segment reads like a UI element rather than prose.

    Nav labels in these repos are short and start capitalised. Requiring both
    is what stops a bold sentence containing a > from being rewritten into a
    navigation chain that does not exist.
    """
    if not text or len(text) > 45 or not HAS_LETTER.search(text):
        return False
    if not text[0].isupper() and not text[0].isdigit():
        return False
    return len(text.split()) <= 5


def expand_bold_chain(match: "re.Match") -> str:
    """Rewrite **A > B > C** as `A` -> `B` -> `C`, or leave it untouched.

    Returns the original text unless every segment reads like a UI label, so a
    bold sentence that merely contains a > is not mangled into fake navigation.
    """
    parts = [p.strip() for p in SPLIT_SEP.split(match.group(1))]
    if len(parts) < 2:
        return match.group(0)
    if not all(looks_like_ui_label(p) for p in parts):
        return match.group(0)
    return f" {ARROW} ".join("`" + p + "`" for p in parts)


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

                # Expand single-span chains first; RUN then picks up any
                # mixed line such as **A** > **B > C**, since it accepts
                # already-backticked tokens.
                rewritten = BOLD_SPAN.sub(expand_bold_chain, line)
                rewritten = RUN.sub(lambda m: normalise(m.group(0)), rewritten)
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
