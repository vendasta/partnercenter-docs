# Draft message — two questions for an SME (V6 and V7)

**Purpose:** get the last two Wave 1 blockers answered. Both are things where the docs, the lessons, and what partners are told on calls don't line up, and neither can be settled by looking at a screen.

**Suggested recipients.** Q1 (tier gating) is best answered by whoever owns Conversations AI packaging — product marketing or the product owner. Q2 (multi-location routing) is best answered by a solutions architect or one of Rashida's team, Nathan or Andrew Barclay, since it's about what actually gets built for partners. They may well be two different people; the message below splits cleanly if so.

**Tone note:** it asks for a decision on Q1 and a description on Q2. Worth saying you'll take a two-line answer.

---

Subject: Two quick questions for the partner Learn paths — tier gating and multi-location routing

Hi <name>,

I'm writing the partner-facing learning paths on docs.vendasta.com/learn, and I've hit two things I can't resolve from the documentation or from the product itself. Both would go out to partners as guidance, so I'd rather get them right than guess. Short answers are completely fine.

**1. Which tier gate should we teach partners about?**

There seem to be two different gates, and I think we're currently only teaching one of them.

The documentation says it in terms of the **partner's own Partner Center plan**: Starter includes the Chat Receptionist, and Professional and above unlock the Voice Receptionist plus social channels like Facebook, Instagram and WhatsApp.

But on recorded partner calls, our own people consistently describe it in terms of the **Conversations AI tier that gets sold onto a client's account**: Standard covers web chat, WhatsApp, booking and lead capture; Pro adds SMS; Premium adds voice.

I believe both are accurate, just about different things — one is what the partner gets for their own use, the other is what their client gets. The problem is the lesson currently only explains the first one. So a partner could read "social channels unlock at Professional," go and sell a client Conversations AI Standard, and be surprised either way about what that client can actually use.

My plan is to teach both and label which is which: partner-plan gates for the employees you run yourself, Conversations AI tier gates for what a client account can do. Before I write that, could you confirm:

- Is that split right?
- Is there a case where the partner's plan limits what they can sell a client, or are the two genuinely independent?
- Which one do partners get wrong more often? I'd like to lead with that one.

**2. How does multi-location routing actually get built?**

The published lesson currently describes routing by **zip code**, with a separate webhook for each location and a fallback to the head office when nothing matches.

I can't find anyone building it that way. The one recorded call where a specialist walks a partner through a real multi-location setup — twenty locations — does something different: web chat captures the lead, then an AI step reads the conversation and returns just the location name from a fixed list (or the word "unknown" if the customer never confirmed one), and then a branch notifies whoever owns that location. The "unknown" answer is what catches the fallback case.

Zip-code routing does exist in our calls, but for forwarding inbound *phone calls* to the right location. And postal-code routing shows up inside a third-party field-service tool, which isn't our automation at all. So I think three different things have been blended into one lesson.

Could you tell me:

- Which shape is the one we'd actually recommend to a partner today?
- Is the zip-code-plus-webhook-per-location approach something we ever recommend, or should it come out?
- If it's the AI-extraction approach, is there anything about it that trips people up in practice? That's usually the most useful part of a lesson.

The reason I'm asking rather than just fixing it: there's a follow-up ticket (ET-741) to write a deeper page on this exact pattern, and I don't want to document something nobody builds.

Thanks — happy to jump on a 15-minute call if that's faster than typing.

Shiva
