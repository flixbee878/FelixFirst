import { useState, useEffect, useRef } from 'react';

const WORDS = [
  'cat','dog','run','jump','fast','type','word','game','play','win',
  'key','board','code','star','moon','sun','fire','rain','snow','wind',
  'tree','rock','fish','bird','frog','duck','ship','boat','road','blue',
  'green','happy','brave','quick','light','dark','soft','hard','cold','warm',
  'phone','table','chair','clock','brush','plant','glass','water','bread','music',
  'knight','battle','castle','dragon','wizard','archer','shield','sword','crown','quest',
  'typing','speed','finger','letter','strike','power','bonus','score','combo','blaze',
];

const DURATION = 60;

export const WordBlitz = ({ onBack }: { onBack: () => void }) => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'done'>('ready');
  const [wordList, setWordList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const shuffle = () => [...WORDS].sort(() => Math.random() - 0.5);

  const start = () => {
    setWordList(shuffle());
    setIndex(0);
    setInput('');
    setScore(0);
    setErrors(0);
    setTimeLeft(DURATION);
    setPhase('playing');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); setPhase('done'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const handleChange = (val: string) => {
    setInput(val);
    const target = wordList[index % wordList.length];
    if (val === target) {
      setScore(s => s + 1);
      setIndex(i => i + 1);
      setInput('');
    }
  };

  const elapsed = DURATION - timeLeft;
  const wpm = elapsed > 0 ? Math.round((score / elapsed) * 60) : 0;

  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: '2.5rem', color: '#FFE234', letterSpacing: '3px', margin: '0 0 6px' }}>
        ⚡ WORD BLITZ
      </h2>
      <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '0.95rem', margin: '0 0 20px' }}>
        Type as many words as you can in 60 seconds!
      </p>

      {phase === 'ready' && (
        <button className="cartoon-btn" onClick={start} style={{ background: '#FFE234', color: '#000', fontSize: '1.3rem', padding: '14px 40px' }}>
          ⚡ START!
        </button>
      )}

      {phase === 'playing' && (
        <div>
          <div style={{ fontFamily: '"Bangers", cursive', fontSize: '3.5rem', color: timeLeft <= 10 ? '#EF4444' : '#FFE234', lineHeight: 1 }}>
            {timeLeft}s
          </div>
          <div style={{ background: '#111', borderRadius: '8px', height: '8px', width: '100%', overflow: 'hidden', margin: '8px 0 28px' }}>
            <div style={{ background: timeLeft <= 10 ? '#EF4444' : '#34C759', height: '100%', width: `${(timeLeft / DURATION) * 100}%`, transition: 'width 1s linear' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '2.8rem', letterSpacing: '4px', marginBottom: '6px' }}>
              {wordList[index % wordList.length]?.split('').map((ch, i) => (
                <span key={i} style={{ color: i < input.length ? (input[i] === ch ? '#34C759' : '#EF4444') : '#fff' }}>{ch}</span>
              ))}
            </div>
            <div style={{ fontFamily: '"Fredoka One", cursive', color: '#333', fontSize: '1.1rem' }}>
              next: {wordList[(index + 1) % wordList.length]}
            </div>
          </div>

          <input
            ref={inputRef}
            value={input}
            onChange={e => handleChange(e.target.value)}
            style={{
              padding: '12px 20px', fontSize: '1.4rem', fontFamily: '"Fredoka One", cursive',
              background: '#0d1117', border: '3px solid #FFE234', borderRadius: '12px',
              color: '#fff', outline: 'none', textAlign: 'center', width: '220px', letterSpacing: '2px',
            }}
          />

          <div style={{ marginTop: '14px', fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.95rem' }}>
            Words: <strong style={{ color: '#FFE234' }}>{score}</strong>
            &nbsp;·&nbsp; WPM: <strong style={{ color: '#34C759' }}>{wpm}</strong>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '2rem', color: '#FFE234', letterSpacing: '2px', margin: '0 0 20px' }}>
            TIME'S UP!
          </h3>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            {[
              { label: 'Words', value: score, color: '#FFE234' },
              { label: 'WPM', value: wpm, color: '#34C759' },
            ].map(s => (
              <div key={s.label} style={{ background: '#16213E', border: `3px solid ${s.color}`, borderRadius: '16px', padding: '16px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '2.4rem', color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="cartoon-btn" onClick={start} style={{ background: '#FFE234', color: '#000' }}>⚡ Play Again</button>
            <button className="cartoon-btn" onClick={onBack} style={{ background: '#2a2a4a', color: '#aaa' }}>← Back</button>
          </div>
        </div>
      )}

      {phase === 'ready' && (
        <div>
          <button onClick={onBack} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#444', fontFamily: '"Fredoka One", cursive', cursor: 'pointer', fontSize: '0.9rem' }}>
            ← Back to Mini Games
          </button>
        </div>
      )}
    </div>
  );
};
