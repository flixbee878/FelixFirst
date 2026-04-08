import { useGame } from '../../store/GameContext';
import { getRankName, getRankColor, WINS_PER_RANK } from '../../constants/ranks';
import { BATTLE_TOKEN_BASE, BATTLE_TOKEN_PER_RANK } from '../../constants/avatarParts';

interface VictoryScreenProps {
  won: boolean;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen = ({ won, onPlayAgain, onGoHome }: VictoryScreenProps) => {
  const { profile } = useGame();
  const rankColor = getRankColor(profile.rank);
  const tokensEarned = won ? BATTLE_TOKEN_BASE + profile.rank * BATTLE_TOKEN_PER_RANK : 0;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      borderRadius: '16px',
    }}>
      <div style={{
        background: won ? 'linear-gradient(135deg, #0a4a0a, #1a6a1a)' : 'linear-gradient(135deg, #4a0a0a, #6a1a1a)',
        border: `4px solid ${won ? '#34C759' : '#FF3B30'}`,
        borderRadius: '20px',
        padding: '28px',
        textAlign: 'center',
        boxShadow: `6px 6px 0px ${won ? '#34C759' : '#FF3B30'}`,
        maxWidth: '380px',
        width: '90%',
        animation: 'pop_in 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '6px' }}>{won ? '🏆' : '💀'}</div>

        <h2 style={{
          fontFamily: '"Bangers", cursive',
          fontSize: '2.8rem',
          color: won ? '#FFE234' : '#FF3B30',
          margin: '0 0 6px',
          letterSpacing: '3px',
          textShadow: '2px 2px 0px #000',
        }}>
          {won ? 'VICTORY!' : 'DEFEATED!'}
        </h2>

        <p style={{ fontFamily: '"Fredoka One", cursive', color: '#ddd', fontSize: '0.95rem', margin: '0 0 16px', lineHeight: 1.4 }}>
          {won ? 'You defeated the robot! Keep typing to grow stronger!' : 'The robot won this time. Practice makes perfect!'}
        </p>

        {/* Tokens earned */}
        {won && (
          <div style={{
            background: '#FFE234',
            border: '3px solid #000',
            borderRadius: '12px',
            padding: '8px 16px',
            marginBottom: '12px',
            boxShadow: '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '1.6rem' }}>🪙</span>
            <div>
              <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.6rem', color: '#000', lineHeight: 1 }}>
                +{tokensEarned} TOKENS!
              </div>
              <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.75rem', color: '#333' }}>
                Use them to unlock avatar items!
              </div>
            </div>
          </div>
        )}

        {/* Rank progress */}
        <div style={{
          background: rankColor,
          border: '3px solid #000',
          borderRadius: '12px',
          padding: '10px 16px',
          marginBottom: '18px',
          boxShadow: '3px 3px 0px #000',
        }}>
          <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.1rem', color: '#000' }}>
            {getRankName(profile.rank)}
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '4px' }}>
            {Array.from({ length: WINS_PER_RANK }).map((_, i) => (
              <span key={i} style={{ fontSize: '1.2rem' }}>
                {i < profile.winsInCurrentRank ? '⭐' : '☆'}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="cartoon-btn" onClick={onPlayAgain} style={{ background: '#FFE234', minWidth: '110px' }}>
            ⚔️ Again!
          </button>
          <button className="cartoon-btn" onClick={onGoHome} style={{ background: '#607D8B', color: '#fff', minWidth: '110px' }}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};
