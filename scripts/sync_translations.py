"""
sync_translations.py

Keeps the French, Spanish, and German translations under
docusaurus/i18n/ in sync with English docs changes.

For each docs/ file changed in the triggering push:
  - Added or modified -> re-translate into fr/es/de and write/overwrite
    the corresponding i18n file.
  - Deleted -> remove the corresponding i18n file in each locale.
  - Renamed -> treated as a delete of the old path + an add of the new path.

Also mirrors any image (or other static asset) folder that a changed file's
directory introduces, so a brand-new doc's screenshots aren't left missing
in translated versions.

This script only ever modifies files in the working tree. Committing,
branching, and opening the review PR is handled by the GitHub Actions
workflow (sync-translations.yml) using peter-evans/create-pull-request.

Required environment variables (set as GitHub Actions secrets/vars):
  ANTHROPIC_API_KEY   - API key for the Claude API
  GITHUB_EVENT_PATH    - Automatically available in GitHub Actions; used to
                         read the push event's before/after commit SHAs

Optional environment variables:
  BASE_SHA / HEAD_SHA  - Override the commit range to diff (mainly for
                         local testing outside of a push event)
  DRY_RUN              - Set to "true" to log planned actions without
                         calling the API or writing any files
"""

import json
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOCUSAURUS_DIR = REPO_ROOT / "docusaurus"
DOCS_DIR = DOCUSAURUS_DIR / "docs"
I18N_DOCS_PLUGIN = "docusaurus-plugin-content-docs"
LOCALES = {
    "fr": "French",
    "es": "Spanish",
    "de": "German",
}
ANTHROPIC_MODEL = "claude-sonnet-5"
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

DRY_RUN = os.environ.get("DRY_RUN", "false").lower() == "true"


def get_commit_range():
    base = os.environ.get("BASE_SHA")
    head = os.environ.get("HEAD_SHA")
    if base and head:
        return base, head

    event_path = os.environ.get("GITHUB_EVENT_PATH")
    if not event_path or not Path(event_path).exists():
        print("No GITHUB_EVENT_PATH and no BASE_SHA/HEAD_SHA set; nothing to diff.")
        sys.exit(0)

    with open(event_path) as f:
        event = json.load(f)

    before = event.get("before")
    after = event.get("after")
    if not before or not after or before == "0000000000000000000000000000000000000000":
        # First push of a new branch, or an event shape we don't expect.
        # Fall back to comparing the pushed commit against its parent.
        after = event.get("after") or os.environ.get("GITHUB_SHA")
        before = f"{after}~1"
    return before, after


def get_changed_docs_files(base, head):
    result = subprocess.run(
        ["git", "diff", "--name-status", "-M", base, head, "--", "docusaurus/docs"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    changes = []
    for line in result.stdout.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0]
        if status.startswith("R"):
            # Rename: old path, new path
            changes.append(("D", parts[1]))
            changes.append(("A", parts[2]))
        else:
            changes.append((status[0], parts[1]))
    return changes


def i18n_path(locale, docs_relative_path):
    return DOCUSAURUS_DIR / "i18n" / locale / I18N_DOCS_PLUGIN / "current" / docs_relative_path


def call_claude(prompt):
    body = json.dumps(
        {
            "model": ANTHROPIC_MODEL,
            "max_tokens": 8192,
            "messages": [{"role": "user", "content": prompt}],
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        ANTHROPIC_API_URL,
        data=body,
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Claude API error {e.code}: {detail}") from e

    return "".join(block["text"] for block in data["content"] if block["type"] == "text")


def build_translation_prompt(relative_path, source_text, locale):
    lang_name = LOCALES[locale]
    return f"""You are translating a single Vendasta Partner Center documentation file (a Docusaurus .md/.mdx doc) from English into {lang_name} (locale code: {locale}).

Source path: docusaurus/docs/{relative_path}

Translation rules (follow exactly, partner-facing accuracy matters):
1. Translate frontmatter "title", "description", and "sidebar_label" values into {lang_name}. Leave every other frontmatter key completely unchanged (id, slug, sidebar_position, tags, keywords, updated_at, etc.) -- copy those lines verbatim.
2. Translate all body prose: headings, paragraphs, list items, table cells, callout bodies and titles (:::tip, :::note, :::warning, :::info), FAQ questions and answers inside <details>/<summary> blocks, and image alt text.
3. Do NOT translate: inline `code` spans (these are literal UI element names -- button/tab/field names -- since the actual Partner Center/Business App product UI is English-only; translating them would mislead the reader), fenced code blocks, HTML/JSX tag names and attributes, URLs/hrefs, image file paths, and product/brand names (Vendasta, Partner Center, Business App, and named product features like Vibe, Reputation AI, Social AI, LocalSEO, Advertising Intelligence, WordPress Hosting, vCash, CRM, etc.).
4. Preserve the exact markdown/MDX structure: same heading levels, same list/table structure, same blank-line spacing around <details>/<summary> tags, same callout types, same JSX component usage if any.
5. Do not add, remove, or reorder content -- this is a translation pass, not an edit or rewrite.

Output ONLY the translated file content, starting with the frontmatter "---" delimiter. Do not wrap it in a code fence, do not add any commentary before or after.

Source file content:
---BEGIN SOURCE---
{source_text}
---END SOURCE---
"""


def translate_file(relative_path):
    source_path = DOCS_DIR / relative_path
    if not source_path.exists():
        print(f"  Skipping {relative_path}: source no longer exists (likely deleted later in the same push)")
        return

    source_text = source_path.read_text(encoding="utf-8")

    for locale in LOCALES:
        target_path = i18n_path(locale, relative_path)
        print(f"  Translating {relative_path} -> {locale}")

        if DRY_RUN:
            continue

        prompt = build_translation_prompt(relative_path, source_text, locale)
        translated = call_claude(prompt)

        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(translated, encoding="utf-8")


def remove_translations(relative_path):
    for locale in LOCALES:
        target_path = i18n_path(locale, relative_path)
        if target_path.exists():
            print(f"  Removing {locale} translation for deleted file {relative_path}")
            if not DRY_RUN:
                target_path.unlink()


def mirror_new_assets(relative_path):
    """If this file's directory has an img/ (or similar asset) folder not yet
    mirrored into a locale, copy it over. Cheap/mechanical, no API call."""
    source_dir = (DOCS_DIR / relative_path).parent
    for asset_dirname in ("img", "downloads"):
        asset_dir = source_dir / asset_dirname
        if not asset_dir.is_dir():
            continue
        rel_asset_dir = asset_dir.relative_to(DOCS_DIR)
        for locale in LOCALES:
            target_dir = DOCUSAURUS_DIR / "i18n" / locale / I18N_DOCS_PLUGIN / "current" / rel_asset_dir
            if target_dir.exists():
                continue
            print(f"  Mirroring new asset folder {rel_asset_dir} -> {locale}")
            if not DRY_RUN:
                target_dir.parent.mkdir(parents=True, exist_ok=True)
                shutil.copytree(asset_dir, target_dir)


def main():
    if not DRY_RUN and not os.environ.get("ANTHROPIC_API_KEY"):
        print(
            "ANTHROPIC_API_KEY is not set, or is set to an empty value.\n"
            "GitHub Actions sets a missing secret to an empty string rather than "
            "leaving it unset, so check that the ANTHROPIC_API_KEY repository "
            "secret exists under Settings > Secrets and variables > Actions.",
            file=sys.stderr,
        )
        sys.exit(1)

    base, head = get_commit_range()
    print(f"Diffing {base}..{head} for docusaurus/docs changes")

    changes = get_changed_docs_files(base, head)
    if not changes:
        print("No docs/ changes in this push. Nothing to translate.")
        return

    for status, path in changes:
        if not (path.endswith(".md") or path.endswith(".mdx")):
            continue
        relative_path = str(Path(path).relative_to("docusaurus/docs"))

        if status == "D":
            remove_translations(relative_path)
        else:  # A or M
            mirror_new_assets(relative_path)
            translate_file(relative_path)

    print("Done.")


if __name__ == "__main__":
    main()
