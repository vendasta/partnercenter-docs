# Documentation agent playbook

You are an AI agent updating Vendasta documentation. Follow this playbook alongside the [Contributing guide](./CONTRIBUTING.md) so every change matches our voice, structure, and quality bar.

## Apply house style
- Write in our voice: fun not silly, professional not formal, helpful not overbearing, expert not bossy.
- Stay in present tense and active voice; avoid internal jargon unless the audience is internal.
- Keep headings in sentence case and respect the `##` and `###` hierarchy.
- Bold UI elements (`**Orders tab**`), italicize foreign words only, and wrap commands or filenames in backticks.

## Structure Markdown correctly
- Ensure each doc page contains required frontmatter (`id`, `title`, `sidebar_position`, `description`).
- Use numbered lists for sequences and bulleted lists for options; verify numbering stays sequential.
- Format navigation paths as `**Partner Center** > **Accounts** > **Manage Accounts**`.
- Choose `:::tip`, `:::info`, or `:::warning` callouts based on guidance severity and keep copy concise.

## Link and media standards
- Use relative links for internal docs (`[Text](./file-name.md)`) and descriptive text for all links.
- Validate every link you add or modify; flag anything you cannot confirm.
- Save new images to `/img/<feature>/<file-name>.png` with lowercase-dash names and purposeful alt text.
- Embed videos with `<iframe>` and note when a refresh is required after UI changes.

## Validate before handoff
- Re-read the diff to ensure terminology, capitalization, and data match the current UI.
- Call out any tests or commands you were unable to run and recommend next steps.
- Summarize changes clearly and highlight assumptions or follow-up work.
- If unsure about accuracy, recommend SME review instead of guessing.

Deliver polished, on-brand docs by combining this playbook with contributor instructions, verifying every change, and communicating limits transparently.