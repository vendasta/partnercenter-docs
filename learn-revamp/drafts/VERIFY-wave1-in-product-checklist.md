# Wave 1 — in-product verification checklist

**For:** Shiva · **Raised by:** ET-689 Wave 1 sourcing pass, 2026-08-18
**Why this file exists:** each item below is a conflict between a published lesson and recorded call evidence that cannot be settled from files. Per Cal's rule on [PR #782](https://github.com/vendasta/partnercenter-docs/pull/782), the human signs the attestation first-person and the model never attests on someone's behalf. So these are yours to check.

**How to use it:** check the item on the named screen, then fill in the attestation line. Paste the completed lines back and I'll carry them into the review copies with a `[VERIFIED IN-PRODUCT — verifier, date, evidence]` tag. Screenshots help for anything you expect to be challenged.

Ordered by how much depends on the answer.

---

# RESOLVED — Shiva's answers, 2026-08-18

**V1, V2, V3, V4 and V5 are answered.** V6 and V7 are still open and are going out as a question to an SME. The detail below is what gets carried into the review copies; the original write-ups are kept underneath for the reasoning trail.

## V1 — Methods: the docs were right, the call is stale

`[VERIFIED IN-PRODUCT — Shiva, 2026-08-18, screenshot of the Method dropdown on the add-a-tool screen]`
**The dropdown offers GET, POST, PUT, PATCH and DELETE.** POST is the default.

So `builder/custom-tools.mdx` is **correct** on methods and needs no change there. The call claim — a partner's developer saying "it's only for use for get and post," uncorrected by the solutions architect — is **stale or was wrong at the time**. Note this in `transcript-notes/builder.md` so nobody re-raises it: the entry's "only GET and POST request types are supported today" line is superseded as of 2026-08-18.

## V2 — Auth: the call was right, the lesson is wrong

`[VERIFIED IN-PRODUCT — Shiva, 2026-08-18, screenshots of the Headers and Parameters sections on the add-a-tool screen]`
**There is no authentication section at all.** The screen offers Headers (name/value pairs, plus an "Add common header" helper) and Parameters. There is no client ID or secret field, no token exchange, and no refresh mechanism anywhere.

So the platform does **not** perform OAuth 2.0. You can call an OAuth-protected API only by obtaining a token yourself elsewhere and pasting it into a header as a static value, where it will expire on that API's schedule with no refresh. The solutions architect's call statement was accurate: static API token or key, good to go; OAuth 2, not natively.

**`builder/custom-tools.mdx` must change.** Its three-row auth table presents OAuth 2.0 as an available strategy, which is misleading, and its knowledge check has a correct answer that turns on OAuth being the sophisticated choice — that question needs replacing, not editing. Reframe as: authentication is whatever header the target API wants; a static key or token works; anything needing a live token exchange needs the token minted outside the platform and will expire.

## V2b — A new finding from the same screenshots, not previously on this list

Parameter **Location** offers only **Body** and **Query**. There is no Path option, and no Header option.

Two consequences worth chasing:

1. **`ai-workforce/custom-employee-lab.mdx` uses a path-parameter example** (the `dummyjson.com/carts` endpoint). A parameter cannot be located in the path, so either that example works by putting the value in the URL as static text — which is not a parameter and should not be taught as one — or the step doesn't work as written. Needs a run-through.
2. Anything in the lessons implying a parameter can go in a header is wrong; headers are their own separate section with fixed name/value pairs.

Also captured for accuracy: parameter **Type** offers String, Number, Boolean, Integer, Object, Array and Enum. **Set by AI** is on by default and pairs with a Description field whose helper text reads "Describe the purpose of this parameter so the AI can fill it dynamically." **Required** is an unchecked checkbox. The published lessons should match this vocabulary exactly.

## V3 — Autonomy: three lessons are wrong, in a way none of them anticipated

`[VERIFIED IN-PRODUCT — Shiva, 2026-08-18]`
**Autonomy level is shown only for the Chat and Voice Receptionist. It defaults to Autonomous and cannot be modified.**

This is worse than the claim I flagged. `custom-employee-lab.mdx` says Autonomous is "the usual starting default" for a custom employee — but the setting isn't exposed for custom employees at all. And any lesson that invites a learner to *choose* or *change* an autonomy level is describing a control that doesn't exist. `train-your-employee.mdx` and `sell-and-manage.mdx` both cross-reference this setting and need checking against the same fact.

The four-level ladder (Suggestive → Assistive → Autonomous → Agentic) can still be taught as product concept, since the product's own info panel presents it. What cannot be taught is that the learner picks a level.

## V4 — "Platform events" is not a thing

`[VERIFIED — Shiva, 2026-08-18, current documentation review]`
**No feature named "platform event" exists in the platform.** Event-driven *concepts* are real and available in several areas — Conversations and Conversations AI let you build automations and triggers off conversation events like an inbound message or a user action, and those drive notifications, responses and follow-ups. But nothing carries the name. If someone is looking for the Salesforce sense of "Platform Events" as an event-driven integration surface, that does not exist here by that name.

This corroborates the sourcing sweep, which found zero hits for the phrase in the docs, across 112 transcripts, and across two PIDs of call summaries.

**So `builder/webhooks-and-platform-events.mdx` is mis-titled and mis-taught.** Its instruction to "use that name, platform events, which is the language the documentation uses too" is false and must come out. The lesson should teach events-and-triggers as a concept, in the vocabulary partners and the product actually use — webhook, trigger, automation. Renaming a published lesson is Cal's call; the sentence removal is not.

## V5 — The "entity already exists" line does not exist, and the real behaviour is the opposite

`[VERIFIED IN-PRODUCT — Shiva, 2026-08-18, automation Activity log]`
**There is no such log line.** The Activity log records actual runs that begin and execute steps: entries like "Entered automation", and per-step outcomes of success, skipped or errored.

The real mechanic: with a re-entry setting like "One at a time per account/contact", a trigger that fires while a run is already in progress for that entity is **silently dropped**. No error, no warning, no entry. The tell is an **absence** — you trigger a second time and no new run appears in the Activity tab. To confirm re-entry settings are blocking, compare trigger events against Activity log entries.

**`ai-workforce/autopilot.mdx` teaches the inverse of the truth.** It tells learners a log line reading "entity already exists" means the safety net worked. Learners will search the log for a string that is never written, and conclude something is broken. The section and its knowledge-check question both need rewriting around absence-as-signal, which is a harder thing to teach and worth the space.

---

# Original write-ups

Kept for the reasoning trail. V6 and V7 remain open.



---

## V1 — Which HTTP methods does the custom-tool builder actually offer?

**Blocks:** `builder/custom-tools.mdx` (published), `build-lab/build-the-custom-tool.mdx`

**Where to look:** Partner Center → an AI Employee → a capability → Tools → add a tool → the **Method** dropdown. Just open the dropdown and read the options.

**The conflict:**

| Source | Claim |
|---|---|
| `docusaurus/docs/ai/ai-capabilities/tools-overview/index.md`, Method & URL table | GET, POST, PUT/PATCH, DELETE |
| `builder/custom-tools.mdx` (the lesson) | five-row method table including PUT, PATCH, DELETE |
| Call: a partner's developer, having read the API docs, asks *"it's only for use for get and post, like that, right?"* — the Vendasta solutions architect on the call does not correct him | GET and POST only |
| `transcript-notes/builder.md`, final entry | "only **GET and POST** request types are supported today" |

The docs table may be generic REST education (it carries an `:::info` saying the method is "determined by the API creator") rather than a description of the dropdown. That's the ambiguity.

**Attestation to fill in:**

```
[VERIFIED IN-PRODUCT — Shiva, 2026-08-__, Method dropdown on the add-a-tool screen]
The dropdown offers: ____________________________________
```

---

## V2 — Does the tool builder do an OAuth 2.0 token exchange, or only take a static token in a header?

**Blocks:** `builder/custom-tools.mdx` (published), `builder/the-integration-landscape.mdx`

**Where to look:** same add-a-tool screen. Is there any authentication section beyond **Headers**? Anything that stores a client ID and secret, or performs a token refresh?

**The conflict:**

| Source | Claim |
|---|---|
| `builder/custom-tools.mdx` (the lesson) | a three-row auth table presenting OAuth 2.0 as an available strategy: "a token you obtain, then send on each call" |
| `docusaurus/docs/.../building-custom-tools.md`, "Understanding authentication requirements" | describes API Key, OAuth 2.0 and Basic auth — but in a section about **reading the third-party API's documentation**, not about what Vendasta performs |
| Same doc's Headers section and its FAQ | only ever show a static `Authorization: Bearer YOUR_API_KEY`, and the FAQ answer for an expired key is to go edit the Authorization header by hand |
| Call: Vendasta solutions architect, building a tool live | *"if it's anything that uses like OAuth 2 or any of the more sophisticated auth methods, then things get a little bit more complicated — it's just as we don't yet have support for OAuth 2 natively, right in here. But if it's a static API token or API key, good to go."* |

My reading is that the docs and the call actually agree, and the lesson is the odd one out: you can call an OAuth-protected API only by obtaining a token yourself and pasting it as a static header, which then expires. If that's right, the lesson's auth table needs reframing and its knowledge check needs rewriting, because one question's correct answer currently turns on OAuth being the sophisticated choice.

**Attestation to fill in:**

```
[VERIFIED IN-PRODUCT — Shiva, 2026-08-__, add-a-tool screen]
Authentication options available are: ____________________________________
Is there a token-refresh or client-ID/secret field anywhere? ____________
```

---

## V3 — Autonomy level names and their order

**Blocks:** `ai-workforce/custom-employee-lab.mdx`, `train-your-employee.mdx`, `sell-and-manage.mdx` (three lessons cross-reference this, so if the names are wrong, all three are)

**Where to look:** the Configure panel on an AI Employee, plus the product's own four-level autonomy info panel.

**Status:** you already verified this once, on PR #800, and caught that the lesson wrongly called Autonomous "the highest level" when the ladder is Suggestive → Assistive → Autonomous → Agentic. What's unverified is a second claim sitting next to it in `custom-employee-lab.mdx`: that **Autonomous is the usual starting default**. Zero support for that in any of the 112 transcripts.

**Attestation to fill in:**

```
[VERIFIED IN-PRODUCT — Shiva, 2026-08-__, Configure panel]
The default autonomy level on a newly created custom employee is: ____________
```

---

## V4 — Is "platform events" a real named surface?

**Blocks:** `builder/webhooks-and-platform-events.mdx` (it's in the lesson title)

**Where to look:** the docs and the platform navigation. Grep of `docusaurus/docs/` for "platform event" returns **nothing**, and so does a grep of all 112 transcripts. The lesson tells the reader to "use that name, platform events, which is the language the documentation uses too" — which is checkable, and currently looks false.

**Attestation to fill in:**

```
[VERIFIED — Shiva, 2026-08-__, source: ____________]
"Platform events" is / is not the product's term. If not, the correct term is: ____________
```

---

## V5 — Does an "entity already exists" log line exist?

**Blocks:** `ai-workforce/autopilot.mdx` (published) — it has a whole section and a knowledge-check question on this

**Where to look:** an automation run log, ideally one where a re-entry setting blocked a second run.

**The problem:** the lesson tells learners that a log line reading *"entity already exists"* usually means a safety net worked as intended. Greps across all 112 transcripts for `entity already exists`, `only once per account`, `entry setting` and `re-entry` return nothing. The July review copy conceded the string "isn't documented verbatim" and shipped it anyway. It's a quoted product string, so a learner will search the log for those exact words.

**Attestation to fill in:**

```
[VERIFIED IN-PRODUCT — Shiva, 2026-08-__, automation run log]
The log line reads, verbatim: ____________________________________
(or: no such line exists)
```

---

## V6 — Two containers of tier gating, and which one the lessons should teach

**Blocks:** `ai-workforce/meet-your-workforce.mdx` and `put-a-receptionist-to-work.mdx` — both are lessons I'm about to write, so this one shapes new work rather than correcting old

**The situation:** both facts below are true, of different things, and the current lessons teach only the first.

| Container | Gate |
|---|---|
| Your **Partner Center plan** | Starter includes the Chat Receptionist; Professional and above unlock the Voice Receptionist and social channels. Doc-verified in `docs/ai/ai-workforce/ai-receptionist-features-by-plan.mdx`. |
| The **Conversations AI tier sold onto a client account** | Standard carries WhatsApp, web chat, booking and lead capture; Pro adds SMS and automations; Premium adds voice. Four independent calls, plus `transcript-notes/conversations-ai.md`. |

A learner who reads "social channels unlock at Professional" and then sells a client Conversations AI Standard has been mis-scoped, because the field says Standard already carries WhatsApp. Rule 16 calls this conflation the single most disorienting mistake for a new partner.

**What I need from you:** not a verification so much as a call on how to teach it. My proposal is to name the container explicitly in both lessons — partner-plan gates for *your own* employees, Conversations AI tier gates for *a client's* account — per rule 20's state-both-in-one-breath. Say if you'd rather handle it differently.

**Related, and lower risk:** `put-a-receptionist-to-work.mdx` currently omits three things that are well-sourced and that partners hit immediately. I'm planning to add all three unless you object.

1. SMS is itself a tier gate (Conversations AI Pro), so A2P registration can complete on a Standard account and the client still can't text.
2. A2P registration needs legal name and EIN up front and takes 7 to 10 business days.
3. The most common rejection cause is the client's own web form lacking a visible consent checkbox and privacy-consent language. A Vendasta-built form embeds it; a partner's own form does not. There's a whole call on this.

---

## V7 — The multi-location branching pattern: which shape is real?

**Blocks:** `ai-workforce/autopilot.mdx` (published), and the ET-741 deep-dive page it promises

**The problem:** `autopilot.mdx` describes branching a review request **by zip code**, with a webhook per location and a fallback to the hub. Nothing in the corpus matches that shape. The three nearest real things are each different:

- A production multi-location routing automation branches on **an AI extraction step**, not zip code: an AI step reads the chat, returns the city name from a fixed list or the literal string `unknown`, and an if/else notifies that location's user. The `unknown` return *is* the fallback. No zip code, no webhook per location. Twenty locations in the original.
- Zip-code routing does exist, but for **inbound call forwarding** to the right location's receptionist and calendar.
- Postal-code routing also exists, but inside a **third-party field-service platform's** API, not a Vendasta automation.

The lesson traces its version to `partner-call-insights.md` 4.10, which predates these transcripts. Since ET-741 commits to a deeper page on exactly this, the shape should be settled before that page is written, or the deep-dive documents a composite nobody built.

**What I need from you:** a call on whether to correct `autopilot.mdx` to the AI-extraction shape now, or leave it and handle it in ET-741. I'd correct it now, since it's published and a learner could try to build the zip-code version.

---

## Not on this list, and why

**"Log activities, not notes"** in `builder/advanced-automations.mdx`. I'd originally flagged this for you, but it doesn't need in-product time. Two independent calls settle it: the deepest production automation in the corpus deliberately migrated *to* a tagged-note trigger, and logs notes on purpose so owners can read what happened from the contact view. The same call names the constraint the lesson omits, that activity triggers are locked to a single activity type and a helper automation is needed to chain two types. The affirmative half of the lesson's advice is fine; the dismissal of notes isn't. I'll recast it per rule 20 to state both, and you'll see it in the review copy rather than having to check anything.
