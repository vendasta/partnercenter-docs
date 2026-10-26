import {ReplyTimeoutError} from './assistant';
import {InvalidRequestError, type WidgetMessage} from './webchatClient';

/**
 * Wait for the web chat AI's answer to one question. The backend writes the answer as a
 * single message from another participant, so we poll the conversation's message IDs,
 * resolve new ones, and return the first finished message that follows the question.
 */

export type ReplySource = {
  listIds(signal: AbortSignal): Promise<string[]>;
  getMessages(ids: string[], signal: AbortSignal): Promise<WidgetMessage[]>;
};

export type ReplyOptions = {
  /** The visitor's participant ID (from the widget token); their messages are never the reply. */
  visitorId: string;
  /** When the question was stored; only later messages count. */
  askedAt: string;
  signal: AbortSignal;
  pollMs?: number;
  timeoutMs?: number;
};

export {ReplyTimeoutError};

/** Polls in a row that may fail before the wait gives up with the last error. */
const MAX_FAILED_POLLS = 3;

/** The backend has the message but the AI is still writing it. */
const UNFINISHED = new Set(['AI_RECEIVED', 'AI_THINKING']);

function abortError(): DOMException {
  return new DOMException('Aborted', 'AbortError');
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(abortError());
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortError());
    };
    signal.addEventListener('abort', onAbort, {once: true});
  });
}

export async function waitForReply(
  source: ReplySource,
  {visitorId, askedAt, signal, pollMs = 1500, timeoutMs = 60_000}: ReplyOptions,
): Promise<{id: string; text: string}> {
  const askedTime = Date.parse(askedAt);
  const deadline = Date.now() + timeoutMs;
  // Messages that can never become the reply, so they are not fetched again.
  const settled = new Set<string>();
  let failedPolls = 0;

  for (;;) {
    if (signal.aborted) throw abortError();
    try {
      const fresh = (await source.listIds(signal)).filter((id) => !settled.has(id));
      const messages = fresh.length ? await source.getMessages(fresh, signal) : [];
      const replies: WidgetMessage[] = [];
      for (const message of messages) {
        const isReply = message.participantId !== visitorId && Date.parse(message.created) > askedTime;
        if (!isReply) settled.add(message.messageId);
        else if (message.body && !UNFINISHED.has(message.aiStatus ?? '')) replies.push(message);
      }
      failedPolls = 0;
      if (replies.length) {
        const first = replies.sort((a, b) => Date.parse(a.created) - Date.parse(b.created))[0];
        return {id: first.messageId, text: first.body};
      }
    } catch (err) {
      if (signal.aborted) throw abortError();
      // A rejected request will not succeed on retry; a network blip usually will.
      failedPolls += 1;
      if (err instanceof InvalidRequestError || failedPolls >= MAX_FAILED_POLLS) throw err;
    }
    if (Date.now() + pollMs > deadline) throw new ReplyTimeoutError('No reply from the assistant in time');
    await sleep(pollMs, signal);
  }
}
