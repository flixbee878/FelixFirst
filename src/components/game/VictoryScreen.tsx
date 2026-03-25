import { useGame } from '../../store/GameContext';
import { getRankName, getRankColor, WINS_PER_RANK } from '../../constants/ranks';

interface VictoryScreenProps {
  won: boolean;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen = ({ won, onPlayAgain, onGoHome }: VictoryScreenProps) => {
  const { profile } = useGame();
  const rankColor = getRankColor(profile.rank);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        borderRadius: '16px',
      }}
    >
      <div
        style={{
          background: won ? 'linear-gradient(135deg, #0a4a0a, #1a6a1a)' : 'linear-gradient(135deg, #4a0a0a, #6a1a1a)',
          border: `4px solid ${won ? '#34C759' : '#FF3B30'}`,
          borderRadius: '20px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: `6px 6px 0px ${won ? '#34C759' : '#FF3B30'}`,
          maxWidth: '380px',
          width: '90%',
          animation: 'pop_in 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
        }}
      >
        {/* Result emoji */}
        <div style={{ fontSize: '4rem', marginBottom: '8px' }}>
          {won ? '🏆' : '💀'}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: '"Bangers", cursive',
            fontSize: '3rem',
            color: won ? '#FFE234' : '#FF3B30',
            margin: '0 0 8px',
            letterSpacing: '3px',
            textShadow: '2px 2px 0px #000',
          }}
        >
          {won ? 'VICTORY!' : 'DEFEATED!'}
        </h2>

        <p
          style={{
            fontFamily: '"Fredoka One", cursive',
            color: '#ddd',
            fontSize: '1rem',
            margin: '0 0 20px',
          }}
        >
          {won
            ? 'You defeated the robot! Your typing skills grow stronger!'
            : 'The robot was too tough this time. Keep practicing!'}
        </p>

        {/* Rank display */}
        <div
          style={{
            background: rankColor,
            border: '3px solid #000',
            borderRadius: '12px',
            padding: '10px 16px',
            marginBottom: '20px',
            boxShadow: '3px 3px 0px #000',
          }}
        >
          <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1.2rem', color: '#000' }}>
            {getRankName(profile.rank)}
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '6px' }}>
            {Array.from({ length: WINS_PER_RANK }).map((_, i) => (
              <span key={i} style={{ fontSize: '1.2rem' }}>
                {i < profile.winsInCurrentRank ? '⭐' : '☆'}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            className="cartoon-btn"
            onClick={onPlayAgain}
            style={{ background: '#FFE234', minWidth: '120px' }}
          >
            ⚔️ Play Again
          </button>
          <button
            className="cartoon-btn"
            onClick={onGoHome}
            style={{ background: '#607D8B', color: '#fff', minWidth: '120px' }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};
