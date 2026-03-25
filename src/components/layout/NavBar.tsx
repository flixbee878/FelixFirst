import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../../store/GameContext';
import { getRankName, getRankColor } from '../../constants/ranks';
import { WINS_PER_RANK } from '../../constants/ranks';

export const NavBar = () => {
  const { profile } = useGame();
  const location = useLocation();
  const rankColor = getRankColor(profile.rank);

  const navLinks = [
    { to: '/', label: '🏠 Home' },
    { to: '/lessons', label: '📚 Lessons' },
    { to: '/game', label: '⚔️ Battle!' },
    { to: '/profile', label: '👤 Profile' },
  ];

  return (
    <nav
      style={{
        background: '#1A1A2E',
        borderBottom: '4px solid #000',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span
          style={{
            fontFamily: '"Bangers", cursive',
            fontSize: '2rem',
            color: '#FFE234',
            letterSpacing: '2px',
            textShadow: '2px 2px 0px #000, -1px -1px 0px #FF8C00',
          }}
        >
          TYPE MASTER
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              textDecoration: 'none',
              fontFamily: '"Fredoka One", cursive',
              fontSize: '1rem',
              padding: '6px 16px',
              border: '3px solid',
              borderRadius: '10px',
              borderColor: location.pathname === to ? '#FFE234' : '#555',
              background: location.pathname === to ? '#FFE234' : '#2a2a4a',
              color: location.pathname === to ? '#000' : '#fff',
              boxShadow: location.pathname === to ? '2px 2px 0px #000' : 'none',
              transition: 'all 0.1s',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div
        style={{
          background: rankColor,
          border: '3px solid #000',
          borderRadius: '10px',
          padding: '4px 12px',
          boxShadow: '2px 2px 0px #000',
          fontFamily: '"Fredoka One", cursive',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          color: '#000',
        }}
      >
        {getRankName(profile.rank)} • {profile.winsInCurrentRank}/{WINS_PER_RANK}⭐
      </div>
    </nav>
  );
};
