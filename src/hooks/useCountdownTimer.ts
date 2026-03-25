import { useState, useEffect, useRef } from 'react';

export const useCountdownTimer = (
  durationMs: number,
  onExpire: () => void,
  active: boolean
) => {
  const [timeRemaining, setTimeRemaining] = useState(durationMs);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!active) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      setTimeRemaining(durationMs);
      startTimeRef.current = null;
      firedRef.current = false;
      return;
    }

    firedRef.current = false;
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (!startTimeRef.current) return;
      const elapsed = now - startTimeRef.current;
      const remaining = Math.max(0, durationMs - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0 && !firedRef.current) {
        firedRef.current = true;
        onExpireRef.current();
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, durationMs]);

  const progress = timeRemaining / durationMs;

  return { timeRemaining, progress };
};
