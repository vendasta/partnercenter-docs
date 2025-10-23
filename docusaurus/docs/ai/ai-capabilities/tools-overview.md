---
title: AI Tools
sidebar_label: AI Tools Overview
---

Tools enable your AI Employees to interact with external systems, retrieve real-time information, and automate workflows across different platforms. Understanding how tools work is essential for building powerful AI capabilities that go beyond simple conversation.

## What Are Tools?

A **tool** is a function or API that your AI Employee can use during conversations. Tools act as bridges between your AI and other software systems, allowing the AI to:

- Retrieve external information (like weather data, inventory levels, or account details)
- Create, update, or delete records in your business systems
- Automate actions across multiple platforms
- Access real-time data to make informed decisions

Tools can accept both **static inputs** (values you configure once) and **dynamic inputs** (values the AI determines based on conversation context).

### Tools in Action: A Real Example

Consider an AI receptionist for a handyman service. When a customer asks to book gutter cleaning "anytime this week," the AI can:

1. Use a weather API tool to check the forecast
2. Determine if outdoor work conditions are suitable
3. Respond with an appropriate booking recommendation

This natural interaction would be impossible without tools; the AI needs real-time weather data that doesn't exist in its training or knowledge base.

## Understanding APIs

To work with tools effectively, it's helpful to understand what an API is and how it works.

### What Is an API?

An **API** (Application Programming Interface) is like a messenger that lets programs share information and actions. APIs are built and provided by software companies to let you interact with their systems programmatically.

Think of an API as a way for one piece of software to talk to another piece of software, just like how you might use a phone to call someone—the phone is the tool that connects you.

### CRUD Operations

Most APIs support four basic types of operations, commonly called **CRUD**:

| Operation | Description | Example |
|-----------|-------------|---------|
| **Create** | Adding new data | Add a new contact to your CRM |
| **Read/Retrieve** | Getting data | Look up a customer's order history |
| **Update** | Editing existing data | Change an appointment time |
| **Delete** | Removing data | Remove a canceled subscription |

When you build tools for your AI Employees, you'll configure them to perform these operations based on what your AI needs to accomplish.

## The Relationship Between Tools and APIs

While APIs provide the underlying functionality, **tools** provide the instructions that tell your AI Employee how to use those APIs.

### What a Tool Contains

A complete tool configuration includes:

**1. Description**
- Explains what the tool does and when to use it
- Helps the AI understand which tool to select for different situations
- Example: "Use this tool when booking appointments outdoors to check if weather conditions are suitable for the work"

**2. API Endpoint (Method & URL)**
- The specific API location your tool will call
- Provided by the software you're integrating with
- Example: `GET https://api.open-meteo.com/v1/forecast`

**3. Authentication/Headers**
- Security information that proves you have permission to use the API
- Often includes API keys or authentication tokens
- Keeps your integrations secure and tied to your specific account

**4. Parameters**
- The specific details that tell the API exactly what to do
- Can be static (always the same) or dynamic (determined by the AI based on context)
- Where most of the "magic" happens in tool configuration

### Static vs. Dynamic Parameters

**Static Parameters:**
- Always contain the same value
- Useful when you want consistent, predictable behavior
- *Example:* Always retrieve temperature and precipitation data from a weather API

**Dynamic Parameters:**
- The AI determines the value based on conversation context
- Provides flexibility and natural interactions
- *Example:* Use the customer's address to determine which latitude/longitude to check weather for

## Use Cases for Tools

Tools unlock powerful capabilities for your AI Employees:

### Retrieving External Context

**Example:** A weather API that helps determine if outdoor work is feasible

- The AI doesn't "know" tomorrow's weather
- The tool fetches real-time forecast data
- The AI uses this data to make booking recommendations

### Automating Workflows

**Example:** Creating a lead in your CRM after capturing contact information

- Customer provides their details in chat
- AI uses a CRM API tool to create the lead record
- Follow-up workflows trigger automatically in your business systems

### Real-Time Data Lookup

**Example:** Checking inventory before confirming product availability

- Customer asks if an item is in stock
- AI queries your inventory system via API
- Provides accurate, up-to-date information instantly

### Enhancing Decision-Making

**Example:** Checking appointment availability before booking

- Customer requests a specific time
- AI checks your calendar system via API
- Only offers times that are actually available

## How AI Employees Use Tools

Your AI Employee evaluates the conversation context and decides when to use tools:

1. **Identifies the need** - Recognizes when information or action requires external data
2. **Selects the right tool** - Chooses from available tools based on descriptions
3. **Gathers required information** - Ensures it has all necessary details before calling the tool
4. **Calls the API** - Executes the tool with appropriate parameters
5. **Processes the response** - Interprets the API result and incorporates it into the conversation
6. **Responds naturally** - Answers the customer using the retrieved information

### Example Flow: Weather-Checking Tool

```
Customer: "Can we schedule the gutter cleaning for tomorrow?"

AI thinks: I need to check if tomorrow's weather is suitable for outdoor work
         ↓
AI identifies: The appointment address is in Saskatoon
         ↓
AI calls tool: get_weather_forecast(latitude: 52.13, longitude: -106.67)
         ↓
API returns: Temperature: 15°C, Precipitation: 0mm, Wind: 12km/h
         ↓
AI responds: "The forecast looks clear tomorrow with no rain expected. 
              Outdoor gutter cleaning should be no problem. What time works best?"
```

## Building Effective Tools

When creating custom tools for your AI Employees, follow these guidelines:

### Start with Clear Requirements

- Identify which CRUD operations you need
- Understand what information the AI needs to gather before using the tool
- Define when the tool should and shouldn't be used

### Use Source Documentation

- Refer to the official API documentation for the system you're integrating
- Follow their specifications for endpoints, parameters, and authentication
- Keep documentation handy for troubleshooting

### Write Clear Tool Descriptions

- Be specific about when the AI should use this tool
- Explain what the tool accomplishes
- Include any important conditions or constraints

### Test Thoroughly

- Verify the tool works with various inputs
- Check edge cases (missing data, API errors, unexpected responses)
- Monitor real conversations to see how the tool performs

:::tip Best Practice
The tool description is the most important part you shouldn't outsource to AI assistants. While AI can help you format parameters or understand API documentation, you need to clearly define when and how your AI Employee should use each tool based on your business logic.
:::

## Next Steps

Now that you understand the fundamentals of tools and integrations:

- **Learn to build custom capabilities:** [Creating Custom Capabilities](./creating-custom-capabilities) - Includes step-by-step tool creation
- **Explore capability configuration:** [Configuring Capabilities](./configuring-capabilities) - Work with built-in tools
- **Review AI Workforce setup:** [AI Workforce Overview](../ai-workforce/) - See how tools fit into the bigger picture


:::
