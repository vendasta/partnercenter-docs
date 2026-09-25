---
name: pr-description
description: Write or rewrite a pull request description for this repository in Shiva's voice. Use whenever opening a PR, updating a PR body, or when asked to write, rewrite, or fix a PR description. The description is Shiva speaking to her reviewer, not an assistant reporting on its own work.
---

# PR descriptions for partnercenter-docs

## The one rule

**Shiva is the one talking.** The reviewer (usually Cal) is reading a note from
a colleague about work that colleague did. Write it as "I changed X because Y",
never as "this PR does X" or "the assistant did X".

That means:

- First person, always. "I pulled the Search Specialist out of Learn." Not
  "The Search Specialist has been removed."
- Never refer to Claude, the assistant, the agent, or the tool in the body.
  There is no third party in this conversation.
- Never write "Shiva asked me to…" or "per Shiva's instruction". If it needs
  saying, it is "I decided to…" or "I left this alone because…".
- Passive voice is the usual tell. If a sentence has no actor, add Shiva as
  the actor or cut the sentence.

## Voice

Direct and casual, the way Shiva writes in chat. Short sentences. Get to the
point.

Cut these on sight:

- Corporate-speak and stock AI vocabulary: leverage, robust, seamless,
  delve, comprehensive, it's worth noting, in today's landscape.
- "Not X, but Y" constructions and forced triads.
- Staged openers that restate the title before saying anything.
- Hedging stacks: "may potentially", "could possibly help to".
- Em-dashes everywhere. Use a comma or a full stop.
- Bold-label bullets used as a formatting crutch. Bold the lead phrase of a
  change only when there are several changes to scan.

Keep the writing at the level of someone who knows the product. Define a term
only when the reviewer plausibly would not know it.

## Structure

No fixed template (this repo has none). Pick what the change needs. A good
default:

1. **A two or three line opener.** What landed and what did not. If something
   was cut or deferred, say so here, not buried at the bottom.
2. **What changed.** One block per real change, with the reason. The reason
   matters more than the file list; the diff already shows the files.
3. **Not done, and why.** Anything in scope that was deliberately skipped.
   Never let a reviewer discover a gap themselves.
4. **Asks.** Anything needing a decision, a verification, or another person.
   Phrase each as a direct question, not a hint.
5. **Verification.** What was actually run and what it proved. Name pre-existing
   failures as pre-existing so nobody chases them.

Skip any section that has nothing in it. A one-line fix gets a one-line
description.

## Being honest about uncertainty

When a choice was a judgement call, say it was a judgement call and ask the
reviewer to confirm. Do not present an interpretation of someone's verbal
feedback as settled fact.

Good: "I read this as belonging in the mental model section. Cal, check I
understood you right, because I was going off the screen share."

Bad: silently making the change and describing it as if the instruction had
been explicit.

## Repo specifics

- Ticket reference goes in the title: `learn: short summary (ET-933)`.
- Link PRs and issues with a full markdown URL, not a bare `#1234`.
- Content rules from `CLAUDE.md` apply to the description too: no `>`
  character (it makes an unintended blockquote), and no historical or future
  language about the product.
- When the change touches a rule in `CLAUDE.md`, say which rule and that the
  diff was checked against it.
- Never name a model or an AI product version anywhere in the body.
- Keep the Claude Code attribution footer at the end. It says the tooling was
  used; it does not make the tooling the author.

## Checklist before posting

- [ ] Every paragraph has Shiva as the actor, explicit or obvious
- [ ] No "the assistant", no "per instruction", no third-party framing
- [ ] Every deferred or skipped item is named
- [ ] Every ask is a question the reviewer can answer in one reply
- [ ] Verification says what ran, not what should work
- [ ] No `>` characters
