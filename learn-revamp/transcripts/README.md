# Raw transcripts — do not put transcripts here

**This folder is deprecated as a storage location.** Raw transcripts belong
**outside this repository**, not git-ignored inside it.

*(Standing instruction from Shiva, 2026-08-18.)*

## Why

A git-ignored folder inside a shared working copy still puts unredacted
partner names, business specifics, and negotiated pricing on disk in the repo.
One `git add -f`, one edited ignore rule, or one tool that doesn't respect
`.gitignore`, and it's in history permanently. Git-ignoring is a convention;
being outside the repo is a boundary.

The separation we want is simple: **raw text outside the repo, distilled
knowledge inside it.**

## Where transcripts go instead

Keep them in a folder outside the repository and point the
`transcript-knowledge-capture` skill at that path when processing. Pasting a
transcript straight into chat is also fine and leaves nothing on disk at all.

## What lives in the repo

Only `../transcript-notes/`, which is committed, and which is **redacted on
the way in**:

- **No identities.** Role and industry descriptors instead of real customer,
  partner, prospect, or employee names. Same for business names, addresses,
  phone numbers, account IDs, and domains.
- **No commercial figures.** No prices, rates, fees, margins, or discounts,
  even ones a call presented as standard published pricing. Record the *shape*
  of a commercial arrangement, and verify the current number in the platform
  at authoring time.

Full rules: `.claude/skills/transcript-knowledge-capture/SKILL.md`.

## The legacy contents of this folder

This folder currently holds transcripts filed under the older convention.
They are git-ignored, so they were never committed, but they should be
**relocated outside the repo**. Until that happens, treat everything here as
raw unredacted source: read it, distil it, and copy nothing out of it verbatim.
