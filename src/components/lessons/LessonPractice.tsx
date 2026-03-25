import { useState, useRef, useEffect, useCallback } from 'react';
import type { Lesson, TypingResult } from '../../types';
import { useTypingInput } from '../../hooks/useTypingInput';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';

interface LessonPracticeProps {
  lesson: Lesson;
}

export const LessonPractice = ({ lesson }: LessonPracticeProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [results, setResults] = useState<TypingResult[]>([]);
  const [done, setDone] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSpeedDrill = lesson.category === 'speed_drill';
  const timeLimit = isSpeedDrill ? 30000 : 999999;

  const currentWord = lesson.words[wordIndex] || '';

  const handleComplete = useCallback(
    (result: TypingResult) => {
      setResults((prev) => [...prev, result]);
      const next = wordIndex + 1;
      if (next >= lesson.words.length) {
        setIsActive(false);
        setDone(true);
      } else {
        setWordIndex(next);
      }
    },
    [wordIndex, lesson.words.length]
  );

  const handleExpire = useCallback(() => {
    if (isSpeedDrill) {
      setIsActive(false);
      setDone(true);
    }
  }, [isSpeedDrill]);

  const { typed, charStatuses, handleChange, reset } = useTypingInput({
    targetWord: currentWord,
    onComplete: handleComplete,
    active: isActive && !done,
  });

  const { progress, timeRemaining } = useCountdownTimer(timeLimit, handleExpire, isActive && !done && isSpeedDrill);

  useEffect(() => {
    reset();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [wordIndex, reset]);

  const restart = () => {
    setWordIndex(0);
    setResults([]);
    setDone(false);
    setIsActive(true);
  };

  const avgWpm = results.length > 0
    ? Math.round(results.reduce((a, r) => a + r.wpm, 0) / results.length)
    : 0;
  const avgAccuracy = results.length > 0
    ? Math.round(results.reduce((a, r) => a + r.accuracy, 0) / results.length)
    : 0;

  if (done) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
        <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#34C759', margin: '0 0 8px', letterSpacing: '2px' }}>
          LESSON COMPLETE!
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <StatBadge label="Avg WPM" value={avgWpm} color="#007AFF" />
          <StatBadge label="Accuracy" value={`${avgAccuracy}%`} color="#34C759" />
          <StatBadge label="Words" value={results.length} color="#FF8C00" />
        </div>
        <button className="cartoon-btn" onClick={restart} style={{ background: '#FFE234' }}>
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Progress */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.9rem', fontWeight: 'bold' }}>
            Progress: {wordIndex + 1} / {lesson.words.length}
          </span>
          {isSpeedDrill && (
            <span style={{ fontFamily: '"Bangers", cursive', fontSize: '1.1rem', color: timeRemaining < 10000 ? '#FF3B30' : '#007AFF' }}>
              {Math.ceil(timeRemaining / 1000)}s
            </span>
          )}
        </div>
        <div style={{ height: '10px', background: '#ddd', border: '2px solid #000', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            width: `${((wordIndex) / lesson.words.length) * 100}%`,
            height: '100%',
            background: '#007AFF',
            transition: 'width 0.3s',
          }} />
        </div>
        {isSpeedDrill && (
          <div style={{ height: '6px', background: '#ffecec', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: progress > 0.5 ? '#34C759' : progress > 0.25 ? '#FF8C00' : '#FF3B30',
              transition: 'width 0.05s linear',
            }} />
          </div>
        )}
      </div>

      {/* Word display */}
      <div
        style={{
          background: '#1A1A2E',
          border: '3px solid #000',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {charStatuses.map((cs, i) => (
            <span
              key={i}
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                color: cs.status === 'correct' ? '#34C759' : cs.status === 'incorrect' ? '#FF3B30' : '#fff',
                background: i === typed.length ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderRadius: '4px',
                padding: '0 2px',
              }}
            >
              {cs.char}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => handleChange(e.target.value)}
          className="typing-input"
          placeholder="Type the word..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {/* Upcoming words */}
      {lesson.words.length > wordIndex + 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem', color: '#666' }}>Up next:</span>
          {lesson.words.slice(wordIndex + 1, wordIndex + 5).map((w, i) => (
            <span key={i} style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '0.9rem',
              color: '#888',
              background: '#f0f0f0',
              border: '2px solid #ccc',
              borderRadius: '6px',
              padding: '2px 8px',
            }}>
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const StatBadge = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div style={{
    background: color,
    border: '3px solid #000',
    borderRadius: '12px',
    padding: '10px 16px',
    boxShadow: '3px 3px 0px #000',
    textAlign: 'center',
  }}>
    <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.6rem', color: '#fff', lineHeight: 1 }}>{value}</div>
    <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)' }}>{label}</div>
  </div>
);
