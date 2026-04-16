import { useState } from 'react';
import { WordBlitz } from '../components/minigames/WordBlitz';
import { KeyReflex } from '../components/minigames/KeyReflex';
import { LetterRain } from '../components/minigames/LetterRain';

const GAMES = [
  {
    id: 'word-blitz',
    title: 'Word Blitz',
    icon: '⚡',
    color: '#FFE234',
    bg: '#1a1800',
    description: 'Type as many words as possible in 60 seconds!',
    tip: 'Focus on speed — accuracy helps but speed wins.',
  },
  {
    id: 'key-reflex',
    title: 'Key Reflex',
    icon: '⌨️',
    color: '#a855f7',
    bg: '#1a0a2e',
    description: 'A letter appears — press it before time runs out!',
    tip: 'Gets faster every round. How many can you nail?',
  },
  {
    id: 'letter-rain',
    title: 'Letter Rain',
    icon: '🌧️',
    color: '#22d3ee',
    bg: '#001a1e',
    description: 'Letters fall from the sky — destroy them before they land!',
    tip: '3 lives. Speed increases with your score.',
  },
];

type GameId = 'word-blitz' | 'key-reflex' | 'letter-rain' | null;

const gameStyle = (color: string): React.CSSProperties => ({
  maxWidth: '560px',
  margin: '0 auto',
  background: '#16213E',
  border: `4px solid ${color}`,
  borderRadius: '24px',
  padding: '24px',
  boxShadow: `6px 6px 0px #000`,
});

export const MiniGamesPage = () => {
  const [selected, setSelected] = useState<GameId>(null);

  const back = () => setSelected(null);

  if (selected === 'word-blitz') return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#0d1117', padding: '24px 16px' }}>
      <div style={gameStyle('#FFE234')}><WordBlitz onBack={back} /></div>
    </div>
  );
  if (selected === 'key-reflex') return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#0d1117', padding: '24px 16px' }}>
      <div style={gameStyle('#a855f7')}><KeyReflex onBack={back} /></div>
    </div>
  );
  if (selected === 'letter-rain') return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#0d1117', padding: '24px 16px' }}>
      <div style={gameStyle('#22d3ee')}><LetterRain onBack={back} /></div>
    </div>
  );

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: 'linear-gradient(135deg, #0d0d1a, #1a1a2e)', padding: '24px 16px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(2.4rem, 7vw, 4rem)',
            color: '#FFE234',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #FF8C00',
            letterSpacing: '4px',
            margin: '0 0 8px',
          }}>
            🎮 MINI GAMES
          </h1>
          <p style={{ fontFamily: '"Fredoka One", cursive', color: '#a0b0ff', fontSize: '1.05rem', margin: 0 }}>
            Quick typing challenges — pick a game and go!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {GAMES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id as GameId)}
              style={{
                background: g.bg,
                border: `4px solid ${g.color}`,
                borderRadius: '20px',
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: `5px 5px 0px #000`,
                transition: 'transform 0.1s, box-shadow 0.1s',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '7px 7px 0px #000'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '5px 5px 0px #000'; }}
            >
              <div style={{ fontSize: '3rem', lineHeight: 1, flexShrink: 0 }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.7rem', color: g.color, letterSpacing: '2px', lineHeight: 1, marginBottom: '4px' }}>
                  {g.title}
                </div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#ccc', fontSize: '0.95rem', marginBottom: '4px' }}>
                  {g.description}
                </div>
                <div style={{ fontFamily: '"Fredoka One", cursive', color: '#555', fontSize: '0.8rem' }}>
                  💡 {g.tip}
                </div>
              </div>
              <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.4rem', color: g.color, flexShrink: 0 }}>
                PLAY →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
