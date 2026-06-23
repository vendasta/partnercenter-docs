import React, { useState } from 'react';
import styles from './KnowledgeCheck.module.css';

type MCQQuestion = {
  type: 'mcq';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type TrueFalseQuestion = {
  type: 'truefalse';
  statement: string;
  correct: boolean;
  explanation: string;
};

type WhichAreaQuestion = {
  type: 'whicharea';
  principle: string;
  correctArea: string;
  explanation: string;
};

type FillBlankQuestion = {
  type: 'fillblank';
  principle: string;
  before: string;
  answer: string;
  after: string;
  hint?: string;
  explanation: string;
};

type MatchQuestion = {
  type: 'match';
  instruction: string;
  pairs: { term: string; definition: string }[];
  explanation: string;
};

type SortQuestion = {
  type: 'sort';
  instruction: string;
  items: { label: string; correctBucket: string }[];
  buckets: { id: string; label: string }[];
  explanation: string;
};

export type Question =
  | MCQQuestion
  | TrueFalseQuestion
  | WhichAreaQuestion
  | FillBlankQuestion
  | MatchQuestion
  | SortQuestion;

export interface KnowledgeCheckProps {
  sessionSize: number;
  questions: Question[];
}

export default function KnowledgeCheck({ sessionSize, questions }: KnowledgeCheckProps) {
  const [session, setSession] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number | Record<string, string> | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(false);

  const startSession = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSession(shuffled.slice(0, sessionSize));
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowFeedback(false);
  };

  const q = session[currentIndex];
  const isLast = currentIndex === session.length - 1;

  const checkAnswer = (answer: string | number | Record<string, string>) => {
    setUserAnswer(answer);
    const correctAnswer = getCorrectAnswer(q);
    const isCorrect = checkCorrectness(q, answer, correctAnswer);
    setCorrect(isCorrect);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (isLast) {
      startSession();
    } else {
      setCurrentIndex((i) => i + 1);
      setUserAnswer(null);
      setShowFeedback(false);
    }
  };

  if (session.length === 0) {
    return (
      <div className={styles.container}>
        <h3>Knowledge Check</h3>
        <p>Test your understanding with {sessionSize} random questions from a pool of {questions.length}.</p>
        <button className={styles.startBtn} onClick={startSession}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        Question {currentIndex + 1} of {session.length}
      </div>
      <QuestionRenderer question={q} onAnswer={checkAnswer} showFeedback={showFeedback} userAnswer={userAnswer} correct={correct} />
      {showFeedback && (
        <div className={styles.feedback}>
          <p className={correct ? styles.correct : styles.incorrect}>
            {correct ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className={styles.explanation}>{q.explanation}</p>
          <button className={styles.nextBtn} onClick={nextQuestion}>
            {isLast ? 'Start Over' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

function getCorrectAnswer(q: Question): string | number | Record<string, string> {
  switch (q.type) {
    case 'mcq':
      return q.correctIndex;
    case 'truefalse':
      return q.correct ? 'true' : 'false';
    case 'whicharea':
      return q.correctArea;
    case 'fillblank':
      return q.answer.toLowerCase();
    case 'match':
      return Object.fromEntries(q.pairs.map((p) => [p.term, p.definition]));
    case 'sort':
      return Object.fromEntries(q.items.map((i) => [i.label, i.correctBucket]));
    default:
      return '';
  }
}

function checkCorrectness(q: Question, userAnswer: string | number | Record<string, string>, correct: string | number | Record<string, string>): boolean {
  if (q.type === 'mcq') return userAnswer === correct;
  if (q.type === 'truefalse') return String(userAnswer) === String(correct);
  if (q.type === 'whicharea') {
    const normalize = (s: string) => s.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
    const u = normalize(String(userAnswer));
    const c = normalize(String(correct));
    return u === c || c.includes(u);
  }
  if (q.type === 'fillblank') return String(userAnswer).toLowerCase().trim() === String(correct).toLowerCase().trim();
  if (q.type === 'match' && typeof userAnswer === 'object' && typeof correct === 'object') {
    return Object.keys(correct).every((k) => (userAnswer as Record<string, string>)[k] === (correct as Record<string, string>)[k]);
  }
  if (q.type === 'sort' && typeof userAnswer === 'object' && typeof correct === 'object') {
    return Object.keys(correct).every((k) => (userAnswer as Record<string, string>)[k] === (correct as Record<string, string>)[k]);
  }
  return false;
}

function WhichAreaWidget({ question, onAnswer, showFeedback, correct }: { question: WhichAreaQuestion; onAnswer: (a: string) => void; showFeedback: boolean; correct: boolean }) {
  const [val, setVal] = useState('');
  return (
    <div className={styles.question}>
      <p><strong>{question.principle}</strong></p>
      <div className={styles.fillInput}>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type the section name"
          disabled={showFeedback}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAnswer(val))}
          className={showFeedback ? (correct ? styles.correctInput : styles.incorrectInput) : ''}
        />
        <button className={styles.checkBtn} disabled={showFeedback} onClick={() => onAnswer(val)}>Check</button>
      </div>
    </div>
  );
}

function MatchWidget({
  question,
  onAnswer,
  showFeedback,
  correct,
  userAnswer,
}: {
  question: MatchQuestion;
  onAnswer: (a: Record<string, string>) => void;
  showFeedback: boolean;
  correct: boolean;
  userAnswer: string | number | Record<string, string> | null;
}) {
  const definitions = [...question.pairs.map((p) => p.definition)].sort(() => Math.random() - 0.5);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleChange = (term: string, definition: string) => {
    setSelections((prev) => ({ ...prev, [term]: definition }));
  };

  const handleCheck = () => {
    onAnswer(selections);
  };

  const correctPairs = Object.fromEntries(question.pairs.map((p) => [p.term, p.definition]));
  const userPairs = showFeedback && typeof userAnswer === 'object' ? userAnswer as Record<string, string> : selections;

  // Definitions already chosen by other terms (can't pick same one twice)
  const usedByOthers = (currentTerm: string) =>
    new Set(Object.entries(selections).filter(([t]) => t !== currentTerm && selections[t]).map(([, d]) => d));

  return (
    <div className={styles.question}>
      <p><strong>{question.instruction}</strong></p>
      <p className={styles.matchHint}>Match each term to its definition using the dropdowns. Each definition is used once.</p>
      <div className={styles.matchGrid}>
        {question.pairs.map(({ term }) => {
          const used = usedByOthers(term);
          return (
            <div key={term} className={styles.matchRow}>
              <span className={styles.matchTerm}>{term}</span>
              <select
                value={selections[term] ?? ''}
                onChange={(e) => handleChange(term, e.target.value)}
                disabled={showFeedback}
                className={
                  showFeedback
                    ? (userPairs[term] === correctPairs[term] ? styles.correctMatch : styles.incorrectMatch)
                    : styles.matchSelect
                }
              >
                <option value="">— Select —</option>
                {definitions.map((def) => (
                  <option key={def} value={def} disabled={used.has(def) && selections[term] !== def}>
                    {def}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <button className={styles.checkBtn} disabled={showFeedback || Object.keys(selections).length < question.pairs.length} onClick={handleCheck}>
        Check
      </button>
    </div>
  );
}

function FillBlankWidget({ question, onAnswer, showFeedback, correct }: { question: FillBlankQuestion; onAnswer: (a: string) => void; showFeedback: boolean; correct: boolean }) {
  const [val, setVal] = useState('');
  const parts = question.principle.split('___');
  return (
    <div className={styles.question}>
      <p>
        <strong>
          {parts[0]}
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={question.hint ?? 'fill in'}
            disabled={showFeedback}
            className={`${styles.inlineInput} ${showFeedback ? (correct ? styles.correctInput : styles.incorrectInput) : ''}`}
          />
          {parts[1] ?? ''}
        </strong>
      </p>
      <button className={styles.checkBtn} disabled={showFeedback} onClick={() => onAnswer(val)}>Check</button>
    </div>
  );
}

interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: string | number | Record<string, string>) => void;
  showFeedback: boolean;
  userAnswer: string | number | Record<string, string> | null;
  correct: boolean;
}

function QuestionRenderer({ question, onAnswer, showFeedback, userAnswer, correct }: QuestionRendererProps) {
  switch (question.type) {
    case 'mcq':
      return (
        <div className={styles.question}>
          <p><strong>{question.question}</strong></p>
          <div className={styles.options}>
            {question.options.map((opt, i) => (
              <button
                key={i}
                disabled={showFeedback}
                onClick={() => onAnswer(i)}
                className={
                  showFeedback
                    ? i === question.correctIndex
                      ? styles.correctBtn
                      : userAnswer === i
                        ? styles.incorrectBtn
                        : ''
                    : userAnswer === i
                      ? styles.selectedBtn
                      : ''
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );

    case 'truefalse':
      return (
        <div className={styles.question}>
          <p><strong>{question.statement}</strong></p>
          <div className={styles.options}>
            <button disabled={showFeedback} onClick={() => onAnswer('true')} className={showFeedback && question.correct ? styles.correctBtn : ''}>
              True
            </button>
            <button disabled={showFeedback} onClick={() => onAnswer('false')} className={showFeedback && !question.correct ? styles.correctBtn : ''}>
              False
            </button>
          </div>
        </div>
      );

    case 'whicharea':
      return (
        <WhichAreaWidget question={question} onAnswer={onAnswer} showFeedback={showFeedback} correct={correct} />
      );

    case 'fillblank':
      return (
        <FillBlankWidget question={question} onAnswer={onAnswer} showFeedback={showFeedback} correct={correct} />
      );

    case 'match':
      return (
        <MatchWidget question={question} onAnswer={onAnswer} showFeedback={showFeedback} correct={correct} userAnswer={userAnswer} />
      );

    case 'sort':
      return (
        <div className={styles.question}>
          <p><strong>{question.instruction}</strong></p>
          <ul>
            {question.items.map((i, idx) => (
              <li key={idx}>{i.label} → {i.correctBucket}</li>
            ))}
          </ul>
          <button className={styles.checkBtn} disabled={showFeedback} onClick={() => onAnswer(Object.fromEntries(question.items.map((i) => [i.label, i.correctBucket])))}>
            I've sorted them
          </button>
        </div>
      );

    default:
      return null;
  }
}
