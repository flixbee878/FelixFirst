import { Link } from 'react-router-dom';
import { useGame } from '../store/GameContext';
import { getRankName, getRankColor, WINS_PER_RANK } from '../constants/ranks';

export const HomePage = () => {
  const { profile } = useGame();
  const rankColor = getRankColor(profile.rank);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Hero section */}
      <div style={{ textAlign: 'center', padding: '30px 20px 20px' }}>
        {/* Title */}
        <div style={{ marginBottom: '8px' }}>
          <h1
            style={{
              fontFamily: '"Bangers", cursive',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              margin: 0,
              color: '#FFE234',
              textShadow: '4px 4px 0px #000, -2px -2px 0px #FF8C00',
              letterSpacing: '4px',
              lineHeight: 1,
            }}
          >
            TYPE MASTER
          </h1>
          <p
            style={{
              fontFamily: '"Fredoka One", cursive',
              fontSize: '1.3rem',
              color: '#1A1A2E',
              margin: '8px 0 0',
              fontWeight: 'bold',
              textShadow: '1px 1px 0px rgba(255,255,255,0.5)',
            }}
          >
            🤖 Defeat Evil Robots With Your Keyboard! ⌨️
          </p>
        </div>

        {/* Robot showcase */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '20px',
          margin: '24px 0',
          flexWrap: 'wrap',
        }}>
          <RobotShowcase color="#f44336" label="BOLT-3000" />
          <RobotShowcase color="#9C27B0" label="DOOM-BOT" size="big" />
          <RobotShowcase color="#FF9800" label="TYPO-TRON" />
        </div>

        {/* Speech bubble from main robot */}
        <div style={{
          background: '#fff',
          border: '3px solid #000',
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'inline-block',
          boxShadow: '4px 4px 0px #000',
          marginBottom: '24px',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '1.1rem',
          color: '#1A1A2E',
        }}>
          "BEEP BOOP! Your typing is no match for us!" 🤖
        </div>
      </div>

      {/* Nav cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <NavCard
          to="/lessons"
          icon="📚"
          title="Lessons"
          description="Learn to type step by step! Master the home row, common words, and speed drills."
          color="#007AFF"
        />
        <NavCard
          to="/game"
          icon="⚔️"
          title="Battle Mode"
          description="Fight evil robots! Type words to deal damage and save the world!"
          color="#FF3B30"
          highlight
        />
        <NavCard
          to="/profile"
          icon="🏆"
          title="My Profile"
          description="Track your rank and progress. Can you reach Grand Master?"
          color="#FF8C00"
        />
      </div>

      {/* Current rank card */}
      <div style={{
        background: '#1A1A2E',
        border: '4px solid #000',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '4px 4px 0px #000',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          background: rankColor,
          border: '3px solid #000',
          borderRadius: '12px',
          padding: '10px 16px',
          boxShadow: '3px 3px 0px #000',
          minWidth: '130px',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: '"Bangers", cursive', fontSize: '1rem', color: '#000' }}>
            RANK {profile.rank}
          </div>
          <div style={{ fontFamily: '"Fredoka One", cursive', fontSize: '0.85rem', color: '#000', fontWeight: 'bold' }}>
            {getRankName(profile.rank)}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '180px' }}>
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#ddd', marginBottom: '6px', fontSize: '0.9rem' }}>
            Progress to next rank:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: WINS_PER_RANK }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '18px',
                  background: i < profile.winsInCurrentRank ? rankColor : '#333',
                  border: '2px solid #000',
                  borderRadius: '6px',
                  boxShadow: '2px 2px 0px #000',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.8rem', marginTop: '4px' }}>
            {profile.winsInCurrentRank} / {WINS_PER_RANK} wins to rank up
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: '"Fredoka One", cursive', color: '#aaa', fontSize: '0.85rem' }}>
            Total: <span style={{ color: '#34C759' }}>{profile.totalWins}W</span> / <span style={{ color: '#FF3B30' }}>{profile.totalLosses}L</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavCard = ({
  to, icon, title, description, color, highlight,
}: {
  to: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  highlight?: boolean;
}) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div
      style={{
        background: highlight ? color : '#fff',
        border: '4px solid #000',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '5px 5px 0px #000',
        cursor: 'pointer',
        transition: 'all 0.1s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px #000';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #000';
      }}
    >
      <div style={{ fontSize: '2.5rem' }}>{icon}</div>
      <h3 style={{
        fontFamily: '"Bangers", cursive',
        fontSize: '1.8rem',
        color: highlight ? '#fff' : color,
        margin: 0,
        letterSpacing: '1px',
        textShadow: highlight ? '2px 2px 0px rgba(0,0,0,0.3)' : 'none',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: '"Fredoka One", cursive',
        fontSize: '0.9rem',
        color: highlight ? 'rgba(255,255,255,0.9)' : '#555',
        margin: 0,
        lineHeight: 1.4,
      }}>
        {description}
      </p>
      <div style={{
        marginTop: 'auto',
        background: highlight ? 'rgba(0,0,0,0.2)' : color,
        color: '#fff',
        border: '2px solid #000',
        borderRadius: '8px',
        padding: '6px 12px',
        fontFamily: '"Fredoka One", cursive',
        fontSize: '0.9rem',
        textAlign: 'center',
        boxShadow: '2px 2px 0px #000',
      }}>
        {title === 'Lessons' ? 'Start Learning →' : title === 'Battle Mode' ? 'Fight Now! →' : 'View Profile →'}
      </div>
    </div>
  </Link>
);

const RobotShowcase = ({ color, label, size = 'normal' }: { color: string; label: string; size?: 'normal' | 'big' }) => {
  const s = size === 'big' ? 100 : 70;
  return (
    <div style={{ textAlign: 'center', animation: 'float 3s ease-in-out infinite' }}>
      <svg width={s} height={s * 1.3} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="10" x2="50" y2="2" stroke="#000" strokeWidth="3" />
        <circle cx="50" cy="2" r="4" fill="#FF3B30" stroke="#000" strokeWidth="2" />
        <rect x="25" y="10" width="50" height="40" rx="8" fill={color} stroke="#000" strokeWidth="3" />
        <circle cx="37" cy="27" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="63" cy="27" r="8" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="37" cy="27" r="4" fill="#1A1A2E" />
        <circle cx="63" cy="27" r="4" fill="#1A1A2E" />
        <rect x="35" y="42" width="30" height="5" rx="2" fill="#1A1A2E" stroke="#000" strokeWidth="1.5" />
        <rect x="43" y="50" width="14" height="10" fill={color} stroke="#000" strokeWidth="2" />
        <rect x="18" y="60" width="64" height="45" rx="6" fill={color} stroke="#000" strokeWidth="3" />
        <circle cx="50" cy="80" r="10" fill="#00C8FF" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="80" r="6" fill="#fff" opacity="0.8" />
        <rect x="2" y="60" width="16" height="35" rx="5" fill={color} stroke="#000" strokeWidth="3" />
        <rect x="82" y="60" width="16" height="35" rx="5" fill={color} stroke="#000" strokeWidth="3" />
        <rect x="25" y="105" width="20" height="22" rx="4" fill={color} stroke="#000" strokeWidth="3" />
        <rect x="55" y="105" width="20" height="22" rx="4" fill={color} stroke="#000" strokeWidth="3" />
        <rect x="20" y="122" width="28" height="8" rx="4" fill="#37474F" stroke="#000" strokeWidth="2" />
        <rect x="52" y="122" width="28" height="8" rx="4" fill="#37474F" stroke="#000" strokeWidth="2" />
      </svg>
      <div style={{
        fontFamily: '"Bangers", cursive',
        fontSize: size === 'big' ? '1rem' : '0.8rem',
        color: '#1A1A2E',
        marginTop: '4px',
        letterSpacing: '1px',
      }}>
        {label}
      </div>
    </div>
  );
};
