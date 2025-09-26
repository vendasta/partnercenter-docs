---
title: AI Capabilities Overview
sidebar_label: AI Capabilities
---

import { AISparkleIcon } from '@site/src/components/Icons';

AI Capabilities are specialized skills that define what your AI Employees can do and how they behave when interacting with customers. Think of capabilities as building blocks that transform a basic AI assistant into a skilled employee who can handle specific business tasks.

## What are AI Capabilities?

A **capability** is a discrete skill you can enable or disable for an AI Employee. Each capability contains instructions that guide the AI on:

- Which actions to take in specific situations
- What outcomes to prioritize
- How to respond to different types of requests

Capabilities work together to create AI Employees that can handle complex, multi-step interactions while maintaining consistency with your business processes.

### Types of AI Capabilities

#### Built-in Capabilities
The Vendasta platform provides pre-configured capabilities for common business functions. Some examples include:

- **Lead Capture**: Automatically collect and qualify lead information (name, email, phone, budget)
- **Appointment Booking**: Schedule meetings using your connected calendar systems
- **Transfer Call** : Live-transfer callers to other numbers based on intent and rules. See [Transfer calls to other numbers](../ai-workforce/ai-voice-receptionist.md#transfer-calls-to-other-numbers).

#### Custom Capabilities
For specialized workflows, you can create your own custom capabilities that:

- Connect to external systems via APIs
- Execute complex business logic
- Integrate with third-party tools and databases
- Automate unique processes specific to your industry

## Business Impact

Capabilities transform customer interactions from generic chatbot exchanges into personalized assistance that feels like talking to a knowledgeable team member. Instead of customers waiting for business hours or getting generic responses, they receive immediate help with real business tasks like checking inventory, booking appointments, or getting account information.

This automation allows your human team to focus on high-value activities while ensuring consistent service quality regardless of volume or time of day.

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

- **Configure Built-in Capabilities**: [How to Configure AI Capabilities](./configuring-capabilities)
- **Create Custom Capabilities**: [Creating Custom Capabilities](./creating-custom-capabilities)
- **Advanced Configuration**: Learn about prompt engineering and capability optimization
