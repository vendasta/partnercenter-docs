---
description: Conventions for Partner Center documentation screenshots
globs: ["config/screenshot-map.yaml", "scripts/*.py", ".cursor/skills/screenshot-docs/**"]
alwaysApply: false
---

# Screenshot Conventions

These rules apply when capturing, naming, or inserting screenshots for the partnercenter-docs repository.

## File Naming

- Use **kebab-case** only: lowercase letters, numbers, and hyphens
- Names must be descriptive of the UI element shown: `partner-branding-logo.png` not `screenshot-1.png`
- Format: **PNG** only
- Store all images in the `img/` folder alongside the guide file, matching the existing repo pattern

## Image Paths in Markdown

- Use relative paths from the doc file: `./img/filename.png`
- Always include alt text: `![Descriptive alt text](./img/filename.png)`
- Alt text must describe the UI element and its purpose, not just "screenshot"
- Never use the `>` blockquote character in markdown (partnercenter-docs prohibits it)

## Viewport

- Default viewport: **1440 x 900** pixels
- Resize if a specific component renders better at a different dimension

## PII and Sensitive Data

The partnercenter-docs CLAUDE.md states: "Blur or replace sensitive data (PII) in screenshots."

Before committing any screenshot:
- Partner names, email addresses, phone numbers, and account IDs must be blurred or replaced
- Use `scripts/mask_pii.py` when available, or manually review before merging the PR
- Do not commit screenshots containing real customer data

## Screenshot Quality

- Wait for the page to fully render (3-5 seconds after navigation) before capturing
- Dismiss any tooltips, banners, or popups that obscure the target element
- Capture the relevant section of the page, not the full browser window when possible
- Ensure the target UI element is fully visible and not cut off
