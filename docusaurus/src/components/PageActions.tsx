import React, {type ReactNode, useState} from 'react';
import clsx from 'clsx';
import ChatGPTLogo from '@site/static/img/chatgpt.svg';
import ClaudeLogo from '@site/static/img/claude.svg';
import PerplexityLogo from '@site/static/img/perplexity.svg';
import GeminiLogo from '@site/static/img/gemini.svg';
import GrokLogo from '@site/static/img/grok.svg';
import {MdContentCopy} from 'react-icons/md';
import TurndownService from 'turndown';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import siteConfig from '@generated/docusaurus.config';
import styles from './PageActions.module.css';

const CLAUDE_PROMPT_MAX_LENGTH = 7000;
const GITHUB_DEFAULT_BRANCH = 'master';
const SITE_DIRECTORY_IN_REPO = 'docusaurus';

const {organizationName, projectName} = siteConfig;

const GITHUB_BLOB_BASE_URL = `https://github.com/${organizationName}/${projectName}/blob/${GITHUB_DEFAULT_BRANCH}/`;
const GITHUB_RAW_BASE_URL = `https://raw.githubusercontent.com/${organizationName}/${projectName}/${GITHUB_DEFAULT_BRANCH}/`;

interface ClaudeSourceInfo {
  repoPath: string;
  blobUrl: string;
  rawUrl: string;
}

const getArticleMarkdown = (): string => {
  if (typeof window === 'undefined') return '';
  const article = document.querySelector('article');
  if (!article) return '';
  const turndown = new TurndownService();
  return turndown.turndown(article.innerHTML);
};

const toRepoPathFromSource = (source: string | undefined): ClaudeSourceInfo | null => {
  if (!source) return null;
  const withoutAlias = source.replace(/^@site\//, '');
  const repoPath = withoutAlias.startsWith(`${SITE_DIRECTORY_IN_REPO}/`)
    ? withoutAlias
    : `${SITE_DIRECTORY_IN_REPO}/${withoutAlias}`;
  return {
    repoPath,
    blobUrl: `${GITHUB_BLOB_BASE_URL}${repoPath}`,
    rawUrl: `${GITHUB_RAW_BASE_URL}${repoPath}`
  };
};

const buildClaudePrompt = ({
  pageUrl,
  markdown,
  sourceInfo
}: {
  pageUrl: string;
  markdown: string;
  sourceInfo: ClaudeSourceInfo | null;
}): string => {
  const basePrompt = `You are assisting me with the Partner Center documentation page at ${pageUrl}. Summarize the content and be prepared to answer follow-up questions.`;

  if (markdown) {
    const sectionHeader = '\n\n---\nPage content (Markdown):\n';
    const fullPrompt = `${basePrompt}${sectionHeader}${markdown}`;
    if (fullPrompt.length <= CLAUDE_PROMPT_MAX_LENGTH) {
      return fullPrompt;
    }
  }

  if (sourceInfo) {
    return `${basePrompt}\n\nThe entire Markdown source for this page is publicly available here:\n${sourceInfo.rawUrl}\n\n(Readable GitHub view: ${sourceInfo.blobUrl})\n\nPlease reference that file so you have the full content before helping me.`;
  }

  return `${basePrompt}\n\nThe full content could not be embedded automatically. Please reference the page directly if you need additional details.`;
};

const useOptionalDoc = (): ReturnType<typeof useDoc> | null => {
  try {
    return useDoc();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'PageActions: Docs context is unavailable; continuing without doc metadata.',
        error
      );
    }
    return null;
  }
};

interface PageActionsProps {
  className?: string;
  direction?: 'row' | 'column';
  align?: 'start' | 'end' | 'center';
}

export default function PageActions({
  className,
  direction = 'column',
  align = 'start'
}: PageActionsProps): ReactNode {
  const [copied, setCopied] = useState(false);
  const docContext = useOptionalDoc();
  const claudeSourceInfo = toRepoPathFromSource(docContext?.metadata?.source);

  const getPrompt = () => {
    if (typeof window === 'undefined') return '';
    const url = window.location.href;
    return `Please open ${url} and summarize the information for me. I will ask you questions afterwards about my specific situation.`;
  };

  const handleOpenChatGPT = () => {
    if (typeof window === 'undefined') return;
    const prompt = getPrompt();
    const chatUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    window.open(chatUrl, '_blank');
  };

  const handleOpenClaude = () => {
    if (typeof window === 'undefined') return;
    const pageUrl = window.location.href;
    const markdown = getArticleMarkdown();
    const prompt = buildClaudePrompt({
      pageUrl,
      markdown,
      sourceInfo: claudeSourceInfo
    });
    const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
    window.open(claudeUrl, '_blank');
  };

  const handleOpenPerplexity = () => {
    if (typeof window === 'undefined') return;
    const prompt = getPrompt();
    const perplexityUrl = `https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`;
    window.open(perplexityUrl, '_blank');
  };

  const handleOpenGemini = () => {
    if (typeof window === 'undefined') return;
    const prompt = getPrompt();
    const geminiUrl = `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(prompt)}`;
    window.open(geminiUrl, '_blank');
  };

  const handleOpenGrok = () => {
    if (typeof window === 'undefined') return;
    const prompt = getPrompt();
    const grokUrl = `https://x.com/i/grok?text=${encodeURIComponent(prompt)}`;
    window.open(grokUrl, '_blank');
  };

  const handleCopyMarkdown = async () => {
    if (typeof window === 'undefined') return;
    const markdown = getArticleMarkdown();
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy markdown', err);
    }
  };

  return (
    <div
      className={clsx(
        styles.pageActions,
        styles[`direction-${direction}`],
        styles[`align-${align}`],
        className
      )}
    >
      <button
        type="button"
        className={clsx(styles.openChatGPTLink, styles.pageAction)}
        onClick={handleOpenChatGPT}
      >
        <ChatGPTLogo
          className={styles.chatgptIcon}
          width="1em"
          height="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="ChatGPT logo"
        />
        Open in ChatGPT
      </button>
      <button
        type="button"
        className={clsx(styles.openAILink, styles.pageAction)}
        onClick={handleOpenClaude}
      >
        <ClaudeLogo
          className={styles.aiIcon}
          width="1em"
          height="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="Claude logo"
        />
        Open in Claude
      </button>
      <button
        type="button"
        className={clsx(styles.openAILink, styles.pageAction)}
        onClick={handleOpenPerplexity}
      >
        <PerplexityLogo
          className={styles.aiIcon}
          width="1em"
          height="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="Perplexity logo"
        />
        Open in Perplexity
      </button>
      <button
        type="button"
        className={clsx(styles.openAILink, styles.pageAction)}
        onClick={handleOpenGemini}
      >
        <GeminiLogo
          className={styles.aiIcon}
          width="1em"
          height="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="Gemini logo"
        />
        Open in Gemini
      </button>
      <button
        type="button"
        className={clsx(styles.openAILink, styles.pageAction)}
        onClick={handleOpenGrok}
      >
        <GrokLogo
          className={styles.aiIcon}
          width="1em"
          height="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="Grok logo"
        />
        Open in Grok
      </button>
      <button
        type="button"
        className={clsx(styles.copyMarkdownLink, styles.pageAction)}
        onClick={handleCopyMarkdown}
      >
        <MdContentCopy
          className={styles.copyIcon}
          size="1em"
          style={{verticalAlign: 'text-bottom'}}
          aria-label="Copy icon"
        />
        {copied ? 'Copied!' : 'Copy as Markdown'}
      </button>
    </div>
  );
}

