---
title: AI Tools  
sidebar_label: AI Tools 
sidebar_position: 1
---

Tools enable your AI Employees to interact with external systems, retrieve real-time information, and automate workflows across different platforms. Understanding how tools work is essential for building powerful AI capabilities that go beyond simple conversation.

## What Are Tools?

A **Tool** is a function or API that an AI Employee can use. Tools connect AI to software systems for:

- Real-time data retrieval
- Automated actions across platforms
- Dynamic responses based on external information

AI can use these Tools with **static inputs** (pre-configured values) to get information the same way every time or use **dynamic inputs** (context-determined values) to get information that is specific to the interaction..

**Example:** An AI receptionist for a handyman service uses a weather API tool when booking "gutter cleaning anytime this week" to check if outdoor conditions are suitable before confirming appointments.


## APIs and Tools

Tools and APIs work together to enable AI Employees to interact with software systems. While APIs provide the raw functionality to connect systems, Tools provide the intelligence layer that tells AI when and how to use those APIs effectively.

### API Basics

An **API** (Application Programming Interface) enables software systems to communicate. Most APIs support CRUD operations:

| Operation | Description | Example |
|-----------|-------------|---------|
| **Create** | Add new data | New CRM contact |
| **Read** | Retrieve data | Order history lookup |
| **Update** | Modify data | Change appointment time |
| **Delete** | Remove data | Cancel subscription |

### Tools vs. APIs

**APIs** provide functionality; **Tools** instruct AI how to use APIs by defining:
- When to use the API
- How to format requests
- Authentication handling

## Tool Components

Every tool consists of four key components that configure how AI uses APIs:

### Description
Instructions telling AI when to use the tool and what it accomplishes. Be specific about triggers and business outcomes.

> **Example:** "Use when booking outdoor appointments to check weather conditions for safety."

### Method & URL
The specific API endpoint (web address) and HTTP method that tells the API what action to perform.

| Method | Standard purpose | Example use case |
|--------|----------------|------------------|
| **GET** | Retrieve resources | Looking up customer information |
| **POST** | Create new resources | Creating a new customer |
| **PUT/PATCH** | Update existing resources | Updating customer information |
| **DELETE** | Remove resources | Deleting a customer |

:::info
The method and URL you use are determined by the API creator. While knowing the common methods and their purposes will help you understand how to set-up a tool and confirm it's accurately configured, you will need to refer to the API documentation for the specific method and URL to use.
:::

### Headers
Headers provide essential metadata for API requests, including authentication and content type information. They're sent with every API call and ensure secure, properly formatted communication.

**Common headers include:**
- `Authorization: Bearer YOUR_API_KEY` - Proves your identity and permissions
- `Content-Type: application/json` - Specifies the data format being sent

### Parameters
Parameters define the specific data sent to the API. Each parameter needs a clear description defining how AI should fill it based on the conversation context.

#### Location (where the value is sent)

| Location | What it means | Typical use | Example |
|----------|----------------|-------------|---------|
| **Body** | Included in the request payload | Most POST/PUT/PATCH requests | JSON body like `{ "email": "user@example.com" }` |
| **Query** | Appended to the URL as a query string | Filtering, paging, searching | `/contacts?limit=25&sort=createdAt` |

Choose the location that matches the API’s documentation. If unsure, POST/PUT data usually goes in the Body; GET filters commonly use Query.

#### Type (the shape of the value)

| Type | What the API expects | Example value | Notes |
|------|----------------------|---------------|-------|
| **String** | Text | `"gafdads1!"` |
| **Number** | Decimal/float | `12.5` | For prices, measurements |
| **Integer** | Whole number | `42` | For counts, IDs when numeric |
| **Boolean** | True/false | `true` | Feature flags, toggles |
| **Enum** | One of allowed strings | `"open"` | Define the allowed options |
| **Object** | Key/value structure | `{ "id": "123", "name": "Acme" }` | Add fields below the parameter |
| **Array** | Ordered list | `["a", "b"]` or `[{...},{...}]` | Choose the item type (String, Object, etc.) |

For Objects and Arrays, you’ll be prompted to define the inner structure so AI can fill each field correctly.

#### Who sets the value?

- **Set by AI**: The AI fills the value dynamically based on your description and the conversation. Use this for values that come from the user or context (e.g., appointment date, email, address).
- **Fixed value (toggle off Set by AI)**: You provide a constant in the `Value` box. Use this for API-required constants, feature switches, or default modes.
- **Required**: If checked, the tool won’t run until AI has a value (or a fixed value is provided). Use this for parameters the API requires.

#### Writing effective descriptions

Give AI clear guidance for dynamic values. A useful pattern:

```
Purpose: what the API uses this for
Source: where AI should get it (user message, account profile, default)
Rules: validation/range/format and fallbacks
```

Examples:

```
Parameter: latitude (Query, Number)
Description: Infer from appointment location; if city provided, geocode; else ask user to confirm.

Parameter: hourly (Query, String, Fixed)
Value: temperature_2m,precipitation
Description: Always include weather and precipitation series.
```

#### Arrays and Objects

When `Type = Array`:
- Choose the array item type (e.g., Object).
- If items are Objects, add fields for each property (e.g., `id` as String, `quantity` as Integer). Each field can be Set by AI or fixed.

When `Type = Object`:
- Add fields such as `firstName` (String), `lastName` (String), `newsletterOptIn` (Boolean).
- Mark critical fields as Required to force AI to obtain them before calling the API.

Example Body with an array of objects:

```json
{
  "operations": [
    { "type": "create", "id": "123", "note": "from web chat" },
    { "type": "update", "id": "124" }
  ]
}
```

Configure this by creating a Body parameter `operations` with `Type = Array`, `array item = Object`, then add fields `type` (Enum: create|update), `id` (String, Required), and `note` (String, optional).

#### Enums (restricting choices)

Use `Type = Enum` when the API accepts only specific strings. Define the allowed options so AI will pick one safely.

| Parameter | Allowed values | Guidance |
|-----------|----------------|----------|
| `status` | `open`, `closed`, `pending` | Choose based on user request; default `open` if unclear. |

This reduces errors and keeps requests aligned with API expectations.

## Building Custom Tools

### Prerequisites
- Access to external system API documentation
- Valid API credentials
- Understanding of business process to automate

### When to Build Custom Tools
Create custom tools when AI Employees need to:
- Check real-time inventory or product availability
- Schedule appointments in external calendars
- Look up order status from e-commerce platforms
- Access customer account information

### Step-by-Step Process

1. **Find API Documentation**
   - Locate official API docs for target service
   - Identify required endpoints and authentication
   - Note available parameters and data formats

2. **Access Tool Configuration**
   - Navigate to AI Workforce > Configure
   - Add capability > Custom Capabilities
   - Select "Add Tool"

3. **Use cURL Import**
   - Copy API endpoint as cURL command
   - Ask AI assistant to convert if needed
   - Paste into "Import from cURL" field
   - Auto-fills method, URL, and parameters

4. **Configure Tool Details**
   - **ID**: Unique descriptive name (no spaces)
   - **Description**: When to use and what it accomplishes
   - **Parameters**: Add descriptions for dynamic/static filling

5. **Work with AI Assistance**
   - Use AI to understand complex API docs
   - Generate parameter descriptions
   - Test configurations before deployment

6. **Test and Iterate**
   - Test with different conversation scenarios
   - Use fresh browser sessions to avoid context carryover
   - Review AI explanations for API call details
   - Refine based on testing results

7. **Deploy and Monitor**
   - Enable for live interactions
   - Monitor performance and error patterns
   - Iterate based on real-world usage

### Best Practices

**Start Simple**
- Use static parameters first for reliability
- Add dynamic parameters gradually
- Test thoroughly at each step

**Strategic AI Use**
- Leverage AI for documentation analysis
- Use AI for parameter description generation
- Don't outsource business logic decisions

**Documentation**
- Keep notes on API choices and challenges
- Document successful parameter descriptions
- Track testing approaches that reveal issues

### Troubleshooting

**Tool Never Triggers**
- Check description specificity
- Ensure capability is enabled
- Verify AI can access required context

**API Authentication Fails**
- Confirm API key validity
- Check header format requirements
- Test API directly with tools like Postman

**Wrong Data Sent**
- Review parameter descriptions for clarity
- Provide specific value options for AI
- Test with known working values first

## Next Steps

- **[Creating Custom Capabilities](./creating-custom-capabilities)** - Complete capability configuration
- **[Configuring Capabilities](./configuring-capabilities)** - Work with built-in tools
- **[AI Workforce Overview](../ai-workforce/)** - See tools in the bigger picture

## Additional Resources

- **API Testing Tools:** Postman, Insomnia for independent API testing
- **AI Assistants:** ChatGPT, Claude for documentation help
- **Community Resources:** Stack Overflow for API troubleshooting
