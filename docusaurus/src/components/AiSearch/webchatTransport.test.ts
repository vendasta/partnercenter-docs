import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getAssistantTransport, setAssistantTransport, type AssistantReply} from './assistant';
import {InvalidRequestError} from './webchatClient';
import {ReplyTimeoutError} from './webchatReply';
import {createWebchatTransport, registerWebchatTransport, type WebchatDeps} from './webchatTransport';

/** Unsigned JWT carrying the claims the widget token has. */
function token(participantId: string, widgetId = 'WIDGET-1'): string {
  const payload = btoa(JSON.stringify({participant_id: participantId, widget_id: widgetId}));
  return `e30.${payload.replace(/=+$/, '')}.sig`;
}

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k),
    clear: () => data.clear(),
    key: (i) => [...data.keys()][i] ?? null,
    get length() {
      return data.size;
    },
  };
}

function deps(overrides: Partial<WebchatDeps> = {}): WebchatDeps & {created: number} {
  let created = 0;
  const d = {
    get created() {
      return created;
    },
    storage: memoryStorage(),
    pageUrl: () => 'https://docs.vendasta.com/page',
    createConversation: vi.fn(async () => {
      created += 1;
      return {token: token(`PARTICIPANT-${created}`), conversationId: `CONVERSATION-${created}`};
    }),
    sendMessage: vi.fn(async () => ({messageId: 'MESSAGE-q', createdAt: '2026-10-26T12:00:00Z'})),
    listMessageIds: vi.fn(async () => []),
    getMessages: vi.fn(async () => []),
    waitForReply: vi.fn(async () => ({id: 'MESSAGE-a', text: 'Answer'})),
    ...overrides,
  };
  return d as WebchatDeps & {created: number};
}

const signal = () => new AbortController().signal;

beforeEach(() => setAssistantTransport(null));

describe('webchat transport', () => {
  it('creates a conversation on the first question and reuses it after', async () => {
    const d = deps();
    const transport = createWebchatTransport('WIDGET-1', d);
    const replies: AssistantReply[] = [];
    await transport.ask('First?', (r) => replies.push(r), signal());
    await transport.ask('Second?', () => undefined, signal());
    expect(d.created).toBe(1);
    expect(d.createConversation).toHaveBeenCalledWith('WIDGET-1', 'https://docs.vendasta.com/page', expect.anything());
    expect(replies).toEqual([{id: 'MESSAGE-a', text: 'Answer', done: true}]);
  });

  it('waits for the reply as the visitor, after the stored question', async () => {
    const d = deps();
    await createWebchatTransport('WIDGET-1', d).ask('Q', () => undefined, signal());
    expect(d.waitForReply).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({visitorId: 'PARTICIPANT-1', askedAt: '2026-10-26T12:00:00Z'}),
    );
  });

  it('keeps the conversation across transport instances in the same tab', async () => {
    const d = deps();
    await createWebchatTransport('WIDGET-1', d).ask('Q', () => undefined, signal());
    await createWebchatTransport('WIDGET-1', d).ask('Q again', () => undefined, signal());
    expect(d.created).toBe(1);
  });

  it('starts a new conversation after reset', async () => {
    const d = deps();
    const transport = createWebchatTransport('WIDGET-1', d);
    await transport.ask('Q', () => undefined, signal());
    transport.reset();
    await transport.ask('Q', () => undefined, signal());
    expect(d.created).toBe(2);
  });

  it('starts a new conversation after a timeout so a late reply never answers the next question', async () => {
    const d = deps();
    (d.waitForReply as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new ReplyTimeoutError('late'));
    const transport = createWebchatTransport('WIDGET-1', d);
    await expect(transport.ask('Slow?', () => undefined, signal())).rejects.toBeInstanceOf(ReplyTimeoutError);
    await transport.ask('Next?', () => undefined, signal());
    expect(d.created).toBe(2);
  });

  it('starts a new conversation after an abort', async () => {
    const d = deps();
    (d.waitForReply as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new DOMException('Aborted', 'AbortError'));
    const transport = createWebchatTransport('WIDGET-1', d);
    await expect(transport.ask('Q', () => undefined, signal())).rejects.toMatchObject({name: 'AbortError'});
    await transport.ask('Q', () => undefined, signal());
    expect(d.created).toBe(2);
  });

  it('starts a new conversation after the stored token is rejected', async () => {
    const d = deps();
    const transport = createWebchatTransport('WIDGET-1', d);
    await transport.ask('Q', () => undefined, signal());
    (d.sendMessage as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new InvalidRequestError('invalid token'));
    await expect(transport.ask('Q', () => undefined, signal())).rejects.toBeInstanceOf(InvalidRequestError);
    await transport.ask('Q', () => undefined, signal());
    expect(d.created).toBe(2);
  });

  it('rejects questions over 1000 characters without calling the backend', async () => {
    const d = deps();
    await expect(createWebchatTransport('WIDGET-1', d).ask('x'.repeat(1001), () => undefined, signal())).rejects.toBeInstanceOf(
      InvalidRequestError,
    );
    expect(d.createConversation).not.toHaveBeenCalled();
    expect(d.sendMessage).not.toHaveBeenCalled();
  });

  it('ignores a stored conversation that belongs to another widget', async () => {
    const d = deps();
    await createWebchatTransport('WIDGET-OTHER', d).ask('Q', () => undefined, signal());
    await createWebchatTransport('WIDGET-1', d).ask('Q', () => undefined, signal());
    expect(d.created).toBe(2);
  });

  it('works without sessionStorage', async () => {
    const throwing = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    } as unknown as Storage;
    const d = deps({storage: throwing});
    const transport = createWebchatTransport('WIDGET-1', d);
    await transport.ask('Q', () => undefined, signal());
    await transport.ask('Q', () => undefined, signal());
    expect(d.created).toBe(1);
  });

  it('rejects when the conversation cannot be created', async () => {
    const d = deps({createConversation: vi.fn().mockRejectedValue(new Error('down'))});
    await expect(createWebchatTransport('WIDGET-1', d).ask('Q', () => undefined, signal())).rejects.toThrow('down');
  });
});

describe('registerWebchatTransport', () => {
  it('does not register without a widget ID', () => {
    expect(registerWebchatTransport('')).toBe(false);
    expect(getAssistantTransport()).toBeNull();
  });

  it('registers a transport when a widget ID is configured', () => {
    expect(registerWebchatTransport('WIDGET-1', deps())).toBe(true);
    expect(getAssistantTransport()).not.toBeNull();
  });
});
