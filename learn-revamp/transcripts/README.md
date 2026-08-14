# Raw transcripts — drop folder

Drop raw call/screen-recording transcripts here (paste-exported .txt/.md, or
whatever format the recording tool gives you). Name them something
identifiable: `2026-07-20-alistair-ai-receptionist-setup.md`,
`2026-07-21-nathan-getting-started-walkthrough.txt`, etc.

Once a transcript is here (or pasted directly in chat), invoke the
`transcript-knowledge-capture` skill (`.claude/skills/transcript-knowledge-capture/SKILL.md`)
to extract every topic it touches into `../transcript-notes/<topic-slug>.md`.

**This folder's contents are git-ignored on purpose** (see repo `.gitignore`).
Raw transcripts can carry names, numbers, and business specifics that don't
need to live in git history — only the distilled, per-topic notes in
`../transcript-notes/` get committed. If a transcript needs to be kept
verbatim for some reason, say so explicitly and it can be added deliberately.
