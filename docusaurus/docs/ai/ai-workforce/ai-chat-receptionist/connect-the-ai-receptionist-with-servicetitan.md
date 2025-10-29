---
title: "Connect the AI Chat Receptionist with ServiceTitan"
---

import {AISparkleIcon} from '@site/src/components/Icons'
import {ChatUserMessage, ChatAIMessage} from '@site/src/components/ChatBubble' 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

By connecting the AI Chat Receptionist with ServiceTitan, your AI Receptionist can access customer information, schedule appointments, and manage service requests in your ServiceTitan account.

**In this guide, you will set up your AI Receptionist to be able to:**
- Look up customer information and service history;
- Schedule new appointments and service calls;
- Check technician availability and capacity;
- Create and update jobs in ServiceTitan;
- Retrieve real-time job status and updates; and
- Access customer billing and invoice information.

### Why is connecting the AI Receptionist with ServiceTitan important?

ServiceTitan is a software platform used by many trades businesses (HVAC, plumbing, electrical, and other home services). When customers contact your business, they often need help with scheduling, job updates, or service history. This integration lets your AI Receptionist read and update data in ServiceTitan, such as customers, jobs, appointments, and related records.

:::tip
While this guide has been written primarily for your AI Chat Receptionist, you can use the Capabilities created in this guide with your AI Voice Receptionist, or any other AI Employee!
:::

## Prerequisites & Setup

Before you connect your AI Receptionist to ServiceTitan, you need to gather the following items from your ServiceTitan account and API access. You'll only need to do this once.

| What you need | Where to find it | Scopes / Notes |
|---------------|------------------|----------------|
| **ServiceTitan Tenant ID** | `Settings` → `Integrations` → `API Application Access` | Your unique tenant identifier |
| **API Application** | Request access at [developer.servicetitan.io](https://developer.servicetitan.io/) | Create a custom app for your integration |
| **Client ID & Client Secret** | Developer Portal → Your App → Credentials | OAuth 2.0 authentication credentials |
| **App ID & App Key** | Developer Portal → Your App → App Details | Application-specific identifiers |
| **API Permissions** | `Settings` → `Integrations` → `API Application Access` → Configure Permissions | <ul><li>`jpm:jobs:read`</li><li>`jpm:jobs:write`</li><li>`crm:customers:read`</li><li>`crm:appointments:read`</li><li>`crm:appointments:write`</li><li>`accounting:invoices:read`</li><li>`settings:technicians:read`</li></ul> |

#### ServiceTitan Help Resources

> You can get more detailed help on gathering this information from the ServiceTitan resources below:
> - Setting up API access ([ServiceTitan Developer Portal](https://developer.servicetitan.io/))
> - Managing integrations ([API Application Access Guide](https://help.servicetitan.com/admin-settings/integrations/api-application-access))
> - Understanding API permissions ([ServiceTitan API Documentation](https://developer.servicetitan.io/docs))

---

## Capability 1: Customer Lookup and Service History

This capability allows your AI Receptionist to search for customers and retrieve their service history, providing instant access to past jobs, upcoming appointments, and customer preferences.

### Step 1: Add a ServiceTitan Customer Lookup Capability

1. In your Business App, navigate to <AISparkleIcon /> `AI` → `AI Workforce`
2. Select your AI Employee and click `Configure`.
3. Under `Custom Capabilities`, click `Add a capability`.
4. Fill in the following fields:
   - **Name**: `ServiceTitan Customer Lookup`
   - **Description**: Searches ServiceTitan for customer information, service history, and account details to provide personalized support and context for customer inquiries.

### Step 2: Configure ServiceTitan Customer API Tools

#### ServiceTitan Tool: searchCustomers

`searchCustomers` allows your AI Receptionist to find customers by name, phone number, or email address and retrieve basic customer information.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `searchCustomers` |
| **Description** | Searches ServiceTitan customers by name, phone, or email and returns customer details including ID, contact information, and account status. |
| **Method** | `GET` |
| **URL** | `https://api.servicetitan.io/crm/v2/tenant/{{tenant_id}}/customers` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |
| `Content-Type` | `application/json` | ✓ |

##### Query parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `name` | `Query` | `string` | Customer name to search for |
| `phone` | `Query` | `string` | Phone number to search for |
| `email` | `Query` | `string` | Email address to search for |
| `active` | `Query` | `boolean` | Filter for active customers only (default: true) |
| `page` | `Query` | `integer` | Page number for pagination (default: 1) |
| `pageSize` | `Query` | `integer` | Number of results per page (default: 20, max: 100) |

#### ServiceTitan Tool: getCustomerJobs

`getCustomerJobs` retrieves the complete job history for a specific customer, including past service calls, upcoming appointments, and job details.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `getCustomerJobs` |
| **Description** | Retrieves job history and upcoming appointments for a specific customer, including job details, technician assignments, and service status. |
| **Method** | `GET` |
| **URL** | `https://api.servicetitan.io/jpm/v2/tenant/{{tenant_id}}/jobs` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |
| `Content-Type` | `application/json` | ✓ |

##### Query parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `customerId` | `Query` | `integer` | ServiceTitan customer ID |
| `createdBefore` | `Query` | `string` | Filter jobs created before this date (ISO 8601 format) |
| `createdOnOrAfter` | `Query` | `string` | Filter jobs created on or after this date (ISO 8601 format) |
| `jobStatus` | `Query` | `string` | Filter by job status (e.g., "Scheduled", "InProgress", "Completed") |
| `page` | `Query` | `integer` | Page number for pagination |
| `pageSize` | `Query` | `integer` | Number of results per page (max: 100) |

#### ServiceTitan Tool: createCustomer

`createCustomer` creates a new customer record in ServiceTitan when they don't already exist in the system.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `createCustomer` |
| **Description** | Creates a new customer record in ServiceTitan with contact information and address details for first-time service requests. |
| **Method** | `POST` |
| **URL** | `https://api.servicetitan.io/crm/v2/tenant/{{tenant_id}}/customers` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |
| `Content-Type` | `application/json` | ✓ |

##### Body parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `name` | `Body` | `string` | Customer's full name |
| `email` | `Body` | `string` | Customer's email address |
| `phoneNumber` | `Body` | `string` | Primary phone number |
| `address` | `Body` | `object` | Service address including street, city, state, zip |
| `doNotMail` | `Body` | `boolean` | Opt-out preference for mailing (default: false) |
| `doNotService` | `Body` | `boolean` | Service restriction flag (default: false) |

### Step 3: Write the Customer Lookup Prompt

````
## **Customer Information Lookup Instructions**

### When to Search Customer Information
Initiate a ServiceTitan customer search **when**:
- The customer provides their name, phone number, or email and asks about their account
- The customer asks about their service history, past appointments, or previous work
- The customer wants to know about upcoming scheduled services
- The customer asks about billing history or invoices
- You need to verify customer identity before providing account-specific information

**Do not search** if the customer is asking general questions about services, pricing, or company policies.

---

### Customer Search Process

**Step 1: Search for Customer**
1. Use the most specific identifier provided (phone number is usually most reliable)
2. If searching by name, use the full name or last name for better results
3. If multiple customers match, ask for additional identifying information

**Step 2: Handle Customer Status**
- **If customer found:** Retrieve their job history and note upcoming appointments
- **If customer not found:** Prepare to create a new customer record

**Step 3: Retrieve Service History (for existing customers)**
1. Once you have the customer ID, retrieve their job history
2. Look for patterns in service frequency, preferred technicians, or recurring issues
3. Note any upcoming appointments or pending work orders

### Response Guidelines

**When customer is found:**
- Greet them by name and acknowledge their customer status
- Provide relevant service history if they're asking about past work
- Mention upcoming appointments if applicable
- Offer to help with scheduling or service questions

**When customer is not found:**
- Welcome them as a new customer
- Explain that you'll create their account during the service booking process
- Gather necessary information (name, phone, email, service address)
- Use the `createCustomer` tool if they want to proceed with scheduling

**For new customer creation, collect:**
- Full name
- Phone number
- Email address
- Service address (street, city, state, zip code)
- Any special access instructions

**Security Note:**
- Only provide account details to the verified account holder
- Ask for verification if there are any concerns about identity
- Do not share sensitive information like full addresses or payment details

### Example Responses

**Existing Customer:**
"Hi [Customer Name]! I found your account in our system. I can see you're one of our valued customers with [X] service history. How can I help you today?"

**New Customer:**
"Welcome! I don't see an existing account with that information, which means you'll be a new customer. That's no problem at all - I can set up your account and schedule your service. Let me gather some basic information to get started."
````

---

## Capability 2: Appointment Scheduling and Job Creation

This capability enables your AI Receptionist to schedule new appointments, create service jobs in ServiceTitan, and manage the booking process end-to-end.

### Step 1: Add a ServiceTitan Appointment Scheduling Capability

1. In your Business App, navigate to <AISparkleIcon /> `AI` → `AI Workforce`
2. Select your AI Employee and click `Configure`.
3. Under `Custom Capabilities`, click `Add a capability`.
4. Fill in the following fields:
   - **Name**: `ServiceTitan Appointment Scheduling`
   - **Description**: Creates new appointments and service jobs in ServiceTitan, checks technician availability, and manages the complete booking workflow from initial request to job creation.

### Step 2: Configure ServiceTitan Scheduling API Tools

#### ServiceTitan Tool: getAvailableTimeSlots

`getAvailableTimeSlots` checks technician availability and capacity to find open appointment slots.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `getAvailableTimeSlots` |
| **Description** | Retrieves available appointment time slots based on technician schedules, job types, and capacity constraints. |
| **Method** | `GET` |
| **URL** | `https://api.servicetitan.io/settings/v2/tenant/{{tenant_id}}/technicians` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |

##### Query parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `active` | `Query` | `boolean` | Filter for active technicians only |
| `hasPermissions` | `Query` | `string` | Filter technicians by specific permissions |

#### ServiceTitan Tool: createAppointment

`createAppointment` creates a new appointment and job in ServiceTitan with all necessary details.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `createAppointment` |
| **Description** | Creates a new appointment and job in ServiceTitan with customer information, service details, and scheduling preferences. |
| **Method** | `POST` |
| **URL** | `https://api.servicetitan.io/jpm/v2/tenant/{{tenant_id}}/jobs` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |
| `Content-Type` | `application/json` | ✓ |

##### Body parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `customerId` | `Body` | `integer` | ServiceTitan customer ID |
| `locationId` | `Body` | `integer` | Service location ID |
| `jobTypeId` | `Body` | `integer` | Type of service job |
| `priority` | `Body` | `string` | Job priority level |
| `summary` | `Body` | `string` | Brief description of the service needed |
| `appointmentStart` | `Body` | `string` | Appointment start time (ISO 8601 format) |
| `duration` | `Body` | `integer` | Expected job duration in minutes |

### Step 3: Write the Appointment Scheduling Prompt

````
## **Appointment Scheduling Instructions**

### When to Schedule Appointments
Create new appointments in ServiceTitan **when**:
- Customer requests to schedule service for HVAC, plumbing, electrical, or other trade work
- Customer wants to book a maintenance visit, inspection, or consultation
- Customer needs emergency service but can wait for next available appointment
- Customer wants to schedule follow-up work or warranty service

### Scheduling Process

**Step 1: Identify Customer Status**
- Search for existing customer using provided contact information
- If customer found: proceed with appointment scheduling
- If customer not found: create new customer record first using `createCustomer` tool

**Step 2: Gather Required Information**
Before creating an appointment, collect:
- Customer contact information (if new customer)
- Service location address
- Type of service needed (HVAC repair, plumbing, electrical, etc.)
- Problem description or reason for visit
- Preferred appointment time/date
- Urgency level (emergency, urgent, routine)

**Step 3: Check Availability**
- Search for available time slots based on customer preferences
- Consider job type and required technician skills
- Offer multiple options when possible

**Step 4: Create the Appointment**
- Create the job in ServiceTitan with all gathered details
- Assign appropriate priority level
- Include comprehensive job summary
- Link to customer ID (whether existing or newly created)

### Service Type Guidelines

**HVAC Services:**
- Heating/cooling system repairs
- Maintenance and tune-ups
- Equipment installations
- Emergency no-heat/no-cool calls

**Plumbing Services:**
- Leak repairs and pipe work
- Drain cleaning and unclogging
- Fixture installations
- Emergency plumbing issues

**Electrical Services:**
- Outlet and switch repairs
- Panel upgrades and inspections
- Lighting installations
- Emergency electrical problems

**General Maintenance:**
- Routine inspections
- Preventive maintenance
- Warranty work
- Follow-up visits

### Appointment Confirmation

After successfully creating an appointment:
- Provide confirmation with job number
- Share appointment date, time, and duration
- Mention assigned technician (if available)
- Provide contact information for changes
- Send any necessary preparation instructions

### Example Appointment Creation

"I've successfully scheduled your HVAC maintenance appointment for [Date] at [Time]. Your job number is [Job#]. Our technician will arrive during the scheduled window to perform a complete system inspection and tune-up. You should receive a confirmation call the day before your appointment. Is there anything else I can help you with today?"
````

---

## Capability 3: Job Status and Updates

This capability allows your AI Receptionist to provide real-time updates on job status, technician location, and estimated arrival times.

### Step 1: Add a ServiceTitan Job Status Capability

1. In your Business App, navigate to <AISparkleIcon /> `AI` → `AI Workforce`
2. Select your AI Employee and click `Configure`.
3. Under `Custom Capabilities`, click `Add a capability`.
4. Fill in the following fields:
   - **Name**: `ServiceTitan Job Status Updates`
   - **Description**: Retrieves real-time job status, technician location, and appointment updates from ServiceTitan to keep customers informed about their service appointments.

### Step 2: Configure ServiceTitan Job Status API Tools

#### ServiceTitan Tool: getJobStatus

`getJobStatus` retrieves current job status and details for specific jobs.

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `getJobStatus` |
| **Description** | Retrieves current job status, technician assignment, and progress updates for active service appointments. |
| **Method** | `GET` |
| **URL** | `https://api.servicetitan.io/jpm/v2/tenant/{{tenant_id}}/jobs/{{job_id}}` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |

##### Path parameters
| Name | Location | Type | Description |
|------|----------|------|-------------|
| `job_id` | `Path` | `integer` | Specific job ID to retrieve status for |

#### ServiceTitan Tool: getTechnicianLocation

`getTechnicianLocation` provides technician location and estimated arrival information (requires ServiceTitan Mobile integration).

##### Summary

| Field | Value |
|-------|-------|
| **ID** | `getTechnicianLocation` |
| **Description** | Retrieves technician location and estimated time of arrival for scheduled appointments. |
| **Method** | `GET` |
| **URL** | `https://api.servicetitan.io/dispatch/v2/tenant/{{tenant_id}}/technicians/{{technician_id}}/location` |

##### Required headers

| Header | Example value | Required |
|--------|---------------|:--------:|
| `Authorization` | `Bearer {{access_token}}` | ✓ |
| `ST-App-Key` | `{{app_key}}` | ✓ |

### Step 3: Write the Job Status Prompt

````
## **Job Status and Updates Instructions**

### When to Check Job Status
Retrieve job status information **when**:
- Customer asks about their scheduled appointment
- Customer wants to know technician arrival time
- Customer inquires about job progress or completion
- Customer asks about delays or rescheduling
- Customer references a specific job or service ticket number

### Status Update Process

**Step 1: Identify the Job**
- Ask for job number, appointment date, or service address
- Use customer lookup to find recent jobs if needed
- Verify you're providing information for the correct appointment

**Step 2: Retrieve Current Status**
- Get the latest job status from ServiceTitan
- Check for any recent updates or changes
- Look for technician assignment and scheduling information

**Step 3: Provide Clear Updates**
- Translate technical status into customer-friendly language
- Include relevant timeframes and next steps
- Offer additional assistance if needed

### Job Status Translations

**ServiceTitan Status → Customer-Friendly Message:**
- "Scheduled" → "Your appointment is confirmed and scheduled"
- "Dispatched" → "Your technician has been assigned and is on their way"
- "InProgress" → "Your technician has arrived and is working on your service"
- "Completed" → "Your service has been completed"
- "OnHold" → "Your appointment is temporarily on hold"
- "Cancelled" → "Your appointment has been cancelled"

### Providing Helpful Context

**For Scheduled Jobs:**
- Mention appointment window
- Provide technician name if assigned
- Share any preparation instructions

**For Active Jobs:**
- Give estimated completion time if available
- Mention any discovered issues or additional work needed
- Provide contact information for the assigned technician

**For Completed Jobs:**
- Confirm work completion
- Mention any follow-up needed
- Provide invoice or billing information if requested

### Example Status Updates

**Scheduled Appointment:**
"Your HVAC maintenance appointment is confirmed for tomorrow between 9 AM and 11 AM. Technician John Smith will be handling your service. He'll call about 30 minutes before arrival."

**Job in Progress:**
"I can see that your technician arrived at 2:15 PM and is currently working on your plumbing repair. Based on the initial assessment, they expect to complete the work within the next hour."

**Completed Job:**
"Great news! Your electrical repair was completed this morning at 11:30 AM. The work included replacing the faulty outlet and testing the circuit. You should have received an invoice via email."
````

---

## Example conversations with AI Receptionist connected to ServiceTitan

### Example 1: Existing Customer Scheduling Maintenance

<ChatUserMessage>
Hi, I'd like to schedule an HVAC maintenance appointment for my home. Can you check what's available next week?
</ChatUserMessage>

<ChatAIMessage>
I'd be happy to help you schedule your HVAC maintenance! Let me first look up your account. Can you provide your name and phone number?
</ChatAIMessage>

<ChatUserMessage>
Sure, it's Robert Johnson and my phone number is (555) 123-4567.
</ChatUserMessage>

*(AI searches ServiceTitan for customer)*

<ChatAIMessage>
Perfect! I found your account, Mr. Johnson. I can see you're due for your annual HVAC maintenance. I have several time slots available next week:

**Tuesday, March 14th:**
- 9:00 AM - 11:00 AM
- 2:00 PM - 4:00 PM

**Wednesday, March 15th:**
- 10:00 AM - 12:00 PM
- 1:00 PM - 3:00 PM

**Friday, March 17th:**
- 8:00 AM - 10:00 AM

Which of these times works best for you? The maintenance typically takes about 1-2 hours and includes a complete system inspection, filter replacement, and performance optimization.
</ChatAIMessage>

<ChatUserMessage>
Tuesday at 2 PM would be perfect. Can you book that for me?
</ChatUserMessage>

*(AI creates appointment in ServiceTitan)*

<ChatAIMessage>
Excellent! I've scheduled your HVAC maintenance appointment for Tuesday, March 14th from 2:00 PM to 4:00 PM. 

**Appointment Details:**
- **Job Number:** #ST-847392
- **Service:** Annual HVAC System Maintenance  
- **Date & Time:** Tuesday, March 14th, 2:00 PM - 4:00 PM
- **Technician:** Mike Rodriguez (certified HVAC specialist)
- **Location:** 1234 Main Street (your home address)

Mike will call you about 30 minutes before arrival. Please ensure the area around your HVAC unit is accessible, and if you have pets, please secure them during the visit.

You'll receive a confirmation email shortly, and we'll send a reminder the day before your appointment. Is there anything specific you'd like our technician to check during the maintenance?
</ChatAIMessage>

### Example 2: New Customer Requesting Service

<ChatUserMessage>
Hi, my kitchen sink has been leaking and I need a plumber. Can someone come out this week?
</ChatUserMessage>

<ChatAIMessage>
I can definitely help you get a plumber scheduled for that kitchen sink leak. Let me first look up your information. What's your name and phone number?
</ChatAIMessage>

<ChatUserMessage>
I'm Sarah Williams, phone number is (555) 987-6543. I think this might be my first time calling your company.
</ChatUserMessage>

*(AI searches ServiceTitan but finds no existing customer)*

<ChatAIMessage>
Welcome, Sarah! You're right - I don't see an existing account, which means you'll be a new customer. That's no problem at all! I can set up your account and get that plumber scheduled for you.

Let me gather some basic information to get started:

1. I have your name as Sarah Williams and phone (555) 987-6543
2. What's your email address?
3. What's the service address where you need the plumbing work done?

Also, can you tell me more about the kitchen sink leak? Is it under the sink, from the faucet, or somewhere else?
</ChatAIMessage>

<ChatUserMessage>
My email is sarah.williams@email.com and the address is 456 Oak Street, Springfield, IL 62701. The leak is coming from under the sink - looks like it's from one of the pipes connecting to the garbage disposal.
</ChatUserMessage>

*(AI creates new customer in ServiceTitan and checks technician availability)*

<ChatAIMessage>
Thank you, Sarah! I've created your account and can see this sounds like a plumbing connection issue that definitely needs attention. 

I have these available appointment slots this week:

**Wednesday, March 15th:**
- 10:00 AM - 12:00 PM
- 3:00 PM - 5:00 PM

**Thursday, March 16th:**
- 8:00 AM - 10:00 AM
- 1:00 PM - 3:00 PM

**Friday, March 17th:**
- 9:00 AM - 11:00 AM

Given that it's an active leak, I'd recommend sooner rather than later. In the meantime, you might want to place a bucket under the leak and avoid using the garbage disposal if possible. Which time slot works best for you?
</ChatAIMessage>

<ChatUserMessage>
Wednesday at 10 AM would be great!
</ChatUserMessage>

*(AI creates appointment in ServiceTitan)*

<ChatAIMessage>
Perfect! I've scheduled your plumbing repair for Wednesday, March 15th from 10:00 AM to 12:00 PM.

**Appointment Details:**
- **Job Number:** #ST-847401
- **Service:** Kitchen Sink Plumbing Repair
- **Date & Time:** Wednesday, March 15th, 10:00 AM - 12:00 PM
- **Technician:** Dave Martinez (licensed plumber)
- **Location:** 456 Oak Street, Springfield, IL 62701
- **Issue:** Leak under kitchen sink, appears to be from garbage disposal connection

Dave will call you about 30 minutes before arrival. Please make sure the area under the sink is accessible - you might want to remove any cleaning supplies or storage items beforehand.

You'll receive a confirmation email at sarah.williams@email.com, and we'll send you a reminder the day before. Welcome to our family of customers, Sarah!
</ChatAIMessage>

## Testing & Troubleshooting

This section walks you through diagnosing the most common issues with connecting ServiceTitan to the AI Receptionist: from authentication errors and API limits, to empty results and permission issues.

:::note
Troubleshooting API errors can involve technical steps like examining HTTP responses, OAuth tokens, and API permissions. If you're not comfortable with these details, consider asking a developer or reaching out to our support team for help.
:::

<Tabs
  defaultValue="auth"
  values={[
    { label: 'Authentication Error (401)', value: 'auth' },
    { label: 'Permission Denied (403)', value: 'permission' },
    { label: 'API Rate Limit (429)', value: 'rate' },
    { label: 'Not Found (404)', value: 'notfound' },
    { label: 'View Raw Request', value: 'inspect' },
  ]}>

<TabItem value="auth">
#### What is this error?
You'll get a `401 Unauthorized` response, typically with a JSON like:
```json
{ "error": "invalid_token", "error_description": "The access token is invalid" }
```

#### How do we fix this error?
1. Verify your Client ID and Client Secret are correct
2. Check that your OAuth token hasn't expired
3. Ensure you're using the correct tenant ID in your API calls
4. Test authentication separately using a tool like Postman with the same credentials
</TabItem>

<TabItem value="permission">
#### What is this error?
You'll encounter a `403 Forbidden` response when your app lacks necessary permissions:
```json
{ "error": "insufficient_scope", "error_description": "The request requires higher privileges than provided by the access token" }
```

#### How do we fix this error?
1. Check your API permissions in ServiceTitan Settings → Integrations → API Application Access
2. Ensure your app has the required scopes (e.g., `jpm:jobs:read`, `crm:customers:read`)
3. Re-authorize your application after adding new permissions
4. Verify the tenant admin has approved the required permission levels
</TabItem>

<TabItem value="rate">
#### What is this error?
ServiceTitan returned a `429 Too Many Requests` error, indicating you've exceeded the API rate limit:
```json
{ "error": "rate_limit_exceeded", "message": "API rate limit exceeded" }
```

#### How do we fix this error?
1. Implement exponential backoff in your API calls
2. Reduce the frequency of API requests
3. Cache frequently accessed data when appropriate
4. Contact ServiceTitan if you need higher rate limits for production use
</TabItem>

<TabItem value="inspect">
#### What is this error?
This view shows the raw HTTP request the AI sent, including headers and request body.

#### How do we fix this error?
1. Open "Conversations" → "Explanation" in your Business App
2. Review the API call details for correct endpoints and parameters
3. Verify that all required headers are included
4. Check that request body format matches ServiceTitan API requirements
</TabItem>

<TabItem value="notfound">
#### What is this error?
The API returned a `404 Not Found` error, meaning the requested resource doesn't exist:
```json
{ "error": "not_found", "message": "The requested resource was not found" }
```

#### How do we fix this error?
1. Verify the customer ID, job ID, or other identifiers are correct
2. Check that you're using the right API endpoint URL
3. Ensure the resource exists in your ServiceTitan tenant
4. Confirm you have permission to access the specific resource
</TabItem>

</Tabs>

## FAQ: Connecting the AI Receptionist with ServiceTitan

### Integration & Setup

<details>
<summary>Can I use this ServiceTitan integration with other AI Employees besides the Chat Receptionist?</summary>

Absolutely! While this guide focuses on the AI Chat Receptionist, the Custom Capabilities and tools you create here work with any AI Employee, including your [AI Voice Receptionist](../ai-voice-receptionist.md).

This means customers can get ServiceTitan information and schedule appointments through phone calls, SMS, web chat, or any other channel your AI Employees support. The same ServiceTitan data will be available regardless of how customers choose to interact with your business.

 For more details on setting up Custom Capabilities across different AI Employees, see [Creating Custom Capabilities for your AI Employees](../empower-your-ai-employee-custom-capabilities.md).
</details>

<details>
<summary>What ServiceTitan modules and features can I integrate besides basic scheduling?</summary>

While this guide covers core customer service functions, ServiceTitan's API supports additional integrations:

**Available Modules:**
- Job Management (scheduling, dispatch, completion)
- Customer Relationship Management (CRM)
- Inventory and Equipment tracking
- Accounting and Invoicing
- Marketing and Communications
- Reporting and Analytics
- Technician Management
- Estimates and Proposals

You can create additional Custom Capabilities for features like inventory lookup, invoice status, equipment history, and maintenance reminders using the same framework described in this guide.
</details>

### AI & Workflow Questions

<details>
<summary>How does the ServiceTitan integration work with my AI's Knowledge Base?</summary>

The ServiceTitan integration provides real-time operational data through API calls, while your [Knowledge Base](../../knowledge-base.md) contains static business information. These work together as follows:

**ServiceTitan API provides:** Live job status, customer history, technician schedules, real-time availability  
**Knowledge Base should include:** Service policies, pricing information, service area details, company procedures, emergency protocols

Your AI will use the ServiceTitan API to answer "When is my next appointment?" and the Knowledge Base to answer "What's your service area?" For best results, ensure your [Knowledge Sources](../index.mdx#knowledge-sources) include comprehensive business policies and procedures to complement the real-time operational data.
</details>

<details>
<summary>What if customers ask about ServiceTitan-related information the API can't provide?</summary>

Great question! The ServiceTitan API provides operational and customer data, but customers often need additional business information. Add these topics to your [Knowledge Base](../../knowledge-base.md):

- Service area boundaries and travel charges
- Emergency service policies and after-hours rates
- Warranty information and terms
- Payment methods and financing options
- Seasonal service recommendations
- Equipment maintenance tips
- Company history and certifications
- Environmental and safety policies

This ensures your AI can provide complete, helpful answers by combining real-time ServiceTitan data with your business policies and expertise.
</details>

### Business Process Questions

<details>
<summary>How can I ensure my AI creates jobs with the right priority and routing?</summary>

ServiceTitan's job management system relies on proper classification and routing. Configure your AI integration to:

**Set Appropriate Priority Levels:**
- Emergency (no heat/cool, water leaks, electrical hazards)
- Urgent (equipment malfunctions, comfort issues)
- Routine (maintenance, non-critical repairs)

**Include Detailed Job Information:**
- Clear problem descriptions from customer conversations
- Equipment details when known (age, model, previous service)
- Access requirements (gate codes, pet information)
- Customer preferences (technician requests, time windows)

**Route to Qualified Technicians:**
- Match job types to technician specializations
- Consider geographic routing for efficiency
- Factor in equipment requirements and truck stock

You can customize the job creation prompts to automatically gather this information during customer conversations.
</details>

<details>
<summary>Can customers get estimates and pricing through the AI integration?</summary>

While ServiceTitan stores pricing and estimate data, providing accurate estimates requires careful consideration:

**What the AI can do:**
- Reference standard service call fees from your Knowledge Base
- Mention typical price ranges for common services
- Schedule estimate appointments with technicians
- Access historical pricing for repeat services

**What requires human expertise:**
- Detailed troubleshooting and diagnosis
- Complex repair estimates
- Equipment replacement recommendations
- Custom work pricing

We recommend having your AI schedule estimate appointments for anything beyond basic service calls, ensuring customers get accurate, professional assessments from your technicians.
</details>

<details>
<summary>How do I handle emergency service requests through the AI?</summary>

Emergency services require special handling to ensure rapid response:

**Configure Emergency Workflows:**
- Create high-priority job types for emergencies (no heat, water leaks, electrical hazards)
- Set up immediate dispatch notifications
- Include emergency contact escalation in your prompts
- Provide clear safety instructions while help is on the way

**Update Your AI Prompts:**
- Add emergency identification criteria
- Include safety questions and immediate response instructions
- Escalate to on-call staff when appropriate
- Create emergency job entries with highest priority

**Example Emergency Response:**
"I understand you have no heat and it's freezing outside. This is definitely an emergency. I'm creating a high-priority service call right now and will have our emergency dispatch contact you within 10 minutes. In the meantime, if you have a space heater, please use it safely..."
</details>

### Technical & Advanced Configuration

<details>
<summary>How can I track which services customers request most through AI interactions?</summary>

Monitor customer service patterns through several methods:

 1. **Conversation Analytics:** Review the [Conversations](/business-app/conversations/) tab to identify frequently requested services

2. **ServiceTitan Reporting:** Use ServiceTitan's built-in reporting to track jobs created through AI interactions by tagging them appropriately

3. **Custom Capability Analytics:** Monitor which API calls are made most frequently through the "Explanation" feature

 4. **Business Intelligence:** Set up [automations](../../automations/index.md) to log AI-generated appointments and analyze trends

This data can inform staffing, inventory, and service offerings based on customer demand patterns.
</details>

<details>
<summary>Can I customize the AI's responses based on customer membership levels or service agreements?</summary>

Yes! ServiceTitan's customer data includes membership and service agreement information that your AI can use:

**Membership Benefits:**
- Priority scheduling for members
- Discounted rates and special pricing
- Extended warranties and guarantees
- Expedited service response

**Service Agreement Holders:**
- Scheduled maintenance reminders
- Covered services under agreement
- Member-only time slots
- Special contact procedures

Customize your prompts to check customer status and adjust responses accordingly. For example: "I see you're a Premium Service Member, so I can offer you priority scheduling and your annual maintenance is included at no charge."
</details>

<details>
<summary>How do I ensure data privacy and security with the ServiceTitan integration?</summary>

Data security is crucial when integrating customer information systems:

**API Security Best Practices:**
- Use secure OAuth 2.0 authentication
- Implement proper access token management
- Limit API permissions to minimum required scopes
- Monitor API access and usage regularly

**Customer Data Protection:**
- Only access customer data when necessary for the conversation
- Verify customer identity before providing account details
- Follow your company's data privacy policies
- Comply with relevant regulations (CCPA, GDPR, etc.)

**System Security:**
- Regularly update API credentials
- Monitor for unusual access patterns
- Implement logging for audit purposes
- Train staff on data handling procedures

The integration respects ServiceTitan's existing permission structure, so customers can only access information they're authorized to see.
</details>

<details>
<summary>Can I create automated follow-up workflows based on job completion?</summary>

You can create follow-up workflows using ServiceTitan webhooks and Business App automations:

**Job Completion Follow-ups:**
- Automatic customer satisfaction surveys
- Service reminder scheduling for maintenance
- Follow-up appointment booking for warranty work
- Review request campaigns for positive experiences

**Implementation Options:**
 1. Use ServiceTitan webhooks to trigger Business App [automations](/business-app/automations/)
 2. Set up [Zapier](/business-app/automations/) integrations between ServiceTitan and Business App
3. Create scheduled follow-up tasks in your AI workflow

**Example Workflow:**
When a ServiceTitan job is marked "Completed" → trigger Business App automation → send personalized follow-up message through AI Receptionist → schedule satisfaction survey → book next maintenance appointment if needed.

This provides a consistent customer experience beyond the initial service call.
</details>
