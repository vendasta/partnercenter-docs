---
title: How to Create Custom Capabilities
sidebar_label: Creating Custom Capabilities
sidebar_position: 3
---

import { AISparkleIcon } from '@site/src/components/Icons';

This guide walks you through creating custom capabilities that connect your AI Employees to external systems and APIs. Custom capabilities enable specialized business functions like inventory checking, appointment booking, and order tracking.

## Prerequisites

Before creating custom capabilities, ensure you have:
- Access to the external system's API documentation
- Valid API credentials or authentication tokens
- A clear understanding of the business process you want to automate
- Basic familiarity with API concepts (URLs, methods, parameters)

## When to Use Custom Capabilities

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

## Step-by-Step: Creating a Custom Capability

### Step 1: Access Custom Capability Settings

1. Navigate to <AISparkleIcon /> **AI** › **AI Workforce** in your Business App dashboard.
2. Select the AI Employee you want to enhance (or create a new Custom AI Employee).
3. Click the **Configure** button.
4. Use the **Capabilities** tab to view and manage all available capabilities.
5. Scroll down to the **Custom Capabilities** section.
6. Click **Add a capability** to begin.

#### Creating Custom AI Employees

You can now create entirely custom AI Employees with specialized capabilities:

1. In the AI Workforce section, click **Create Custom AI Employee**
2. Set up the basic profile (name, avatar, purpose)
3. Configure communication channels (web chat, SMS, etc.)
4. Add both built-in and custom capabilities
5. Test your custom AI Employee before deploying

**Benefits of Custom AI Employees:**
- Specialized for specific business functions
- Tailored conversation flows and responses
- Industry-specific knowledge and capabilities
- Complete control over behavior and appearance

### Step 2: Define Basic Capability Information

1. **Enter a capability name**: Use a clear, descriptive name (e.g., `CheckInventory`, `BookAppointment`).
   - Avoid spaces in the name
   - Use descriptive names that indicate the capability's purpose
2. **Add a description**: Write a brief explanation of what this capability does.
   - Example: "Checks product availability in real-time inventory system"

### Step 3: Create the Capability Prompt

1. In the **Prompt** field, define when and how the AI should use this capability.
2. You can start with placeholder text ("TBD") and refine it after setting up tools.
3. For detailed guidance, see [Writing Effective Capability Prompts](#writing-a-good-capability-prompt).

:::tip
Consider the prompt as instructions for when you hire an employee. Be specific about when they should use this skill and how to handle different scenarios.
:::

### Step 4: Configure Tools

1. Click **Add Tool** to define the technical implementation.
2. Choose your tool type:
   - **Import from cURL**: Import existing API configurations
   - **Manual configuration**: Set up custom API calls
   - **MCP Connection**: Connect to external systems via Model Context Protocol
3. Fill in the required tool fields (see [Tool Configuration Reference](#tool-fields-explained)).
4. Add multiple tools if your capability requires several API calls.

### Step 5: Test and Refine

1. Click **Save** to store your capability configuration.
2. Test the capability by chatting with your AI Employee.
3. Try different phrasings that should trigger the capability.
4. Monitor the AI's responses and refine the prompt as needed.

### Step 6: Deploy and Monitor

1. Once satisfied with testing, enable the capability for live interactions.
2. Monitor conversation logs to see how the capability performs.
3. Iterate on prompts and tool configurations based on real usage.

## Tool Configuration Reference

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

## Writing Effective Capability Prompts

When creating your **Prompt**, be sure to:

- Clearly specify when to call the tool (e.g., "ONLY call `CheckCustomerOrderStatus` when the user asks about their order status").
- List the information the AI must gather before calling the tool (e.g., "You MUST have `order_number` before calling").
- Guide how the AI should use the tool’s response when replying to the user.
- Explain how to handle errors or cases when the API returns no results.

## Managing Custom Capabilities

- **Updating:** Any saved changes are applied the next time the AI considers the capability during chat.
- **Disabling:** Deleting tools is not supported yet; to disable a tool, un-assign it from the AI Employee.

## Testing and troubleshooting Custom Capabilities

1. Chat with your AI Employee and try different phrasings to trigger the capability.
2. Verify the AI requests any required information and calls the appropriate tool.
3. In *Conversations*, click **Explanation** under a message to view the AI’s reasoning and raw API call.
4. If the API call fails, test it separately using tools like Postman, adjust as needed, and re-import the cURL command.

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

### Prompt snippet

```markdown
# Product Lookup Assistant
## When to use
- ONLY call `LookupProductDetails` when the user asks about a product's price, description, or features.
- Do NOT call this unless the user has provided a specific product name **or** ID.

## Information Needed
- Before calling the tool, you MUST identify `product_id`.
- If the user only gives a name, ask for the ID.

## Tool Parameters
- Set `product_id` to the user-provided ID.

## How to respond
- If successful: "I found **[Product Name]**. The price is **$[Price]**. Description: **[Description]**."
- If not found: Apologize and suggest the user double-check the ID or browse products online.
```

### Sample conversation

**Customer:** "Can you tell me the price of the blue wireless headphones?"  
**AI:** "Sure! To make sure I have the right product, can you confirm if you mean the *BlueWave Wireless Headphones*?"  
**Customer:** "Yes, that's the one."  
*(AI calls `LookupProductDetails` with `product_id` matching BlueWave Wireless Headphones)*  
**AI:** "Great! The *BlueWave Wireless Headphones* are priced at **$89.99**. They offer 20 hours of battery life and come with a two-year warranty."
