import {
  CONVERSATION_API_URL,
  CONVERSATION_FIRESTORE_ENV,
  INBOX_FIREBASE_API_KEY,
  INBOX_FIREBASE_PROJECT,
} from './config';

/**
 * Calls to the public web chat widget backend: the same JSON-over-HTTP conversation RPCs
 * the widget uses, plus the Firestore query it uses to find message IDs. No widget code,
 * no Firebase SDK. The participant token from CreateWidgetConversation is the only credential.
 */

export type WidgetConversation = {token: string; conversationId: string};

export type WidgetMessage = {
  messageId: string;
  participantId: string;
  body: string;
  created: string;
  aiStatus?: string;
};

/** Too many messages from this IP (the backend allows about 15 a minute). */
export class RateLimitError extends Error {
  name = 'RateLimitError';
}

/** The backend rejected the request, for example a question over the length limit. */
export class InvalidRequestError extends Error {
  name = 'InvalidRequestError';
}

async function callConversation<T>(
  method: string,
  body: unknown,
  signal: AbortSignal,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {'Content-Type': 'application/json'};
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${CONVERSATION_API_URL}/${method}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });
  if (response.status === 429) throw new RateLimitError(`${method} rate limited`);
  if (response.status === 400) throw new InvalidRequestError(`${method} rejected: ${await response.text()}`);
  if (!response.ok) throw new Error(`${method} failed: ${response.status}`);
  return (await response.json()) as T;
}

export async function createConversation(
  widgetId: string,
  pageUrl: string,
  signal: AbortSignal,
): Promise<WidgetConversation> {
  const response = await callConversation<{
    widgetParticipantToken?: string;
    conversation?: {conversationId?: string};
  }>('CreateWidgetConversation', {widgetId, chatSourceUrl: pageUrl}, signal);
  const token = response.widgetParticipantToken;
  const conversationId = response.conversation?.conversationId;
  if (!token || !conversationId) throw new Error('CreateWidgetConversation returned no conversation');
  return {token, conversationId};
}

export async function sendMessage(
  token: string,
  body: string,
  signal: AbortSignal,
): Promise<{messageId: string; createdAt: string}> {
  return callConversation(
    'SendWidgetMessage',
    {type: 'MESSAGE_TYPE_MESSAGE', body, location: 'PLATFORM_LOCATION_BUSINESS_APP'},
    signal,
    token,
  );
}

export async function getMessages(token: string, messageIds: string[], signal: AbortSignal): Promise<WidgetMessage[]> {
  if (messageIds.length === 0) return [];
  const response = await callConversation<{messages?: WidgetMessage[]}>(
    'GetMultiWidgetMessages',
    {messageIds},
    signal,
    token,
  );
  return response.messages ?? [];
}

/** Firestore marks live (not deleted) messages with this fixed timestamp, not with null. */
const FIRESTORE_NOT_DELETED = '1970-01-01T03:00:00Z';

/** The structured query the widget runs: live web chat messages, newest first. */
export function messageQuery(limit: number) {
  return {
    structuredQuery: {
      from: [{collectionId: 'messages'}],
      where: {
        compositeFilter: {
          op: 'AND',
          filters: [
            {fieldFilter: {field: {fieldPath: 'deleted'}, op: 'EQUAL', value: {timestampValue: FIRESTORE_NOT_DELETED}}},
            {fieldFilter: {field: {fieldPath: 'channel'}, op: 'EQUAL', value: {stringValue: 'WebChat'}}},
            {
              // Keeps system messages out: GetMultiWidgetMessages rejects a batch containing one.
              fieldFilter: {
                field: {fieldPath: 'type'},
                op: 'IN',
                value: {arrayValue: {values: [{stringValue: 'message'}, {stringValue: 'booking_availability'}]}},
              },
            },
          ],
        },
      },
      orderBy: [{field: {fieldPath: 'created'}, direction: 'DESCENDING'}],
      limit,
    },
  };
}

export function messagesQueryUrl(conversationId: string): string {
  const docId = conversationId.replace(/^CONVERSATION-/, '');
  return (
    `https://firestore.googleapis.com/v1/projects/${INBOX_FIREBASE_PROJECT}/databases/(default)/documents/` +
    `conversation/env/${CONVERSATION_FIRESTORE_ENV}/${encodeURIComponent(docId)}:runQuery?key=${INBOX_FIREBASE_API_KEY}`
  );
}

type RunQueryRow = {document?: {fields?: {messageId?: {stringValue?: string}}}};

/** IDs of the conversation's newest web chat messages, newest first. */
export async function listMessageIds(conversationId: string, signal: AbortSignal, limit = 10): Promise<string[]> {
  const response = await fetch(messagesQueryUrl(conversationId), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(messageQuery(limit)),
    signal,
  });
  if (!response.ok) throw new Error(`Firestore runQuery failed: ${response.status}`);
  const rows = (await response.json()) as RunQueryRow[];
  return rows.flatMap((row) => {
    const id = row.document?.fields?.messageId?.stringValue;
    return id ? [id] : [];
  });
}
