import React, { useEffect, useRef, useState } from 'react';
import styles from './KnowledgeCheck.module.css';
import {
  Question,
  QuestionRenderer,
  getCorrectAnswer,
  checkCorrectness,
} from './KnowledgeCheck';

type UserAnswer = string | number | Record<string, string>;

interface AnswerRecord {
  questionId: string;
  questionText: string;
  correct: boolean;
}

export interface SkillCheckProps {
  /** How many questions to serve. Pool may be larger, for variety across attempts. */
  sessionSize: number;
  questions: Question[];
  /** Optional line naming what the check covers. */
  intro?: string;
  title?: string;
}

const PASS_THRESHOLD = 0.7;

export default function SkillCheck({
  sessionSize,
  questions,
  intro,
  title = 'Skill Check',
}: SkillCheckProps) {
  const [session, setSession] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // On a long question the verdict, explanation, and Next button all land below
  // the fold, so answering looks like nothing happened. `nearest` keeps the page
  // still when the feedback is already on screen.
  useEffect(() => {
    if (showFeedback) {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showFeedback]);

  const startSession = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSession(shuffled.slice(0, sessionSize).map(shuffleOptions));
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowFeedback(false);
    setRecords([]);
    setFinished(false);
  };

  const q = session[currentIndex];
  const isLast = currentIndex === session.length - 1;

  const checkAnswer = (answer: UserAnswer) => {
    setUserAnswer(answer);
    const isCorrect = checkCorrectness(q, answer, getCorrectAnswer(q));
    setCorrect(isCorrect);
    setShowFeedback(true);
    setRecords((prev) => [
      ...prev,
      {
        questionId: `${currentIndex}-${getQuestionText(q).slice(0, 40)}`,
        questionText: getQuestionText(q),
        correct: isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setUserAnswer(null);
      setShowFeedback(false);
    }
  };

  if (session.length === 0) {
    const served = Math.min(sessionSize, questions.length);
    return (
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>
          {intro ?? `Test your understanding with ${served} questions`}
          {`. You need ${Math.round(PASS_THRESHOLD * 100)}% to pass.`}
        </p>
        <button type="button" className={styles.startBtn} onClick={startSession}>
          Start
        </button>
      </div>
    );
  }

  if (finished) {
    const score = records.filter((r) => r.correct).length;
    const passed = score >= records.length * PASS_THRESHOLD;
    const missed = records.filter((r) => !r.correct);
    return (
      <div className={styles.container}>
        <h3>{title} — Results</h3>
        <p className={styles.score}>
          You scored <strong>{score} of {records.length}</strong>
          {records.length > 0 ? ` (${Math.round((score / records.length) * 100)}%)` : ''}.
        </p>
        <p className={passed ? styles.passedText : styles.failedText}>
          {passed
            ? 'Nice work, you passed this skill check.'
            : 'Not quite there yet. Review the material and try again.'}
        </p>
        {missed.length > 0 && (
          <div className={styles.missedList}>
            <p className={styles.missedHeading}>Worth revisiting:</p>
            <ul>
              {missed.map((r) => (
                <li key={r.questionId}>{r.questionText}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" className={styles.nextBtn} onClick={startSession}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        Question {currentIndex + 1} of {session.length}
      </div>
      <QuestionRenderer
        question={q}
        onAnswer={checkAnswer}
        showFeedback={showFeedback}
        userAnswer={userAnswer}
        correct={correct}
      />
      {showFeedback && (
        <div className={styles.feedback} ref={feedbackRef}>
          <p className={correct ? styles.correct : styles.incorrect}>
            {correct ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className={styles.explanation}>{q.explanation}</p>
          <button type="button" className={styles.nextBtn} onClick={nextQuestion}>
            {isLast ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Randomize an MCQ's option order and move correctIndex with it. Without this,
 * a set authored with the right answer written first is trivially gameable, and
 * authors should not have to hand-scatter correct positions to avoid a pattern.
 * Other question types pass through untouched.
 */
function shuffleOptions(q: Question): Question {
  if (q.type !== 'mcq') return q;
  const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correctIndex: order.indexOf(q.correctIndex),
  };
}

function getQuestionText(q: Question): string {
  switch (q.type) {
    case 'mcq':
      return q.question;
    case 'truefalse':
      return q.statement;
    case 'whicharea':
    case 'fillblank':
      return q.principle;
    case 'match':
    case 'sort':
      return q.instruction;
    default:
      return '';
  }
}
