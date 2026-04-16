import { useState, useEffect, useRef, useCallback } from 'react';

const KEYS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ROUNDS = 10;
const START_TIME = 2200;
const MIN_TIME = 600;
const SPEED_STEP = 150;

export const KeyReflex = ({ onBack }: { onBack: () => void }) => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'done'>('ready');
  const [currentKey, setCurrentKey] = useState('');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null);
  const [timeBar, setTimeBar] = useState(100);
  const [, setReactionTimes] = useState<number[]>([]);
  const roundRef = useRef(0);
  const scoreRef = useRef(0);
  const reactionsRef = useRef<number[]>([]);
  const startTimeRef = useRef(0);
  const timeLimitRef = useRef(START_TIME);
  const timeoutRef = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);
  const isFlashingRef = useRef(false);

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  const nextRound = useCallback(() => {
    if (roundRef.current >= ROUNDS) { setPhase('done'); return; }
    const key = KEYS[Math.floor(Math.random() * KEYS.length)];
    setCurrentKey(key);
    setTimeBar(100);
    isFlashingRef.current = false;
    startTimeRef.current = Date.now();
    const limit = timeLimitRef.current;

    // Animate the time bar
    const animStart = Date.now();
    const tick = () => {
      const pct = Math.max(0, 100 - ((Date.now() - animStart) / limit) * 100);
      setTimeBar(pct);
      if (pct > 0) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    // Time out — miss
    timeoutRef.current = window.setTimeout(() => {
      if (isFlashingRef.current) return;
      isFlashingRef.current = true;
      cancelAnimationFrame(animRef.current!);
      setFlash('wrong');
      setTimeout(() => {
        setFlash(null);
        roundRef.current += 1;
        setRound(roundRef.current);
        timeLimitRef.current = Math.max(MIN_TIME, timeLimitRef.current - SPEED_STEP);
        nextRound();
      }, 500);
    }, limit);
  }, []);

  const start = () => {
    clearTimers();
    roundRef.current = 0;
    scoreRef.current = 0;
    reactionsRef.current = [];
    timeLimitRef.current = START_TIME;
    setRound(0);
    setScore(0);
    setReactionTimes([]);
    setFlash(null);
    setPhase('playing');
    setTimeout(() => nextRound(), 100);
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (phase !== 'playing' || isFlashingRef.current) return;
    const pressed = e.key.toLowerCase();
    if (pressed.length !== 1 || !/[a-z]/.test(pressed)) return;

    const reaction = Date.now() - startTimeRef.current;
    clearTimers();
    isFlashingRef.current = true;

    if (pressed === currentKey) {
      reactionsRef.current = [...reactionsRef.current, reaction];
      scoreRef.current += 1;
      setReactionTimes([...reactionsRef.current]);
      setScore(scoreRef.current);
      setFlash('correct');
    } else {
      setFlash('wrong');
    }

    setTimeout(() => {
      setFlash(null);
      roundRef.current += 1;
      setRound(roundRef.current);
      timeLimitRef.current = Math.max(MIN_TIME, timeLimitRef.current - SPEED_STEP);
      nextRound();
    }, 450);
  }, [phase, currentKey, nextRound]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => () => clearTimers(), []);

  const avgReaction = reactionsRef.current.length > 0
    ? Math.round(reactionsRef.current.reduce((a, b) => a + b, 0) / reactionsRef.current.length)
    : 0;

  const barColor = timeBar > 60 ? '#34C759' : timeBar > 25 ? '#FBBF24' : '#EF4444';

  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '2.5rem', color: '#a855f7', letterSpacing: '3px', margin: '0 0 6px' }}>
        ⌨️ KEY REFLEX
      </h2>
      <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '0.95rem', margin: '0 0 20px' }}>
        Press the key shown before time runs out! Gets faster each round.
      </p>

      {phase === 'ready' && (
        <div>
          <button className="cartoon-btn" onClick={start} style={{ background: '#a855f7', color: '#fff', fontSize: '1.3rem', padding: '14px 40px' }}>
            ⌨️ START!
          </button>
          <div>
            <button onClick={onBack} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#444', fontFamily: '"Fredoka One", cursive', cursor: 'pointer', fontSize: '0.9rem' }}>
              ← Back to Mini Games
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div>
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.95rem', marginBottom: '10px' }}>
            Round <strong style={{ color: '#fff' }}>{round + 1}</strong> / {ROUNDS}
            &nbsp;·&nbsp; Score: <strong style={{ color: '#a855f7' }}>{score}</strong>
          </div>

          <div style={{ background: '#111', borderRadius: '8px', height: '10px', width: '100%', overflow: 'hidden', marginBottom: '32px' }}>
            <div style={{ background: barColor, height: '100%', width: `${timeBar}%` }} />
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '150px', height: '150px', borderRadius: '28px',
            background: flash === 'correct' ? '#0a3a0a' : flash === 'wrong' ? '#3a0a0a' : '#16213E',
            border: `6px solid ${flash === 'correct' ? '#34C759' : flash === 'wrong' ? '#EF4444' : '#a855f7'}`,
            boxShadow: `0 0 30px ${flash === 'correct' ? '#34C75944' : flash === 'wrong' ? '#EF444444' : '#a855f744'}`,
            transition: 'all 0.15s',
            marginBottom: '20px',
          }}>
            <span style={{
              fontFamily: '"Bangers", cursive', fontSize: '5.5rem',
              color: flash === 'correct' ? '#34C759' : flash === 'wrong' ? '#EF4444' : '#fff',
              textTransform: 'uppercase',
            }}>
              {currentKey}
            </span>
          </div>

          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#444', fontSize: '0.9rem' }}>
            Press <strong style={{ color: '#ddd', textTransform: 'uppercase' }}>{currentKey}</strong>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '8px' }}>⚡</div>
          <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#a855f7', letterSpacing: '2px', margin: '0 0 20px' }}>
            DONE!
          </h3>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            {[
              { label: 'Score', value: `${score}/${ROUNDS}`, color: '#a855f7' },
              { label: 'Avg Reaction', value: avgReaction ? `${avgReaction}ms` : '—', color: '#FFE234' },
            ].map(s => (
              <div key={s.label} style={{ background: '#16213E', border: `3px solid ${s.color}`, borderRadius: '16px', padding: '16px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2.2rem', color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', marginBottom: '20px' }}>
            {avgReaction < 300 ? '🔥 Lightning fast!' : avgReaction < 500 ? '⚡ Great reflexes!' : '💪 Keep training!'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="cartoon-btn" onClick={start} style={{ background: '#a855f7', color: '#fff' }}>⌨️ Play Again</button>
            <button className="cartoon-btn" onClick={onBack} style={{ background: '#2a2a4a', color: '#aaa' }}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
};
