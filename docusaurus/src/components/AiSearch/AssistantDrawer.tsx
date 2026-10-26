import React, {useCallback, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  ASSISTANT_EVENT,
  getAssistantTransport,
  type AssistantOpenDetail,
  type AssistantReply,
} from './assistant';
import {AI_SEARCH_LOCALES} from './config';
import {renderMarkdown} from './markdown';
import {InvalidRequestError, RateLimitError} from './webchatClient';
import {ReplyTimeoutError} from './webchatReply';
import {MAX_QUESTION_LENGTH} from './webchatTransport';
import {SparklesIcon} from './Icons';
import './aiSearch.css';

type Turn =
  | {role: 'user'; id: string; text: string}
  | {role: 'assistant'; id: string; text: string; done: boolean; error?: string};

const THREAD_KEY = 'ais-assistant-thread';

function loadThread(): Turn[] {
  try {
    const raw = sessionStorage.getItem(THREAD_KEY);
    return raw ? (JSON.parse(raw) as Turn[]) : [];
  } catch {
    return [];
  }
}

function saveThread(turns: Turn[]): void {
  try {
    sessionStorage.setItem(THREAD_KEY, JSON.stringify(turns));
  } catch {
    // Storage unavailable; the thread lives in memory only.
  }
}

/** The message shown in the assistant bubble when a question fails. */
function errorMessage(err: unknown): string {
  if (err instanceof RateLimitError) {
    return translate({id: 'aiSearch.assistant.rateLimited', message: 'Too many questions. Wait a minute and try again.'});
  }
  if (err instanceof InvalidRequestError) {
    return translate({id: 'aiSearch.assistant.tooLong', message: 'That question is too long. Shorten it and try again.'});
  }
  if (err instanceof ReplyTimeoutError) {
    return translate({id: 'aiSearch.assistant.timeout', message: "The assistant didn't answer in time. Please try again."});
  }
  return translate({id: 'aiSearch.assistant.failed', message: 'Something went wrong. Please try again.'});
}

/**
 * Stripe-style assistant panel: a right-hand drawer with the conversation and a composer.
 * Mounted once in theme/Root so it survives client-side navigation.
 */
export default function AssistantDrawer(): React.ReactElement | null {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const enabled = AI_SEARCH_LOCALES.includes(currentLocale);

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setTurns(loadThread());
  }, []);

  useEffect(() => {
    saveThread(turns);
    threadRef.current?.scrollTo({top: threadRef.current.scrollHeight});
  }, [turns]);

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text || busy) return;
      const transport = getAssistantTransport();
      const userTurn: Turn = {role: 'user', id: `u-${Date.now()}`, text};
      const replyId = `a-${Date.now()}`;
      setTurns((prev) => [...prev, userTurn, {role: 'assistant', id: replyId, text: '', done: false}]);
      setDraft('');

      if (!transport) {
        setTurns((prev) =>
          prev.map((t) =>
            t.id === replyId
              ? {
                  ...t,
                  done: true,
                  error: translate({
                    id: 'aiSearch.assistant.notConfigured',
                    message: 'The assistant connection is not configured yet.',
                  }),
                }
              : t,
          ),
        );
        return;
      }

      setBusy(true);
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const onReply = (reply: AssistantReply) => {
        setTurns((prev) =>
          prev.map((t) => (t.id === replyId ? {...t, text: reply.text, done: reply.done} : t)),
        );
      };
      try {
        await transport.ask(text, onReply, controller.signal);
        setTurns((prev) => prev.map((t) => (t.id === replyId ? {...t, done: true} : t)));
      } catch (err) {
        if (!controller.signal.aborted) {
          const error = errorMessage(err);
          setTurns((prev) => prev.map((t) => (t.id === replyId ? {...t, done: true, error} : t)));
        }
      } finally {
        setBusy(false);
      }
    },
    [busy],
  );

  // Open requests from the search dialog, header button and results page.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const {question} = (event as CustomEvent<AssistantOpenDetail>).detail;
      setOpen(true);
      if (question) void ask(question);
      else setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener(ASSISTANT_EVENT, onOpen);
    return () => window.removeEventListener(ASSISTANT_EVENT, onOpen);
  }, [ask]);

  useEffect(() => {
    document.body.classList.toggle('ais-drawer-open', open);
    return () => document.body.classList.remove('ais-drawer-open');
  }, [open]);

  const newThread = () => {
    abortRef.current?.abort();
    getAssistantTransport()?.reset();
    setTurns([]);
    setBusy(false);
    inputRef.current?.focus();
  };

  if (!enabled || !open) return null;

  return (
    <aside className="ais-drawer" aria-label={translate({id: 'aiSearch.assistant.label', message: 'AI assistant'})}>
      <header className="ais-drawer__header">
        <span className="ais-drawer__title">
          <SparklesIcon size={16} /> {translate({id: 'aiSearch.assistant.title', message: 'AI assistant'})}
        </span>
        <span className="ais-drawer__actions">
          <button type="button" className="ais-drawer__btn" onClick={newThread}>
            {translate({id: 'aiSearch.assistant.new', message: 'New chat'})}
          </button>
          <button type="button" className="ais-drawer__btn ais-drawer__close" onClick={() => setOpen(false)} aria-label="Close assistant">
            ✕
          </button>
        </span>
      </header>

      <div className="ais-drawer__thread" ref={threadRef}>
        {turns.length === 0 && (
          <p className="ais-drawer__intro">
            {translate({
              id: 'aiSearch.assistant.intro',
              message: 'Ask anything about Partner Center, Business App or the Vendasta platform. Answers come from the documentation and link to the pages they are based on.',
            })}
          </p>
        )}
        {turns.map((turn) =>
          turn.role === 'user' ? (
            <div key={turn.id} className="ais-msg ais-msg--user">
              {turn.text}
            </div>
          ) : (
            <div key={turn.id} className="ais-msg ais-msg--assistant">
              {turn.error ? (
                <p className="ais-msg__error">{turn.error}</p>
              ) : turn.text ? (
                <div className="ais-msg__md" dangerouslySetInnerHTML={{__html: renderMarkdown(turn.text)}} />
              ) : (
                <span className="ais-msg__thinking" aria-live="polite">
                  {translate({id: 'aiSearch.assistant.thinking', message: 'Thinking…'})}
                </span>
              )}
            </div>
          ),
        )}
      </div>

      <form
        className="ais-drawer__composer"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(draft);
        }}>
        <textarea
          ref={inputRef}
          value={draft}
          rows={1}
          maxLength={MAX_QUESTION_LENGTH}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void ask(draft);
            }
          }}
          placeholder={translate({id: 'aiSearch.assistant.placeholder', message: 'Ask a question…'})}
          aria-label={translate({id: 'aiSearch.assistant.placeholder', message: 'Ask a question…'})}
        />
        <button type="submit" className="ais-drawer__send" disabled={busy || !draft.trim()}>
          {translate({id: 'aiSearch.assistant.send', message: 'Send'})}
        </button>
      </form>
      <p className="ais-drawer__note">
        {translate({id: 'aiSearch.assistant.note', message: 'AI-generated. Check the linked docs before relying on an answer.'})}
      </p>
    </aside>
  );
}
