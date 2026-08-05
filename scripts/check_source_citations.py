#!/usr/bin/env python3
"""
Flag factual claims in Learn tab training content that ship without a source citation.

Advisory only. This script never decides whether a claim is true — it decides whether a
future auditor would be able to check it. Exit code is 0 unless --strict is passed.

The rule this enforces is documented in .cursor/rules/source-citation-required and in
CLAUDE.md. The running audit trail lives in SOURCE-COMMENT-HANDOFF.md.

Usage
-----
  # what a PR added, compared against the base branch (this is what CI runs)
  python3 scripts/check_source_citations.py --base origin/master

  # sweep whole files instead of just added lines
  python3 scripts/check_source_citations.py --all

  # sweep specific files
  python3 scripts/check_source_citations.py --all --paths docusaurus/training/vibe/meet-vibe.mdx
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

TRAINING_ROOT = "docusaurus/training/"

# A comment that satisfies the rule. Accepts the two documented forms, the explicit
# waiver, and the older "<something> source:" phrasing already in the tree.
CITATION_RE = re.compile(
    r"\{/\*\s*(?:audit\b|no-source-needed\s*:|[a-z ]{0,24}source\s*:)",
    re.IGNORECASE,
)

# An inline markdown link to a real URL also counts — the claim is sourced in the prose.
INLINE_LINK_RE = re.compile(r"\]\(https?://")

# Product, SKU and tier names. Used only to qualify entitlement claims, never on their
# own — a bare product mention is not a claim. Extend this list as the lineup changes.
PRODUCT_NAMES = [
    "Reputation AI", "Reputation Management", "Conversations AI", "Social AI",
    "Social Marketing", "Business App", "Snapshot Report", "Executive Report",
    "Local SEO", "Advertising Intelligence", "MatchCraft", "Clickable.bio",
    "CalendarHero", "Kixie", "WooCommerce", "Duda", "Accelerated Templated Website",
    "Vendasta Payments", "AI Chat Receptionist", "AI Voice Receptionist",
    "Voice Receptionist", "Sales Assistant", "Task Manager", "Marketplace",
    "Partner Center", "WordPress Hosting", "Alpha SEO", "Campaigns Pro",
    "Google Business Profile", "Vibe", "AI Workforce", "Autopilot",
]
PRODUCT_RE = re.compile("|".join(re.escape(p) for p in PRODUCT_NAMES))

UNITS = (
    r"products?|widgets?|pages?|languages?|words?|sources?|data\s+points?|"
    r"days?|minutes?|hours?|weeks?|months?|years?|countries|country|reviews?|"
    r"contacts?|users?|seats?|options?|templates?|integrations?|platforms?|"
    r"networks?|stars?|KPIs?|leads?|calls?|posts?|keywords?"
)

CLAIM_RULES: list[tuple[str, re.Pattern[str]]] = [
    ("percentage", re.compile(r"\d+(?:\.\d+)?\s?%")),
    ("multiplier", re.compile(r"\b\d+(?:\.\d+)?x\b", re.IGNORECASE)),
    ("price", re.compile(r"\$\s?\d")),
    (
        "qualified number",
        re.compile(
            r"\b(?:over|under|up\s+to|more\s+than|less\s+than|fewer\s+than|"
            r"at\s+least|at\s+most|as\s+many\s+as)\s+\$?\d",
            re.IGNORECASE,
        ),
    ),
    ("counted noun", re.compile(rf"\b\d[\d,]*\+?\s+(?:business\s+)?(?:{UNITS})\b", re.IGNORECASE)),
    ("default value", re.compile(r"\b(?:defaults?\s+to|by\s+default)\b", re.IGNORECASE)),
    ("UI navigation path", re.compile(r"[A-Za-z]\s*(?:→|➜)\s*[A-Z]")),
    (
        "research attribution",
        re.compile(r"\b(?:according\s+to|study|survey|research\s+(?:shows|found))\b", re.IGNORECASE),
    ),
]

ENTITLEMENT_RE = re.compile(
    r"\b(?:only\s+works\s+when|only\s+available|only\s+with|must\s+be\s+active|"
    r"gated\s+behind|requires?|required\s+(?:for|to)|included\s+(?:in|with)|"
    r"free\s+(?:on|with)|limited\s+to|available\s+(?:on|with)|part\s+of|"
    r"add-on|entitle|prerequisite|upgrade\s+to)\b",
    re.IGNORECASE,
)

# Lines that are structure, chrome or learning objectives rather than claims.
SKIP_SUBSTRINGS = (
    "<CourseProgressBar", "<SectionFeedback", "courseId=", "sidebar_position",
    "Estimated time", "&#10003;", "import ", "className=\"principle-area\"",
    "<PageActions", "<Cards",
)
SKIP_LINE_RE = re.compile(r"^\s*#{1,6}\s+Step\s+\d", re.IGNORECASE)

# In Practice blocks are illustrative narratives, not claims the reader should act on.
# Both markup styles appear in the tree.
IN_PRACTICE_OPEN_RE = re.compile(r"className=\"in-practice\"|:::tip\s+In Practice", re.IGNORECASE)
IN_PRACTICE_CLOSE_RE = re.compile(r"^\s*(?:</div>|:::)\s*$")

# Keep a PR comment readable even when someone lands a whole new course.
MAX_ROWS = 40

# Lines that mirror a claim made elsewhere on the page. Reported separately as a
# sync reminder, because the body copy is where the citation belongs.
MIRROR_RE = re.compile(
    r"<FlipCard|<KnowledgeCheck|correctIndex"
    r"|type:\s*\"(?:mcq|truefalse|match|sort|whicharea|fillblank|ordering|sequence)\""
)


def is_training_mdx(path: str) -> bool:
    return path.startswith(TRAINING_ROOT) and path.endswith(".mdx")


def git(*args: str) -> str:
    return subprocess.run(
        ["git", *args], check=True, capture_output=True, text=True
    ).stdout


def changed_training_files(base: str) -> list[str]:
    out = git("diff", "--name-only", "--diff-filter=d", f"{base}...HEAD")
    return [p for p in out.splitlines() if is_training_mdx(p)]


def added_line_numbers(base: str, path: str) -> set[int]:
    """Line numbers in the new file that this diff added."""
    out = git("diff", "--unified=0", f"{base}...HEAD", "--", path)
    added: set[int] = set()
    for line in out.splitlines():
        m = re.match(r"^@@ -\S+ \+(\d+)(?:,(\d+))? @@", line)
        if m:
            start, count = int(m.group(1)), int(m.group(2) or 1)
            added.update(range(start, start + count))
    return added


def scan(path: str, only_lines: set[int] | None) -> tuple[list[dict], list[dict]]:
    """Return (findings, mirrors) for one file."""
    with open(path, encoding="utf-8", newline="") as fh:
        lines = fh.read().splitlines()

    # Section index, so a nav path can be judged against its whole procedure rather
    # than the line it sits on. A step-by-step page has a nav path on every line;
    # citing the procedure once is the reasonable bar, not once per step.
    section_of: dict[int, int] = {}
    section_cited: dict[int, bool] = {}
    current = 0
    for i, raw in enumerate(lines, start=1):
        if re.match(r"^\s*#{2,3}\s+\S", raw):
            current = i
        section_of[i] = current
        if CITATION_RE.search(raw):
            section_cited[current] = True

    findings: list[dict] = []
    mirrors: list[dict] = []
    nav_sections_reported: set[int] = set()

    in_fence = False
    in_practice = False
    frontmatter_bounds = 0

    for idx, raw in enumerate(lines, start=1):
        line = raw.rstrip("\r")
        stripped = line.strip()

        if stripped == "---" and frontmatter_bounds < 2 and idx <= 20:
            frontmatter_bounds += 1
            continue
        if frontmatter_bounds == 1:
            continue
        if stripped.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or not stripped:
            continue

        if in_practice:
            if IN_PRACTICE_CLOSE_RE.match(line):
                in_practice = False
            continue
        if IN_PRACTICE_OPEN_RE.search(line):
            in_practice = True
            continue
        if only_lines is not None and idx not in only_lines:
            continue
        if SKIP_LINE_RE.match(line) or any(s in line for s in SKIP_SUBSTRINGS):
            continue

        triggers = [name for name, rx in CLAIM_RULES if rx.search(line)]
        if ENTITLEMENT_RE.search(line) and PRODUCT_RE.search(line):
            triggers.append("entitlement claim")
        if not triggers:
            continue

        # A claim counts as cited if the citation sits on the same line, or on the
        # nearest non-blank line either side of it.
        neighbourhood = [line]
        for step in (-1, 1):
            j = idx - 1 + step
            while 0 <= j < len(lines) and not lines[j].strip():
                j += step
            if 0 <= j < len(lines):
                neighbourhood.append(lines[j])

        # A citation for a table row is conventionally placed after the whole table,
        # so widen the neighbourhood to the contiguous table block and what follows it.
        if stripped.startswith("|"):
            start = end = idx - 1
            while start > 0 and lines[start - 1].strip().startswith("|"):
                start -= 1
            while end + 1 < len(lines) and lines[end + 1].strip().startswith("|"):
                end += 1
            neighbourhood.extend(lines[start : min(end + 4, len(lines))])

        cited = any(CITATION_RE.search(n) for n in neighbourhood) or INLINE_LINK_RE.search(line)

        if cited:
            continue

        triggers = sorted(set(triggers))

        if triggers == ["UI navigation path"]:
            section = section_of[idx]
            if section_cited.get(section) or section in nav_sections_reported:
                continue
            nav_sections_reported.add(section)

        record = {"line": idx, "triggers": triggers, "text": stripped}
        (mirrors if MIRROR_RE.search(line) else findings).append(record)

    return findings, mirrors


def truncate(s: str, n: int = 150) -> str:
    s = s.replace("|", r"\|")
    return s if len(s) <= n else s[: n - 1] + "…"


def render(results: dict[str, tuple[list[dict], list[dict]]]) -> str:
    total = sum(len(f) for f, _ in results.values())
    mirror_total = sum(len(m) for _, m in results.values())

    if not total and not mirror_total:
        return (
            "### Source citation check\n\n"
            "No uncited claims found in the training content this PR touches.\n"
        )

    out = ["### Source citation check", ""]
    if total:
        out.append(
            f"Found **{total}** claim{'s' if total != 1 else ''} without a nearby source "
            "citation. This check is advisory and does not block the merge, but each one "
            "is a fact a future auditor will not be able to trace."
        )
        out.append("")
        shown = 0
        for path, (findings, _) in sorted(results.items()):
            if not findings or shown >= MAX_ROWS:
                continue
            out.append(f"**`{path}`**")
            out.append("")
            out.append("| Line | Looks like | Content |")
            out.append("|------|------------|---------|")
            for f in findings:
                if shown >= MAX_ROWS:
                    break
                out.append(f"| {f['line']} | {', '.join(f['triggers'])} | {truncate(f['text'])} |")
                shown += 1
            out.append("")
        if total > shown:
            out.append(
                f"Showing the first {shown}. {total - shown} more not listed — run "
                "`python3 scripts/check_source_citations.py --base origin/master` locally "
                "for the full list."
            )
            out.append("")

    if mirror_total:
        plural = "s" if mirror_total != 1 else ""
        out.append(
            f"<details><summary>Plus {mirror_total} FlipCard or Knowledge Check line{plural} "
            "repeating a figure — cite the body copy, then make sure these match it</summary>"
        )
        out.append("")
        for path, (_, ms) in sorted(results.items()):
            for m in ms:
                out.append(f"- `{path}` line {m['line']} — {truncate(m['text'], 110)}")
        out.append("")
        out.append("</details>")
        out.append("")

    out.append(
        "Fix by adding `{/* Source: URL — verified YYYY-MM-DD */}` next to the claim, or "
        "`{/* Audit YYYY-MM-DD: finding. Source: URL */}` if the source disagrees with it. "
        "See `.cursor/rules/source-citation-required` for placement and sourcing rules. "
        "If a claim genuinely needs no source, mark it `{/* no-source-needed: reason */}`."
    )
    return "\n".join(out) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--base", default="origin/master", help="base ref to diff against")
    ap.add_argument("--all", action="store_true", help="scan whole files, not just added lines")
    ap.add_argument("--paths", nargs="*", help="explicit files to scan (implies --all)")
    ap.add_argument("--output", help="write the markdown report here as well as stdout")
    ap.add_argument("--strict", action="store_true", help="exit 1 when findings exist")
    args = ap.parse_args()

    if args.paths:
        files = [p for p in args.paths if is_training_mdx(p)]
        scan_all = True
    elif args.all:
        files = sorted(str(p) for p in Path(TRAINING_ROOT).rglob("*.mdx"))
        scan_all = True
    else:
        try:
            files = changed_training_files(args.base)
        except subprocess.CalledProcessError as exc:
            print(f"git diff against {args.base} failed: {exc.stderr.strip()}", file=sys.stderr)
            return 0
        scan_all = False

    results: dict[str, tuple[list[dict], list[dict]]] = {}
    for path in files:
        if not Path(path).exists():
            continue
        only = None if scan_all else added_line_numbers(args.base, path)
        if only is not None and not only:
            continue
        findings, mirrors = scan(path, only)
        if findings or mirrors:
            results[path] = (findings, mirrors)

    report = render(results)
    print(report)
    if args.output:
        Path(args.output).write_text(report, encoding="utf-8")

    findings_total = sum(len(f) for f, _ in results.values())
    return 1 if (args.strict and findings_total) else 0


if __name__ == "__main__":
    sys.exit(main())
