"""
flag_articles.py

Scans a GitHub repo for Markdown help center articles that haven't been
updated in a configurable number of days and:
  1. Creates a GitHub Issue for each flagged article (or skips if one already exists).
  2. Sends a summary notification to a Google Chat webhook.

Required environment variables (set as GitHub Actions secrets):
  GITHUB_TOKEN          - Automatically available in GitHub Actions
  GITHUB_REPOSITORY     - Automatically available (e.g. "your-org/your-repo")
  GOOGLE_CHAT_WEBHOOK   - Incoming webhook URL from your Google Chat space

Optional environment variables:
  REVIEW_THRESHOLD_DAYS - Days since last update before flagging (default: 180)
  ARTICLE_DIRS          - Comma-separated list of directories to scan (default: ".")
  ARTICLE_LABEL         - GitHub Issue label to use (default: "review-due")
  MAX_ARTICLES_PER_RUN  - Max new issues to create per run, oldest-first (default: 5)
  DRY_RUN               - Set to "true" to log actions without creating issues/sending notifications
"""

import os
import subprocess
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────────────────────

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "")  # e.g. "org/repo"
GOOGLE_CHAT_WEBHOOK = os.environ.get("GOOGLE_CHAT_WEBHOOK", "")
REVIEW_THRESHOLD_DAYS = int(os.environ.get("REVIEW_THRESHOLD_DAYS", "180"))
ARTICLE_DIRS = [d.strip() for d in os.environ.get("ARTICLE_DIRS", ".").split(",")]
ARTICLE_LABEL = os.environ.get("ARTICLE_LABEL", "review-due")
MAX_ARTICLES_PER_RUN = int(os.environ.get("MAX_ARTICLES_PER_RUN", "5"))
DRY_RUN = os.environ.get("DRY_RUN", "false").lower() == "true"

GITHUB_API = "https://api.github.com"

# ── Helpers ────────────────────────────────────────────────────────────────────

def get_last_commit_date(filepath: str) -> datetime | None:
    """Return the UTC datetime of the most recent git commit touching this file."""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%aI", "--", filepath],
            capture_output=True, text=True, check=True
        )
        date_str = result.stdout.strip()
        if not date_str:
            return None
        return datetime.fromisoformat(date_str).astimezone(timezone.utc)
    except subprocess.CalledProcessError:
        return None


def days_since(dt: datetime) -> int:
    return (datetime.now(timezone.utc) - dt).days


def github_request(method: str, path: str, body: dict | None = None) -> dict | list | None:
    """Make an authenticated GitHub API request."""
    url = f"{GITHUB_API}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={
            "Authorization": f"Bearer {GITHUB_TOKEN}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"  GitHub API error {e.code}: {e.read().decode()}")
        return None


def ensure_label_exists(label: str) -> None:
    """Create the review label in the repo if it doesn't already exist."""
    existing = github_request("GET", f"/repos/{GITHUB_REPOSITORY}/labels/{label}")
    if existing is None:
        github_request("POST", f"/repos/{GITHUB_REPOSITORY}/labels", {
            "name": label,
            "color": "e4e669",
            "description": "Article is due for a content review"
        })
        print(f"  Created label '{label}'")


def get_open_review_issues() -> set[str]:
    """Return a set of article file paths that already have an open review issue."""
    existing = set()
    page = 1
    while True:
        issues = github_request(
            "GET",
            f"/repos/{GITHUB_REPOSITORY}/issues?labels={ARTICLE_LABEL}&state=open&per_page=100&page={page}"
        )
        if not issues:
            break
        for issue in issues:
            # Store the filepath we embedded in the issue body
            body = issue.get("body", "")
            for line in body.splitlines():
                if line.startswith("**File:**"):
                    path = line.replace("**File:**", "").strip().strip("`")
                    existing.add(path)
        if len(issues) < 100:
            break
        page += 1
    return existing


def create_github_issue(filepath: str, last_updated: datetime, age_days: int) -> str | None:
    """Create a GitHub Issue for one article. Returns the issue URL."""
    title = f"[Review Due] {filepath}"
    body = (
        f"This help center article hasn't been updated in **{age_days} days** "
        f"({last_updated.strftime('%B %d, %Y')}) and is due for a content review.\n\n"
        f"**File:** `{filepath}`\n\n"
        f"**Last updated:** {last_updated.strftime('%Y-%m-%d')}\n\n"
        f"---\n"
        f"_Please review this article for accuracy, update any outdated information, "
        f"and close this issue when done._"
    )
    result = github_request("POST", f"/repos/{GITHUB_REPOSITORY}/issues", {
        "title": title,
        "body": body,
        "labels": [ARTICLE_LABEL]
    })
    if result:
        return result.get("html_url")
    return None


def send_gchat_notification(flagged: list[dict]) -> None:
    """Send a Google Chat card message summarising flagged articles."""
    if not GOOGLE_CHAT_WEBHOOK:
        print("  No GOOGLE_CHAT_WEBHOOK set — skipping notification.")
        return

    count = len(flagged)
    lines = [f"*{count} article{'s' if count != 1 else ''} flagged for review*\n"]
    for item in flagged[:20]:  # Cap at 20 in the notification body
        age = item["age_days"]
        link = item.get("issue_url")
        name = item["filepath"]
        if link:
            lines.append(f"• *{name}* ({age} days old) → {link}")
        else:
            lines.append(f"• `{name}` — last updated {age} days ago")
    if count > 20:
        lines.append(f"_...and {count - 20} more. Check GitHub Issues for the full list._")

    payload = json.dumps({"text": "\n".join(lines)}).encode()
    req = urllib.request.Request(
        GOOGLE_CHAT_WEBHOOK, data=payload, method="POST",
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"  Google Chat notification sent (status {resp.status})")
    except urllib.error.URLError as e:
        print(f"  Failed to send Google Chat notification: {e}")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    if not GITHUB_TOKEN or not GITHUB_REPOSITORY:
        print("ERROR: GITHUB_TOKEN and GITHUB_REPOSITORY must be set.")
        sys.exit(1)

    print(f"🔍 Scanning for articles not updated in {REVIEW_THRESHOLD_DAYS}+ days...")
    print(f"   Directories: {ARTICLE_DIRS}")
    print(f"   Dry run: {DRY_RUN}\n")

    # Collect all markdown files
    markdown_files = []
    for directory in ARTICLE_DIRS:
        for path in sorted(Path(directory).rglob("*.md")) + sorted(Path(directory).rglob("*.mdx")):
            # Skip README, changelog, and hidden files
            if path.name.lower() in ("readme.md", "changelog.md", "contributing.md"):
                continue
            if any(part.startswith(".") for part in path.parts):
                continue
            markdown_files.append(str(path))

    print(f"Found {len(markdown_files)} Markdown files to check.\n")

    # Check age of each file
    stale = []
    for filepath in sorted(markdown_files):
        last_updated = get_last_commit_date(filepath)
        if last_updated is None:
            print(f"  ⚠️  Could not determine last commit date for: {filepath}")
            continue
        age = days_since(last_updated)
        if age >= REVIEW_THRESHOLD_DAYS:
            stale.append({
                "filepath": filepath,
                "last_updated": last_updated,
                "age_days": age,
                "issue_url": None
            })

    # Sort oldest-first so the most overdue articles are always prioritised
    stale.sort(key=lambda x: x["age_days"], reverse=True)

    print(f"Found {len(stale)} article(s) due for review.\n")

    if not stale:
        print("✅ No articles flagged. All content is up to date.")
        return

    if DRY_RUN:
        print(f"DRY RUN — no issues will be created or notifications sent.")
        print(f"  Would flag up to {MAX_ARTICLES_PER_RUN} article(s) this run (oldest first):\n")
        for item in stale[:MAX_ARTICLES_PER_RUN]:
            print(f"  Would flag: {item['filepath']} ({item['age_days']} days old)")
        if len(stale) > MAX_ARTICLES_PER_RUN:
            print(f"\n  ...{len(stale) - MAX_ARTICLES_PER_RUN} more article(s) queued for future runs.")
        return

    # Ensure the label exists in the repo
    ensure_label_exists(ARTICLE_LABEL)

    # Fetch already-open review issues to avoid duplicates
    print("Checking for existing open review issues...")
    already_open = get_open_review_issues()
    print(f"  {len(already_open)} article(s) already have open issues.\n")

    # Always work with the MAX_ARTICLES_PER_RUN oldest articles
    top_articles = stale[:MAX_ARTICLES_PER_RUN]

    created = 0
    skipped = 0
    for item in top_articles:
        if item["filepath"] in already_open:
            print(f"  ↩️  Issue already open: {item['filepath']}")
            skipped += 1
        else:
            print(f"  📋 Creating issue for: {item['filepath']} ({item['age_days']} days old)")
            url = create_github_issue(item["filepath"], item["last_updated"], item["age_days"])
            if url:
                item["issue_url"] = url
                print(f"     ✓ {url}")
                created += 1
            else:
                print(f"     ⚠️  Failed to create issue.")

    print(f"\nSummary: {created} issue(s) created, {skipped} already had open issues.\n")

    # Notify about all top articles (including those with existing issues)
    if top_articles:
        print("Sending Google Chat notification...")
        send_gchat_notification(top_articles)
    else:
        print("No stale articles found — skipping notification.")

    print("\n✅ Done.")


if __name__ == "__main__":
    main()
