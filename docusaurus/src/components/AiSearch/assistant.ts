/**
 * In-app assistant bus. The search dialog, header button and results page call
 * `openAssistant()`; the AssistantDrawer (mounted in theme/Root) listens and shows the
 * conversation in our own UI. No third-party widget is involved.
 */

export const ASSISTANT_EVENT = 'ais:assistant';

export type AssistantOpenDetail = {question: string; source: string};

export type AssistantReply = {
  /** Stable id for the reply (message id once known). */
  id: string;
  /** Markdown body; may grow while `done` is false. */
  text: string;
  done: boolean;
};

/**
 * How questions reach the assistant and how answers come back. The UI only depends on
 * this interface, so the backend wiring can change without touching the drawer.
 */
export interface AssistantTransport {
  /** Send a question; call `onReply` as the answer arrives. Resolve when the answer is complete. */
  ask(question: string, onReply: (reply: AssistantReply) => void, signal: AbortSignal): Promise<void>;
  /** Forget the current conversation (new thread). */
  reset(): void;
}

let activeTransport: AssistantTransport | null = null;

export function setAssistantTransport(transport: AssistantTransport | null): void {
  activeTransport = transport;
}

export function getAssistantTransport(): AssistantTransport | null {
  return activeTransport;
}

/** Open the assistant drawer, optionally submitting a question right away. */
export function openAssistant(question = '', source = 'search'): void {
  if (typeof window === 'undefined') return;
  const text = question.trim();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: text ? 'ai_search_ask' : 'ai_assistant_open', search_query: text, source});
  window.dispatchEvent(new CustomEvent<AssistantOpenDetail>(ASSISTANT_EVENT, {detail: {question: text, source}}));
}
