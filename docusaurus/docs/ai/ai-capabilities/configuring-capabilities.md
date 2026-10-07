---
title: "How do I configure AI Employee capabilities?"
description: "Add, remove, and write instructions for AI Employee capabilities such as Lead Capture and Appointment Booking in Business App, then test them."
sidebar_label: Configuring Capabilities
sidebar_position: 2
brand: vendasta
product: ai-workforce
audience: partners
content_type: how-to
kb_id: KB-00191
answer_snippet: "To configure capabilities for an AI Employee, go to AI → Workforce in Business App, click Configure on the employee, and add capabilities in the Capabilities section. You can add instructions to each capability to control how it behaves, then save and test."
doc_owner: ai-workforce
review_frequency: 3-months
last_reviewed: 2026-09-25
last_reviewed_by: haleyserrano
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

To configure capabilities for an AI Employee, go to `AI` → `Workforce` in Business App, click `Configure` on the employee, and add capabilities in the `Capabilities` section. You can add instructions to each capability to control how it behaves, then save and test.

## Prerequisites

Before you begin:
- You have an AI Employee created in your Business App account
- You have appropriate permissions to configure AI settings
- You understand which capabilities align with your business needs

## Step 1: How do I open the AI Employee configuration? {#step-1-access-ai-employee-configuration}

1. Navigate to <AISparkleIcon /> `AI` → `Workforce` in your Business App dashboard.
2. Locate the AI Employee you want to configure.
3. Click the **Configure** button next to the employee's name.

:::tip
If you don't see the Configure button, verify you have the necessary permissions to modify AI Employee settings.
:::

## Step 2: How do I open the Capabilities section? {#step-2-open-the-capabilities-section}

1. On the AI Employee's `Configure` page, scroll down to the `Capabilities` section.
2. Click to expand the section if it's collapsed.
3. You'll see a list of capabilities already added to the AI Employee.

## Step 3: How do I add capabilities? {#step-3-add-desired-capabilities}

Capabilities that appear in the Capabilities section are active. To add a new one:

1. Click **+ Add a capability**.
2. **Review the capability description** to understand what it does.
3. **Add specific instructions** (optional) to customize how the capability behaves.

To remove a capability, click the three-dot menu next to it and select **Remove**.

### Common capability configurations

#### Lead Capture
- **What it does**: Automatically collects contact information from potential customers
- **Recommended instructions**: 
  ```
  Always ask for name, email, and phone number. 
  Qualify leads by asking about budget and timeline.
  Be friendly but persistent in gathering complete information.
  ```

#### Appointment Booking
- **What it does**: Schedules meetings using your connected calendar
- **Prerequisites**: Ensure your calendar is connected in your Business App settings
- **Recommended instructions**:
  ```
  Check availability for the next 2 weeks.
  Confirm all details before booking: date, time, service type, duration.
  Send confirmation details to the customer.
  ```

#### Communication Style
- **What it does**: Maintains consistent tone and brand voice
- **Recommended instructions**:
  ```
  Use a professional but friendly tone.
  Always end responses with "How else can I help you today?"
  Refer to our company as "we" and "our team."
  ```

## Step 4: How do I add goals and instructions? {#step-4-add-goals-and-instructions-optional}

For more precise control over capability behavior:

1. **Click the "Add Instructions" link** beneath each enabled capability.
2. **Write clear, specific instructions** that define:
   - When to use the capability
   - What information to collect
   - How to respond in different scenarios
   - What to do if something goes wrong

### Writing effective instructions

**Good example:**
```
Lead Capture: Only collect contact information after the customer shows interest in our services. Always ask for name, email, and phone. If they're hesitant to share information, explain that it helps us provide better service.
```

**Poor example:**
```
Get contact info when needed.
```

:::tip Best Practices for Instructions
- **Be specific about trigger conditions** - Tell the AI exactly when to act
- **Include error handling guidance** - What should happen if something goes wrong?
- **Use clear, actionable language** - Write like you're training a new employee
- **Show examples, not just rules** - "For example, say: 'I'd be happy to help with that.'"
- **Keep it concise** - Shorter, specific instructions often work better than long paragraphs
- **Test and iterate** - Try different phrasings and see what produces better results
:::

#### Write instructions as directives, not descriptions

Write every instruction as an order addressed to the AI employee. An instruction phrased as a description of what the employee does reads as background information, and the AI may not connect the described behavior to itself.

| Avoid | Use instead |
|-------|-------------|
| `The receptionist says "I'll text you a booking link."` | `Respond with "I'll text you a booking link."` |
| `The assistant will offer to take a message.` | `Offer to take a message.` |
| `Bookings are handled by the call center.` | `Tell the caller that bookings are handled by the call center.` |

This applies anywhere you write instructions: capability prompts, goals, and the instructions attached to individual capabilities.

:::tip Back up a prompt before you rewrite it
Capability prompts have no version history. Before making substantial edits, copy the existing prompt into a separate document so you can restore it. Experimenting is otherwise safe — you can adjust a prompt and re-test as many times as you need, and un-assign a capability from the AI employee if it is not behaving the way you want.
:::

### Tailor a capability to specific channels

Your AI Employee knows which channel it's responding on, so a capability's instructions can reference the channel by name. This is useful when a task should behave differently depending on where the customer reaches out — for example, collecting fewer details for lead capture over SMS than by email:

```
When capturing a lead on SMS, ask for name and phone number only, one question at a time, and keep each message short.
When capturing a lead by email, you can ask for name, email, phone, and preferred appointment time in a single reply.
```

For guidance on channel-specific behavior across the whole AI Employee, see [Adjust responses by channel](../ai-workforce/index.mdx#adjust-responses-by-channel).

#### Why Examples Matter

Including examples in your instructions helps your AI understand exactly what you want:

**Without examples:**
```
Be friendly when greeting customers.
```

**With examples:**
```
Be friendly when greeting customers. For example: "Hi there! Thanks for reaching out. How can I help you today?"
```

The second version gives the AI a concrete pattern to follow, leading to more consistent results.

### Instruction patterns that work

Use these patterns when writing capability instructions:

#### Conditional Logic: "If X, then Y"
```
If the customer asks about pricing: Share our standard rates and offer to send a detailed quote.
If they mention a competitor: Acknowledge their research and focus on our unique benefits.
```

#### Sequential Steps: "First... Then... Finally..."
```
First, greet the customer warmly.
Then, ask what brings them to our site today.
Finally, based on their answer, offer relevant help or information.
```

#### Boundary Setting: "Only... when..." / "Never... unless..."
```
Only ask for contact information when the customer shows clear buying interest.
Never transfer calls unless the customer specifically requests to speak with someone else.
```

#### Error Handling: "If... can't..."
```
If you can't find the answer in the knowledge base, say: "I don't have that specific information, but I'd be happy to connect you with someone who does."
```

## Step 5: How do I save and test my configuration? {#step-5-save-and-test-your-configuration}

1. Click `Save Changes` at the bottom of the `Configure` page.
2. **Test the capabilities** by starting a conversation with your AI Employee.
3. **Try different scenarios** to ensure capabilities activate correctly:
   - Ask questions that should trigger knowledge base access
   - Express interest in services to test lead capture
   - Request an appointment to test booking functionality

### Testing checklist

- [ ] Capabilities activate at appropriate times
- [ ] Required information is collected before proceeding
- [ ] AI follows your custom instructions
- [ ] Error scenarios are handled gracefully
- [ ] Customer experience feels natural and helpful

## Step 6: How do I monitor and refine capabilities? {#step-6-monitor-and-refine}

After initial setup:

1. **Review conversation logs** to see how capabilities perform in real interactions.
2. **Collect customer feedback** about their experience.
3. **Adjust instructions** based on what you learn.
4. **Add or remove capabilities** as your business needs evolve.

## How do I troubleshoot common capability issues? {#troubleshooting-common-issues}

### Capability not activating
- **Check trigger conditions**: Ensure customer requests match capability parameters
- **Review instructions**: Make sure activation criteria are clear
- **Test with different phrasings**: Try various ways customers might make requests

### Information not being collected
- **Verify required fields**: Ensure the capability knows what information to gather
- **Check instruction clarity**: Make collection requirements explicit
- **Test conversation flow**: Walk through the process as a customer would

### Capabilities conflicting
- **Review capability priorities**: Some capabilities may override others
- **Clarify instructions**: Make trigger conditions more specific
- **Remove conflicting capabilities**: Remove capabilities that interfere and re-add them once instructions are refined

### The AI has the information but never acts on it

Knowledge and capabilities do different jobs. A Knowledge Base entry is reference material the AI retrieves when it judges a lookup would help — it does not guarantee the AI takes a particular action or uses particular wording. When a question should trigger the same process every time, that content belongs in a capability rather than in knowledge.

To turn a knowledge entry into a capability:

1. Open the knowledge entry and copy its content.
2. Go to the `Capabilities` section and click `+ Add Capability`.
3. Name the capability after the task it performs, such as `Booking workflow`.
4. Paste the content into the prompt and restructure it as a workflow, using `##` for each instruction and `###` for the steps beneath it.
5. Rewrite any descriptive lines as directives. See [Write instructions as directives, not descriptions](#write-instructions-as-directives-not-descriptions).
6. Save, then test with the phrasings a customer would actually use.

Leave the original knowledge entry in place. Knowledge continues to answer open-ended questions; the capability governs the process.

## Advanced configuration tips

### Capability layering
Enable multiple complementary capabilities that work together:
- Lead Capture + Appointment Booking for service businesses
- Knowledge Base + Communication Style for support scenarios
- Product Lookup + Lead Capture for sales interactions

### Gradual rollout
Start with essential capabilities and add more over time:
1. **Week 1**: Enable basic communication style and knowledge base
2. **Week 2**: Add lead capture once AI is responding well
3. **Week 3**: Include appointment booking after testing lead flow
4. **Week 4+**: Add custom capabilities for specialized needs

### Performance monitoring
Track key metrics to measure capability effectiveness:
- Activation rate (how often capabilities trigger)
- Completion rate (successful information collection)
- Customer satisfaction scores
- Conversion rates for lead capture

## Frequently asked questions

<details>
<summary>Where do I find the capabilities for an AI Employee?</summary>

Go to `AI` → `Workforce` in Business App, click `Configure` next to the AI Employee, and scroll to the `Capabilities` section. Capabilities that appear there are active.

</details>

<details>
<summary>How do I remove a capability from an AI Employee?</summary>

On the AI Employee's `Configure` page, open the `Capabilities` section, click the three-dot menu next to the capability, and select **Remove**.

</details>

<details>
<summary>What do I need before using the Appointment Booking capability?</summary>

Connect your calendar in your Business App settings. Appointment Booking schedules meetings using your connected calendar.

</details>

<details>
<summary>Do capability prompts have version history?</summary>

No. Capability prompts have no version history, so copy the existing prompt into a separate document before you make substantial edits.

</details>

<details>
<summary>Why does my AI Employee have the information but never act on it?</summary>

A Knowledge Base entry is reference material the AI retrieves when it judges a lookup would help, so it doesn't guarantee a particular action. When a question should trigger the same process every time, put that content in a capability instead.

</details>

<details>
<summary>Can a capability behave differently on SMS and email?</summary>

Yes. Your AI Employee knows which channel it's responding on, so a capability's instructions can reference the channel by name, for example to ask for fewer details over SMS than by email.

</details>

## Next steps

- **Create Custom Capabilities**: [Learn how to build custom capabilities](./creating-custom-capabilities) for specialized business needs
- **Advanced Prompting**: Explore prompt engineering techniques for better capability performance
- **Integration Setup**: Connect external systems to enhance capability functionality

Need help with specific capability configurations? Check our [troubleshooting guide](#troubleshooting-common-issues) or contact support for personalized assistance.

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    New to how AI Employees work? Take the <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> course in Vendasta Learn — Beginner, 6 lessons.
  </span>
</div>


