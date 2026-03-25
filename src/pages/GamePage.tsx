import { BattleArena } from '../components/game/BattleArena';
import { useGame } from '../store/GameContext';
import { getRankName, getRankColor } from '../constants/ranks';

export const GamePage = () => {
  const { profile } = useGame();
  const rankColor = getRankColor(profile.rank);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '2.5rem',
          margin: 0,
          color: '#1A1A2E',
          letterSpacing: '3px',
          textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
        }}>
          ⚔️ BATTLE MODE
        </h1>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            background: rankColor,
            border: '3px solid #000',
            borderRadius: '10px',
            padding: '6px 14px',
            boxShadow: '3px 3px 0px #000',
          }}>
            <span style={{ fontFamily: '"Fredoka One", cursive', fontWeight: 'bold', fontSize: '0.9rem' }}>
              🏆 {getRankName(profile.rank)}
            </span>
          </div>
        </div>
      </div>

      {/* Tips bar */}
      <div style={{
        background: '#1A1A2E',
        border: '3px solid #000',
        borderRadius: '10px',
        padding: '8px 16px',
        marginBottom: '16px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        boxShadow: '3px 3px 0px #000',
      }}>
        {[
          { icon: '⚔️', text: 'Type words fast to deal more damage' },
          { icon: '🎯', text: 'Accuracy = bonus damage' },
          { icon: '⏱️', text: 'Miss the timer and you take damage!' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1rem' }}>{icon}</span>
            <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.8rem', color: '#aaa' }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Battle arena */}
      <BattleArena />
    </div>
  );
};
