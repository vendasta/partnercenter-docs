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

Choose the location that matches the API's documentation. If unsure, POST/PUT data usually goes in the Body; GET filters commonly use Query.

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

For Objects and Arrays, you'll be prompted to define the inner structure so AI can fill each field correctly.

#### Who sets the value?

- **Set by AI**: The AI fills the value dynamically based on your description and the conversation. Use this for values that come from the user or context (e.g., appointment date, email, address).
- **Fixed value (toggle off Set by AI)**: You provide a constant in the `Value` box. Use this for API-required constants, feature switches, or default modes.
- **Required**: If checked, the tool won't run until AI has a value (or a fixed value is provided). Use this for parameters the API requires.

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

## When to Build Custom Tools

Create custom tools when AI Employees need to:
- Check real-time inventory or product availability
- Schedule appointments in external calendars
- Look up order status from e-commerce platforms
- Access customer account information
- Integrate with specialized business systems
- Automate workflows specific to your industry

:::tip Ready to Build?
Now that you understand what tools are and how they work, follow our step-by-step tutorial to build your first custom tool: [Building Custom Tools](./building-custom-tools)
:::

