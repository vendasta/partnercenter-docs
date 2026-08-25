---
title: How to Create Custom Capabilities
sidebar_label: Creating Custom Capabilities
sidebar_position: 3
description: Step-by-step guide to building custom AI capabilities that connect AI Employees to external systems using tools and APIs.
tags: [ai-capabilities, custom-capabilities, ai-workforce, integrations]
keywords: [custom capabilities, AI capabilities, tools, integrations, API, AI Employees, prompts, testing]
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

This guide walks you through creating custom capabilities that connect your AI Employees to external systems and APIs. Custom capabilities enable specialized business functions like inventory checking, appointment booking, and order tracking.

## Prerequisites

Before creating custom capabilities, ensure you have:
- Access to the external system's API documentation
- Valid API credentials or authentication tokens
- A clear understanding of the business process you want to automate
- Basic familiarity with API concepts (URLs, methods, parameters)

## When to use custom capabilities

Create custom capabilities when your AI Employees need to:
- Check real-time inventory and product details
- Schedule appointments or bookings in external systems
- Look up order status from your e-commerce platform
- Generate custom quotes or estimates
- Access customer account information (loyalty points, purchase history)
- Search internal knowledge bases or FAQ systems
- Create tickets in job-tracking or support systems
- Automate repetitive workflows specific to your business

:::tip
If an action can be performed via an API, it can likely become a custom capability.
:::

## Step-by-step: creating a custom capability

### Step 1: access custom capability settings

1. Navigate to <AISparkleIcon /> **AI** › **AI Workforce** in your Business App dashboard.
2. Select the AI Employee you want to enhance (this can be a pre-built AI Employee like Chat Receptionist or Voice Receptionist, or a Custom AI Employee you've created).
3. Click the **Configure** button.
4. Use the **Capabilities** tab to view and manage all available capabilities.
5. Scroll down to the **Custom Capabilities** section.
6. Click **Add a capability** to begin.

:::tip Custom Capabilities Work Across All AI Employees
Custom capabilities can be used with both pre-built AI Employees (Chat Receptionist, Voice Receptionist) and Custom AI Employees you create. This means you can build a custom capability once and use it across multiple AI Employees.
:::

### Creating custom AI Employees

You can create entirely custom AI Employees with specialized capabilities. Custom AI Employees use the same framework as pre-built AI Employees, giving you complete control over their configuration.

**When to Create Custom AI Employees:**
- You need an AI Employee specialized for a specific business function (e.g., job estimator, project manager)
- Pre-built AI Employees don't fit your exact use case
- You want complete control over conversation flows and responses
- You need industry-specific knowledge and capabilities

**Basic Steps:**
1. In the AI Workforce section, click **Create** 
2. Set up the basic profile (name, avatar, purpose)
3. Configure communication channels (web chat, SMS, phone, etc.)
4. Add knowledge sources (website, documents, custom text)
5. Add both built-in and custom capabilities
6. Test your custom AI Employee before deploying

**Benefits of Custom AI Employees:**
- Specialized for specific business functions
- Tailored conversation flows and responses
- Industry-specific knowledge and capabilities
- Complete control over behavior and appearance
- Can be deployed across multiple channels (web chat, in-platform chat, automations)

**Using Custom Capabilities with Custom AI Employees:**
Custom capabilities work seamlessly with Custom AI Employees. You can:
- Create custom capabilities specifically for your Custom AI Employee
- Reuse custom capabilities across multiple AI Employees (both pre-built and custom)
- Build specialized workflows that combine multiple custom capabilities

For comprehensive guidance on creating Custom AI Employees, see the [Custom AI Employees guide](../ai-workforce/custom-ai-employees.md).

### Step 2: define basic capability information

1. **Enter a capability name**: Use a clear, descriptive name (e.g., `CheckInventory`, `BookAppointment`).
   - Avoid spaces in the name
   - Use descriptive names that indicate the capability's purpose
2. **Add a description**: Write a brief explanation of what this capability does.
   - Example: "Checks product availability in real-time inventory system"

### Step 3: create the capability prompt

1. In the **Prompt** field, define when and how the AI should use this capability.
2. You can start with placeholder text ("TBD") and refine it after setting up tools.
3. For detailed guidance, see [Writing Effective Capability Prompts](#writing-effective-capability-prompts).

:::tip
Consider the prompt as instructions for when you hire an employee. Be specific about when they should use this skill and how to handle different scenarios.
:::

### Step 4: configure tools

1. Click **Add Tool** to define the technical implementation.
2. Choose your tool type:
   - **Import from cURL**: Import existing API configurations
   - **Manual configuration**: Set up custom API calls
   - **MCP Connection**: Connect to external systems via Model Context Protocol
3. Fill in the required tool fields (see [Tool Configuration Reference](#tool-configuration-reference)).
4. Add multiple tools if your capability requires several API calls.

:::tip Detailed Tool Building Guide
For comprehensive step-by-step instructions on finding API documentation, using cURL import, working with AI assistants, and testing tools, see [Building Custom Tools](./tools-overview/building-custom-tools).
:::

### Step 5: test and refine

1. Click **Save** to store your capability configuration.
2. Test the capability by chatting with your AI Employee.
3. Try different phrasings that should trigger the capability.
4. Monitor the AI's responses and refine the prompt as needed.

### Step 6: deploy and monitor

1. Once satisfied with testing, enable the capability for live interactions.
2. Monitor conversation logs to see how the capability performs.
3. Iterate on prompts and tool configurations based on real usage.

## Tool configuration reference

#### Import from cURL  
cURL is a tool developers use to test APIs by typing commands. Many API docs show example cURL commands. Importing a cURL command here helps you fill in the tool setup automatically—saving time and avoiding mistakes.  

#### ID  
This is a unique name for your tool inside your AI’s setup. Choose something simple and descriptive, like `CheckInventory` or `BookAppointment`. You cannot use spaces.

#### Description  
Write a short, clear sentence that explains what this tool does. This helps your AI Employee know what the tool does and helps you and your team remember its purpose later  
*Example:* “Checks if a product is in stock.”

#### Method & URL  
- **Method:** This is the action your AI will ask the API to perform:  
  - **GET** means "give me some info."  
  - **POST** means "create or update something."  
  - **PUT/PATCH** means "change something."  
  - **DELETE** means "remove something."  
- **URL:** This is the web address your AI will contact to do the action. Think of it like the phone number the AI calls.  
*Example:* `GET https://api.yourbusiness.com/products`

#### Parameters  
Parameters are extra details your AI sends so the API knows exactly what you want. They come in different types:  
- **Query parameters:** Added to the end of a URL like a question. Example: `?product_id=123` means “tell me about product 123.”  
- **Path parameters:** Part of the URL path, like an address. Example: `/products/123` means “look up product 123.”  
- **Body parameters:** Sent inside the request, usually to add or update info (like customer details).  
Each parameter has a name (like `product_id`), a description (what it means), where it goes (query, path, or body), and what kind of data it is (text, number, etc.).

#### Headers  
Headers are extra info sent with the API request, often for security. For example:  
- `Authorization: Bearer YOUR_API_KEY` (lets the AI access the data)  
- `Content-Type: application/json` (tells the AI what kind of data is sent)

#### No external processing needed  
Check this box if your tool doesn’t actually call an outside API but works internally—like formatting dates or text within the AI. This saves unnecessary network calls.

## Writing effective capability prompts

A well-written capability prompt has four key parts. Think of it like training instructions for a new employee:

### 1. When to use this capability
Clearly specify the trigger conditions:
```
ONLY call CheckCustomerOrderStatus when the user asks about their order status, 
tracking, or delivery. Do NOT use this for general product questions.
```

### 2. What information you need first
List required information before the AI can act:
```
You MUST have the order_number before calling this tool.
If the customer doesn't provide it, ask: "Could you share your order number? 
You can find it in your confirmation email."
```

### 3. How to use the response
Guide the AI on presenting results to customers:
```
If successful: "I found your order! It's currently [status] and expected to 
arrive on [date]."

If the order is delayed: Apologize and provide the new estimated delivery date.
```

### 4. How to handle errors
Explain what to do when things go wrong:
```
If the API returns no results: "I couldn't find an order with that number. 
Could you double-check it? Order numbers are typically 8-10 digits."

If the API fails: "I'm having trouble accessing order information right now. 
Would you like me to take your contact info so we can follow up?"
```

### Formatting tips for better results

Use markdown formatting to make your prompts clear for both humans and AI:

- **Use headers** (`#`, `##`) to organize different sections
- **Use bullets** to list multiple items or steps
- **Use bold** to emphasize critical instructions or field names
- **Use code formatting** for specific examples or API field names

**Example with good formatting:**
```markdown
# Order Status Lookup

## When to Use
- ONLY when customer asks about order status or tracking
- NOT for product availability or general questions

## Required information
Before calling the tool, you MUST have:
- **order_number** (8-10 digit number)
- Ask if missing: "What's your order number?"

## Response format
- Success: "Your order #[number] is [status]."
- Not found: "I couldn't locate that order. Please verify the number."
```

This structure is easier to scan and helps the AI understand exactly what to do.

## Managing custom capabilities

- **Updating:** Any saved changes are applied the next time the AI considers the capability during chat.
- **Disabling:** Deleting tools is not supported yet; to disable a tool, un-assign it from the AI Employee.

## Testing and troubleshooting custom capabilities

### Basic testing steps

1. Chat with your AI Employee and try different phrasings to trigger the capability.
2. Verify the AI requests any required information and calls the appropriate tool.
3. In *Conversations*, click **Explanation** under a message to view the AI's reasoning and raw API call.
4. If the API call fails, test it separately using tools like Postman, adjust as needed, and re-import the cURL command.

### Advanced testing techniques

**Test with Fresh Conversations**
- Use incognito/private browsing windows for clean test sessions
- Or clear cookies between tests to ensure no context carryover
- This helps verify your capability works consistently for new visitors

**Test Multiple Phrasings**
- Try different ways customers might ask for the same thing
- Test with incomplete requests to see how the AI gathers missing information
- Verify the capability doesn't trigger when it shouldn't

**Review AI Explanations Systematically**
- Check if the AI considered your capability and why it did or didn't use it
- Examine the exact API call parameters to verify correct data mapping
- Look at the API response and how the AI interpreted it
- Compare multiple conversations to identify patterns in behavior

### Iteration best practices

When refining custom capabilities, follow this systematic approach:

**Step 1: Start Simple**
- Create a minimal capability prompt with just the basics
- Test that the core functionality works
- Add complexity incrementally

**Step 2: Identify Specific Issues**
- Document exactly what went wrong (with examples)
- Note the customer's input and the AI's response
- Review the explanation to understand the AI's decision-making

**Step 3: Make One Change at a Time**
- Adjust only one aspect (prompt wording, tool parameter, or response template)
- Save and test immediately
- If it doesn't work, revert and try a different approach

**Step 4: Test the Change**
- Use the same customer input that previously failed
- Verify the issue is resolved
- Test edge cases to ensure no unintended side effects

**Step 5: Document Your Changes**
- Keep notes on what you changed and why
- Record which changes improved performance
- Build a reference for future capabilities

:::tip When to Adjust What
- **Prompt issues**: The AI doesn't know when to use the capability or how to handle responses
- **Tool configuration issues**: API calls fail, wrong parameters are sent, or authentication fails
- **Knowledge issues**: The AI needs context it doesn't have (add to knowledge base, not capability)
- **Purpose issues**: The AI's overall behavior conflicts with the capability (adjust AI Employee purpose)

Start with the most specific fix (tool configuration) before adjusting broader elements (prompts or purpose).
:::

### Performance monitoring

After deploying custom capabilities, monitor their performance:

**Track Success Rates**
- Review conversations where the capability was used
- Identify common failure patterns
- Look for scenarios you didn't test

**Monitor API Performance**
- Check API response times in explanations
- Watch for API rate limits or timeout issues
- Track error rates and common error types

**Customer Experience Indicators**
- Note when customers express frustration or confusion
- Look for repeated clarifying questions
- Check if customers achieve their goals

**Optimization Signals**
- The AI frequently asks for the same missing information (add to prompt)
- The capability triggers incorrectly (refine trigger conditions)
- Customers rephrase requests multiple times (improve prompt clarity)
- API calls fail frequently (check tool configuration or API stability)

## Example Custom Capability: Product information lookup

### Example tool configuration

| Field       | Value                                              |
|-------------|----------------------------------------------------|
| **ID**      | `LookupProductDetails`                              |
| **Description** | Retrieves details for a product from the product database |
| **Method**  | `GET`                                              |
| **URL**     | `https://api.yourdatabase.com/products`            |

### Parameters

- `product_id` (string, *query*) – the unique identifier of the product

### Headers

- `X-API-Key: YOUR_SECURE_API_KEY`

### Prompt snippet (annotated)

```markdown
# Product Lookup Assistant

## When to use
- ONLY call `LookupProductDetails` when the user asks about a product's 
  price, description, or features.
- Do NOT call this unless the user has provided a specific product name **or** ID.
```
👉 **Why this works:** Clear boundaries prevent the AI from calling the tool unnecessarily, saving API calls and improving response speed.

```markdown
## Information needed
- Before calling the tool, you MUST identify `product_id`.
- If the user only gives a name, ask for the ID.
```
👉 **Why this works:** Explicit requirements ensure the AI gathers necessary information before attempting the API call.

```markdown
## Tool parameters
- Set `product_id` to the user-provided ID.
```
👉 **Why this works:** Simple, direct mapping between conversation data and API parameters.

```markdown
## How to respond
- If successful: "I found **[Product Name]**. The price is **$[Price]**. 
  Description: **[Description]**."
- If not found: Apologize and suggest the user double-check the ID or browse 
  products online.
```
👉 **Why this works:** Providing exact response templates (with bold formatting for variables) ensures consistent, professional customer communication.

#### Before/After Comparison

**❌ Vague prompt:**
```
Look up products when customers ask about them.
```
**Problems:** When should it look up? What info is needed? How should it respond?

**✅ Detailed prompt (above):**
Clear trigger conditions, required information, response templates, and error handling.

### Sample conversation

**Customer:** "Can you tell me the price of the blue wireless headphones?"  
**AI:** "Sure! To make sure I have the right product, can you confirm if you mean the *BlueWave Wireless Headphones*?"  
**Customer:** "Yes, that's the one."  
*(AI calls `LookupProductDetails` with `product_id` matching BlueWave Wireless Headphones)*  
**AI:** "Great! The *BlueWave Wireless Headphones* are priced at **$89.99**. They offer 20 hours of battery life and come with a two-year warranty."

### Variation: pair the lookup with the visitor's current URL

When an AI Employee is responding on **Web Chat**, it receives the URL of the page the visitor is currently on with every message. You can combine this context with a lookup capability so the AI answers vague questions ("is this still available?", "what's the price?") without needing to ask which item the visitor means.

This pattern is especially powerful for businesses with structured URLs — e-commerce product pages, vehicle inventory, real estate listings, service pages, and so on.

**Prompt snippet — extend the lookup capability with URL parsing:**

```markdown
## Using the Current Page URL
The product detail pages follow this URL pattern:
https://www.example.com/products/[slug]/[product_id]

The value at the end of the path is the `product_id`.

## When to use
- If the visitor's current URL matches the product detail pattern AND they ask a vague product question ("is this in stock", "how much", "any other colors"), parse the `product_id` from the URL and call `LookupProductDetails`.
- Confirm the product naturally in the first line of your reply so the visitor knows you understood.
- If the URL changes between turns, the visitor has navigated to a different product. Always use the URL from the most recent message.
- If the visitor explicitly names a different product than the one in the URL, follow what they said and ignore the URL.
- On non-product pages (homepage, /about, /contact), do not assume product context.
```

:::tip
For the AI Chat Receptionist, see [Make responses page-aware with the visitor's URL](../ai-workforce/ai-chat-receptionist/index.md#make-responses-page-aware-with-the-visitors-url) for the broader feature overview.
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    New to how AI Employees work? Take the <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> course in Vendasta Learn — Beginner, 6 lessons.
  </span>
</div>
