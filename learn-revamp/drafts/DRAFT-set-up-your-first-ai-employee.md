# REVIEW COPY — set-up-your-first-ai-employee.mdx

Source tags: [DOC] verified in repo docs (path noted) · [CALL] partner-call evidence · [SYN] synthesis · [INT] internal signal

## Reviewer notes and open flags

1. **Placement decision needed.** This is a new step with no home yet. Two options: (a) seed a dedicated **AI Employees** learning path with this as step 1, or (b) add it to another path. I recommend (a): the getting-started path is about running your own business, and AI Employee setup is a large domain that will want its own sequence (chat receptionist, voice receptionist, capabilities, knowledge, a build lab). Drafted here as a self-contained step-1; `sidebar_position` set to 1 as a placeholder. **Confirm the path and I will add the `_category_.json` and index.**
2. **Vocabulary aligned to docs:** the behavior guidelines are the AI Employee's **Purpose** (inside **Profile**), plus **capabilities**, **knowledge sources**, and **channels**. [DOC: ai/ai-workforce/index.mdx] Partner calls used "role/prompt"; I used the branded terms.
3. **A2P framed affirmatively per voice rule 2** (no fear). Registration is in Business App → Administration → **Conversations Settings**; SMS requires Conversations AI **Pro**; the client's business is what registers. [DOC: business-app/conversations/sms/us-businesses-sms-registration.mdx] The rejection-reasons and terms-of-service detail from the calls live in documentation and are linked, not dramatized.
4. **Training framed as craft, not error** (voice rule 3). The price-hallucination and closed-Sunday stories from the calls are reframed as "give the AI the knowledge and purpose it needs."
5. **AI Employees described by who they serve** (voice rule 17): "serving your business" / "serving their business," not "on the website."
6. Diagram: none in this draft. If we want one, a simple three-part "Profile, capabilities, knowledge" structure diagram would follow diagram rules 18-21. Flagged, not built.

## Changelog

- **v1** — First draft from partner-call research plus doc verification, in learning-path step format and voice. A2P and vocabulary corrected against docs.

---

## FRONTMATTER

```yaml
---
title: Set up your first AI Employee
sidebar_position: 1
description: The three parts of every AI Employee, deploying a chat receptionist that serves a business, and the difference between the chat and voice receptionists.
---
```

## [COMPONENT IMPORTS] — KnowledgeCheck, CourseProgressBar, SectionFeedback, InlineHighlighter, MarkComplete

## [COMPONENT: InlineHighlighter wraps the whole body — courseId="set-up-your-first-ai-employee" site="vendasta_learn"]

## [COMPONENT: CourseProgressBar — top of body]

---

An AI Employee is a digital team member you configure to answer questions, capture leads, and book appointments. Each one works out of the box, and you tailor it to the business it serves. This step sets up your first one and shows you the three parts you configure on every AI Employee after it. [DOC: ai/ai-workforce/index.mdx "AI Employees are digital team members you can configure ... Each works well out of the box, but can be tailored"]

:::info Before you start
**Difficulty:** Beginner &nbsp;|&nbsp; **Time:** about 10 minutes
:::

:::tip What you will be able to do
- Name the three parts of every AI Employee: profile, capabilities, and knowledge
- Deploy a chat receptionist that serves a business
- Choose between the chat receptionist and the voice receptionist for a given job
- Point a business to the right setup step to send SMS
:::

## Three parts of every AI Employee

Every AI Employee shares the same structure, whether it is pre-built like the Chat Receptionist or one you create. Learn these three parts once and you can configure any of them. [DOC: ai/ai-workforce/index.mdx "AI Employees all share a similar structure"]

- **Profile** is who the AI Employee is: its name, its avatar, and its **Purpose**, the job description and guidelines that set its tone and goals for every conversation. [DOC: ai/ai-workforce/index.mdx "Profile section is where you set the basics ... Purpose: The job description and behavioral guidelines"]
- **Capabilities** are what it can do: capture leads, book appointments, transfer calls, and more. [DOC: ai/ai-workforce/index.mdx; ai/ai-capabilities/]
- **Knowledge sources** are what it knows: the business information it references to answer accurately, added as text, files, or a website. [DOC: ai/ai-workforce/index.mdx; ai/knowledge-base/website-source.mdx]

Give an AI Employee a clear purpose and the knowledge for its job, and its answers stay accurate and on-brand. Adding the right knowledge and refining the purpose is the craft of running an AI Employee, and it is how good ones get better. [CALL — transcripts (7),(12),(18); SYN reframed as craft per voice rule 3]

## Where your first one lives

An AI Employee lives in the workspace of the business it serves. Your own receptionist, serving your agency, lives in your **Partner Center**. A client's receptionist, serving their business, lives in their **Business App**. Pick the workspace first, and channels, knowledge, and captured leads all land where you expect. [DOC: ai/index.mdx; SYN consistent with ecosystem-map step]

For your first one, use your own agency so you can put it through its paces before you set one up for a client. [CALL — transcripts (1),(12) "use your own website as the guinea pig"; SYN reframed affirmatively]

:::tip Try it now
Open **AI** in Partner Center and open the Chat Receptionist. Read its **Purpose** out loud. That paragraph is what shapes every answer it gives. [DOC: ai/ai-workforce/index.mdx]
:::

## Deploy a chat receptionist

*This section spans both workspaces: you configure in AI, and the widget serves a website.*

The chat receptionist is an AI Employee that greets visitors, answers their questions from its knowledge, and captures each visitor as a contact. To put it to work: open the AI Employee, set its **Profile** and welcome greeting, confirm its **knowledge sources**, then get the install snippet and add it to the site it serves. [DOC: ai/ai-workforce/index.mdx; business-app/conversations/conversations-ai/ai-assisted-web-chat-widget-overview.mdx]

Captured visitors become contacts, so every conversation feeds the CRM rather than living in a silo. [DOC: business-app/conversations/conversations-ai/understanding-lead-capture-notifications.mdx]

When you are ready to install it, [this guide walks through the chat receptionist](/ai/ai-workforce). [DOC: link target exists]

## Chat receptionist or voice receptionist

Both are AI receptionists; the difference is the channel the business needs. The **chat receptionist** serves visitors who are already on a website or messaging. The **voice receptionist** answers the phone, which suits businesses that take a lot of calls and want coverage outside staffed hours. [DOC: ai/ai-workforce/ (chat and voice receptionist guides); CALL — transcripts (6),(12)]

Both are part of **Conversations AI**, the paid upgrade that adds AI receptionist functionality, along with capabilities and a knowledge base, to the Conversations platform. [DOC: business-app/conversations/conversations-ai/index.mdx "Conversations AI is a paid product upgrade that adds AI receptionist functionality"]

To let an AI receptionist book meetings, connect a calendar in **My Meetings** first, then add the booking capability so it can offer real availability. [DOC: crm/my-meetings/ (My Meetings); ai/ai-capabilities/ (capabilities); CALL — transcripts (7),(8),(15)]

## Sending SMS: register the business

For a US business to send SMS through Conversations AI Pro, the business registers with the carriers first (A2P 10DLC). The business goes to **Business App** → **Administration** → **Conversations Settings**, opens the registration card, and completes the form. Progress can be saved and finished later. [DOC: business-app/conversations/sms/us-businesses-sms-registration.mdx "go to Business App > Administration > Conversations Settings to see a new registration card"]

Calls and chat work right away; SMS begins once registration is approved. Registering one number covers both review requests and Conversations AI messages. [DOC: business-app/conversations/sms/us-businesses-sms-registration.mdx "Single A2P Registration ... register one number for both"]

When a business is ready to register, [this guide covers US SMS registration](/business-app/conversations/sms/us-businesses-sms-registration). [DOC: link target exists]

## [COMPONENT: SectionFeedback — section="content"]

## [KNOWLEDGE CHECK] — intro: "Three quick questions on the three parts, where an AI Employee lives, and choosing a receptionist." sessionSize=3, pool=4

**Q1 (mcq).** You want your AI receptionist to greet callers as "the friendly front desk at Northside Dental" and always offer to book a cleaning. Which part of the AI Employee holds that instruction?
- Its Purpose, in the Profile ✅
- Its knowledge sources
- Its capabilities
- Its channels

Explanation: Purpose is the job description and guidelines that set tone and goals for every conversation. Knowledge is what it references; capabilities are what it can do. [DOC: ai/ai-workforce/index.mdx]

**Q2 (mcq).** A client wants a receptionist on their website. Where do you configure that AI Employee?
- In their Business App ✅
- In your Partner Center
- In the Marketplace product page
- In the Executive Report

Explanation: An AI Employee lives in the workspace of the business it serves; a client-facing receptionist is configured in that client's Business App. [DOC: ai/index.mdx]

**Q3 (mcq).** A client takes most of their leads by phone and misses calls after hours. Which AI Employee fits?
- The voice receptionist ✅
- The chat receptionist
- The AI Sales Assistant
- The Executive Report

Explanation: The voice receptionist answers the phone; the chat receptionist serves visitors already on a website or messaging. [DOC: ai/ai-workforce/ receptionist guides]

**Q4 (mcq, pool spare).** A US business wants to send SMS through Conversations AI Pro. What comes first?
- The business registers for A2P in Conversations Settings ✅
- You add a second phone number in Partner Center
- You upgrade the business to an Executive Report
- You embed the chat widget on the website

Explanation: US businesses register with the carriers (A2P 10DLC) in Business App → Administration → Conversations Settings before SMS sends. [DOC: business-app/conversations/sms/us-businesses-sms-registration.mdx]

## [COMPONENT: MarkComplete — after closing wrapper]

---

## FOOTER HANDOFF

Now that your first AI Employee is serving your agency, let's give it the capabilities that turn conversations into booked work: the [next step](#) *(reviewer: link once the AI Employees path sequence is set)*.
