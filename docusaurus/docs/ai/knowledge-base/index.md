---
title: Knowledge Base Overview
sidebar_label: Knowledge Base
description: Understand how the Knowledge Base works with AI employees and the types of knowledge sources you can add.
tags: [knowledge-base, ai-employees, knowledge-sources, conversations-ai]
keywords: [knowledge base, knowledge sources, business profile, ai employees, conversations ai]
---

# Knowledge Base Overview

## What is the Knowledge Base?

The **Knowledge Base** is where AI employees access factual information about a business. It ensures that answers are accurate and grounded in real data.  

- **Capabilities** define how an AI behaves.  
- **Knowledge Base** provides the facts the AI retrieves when answering questions.  

:::tip
Do not add behavioral instructions to the Knowledge Base. Use **capabilities** for mandatory behavior instructions and use **knowledge base** for facts that can optionally be looked up when needed.
:::

## Why is the Knowledge Base Important?

AI employees rely on the Knowledge Base to answer questions consistently and accurately. Without it, responses may be incomplete or outdated.  

For example:  
- Knowledge Base: business hours, pricing, setup instructions.  
- Capabilities: capturing leads, booking appointments, checking availability.  

## Types of Knowledge Sources

You can add or update knowledge in several ways:

### Business Profile  
- Available for all accounts in **Business App**.  
- Automatically added to AI employees.  
- Shares the following fields with AI:  
  - Business name  
  - Address and/or service areas  
  - Website  
  - Email  
  - Phone number  
  - Categories  
  - Hours  
  - Services offered  
  - Short description  
  - Long description  
  - Social media URLs  
  - Booking URL  
- Updated by editing the Business Profile.  

### Text  
- Add FAQs or custom information manually.  
- Best for short, business-specific details.  

### Website  
- Crawl the business website to retrieve content.  
- Ideal for keeping product, service, or policy information up to date.  
- Can be refreshed manually or on an automatic schedule.  
- See [Website Source](./website-source) for details on keeping website knowledge current.

### File Upload  
- Upload documents (PDFs, manuals, policies).  
- Allows the AI to reference structured content not published on the website.  

## Knowledge Base vs. Capabilities

- **Knowledge Base** → factual content the AI can reference.  
- **Capabilities** → instructions that shape behavior and add actions.  

The AI combines both to provide helpful, context-aware responses.  

## Frequently Asked Questions (FAQs)

<details>
<summary>How do I update the Business Profile knowledge source?</summary>

Edit the Business Profile in Business App. Changes automatically sync to AI employees.
</details>

<details>
<summary>When should I use text vs. website knowledge?</summary>

Use **text** for short, specific information not on the site. Use **website** for broader content that is already published online.
</details>

<details>
<summary>Does uploading a file automatically update if the file changes?</summary>

No. You'll need to upload a new version of the file to refresh its content.
</details>