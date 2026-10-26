import {afterEach, describe, expect, it, vi} from 'vitest';
import {
  createConversation,
  getMessages,
  InvalidRequestError,
  listMessageIds,
  messagesQueryUrl,
  RateLimitError,
  sendMessage,
} from './webchatClient';

const signal = new AbortController().signal;

function mockFetch(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(typeof body === 'string' ? body : JSON.stringify(body), {status}),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function lastRequest(fetchMock: ReturnType<typeof vi.fn>) {
  const [url, init] = fetchMock.mock.calls.at(-1) as [string, RequestInit];
  return {url, headers: init.headers as Record<string, string>, body: JSON.parse(init.body as string)};
}

afterEach(() => vi.unstubAllGlobals());

describe('createConversation', () => {
  it('sends the widget ID and page URL without auth and returns token and conversation', async () => {
    const fetchMock = mockFetch(200, {
      widgetParticipantToken: 'tok',
      conversation: {conversationId: 'CONVERSATION-abc'},
    });
    const result = await createConversation('WIDGET-1', 'https://docs.vendasta.com/x', signal);
    const request = lastRequest(fetchMock);
    expect(request.url).toMatch(/conversation-prod\.apigateway\.co\/conversation\.v1\.ConversationService\/CreateWidgetConversation$/);
    expect(request.headers.Authorization).toBeUndefined();
    expect(request.body).toEqual({widgetId: 'WIDGET-1', chatSourceUrl: 'https://docs.vendasta.com/x'});
    expect(result).toEqual({token: 'tok', conversationId: 'CONVERSATION-abc'});
  });

  it('rejects a response without a token', async () => {
    mockFetch(200, {conversation: {conversationId: 'CONVERSATION-abc'}});
    await expect(createConversation('WIDGET-1', 'u', signal)).rejects.toThrow(/no conversation/);
  });
});

describe('sendMessage', () => {
  it('sends the bearer token, message type and Business App location', async () => {
    const fetchMock = mockFetch(200, {messageId: 'MESSAGE-1', createdAt: '2026-10-26T00:00:00Z'});
    await sendMessage('tok', 'How do I add a user?', signal);
    const request = lastRequest(fetchMock);
    expect(request.url).toMatch(/SendWidgetMessage$/);
    expect(request.headers.Authorization).toBe('Bearer tok');
    expect(request.body).toEqual({
      type: 'MESSAGE_TYPE_MESSAGE',
      body: 'How do I add a user?',
      location: 'PLATFORM_LOCATION_BUSINESS_APP',
    });
  });

  it('maps 429 to RateLimitError and 400 to InvalidRequestError', async () => {
    mockFetch(429, 'slow down');
    await expect(sendMessage('tok', 'q', signal)).rejects.toBeInstanceOf(RateLimitError);
    mockFetch(400, 'too long');
    await expect(sendMessage('tok', 'q', signal)).rejects.toBeInstanceOf(InvalidRequestError);
  });

  it('propagates network failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(sendMessage('tok', 'q', signal)).rejects.toThrow('Failed to fetch');
  });

  it('passes the abort signal through', async () => {
    const controller = new AbortController();
    controller.abort();
    vi.stubGlobal('fetch', vi.fn((_url: string, init: RequestInit) => {
      expect(init.signal?.aborted).toBe(true);
      return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }));
    await expect(sendMessage('tok', 'q', controller.signal)).rejects.toMatchObject({name: 'AbortError'});
  });
});

describe('getMessages', () => {
  it('skips the call when there are no IDs', async () => {
    const fetchMock = mockFetch(200, {});
    expect(await getMessages('tok', [], signal)).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('requests the given IDs with the token', async () => {
    const fetchMock = mockFetch(200, {messages: [{messageId: 'MESSAGE-2', participantId: 'p2', body: 'hi', created: 't'}]});
    const messages = await getMessages('tok', ['MESSAGE-2'], signal);
    expect(lastRequest(fetchMock).body).toEqual({messageIds: ['MESSAGE-2']});
    expect(messages[0].body).toBe('hi');
  });
});

describe('listMessageIds', () => {
  it('queries the conversation path without the CONVERSATION- prefix', () => {
    expect(messagesQueryUrl('CONVERSATION-abc')).toContain('/documents/conversation/env/prod/abc:runQuery?key=');
  });

  it('carries the deleted, channel and type filters, newest first', async () => {
    const fetchMock = mockFetch(200, [{readTime: 't'}]);
    await listMessageIds('CONVERSATION-abc', signal);
    const query = lastRequest(fetchMock).body.structuredQuery;
    const filters = query.where.compositeFilter.filters.map((f: {fieldFilter: {field: {fieldPath: string}; op: string}}) => [
      f.fieldFilter.field.fieldPath,
      f.fieldFilter.op,
    ]);
    expect(filters).toEqual([
      ['deleted', 'EQUAL'],
      ['channel', 'EQUAL'],
      ['type', 'IN'],
    ]);
    expect(query.where.compositeFilter.filters[0].fieldFilter.value).toEqual({timestampValue: '1970-01-01T03:00:00Z'});
    expect(query.orderBy).toEqual([{field: {fieldPath: 'created'}, direction: 'DESCENDING'}]);
  });

  it('reads message IDs from the messageId field and handles an empty result', async () => {
    mockFetch(200, [
      {document: {name: '.../messages/xyz', fields: {messageId: {stringValue: 'MESSAGE-xyz'}}}},
      {document: {name: '.../messages/abc', fields: {messageId: {stringValue: 'MESSAGE-abc'}}}},
    ]);
    expect(await listMessageIds('CONVERSATION-abc', signal)).toEqual(['MESSAGE-xyz', 'MESSAGE-abc']);
    mockFetch(200, [{readTime: 't'}]);
    expect(await listMessageIds('CONVERSATION-abc', signal)).toEqual([]);
  });

  it('raises InvalidRequestError when Firestore refuses the query', async () => {
    mockFetch(403, {error: {status: 'PERMISSION_DENIED'}});
    await expect(listMessageIds('CONVERSATION-abc', signal)).rejects.toBeInstanceOf(InvalidRequestError);
  });
});

describe('request timeout', () => {
  it('fails a hung request after 20 seconds as an ordinary error', async () => {
    vi.useFakeTimers();
    try {
      vi.stubGlobal(
        'fetch',
        vi.fn(
          (_url: string, init: RequestInit) =>
            new Promise((_resolve, reject) =>
              init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError'))),
            ),
        ),
      );
      const result = sendMessage('tok', 'q', signal);
      const assertion = expect(result).rejects.toThrow('Request timed out');
      await vi.advanceTimersByTimeAsync(20_000);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });
});
