import {
  MAX_QUESTION_LENGTH,
  QuestionTooLongError,
  RateLimitError,
  setAssistantTransport,
  type AssistantTransport,
} from './assistant';
import * as client from './webchatClient';
import type {WidgetConversation} from './webchatClient';
import {waitForReply} from './webchatReply';

/**
 * AssistantTransport backed by the public web chat widget: each drawer thread is one
 * widget conversation, each question one widget message, and the web chat AI's reply
 * comes back as a single complete message.
 */

export type WebchatDeps = {
  storage: Storage | null;
  pageUrl: () => string;
  createConversation: typeof client.createConversation;
  sendMessage: typeof client.sendMessage;
  listMessageIds: typeof client.listMessageIds;
  getMessages: typeof client.getMessages;
  waitForReply: typeof waitForReply;
};

/** `pending` marks a question still waiting for its answer when the tab last saved. */
type StoredConversation = WidgetConversation & {widgetId: string; pending?: boolean};

function browserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

const defaultDeps = (): WebchatDeps => ({
  storage: browserStorage(),
  // Page path only: the query string can carry the visitor's search terms.
  pageUrl: () => window.location.origin + window.location.pathname,
  createConversation: client.createConversation,
  sendMessage: client.sendMessage,
  listMessageIds: client.listMessageIds,
  getMessages: client.getMessages,
  waitForReply,
});

/** The participant ID claim in the widget token; it identifies the visitor's own messages. */
export function participantId(token: string): string {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return (JSON.parse(atob(payload)) as {participant_id?: string}).participant_id ?? '';
  } catch {
    return '';
  }
}

/** Fallback for a send response without a timestamp; a little early so the reply still counts. */
function approximateSentAt(): string {
  return new Date(Date.now() - 5000).toISOString();
}

export function createWebchatTransport(widgetId: string, deps: WebchatDeps = defaultDeps()): AssistantTransport {
  const key = `ais-webchat-${widgetId}`;
  // In-memory copy, used on its own when storage is unavailable.
  let current: StoredConversation | null = null;

  const write = (conversation: StoredConversation | null) => {
    current = conversation;
    try {
      if (conversation) deps.storage?.setItem(key, JSON.stringify(conversation));
      else deps.storage?.removeItem(key);
    } catch {
      // In memory only.
    }
  };

  const load = (): StoredConversation | null => {
    try {
      const raw = deps.storage?.getItem(key);
      if (raw) current = JSON.parse(raw) as StoredConversation;
    } catch {
      // Keep the in-memory copy.
    }
    if (!current || current.widgetId !== widgetId) return null;
    // A question was left waiting (the page reloaded mid-answer): its late answer would
    // otherwise be taken for the next question's, so start a fresh conversation.
    if (current.pending) {
      write(null);
      return null;
    }
    return current;
  };

  const clear = () => write(null);

  return {
    async ask(question, onReply, signal) {
      if (Array.from(question).length > MAX_QUESTION_LENGTH) {
        throw new QuestionTooLongError(`Question longer than ${MAX_QUESTION_LENGTH} characters`);
      }
      let conversation = load();
      if (!conversation) {
        const created = await deps.createConversation(widgetId, deps.pageUrl(), signal);
        conversation = {...created, widgetId};
        write(conversation);
      }
      const {token, conversationId} = conversation;
      const visitorId = participantId(token);
      if (!visitorId) {
        clear();
        throw new Error('Web chat token has no participant');
      }

      let sent: {messageId: string; createdAt?: string};
      try {
        sent = await deps.sendMessage(token, question, signal);
      } catch (err) {
        // Throttled before anything was stored: the conversation is still good to reuse.
        // Any other failure (for example a stale token) gets a fresh conversation next time.
        if (!(err instanceof RateLimitError)) clear();
        throw err;
      }

      write({...conversation, pending: true});
      try {
        const reply = await deps.waitForReply(
          {
            listIds: (s) => deps.listMessageIds(conversationId, s),
            getMessages: (ids, s) => deps.getMessages(token, ids, s),
          },
          {visitorId, askedAt: sent.createdAt || approximateSentAt(), signal},
        );
        write({...conversation, pending: false});
        onReply({id: reply.id, text: reply.text, done: true});
      } catch (err) {
        // The AI may still answer later; a fresh conversation keeps that answer out of the next question.
        clear();
        throw err;
      }
    },
    reset: clear,
  };
}

/** Register the web chat transport for the drawer. Without a widget ID the drawer stays "not configured". */
export function registerWebchatTransport(widgetId: string, deps?: WebchatDeps): boolean {
  if (!widgetId) return false;
  setAssistantTransport(createWebchatTransport(widgetId, deps));
  return true;
}
