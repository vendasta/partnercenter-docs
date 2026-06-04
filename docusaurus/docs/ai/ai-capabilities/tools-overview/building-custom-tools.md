---
title: Building Custom Tools
sidebar_label: "Tutorial: Building Custom Tools"
sidebar_position: 2
description: Step-by-step guide for building custom tools using API documentation, including best practices and troubleshooting tips
---

import { AISparkleIcon } from '@site/src/components/Icons';

This comprehensive guide walks you through the complete process of building custom tools for your AI Employees. You'll learn how to find API documentation, use the cURL import feature, work with AI assistants, and test your tools effectively.

:::info Before You Start
If you're new to AI employees and capabilities, start with the [AI Overview](../../../ai/) to understand the broader concepts before diving into this tutorial.
:::

## Prerequisites

Before you begin, ensure you have:
- Access to the external system's API documentation
- Valid API credentials or authentication tokens
- A clear understanding of the business process you want to automate
- Basic familiarity with API concepts (URLs, methods, parameters)

## Overview of the Process

Building a custom tool involves these key steps:

1. **Pre-Building**: Finding and understanding API documentation
2. **Using Key Principles**: Following best practices for tool building
3. **Importing with cURL**: Using the cURL import feature to speed up setup
4. **Working with AI**: Leveraging AI assistants to fill out tool details
5. **Testing**: Verifying your tool works correctly
6. **Troubleshooting**: Resolving common issues

Let's walk through each step in detail.

## Step 1: Pre-Building - Finding and Understanding API Documentation

Before you start building your tool, you need to locate and understand the API documentation for the service you want to integrate.

### How to Locate API Documentation

Most services provide API documentation in one of these locations:

- **Developer Portal**: Look for a "Developer" or "API" section on the service's website
- **Documentation Hub**: Many services have dedicated documentation sites (e.g., `developers.service.com`)
- **API Reference**: Check the main website footer or navigation for "API" or "Developers" links
- **GitHub**: Some services host their API docs on GitHub repositories

:::tip
If you can't find the API documentation, search for "[Service Name] API documentation" or "[Service Name] developer docs" in your search engine.
:::

### Reading API documentation effectively

API documentation can be overwhelming, but focusing on these key sections will help:

**1. Authentication Section**
- How to obtain API keys or tokens
- Where to include authentication (headers, query parameters, etc.)
- Token expiration and renewal processes

**2. Endpoints/Resources**
- List of available API endpoints
- HTTP methods (GET, POST, PUT, DELETE) for each endpoint
- Base URL and endpoint paths

**3. Request Examples**
- Sample requests showing required parameters
- Example cURL commands
- Request body formats (JSON, XML, etc.)

**4. Response Examples**
- What successful responses look like
- Error response formats
- Status codes and their meanings

### Identifying the Right Endpoints for Your Needs

When reviewing API documentation, ask yourself:

- **What action do I need to perform?** (Create, Read, Update, Delete)
- **What data do I need to send?** (Customer info, order details, etc.)
- **What data do I need back?** (Confirmation, status, details, etc.)

Match your needs to the appropriate endpoint:

| Your Need | Look For |
|-----------|----------|
| Look up customer information | GET endpoint with customer ID |
| Create a new order | POST endpoint for orders |
| Check order status | GET endpoint that returns order details |
| Update appointment time | PUT/PATCH endpoint for appointments |

### Understanding authentication requirements

Most APIs require authentication. Common methods include:

**API Key Authentication**
- Usually sent as a header: `Authorization: Bearer YOUR_API_KEY`
- Or as a query parameter: `?api_key=YOUR_API_KEY`

**OAuth 2.0**
- Requires obtaining an access token first
- Token is then sent in headers: `Authorization: Bearer ACCESS_TOKEN`

**Basic Authentication**
- Username and password encoded in header
- Format: `Authorization: Basic base64(username:password)`

**Example Authentication Setup:**
```bash
# API Key in header
curl -X GET "https://api.example.com/customers" \
  -H "Authorization: Bearer YOUR_API_KEY"

# API Key in query parameter
curl -X GET "https://api.example.com/customers?api_key=YOUR_API_KEY"
```

:::warning
Always keep your API keys secure. Never share them in screenshots. Use environment variables or secure credential storage.
:::

### Tips for Navigating Common API Documentation Formats

Different services organize their documentation differently:

**REST API Documentation**
- Usually organized by resource (Users, Orders, Products)
- Endpoints grouped under each resource
- Clear separation between request and response formats

**OpenAPI/Swagger Documentation**
- Interactive documentation with "Try it out" features
- Often includes automatically generated cURL commands
- Can export examples directly

**GraphQL Documentation**
- Focuses on queries and mutations
- Uses a schema explorer to understand available fields
- Different structure than REST APIs

## Step 2: Key Principles for Building Tools

Following these principles will help you build reliable, effective tools:

### Leverage AI assistants to help

AI assistants like ChatGPT, Claude, or even Vendasta's AI Support:

- **Understand complex API documentation**
  - Ask: "Explain this API endpoint in simple terms"
  - Get clarification on authentication methods
  - Understand parameter requirements

- **Generate parameter descriptions**
  - Provide context about your use case
  - Ask for specific, actionable descriptions
  - Get examples of good parameter descriptions

- **Convert API examples to cURL**
  - Paste API documentation examples
  - Ask AI to convert to cURL format
  - Get help with authentication headers

**Example AI prompts:**
```
"I'm building a tool to check inventory. The API endpoint is 
GET /api/v1/products/{productId}/inventory. Help me write a 
clear description for the productId parameter that tells the AI 
how to extract it from customer messages."
```

### Use cURL Import Feature in Vendasta

The cURL import feature automatically fills in:
- HTTP method (GET, POST, etc.)
- API endpoint URL
- Headers (including authentication)
- Query parameters
- Request body structure

This saves time and reduces errors. We'll cover this in detail in the next section.

### Manually review and write descriptions (the most important part)

While cURL import handles the technical setup, **parameter descriptions are critical** for AI to use your tool correctly.

**What gets auto-filled:**
- Parameter names
- Parameter types (String, Number, etc.)
- Parameter locations (Query, Body, Path)

**What you must do manually:**
- Write clear descriptions for each parameter
- Specify where AI should get the value (user message, conversation context, etc.)
- Add validation rules and format requirements
- Define what to do if information is missing

**Example of a good parameter description:**
```
Parameter: order_number
Description: The order number from the customer's message. 
Order numbers are typically 8-10 digits and may include letters. 
```

**Example of a parameter description that could be improved:**
```
Parameter: order_number
Description: The order number
```

The first description tells AI exactly what the parameter is; the second doesn't provide enough guidance.

## Step 3: Using the cURL Import Feature

The cURL import feature is one of the fastest ways to set up a new tool. It automatically extracts API configuration from a cURL command.

### What is a cURL Command?

cURL (Client URL) is a command-line tool for making HTTP requests. It's commonly used to test APIs and is often provided in API documentation as example code.

**Example cURL command:**
```bash
curl -X POST "https://api.example.com/orders" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "12345",
    "quantity": 2,
    "customer_email": "customer@example.com"
  }'
```

This command:
- Makes a POST request to the orders endpoint
- Includes an authorization header
- Sends JSON data in the request body

### How to Get a cURL from an API URL Using AI

If API documentation doesn't provide cURL examples, you can ask AI to generate one:

**Step 1:** Provide the API documentation details:
```
"I need a cURL command for this API endpoint:
- Method: POST
- URL: https://api.example.com/appointments
- Headers: Authorization: Bearer TOKEN, Content-Type: application/json
- Body: { "date": "2024-01-15", "time": "14:00", "customer_id": "123" }"
```

**Step 2:** AI will generate a cURL command:
```bash
curl -X POST "https://api.example.com/appointments" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "time": "14:00",
    "customer_id": "123"
  }'
```

**Step 3:** Copy the generated cURL and use it in Vendasta's import feature.

### Step-by-Step: Importing a cURL into Vendasta

**1. Access Tool Configuration**
   - Navigate to <AISparkleIcon /> **AI** → **AI Workforce** in your Business App dashboard
   - Select the AI Employee you want to enhance
   - Click **Configure** → **Capabilities** tab
   - Scroll to **Custom Capabilities** section
   - Click **Add a capability**

**2. Add a Tool**
   - Click **Add Tool** within your capability
   - Select **Import from cURL**

**3. Paste Your cURL Command**
   - Copy the cURL command from API documentation or AI-generated example
   - Paste it into the "Import from cURL" field
   - Replace placeholder values (like `YOUR_API_KEY`) with actual values or variables

**4. Review Auto-Filled Fields**
   - The system automatically extracts:
     - HTTP Method (GET, POST, etc.)
     - URL/Endpoint
     - Headers
     - Query parameters
     - Body parameters and structure

**5. Complete Manual Configuration**
   - Fill in the **ID** field (unique name, no spaces)
   - Write a clear **Description** of when to use this tool
   - Review and enhance parameter descriptions (critical step!)

### What gets auto-filled and what needs manual work

**Auto-Filled (from cURL import):**
- ✅ HTTP Method
- ✅ URL/Endpoint
- ✅ Headers (including authentication if included)
- ✅ Parameter names
- ✅ Parameter types (String, Number, Object, etc.)
- ✅ Parameter locations (Query, Body, Path)

**Requires Manual Work:**
- ⚠️ **Tool ID**: Choose a descriptive name (no spaces)
- ⚠️ **Tool Description**: Explain when AI should use this tool
- ⚠️ **Parameter Descriptions**: Critical! Tell AI how to fill each parameter
- ⚠️ **Required Fields**: Mark parameters as required if the API needs them
- ⚠️ **Fixed Values**: Set static values for parameters that don't change
- ⚠️ **Enum Values**: Define allowed options for Enum-type parameters

**Example of what needs manual work:**
```
Auto-filled parameter:
- Name: product_id
- Type: String
- Location: Query

Manual enhancement needed:
- Description: "Extract the product ID from the customer's message. 
  Product IDs are typically 5-6 digit numbers. If the customer mentions 
  a product name instead, ask for clarification or look up the product 
  ID from your knowledge base."
- Required: ✓ (check this box)
```

### Common issues and how to resolve them

**Issue: cURL import fails or shows errors**

**Solutions:**
- Verify the cURL command is complete and properly formatted
- Check that all quotes are properly closed
- Ensure escape characters are correct (`\'` for single quotes in JSON)
- Try generating a fresh cURL using AI or API testing tools

**Issue: Headers not imported correctly**

**Solutions:**
- Manually add missing headers after import
- Verify header format matches API requirements
- Check for typos in header names

**Issue: Body parameters not structured correctly**

**Solutions:**
- Review the JSON structure in the cURL command
- Manually adjust nested objects or arrays if needed
- Verify parameter types match API expectations

## Step 4: Working with AI to Fill Out Tools

AI assistants can significantly speed up tool creation by helping you write effective parameter descriptions and understand complex API requirements.

### Using screenshots as context for AI

Screenshots are powerful tools for getting AI assistance:

**1. Capture API Documentation Screenshots**
   - Take screenshots of endpoint documentation
   - Include parameter tables and examples
   - Capture authentication setup instructions

**2. Provide Context to AI**
   - Upload screenshots along with your questions
   - Explain what you're trying to build
   - Ask specific questions about the documentation

**Example prompt with screenshot:**
```
"I'm building a tool to check inventory. Here's the API documentation 
for the endpoint. Help me write parameter descriptions that tell the 
AI how to extract product IDs from customer messages and handle cases 
where the product isn't found."
[Attach screenshot of API documentation]
```

### Asking AI to help write parameter descriptions

Good parameter descriptions are critical for AI to use your tool correctly. AI can help you write effective descriptions.

**Provide context:**
- What the parameter represents
- Where the value comes from (user message, conversation context)
- Format requirements (e.g., "8-10 digit number")
- What to do if the value is missing

**Example prompt:**
```
"Help me write a parameter description for 'appointment_date'. 
The AI needs to extract dates from customer messages like 'next Tuesday' 
or 'January 15th'. If the customer doesn't provide a date, the AI should 
ask for clarification. Dates should be formatted as YYYY-MM-DD."
```

**AI-generated description:**
```
Extract the appointment date from the customer's message. The date can be 
expressed in various formats (e.g., "next Tuesday", "January 15th", "2024-01-15"). 
Convert relative dates (like "next Tuesday") to specific dates. If the customer 
doesn't provide a date, ask: "What date would work best for you?" Format the 
final date as YYYY-MM-DD before sending to the API.
```

### Iterative refinement of descriptions

Don't expect perfect descriptions on the first try. Refine them based on:

**1. Testing Results**
   - Review how AI uses the tool in conversations
   - Check the Explanation feature to see parameter values
   - Identify where descriptions need more clarity

**2. Edge Cases**
   - Ask AI to suggest edge cases you might have missed
   - Update descriptions to handle unusual scenarios
   - Add fallback instructions for missing information

**3. Real-World Usage**
   - Monitor actual customer conversations
   - Note when the tool doesn't trigger correctly
   - Refine descriptions based on common misunderstandings

**Example refinement process:**
```
Initial description:
"Get the customer's email address."

After testing, refined description:
"Extract the customer's email address from their message. Email addresses 
must be in a valid format (user@domain.com). If the customer doesn't 
provide an email, ask: 'Could you share your email address so we can send 
you a confirmation?'"
```

### Ensuring AI includes specific variable options (not generic guidance)

AI assistants sometimes provide generic advice. Push for specific, actionable descriptions.

**Generic (not helpful):**
```
"Get the product ID from the user."
```

**Specific (helpful):**
```
"Extract the product ID from the customer's message. Product IDs are 5-6 
digit numbers that start with 'PRD'. If the customer mentions a product 
name (e.g., 'Blue Widget'), first ask: 'Which product are you interested 
in?' and provide options, or look up the product ID from your knowledge 
base. Never guess product IDs."
```

**Tips for getting specific descriptions:**
- Provide examples of customer messages
- Specify exact formats and validation rules
- Include instructions for missing information
- Mention edge cases and how to handle them

### Best practices for AI-assisted Tool creation

**1. Start with Clear Context**
   - Explain your business use case
   - Provide relevant API documentation
   - Share examples of customer interactions

**2. Ask Specific Questions**
   - "How should AI extract the order number?"
   - "What should AI do if the date is missing?"
   - "What format should phone numbers use?"

**3. Review and Customize AI Suggestions**
   - Don't use AI-generated descriptions verbatim
   - Adapt them to your specific needs
   - Add business-specific context

**4. Test and Iterate**
   - Use AI suggestions as starting points
   - Test with real conversations
   - Refine based on results

## Step 5: Testing Your Tools

Thorough testing ensures your tools work correctly and provide a good customer experience.

### How to Test Tools in Conversations

**1. Start a Test Conversation**
   - Navigate to your AI Employee's chat interface
   - Use a fresh browser session (incognito mode) to avoid context carryover
   - Try different phrasings that should trigger your tool

**2. Test Various Scenarios**
   - **Happy path**: Customer provides all required information
   - **Missing information**: Customer doesn't provide required parameters
   - **Wrong format**: Customer provides information in unexpected format
   - **Edge cases**: Unusual requests or error conditions

**Example test scenarios:**
```
Test 1: "Check the status of order 12345"
Expected: Tool triggers, retrieves order status

Test 2: "What's my order status?"
Expected: AI asks for order number before using tool

Test 3: "Check order abc123xyz"
Expected: AI handles invalid order number format gracefully
```

### Verifying correct parameter filling

**1. Use the Explanation Feature**
   - In Conversations, click **Explanation** under a message
   - Review the AI's reasoning for using the tool
   - Check the actual parameter values sent to the API

**2. Verify Parameter Values**
   - Check that parameters are extracted correctly from customer messages
   - Ensure data types match API requirements
   - Verify required parameters are present

**3. Compare with API Expectations**
   - Review the actual API call parameters
   - Compare with API documentation requirements
   - Ensure headers and authentication are correct

### Debugging common issues

**Issue: Tool doesn't trigger**

**Debugging steps:**
1. Check the tool description - is it specific enough?
2. Verify the capability is enabled for your AI Employee
3. Review the Explanation to see if AI considered the tool
4. Test with different phrasings

**Issue: Wrong parameter values**

**Debugging steps:**
1. Review parameter descriptions for clarity
2. Check the Explanation to see how AI extracted values
3. Test with known values to isolate the issue
4. Refine parameter descriptions based on findings

**Issue: API call fails**

**Debugging steps:**
1. Review the Explanation to see the exact API call
2. Test the API call independently (Postman, cURL)
3. Verify authentication headers are correct
4. Check for API rate limits or errors

### Iteration and Improvement

**1. Document Issues**
   - Keep notes on what doesn't work
   - Record customer messages that cause problems
   - Note API errors and their causes

**2. Make Incremental Changes**
   - Change one thing at a time
   - Test each change before making another
   - Revert changes that don't help

**3. Monitor Real Usage**
   - Review conversations where the tool was used
   - Look for patterns in failures
   - Identify common misunderstandings

**4. Continuous Refinement**
   - Update parameter descriptions based on real usage
   - Adjust tool descriptions to improve triggering
   - Refine error handling based on customer feedback

## Step 6: Troubleshooting

Even with careful planning, you may encounter issues. Here's how to resolve common problems.

### Common issues and solutions

#### Tool never triggers

**Symptoms:**
- AI doesn't use the tool when it should
- Customer requests go unhandled

**Possible Causes & Solutions:**

**1. Description too vague**
   - **Solution:** Make the tool description more specific about when to use it
   - **Example:** Instead of "Check orders", use "ONLY use this tool when the customer asks about order status, tracking, or delivery confirmation"

**2. Capability not enabled**
   - **Solution:** Verify the capability is assigned to your AI Employee
   - Check: AI Workforce → Configure → Capabilities tab

**3. Conflicting capabilities**
   - **Solution:** Review other capabilities that might be handling the same request
   - Refine trigger conditions to be more specific

**4. Missing context**
   - **Solution:** Ensure required information is available in the conversation
   - Check if the AI has access to necessary data

#### API Authentication Fails

**Symptoms:**
- API returns 401 (Unauthorized) or 403 (Forbidden) errors
- Tool calls fail with authentication errors

**Possible Causes & Solutions:**

**1. Invalid API key**
   - **Solution:** Verify your API key is correct and active
   - Check if the key has expired or been revoked
   - Generate a new key if needed

**2. Wrong header format**
   - **Solution:** Verify the authentication header format matches API requirements
   - Common formats:
     - `Authorization: Bearer YOUR_TOKEN`
     - `Authorization: Basic base64(username:password)`
     - `X-API-Key: YOUR_API_KEY`

**3. Missing authentication**
   - **Solution:** Ensure authentication headers are included in the tool configuration
   - Check that headers are set as fixed values, not dynamic

**4. API key in wrong location**
   - **Solution:** Verify whether the API expects the key in:
     - Headers (most common)
     - Query parameters (`?api_key=...`)
     - Request body

#### Parameter mapping issues

**Symptoms:**
- Wrong values sent to API
- Parameters missing or incorrect
- API returns errors about invalid parameters

**Possible Causes & Solutions:**

**1. Unclear parameter descriptions**
   - **Solution:** Write more specific descriptions
   - Include format requirements and examples
   - Specify where to get the value from

**2. Parameter type mismatch**
   - **Solution:** Verify parameter types match API requirements
   - Check if API expects String vs Number
   - Ensure arrays/objects are structured correctly

**3. Missing required parameters**
   - **Solution:** Mark required parameters in tool configuration
   - Update descriptions to ensure AI collects required information
   - Add validation in parameter descriptions

**4. Wrong parameter location**
   - **Solution:** Verify parameters are in the correct location:
     - Query parameters for GET requests
     - Body parameters for POST/PUT requests
     - Path parameters in URL

#### Tool triggers incorrectly

**Symptoms:**
- Tool activates when it shouldn't
- False positives in customer conversations

**Possible Causes & Solutions:**

**1. Description too broad**
   - **Solution:** Add more specific trigger conditions
   - Use "ONLY" and "NOT" language to set boundaries
   - **Example:** "ONLY use when customer asks about order status. Do NOT use for product questions or general inquiries."

**2. Overlapping capabilities**
   - **Solution:** Review and refine capability descriptions
   - Make trigger conditions more distinct
   - Prioritize which capability should handle specific requests

### Getting help and resources

**1. Review Documentation**
   - Check this guide and related documentation
   - Review API documentation for the service you're integrating
   - Consult [Tools Overview](./index.md) for conceptual understanding

**2. Use AI Assistants**
   - Ask AI to help debug specific issues
   - Share error messages and API responses
   - Get suggestions for parameter descriptions

**3. Test Independently**
   - Use Postman or Insomnia to test API calls directly
   - Verify API works outside of Vendasta
   - Isolate whether issues are with the tool or the API

**4. Check Explanation Feature**
   - Review AI's reasoning for tool usage
   - Examine actual API calls and responses
   - Identify patterns in failures

**5. Community Resources**
   - Stack Overflow for API-specific questions
   - Service-specific developer forums
   - Vendasta support channels

## Best practices summary

Follow these principles throughout the tool-building process:

**1. Always use source documentation**
   - Don't guess API endpoints or parameters
   - Refer to official API documentation
   - Verify requirements before building

**2. Write clear, specific descriptions**
   - Parameter descriptions are the most important part
   - Tell AI exactly what to do, not just what the parameter is
   - Include format requirements and fallback instructions

**3. Test thoroughly**
   - Test with various phrasings and scenarios
   - Use fresh browser sessions to avoid context issues
   - Review explanations to understand AI behavior

**4. Iterate based on real usage**
   - Monitor actual customer conversations
   - Refine descriptions based on failures
   - Make incremental improvements

**5. Leverage AI assistance strategically**
   - Use AI to understand complex documentation
   - Get help writing parameter descriptions
   - Don't outsource business logic decisions

## Frequently asked questions (FAQs)

<details>
<summary>Do I need to be a developer to build custom tools?</summary>

No, you don't need to be a developer. While basic familiarity with API concepts helps, the cURL import feature and AI assistants make it possible to build tools without deep technical knowledge. The most important skill is writing clear parameter descriptions that tell the AI how to use the tool.

</details>

<details>
<summary>What if I can't find API documentation for the service I want to integrate?</summary>

If you can't find official API documentation, try:
- Searching for "[Service Name] API documentation" or "[Service Name] developer docs"
- Contacting the service's support team for API access
- Checking if they have a developer portal or community forum

If no API exists, you may need to use a different integration method or contact the service provider.

</details>

<details>
<summary>Can I use the same tool for multiple capabilities?</summary>

Yes, you can use the same tool across multiple capabilities. However, each capability should have its own prompt that defines when and how to use the tool in that specific context. This allows the same API endpoint to serve different business purposes.

</details>

<details>
<summary>What happens if my API key expires or changes?</summary>

If your API key expires or changes, you'll need to update the authentication header in your tool configuration. Go to the tool settings, find the Authorization header, and update it with the new key. The tool will then work with the new credentials.

</details>

<details>
<summary>How do I know if my parameter descriptions are good enough?</summary>

Test your tool with various customer phrasings. If the AI:
- Correctly extracts parameters from customer messages
- Asks for missing required information
- Uses the tool when appropriate
- Handles edge cases gracefully

Then your descriptions are working well. Review the Explanation feature to see how the AI interprets your descriptions.

</details>

<details>
<summary>Can I build tools that use multiple API endpoints?</summary>

Yes, you can add multiple tools to a single capability. Each tool can call a different API endpoint. The AI will use the appropriate tool based on the customer's request and the tool descriptions you've written.

</details>

<details>
<summary>What should I do if the cURL import doesn't work?</summary>

If cURL import fails:
- Verify the cURL command is complete and properly formatted
- Check that all quotes are properly closed
- Try generating a fresh cURL using AI or API testing tools like Postman
- Manually configure the tool if import continues to fail

The manual configuration option gives you full control over all tool settings.

</details>

<details>
<summary>How often should I test and refine my tools?</summary>

Test immediately after creating a tool, then monitor real usage. Refine tools based on:
- Failed API calls or errors
- Customer confusion or repeated questions
- Tools not triggering when they should (or triggering incorrectly)
- Changes in the API or service you're integrating

Regular monitoring helps catch issues before they impact too many customer interactions.

</details>

<details>
<summary>Can I share tools I've built with other AI Employees?</summary>

Yes, custom capabilities (including their tools) can be assigned to multiple AI Employees. This allows you to reuse successful tool configurations across different AI Employees without rebuilding them.

</details>

<details>
<summary>What's the difference between a tool and a capability?</summary>

A **tool** is the technical API implementation (the "how") - it defines the API endpoint, authentication, and parameters. A **capability** is the business logic (the "when" and "why") - it includes the prompt that tells the AI when to use the tool and how to handle responses. You need both: tools for the API connection, and capabilities for the AI behavior.

</details>
