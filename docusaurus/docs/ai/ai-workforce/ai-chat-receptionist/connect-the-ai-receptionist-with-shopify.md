---
title: "Connect the AI Chat Receptionist with Shopify"
sidebar_label: Connect with Shopify
description: Connect the AI Chat Receptionist to Shopify to search products, share details, and check inventory in chat.
---

import {AISparkleIcon} from '@site/src/components/Icons'
import {ChatUserMessage, ChatAIMessage} from '@site/src/components/ChatBubble' 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

By connecting the AI Chat Receptionist with Shopify, you'll be able to integrate info from your online store directly to your AI Chat Receptionist. 

**In this guide, you will set up your AI Receptionist to be able to:**
- Search your Shopify store for products by keyword;
- Fetch detailed product information, including title, handle, price range, and description; and
- Check real-time inventory levels.

### Why is connecting the AI Receptionist with Shopify important?

When a customer visits a Shopify store they might have a general idea of a product they want but aren't sure exactly how to find it on the store website. Similarly, a customer might be able to find it in search but miss out on some key product details if they don't know where to look. This integration lets a customer ask general questions using chat and get helpful, personalized responses from the AI Receptionist that directs them where they want to go.

:::tip
While this guide has been written primarily for your AI Chat Receptionist, you can use the Tools created in this guide with your AI Voice Receptionist, or any other AI Employee!
:::

## Prerequisites & setup

Before you connect your AI Receptionist to Shopify, you need to gather the following items from your Shopify store’s admin. You’ll only need to do this once.

| What you need | Where to find it | Scopes / Notes |
|---------------|------------------|----------------|
| **Shopify Store Domain** (`your-store.myshopify.com`) | `Admin` → `Settings` → `General`, copy `Store address` | N/A |
| **Admin API Access Token** | <p>1. Click <code>New app</code> → <code>Configure Admin API</code> (select the permissions shown in “Scopes / Notes” and click Save)</p><p>2. Click <code>Install</code> → <code>Reveal token</code></p> | <ul><li>`read_inventory`</li><li>`read_products`</li></ul> |
| **Storefront API Access Token** | <p>1. Click <code>Enable Storefront API</code> (turn on the permission listed in “Scopes / Notes” and click Save)</p><p>2. Click <code>Install / Update</code> → <code>Reveal token</code></p> | <ul><li>`unauthenticated_read_product_listings`</li></ul> |
| *(Optional)* **GraphQL Familiarity** | Review [Shopify Admin GraphQL API docs](https://shopify.dev/docs/api/admin-graphql) | N/A |

#### Shopify help resources

:::info
You can get more detailed help on gathering this information from the Shopify help links below:
- Getting your store domain ([Shopify general settings](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/general-settings))
- Developing "apps" for your store ([Custom Apps](https://help.shopify.com/en/manual/apps/custom-apps))
- Utilizing the Shopify Storefront API ([Storefront API docs](https://shopify.dev/docs/api/storefront))
- Utilizing Shopify Admin GraphQL API ([Admin GraphQL API docs](https://shopify.dev/docs/api/admin-graphql))
:::

---

## Step 1: Add a Shopify custom capability for your AI Receptionist

This step creates the capability your AI Receptionist will reference when someone asks about items or stock. These are the "instructions" given to your AI Receptionist that help it know what it can do and when it should do it.

1. In your Business App, navigate to <AISparkleIcon /> `AI` → `Workforce`
2. Select your AI Employee and click `Configure`.
3. Open `Capabilities`, click `+ Add a capability`, then choose `+ New capability`.
4. Fill in the following fields:
   - `Name`: `Get Shopify Product Info`
   - `Description`: Searches the Shopify store for products matching a keyword and returns product names, descriptions, prices, and availability using the Storefront API.
  
:::note
You will come back to this screen in [Step 3: Write the Prompt](#step-3-write-the-prompt).
:::

## Step 2: Configure Shopify API tools for the AI Receptionist

For your AI Receptionist to be able to get information from Shopify, it will need to be able to call Shopify APIs using Tools. In this step you will configure a single tool your AI Receptionist can use to search for products and report whether they are available for sale.

### Shopify tool: getProductList

`getProductList` is your AI Receptionist's product‑search tool. We are using it to send a keyword to Shopify’s Storefront API and returns up to five matching products with title, handle, price range, and availability. 
Use the values below (replacing any placeholders) to create your version of this tool.

#### Summary

| Field | Value |
|-------|-------|
| **ID** | `getProductList` |
| **Description** | Searches the Shopify store for products matching a keyword and returns names, descriptions, prices, and availability. |
| **Method** | `POST` |
| **URL** | `https://{{your-shopify-domain}}/api/2025-01/graphql.json` |

#### Required headers

| Header | Example value | Required |
|--------|---------------|:-------:|
| `X-Shopify-Storefront-Access-Token` | `YOUR_STOREFRONT_ACCESS_TOKEN` | ✓ |
| `Content-Type` | `application/json` | ✓ |

:::info
For help getting your storefront access token, you can follow the [Prerequisites & Setup](#prerequisites--setup) section in this guide.
:::

#### Body parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `query` | `Body` | `string` | `Generate a full GraphQL query string using Shopify Storefront API with this format: query { products(first: 5, query: "KEYWORD") { edges { node { title handle availableForSale priceRange { minVariantPrice { amount currencyCode } } descriptionHtml } } } }, replacing KEYWORD with the user's term. Do not return just a keyword, return the entire query string exactly as shown.` |

:::info
If an API call is failing, compare the API call created by your AI Employee with this example successful GraphQL body. You can inspect AI Employee raw API calls in the `Conversations` tab.

<details>
<summary>Example AI Receptionist generated GraphQL body</summary>

```graphql
query {
  products(first: 5, query: "bags") {
    edges {
      node {
        id
        title
        variants(first: 1) {
          edges { node { price } }
        }
      }
    }
  }
}
```
</details>
:::


## Step 3: Write the prompt

In this step, you’ll write the AI Receptionist’s prompt. These are the instructions that tell the AI Receptionist **when** to use the tool `getProductList`, **how** to use the tool based on information from the conversation, and **what** to respond to the customer with.

You can copy and paste this whole example prompt below, but you will first have to:
-  swap out the `Category`  placeholders with a few examples of product categories in your Shopify store 
- swap out the `Item` placeholders with examples of products that belong to the product categories in your Shopify store

### Example AI Receptionist Shopify prompt

````
## **Inventory Lookup Trigger & Query Instructions**

### When to Query Shopify Inventory
Initiate a live Shopify Storefront API query **only when**:
- The user asks about a specific product, product type, or category (e.g., "Do you have grooming kits?" or "Show me hoodies").
- The user expresses interest in browsing or comparing available items.
- The user mentions relevant keywords from product categories (see below).

**Do not query** if the user asks about non-inventory topics such as shipping, returns, sizing, or store policies.

---

### Keyword-Based Intent Inference
Trigger a query if the user message includes or implies any of these category-related keywords:

#### {Category 1}:
- {Item 1, Item 2, Item 3, Item 4, Item 5}

#### {Category 2}:
- {Item a, Item b, Item c, Item d, Item e}

#### {Category 3}:
- {Item z, Item y, Item x, Item v, Item w}

If multiple categories are referenced, use the most specific or dominant keyword to construct the search term.

---

### GraphQL Query Construction
When querying Shopify, YOU MUST generate a **complete GraphQL query string** in the following structure, and place it in the 'query' param. DO NOT SEND A SINGLE KEYWORD in the query param.

```graphql
query {
  products(first: 5, query: "KEYWORD") {
    edges {
      node {
        title
        handle
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        descriptionHtml
      }
    }
  }
}
```

- Replace "KEYWORD" with the most relevant search term based on the user's input.
- Do **not** include pagination cursors, pageInfo, or unrelated fields.
- Ensure the query is syntactically valid and fully escaped if it will be sent as a JSON string.
- Include the `handle` field so you can build product URLs.
- Product links should be constructed using the format: `https://cegxnb-y0.myshopify.com/products/HANDLE`

### If no matching products are found
- Politely inform the user that no products matched their query.
- Suggest other available categories or popular items (e.g., "You could also check out our toys or grooming kits").

When sharing links, hyperlink it over the name of the product.
````

## Example conversation with AI Receptionist connected to Shopify

<ChatUserMessage>
Hey, do you have any hoodies for sale?
</ChatUserMessage>

*(AI calls `getProductList` with the provided keyword `hoodie`)*

<ChatAIMessage>
Sure! Here are a couple of options for hoodies:

1. **Cozy Hoodie** – $45.00 USD  
   A fleece-lined pullover with a front pocket and adjustable drawstring hood.  
   [View Cozy Hoodie](https://your-store.myshopify.com/products/cozy-hoodie)

2. **Lightweight Zip-Up** – $39.00 USD  
   A breathable, zip-up hoodie perfect for layering, available in multiple colors.  
   [View Lightweight Zip-Up](https://your-store.myshopify.com/products/lightweight-zip-up)

Would you like more details or help placing an order?
</ChatAIMessage>



## Testing & troubleshooting

This section walks you through diagnosing the most common issues with connecting Shopify with  the AI Receptionist: from authentication errors and query mistakes, to empty results and rate limiting. Select the tab that matches your symptom to learn what the error looks like and how to fix it.


:::note
Troubleshooting API errors can involve technical steps like examining HTTP responses, GraphQL query syntax, and request headers. If you’re not comfortable with these details, consider asking a developer or reaching out to our support team for help.
:::

<Tabs
  defaultValue="token"
  values={[
    { label: 'Unauthorized Error (401/403)', value: 'token' },
    { label: 'Syntax Error', value: 'syntax' },
    { label: 'No Products Found', value: 'empty' },
    { label: 'View Raw Request', value: 'inspect' },
    { label: 'Rate Limit (429)', value: 'rate' },
  ]}>

<TabItem value="token">
#### What is this error?
You’ll get a `401 Unauthorized` or `403 Forbidden` response and see a JSON like:
```json
{ "errors": [{ "message": "Access denied" }] }
```

#### How do we fix this error?
1. Double-check your Storefront access token and store domain.
2. In Postman or GraphiQL, run the same query against
   `https://{{your-shopify-domain}}/api/2025-01/graphql.json`
   with header
   `X-Shopify-Storefront-Access-Token: <token>`.
3. If it still fails, regenerate your Storefront token in Shopify’s admin.
</TabItem>

<TabItem value="syntax">
#### What is this error?
You’ll encounter a `Syntax Error` (the GraphQL query couldn’t be understood), and may see a JSON like:
```json
{ "errors": [{ "message": "Syntax Error: Unexpected }" }] }
```

#### How do we fix this error?
1. Compare your query to this template exactly:
   ```graphql
   query {
     products(first: 5, query: "YOUR_TERM") {
       edges {
         node {
           title
           handle
           availableForSale
           priceRange { minVariantPrice { amount currencyCode } }
           descriptionHtml
         }
       }
     }
   }
   ```
2. Escape all quotes and ensure braces match.
</TabItem>

<TabItem value="inspect">
#### What is this error?
This view shows the raw HTTP request the AI sent, including headers and the GraphQL body.

#### How do we fix this error?
1. Open "Conversations" → "Explanation" in your Business App.
2. Confirm the GraphQL query and headers match your intended values.
3. Correct any typos in the tool prompt or mapping logic.
</TabItem>

<TabItem value="empty">
#### What is this error?
The response’s `products.edges` array is empty, so no products matched.

#### How do we fix this error?
1. Verify the search term matches a product title, handle, or tag.
2. Try a broader keyword or check for typos.
</TabItem>

<TabItem value="rate">
#### What is this error?
Shopify returned a `429 Too Many Requests` error, indicating you are hitting the rate limit.

#### How do we fix this error?
1. Reduce the frequency of `getProductList` calls.
2. Implement exponential backoff or caching.
3. Aggregate multiple user queries into a single batch if possible.
</TabItem>

</Tabs>

## FAQ: connecting the AI Receptionist with Shopify

### Integration & setup

<details>
<summary>Can I use this Shopify integration with other AI Employees besides the Chat Receptionist?</summary>

Absolutely! While this guide focuses on the AI Chat Receptionist, the Custom Capability and tools you create here work with any AI Employee, including your [AI Voice Receptionist](../ai-voice-receptionist.md). 

This means customers can ask about products through phone calls, SMS, WhatsApp, or any other channel your AI Employees support. The same Shopify product data will be available regardless of how customers choose to interact with your business. 
</details>

<details>
<summary>What other e-commerce platforms can I connect besides Shopify?</summary>

While this guide is specific to Shopify, you can create similar integrations with any e-commerce platform that offers an API, including WooCommerce, BigCommerce, Magento, or custom-built stores.

 The Custom Capabilities Framework allows you to connect to virtually any system that has an API. You can also explore other pre-built integrations in Connections or create workflows with external platforms using Zapier.
</details>

### AI & knowledge questions

<details>
<summary>How does the Shopify integration work with my AI's Knowledge Base?</summary>

The Shopify integration provides real-time product data through API calls, while your [Knowledge Base](../../knowledge-base/index.md) contains static business information. These work together perfectly:

**Shopify API provides:** Live product availability, current prices, product descriptions  
**Knowledge Base should include:** Shipping policies, return information, size guides, care instructions, warranty details

Your AI will use the Shopify API to answer "Do you have this product?" and the Knowledge Base to answer "What's your return policy?" For best results, ensure your [Knowledge Sources](../index.mdx#knowledge-sources) include comprehensive product and policy information to complement the real-time data.
</details>

<details>
<summary>What if customers ask about Shopify-related questions the API can't answer?</summary>

Great question! The Shopify API provides product and inventory data, but customers often need additional information. Add these topics to your Knowledge Base:

- Shipping costs and delivery times
- Return and exchange policies  
- Size charts and fitting guides
- Product care instructions
- Warranty information
- Payment methods accepted
- Order tracking and customer service contacts

This ensures your AI can provide complete, helpful answers by combining real-time product data with your business policies and procedures.
</details>

### Channel & communication questions

<details>
<summary>Can customers use this Shopify integration through SMS or WhatsApp?</summary>

Yes! Custom Capabilities work across all communication channels supported by your AI Employees. Customers can ask about products through:

- [Web chat](/business-app/conversations/#ai-assisted-web-chat-widget)
- SMS Messaging (Conversations Pro required)
- WhatsApp
- Phone calls (with [AI Voice Receptionist](/ai/ai-workforce/ai-voice-receptionist))
- [Facebook Messenger](/business-app/conversations/#social-media-integration)
- [Instagram DMs](/business-app/conversations/#social-media-integration)

 The same product information will be available regardless of how customers choose to contact you. See [Conversations Overview](/business-app/conversations/) for a complete list of supported channels.
</details>

<details>
<summary>How do product recommendations appear in different conversation channels?</summary>

Your AI adapts product recommendations to each communication channel:

**Web Chat & Messaging:** Products appear with clickable links, formatted descriptions, and prices  
**SMS/WhatsApp:** Simplified text format with product names, prices, and shortened URLs  
**Voice Calls:** Spoken product names, prices, and descriptions 

 Your AI automatically optimizes the presentation for each channel. For more details on channel setup, see [Conversations Overview](/business-app/conversations/).
</details>

### Advanced configuration questions

<details>
<summary>Can I create multiple Shopify tools for different store sections or purposes?</summary>

Absolutely! You can create multiple tools within the same Custom Capability or separate capabilities for different purposes:

**Separate tools by function:**
- `getProductList` - Search products by keyword
- `getProductByID` - Get detailed info for specific products  
- `checkInventory` - Check stock levels for multiple items
- `getProductsByCategory` - Browse by category

**Separate capabilities by business logic:**
- Product search for general inquiries
- Inventory lookup for existing customers
- New arrivals showcase for marketing

</details>

<details>
<summary>How can I track which products customers are asking about most?</summary>

You can monitor product inquiry patterns through several methods:

 1. **Conversation reviews:** Check the [Conversations](/business-app/conversations/) tab to see which products customers mention most frequently

2. **AI explanation feature:** Click "Explanation" on AI responses to see exactly which tools were called and what products were searched

3. **Automation tracking:** Set up automations to log product inquiries or notify your team about trending searches

This data helps you understand customer demand, optimize your inventory, and identify opportunities for targeted marketing campaigns.
</details>

### Business process questions

<details>
<summary>What happens when a customer wants to purchase a product the AI recommends?</summary>

Your AI provides product information and links, but purchase completion depends on your business process. Consider setting up:

**Immediate actions:**
- Direct customers to your Shopify store via the product links generated by the AI
- Provide clear checkout instructions and support contact information

**Follow-up workflows:**
- Create automations to notify your sales team about purchase-intent conversations
- Set up lead scoring to prioritize high-value product inquiries
- Use Zapier to create tasks in your CRM when specific products are discussed

The AI captures the lead and interest; your business processes handle the conversion.
</details>

<details>
<summary>Can I customize the AI's response when products are out of stock?</summary>

Yes! You can customize out-of-stock responses in your Custom Capability prompt. Consider these approaches:

**Immediate alternatives:** "That item is currently unavailable, but we have [similar product] in stock."  
**Restock notifications:** "I can have our team notify you when it's back in stock."  
**Substitute suggestions:** "Based on your interest, you might also like [alternative products]."

You can also modify the tool logic to suggest related products or connect to your inventory system for restock dates.
</details>

<details>
<summary>How do I handle customer questions about multiple products or complex comparisons?</summary>

For complex product comparisons, combine your Shopify integration with knowledge base resources:

**Add to Knowledge Base:**
- Product comparison charts
- Buying guides for different customer types
- Feature matrices showing product differences
- Use case recommendations

**Enhance your prompt to:**
- Recognize when customers need comparisons
- Call the Shopify API for multiple products
- Reference Knowledge Base comparison guides
- Offer to connect customers with sales staff for detailed consultations

This approach gives customers both real-time data and expert guidance for complex decisions.
</details>

### Technical & troubleshooting questions

<details>
<summary>What's the difference between the Storefront API and the Admin API?</summary>

The **Storefront API** (used by `getProductList`) is a public, read-only API that returns product metadata plus a boolean `availableForSale`.  
The **Admin API** requires elevated credentials and exposes numeric inventory levels, order management, and deeper data like customer records.

For most customer-facing scenarios, the Storefront API provides sufficient information while maintaining security and performance.
</details>

<details>
<summary>Why do I only see `availableForSale` and not actual stock counts?</summary>

That's by design in the Storefront API: it only tells you if something can be sold at all (true/false).  
If you need actual quantities, you'd need to switch to the Admin GraphQL API or use a separate Admin-level tool.
</details>

<details>
<summary>How can I change how many products `getProductList` returns?</summary>

The query uses `first: 5` by default. You can edit that number in your tool definition or adjust your AI prompt to fetch more (or fewer) items.
</details>

<details>
<summary>Can I customize the fields returned by the query?</summary>

Yes, update the GraphQL body in the tool definition to include any product fields you need (e.g., `tags`, `images { src }`), and adjust your AI prompt so it knows how to display them.
</details>

<details>
<summary>What should I do if the GraphQL query format changes in the future?</summary>

Shopify's API evolves over time, so monitor their [API documentation](https://shopify.dev/docs/api/storefront) for changes. If query formats change:

1. Update the tool definition in your Custom Capability
2. Test the new query format using the troubleshooting tools mentioned above
3. Adjust your AI prompt if the response structure changes

The platform's Custom Capabilities are designed to be easily updated as external APIs evolve.
</details>

<details>
<summary>Can I test this integration before making it live to customers?</summary>

Absolutely! Use these testing methods:

**AI employee testing:** Use the `Chat` button on the employee's card in [`Workforce`](../index.mdx) to open a private conversation and test your AI Employee with sample product questions

**Tool testing:** Review the "Explanation" feature in conversations to see raw API calls and responses

**Channel testing:** Test across different channels using the methods described in [AI Chat Receptionist setup](./index.md#test-and-monitor-your-ai-chat-receptionist) and [AI Voice Receptionist testing](../ai-voice-receptionist.md#test-and-monitor-your-ai-voice-receptionist)

Always test thoroughly before enabling the capability for customer-facing interactions.
</details>