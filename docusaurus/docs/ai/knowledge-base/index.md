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

:::tip Key Principle
Do not add behavioral instructions to the Knowledge Base. Use **capabilities** for mandatory behavior instructions and use **knowledge base** for facts that can optionally be looked up when needed.
:::

## Why is the Knowledge Base Important?

AI employees rely on the Knowledge Base to answer questions consistently and accurately. Without it, responses may be incomplete or outdated.  

## How Knowledge Base Works

When a customer asks a question, your AI employee:

1. **Generates a search term** based on the customer's message (e.g., "What time do you close on weekends?" becomes "hours weekend")
2. **Searches all assigned knowledge sources** to find the most relevant information
3. **Retrieves the top 10 most similar results** from your knowledge base
4. **Includes this information in its response** to provide accurate, grounded answers

This happens automatically for every customer interaction, ensuring your AI always has access to the right information at the right time.

:::info Technical Note
Behind the scenes, the knowledge base uses **vector embeddings** and **semantic search** to find relevant information based on meaning, not just exact word matches. This means the AI can find answers even when customers phrase questions differently than your documentation.
:::  

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

**Supported file types:**
- **Documents:** PDF, PowerPoint, Word docs, text files, Markdown
- **Structured data:** CSV, Excel spreadsheets (especially useful for pricing, services, specifications)
- **Code/Data files:** JSON, HTML (great for structured data)
- **Images:** Common image formats (JPG, PNG, etc.)

## Knowledge, Capabilities, and Tools: What's the Difference?

## Knowledge Base vs. Capabilities vs. Tools

The knowledge base is one of three key components that make AI employees effective:

- **Knowledge Base** provides factual information the AI can reference (what you're reading about now)
- **Capabilities** define how the AI behaves and when to take actions  
- **Tools** enable the AI to perform actions in external systems via APIs

:::tip Understanding the Difference
The knowledge base contains **information to reference** (reactive, fact-based). In contrast, capabilities contain **instructions on behavior** (proactive, process-based), and tools provide the **ability to take actions** in other systems (integration-based).

**What it's for:**
- Business hours, location, contact information
- Pricing, product specifications, service details
- FAQs, policies, procedures
- Any factual information customers might ask about

### Capabilities
**Instructions that shape behavior**

Capabilities tell your AI employee **how to act** and **when** to take specific actions in conversations. Think of these as process instructions you'd give to a human employee.

**Example scenario: Booking appointments**
- Your capability says: "Whenever someone asks a question, ask if they'd like to book an appointment"
- This makes your AI proactive, not just reactive
- The AI now consistently offers to book appointments, even when not explicitly asked

**What it's for:**
- Conversation flows and processes (when to capture leads, how to qualify customers)
- Tone and communication style
- Conditional logic (if customer asks X, do Y)
- Business rules and priorities

:::tip Knowledge vs. Capabilities
- **Knowledge** = "Here's the booking link" (reactive, information-based)
- **Capability** = "After answering questions, always offer to book an appointment" (proactive, behavior-based)
:::

## Best Practices for Knowledge Base Optimization

### Start with What You Already Have
Begin with existing resources rather than creating new content from scratch:
- Price lists or service catalogs (CSV or spreadsheet format works great)
- Product data sheets (PDFs)
- Your existing website content
- Training manuals or employee handbooks
- FAQ documents you've already created

**Example:** A pricing spreadsheet with columns for Service, Description, and Price is better than a paragraph describing all your services.

### Less is Often More
While you can add lots of knowledge, quality matters more than quantity:
- **Be selective:** Only add information that's actually relevant to customer questions
- **Avoid redundancy:** If the AI already knows general information, focus on what's specific to your business
- **Remove outdated content:** Less accurate information is worse than no information

**Example:** If you have 18 pages of blog articles about general topics, they might create noise. Focus on specific, business-relevant content instead.

### Knowledge is for Reference, Not Instruction
Don't try to control AI behavior through the knowledge base:
- ❌ **Wrong:** Adding "Always ask for email before phone number" to knowledge base
- ✅ **Right:** Put that instruction in a capability instead
- ❌ **Wrong:** Knowledge base entry saying "If customer asks about pricing, do X, Y, Z"
- ✅ **Right:** Add pricing information to knowledge; put the "do X, Y, Z" process in a capability

### Keep Knowledge Relatively Static
The knowledge base works best for information that doesn't change frequently:
- ✅ **Good:** Service descriptions, product specifications, business policies
- ✅ **Good:** Pricing (if it changes monthly or less frequently)
- ❌ **Poor:** Daily specials or promotions (update via capabilities instead)
- ❌ **Poor:** Live inventory (use a tool/API for real-time data)

### Use Website Auto-Refresh for Dynamic Content
If you do have website content that changes regularly:
- Enable the "Automatic refresh" option when adding website knowledge sources
- The system will check monthly for updates automatically
- This is great for blogs, menus, or service pages that evolve over time

### Exclude Irrelevant Website Sections
When retrieving website content, use path exclusions to skip:
- Blog archives that are more for SEO than customer service
- Legal pages that aren't commonly asked about
- Admin or login areas
- Marketing pages not relevant to customer questions

**Example:** Exclude `/blog/articles/` if those posts are general content not specific to your business.

### Review What the AI Actually Uses
Use the conversation explanation feature to see:
- Which knowledge sources the AI referenced in responses
- Whether it found the right information
- If any knowledge sources are causing confusion

This helps you refine what to keep, update, or remove from your knowledge base.

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