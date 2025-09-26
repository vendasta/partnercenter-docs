---
title: How to Configure AI Capabilities
sidebar_label: Configuring Capabilities
sidebar_position: 2
---

import { AISparkleIcon } from '@site/src/components/Icons';

This guide walks you through enabling and configuring built-in capabilities for your AI Employees. Follow these steps to set up capabilities that handle common business tasks like lead capture and appointment booking.

## Prerequisites

Before you begin:
- You have an AI Employee created in your Business App account
- You have appropriate permissions to configure AI settings
- You understand which capabilities align with your business needs

## Step 1: Access AI Employee Configuration

1. Navigate to <AISparkleIcon /> **AI** › **AI Workforce** in your Business App dashboard.
2. Locate the AI Employee you want to configure.
3. Click the **Configure** button next to the employee's name.

:::tip
If you don't see the Configure button, verify you have the necessary permissions to modify AI Employee settings.
:::

## Step 2: Open the Capabilities Section

1. In the AI Employee configuration panel, scroll down to the **Capabilities** section.
2. Click to expand the section if it's collapsed.
3. You'll see a list of available built-in capabilities with toggle switches.

## Step 3: Enable Desired Capabilities

For each capability you want to activate:

1. **Review the capability description** to understand what it does.
2. **Toggle the capability switch** to the "on" position.
3. **Add specific instructions** (optional) to customize how the capability behaves.

### Common Capability Configurations

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

## Step 4: Add Goals and Instructions (Optional)

For more precise control over capability behavior:

1. **Click the "Add Instructions" link** beneath each enabled capability.
2. **Write clear, specific instructions** that define:
   - When to use the capability
   - What information to collect
   - How to respond in different scenarios
   - What to do if something goes wrong

### Writing Effective Instructions

**Good example:**
```
Lead Capture: Only collect contact information after the customer shows interest in our services. Always ask for name, email, and phone. If they're hesitant to share information, explain that it helps us provide better service.
```

**Poor example:**
```
Get contact info when needed.
```

:::tip Best Practices for Instructions
- Be specific about trigger conditions
- Include error handling guidance
- Use clear, actionable language
- Test different phrasings to see what works best
:::

## Step 5: Save and Test Your Configuration

1. **Click "Save Changes"** at the bottom of the configuration panel.
2. **Test the capabilities** by starting a conversation with your AI Employee.
3. **Try different scenarios** to ensure capabilities activate correctly:
   - Ask questions that should trigger knowledge base access
   - Express interest in services to test lead capture
   - Request an appointment to test booking functionality

### Testing Checklist

- [ ] Capabilities activate at appropriate times
- [ ] Required information is collected before proceeding
- [ ] AI follows your custom instructions
- [ ] Error scenarios are handled gracefully
- [ ] Customer experience feels natural and helpful

## Step 6: Monitor and Refine

After initial setup:

1. **Review conversation logs** to see how capabilities perform in real interactions.
2. **Collect customer feedback** about their experience.
3. **Adjust instructions** based on what you learn.
4. **Add or remove capabilities** as your business needs evolve.

## Troubleshooting Common Issues

### Capability Not Activating
- **Check trigger conditions**: Ensure customer requests match capability parameters
- **Review instructions**: Make sure activation criteria are clear
- **Test with different phrasings**: Try various ways customers might make requests

### Information Not Being Collected
- **Verify required fields**: Ensure the capability knows what information to gather
- **Check instruction clarity**: Make collection requirements explicit
- **Test conversation flow**: Walk through the process as a customer would

### Capabilities Conflicting
- **Review capability priorities**: Some capabilities may override others
- **Clarify instructions**: Make trigger conditions more specific
- **Disable conflicting capabilities**: Temporarily turn off capabilities that interfere

## Advanced Configuration Tips

### Capability Layering
Enable multiple complementary capabilities that work together:
- Lead Capture + Appointment Booking for service businesses
- Knowledge Base + Communication Style for support scenarios
- Product Lookup + Lead Capture for sales interactions

### Gradual Rollout
Start with essential capabilities and add more over time:
1. **Week 1**: Enable basic communication style and knowledge base
2. **Week 2**: Add lead capture once AI is responding well
3. **Week 3**: Include appointment booking after testing lead flow
4. **Week 4+**: Add custom capabilities for specialized needs

### Performance Monitoring
Track key metrics to measure capability effectiveness:
- Activation rate (how often capabilities trigger)
- Completion rate (successful information collection)
- Customer satisfaction scores
- Conversion rates for lead capture

## Next Steps

- **Create Custom Capabilities**: [Learn how to build custom capabilities](./creating-custom-capabilities) for specialized business needs
- **Advanced Prompting**: Explore prompt engineering techniques for better capability performance
- **Integration Setup**: Connect external systems to enhance capability functionality

Need help with specific capability configurations? Check our [troubleshooting guide](#troubleshooting-common-issues) or contact support for personalized assistance.


