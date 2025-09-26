---
title: AI Chat Receptionist Overview 
sidebar_position: 2
---

import { AISparkleIcon } from '@site/src/components/Icons';

The AI Chat Receptionist helps you capture leads and respond to website visitors 24/7. In this guide, you'll learn how to set up, train, and monitor your AI assistant to work for your business.

**By default, the AI Chat Receptionist:**
- Answers questions about your business using information from your business profile and knowledge base
- Collects visitor contact information (name, phone number, or email) so you can follow up with leads
- Detects and responds in over 40 languages, including English, French, and Spanish
- Lets visitors know when it doesn't have enough information, so a team member can follow up

### Why is the AI Chat Receptionist important?

The AI Chat Receptionist ensures that your business never misses an opportunity by engaging website visitors instantly, around the clock. By capturing leads and answering common questions 24/7, it turns casual browsers into qualified prospects, even when your team is offline.

Beyond capturing leads and answering questions around the clock, the Chat Receptionist reduces friction and drop-off by initiating conversations with context-driven prompts instead of overwhelming forms, handles ambiguity and complex inquiries by understanding free-form requests and adapting in real time without forcing users into rigid menu paths, and fosters trust through natural, empathetic interactions and personalized greetings. It also scales effortlessly with your business as it adapts to new offerings and workflows without rebuilding extensive decision trees, while delivering timely, personalized responses that guide visitors down the sales funnel and drive higher customer satisfaction and conversion rates.
 
## Set Up the AI Chat Receptionist

Follow these simple steps to configure your AI Chat Receptionist so it effectively engages visitors and captures valuable leads.

### Step 1: Configure Basic Settings for the AI Chat Receptionist

Go to <AISparkleIcon /> `AI > AI workforce` and then click `Configure` on the Chat receptionist.

- **Name and Image**  
Give your AI a friendly, professional name and photo. The AI Receptionist knows their name and the photo will help you distinguish between other AI Employees in your app.

- **Communication Channels**  
Your AI Chat Receptionist is assigned to the **Web Chat** channel by default. This channel is always active and cannot be disabled. You can also assign your AI Receptionist to the **SMS** channel to reach customers via text messaging.

:::note  
The Web Chat widget isn't automatically added to your website! You'll need to install the widget code or enable it within your site builder before your AI can start engaging visitors. When you are ready to install the widget, refer to [How to install the Conversations Web Chat Widget](/conversations/conversations-ai-web-chat-overview)
:::

### Step 2: Configure Your AI Chat Receptionist Capabilities

Capabilities are like instructions that guide how your AI Chat Receptionist behaves and what actions it can take. Review these and adjust as needed to make sure your AI performs the way you want.

- **Capture Lead Information**  
  The AI automatically asks visitors for contact details such as name, phone number, or email and saves captured leads directly to your CRM. This capability is turned on by default.

- **Book Appointments**  
  Connect your calendar to let the AI help customers schedule meetings. It will offer available time slots and collect all necessary booking details automatically. 

 - **Custom Capabilities**  
   Expand your AI Chat Receptionist's skills by adding custom capabilities tailored to your unique business needs. You can learn more about [Custom Capabilities](../ai-capabilities/creating-custom-capabilities) in depth.

### Step 3: Add Purpose and Business Knowledge to the AI Chat Receptionist

To respond accurately to general inquiries, your AI Chat Receptionist needs context about your business. 

- **Knowledge**: This includes detailed business information, such as FAQs, service descriptions, and policies, that the AI uses to answer specific questions. Your **Business Profile** and information for you homepage is included by default.

 For a complete guide on providing your AI Employees with Knowledge, see the [Knowledge Sources section in the AI Workforce Overview](../ai_workforce_overview.md#knowledge-sources).

## Test and Monitor Your AI Chat Receptionist

Once your AI Chat Receptionist is set up, it's important to test how it handles real conversations and monitor its interactions over time. This helps you ensure the AI is answering questions accurately, capturing leads, and creating a positive experience for your website visitors. Regular testing and review will help you catch issues early and continuously improve your AI's performance as your business evolves.

### Test the AI Chat Receptionist's Responses

Click the `Try it` button from <AISparkleIcon /> `AI` > `AI Workforce`  to open up a **My Listing** page you can use to test chat responses before installing the website widget. For best results, open the test in an incognito window so it starts with a clean session.

Ask the kinds of questions your real customers might ask, and pay attention to:
- How the AI responds
- Whether it gives too much or too little information
- If it's assuming something you didn't intend

### Monitor and Improve the AI Chat Receptionist

Regularly review the `Conversations` and `Anonymous Visitors` tabs in Conversations to make sure your Chat Receptionist is having interacting with visitors like you expected. 

:::note
Conversations are placed in the `Anonymous Visitors` tab when the AI Chat Receptionist was unable to identify their contact information during the conversation.
:::

Responses from the AI Chat Receptionist include a clickable `Explanation` that expands to show:
- the AI "reasoning" behind their response
- the source they used for any knowledge
- any Tools that were used by the AI, as well as the detailed API call and response. 

## Frequently Asked Questions about Setting Up Your AI Chat Receptionist

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
