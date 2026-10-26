import {setAssistantTransport, type AssistantTransport} from './assistant';
import * as client from './webchatClient';
import {InvalidRequestError, type WidgetConversation} from './webchatClient';
import {waitForReply} from './webchatReply';

/**
 * AssistantTransport backed by the public web chat widget: each drawer thread is one
 * widget conversation, each question one widget message, and the web chat AI's reply
 * comes back as a single complete message.
 */

/** The backend's limit on a message body, counted in characters. */
export const MAX_QUESTION_LENGTH = 1000;

export type WebchatDeps = {
  storage: Storage | null;
  pageUrl: () => string;
  createConversation: typeof client.createConversation;
  sendMessage: typeof client.sendMessage;
  listMessageIds: typeof client.listMessageIds;
  getMessages: typeof client.getMessages;
  waitForReply: typeof waitForReply;
};

type StoredConversation = WidgetConversation & {widgetId: string};

function browserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

const defaultDeps = (): WebchatDeps => ({
  storage: browserStorage(),
  pageUrl: () => window.location.href,
  ...client,
  waitForReply,
});

/** The participant ID claim in the widget token; it identifies the visitor's own messages. */
function participantId(token: string): string {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return (JSON.parse(atob(payload)) as {participant_id?: string}).participant_id ?? '';
  } catch {
    return '';
  }
}

export function createWebchatTransport(widgetId: string, deps: WebchatDeps = defaultDeps()): AssistantTransport {
  const key = `ais-webchat-${widgetId}`;
  // In-memory copy, used on its own when storage is unavailable.
  let current: StoredConversation | null = null;

  const load = (): WidgetConversation | null => {
    try {
      const raw = deps.storage?.getItem(key);
      if (raw) current = JSON.parse(raw) as StoredConversation;
    } catch {
      // Keep the in-memory copy.
    }
    return current && current.widgetId === widgetId ? current : null;
  };

  const save = (conversation: WidgetConversation) => {
    current = {...conversation, widgetId};
    try {
      deps.storage?.setItem(key, JSON.stringify(current));
    } catch {
      // In memory only.
    }
  };

  const clear = () => {
    current = null;
    try {
      deps.storage?.removeItem(key);
    } catch {
      // Nothing stored.
    }
  };

  return {
    async ask(question, onReply, signal) {
      if (Array.from(question).length > MAX_QUESTION_LENGTH) {
        throw new InvalidRequestError(`Question longer than ${MAX_QUESTION_LENGTH} characters`);
      }
      let conversation = load();
      if (!conversation) {
        conversation = await deps.createConversation(widgetId, deps.pageUrl(), signal);
        save(conversation);
      }
      const {token, conversationId} = conversation;
      try {
        const sent = await deps.sendMessage(token, question, signal);
        const reply = await deps.waitForReply(
          {
            listIds: (s) => deps.listMessageIds(conversationId, s),
            getMessages: (ids, s) => deps.getMessages(token, ids, s),
          },
          {visitorId: participantId(token), askedAt: sent.createdAt, signal},
        );
        onReply({id: reply.id, text: reply.text, done: true});
      } catch (err) {
        // The AI may still answer later, or the stored token may be stale; a fresh conversation
        // keeps a late answer out of the next question and recovers from a rejected token.
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
