import { useState, useEffect, useRef } from 'react';

interface FallingLetter { id: number; char: string; x: number; y: number; speed: number; }

const CHARS = 'abcdefghijklmnopqrstuvwxyz';
let _id = 0;

export const LetterRain = ({ onBack }: { onBack: () => void }) => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'done'>('ready');
  const [display, setDisplay] = useState<FallingLetter[]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  // All mutable game state in refs to avoid stale closures in the loop
  const lettersRef = useRef<FallingLetter[]>([]);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const phaseRef = useRef<'ready' | 'playing' | 'done'>('ready');
  const loopRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetRefs = () => {
    lettersRef.current = [];
    livesRef.current = 3;
    scoreRef.current = 0;
    levelRef.current = 1;
    _id = 0;
  };

  const spawn = () => {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    lettersRef.current = [...lettersRef.current, {
      id: _id++,
      char,
      x: 4 + Math.random() * 84,
      y: 0,
      speed: 0.4 + levelRef.current * 0.15 + Math.random() * 0.2,
    }];
  };

  const scheduleSpawn = () => {
    if (phaseRef.current !== 'playing') return;
    spawn();
    const delay = Math.max(350, 1100 - levelRef.current * 80);
    spawnRef.current = window.setTimeout(scheduleSpawn, delay);
  };

  const gameLoop = () => {
    if (phaseRef.current !== 'playing') return;

    lettersRef.current = lettersRef.current.map(l => ({ ...l, y: l.y + l.speed }));
    const escaped = lettersRef.current.filter(l => l.y >= 102);
    lettersRef.current = lettersRef.current.filter(l => l.y < 102);

    if (escaped.length > 0) {
      livesRef.current = Math.max(0, livesRef.current - escaped.length);
      setLives(livesRef.current);
      if (livesRef.current <= 0) {
        phaseRef.current = 'done';
        setPhase('done');
        setDisplay([...lettersRef.current]);
        return;
      }
    }

    const newLevel = Math.floor(scoreRef.current / 10) + 1;
    if (newLevel !== levelRef.current) {
      levelRef.current = newLevel;
      setLevel(newLevel);
    }

    setDisplay([...lettersRef.current]);
    loopRef.current = window.setTimeout(gameLoop, 50); // 20fps
  };

  const start = () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    resetRefs();
    setDisplay([]);
    setLives(3);
    setScore(0);
    setLevel(1);
    phaseRef.current = 'playing';
    setPhase('playing');
    setTimeout(() => {
      scheduleSpawn();
      loopRef.current = window.setTimeout(gameLoop, 100);
      inputRef.current?.focus();
    }, 300);
  };

  useEffect(() => () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pressed = e.key.toLowerCase();
    if (pressed.length !== 1 || !/[a-z]/.test(pressed)) return;
    e.preventDefault();

    const idx = lettersRef.current.findIndex(l => l.char === pressed);
    if (idx !== -1) {
      // Remove the lowest (highest y) matching letter
      const matches = lettersRef.current.filter(l => l.char === pressed);
      const target = matches.reduce((a, b) => a.y > b.y ? a : b);
      lettersRef.current = lettersRef.current.filter(l => l.id !== target.id);
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setDisplay([...lettersRef.current]);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '2.5rem', color: '#22d3ee', letterSpacing: '3px', margin: '0 0 6px' }}>
        🌧️ LETTER RAIN
      </h2>
      <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '0.95rem', margin: '0 0 16px' }}>
        Type the falling letters before they hit the ground! 3 lives.
      </p>

      {phase === 'ready' && (
        <div>
          <button className="cartoon-btn" onClick={start} style={{ background: '#22d3ee', color: '#000', fontSize: '1.3rem', padding: '14px 40px' }}>
            🌧️ START!
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontFamily: '"Fredoka One", cursive' }}>
            <div style={{ fontSize: '1.4rem' }}>
              {'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}
            </div>
            <div style={{ color: '#FFE234' }}>Score: <strong>{score}</strong></div>
            <div style={{ color: '#22d3ee' }}>Lv {level}</div>
          </div>

          <div style={{
            position: 'relative', height: '300px',
            background: 'linear-gradient(180deg, #050a14 0%, #0a1628 100%)',
            border: '3px solid #22d3ee', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px',
          }}>
            {/* Ground line */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#EF4444', opacity: 0.5 }} />
            {display.map(l => (
              <div key={l.id} style={{
                position: 'absolute',
                left: `${l.x}%`,
                top: `${Math.min(l.y, 95)}%`,
                fontFamily: '"Bangers", cursive',
                fontSize: '1.8rem',
                color: l.y > 80 ? '#EF4444' : '#22d3ee',
                textShadow: `0 0 8px ${l.y > 80 ? '#EF444488' : '#22d3ee88'}`,
                transform: 'translateX(-50%)',
                userSelect: 'none',
                transition: 'color 0.2s',
              }}>
                {l.char.toUpperCase()}
              </div>
            ))}
          </div>

          <input
            ref={inputRef}
            onKeyDown={handleKey}
            readOnly
            style={{
              padding: '10px 20px', fontSize: '1.2rem', fontFamily: '"Fredoka One", cursive',
              background: '#0d1117', border: '3px solid #22d3ee', borderRadius: '12px',
              color: '#22d3ee', outline: 'none', textAlign: 'center', width: '180px',
              letterSpacing: '2px', caretColor: 'transparent',
            }}
            placeholder="tap to focus..."
          />
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#333', fontSize: '0.8rem', marginTop: '4px' }}>
            click the box then type!
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '8px' }}>💀</div>
          <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#22d3ee', letterSpacing: '2px', margin: '0 0 20px' }}>
            GAME OVER!
          </h3>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            {[
              { label: 'Score', value: score, color: '#22d3ee' },
              { label: 'Level', value: level, color: '#FFE234' },
            ].map(s => (
              <div key={s.label} style={{ background: '#16213E', border: `3px solid ${s.color}`, borderRadius: '16px', padding: '16px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2.4rem', color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="cartoon-btn" onClick={start} style={{ background: '#22d3ee', color: '#000' }}>🌧️ Play Again</button>
            <button className="cartoon-btn" onClick={onBack} style={{ background: '#2a2a4a', color: '#aaa' }}>← Back</button>
          </div>
        </div>
      )}
    </div>
  );
};
