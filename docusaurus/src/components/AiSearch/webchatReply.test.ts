import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import type {WidgetMessage} from './webchatClient';
import {ReplyTimeoutError, waitForReply, type ReplySource} from './webchatReply';

const VISITOR = 'PARTICIPANT-visitor';
const AI = 'PARTICIPANT-ai';
const ASKED_AT = '2026-10-26T12:00:00Z';

function msg(id: string, participantId: string, body: string, created: string, aiStatus?: string): WidgetMessage {
  return {messageId: id, participantId, body, created, aiStatus};
}

/** A fake backend whose message list changes poll by poll. */
function source(polls: WidgetMessage[][]) {
  let poll = 0;
  const byId = new Map<string, WidgetMessage>();
  const fetched: string[][] = [];
  const src: ReplySource = {
    listIds: vi.fn(async () => {
      const messages = polls[Math.min(poll, polls.length - 1)];
      poll += 1;
      messages.forEach((m) => byId.set(m.messageId, m));
      return messages.map((m) => m.messageId);
    }),
    getMessages: vi.fn(async (ids: string[]) => {
      fetched.push(ids);
      return ids.map((id) => byId.get(id)!).filter(Boolean);
    }),
  };
  return {src, fetched};
}

const options = (signal = new AbortController().signal) => ({
  visitorId: VISITOR,
  askedAt: ASKED_AT,
  signal,
  pollMs: 1000,
  timeoutMs: 10_000,
});

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('waitForReply', () => {
  it('returns the AI reply once it appears', async () => {
    const question = msg('MESSAGE-q', VISITOR, 'How?', '2026-10-26T12:00:00Z');
    const answer = msg('MESSAGE-a', AI, 'Like this.', '2026-10-26T12:00:04Z', 'AI_THOUGHT');
    const {src} = source([[question], [question], [answer, question]]);
    const reply = waitForReply(src, options());
    await vi.advanceTimersByTimeAsync(3000);
    await expect(reply).resolves.toEqual({id: 'MESSAGE-a', text: 'Like this.'});
  });

  it("ignores the visitor's own messages and replies from before the question", async () => {
    const oldAnswer = msg('MESSAGE-old', AI, 'Old answer', '2026-10-26T11:59:00Z', 'AI_THOUGHT');
    const question = msg('MESSAGE-q', VISITOR, 'New question', '2026-10-26T12:00:00Z');
    const answer = msg('MESSAGE-a', AI, 'New answer', '2026-10-26T12:00:05Z');
    const {src} = source([[question, oldAnswer], [answer, question, oldAnswer]]);
    const reply = waitForReply(src, options());
    await vi.advanceTimersByTimeAsync(2000);
    await expect(reply).resolves.toMatchObject({text: 'New answer'});
  });

  it('keeps waiting while the reply is still being generated or empty', async () => {
    const thinking = msg('MESSAGE-a', AI, '', '2026-10-26T12:00:02Z', 'AI_THINKING');
    const done = msg('MESSAGE-a', AI, 'Done now.', '2026-10-26T12:00:02Z', 'AI_THOUGHT');
    const {src, fetched} = source([[thinking], [thinking], [done]]);
    const reply = waitForReply(src, options());
    await vi.advanceTimersByTimeAsync(3000);
    await expect(reply).resolves.toMatchObject({text: 'Done now.'});
    // An unfinished reply is fetched again; finished non-replies are not.
    expect(fetched.flat().filter((id) => id === 'MESSAGE-a').length).toBeGreaterThan(1);
  });

  it('only fetches each settled message once', async () => {
    const question = msg('MESSAGE-q', VISITOR, 'q', '2026-10-26T12:00:00Z');
    const answer = msg('MESSAGE-a', AI, 'a', '2026-10-26T12:00:03Z');
    const {src, fetched} = source([[question], [question], [answer, question]]);
    const reply = waitForReply(src, options());
    await vi.advanceTimersByTimeAsync(3000);
    await reply;
    expect(fetched).toEqual([['MESSAGE-q'], ['MESSAGE-a']]);
  });

  it('throws a timeout error when no reply arrives in time', async () => {
    const {src} = source([[msg('MESSAGE-q', VISITOR, 'q', ASKED_AT)]]);
    const reply = waitForReply(src, options());
    const assertion = expect(reply).rejects.toBeInstanceOf(ReplyTimeoutError);
    await vi.advanceTimersByTimeAsync(11_000);
    await assertion;
  });

  it('stops polling quietly when aborted', async () => {
    const controller = new AbortController();
    const {src} = source([[msg('MESSAGE-q', VISITOR, 'q', ASKED_AT)]]);
    const reply = waitForReply(src, options(controller.signal));
    await vi.advanceTimersByTimeAsync(1500);
    controller.abort();
    const assertion = expect(reply).rejects.toMatchObject({name: 'AbortError'});
    await vi.advanceTimersByTimeAsync(5000);
    await assertion;
    const calls = (src.listIds as ReturnType<typeof vi.fn>).mock.calls.length;
    await vi.advanceTimersByTimeAsync(5000);
    expect((src.listIds as ReturnType<typeof vi.fn>).mock.calls.length).toBe(calls);
  });

  it('retries after a transient poll failure', async () => {
    const answer = msg('MESSAGE-a', AI, 'Recovered.', '2026-10-26T12:00:03Z');
    const {src} = source([[answer]]);
    (src.listIds as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const reply = waitForReply(src, options());
    await vi.advanceTimersByTimeAsync(2000);
    await expect(reply).resolves.toMatchObject({text: 'Recovered.'});
  });
});
