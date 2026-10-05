# Pass B Report: Factual fixes (2026-10-01)

## Summary

Pass B applied surgical factual fixes based on validated ground truth from live platform inspection on 2026-10-01.

## Files changed

| File | Lines changed |
|------|---------------|
| `docusaurus/docs/business-app/administration/ai-workforce-communication-automation.mdx` | 7 |
| `docusaurus/i18n/es/docusaurus-plugin-content-docs/current/business-app/administration/ai-workforce-communication-automation.mdx` | 4 |
| **Total** | **11 lines across 2 files** |

## Fixes applied

### Register item 1: AI Workforce nav label

**Ground truth:** Business App left-nav under AI is `Workforce`, not `AI Workforce`. URL resolves to `/ai/assistants`.

**Changes:**
- `AI Workforce` (as nav click target) replaced with `AI` followed by `Workforce`
- Example: `` `Business App` → `AI Workforce` → `AI Voice Receptionist` `` becomes `` `Business App` → `AI` → `Workforce` → `AI Voice Receptionist` ``

**Instances fixed:** 2 (1 EN, 1 ES)

### Register item 2: Inbox Settings renamed to Conversations settings

**Ground truth:** Business App Administration list shows `Conversations settings` (sentence case). There is no `Inbox Settings` on that admin page.

**Changes:**
- `` `Administration` → `Inbox Settings` `` replaced with `` `Administration` → `Conversations settings` ``
- Heading "Navigate to Inbox Settings" replaced with "Navigate to Conversations settings"

**Instances fixed:** 9 (5 EN, 4 ES)

## Leftovers deliberately kept

### AI Workforce as concept/prose (not click path)
Left unchanged per trap list:
- Page titles (`AI Workforce & Communication Automation`)
- Sidebar labels
- Prose references ("the **AI Workforce** section", "AI Workforce & Communication Automation provides...")
- Folder names (`ai-workforce/`)

### Training file Inbox Settings references
`docusaurus/training/products/convert/conversations-ai/conversations-ai-in-business-app.mdx` contains:
- `Partner Center > Inbox > Inbox Settings` (Partner Center path, not Business App Administration)
- `Business App > Settings > Inbox Settings > Web Chat Settings` (different parent than `Administration`)
- `Business App > Inbox Settings > AI Assistant` (FlipCard, different path structure)

These use different navigation parents than the validated `Administration` → `Inbox Settings` path. Left as **needs verification** rather than applying unvalidated corrections.

### i18n prose mention of Inbox Settings
`docusaurus/i18n/es/.../us-businesses-sms-registration.mdx` line 75 mentions "**Messaging Templates** en Inbox Settings" as prose, not a click path. Left unchanged.

## Needs verification

### Images on touched files
The following images may show old UI chrome and should be verified:

**English file:**
- `./img/business-app/voice-receptionist/ai-voice-receptionist-diagram1.jpg`
- `./img/business-app/missed-call-text-back/image1.jpg`
- `./img/business-app/missed-call-text-back/image2.jpg`
- `./img/business-app/ai-sms-receptionist.png`

**Spanish file:** (same images, shared path)

### Unverified paths in training
- `Partner Center > Inbox > Inbox Settings` - is this still the correct path in Partner Center?
- `Business App > Settings > Inbox Settings` - does this path exist separately from Administration?

### Items outside scope (from register traps)
- Partner Center "Open Task Manager" / Task Manager product mentions
- My team / My Team casing
- Yesware Inbox preferences

## No invented facts

All corrections applied directly from the register ground truth. No assumptions made about paths not explicitly validated.
