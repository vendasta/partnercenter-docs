#!/usr/bin/env python3
"""Pre-PR safety check for support knowledge captures. Standard library only.

Checks the given Markdown/MDX files for things that break the docs build or
must never be published. Exits 1 if any ERROR is found.

Only problems introduced by the change are reported: each file is compared with
its version on --base (default origin/master), so pre-existing issues in an
article never block a capture. Run from the repository root.

Usage:
    python3 check_capture.py --profile partnercenter FILE [FILE ...]
    python3 check_capture.py --profile businessapp   FILE [FILE ...]
    python3 check_capture.py --profile internal      FILE [FILE ...]
"""
import argparse
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

SECRETS = [
    (r"(?i)\bpassword\s*[:=]\s*(?!\[REDACTED)[^\s|`*]{4,}", "password value"),
    (r"(?i)[?&](api_?key|access_token|client_secret|secret)=(?!REDACTED|\{\{)[^&\s`)]+", "API key/token in URL"),
    (r"(?i)authorization:\s*(basic|bearer)\s+[A-Za-z0-9._~+/=-]{12,}", "auth header"),
    (r"-----BEGIN [A-Z ]*PRIVATE KEY-----", "private key"),
    (r"AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|\b[sr]k_live_[0-9A-Za-z]{16,}|gh[pousr]_[A-Za-z0-9]{30,}|xox[baprs]-[0-9A-Za-z-]{10,}", "API key"),
]

# Things that identify a customer, partner, or ticket. Fine internally, never public.
PRIVATE_IDS = [
    (r"\bAG-[A-Z0-9]{6,}\b", "AGID"),
    (r"(?i)\bPID\s*[:#=]?\s*[A-Z0-9]{3,6}\b", "partner ID"),
    (r"\b(?!KB-)[A-Z][A-Z0-9]{1,9}-\d{2,6}\b", "Jira key"),
    (r"(?i)\b(ticket|zendesk|case)\s*#?\s*\d{4,}\b", "ticket number"),
    (r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b", "internal UUID"),
]
# Usually private, but support@ style addresses can be legitimate: warn only.
EMAIL = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

# Internal systems customers never see.
INTERNAL_TERMS = r"(?i)\b(vstore|superadmin|bigquery|big query|cloud logging|gcp console|console\.cloud\.google|jira|salesforce admin|sales ?& ?success center|ssc|internal notes?|escalat\w+ to (the )?(dev|eng|technical|product) team|slack|guru)\b"

EVERGREEN = r"(?i)\b(previously|formerly|used to|no longer|renamed|deprecated|coming soon|on the roadmap|will be available|recently added|now supports|you can now|the new (dashboard|version|experience))\b"

PROFILES = {
    "partnercenter": {"public": True, "no_gt": True, "banned": [], "brand_note": None},
    "businessapp": {"public": True, "no_gt": False,
                    "banned": [(r"(?i)\bvendasta\b", "'Vendasta' (gray-label)"),
                               (r"(?i)\b(partners?|resellers?|agenc(y|ies))\b", "partner/reseller/agency reference")]},
    "internal": {"public": False, "no_gt": False, "banned": []},
}


def strip_code(text):
    """Blank out fenced code and inline code so style checks ignore them (keeps line numbers)."""
    text = re.sub(r"```.*?```", lambda m: re.sub(r"[^\n]", " ", m.group(0)), text, flags=re.S)
    return re.sub(r"`[^`\n]*`", lambda m: " " * len(m.group(0)), text)


def resolves(base_dir, target):
    """Docusaurus links may omit the extension or point at a folder index."""
    t = base_dir / target
    return any(c.exists() for c in (t, Path(f"{t}.md"), Path(f"{t}.mdx"), t / "index.md", t / "index.mdx"))


def check(path, profile, text):
    errors, warnings = [], []
    p = PROFILES[profile]
    lines = text.split("\n")

    def at(pos):
        return text.count("\n", 0, pos) + 1

    # Frontmatter
    if not text.startswith("---\n"):
        errors.append((1, "missing frontmatter block"))
        fm, body_start = "", 0
    else:
        end = text.find("\n---", 4)
        if end == -1:
            errors.append((1, "frontmatter is not closed with ---"))
            fm, body_start = "", 0
        else:
            fm, body_start = text[4:end], end + 4
            if not re.search(r"(?m)^title:\s*\S", fm):
                errors.append((1, "frontmatter has no title (breaks the build)"))
            for i, line in enumerate(fm.split("\n"), 2):
                m = re.match(r"^([A-Za-z_]+):\s*(.+)$", line)
                if m and not m.group(2).startswith(("'", '"', "[", "{", "|", ">")) and ": " in m.group(2):
                    errors.append((i, f"unquoted colon in frontmatter value '{m.group(1)}' (breaks YAML)"))

    body = text[body_start:]
    # Balanced blocks
    if text.count("```") % 2:
        errors.append((0, "unclosed ``` code block"))
    prose = strip_code(text)
    for tag in ("details", "summary"):
        o, c = len(re.findall(rf"<{tag}\b", prose)), len(re.findall(rf"</{tag}>", prose))
        if o != c:
            errors.append((0, f"<{tag}> opened {o}x but closed {c}x"))
    opens = len(re.findall(r"(?m)^:::(tip|info|warning|note|danger|caution)\b", prose))
    closes = len(re.findall(r"(?m)^:::\s*$", prose))
    if opens != closes:
        errors.append((0, f"::: admonition opened {opens}x but closed {closes}x"))

    # Relative links and images must exist
    for m in re.finditer(r"\]\(((?!https?:|mailto:|#|/)[^)\s]+)\)|require\(['\"](\./[^'\"]+)['\"]\)", body):
        target = (m.group(1) or m.group(2)).split("#")[0]
        if target and not resolves(path.parent, target):
            errors.append((at(body_start + m.start()), f"link/image target not found: {target}"))

    # Secrets: everywhere, always an error
    for pat, label in SECRETS:
        for m in re.finditer(pat, text):
            errors.append((at(m.start()), f"possible {label}; replace with [REDACTED — check JumpCloud]"))

    if p["public"]:
        body_prose = strip_code(body)
        for pat, label in PRIVATE_IDS:
            for m in re.finditer(pat, body):
                errors.append((at(body_start + m.start()), f"{label} in a public doc: {m.group(0)!r}"))
        for m in re.finditer(EMAIL, body):
            warnings.append((at(body_start + m.start()), f"email address in a public doc: {m.group(0)!r} (OK only if it is a public support address)"))
        for m in re.finditer(INTERNAL_TERMS, body_prose):
            errors.append((at(body_start + m.start()), f"internal-only term in a public doc: {m.group(0)!r}"))
        for m in re.finditer(EVERGREEN, body_prose):
            warnings.append((at(body_start + m.start()), f"non-evergreen wording: {m.group(0)!r}"))
        for pat, label in p["banned"]:
            for m in re.finditer(pat, body_prose):
                errors.append((at(body_start + m.start()), f"{label}: {m.group(0)!r}"))
    if p.get("no_gt"):
        for i, line in enumerate(strip_code(text).split("\n"), 1):
            if re.match(r"^\s*>", line) or re.search(r"[^\s=<-]\s>\s[^\s=]", line) and "<" not in line:
                errors.append((i, "'>' character; use → for UI paths (it creates a blockquote)"))
    return errors, warnings


def new_only(found, baseline):
    """Keep issues that were not already present in the base version of the file."""
    budget = Counter(msg for _, msg in baseline)
    out = []
    for line, msg in found:
        if budget[msg]:
            budget[msg] -= 1
        else:
            out.append((line, msg))
    return out


def base_text(base, f):
    r = subprocess.run(["git", "show", f"{base}:{f}"], capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile", required=True, choices=PROFILES)
    ap.add_argument("--base", default="origin/master", help="git ref to compare against")
    ap.add_argument("files", nargs="+")
    args = ap.parse_args()
    failed = False
    for f in args.files:
        path = Path(f)
        if path.suffix not in (".md", ".mdx") or not path.exists():
            continue
        errors, warnings = check(path, args.profile, path.read_text(encoding="utf-8"))
        old = base_text(args.base, f)
        if old is not None:
            old_errors, old_warnings = check(path, args.profile, old)
            errors, warnings = new_only(errors, old_errors), new_only(warnings, old_warnings)
        for line, msg in errors:
            print(f"ERROR   {f}:{line or '-'}  {msg}")
        for line, msg in warnings:
            print(f"WARN    {f}:{line or '-'}  {msg}")
        failed |= bool(errors)
        if not errors and not warnings:
            print(f"OK      {f}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
