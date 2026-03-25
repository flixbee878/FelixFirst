import { useRef, useEffect, useCallback } from 'react';
import { useTypingInput } from '../../hooks/useTypingInput';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { TurnTimer } from './TurnTimer';
import type { TypingResult } from '../../types';

interface AttackWordProps {
  word: string;
  active: boolean;
  onComplete: (result: TypingResult) => void;
  onExpire: () => void;
  timeLimit?: number;
}

export const AttackWord = ({ word, active, onComplete, onExpire, timeLimit = 5000 }: AttackWordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const expiredRef = useRef(false);

  const handleExpire = useCallback(() => {
    if (!expiredRef.current) {
      expiredRef.current = true;
      onExpire();
    }
  }, [onExpire]);

  const { typed, charStatuses, handleChange, reset } = useTypingInput({
    targetWord: word,
    onComplete,
    active,
  });

  const { progress, timeRemaining } = useCountdownTimer(timeLimit, handleExpire, active);

  useEffect(() => {
    if (active) {
      expiredRef.current = false;
      reset();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [active, word, reset]);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1A1A2E, #2a2a4a)',
        border: '4px solid #000',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '4px 4px 0px #000',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: '"Bangers", cursive',
            fontSize: '1rem',
            color: '#FFE234',
            letterSpacing: '2px',
          }}
        >
          ⚔️ TYPE TO ATTACK!
        </span>
      </div>

      {/* Timer */}
      <div style={{ marginBottom: '12px' }}>
        <TurnTimer progress={progress} timeRemaining={timeRemaining} />
      </div>

      {/* Word display */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        {charStatuses.map((cs, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '2rem',
              fontWeight: 'bold',
              color:
                cs.status === 'correct'
                  ? '#34C759'
                  : cs.status === 'incorrect'
                  ? '#FF3B30'
                  : '#fff',
              textDecoration: cs.status === 'incorrect' ? 'underline' : 'none',
              background:
                cs.status === 'incorrect'
                  ? 'rgba(255,59,48,0.2)'
                  : i === typed.length
                  ? 'rgba(255,255,255,0.15)'
                  : 'transparent',
              borderRadius: '4px',
              padding: '0 2px',
              transition: 'color 0.1s, background 0.1s',
            }}
          >
            {cs.char}
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => handleChange(e.target.value)}
        disabled={!active}
        className="typing-input"
        style={{
          background: active ? '#fff' : '#555',
          color: active ? '#000' : '#999',
        }}
        placeholder={active ? 'Type the word above...' : ''}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
};
