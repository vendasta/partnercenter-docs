---
title: AI Chat Receptionist Overview 
sidebar_position: 2
---

import { AISparkleIcon } from '@site/src/components/Icons';

The AI Chat Receptionist helps you capture leads and respond to website visitors 24/7. In this guide, you'll learn how to set up, train, and monitor your AI assistant to work for your business.

**By default, the AI Chat Receptionist:**
- Answers questions about your business using information from your knowledge base and website
- Collects visitor contact information (name, phone number, or email) so you can follow up with leads
- Detects and responds in over 40 languages, including English, French, and Spanish
- Lets visitors know when it doesn't have enough information, so a team member can follow up

### Why is the AI Chat Receptionist important?

The AI Chat Receptionist ensures that your business never misses an opportunity by engaging website visitors instantly, around the clock. By capturing leads and answering common questions 24/7, it turns casual browsers into qualified prospects, even when your team is offline.

The Chat Receptionist also reduces friction and drop-off by starting conversations with context-driven prompts instead of long forms, and it handles ambiguous or complex questions by understanding free-form requests and adapting in real time—no rigid menus. Natural, empathetic replies and personalized greetings help build trust with visitors.

As your business grows, the AI adapts to new offerings and workflows without needing extensive decision trees. It delivers timely, personalized responses that guide visitors through the sales funnel and can improve both customer satisfaction and conversion rates.

## Set up the AI Chat Receptionist

Follow these simple steps to configure your AI Chat Receptionist so it effectively engages visitors and captures valuable leads.

### Step 1: Configure Basic Settings for the AI Chat Receptionist

Go to <AISparkleIcon /> `AI > AI workforce` and then click `Configure` on the Chat receptionist.

- **Name and Image**  
Give your AI a friendly, professional name and photo. The AI Receptionist knows their name and the photo will help you distinguish between other AI Employees in your app.

- **Communication Channels**  
Your AI Chat Receptionist is assigned to the **Web Chat** channel by default. This channel is always active and cannot be disabled. You can also assign your AI Receptionist to the **SMS** channel to reach customers via text messaging.

:::note  
The Web Chat widget isn't automatically added to your website! You'll need to install the widget code or enable it within your site builder before your AI can start engaging visitors. When you are ready to install the widget, refer to [How to install the Conversations Web Chat Widget](/business-app/conversations/web-chat/)
:::

### Step 2: Configure Your AI Chat Receptionist Capabilities

Capabilities are like instructions that guide how your AI Chat Receptionist behaves and what actions it can take. Review these and adjust as needed to make sure your AI performs the way you want.

- **Capture Lead Information**  
  The AI automatically asks visitors for contact details such as name, phone number, or email and saves captured leads directly to your CRM. This capability is turned on by default.

- **Book Appointments**  
  Connect your calendar to let the AI help customers schedule meetings. It will offer available time slots and collect all necessary booking details automatically. 

#### Book multiple services in one session

When configuring **Book Appointments**, you can enable **Book Multiple Services** and choose the service menu/group the AI can book from.

With multi-service booking enabled, the AI can:

- Identify and confirm multiple services in one request, and ask follow-up clarification questions when a service request is ambiguous
- Suggest related add-on services from the same menu/group when they fit the request
- Find available back-to-back time slots for the full service sequence; if no combined slot is available, offer alternatives such as a different date, a different provider, or split bookings
- Apply scheduling rules across the full session by enforcing:
  - the longest advance notice requirement across selected services
  - the shortest future booking window across selected services
- Prioritize one provider for the whole session when `Any Provider` is selected, or confirm provider handoffs when multiple providers are required
- Collect and deduplicate required contact and intake fields across selected services, including phone validation and confirmation
- Send one consolidated confirmation flow (email, SMS, or both based on requirements) and create one CRM activity for the multi-service booking

 - **Custom Capabilities**  
   Expand your AI Chat Receptionist's skills by adding custom capabilities tailored to your unique business needs. You can learn more about [Custom Capabilities](../../ai-capabilities/creating-custom-capabilities.md) in depth.

### Step 3: Add Purpose and Business Knowledge to the AI Chat Receptionist

To respond accurately to general inquiries, your AI Chat Receptionist needs context about your business. 

- **Knowledge**: This includes detailed business information, such as FAQs, service descriptions, and policies, that the AI uses to answer specific questions. Information from your website homepage is included by default.

 For a complete guide on providing your AI Employees with Knowledge, see the [Knowledge Base documentation](../../knowledge-base/).

## Make responses page-aware with the visitor's URL

When a visitor chats through the Web Chat widget, the AI Chat Receptionist receives the URL of the page they're currently on with every message they send. The AI can use this URL to answer vague, context-dependent questions ("is this still available?", "what's the price?", "tell me more") without making the visitor re-explain what they're looking at.

This works automatically — no configuration is required for the AI to receive the URL. To get the most out of it, make sure the relevant pages of the SMB's website are in the AI's knowledge base, and consider tuning the Purpose or a capability prompt to tell the AI how to interpret the URL pattern for that business.

:::info The AI sees the URL, not the page content
The AI is only given the URL string itself, not a rendered view of the page. To answer detailed questions about what's on a page, the AI needs that page's content in its knowledge base, or a [custom capability](../../ai-capabilities/creating-custom-capabilities.md) that can look up the data (for example, an inventory lookup tool keyed off the URL).
:::

### Tune a prompt to use the current URL

To teach the AI Chat Receptionist how the SMB's URLs map to specific products, vehicles, or pages, add instructions to the Purpose field or to a capability prompt.

#### Example: Auto dealer inventory pages

```text wrap
## Using the Current Page URL
This dealer's vehicle detail pages follow this URL pattern:
https://www.example.com/inventory/[year-make-model-slug]/[id]

The numeric value at the end of the path is the vehicle's id.

When the customer is on a vehicle detail page:
- If they ask anything vague — "is this still available", "what's the price", "tell me more", "any photos", "what colour is it", "is it certified" — call GetInventory using that id from the URL. Do not ask which vehicle they mean.
- Confirm the vehicle naturally in the first line of your reply (e.g. "The 2021 Wrangler Sahara you're looking at...") so they know you understood.
- If the URL changes between turns, the customer has navigated to a different vehicle. Always use the URL from the most recent message.

When the customer is on the inventory listing page (/inventory with no id):
- They are browsing, not viewing a specific vehicle. Ask what they're looking for if their question is vague.

When the customer is on a non-inventory page (homepage, /financing, /about, contact, etc.):
- Do not assume any vehicle context. Handle the question on its own merits.

Customer words always override the URL. If they explicitly reference a different stock number, VIN, or year/make/model than what's on their current page, follow what they said and ignore the URL.
```

The same pattern works for any business with structured URLs — e-commerce product pages, service pages, real estate listings, menu items, and so on. Pair this with a [custom capability](../../ai-capabilities/creating-custom-capabilities.md) that looks up live data using the ID parsed from the URL.

:::note Web Chat only
The visitor's current URL is provided on the Web Chat channel. Other channels (SMS, voice, email) don't have a "current page" concept, so this context isn't available there.
:::

## Test and Monitor Your AI Chat Receptionist

Once your AI Chat Receptionist is set up, it's important to test how it handles real conversations and monitor its interactions over time. This helps you ensure the AI is answering questions accurately, capturing leads, and creating a positive experience for your website visitors. Regular testing and review will help you catch issues early and continuously improve your AI's performance as your business evolves.

### Test the AI Chat Receptionist's Responses

Click the `Try it` button from <AISparkleIcon /> `AI` > `AI Workforce`  to open up a **My Listing** page you can use to test chat responses before installing the website widget. For best results, open the test in an incognito window so it starts with a clean session.

Ask the kinds of questions your real customers might ask, and pay attention to:
- How the AI responds
- Whether it gives too much or too little information
- If it's assuming something you didn't intend

#### Testing with Fresh Conversations

For accurate testing results, you'll want each test to start with a fresh conversation that doesn't carry over previous context:

**Method 1: Use Incognito/Private Browsing**
- Open the test page in a new incognito or private browsing window
- This ensures a completely fresh session each time
- Best for quick, one-off tests

**Method 2: Clear Site Cookies (Advanced)**
- In your browser's developer tools (F12), navigate to the Application or Storage tab
- Find cookies for the My Listing page domain
- Delete all cookies for that site
- Refresh the page to start a new conversation
- Best for systematic testing when you need multiple fresh conversations in sequence

:::tip Testing Best Practice
Test the same prompt multiple times to see if you get consistent results. AI responses can vary slightly, so testing helps you identify if your prompts need to be more specific.
:::

### Monitor and Improve the AI Chat Receptionist

Regularly review the `Conversations` and `Anonymous Visitors` tabs in Conversations to make sure your Chat Receptionist is interacting with visitors like you expected. 

:::note
Conversations are placed in the `Anonymous Visitors` tab when the AI Chat Receptionist was unable to identify their contact information during the conversation.
:::

Responses from the AI Chat Receptionist include a clickable `Explanation` that expands to show:
- the AI "reasoning" behind their response
- the source they used for any knowledge
- any Tools that were used by the AI, as well as the detailed API call and response.

#### Using AI Explanations for Debugging

The Explanation feature is your most valuable debugging tool. Each response explanation shows:

**1. AI Reasoning**
- The thought process behind the response
- Which capabilities were considered
- Why specific actions were taken or not taken

**2. Knowledge Sources Used**
- Exact excerpts from your knowledge base that informed the response
- Which documents or pages were referenced
- Relevance scores showing how well the knowledge matched the question

**3. Tool Usage Details**
- Complete API call information (endpoint, parameters, headers)
- Raw API responses received
- How the AI interpreted and used the API data

**Using explanations to improve performance:**
- If the AI didn't use a tool you expected, check if the capability prompt clearly defines when to use it
- If wrong knowledge was referenced, consider refining your knowledge base or adding more specific content
- If the reasoning seems off, your Purpose or capability instructions may need clarification

### Systematic iteration workflow

Improving your AI Chat Receptionist is an iterative process. Follow this workflow for the best results:

**Step 1: Identify the Issue**
- Test a specific conversation flow
- Document what went wrong (wrong response, missed tool call, incorrect information)
- Review the AI explanation to understand why it happened

**Step 2: Determine the Fix Location**
- **Purpose issue**: The AI's overall tone, greeting, or general behavior needs adjustment
- **Capability issue**: The AI didn't take an action when it should have, or did something unexpected
- **Knowledge issue**: The AI gave incorrect information or couldn't find relevant facts
- **Tool issue**: An API call failed or returned unexpected data

**Step 3: Make One Change at a Time**
- Adjust only one element (Purpose, one capability, or one knowledge source)
- Save your changes
- Document what you changed and why

**Step 4: Test the Specific Scenario**
- Use the same prompt that previously failed
- Clear cookies or use incognito to ensure a fresh conversation
- Verify the issue is resolved
- Test edge cases to ensure you didn't break anything else

**Step 5: Test Broader Scenarios**
- Try variations of the prompt with different wording
- Test related conversation flows
- Ensure your fix didn't negatively impact other interactions

**Step 6: Monitor Real Conversations**
- Watch for the same issue in live customer conversations
- Track if your fix improved the overall experience
- Be ready to iterate further if needed

:::tip When to Adjust Purpose vs. Capabilities vs. Knowledge
- **Adjust Purpose** when the issue affects all conversations (tone, general behavior, introduction)
- **Adjust Capabilities** when the issue is about when/how to take specific actions in certain situations
- **Adjust Knowledge** when the issue is about incorrect facts or missing information
- **Adjust Tools** when API calls are failing or returning unexpected data

If you're unsure, start with the most specific element (capabilities or knowledge) before adjusting the broad Purpose.
:::

### Testing across multiple channels

If you've enabled your AI Chat Receptionist on multiple channels (web chat, SMS, etc.), test each channel separately:

**Web Chat Considerations:**
- Test on desktop and mobile browsers
- Verify formatting (links, images, lists) displays correctly
- Check that longer responses are readable in the chat interface

**SMS Considerations:**
- Keep in mind that images and rich formatting won't display the same way
- Test that responses are concise enough for text message format
- Verify that links are shortened and clickable
- Check that the conversation flow still makes sense without visual formatting

**Testing tips for multi-channel:**
1. Create capabilities with channel-specific instructions when needed
2. Use markdown formatting that degrades gracefully (bullets become line breaks in SMS)
3. Test the same conversation flow on each channel to catch formatting issues
4. Adjust capability prompts to specify different behaviors per channel when appropriate 

## Frequently asked questions about setting up your AI Chat Receptionist

<details>
<summary>What should I include in the Purpose prompt?</summary>

Your Purpose prompt sets the tone and behavior of your AI Chat Receptionist. Include instructions about your business's voice, how the AI should greet visitors, and any important policies or information it should share.

</details>

<details>
<summary>How often should I update my AI Chat Receptionist's knowledge?</summary>

Regularly review and update your AI's Purpose prompt and knowledge sources to ensure the responses stay accurate and aligned with your latest business offerings and policies. Once a month is a good starting point for many businesses, but your business might need to do it more or less often. 

</details>

<details>
<summary>Why does my AI sometimes give different answers to the same question?</summary>

The AI Chat Receptionist is **non-deterministic**, which means it may provide different responses depending on the context and wording of each question. This flexibility allows it to better adapt to varied customer interactions! If you want to have your AI respond the exact same way each time, you need to be *very* specific when giving directions. 

</details>

<details>
<summary>How can I help my AI Chat Receptionist give correct answers?</summary>

You know your business best! To improve your AI's accuracy, take a moment to write down:

- The services you offer—and those you don't  
- The most common questions your customers ask  
- The key information the AI should always collect from visitors

Use this info to write clear Purpose prompts and add any relevant content to your AI's knowledge base that might be missing.

</details>

<details>
<summary>Does the AI see all of the webpage content?</summary>

No. The AI is given the URL of the page the visitor is on, but it does not see the rendered page the way the visitor does. To answer detailed questions about what's on a page, that page's content needs to be in the AI's knowledge base, or the AI needs a custom capability (like an inventory lookup) that can fetch the data using information parsed from the URL.

</details>

<details>
<summary>Do I need to tune the prompt to take advantage of the current URL?</summary>

It depends on the outcomes the SMB is after.

- If they only want a smoother experience — the AI naturally picks up that the visitor is on a specific page and references it — no tuning is required.
- If they want specific behavior tied to specific URL patterns (e.g. always look up inventory when the customer is on a `/inventory/[id]` page), add instructions to the Purpose or a capability prompt that explain the URL pattern and how the AI should react.

</details>

<details>
<summary>The AI didn't seem to know about the page the visitor was on. Why?</summary>

Two things to check:

1. **Knowledge coverage.** The AI only knows what's in its knowledge base or what a tool returns. Make sure the relevant pages of the SMB's website are crawled and up to date.
2. **The URL itself.** The AI is given the URL string, not page contents. If the URL doesn't carry useful information (e.g. it's a generic `/page?id=abc123`), the AI may need a custom capability to translate that into something meaningful.

</details>

<details>
<summary>How long does the AI chat receptionist wait for a response before taking over the chat from a human?</summary>

When the chat receptionist (or any AI Employee) is assigned to a web chat widget, the AI will respond automatically on the web chat.

For any other channel that the chat receptionist can respond to, the AI is configured with a 60-minute inactivity timeout. If a human response is not detected in the conversation within this timeframe, the AI will automatically generate a follow-up response. The system strictly bases the timeout countdown on the most recent human message only.

:::info 
This only applies to conversations where messages have been sent from Conversations AI. For example, the chat receptionist would respond instantly to an SMS message from a new contact if it was assigned to monitor the SMS channel.
:::

</details>
