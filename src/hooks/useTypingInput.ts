import { useState, useCallback, useRef } from 'react';
import type { CharStatus, TypingResult } from '../types';

interface UseTypingInputOptions {
  targetWord: string;
  onComplete: (result: TypingResult) => void;
  active: boolean;
}

export const useTypingInput = ({ targetWord, onComplete, active }: UseTypingInputOptions) => {
  const [typed, setTyped] = useState('');
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const charStatuses: CharStatus[] = targetWord.split('').map((char, i) => {
    if (i >= typed.length) return { char, status: 'pending' };
    return {
      char,
      status: typed[i] === char ? 'correct' : 'incorrect',
    };
  });

  const handleChange = useCallback(
    (value: string) => {
      if (!active || completedRef.current) return;

      if (!startTimeRef.current) {
        startTimeRef.current = performance.now();
      }

      const clamped = value.slice(0, targetWord.length);
      setTyped(clamped);

      if (clamped.length === targetWord.length) {
        completedRef.current = true;
        const elapsed = (performance.now() - startTimeRef.current!) / 1000;
        const correctChars = clamped.split('').filter((c, i) => c === targetWord[i]).length;
        const accuracy = Math.round((correctChars / targetWord.length) * 100);
        const wpm = Math.round((targetWord.length / 5) / (elapsed / 60));

        onComplete({
          wpm,
          accuracy,
          correctChars,
          totalChars: targetWord.length,
          timeElapsed: elapsed,
        });
      }
    },
    [active, targetWord, onComplete]
  );

  const reset = useCallback(() => {
    setTyped('');
    startTimeRef.current = null;
    completedRef.current = false;
  }, []);

  return { typed, charStatuses, handleChange, reset };
};
