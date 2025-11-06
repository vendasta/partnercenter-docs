---
title: AI Capabilities Overview
sidebar_label: AI Capabilities
description: Learn how AI capabilities work as specialized skills that enable AI employees to handle specific business tasks and automate customer interactions.
tags: [ai-capabilities, capabilities, ai-employees, custom-capabilities, automation]
keywords: [AI capabilities, capabilities, custom capabilities, AI employees, automation, tools, integrations, lead capture, appointment booking]
---

import { AISparkleIcon } from '@site/src/components/Icons';

AI Capabilities are specialized skills that define what your AI Employees can do and how they behave when interacting with customers. Think of capabilities as building blocks that transform a basic AI assistant into a skilled employee who can handle specific business tasks.

## What are AI Capabilities?

A **capability** is a discrete set of instructions you can enable or disable for an AI Employee. Simply put, a capability is a section of prompt, along with an optional tool to call an API. 

Each capability contains instructions that guide the AI on:

- Which actions to take in specific situations
- What outcomes to prioritize
- How to respond to different types of requests

Multiple capabilities can work together to create AI Employees that can handle complex, multi-step interactions while maintaining consistency with your business processes. When the AI employee handles a request, it combines all the Capabilities into the prompt the governs its behaviour.

### Types of AI Capabilities

#### Built-in Capabilities
The Vendasta platform provides pre-configured capabilities for common business functions. Some examples include:

- **Lead Capture**: Automatically collect and qualify lead information (name, email, phone, budget)
- **Appointment Booking**: Schedule meetings using your connected calendar systems
- **Transfer Call** : Live-transfer callers to other numbers based on intent and rules. See [Transfer calls to other numbers](../ai-workforce/ai-voice-receptionist.md#transfer-calls-to-other-numbers-from-your-ai-voice-receptionist).

#### Custom Capabilities
For specialized workflows, you can create your own custom capabilities that:

- Simply add new instructions for the AI employee to follow (no tools needed)
- Connect to external systems via APIs (using tools)
- Execute complex business logic
- Automate unique processes specific to your industry

## How Capabilities Work with AI Employees

### Capability Assignment
Each AI Employee can have multiple capabilities enabled simultaneously. The AI intelligently decides which capabilities to use based on customer requests and conversation context.

### Contextual Activation
Your AI Employee evaluates incoming requests and activates the most appropriate capability. For example:
- A question about store hours triggers knowledge base access
- A request for pricing information activates product lookup capabilities
- An interest in services activates lead capture and appointment booking

### Adaptive Behavior
Capabilities can be configured with specific prompts and parameters that modify how the AI behaves. This allows the same capability to work differently across various AI Employees or business contexts.

## Capability Architecture for AI Employees

### Prompts
Written instructions that tell the AI when and how to use a capability. Prompts define:
- Trigger conditions for activation
- Required information before proceeding
- Response templates and tone
- Error handling procedures

### Tools (Custom Capabilities)
For custom capabilities, tools define the technical implementation:
- API endpoints and authentication
- Data parameters and formats
- Integration workflows
- Response processing logic

:::tip Learn More About Tools
Tools enable AI Employees to interact with external systems and retrieve real-time data. To understand the fundamentals of how tools work with APIs, see the [Tools & Integrations Overview](./tools-overview). For a step-by-step guide to building custom tools, see [Building Custom Tools](./tools-overview/building-custom-tools).
:::

## Testing and Optimizing Capabilities

Effective capabilities require iterative testing and refinement. Use these strategies to ensure your capabilities perform as expected:

### Testing Capability Performance

**1. Test Trigger Conditions**
- Verify the capability activates when it should
- Ensure it doesn't activate when it shouldn't
- Try various phrasings of requests to test consistency

**2. Verify Information Gathering**
- Confirm the AI asks for required information before using tools
- Test what happens when customers provide incomplete data
- Ensure the AI handles edge cases gracefully

**3. Review AI Explanations**
- Check the reasoning behind capability activation decisions
- Identify when the AI chose one capability over another
- Use explanations to refine trigger conditions and prompts

### Optimization Techniques

**Shorter is Better**
- Keep capability prompts concise and focused
- Avoid redundant or contradictory instructions
- Remove unnecessary details that don't affect behavior

**Use Examples**
- Include specific examples of when to use the capability
- Show examples of required information formats
- Demonstrate desired response patterns

**Format for Clarity**
- Use markdown headers to organize sections
- Use bullet points for lists of conditions or steps
- Use bold to emphasize critical instructions
- Structure prompts so they're scannable for both humans and AI

**Ask AI for Help**
- Copy your capability prompt and ask an AI to suggest improvements
- Request examples of edge cases you should handle
- Get feedback on clarity and completeness

**Test and Iterate**
- Make one change at a time
- Test the specific scenario you're trying to improve
- Monitor real conversations to verify improvements
- Be ready to refine further based on results

:::tip Performance Monitoring
Use the Explanations feature in Conversations to understand:
- Which capabilities are being used most frequently
- Where capabilities might be conflicting with each other
- When the AI chooses not to use a capability and why
- How well your trigger conditions are working in practice
:::
